import 'server-only'
import type { Content } from '@google/genai'
import { gemini, OPS_MODEL } from './gemini'
import { TOOL_DECLARATIONS, assistantSystemPrompt, runTool, type ToolContext } from './assistant-tools'

// Gemini function-calling loop over the shared ops tools.
export async function chatWithTools(history: Content[], ctx: ToolContext): Promise<string> {
  const contents: Content[] = [...history]
  for (let turn = 0; turn < 6; turn++) {
    const res = await gemini().models.generateContent({
      model: OPS_MODEL,
      contents,
      config: {
        systemInstruction: assistantSystemPrompt(ctx.actorName),
        tools: [{ functionDeclarations: TOOL_DECLARATIONS as never }],
        temperature: 0.3,
        maxOutputTokens: 4096,
      },
    })
    const calls = res.functionCalls || []
    const modelContent = res.candidates?.[0]?.content
    if (!calls.length) return (res.text || '').trim() || 'Done.'
    if (modelContent) contents.push(modelContent) // keeps thought signatures intact for Gemini 3
    const parts = []
    for (const call of calls) {
      let result: unknown
      try { result = await runTool(call.name || '', (call.args || {}) as Record<string, unknown>, ctx) } catch (e) { result = { error: e instanceof Error ? e.message : String(e) } }
      parts.push({ functionResponse: { id: call.id, name: call.name, response: { result } } })
    }
    contents.push({ role: 'user', parts })
  }
  return 'That took more steps than I expected. Try asking in a simpler way.'
}
