import { db } from '@/lib/ops/db'

export const runtime = 'nodejs'
export const revalidate = 600

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const dur = (s: number | null) => { if (!s) return '0'; const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return `${h ? `${h}:` : ''}${String(m).padStart(h ? 2 : 1, '0')}:${String(x).padStart(2, '0')}` }

// Podcast RSS for Apple Podcasts, Spotify, YouTube Music and every other app.
export async function GET(req: Request) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const { data: s } = await db.from('podcast_settings').select('*').eq('id', 1).single()
  const { data: eps } = await db.from('podcast_episodes').select('*').eq('status', 'published').not('audio_url', 'is', null).lte('published_at', new Date().toISOString()).order('published_at', { ascending: false })
  const title = s?.show_name || 'Target Roofing Podcast'
  const cover = s?.cover_url ? (s.cover_url.startsWith('http') ? s.cover_url : origin + s.cover_url) : `${origin}/podcast/cover.png`
  const desc = s?.description || 'Casey Crowther, Darian Grey, and Winston Fowlkes on using AI in real life and in a real business, from a roofing company in Southwest Florida.'
  const items = (eps || []).map((e) => `
    <item>
      <title>${esc(e.title)}</title>
      <description><![CDATA[${e.show_notes || e.description || ''}]]></description>
      <itunes:summary><![CDATA[${e.description || ''}]]></itunes:summary>
      <enclosure url="${esc(e.audio_url)}" length="${e.audio_bytes || 0}" type="${esc(e.audio_mime || 'audio/mpeg')}"/>
      <guid isPermaLink="false">${e.id}</guid>
      <pubDate>${new Date(e.published_at).toUTCString()}</pubDate>
      <itunes:duration>${dur(e.duration_s)}</itunes:duration>
      ${e.number ? `<itunes:episode>${e.number}</itunes:episode>` : ''}
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:explicit>${s?.explicit ? 'true' : 'false'}</itunes:explicit>
      ${e.cover_url ? `<itunes:image href="${esc(e.cover_url.startsWith('http') ? e.cover_url : origin + e.cover_url)}"/>` : ''}
    </item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:podcast="https://podcastindex.org/namespace/1.0">
  <channel>
    <title>${esc(title)}</title>
    <link>${origin}</link>
    <atom:link href="${origin}/podcast/feed.xml" rel="self" type="application/rss+xml"/>
    <language>${s?.language || 'en-us'}</language>
    <description><![CDATA[${desc}]]></description>
    <itunes:summary><![CDATA[${desc}]]></itunes:summary>
    <itunes:author>${esc(s?.author || 'Target Roofing')}</itunes:author>
    <itunes:owner><itunes:name>${esc(s?.author || 'Target Roofing')}</itunes:name><itunes:email>${esc(s?.owner_email || 'casey@targetroofers.com')}</itunes:email></itunes:owner>
    <itunes:image href="${esc(cover)}"/>
    <image><url>${esc(cover)}</url><title>${esc(title)}</title><link>${origin}</link></image>
    <itunes:category text="${esc(s?.category || 'Business')}"><itunes:category text="${esc(s?.subcategory || 'Entrepreneurship')}"/></itunes:category>
    <itunes:explicit>${s?.explicit ? 'true' : 'false'}</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <podcast:locked>no</podcast:locked>${items}
  </channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600' } })
}
