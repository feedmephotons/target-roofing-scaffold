import 'server-only'
import { db } from './db'

export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type Task = {
  id: string; title: string; description: string | null; assignee_id: string | null; status: TaskStatus
  priority: 'low' | 'normal' | 'high'; due_date: string | null; tags: string[]; source: string
  meeting_id: string | null; created_by: string | null; created_at: string; updated_at: string; completed_at: string | null
  assignee?: { id: string; name: string } | null
}
export type Member = { id: string; name: string; role: string | null; email: string | null; aliases: string[]; telegram_user_id: number | null; telegram_username: string | null; active: boolean }

export async function listMembers(): Promise<Member[]> {
  const { data, error } = await db.from('team_members').select('*').eq('active', true).order('created_at')
  if (error) throw error
  return data as Member[]
}

export async function createMember(input: { name: string; role?: string; email?: string; aliases?: string[] }) {
  const aliases = Array.from(new Set([input.name.split(' ')[0], ...(input.aliases || [])].filter(Boolean)))
  const { data, error } = await db.from('team_members').insert({ name: input.name.trim(), role: input.role || null, email: input.email || null, aliases }).select().single()
  if (error) throw error
  return data as Member
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()

// Resolve a spoken or typed name ("Casey", "darren", "Winston Folks") to a team member.
export function matchMember(members: Member[], raw: string | null | undefined): Member | null {
  if (!raw) return null
  const q = norm(raw)
  if (!q) return null
  for (const m of members) {
    const names = [m.name, ...(m.aliases || [])].map(norm)
    if (names.includes(q)) return m
  }
  for (const m of members) {
    const first = norm(m.name).split(' ')[0]
    if (q.split(' ')[0] === first) return m
  }
  return null
}

export async function listTasks(filter: { assigneeId?: string; status?: TaskStatus | 'open'; tag?: string; meetingId?: string; limit?: number } = {}): Promise<Task[]> {
  let q = db.from('tasks').select('*, assignee:team_members(id,name)').order('status').order('due_date', { ascending: true, nullsFirst: false }).order('created_at', { ascending: false })
  if (filter.assigneeId) q = q.eq('assignee_id', filter.assigneeId)
  if (filter.status === 'open') q = q.neq('status', 'done')
  else if (filter.status) q = q.eq('status', filter.status)
  if (filter.tag) q = q.contains('tags', [filter.tag])
  if (filter.meetingId) q = q.eq('meeting_id', filter.meetingId)
  q = q.limit(filter.limit || 500)
  const { data, error } = await q
  if (error) throw error
  return data as Task[]
}

export async function createTask(input: { title: string; description?: string | null; assignee_id?: string | null; due_date?: string | null; priority?: string; tags?: string[]; source?: string; meeting_id?: string | null; created_by?: string | null }) {
  const { data, error } = await db.from('tasks').insert({
    title: input.title.trim(), description: input.description || null, assignee_id: input.assignee_id || null,
    due_date: input.due_date || null, priority: input.priority || 'normal', tags: input.tags || [],
    source: input.source || 'manual', meeting_id: input.meeting_id || null, created_by: input.created_by || null,
  }).select('*, assignee:team_members(id,name)').single()
  if (error) throw error
  return data as Task
}

export async function updateTask(id: string, patch: Partial<Pick<Task, 'title' | 'description' | 'assignee_id' | 'status' | 'priority' | 'due_date' | 'tags'>>) {
  const row: Record<string, unknown> = { ...patch, updated_at: new Date().toISOString() }
  if (patch.status) row.completed_at = patch.status === 'done' ? new Date().toISOString() : null
  const { data, error } = await db.from('tasks').update(row).eq('id', id).select('*, assignee:team_members(id,name)').single()
  if (error) throw error
  return data as Task
}

export async function deleteTask(id: string) {
  const { error } = await db.from('tasks').delete().eq('id', id)
  if (error) throw error
}

// Find a task by id or by a fuzzy title fragment (for voice and chat commands).
export async function findTask(ref: string): Promise<Task | null> {
  if (/^[0-9a-f-]{36}$/i.test(ref)) {
    const { data } = await db.from('tasks').select('*, assignee:team_members(id,name)').eq('id', ref).maybeSingle()
    return (data as Task) || null
  }
  const { data } = await db.from('tasks').select('*, assignee:team_members(id,name)').ilike('title', `%${ref.replace(/[%_]/g, '')}%`).order('status').limit(1)
  return (data?.[0] as Task) || null
}
