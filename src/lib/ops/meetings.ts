import 'server-only'
import { db } from './db'
import { generateJson, transcribeMedia } from './gemini'
import { createTask, listMembers, matchMember, type Member } from './tasks'

export type Meeting = {
  id: string; title: string; occurred_at: string | null; source: string; status: string; transcript: string | null
  media_path: string | null; media_mime: string | null; summary: string | null; decisions: string[]; participants: { name: string; role?: string }[]
  error: string | null; created_by: string | null; created_at: string; parsed_at: string | null
}
export type Suggestion = {
  id: string; meeting_id: string; title: string; description: string | null; owner_name_raw: string | null
  suggested_member_id: string | null; match_confidence: number | null; due_hint: string | null; due_date: string | null
  priority: string; tags: string[]; evidence: string | null; status: 'pending' | 'accepted' | 'dismissed'; task_id: string | null
}

// Auto-assign only when the model is confident AND the name resolves to a known member.
const AUTO_ASSIGN_CONFIDENCE = 0.75

export async function createMeeting(input: { title?: string; transcript?: string; occurred_at?: string | null; source: string; media_path?: string; media_mime?: string; created_by?: string }) {
  const { data, error } = await db.from('meetings').insert({
    title: input.title?.trim() || `Meeting ${new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York' })}`,
    transcript: input.transcript?.trim() || null, occurred_at: input.occurred_at || new Date().toISOString(),
    source: input.source, media_path: input.media_path || null, media_mime: input.media_mime || null, created_by: input.created_by || null,
    status: 'new',
  }).select().single()
  if (error) throw error
  return data as Meeting
}

type ParseResult = {
  title: string; summary: string; decisions: string[]; participants: { name: string; role: string }[]
  tasks: { title: string; description: string; owner_name: string; owner_member_id: string; confidence: number; due_hint: string; due_date: string; priority: string; tags: string[]; evidence: string }[]
}

const SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Short descriptive meeting title, 3-8 words' },
    summary: { type: 'string', description: '4-8 sentence plain-English summary of what was discussed and agreed' },
    decisions: { type: 'array', items: { type: 'string' } },
    participants: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, role: { type: 'string' } }, required: ['name', 'role'] } },
    tasks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Imperative, specific, starts with a verb, under 90 characters' },
          description: { type: 'string', description: 'Context needed to do the task, 1-3 sentences' },
          owner_name: { type: 'string', description: 'Person responsible as named in the meeting, or "" if nobody took it' },
          owner_member_id: { type: 'string', description: 'id from the TEAM list if the owner is clearly that member, else ""' },
          confidence: { type: 'number', description: '0-1 confidence that owner_member_id is the right person' },
          due_hint: { type: 'string', description: 'Deadline as said in the meeting, e.g. "before next Wednesday", or ""' },
          due_date: { type: 'string', description: 'Resolved YYYY-MM-DD if a deadline can be computed from the meeting date, else ""' },
          priority: { type: 'string', enum: ['low', 'normal', 'high'] },
          tags: { type: 'array', items: { type: 'string' }, description: 'lowercase topic tags such as podcast, infrastructure, website, sales' },
          evidence: { type: 'string', description: 'Short quote or paraphrase from the transcript that creates this task' },
        },
        required: ['title', 'description', 'owner_name', 'owner_member_id', 'confidence', 'due_hint', 'due_date', 'priority', 'tags', 'evidence'],
      },
    },
  },
  required: ['title', 'summary', 'decisions', 'participants', 'tasks'],
}

function buildPrompt(meeting: Meeting, members: Member[]) {
  const when = meeting.occurred_at ? new Date(meeting.occurred_at) : new Date()
  const team = members.map((m) => `- id=${m.id} | ${m.name} | ${m.role || ''} | also called: ${(m.aliases || []).join(', ')}`).join('\n')
  return `You are the meeting intelligence engine for Target Roofing, a roofing contractor in Southwest Florida.
Extract every action item from the meeting transcript below.

Meeting date: ${when.toDateString()} (use it to resolve relative deadlines like "next Wednesday").

TEAM (known people):
${team}

Rules:
- The transcript may have no speaker labels and may contain speech-to-text errors in names (e.g. "Darren" or "Dan" for Darian). Work out who said what from context: who is introduced, who is addressed, who volunteers.
- Be thorough. Walk the whole transcript start to finish. A task exists when someone commits to do something ("I'll send you...", "I'll look into it"), is asked or told to do something ("you need to...", "that should be first on your list", "that's something you can work on"), or a clear next step is agreed for the group. Include soft commitments and personal to-dos someone says they want to remember.
- Also capture concrete opportunities the group agreed should be done even when nobody took ownership (for example a process someone said should be automated). Set owner_name to the person it was pointed at if any, otherwise "" so a human assigns it.
- Do not invent work nobody discussed, and skip pure opinions, jokes, and background stories. A one-hour working meeting usually produces 15 to 30 tasks.
- One task per distinct deliverable. Merge duplicates.
- owner_member_id must be copied from the TEAM list only when you are confident the owner is that person. If the owner is someone not in TEAM (for example a staff member mentioned by name), keep owner_name and leave owner_member_id "".
- Be concrete: "Add Winston to the Target Vercel team" beats "Handle Vercel".

TRANSCRIPT:
"""
${(meeting.transcript || '').slice(0, 400000)}
"""`
}

