import { NextResponse, after } from 'next/server'
import { db } from '@/lib/ops/db'
import { createMeeting, processMeeting } from '@/lib/ops/meetings'

export const runtime = 'nodejs'
export const maxDuration = 300

/**
 * Deliver a meeting from anywhere (Zoom, Google Meet, Fireflies, Otter, n8n, Zapier, a script).
 *
 *   POST /api/meetings/ingest
 *   Authorization: Bearer <MEETINGS_INGEST_TOKEN>
 *
 *   JSON:      { "title": "...", "occurred_at": "2026-09-30T14:30:00Z", "transcript": "..." }
 *          or  { "title": "...", "media_url": "https://.../recording.m4a" }   (we download and transcribe it)
 *   Multipart: file=<audio or video, up to ~4 MB through this endpoint>, title=..., occurred_at=...
 *
 * Returns immediately with the meeting id; transcription and task extraction continue in the background.
 */
export async function POST(req: Request) {
  const token = process.env.MEETINGS_INGEST_TOKEN
  const auth = req.headers.get('authorization') || ''
  if (!token || auth !== `Bearer ${token}`) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const ct = req.headers.get('content-type') || ''
  let title: string | undefined, occurred_at: string | undefined, transcript: string | undefined
  let media: { bytes: ArrayBuffer; mime: string; name: string } | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    title = String(form.get('title') || '') || undefined
    occurred_at = String(form.get('occurred_at') || '') || undefined
    transcript = String(form.get('transcript') || '') || undefined
    const file = form.get('file')
    if (file && typeof file !== 'string') media = { bytes: await file.arrayBuffer(), mime: file.type || 'audio/mpeg', name: file.name }
  } else {
    const body = await req.json().catch(() => ({}))
    title = body.title; occurred_at = body.occurred_at; transcript = body.transcript
    if (body.media_url) {
      const r = await fetch(body.media_url)
      if (!r.ok) return NextResponse.json({ error: `could not download media_url (${r.status})` }, { status: 400 })
      media = { bytes: await r.arrayBuffer(), mime: r.headers.get('content-type') || 'audio/mpeg', name: new URL(body.media_url).pathname.split('/').pop() || 'recording' }
    }
  }
  if (!transcript?.trim() && !media) return NextResponse.json({ error: 'send a transcript, a file, or a media_url' }, { status: 400 })

  let media_path: string | undefined
  if (media) {
    media_path = `ingest/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${media.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60)}`
    const up = await db.storage.from('meetings').upload(media_path, media.bytes, { contentType: media.mime })
    if (up.error) return NextResponse.json({ error: up.error.message }, { status: 500 })
  }
  const meeting = await createMeeting({ title, occurred_at, transcript, source: 'api', media_path, media_mime: media?.mime, created_by: 'ingest-api' })
  after(async () => { try { await processMeeting(meeting.id) } catch { /* status and error are stored on the meeting */ } })
  return NextResponse.json({ ok: true, id: meeting.id, admin_url: `/admin/meetings/${meeting.id}` }, { status: 202 })
}
