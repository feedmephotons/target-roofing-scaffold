import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/ops/session'
import { draftEpisodeNotes } from '@/lib/ops/podcast'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  try { await draftEpisodeNotes(id); return NextResponse.json({ ok: true }) }
  catch (e) { return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 }) }
}
