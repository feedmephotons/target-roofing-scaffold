import 'server-only'
import { db, logAssistant } from './db'
import { createTask, deleteTask, findTask, listMembers, listTasks, matchMember, updateTask, type Task } from './tasks'

// One tool set, three front doors: the Telegram bot (Gemini function calling),
// the ElevenLabs voice agent (webhook tools), and anything else we add later.
export const TOOL_DECLARATIONS = [
  { name: 'list_tasks', description: 'List tasks. Use to answer "what do I have to do", "what is Darian working on", "what is left for the podcast".',
    parameters: { type: 'object', properties: {
      person: { type: 'string', description: 'Team member name, or "me" for the person asking. Omit for everyone.' },
      status: { type: 'string', enum: ['open', 'done', 'all'], description: 'Default open' },
      tag: { type: 'string', description: 'Filter by tag, e.g. podcast' } } } },
  { name: 'create_task', description: 'Create a task and assign it to someone.',
    parameters: { type: 'object', properties: {
      title: { type: 'string', description: 'Specific, starts with a verb' },
      person: { type: 'string', description: 'Who owns it (name or "me"). Omit to leave unassigned.' },
      due_date: { type: 'string', description: 'YYYY-MM-DD' },
      priority: { type: 'string', enum: ['low', 'normal', 'high'] },
      tags: { type: 'array', items: { type: 'string' } },
      description: { type: 'string' } }, required: ['title'] } },
  { name: 'update_task', description: 'Change a task: reassign, rename, reschedule, set status, add notes.',
    parameters: { type: 'object', properties: {
      task: { type: 'string', description: 'Task id or a few words from its title' },
      title: { type: 'string' }, person: { type: 'string' }, due_date: { type: 'string', description: 'YYYY-MM-DD, or "none" to clear' },
      status: { type: 'string', enum: ['todo', 'in_progress', 'done'] }, priority: { type: 'string', enum: ['low', 'normal', 'high'] },
      description: { type: 'string' } }, required: ['task'] } },
  { name: 'complete_task', description: 'Mark a task done.', parameters: { type: 'object', properties: { task: { type: 'string', description: 'Task id or words from its title' } }, required: ['task'] } },
  { name: 'delete_task', description: 'Delete a task permanently. Confirm with the user first.', parameters: { type: 'object', properties: { task: { type: 'string' } }, required: ['task'] } },
  { name: 'list_team', description: 'List the team members tasks can be assigned to.', parameters: { type: 'object', properties: {} } },
  { name: 'podcast_status', description: 'Where the podcast stands: name and logo votes, next episode, open prep tasks.', parameters: { type: 'object', properties: {} } },
  { name: 'recent_meetings', description: 'Summaries of the most recent meetings.', parameters: { type: 'object', properties: { limit: { type: 'number' } } } },
] as const

export type ToolContext = { channel: 'telegram' | 'voice' | 'admin'; actorName?: string | null }

const brief = (t: Task) => ({ id: t.id, title: t.title, owner: t.assignee?.name || 'Unassigned', status: t.status, due: t.due_date, priority: t.priority, tags: t.tags })

