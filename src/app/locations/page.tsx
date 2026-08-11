import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Wrench,
  RotateCcw,
  Building2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
  Award,
  ChevronRight,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import RoofSchematic from '@/components/RoofSchematic'
import { CITIES, CITIES_BY_COUNTY, CITY_MAP, SERVICES, SERVICE_MAP, type ServiceSlug } from '@/lib/locations'

const PHONE_DISPLAY = '239-332-5707'
const PHONE_HREF = 'tel:+12393325707'
const BASE_URL = 'https://targetroofers.com'

export const metadata: Metadata = {
  title: 'Roofing Service Areas in Southwest Florida',
  description:
    'Target Roofing serves Lee, Collier, Charlotte, Sarasota, and DeSoto counties with roof repair, storm damage response, and re-roofs. 24/7 emergency dispatch. Call 239-332-5707.',
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'Roofing Service Areas in Southwest Florida | Target Roofing',
    description:
      'Roof repair, 24/7 storm damage response, and full re-roofs across Lee, Collier, Charlotte, Sarasota, and DeSoto counties. FL License #CCC1334168.',
    url: `${BASE_URL}/locations`,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Target Roofing service areas across Southwest Florida',
      },
    ],
  },
}

/** roof-repair leads (foot-in-the-door); replacement and commercial follow. */
const SERVICE_ICON: Record<ServiceSlug, typeof Wrench> = {
  'roof-repair': Wrench,
  'roof-replacement': RotateCcw,
  'commercial-roofing': Building2,
}

