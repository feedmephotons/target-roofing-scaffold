'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { Bot, Loader2, MessageCircle, Mic, Send } from 'lucide-react'
import { opsListMembers } from '../_ops/actions'
import { Card, PageHeader, btnPrimary, inputCls } from '../_ops/ui'
import type { Member } from '@/lib/ops/tasks'

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || ''
const BOT = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || ''

export default function AssistantPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [actor, setActor] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { opsListMembers().then(setMembers).catch(() => {}); try { setActor(localStorage.getItem('tr_actor') || '') } catch {} }, [])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || busy) return
    const next = [...messages, { role: 'user' as const, text: input.trim() }]
    setMessages(next); setInput(''); setBusy(true)
    const r = await fetch('/api/admin/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next, actor }) })
    const j = await r.json().catch(() => ({}))
    setMessages([...next, { role: 'assistant', text: j.reply || j.error || 'Something went wrong.' }]); setBusy(false)
  }

  return (
    <div>
      <PageHeader title="AI Assistant" subtitle="Ask about tasks, meetings, and the podcast, or tell it to create, reassign, or finish work. The same assistant answers in Telegram and by voice." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Chat" className="lg:col-span-2" right={
          <select className="rounded-lg border border-[var(--gray-200)] px-2 py-1 text-xs" value={actor} onChange={(e) => { setActor(e.target.value); try { localStorage.setItem('tr_actor', e.target.value) } catch {} }}>
            <option value="">Who are you?</option>
            {members.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
          </select>}>
          <div className="mb-4 h-[420px] overflow-y-auto space-y-3 rounded-lg bg-[var(--gray-50)] p-4">
            {messages.length === 0 && <p className="text-sm text-[var(--gray-500)]">Try: &ldquo;What does Darian have due before the first episode?&rdquo; or &ldquo;Give Casey a task to pick three podcast names by Friday.&rdquo;</p>}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-[var(--black)] text-white' : 'bg-white border border-[var(--gray-200)] text-[var(--black)]'}`}>{m.text}</div>
              </div>
            ))}
            {busy && <Loader2 className="h-4 w-4 animate-spin text-[var(--gray-400)]" />}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2">
            <input className={inputCls} placeholder="Ask or tell the assistant..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button className={btnPrimary} disabled={busy}><Send className="h-4 w-4" /></button>
          </form>
        </Card>
        <div className="space-y-6">
          <Card title={<span className="inline-flex items-center gap-2"><Mic className="h-4 w-4" />Talk to it</span>}>
            {AGENT_ID ? (
              <>
                <p className="mb-3 text-sm text-[var(--gray-600)]">Tap the voice button at the bottom right of this page and talk. It can read, add, change, and finish tasks.</p>
                <div dangerouslySetInnerHTML={{ __html: `<elevenlabs-convai agent-id="${AGENT_ID}"></elevenlabs-convai>` }} />
                <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
              </>
            ) : <p className="text-sm text-[var(--gray-500)]">The voice agent is not connected yet.</p>}
          </Card>
          <Card title={<span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" />In Telegram</span>}>
            <p className="text-sm text-[var(--gray-600)]">{BOT ? <>Message <b>@{BOT}</b>, or add it to the group chat. </> : 'The Telegram bot is being connected. '}In a group, mention the bot or reply to it. Send <code>/iam your name</code> once so it knows who &ldquo;me&rdquo; is. Forward a voice note or recording with <code>/meeting</code> to pull tasks out of it.</p>
          </Card>
          <Card title={<span className="inline-flex items-center gap-2"><Bot className="h-4 w-4" />What it can do</span>}>
            <ul className="list-disc space-y-1 pl-4 text-sm text-[var(--gray-600)]">
              <li>List anyone&apos;s tasks, or what&apos;s left for the podcast</li>
              <li>Create a task and assign it with a due date</li>
              <li>Reassign, reschedule, rename, or finish a task</li>
              <li>Delete a task (it asks first)</li>
              <li>Summarize recent meetings</li>
              <li>Report where the podcast name vote stands</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
