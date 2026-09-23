'use server'

import { requireAdmin } from '@/lib/ops/session'
import { db } from '@/lib/ops/db'
import { listTasks } from '@/lib/ops/tasks'

export async function podGetState() {
  await requireAdmin()
  const [{ data: settings }, { data: episodes }, { data: votes }, tasks] = await Promise.all([
    db.from('podcast_settings').select('*').eq('id', 1).single(),
    db.from('podcast_episodes').select('*').order('number', { ascending: true, nullsFirst: false }),
    db.from('podcast_name_votes').select('option_slug,voter_id,vote,note'),
    listTasks({ tag: 'podcast' }),
  ])
  return { settings, episodes: episodes || [], votes: votes || [], tasks }
}

export async function podVote(option_slug: string, voter_id: string, vote: 'love' | 'maybe' | 'no' | null, note?: string) {
  await requireAdmin()
  if (!vote) { await db.from('podcast_name_votes').delete().eq('option_slug', option_slug).eq('voter_id', voter_id); return true }
  const { error } = await db.from('podcast_name_votes').upsert({ option_slug, voter_id, vote, note: note || null, updated_at: new Date().toISOString() }, { onConflict: 'option_slug,voter_id' })
  if (error) throw error
  return true
}

export async function podChooseName(slug: string | null, name: string | null, cover: string | null) {
  await requireAdmin()
  await db.from('podcast_settings').update({ chosen_option_slug: slug, show_name: name, cover_url: cover, updated_at: new Date().toISOString() }).eq('id', 1)
  return true
}

export async function podUpdateSettings(patch: Record<string, unknown>) {
  await requireAdmin()
  const allowed = ['description', 'author', 'owner_email', 'category', 'subcategory', 'explicit', 'apple_url', 'spotify_url', 'youtube_url', 'cover_url', 'show_name']
  const row = Object.fromEntries(Object.entries(patch).filter(([k]) => allowed.includes(k)))
  await db.from('podcast_settings').update({ ...row, updated_at: new Date().toISOString() }).eq('id', 1)
  return true
}

export async function podSaveEpisode(ep: { id?: string; number?: number | null; title: string; status?: string; record_date?: string | null; plan?: string | null; description?: string | null; show_notes?: string | null; youtube_url?: string | null; video_url?: string | null; cover_url?: string | null }) {
  await requireAdmin()
  const row: Record<string, unknown> = { ...ep, updated_at: new Date().toISOString() }
  if (ep.status === 'published') row.published_at = new Date().toISOString()
  if (ep.id) {
    const { data: prev } = await db.from('podcast_episodes').select('published_at,audio_url').eq('id', ep.id).single()
    if (ep.status === 'published' && !prev?.audio_url) throw new Error('Upload the final audio before publishing')
    if (prev?.published_at && ep.status === 'published') row.published_at = prev.published_at
    if (ep.status && ep.status !== 'published') row.published_at = null
    const { data, error } = await db.from('podcast_episodes').update(row).eq('id', ep.id).select().single()
    if (error) throw error
    return data
  }
  const { data, error } = await db.from('podcast_episodes').insert(row).select().single()
  if (error) throw error
  return data
}

export async function podSignAudioUpload(episodeId: string, fileName: string) {
  await requireAdmin()
  const ext = (fileName.split('.').pop() || 'mp3').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = `episodes/${episodeId}/${Date.now()}.${ext}`
  const { data, error } = await db.storage.from('podcast').createSignedUploadUrl(path)
  if (error) throw error
  return { path, token: data.token }
}

export async function podAttachAudio(episodeId: string, path: string, mime: string, bytes: number) {
  await requireAdmin()
  const { data: pub } = db.storage.from('podcast').getPublicUrl(path)
  const { data, error } = await db.from('podcast_episodes').update({ audio_path: path, audio_url: pub.publicUrl, audio_mime: mime, audio_bytes: bytes, status: 'recorded', updated_at: new Date().toISOString() }).eq('id', episodeId).select().single()
  if (error) throw error
  return data
}
