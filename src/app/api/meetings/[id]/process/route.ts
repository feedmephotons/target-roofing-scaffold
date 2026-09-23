import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/ops/session'
import { processMeeting } from '@/lib/ops/meetings'

export const runtime = 'nodejs'
export const maxDuration = 300

// Transcribe (if needed) and parse a meeting. Called by the admin page after intake.
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const result = await processMeeting(id)
    return NextResponse.json({ ok: true, ...result })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
