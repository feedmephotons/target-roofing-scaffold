'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/ops/session'
import { db, logAssistant } from '@/lib/ops/db'
import { createMember, createTask, deleteTask, listMembers, listTasks, updateTask, type Task, type TaskStatus } from '@/lib/ops/tasks'
import { acceptSuggestion, createMeeting } from '@/lib/ops/meetings'

// ---- Team ----
export async function opsListMembers() { await requireAdmin(); return listMembers() }
export async function opsCreateMember(input: { name: string; role?: string; email?: string; aliases?: string[] }) {
  await requireAdmin()
  if (!input.name?.trim()) throw new Error('Name is required')
  return createMember(input)
}

// ---- Tasks ----
export async function opsListTasks(filter: { assigneeId?: string; status?: TaskStatus | 'open'; tag?: string; meetingId?: string } = {}) {
  await requireAdmin(); return listTasks(filter)
}
export async function opsCreateTask(input: { title: string; description?: string; assignee_id?: string | null; due_date?: string | null; priority?: string; tags?: string[] }) {
  const s = await requireAdmin()
  if (!input.title?.trim()) throw new Error('Title is required')
  const t = await createTask({ ...input, source: 'manual', created_by: s.email })
  await logAssistant('admin', s.email, 'create_task', { id: t.id, title: t.title })
  revalidatePath('/admin/tasks')
  return t
}
export async function opsUpdateTask(id: string, patch: Partial<Pick<Task, 'title' | 'description' | 'assignee_id' | 'status' | 'priority' | 'due_date' | 'tags'>>) {
  await requireAdmin(); return updateTask(id, patch)
}
export async function opsDeleteTask(id: string) { await requireAdmin(); await deleteTask(id); return true }

// ---- Meetings ----
export async function opsListMeetings() {
  await requireAdmin()
  const { data, error } = await db.from('meetings').select('id,title,occurred_at,source,status,summary,created_at,parsed_at,error').order('occurred_at', { ascending: false }).limit(200)
  if (error) throw error
  const ids = (data || []).map((m) => m.id)
  const counts: Record<string, { pending: number; accepted: number }> = {}
  if (ids.length) {
    const { data: sugs } = await db.from('meeting_task_suggestions').select('meeting_id,status').in('meeting_id', ids)
    for (const s of sugs || []) {
      counts[s.meeting_id] ||= { pending: 0, accepted: 0 }
      if (s.status === 'pending') counts[s.meeting_id].pending++
      if (s.status === 'accepted') counts[s.meeting_id].accepted++
    }
  }
  return (data || []).map((m) => ({ ...m, counts: counts[m.id] || { pending: 0, accepted: 0 } }))
}
export async function opsGetMeeting(id: string) {
  await requireAdmin()
  const { data: meeting, error } = await db.from('meetings').select('*').eq('id', id).single()
  if (error) throw error
  const { data: suggestions } = await db.from('meeting_task_suggestions').select('*').eq('meeting_id', id).order('created_at')
  return { meeting, suggestions: suggestions || [] }
}
export async function opsCreateMeetingFromText(input: { title?: string; transcript: string; occurred_at?: string }) {
  const s = await requireAdmin()
  if (!input.transcript?.trim() || input.transcript.trim().length < 40) throw new Error('Paste a transcript first')
  return createMeeting({ ...input, source: 'paste', created_by: s.email })
}
export async function opsCreateMeetingFromUpload(input: { title?: string; media_path: string; media_mime: string; occurred_at?: string }) {
  const s = await requireAdmin()
  return createMeeting({ ...input, source: 'upload', created_by: s.email })
}
export async function opsSignMeetingUpload(fileName: string) {
  await requireAdmin()
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80)
  const path = `uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safe}`
  const { data, error } = await db.storage.from('meetings').createSignedUploadUrl(path)
  if (error) throw error
  return { path, token: data.token, signedUrl: data.signedUrl }
}
export async function opsAcceptSuggestion(id: string, memberId: string | null) {
  const s = await requireAdmin(); return acceptSuggestion(id, memberId, s.email)
}
export async function opsDismissSuggestion(id: string) {
  await requireAdmin()
  await db.from('meeting_task_suggestions').update({ status: 'dismissed' }).eq('id', id)
  return true
}
export async function opsDeleteMeeting(id: string) {
  await requireAdmin()
  await db.from('meetings').delete().eq('id', id)
  return true
}
