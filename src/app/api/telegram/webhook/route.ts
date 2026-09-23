import { NextResponse, after } from 'next/server'
import { db, logAssistant } from '@/lib/ops/db'
import { chatWithTools } from '@/lib/ops/chat'
import { createMeeting, processMeeting } from '@/lib/ops/meetings'
import { listMembers, matchMember } from '@/lib/ops/tasks'

export const runtime = 'nodejs'
export const maxDuration = 300

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const api = (method: string, body: object) => fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then((r) => r.json())
const say = (chat_id: number, text: string, reply_to?: number) => api('sendMessage', { chat_id, text: text.slice(0, 4000), reply_parameters: reply_to ? { message_id: reply_to, allow_sending_without_reply: true } : undefined, link_preview_options: { is_disabled: true } })
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://targetroofing.vercel.app'

type TgUser = { id: number; first_name?: string; last_name?: string; username?: string; is_bot?: boolean }
type TgFile = { file_id: string; file_name?: string; mime_type?: string; file_size?: number }
type TgMessage = {
  message_id: number; chat: { id: number; type: string; title?: string }; from?: TgUser; text?: string; caption?: string
  voice?: TgFile; audio?: TgFile; video?: TgFile; video_note?: TgFile; document?: TgFile
  reply_to_message?: TgMessage
}

