import type { MetadataRoute } from 'next'

const BASE_URL = 'https://targetroofers.com'

const CITIES = [
  'fort-myers', 'cape-coral', 'naples', 'sarasota', 'bradenton',
  'lehigh-acres', 'bonita-springs', 'estero', 'marco-island', 'punta-gorda',
]
const SERVICES = ['roof-repair', 'commercial-roofing', 'residential-roofing']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/about', '/careers', '/contact', '/our-process', '/our-projects',
    '/our-team', '/reviews', '/roofing-services', '/softwash', '/target-news',
    '/video-gallery',
    '/roofing-services/tpo-pvc-membrane-roofing',
    '/roofing-services/metal-roofing-systems',
    '/roofing-services/built-up-roofing-bur',
    '/roofing-services/waterproofing-coating-systems',
    '/roofing-services/emergency-storm-repair',
    '/roofing-services/roof-inspections-surveys',
    '/commercial-hoa-roof-maintenance',
  ]

  const locationPages = CITIES.flatMap(city =>
    SERVICES.map(service => `/locations/${city}/${service}`)
  )

  const allPages = [...staticPages, ...locationPages]

  return allPages.map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/locations') ? 0.6 : 0.8,
  }))
}