export async function processMeeting(id: string) {
  const { data: m0, error } = await db.from('meetings').select('*').eq('id', id).single()
  if (error || !m0) throw new Error('Meeting not found')
  let meeting = m0 as Meeting
  const members = await listMembers()
  try {
    if (!meeting.transcript && meeting.media_path) {
      await db.from('meetings').update({ status: 'transcribing', error: null }).eq('id', id)
      const dl = await db.storage.from('meetings').download(meeting.media_path)
      if (dl.error || !dl.data) throw new Error(`Could not read the uploaded file: ${dl.error?.message}`)
      const transcript = await transcribeMedia(await dl.data.arrayBuffer(), meeting.media_mime || dl.data.type || 'audio/mpeg', meeting.title, members.map((x) => x.name).join(', '))
      if (!transcript.trim()) throw new Error('Transcription came back empty')
      await db.from('meetings').update({ transcript }).eq('id', id)
      meeting = { ...meeting, transcript }
    }
    if (!meeting.transcript) throw new Error('No transcript or recording to parse')

    await db.from('meetings').update({ status: 'parsing', error: null }).eq('id', id)
    const parsed = await generateJson<ParseResult>(buildPrompt(meeting, members), SCHEMA)

    // Re-parsing replaces pending suggestions but keeps anything a human already accepted.
    await db.from('meeting_task_suggestions').delete().eq('meeting_id', id).eq('status', 'pending')

    let autoCreated = 0
    for (const t of parsed.tasks || []) {
      const byId = members.find((x) => x.id === t.owner_member_id) || null
      const byName = matchMember(members, t.owner_name)
      const member = byId || byName
      const confident = !!member && (byId ? (t.confidence ?? 0) >= AUTO_ASSIGN_CONFIDENCE : true)
      const due = /^\d{4}-\d{2}-\d{2}$/.test(t.due_date || '') ? t.due_date : null
      const tags = (t.tags || []).map((x) => x.toLowerCase().trim()).filter(Boolean).slice(0, 5)
      const { data: sug } = await db.from('meeting_task_suggestions').insert({
        meeting_id: id, title: t.title, description: t.description || null, owner_name_raw: t.owner_name || null,
        suggested_member_id: member?.id || null, match_confidence: t.confidence ?? null, due_hint: t.due_hint || null,
        due_date: due, priority: ['low', 'normal', 'high'].includes(t.priority) ? t.priority : 'normal', tags, evidence: t.evidence || null,
      }).select().single()
      if (sug && member && confident) {
        const task = await createTask({ title: t.title, description: t.description, assignee_id: member.id, due_date: due, priority: sug.priority, tags, source: 'meeting', meeting_id: id, created_by: 'meeting-intelligence' })
        await db.from('meeting_task_suggestions').update({ status: 'accepted', task_id: task.id }).eq('id', sug.id)
        autoCreated++
      }
    }

    await db.from('meetings').update({
      status: 'parsed', parsed_at: new Date().toISOString(), summary: parsed.summary, decisions: parsed.decisions || [],
      participants: parsed.participants || [], title: meeting.title.startsWith('Meeting ') && parsed.title ? parsed.title : meeting.title,
    }).eq('id', id)
    return { tasks: parsed.tasks?.length || 0, autoCreated }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    await db.from('meetings').update({ status: 'error', error: msg }).eq('id', id)
    throw e
  }
}

export async function acceptSuggestion(suggestionId: string, memberId: string | null, actor: string) {
  const { data: s, error } = await db.from('meeting_task_suggestions').select('*').eq('id', suggestionId).single()
  if (error || !s) throw new Error('Suggestion not found')
  if (s.status === 'accepted' && s.task_id) return s.task_id as string
  const task = await createTask({ title: s.title, description: s.description, assignee_id: memberId, due_date: s.due_date, priority: s.priority, tags: s.tags, source: 'meeting', meeting_id: s.meeting_id, created_by: actor })
  await db.from('meeting_task_suggestions').update({ status: 'accepted', task_id: task.id, suggested_member_id: memberId }).eq('id', suggestionId)
  return task.id
}