export async function POST(req: Request) {
  if (!TOKEN || req.headers.get('x-telegram-bot-api-secret-token') !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const update = await req.json().catch(() => null)
  const msg: TgMessage | undefined = update?.message || update?.edited_message
  if (!msg || msg.from?.is_bot) return NextResponse.json({ ok: true })
  // Answer Telegram right away; do the work after the response.
  after(() => handle(msg).catch(async (e) => { await say(msg.chat.id, `Something went wrong: ${e instanceof Error ? e.message : e}`, msg.message_id) }))
  return NextResponse.json({ ok: true })
}

async function handle(msg: TgMessage) {
  const chatId = msg.chat.id
  const isGroup = msg.chat.type !== 'private'
  const botUser = (process.env.TELEGRAM_BOT_USERNAME || '').replace(/^@/, '')
  const text = (msg.text || msg.caption || '').trim()
  const mentioned = !!botUser && text.toLowerCase().includes(`@${botUser.toLowerCase()}`)
  const repliedToBot = !!msg.reply_to_message?.from?.is_bot
  const isCommand = text.startsWith('/')
  const clean = text.replace(new RegExp(`@${botUser}`, 'ig'), '').trim()

  // 1. Chat approval: a chat must be linked with the code before the bot does anything.
  await db.from('telegram_chats').upsert({ chat_id: chatId, title: msg.chat.title || [msg.from?.first_name, msg.from?.last_name].filter(Boolean).join(' '), type: msg.chat.type }, { onConflict: 'chat_id', ignoreDuplicates: false })
  const { data: chat } = await db.from('telegram_chats').select('approved').eq('chat_id', chatId).single()
  if (!chat?.approved) {
    const m = clean.match(/^\/link\s+(\S+)/i)
    if (m && process.env.TELEGRAM_LINK_CODE && m[1] === process.env.TELEGRAM_LINK_CODE) {
      await db.from('telegram_chats').update({ approved: true }).eq('chat_id', chatId)
      await say(chatId, 'Connected to the Target Roofing admin. Each person, send /iam followed by your name once so I know who "me" is. Try: "what are my tasks?"', msg.message_id)
    } else if (!isGroup || mentioned || isCommand) {
      await say(chatId, 'This chat is not connected yet. Send /link followed by the connection code.', msg.message_id)
    }
    return
  }

  // 2. Who is talking.
  const members = await listMembers()
  let actor = members.find((m) => m.telegram_user_id === msg.from?.id) || null
  const iam = clean.match(/^\/iam\s+(.+)/i)
  if (iam) {
    const m = matchMember(members, iam[1])
    if (!m) return void (await say(chatId, `I don't have a team member called "${iam[1]}". Team: ${members.map((x) => x.name).join(', ')}.`, msg.message_id))
    await db.from('team_members').update({ telegram_user_id: null }).eq('telegram_user_id', msg.from!.id)
    await db.from('team_members').update({ telegram_user_id: msg.from!.id, telegram_username: msg.from!.username || null }).eq('id', m.id)
    return void (await say(chatId, `Got it, you're ${m.name}.`, msg.message_id))
  }
  if (/^\/(start|help)\b/i.test(clean)) {
    return void (await say(chatId, [
      'I keep Target\'s tasks and meetings in one place.',
      'Ask me things like "what\'s on my list", "give Darian a task to book the studio for Wednesday", "mark the Vercel task done", or "where are we on the podcast".',
      'Send a voice note, a recording, or a transcript file with /meeting (or just send it to me directly) and I\'ll pull the tasks out of it.',
      '/iam <name> tells me who you are. /tasks shows your open tasks.',
    ].join('\n\n'), msg.message_id))
  }

  // 3. Meetings: media or /meeting text.
  const media = msg.voice || msg.audio || msg.video || msg.video_note || msg.document
  const wantsMeeting = /^\/meeting\b/i.test(clean) || (!!media && (!isGroup || mentioned || /\/meeting/i.test(text)))
  if (wantsMeeting) {
    const body = clean.replace(/^\/meeting\b/i, '').trim()
    let meetingId: string
    if (media) {
      if ((media.file_size || 0) > 20 * 1024 * 1024) return void (await say(chatId, 'Telegram only lets bots download files up to 20 MB. Upload bigger recordings on the admin Meetings page instead.', msg.message_id))
      const f = await api('getFile', { file_id: media.file_id })
      const r = await fetch(`https://api.telegram.org/file/bot${TOKEN}/${f.result.file_path}`)
      const bytes = await r.arrayBuffer()
      const name = media.file_name || f.result.file_path.split('/').pop() || 'telegram-recording'
      const mime = media.mime_type || (msg.voice ? 'audio/ogg' : 'application/octet-stream')
      if (mime.startsWith('text/') || /\.(txt|vtt|srt|md)$/i.test(name)) {
        const m = await createMeeting({ title: body || name.replace(/\.[^.]+$/, ''), transcript: new TextDecoder().decode(bytes), source: 'telegram', created_by: actor?.name || msg.from?.first_name })
        meetingId = m.id
      } else {
        const path = `telegram/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const up = await db.storage.from('meetings').upload(path, bytes, { contentType: mime })
        if (up.error) throw new Error(up.error.message)
        const m = await createMeeting({ title: body || `Telegram recording from ${actor?.name || msg.from?.first_name || 'someone'}`, media_path: path, media_mime: mime, source: 'telegram', created_by: actor?.name || msg.from?.first_name })
        meetingId = m.id
      }
    } else {
      if (body.length < 40) return void (await say(chatId, 'Paste the transcript after /meeting, or send me the recording.', msg.message_id))
      meetingId = (await createMeeting({ transcript: body, source: 'telegram', created_by: actor?.name || msg.from?.first_name })).id
    }
    await say(chatId, 'Got it. Reading the meeting now, I\'ll post the tasks here when I\'m done.', msg.message_id)
    const result = await processMeeting(meetingId)
    const { data: mt } = await db.from('meetings').select('title,summary').eq('id', meetingId).single()
    const { data: sugs } = await db.from('meeting_task_suggestions').select('title,status,suggested_member_id').eq('meeting_id', meetingId)
    const byName = (id: string | null) => members.find((x) => x.id === id)?.name
    const lines = (sugs || []).map((s) => `${s.status === 'accepted' ? '✓' : '?'} ${s.title}${byName(s.suggested_member_id) ? ` (${byName(s.suggested_member_id)})` : ' (needs an owner)'}`)
    await say(chatId, `${mt?.title}\n\n${mt?.summary || ''}\n\n${result.tasks} tasks found, ${result.autoCreated} assigned automatically:\n${lines.join('\n')}\n\nReview: ${SITE}/admin/meetings/${meetingId}`)
    return
  }

  // 4. Everything else: talk to the assistant. In groups, only when addressed.
  if (isGroup && !mentioned && !repliedToBot && !isCommand) return
  const prompt = /^\/tasks\b/i.test(clean) ? 'What are my open tasks?' : clean
  if (!prompt) return
  await api('sendChatAction', { chat_id: chatId, action: 'typing' })
  const history = []
  if (msg.reply_to_message?.text) history.push({ role: msg.reply_to_message.from?.is_bot ? 'model' : 'user', parts: [{ text: msg.reply_to_message.text }] })
  history.push({ role: 'user', parts: [{ text: `${actor ? `${actor.name}: ` : `${msg.from?.first_name || 'Someone'} (not linked, ask them to send /iam <name> before assigning to "me"): `}${prompt}` }] })
  const reply = await chatWithTools(history as never, { channel: 'telegram', actorName: actor?.name || null })
  await logAssistant('telegram', actor?.name || msg.from?.username || null, 'chat', { prompt })
  await say(chatId, reply, msg.message_id)
}
