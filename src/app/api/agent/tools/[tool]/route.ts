import { NextResponse } from 'next/server'
import { runTool, TOOL_DECLARATIONS } from '@/lib/ops/assistant-tools'

export const runtime = 'nodejs'

// Webhook tools for the ElevenLabs voice agent. Each tool is POST /api/agent/tools/<name>
// with the tool arguments as the JSON body and the shared secret in X-Agent-Secret.
export async function POST(req: Request, { params }: { params: Promise<{ tool: string }> }) {
  const secret = process.env.AGENT_TOOLS_SECRET
  if (!secret || req.headers.get('x-agent-secret') !== secret) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { tool } = await params
  if (!TOOL_DECLARATIONS.some((t) => t.name === tool)) return NextResponse.json({ error: 'unknown tool' }, { status: 404 })
  const args = await req.json().catch(() => ({}))
  const { caller_name, ...rest } = args as Record<string, unknown>
  try {
    const result = await runTool(tool, rest, { channel: 'voice', actorName: typeof caller_name === 'string' ? caller_name : null })
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
