import 'server-only'
import { GoogleGenAI } from '@google/genai'

// Verified against the Gemini model list on 2026-09-23.
export const OPS_MODEL = process.env.GEMINI_OPS_MODEL || 'gemini-3.8-flash'

let client: GoogleGenAI | null = null
export function gemini() {
  if (!client) client = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY || '' })
  return client
}

export async function generateJson<T>(prompt: string, schema: object, opts: { parts?: object[]; temperature?: number } = {}): Promise<T> {
  const res = await gemini().models.generateContent({
    model: OPS_MODEL,
    contents: [{ role: 'user', parts: [...(opts.parts || []), { text: prompt }] }],
    config: { responseMimeType: 'application/json', responseSchema: schema as never, temperature: opts.temperature ?? 0.2, maxOutputTokens: 32768 },
  })
  const text = res.text || ''
  try { return JSON.parse(text) as T } catch { throw new Error(`Gemini returned invalid JSON (${text.slice(0, 200)})`) }
}

// Upload media to the Gemini Files API and wait until it is ready to reference.
export async function uploadMediaToGemini(bytes: ArrayBuffer, mimeType: string, name: string) {
  const ai = gemini()
  let file = await ai.files.upload({ file: new Blob([bytes], { type: mimeType }), config: { mimeType, displayName: name } })
  for (let i = 0; i < 60 && file.state === 'PROCESSING'; i++) {
    await new Promise((r) => setTimeout(r, 3000))
    file = await ai.files.get({ name: file.name! })
  }
  if (file.state === 'FAILED') throw new Error('Gemini could not process the media file')
  return { fileUri: file.uri!, mimeType: file.mimeType || mimeType }
}

export async function transcribeMedia(bytes: ArrayBuffer, mimeType: string, name: string, hint?: string) {
  const { fileUri, mimeType: mt } = await uploadMediaToGemini(bytes, mimeType, name)
  const res = await gemini().models.generateContent({
    model: OPS_MODEL,
    contents: [{ role: 'user', parts: [
      { fileData: { fileUri, mimeType: mt } },
      { text: `Transcribe this recording verbatim. Label speakers by name when they can be identified from context (introductions, people addressing each other), otherwise "Speaker 1", "Speaker 2". Put a [mm:ss] timestamp at the start of each speaker turn. ${hint ? `Known participants may include: ${hint}.` : ''} Output only the transcript.` },
    ] }],
    config: { temperature: 0, maxOutputTokens: 65536 },
  })
  return res.text || ''
}
