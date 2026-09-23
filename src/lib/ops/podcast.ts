import 'server-only'
import { db } from './db'
import { generateJson, uploadMediaToGemini } from './gemini'

export type Episode = {
  id: string; number: number | null; title: string; status: string; record_date: string | null; plan: string | null
  description: string | null; show_notes: string | null; chapters: { time: string; title: string }[]; clip_ideas: { start: string; end: string; hook: string; why: string }[]
  title_options: string[]; transcript: string | null; audio_path: string | null; audio_url: string | null; audio_bytes: number | null; audio_mime: string | null
  duration_s: number | null; video_url: string | null; cover_url: string | null; youtube_url: string | null; published_at: string | null
}

type Notes = { title_options: string[]; description: string; show_notes: string; chapters: { time: string; title: string }[]; clip_ideas: { start: string; end: string; hook: string; why: string }[]; duration_seconds: number; transcript: string }

// Listen to an uploaded episode and draft everything post-production needs.
export async function draftEpisodeNotes(id: string) {
  const { data: ep, error } = await db.from('podcast_episodes').select('*').eq('id', id).single()
  if (error || !ep) throw new Error('Episode not found')
  if (!ep.audio_path) throw new Error('Upload the episode audio first')
  const dl = await db.storage.from('podcast').download(ep.audio_path)
  if (dl.error || !dl.data) throw new Error(dl.error?.message || 'Could not read the audio')
  const { fileUri, mimeType } = await uploadMediaToGemini(await dl.data.arrayBuffer(), ep.audio_mime || dl.data.type || 'audio/mpeg', ep.title)
  const notes = await generateJson<Notes>(
    `This is an episode of a business podcast hosted by Casey Crowther (President of Target Roofing, Southwest Florida), Darian Grey (Target's AI lead), and Winston Fowlkes (AI developer). The show is about using AI in real life and real businesses, for normal people, not developers.
Episode plan for context:
${ep.plan || '(none)'}

Produce: 5 title options (punchy, specific, no clickbait, no em dashes), a 2-3 sentence description for Apple and Spotify, full show notes in plain text with short paragraphs and a bullet list of what is covered, chapters with mm:ss timestamps, 3-6 short social clip ideas (15-60 seconds each, with start/end mm:ss, the hook line, and why it will work), the total duration in seconds, and a clean transcript with speaker names.`,
    {
      type: 'object',
      properties: {
        title_options: { type: 'array', items: { type: 'string' } }, description: { type: 'string' }, show_notes: { type: 'string' },
        chapters: { type: 'array', items: { type: 'object', properties: { time: { type: 'string' }, title: { type: 'string' } }, required: ['time', 'title'] } },
        clip_ideas: { type: 'array', items: { type: 'object', properties: { start: { type: 'string' }, end: { type: 'string' }, hook: { type: 'string' }, why: { type: 'string' } }, required: ['start', 'end', 'hook', 'why'] } },
        duration_seconds: { type: 'number' }, transcript: { type: 'string' },
      },
      required: ['title_options', 'description', 'show_notes', 'chapters', 'clip_ideas', 'duration_seconds', 'transcript'],
    },
    { parts: [{ fileData: { fileUri, mimeType } }], temperature: 0.4 },
  )
  await db.from('podcast_episodes').update({
    title_options: notes.title_options, description: ep.description || notes.description, show_notes: notes.show_notes, chapters: notes.chapters,
    clip_ideas: notes.clip_ideas, duration_s: Math.round(notes.duration_seconds) || ep.duration_s, transcript: notes.transcript,
    status: ep.status === 'recorded' ? 'editing' : ep.status, updated_at: new Date().toISOString(),
  }).eq('id', id)
}
