import type { MetadataRoute } from 'next'
import { CITIES, SERVICES } from '@/lib/locations'
import { NEWS_PAGE_COUNT, newsPageHref } from '@/lib/news'
import blogsData from '@/data/blogs.json'

const BASE_URL = 'https://targetroofers.com'

// Frozen at build time so unchanged pages don't report "modified now" on every crawl.
const BUILD_DATE = new Date()

interface BlogPost {
  slug: string
  date: string
  updatedAt?: string
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/careers',
    '/contact',
    '/our-process',
    '/our-projects',
    '/our-team',
    '/reviews',
    '/roofing-services',
    '/roofing-services/roof-repair',
    '/roofing-services/commercial-roof-repair',
    '/roofing-services/roof-replacement',
    '/softwash',
    '/target-news',
    '/video-gallery',
    '/roofing-services/tile-roofing',
    '/roofing-services/asphalt-shingle-roofing',
    '/roofing-services/tpo-pvc-membrane-roofing',
    '/roofing-services/metal-roofing-systems',
    '/roofing-services/built-up-roofing-bur',
    '/roofing-services/waterproofing-coating-systems',
    '/roofing-services/emergency-storm-repair',
    '/roofing-services/roof-inspections-surveys',
    '/financing',
    '/warranties',
    '/website-privacy-policy',
    '/mobile-privacy-policy',
    '/commercial-hoa-roof-maintenance',
    '/locations',
  ]

  const cityHubPages = CITIES.map((city) => `/locations/${city}`)

  const locationPages = CITIES.flatMap((city) =>
    SERVICES.map((service) => `/locations/${city}/${service}`)
  )

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticPages,
    ...Array.from({ length: NEWS_PAGE_COUNT - 1 }, (_, i) => newsPageHref(i + 2)),
    ...cityHubPages,
    ...locationPages,
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: BUILD_DATE,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority:
      path === ''
        ? 1
        : path.startsWith('/roofing-services/roof-repair')
          ? 0.9
          : path.startsWith('/locations')
            ? 0.7
            : 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = (blogsData as BlogPost[]).map((post) => ({
    url: `${BASE_URL}/target-news/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...staticEntries, ...blogEntries]
}