export async function runTool(name: string, args: Record<string, unknown>, ctx: ToolContext): Promise<unknown> {
  const members = await listMembers()
  const who = (p: unknown) => {
    const s = typeof p === 'string' ? p.trim() : ''
    if (!s) return undefined
    if (/^(me|myself|i)$/i.test(s)) return ctx.actorName ? matchMember(members, ctx.actorName) : null
    return matchMember(members, s)
  }
  const result = await (async () => {
    switch (name) {
      case 'list_tasks': {
        const m = who(args.person)
        if (args.person && !m) return { error: `No team member called "${args.person}". Team: ${members.map((x) => x.name).join(', ')}` }
        const status = (args.status as string) || 'open'
        const rows = await listTasks({ assigneeId: m?.id, status: status === 'all' ? undefined : (status as 'open' | 'done'), tag: (args.tag as string) || undefined, limit: 60 })
        return { count: rows.length, tasks: rows.map(brief) }
      }
      case 'create_task': {
        const m = who(args.person)
        if (args.person && !m) return { error: `No team member called "${args.person}". Ask who it is, or add them on the admin Tasks page.` }
        const t = await createTask({ title: String(args.title), description: (args.description as string) || null, assignee_id: m?.id || null, due_date: (args.due_date as string) || null, priority: (args.priority as string) || 'normal', tags: (args.tags as string[]) || [], source: ctx.channel === 'voice' ? 'voice' : ctx.channel, created_by: ctx.actorName || ctx.channel })
        return { created: brief(t) }
      }
      case 'update_task': {
        const t = await findTask(String(args.task))
        if (!t) return { error: `No task matching "${args.task}"` }
        const patch: Record<string, unknown> = {}
        if (args.title) patch.title = args.title
        if (args.description) patch.description = args.description
        if (args.status) patch.status = args.status
        if (args.priority) patch.priority = args.priority
        if (args.due_date) patch.due_date = args.due_date === 'none' ? null : args.due_date
        if (args.person) { const m = who(args.person); if (!m) return { error: `No team member called "${args.person}"` }; patch.assignee_id = m.id }
        return { updated: brief(await updateTask(t.id, patch)) }
      }
      case 'complete_task': {
        const t = await findTask(String(args.task))
        if (!t) return { error: `No task matching "${args.task}"` }
        return { completed: brief(await updateTask(t.id, { status: 'done' })) }
      }
      case 'delete_task': {
        const t = await findTask(String(args.task))
        if (!t) return { error: `No task matching "${args.task}"` }
        await deleteTask(t.id); return { deleted: t.title }
      }
      case 'list_team':
        return { team: members.map((m) => ({ name: m.name, role: m.role })) }
      case 'podcast_status': {
        const [{ data: settings }, { data: eps }, open, { data: votes }] = await Promise.all([
          db.from('podcast_settings').select('show_name,chosen_option_slug').eq('id', 1).maybeSingle(),
          db.from('podcast_episodes').select('number,title,status,record_date').order('number'),
          listTasks({ tag: 'podcast', status: 'open' }),
          db.from('podcast_name_votes').select('option_slug,vote'),
        ])
        const tally: Record<string, number> = {}
        for (const v of votes || []) tally[v.option_slug] = (tally[v.option_slug] || 0) + (v.vote === 'love' ? 2 : v.vote === 'maybe' ? 1 : 0)
        return { show_name: settings?.show_name || 'not chosen yet', leading_name_options: Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 3), episodes: eps || [], open_prep_tasks: open.map(brief) }
      }
      case 'recent_meetings': {
        const { data } = await db.from('meetings').select('title,occurred_at,summary,status').order('occurred_at', { ascending: false }).limit(Math.min(Number(args.limit) || 3, 10))
        return { meetings: data || [] }
      }
      default:
        return { error: `Unknown tool ${name}` }
    }
  })()
  if (!['list_tasks', 'list_team', 'podcast_status', 'recent_meetings'].includes(name)) await logAssistant(ctx.channel, ctx.actorName || null, name, { args, result })
  return result
}

export function assistantSystemPrompt(actorName?: string | null) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })
  return `You are the Target Roofing operations assistant. Target Roofing is a roofing contractor in Southwest Florida run by Casey Crowther. You help the team (Casey, Darian the AI lead, Winston Fowlkes the developer, and others) keep track of tasks, meetings, and the new company podcast.
Today is ${today} (Eastern time).${actorName ? ` You are talking with ${actorName}. "me" means ${actorName}.` : ' You do not know who is talking; ask their name before assigning tasks to "me".'}
Rules: use the tools for anything about tasks, team, meetings, or the podcast; never guess task data. Resolve relative dates to YYYY-MM-DD. Before deleting anything, confirm. Keep replies short and plain, no markdown tables, no em dashes. When you create or change a task, say who owns it and when it is due.`
}