export default function LocationsHubPage() {
  // CollectionPage + ItemList of every city hub, so search engines can crawl the
  // full service-area tree. Breadcrumbs (below) emits the BreadcrumbList separately.
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/locations#collection`,
    url: `${BASE_URL}/locations`,
    name: 'Roofing Service Areas in Southwest Florida',
    description:
      'Cities served by Target Roofing across Lee, Collier, Charlotte, Sarasota, and DeSoto counties.',
    isPartOf: { '@id': `${BASE_URL}#website` },
    about: { '@id': `${BASE_URL}` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CITIES.map((slug, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Roofing in ${CITY_MAP[slug].name}, FL`,
        url: `${BASE_URL}/locations/${slug}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden noise-overlay py-16 md:py-24">
        <RoofSchematic className="text-white/[0.04] z-0" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border-r-2 border-white/20 transform rotate-12 translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-l-2 border-white/20 transform -rotate-12 -translate-x-1/2 translate-y-1/4" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: 'Locations' }]}
            className="mb-8 [&_*]:text-white/50 [&_a:hover]:text-[var(--red)] [&_[aria-current]]:text-white"
          />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--red)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--red)] font-[family-name:var(--font-display)]">
                Where We Work
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 font-[family-name:var(--font-display)] uppercase">
              Roofing Service Areas in <span className="text-[var(--red)]">Southwest Florida</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              We lead with fast, honest <strong className="text-white">roof repair</strong> — the
              quickest way to stop a leak and protect your investment — and step up to full re-roofs
              only when the numbers say it&apos;s time. From the barrier islands to inland DeSoto
              County, our crews cover five counties with 24/7 storm-damage response.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg font-[family-name:var(--font-display)]"
              >
                <Phone className="h-4 w-4" />
                Call {PHONE_DISPLAY}
              </a>
              <Link
                href="/roofing-services/roof-repair"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/25 text-white text-sm font-bold uppercase tracking-wider rounded hover:border-[var(--red)] hover:text-[var(--red)] transition-colors font-[family-name:var(--font-display)]"
              >
                Explore Roof Repair
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / intro strip */}
      <section className="bg-white border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Star, label: '5.0 from 34 verified reviews' },
              { icon: Award, label: 'GAF Master Elite — Top 2% of U.S. roofers' },
              { icon: ShieldCheck, label: 'FL License #CCC1334168' },
              { icon: Clock, label: '24/7 Emergency Storm Dispatch' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 text-[var(--red)] flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[var(--gray-700)] leading-tight">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Regional roll-up (southwest-florida excluded from the county grid) */}
      <section className="bg-[var(--gray-50)] pt-14 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/locations/southwest-florida"
            className="group block relative overflow-hidden rounded-xl bg-[var(--black)] text-white p-8 md:p-10 border border-[var(--gray-800)] hover:border-[var(--red)] transition-colors noise-overlay"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--red)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)] font-[family-name:var(--font-display)]">
                  Regional Overview
                </span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold uppercase font-[family-name:var(--font-display)]">
                  All of Southwest Florida
                </h2>
                <p className="mt-2 text-[var(--gray-300)] leading-relaxed">
                  One crew, five counties. See how we handle repairs, storm response, and re-roofs
                  across the whole region — from Sarasota down to Naples.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:text-[var(--red)] transition-colors font-[family-name:var(--font-display)] flex-shrink-0">
                View Region
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Cities grouped by county */}
      <section className="bg-[var(--gray-50)] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
          {CITIES_BY_COUNTY.map(({ county, cities }) => (
            <div key={county}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-[var(--red)]" />
                <h2 className="text-xl md:text-2xl font-bold text-[var(--black)] uppercase font-[family-name:var(--font-display)]">
                  {county}
                </h2>
                <div className="h-px flex-1 bg-[var(--gray-200)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((slug) => {
                  const city = CITY_MAP[slug]
                  return (
                    <div
                      key={slug}
                      className="group bg-white rounded-lg border border-[var(--gray-200)] shadow-sm hover:shadow-lg hover:border-[var(--red)] transition-all overflow-hidden flex flex-col"
                    >
                      <Link href={`/locations/${slug}`} className="block p-6 pb-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-[var(--red)] transition-colors">
                            {city.name}
                          </h3>
                          <ArrowRight className="h-4 w-4 text-[var(--gray-300)] group-hover:text-[var(--red)] group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                        </div>
                        <p className="mt-1 text-xs text-[var(--gray-500)]">
                          ZIP codes {city.zipRange.split(',')[0].trim()}
                          {city.zipRange.includes(',') ? ' and more' : ''}
                        </p>
                      </Link>

                      <div className="mt-auto border-t border-[var(--gray-100)] px-6 py-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray-400)] mb-2.5 font-[family-name:var(--font-display)]">
                          Services in {city.name}
                        </p>
                        <div className="flex flex-col gap-1.5">
                          {SERVICES.map((service) => {
                            const Icon = SERVICE_ICON[service]
                            const primary = service === 'roof-repair'
                            return (
                              <Link
                                key={service}
                                href={`/locations/${slug}/${service}`}
                                className={`inline-flex items-center gap-2 text-sm rounded px-2.5 py-1.5 transition-colors ${
                                  primary
                                    ? 'bg-[var(--red)]/10 text-[var(--red)] font-semibold hover:bg-[var(--red)]/15'
                                    : 'text-[var(--gray-600)] hover:text-[var(--red)] hover:bg-[var(--gray-50)]'
                                }`}
                              >
                                <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                                {SERVICE_MAP[service].title}
                                {primary && (
                                  <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-[var(--red)]">
                                    Start here
                                  </span>
                                )}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[var(--red)] text-white noise-overlay py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-[family-name:var(--font-display)] mb-4">
            Don&apos;t See Your Town? We Still Cover It.
          </h2>
          <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            If you&apos;re anywhere in Lee, Collier, Charlotte, Sarasota, or DeSoto County, we can be
            on your roof for a repair or storm-damage inspection. Call and we&apos;ll get a crew
            headed your way.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--red)] text-sm font-bold uppercase tracking-wider rounded hover:bg-[var(--gray-100)] transition-colors shadow-lg font-[family-name:var(--font-display)]"
            >
              <Phone className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/roofing-services/roof-repair"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/40 text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-white/10 transition-colors font-[family-name:var(--font-display)]"
            >
              Learn About Roof Repair
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
