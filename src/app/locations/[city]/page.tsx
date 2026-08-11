import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Phone,
  Wrench,
  RotateCcw,
  Building2,
  ArrowRight,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Clock,
  Star,
  Award,
  FileCheck,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import InlineLeadForm from '@/components/InlineLeadForm'
import RoofSchematic from '@/components/RoofSchematic'
import { CITIES, CITY_MAP, SERVICES, SERVICE_MAP, isCity, type CitySlug, type ServiceSlug } from '@/lib/locations'

export const dynamicParams = false

const PHONE_DISPLAY = '239-332-5707'
const PHONE_HREF = 'tel:+12393325707'
const BASE_URL = 'https://targetroofers.com'

/** roof-repair leads (foot-in-the-door); replacement and commercial follow. */
const SERVICE_ICON: Record<ServiceSlug, typeof Wrench> = {
  'roof-repair': Wrench,
  'roof-replacement': RotateCcw,
  'commercial-roofing': Building2,
}

const SERVICE_BLURB: Record<ServiceSlug, string> = {
  'roof-repair':
    'Leaks, wind-lifted shingles, and storm damage fixed fast — with a same-day inspection report. This is where most of our relationships start.',
  'roof-replacement':
    'When repairs no longer pencil out, a fully permitted, wind-rated re-roof built with top-tier materials and our own crews.',
  'commercial-roofing':
    'Flat and low-slope systems, preventative maintenance plans, and rapid-response repairs for businesses, HOAs, and property managers.',
}

/** Short, locally-grounded "why this city" copy. Repair-first framing. */
const WHY_CITY: Record<CitySlug, string> = {
  'southwest-florida':
    'From Sarasota down to Naples, Southwest Florida takes the brunt of Gulf storms every hurricane season. We keep repair crews staged across all five counties, so a wind-lifted shingle or a fresh leak gets handled before the next afternoon downpour turns it into a ceiling stain.',
  'fort-myers':
    'Fort Myers roofs fight salt air off the Caloosahatchee, blistering summer UV, and the wind loads Hurricane Ian proved are real. A surprising number of our re-roofs here start as a single repair call — a downtown flat-roof seam or a leaking valley out in McGregor — that we catch early.',
  'cape-coral':
    'With more than 400 miles of canals, Cape Coral roofs live in salt spray that chews through fasteners and flashing faster than inland homes. A quick repair on a lifted ridge cap or a corroded pipe boot is often all it takes to add years before a full replacement is ever needed.',
  'bonita-springs':
    'Sitting between Fort Myers and Naples, Bonita Springs mixes Gulf-front condos with inland neighborhoods that flood in a hard rain. We chase leaks down to their real source — failed valleys, tired tile underlayment — so water stops before it reaches your drywall.',
  'sanibel':
    'Sanibel is still rebuilding after Hurricane Ian tore across the island in 2022. Whether it&rsquo;s a storm-damage repair to buy you time or a full coastal-code re-roof, we work within the island&rsquo;s strict construction and environmental rules from the first nail.',
  'naples':
    'Naples estates and the commercial corridor along US-41 expect tile and metal work that looks flawless and holds up to Collier County&rsquo;s high wind loads. We start nearly every job with a detailed repair inspection, so you only replace what actually needs replacing.',
  'punta-gorda':
    'Punta Gorda took direct hits from Charley in 2004 and Ian in 2022, so nobody here needs convincing that roofs matter. We handle everything from a fast leak repair around Charlotte Harbor to a fully wind-rated re-roof engineered for the next big blow.',
  'port-charlotte':
    'As Charlotte County&rsquo;s largest community, Port Charlotte spans older homes and fast-growing subdivisions — both battered by back-to-back hurricanes. A same-day repair keeps water out now, while we plan any bigger work around your schedule and budget.',
  'sarasota':
    'From Siesta Key barrier-island homes to the downtown arts district, Sarasota roofs face coastal wind and relentless sun. We lead with repairs — resealing a flashing, swapping cracked tile — and only recommend replacement when the numbers genuinely say so.',
  'arcadia':
    'Inland Arcadia still catches serious wind as tropical storms push through DeSoto County. On historic homes, agricultural buildings, and rural properties, a targeted repair is usually the smartest first move before committing to a full re-roof.',
}

export function generateStaticParams() {
  return CITIES.map((city) => ({ city }))
}

interface PageProps {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  if (!isCity(city)) return {}

  const { name } = CITY_MAP[city]

  return {
    // Template in layout appends " | Target Roofing"
    title: `Roofing in ${name}, FL`,
    description: `Roof repair, storm damage & replacement in ${name}, FL. Licensed, insured, 24/7 emergency dispatch. Call Target Roofing: ${PHONE_DISPLAY}.`,
    alternates: { canonical: `/locations/${city}` },
    openGraph: {
      title: `Roofing in ${name}, FL | Target Roofing`,
      description: `Fast roof repair, 24/7 storm response, and full re-roofs in ${name}, FL. FL License #CCC1334168. Call ${PHONE_DISPLAY}.`,
      url: `${BASE_URL}/locations/${city}`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Target Roofing — roofing services in ${name}, FL`,
        },
      ],
    },
  }
}

export default async function CityHubPage({ params }: PageProps) {
  const { city } = await params
  if (!isCity(city)) notFound()

  const cityData = CITY_MAP[city]
  const cityName = cityData.name

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${BASE_URL}/locations/${city}#business`,
    name: 'Target Roofing',
    url: `${BASE_URL}/locations/${city}`,
    telephone: '+1-239-332-5707',
    email: 'projects@targetroofers.com',
    image: 'https://targetroofers.com/og-image.jpg',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7011 Nalle Grade Rd',
      addressLocality: 'North Fort Myers',
      addressRegion: 'FL',
      postalCode: '33917',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: cityData.county,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '34',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Roofing services in ${cityName}, FL`,
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${SERVICE_MAP[service].title} in ${cityName}, FL`,
          url: `${BASE_URL}/locations/${city}/${service}`,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            items={[{ name: 'Locations', href: '/locations' }, { name: cityName }]}
            className="mb-8 [&_*]:text-white/50 [&_a:hover]:text-[var(--red)] [&_[aria-current]]:text-white"
          />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--red)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--red)] font-[family-name:var(--font-display)]">
                {cityData.county}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-[family-name:var(--font-display)] uppercase">
              Roofing in <br />
              <span className="text-[var(--red)]">{cityName}, FL</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              A leak doesn&apos;t wait for business hours — and neither do we. Target Roofing leads
              with fast, honest <strong className="text-white">roof repair</strong> in {cityName},
              backed by 24/7 emergency storm response and the option to re-roof only when it truly
              makes sense.
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
                href={`/locations/${city}/roof-repair`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/25 text-white text-sm font-bold uppercase tracking-wider rounded hover:border-[var(--red)] hover:text-[var(--red)] transition-colors font-[family-name:var(--font-display)]"
              >
                {cityName} Roof Repair
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 emergency strip */}
      <section className="bg-[var(--red)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-1 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">
            <Clock className="h-4 w-4" />
            Storm damage in {cityName}?
          </span>
          <span className="text-sm text-white/90">
            We dispatch 24/7 —{' '}
            <a href={PHONE_HREF} className="font-bold underline underline-offset-2 hover:text-white">
              call {PHONE_DISPLAY}
            </a>{' '}
            for emergency roof repair.
          </span>
        </div>
      </section>

      {/* Local detail + service cards */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: why + local facts */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <MapPin className="h-4 w-4 text-[var(--red)]" />
                  <span className="text-xs font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    Local to {cityName}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--black)] leading-tight uppercase font-[family-name:var(--font-display)] mb-4">
                  Why {cityName} Roofs Need a Local Crew
                </h2>
                <div className="red-accent-left">
                  <p
                    className="text-[var(--gray-700)] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: WHY_CITY[city] }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg">
                  <MapPin className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-[var(--black)] font-[family-name:var(--font-display)] uppercase">
                      Coverage
                    </h3>
                    <p className="text-sm text-[var(--gray-600)] mt-0.5">
                      {cityData.county} — ZIP codes {cityData.zipRange}.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg">
                  <FileCheck className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-[var(--black)] font-[family-name:var(--font-display)] uppercase">
                      Built to Code
                    </h3>
                    <p className="text-sm text-[var(--gray-600)] mt-0.5">
                      Every job meets {cityData.reg}.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-[var(--black)] font-[family-name:var(--font-display)] uppercase">
                      Licensed &amp; Trusted
                    </h3>
                    <p className="text-sm text-[var(--gray-600)] mt-0.5">
                      FL License #CCC1334168. GAF Master Elite — the top 2% of U.S. roofers. Rated
                      5.0 across 34 verified reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: service cards */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--black)] uppercase font-[family-name:var(--font-display)] mb-2">
                Roofing Services in {cityName}
              </h2>
              <p className="text-[var(--gray-500)] mb-6">
                Start with a repair. Scale up only if you need to.
              </p>

              <div className="space-y-4">
                {SERVICES.map((service) => {
                  const Icon = SERVICE_ICON[service]
                  const primary = service === 'roof-repair'
                  return (
                    <Link
                      key={service}
                      href={`/locations/${city}/${service}`}
                      className={`group block rounded-lg border p-6 transition-all hover:shadow-lg ${
                        primary
                          ? 'border-[var(--red)] bg-[var(--red)]/[0.04] shadow-sm'
                          : 'border-[var(--gray-200)] bg-white hover:border-[var(--red)]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${
                            primary ? 'bg-[var(--red)] text-white' : 'bg-[var(--gray-100)] text-[var(--red)]'
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide group-hover:text-[var(--red)] transition-colors">
                              {SERVICE_MAP[service].title}
                            </h3>
                            {primary && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[var(--red)] px-2 py-0.5 rounded-full">
                                Most requested
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-sm text-[var(--gray-600)] leading-relaxed">
                            {SERVICE_BLURB[service]}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--red)] font-[family-name:var(--font-display)]">
                            {SERVICE_MAP[service].title} in {cityName}
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg bg-[var(--gray-50)] border border-[var(--gray-200)] p-5">
                {[
                  { icon: Star, label: '5.0 / 34 verified reviews' },
                  { icon: Award, label: 'GAF Master Elite' },
                  { icon: Clock, label: '24/7 dispatch' },
                ].map((item) => {
                  const I = item.icon
                  return (
                    <span key={item.label} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gray-700)]">
                      <I className="h-4 w-4 text-[var(--red)]" />
                      {item.label}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-[var(--red)] text-white noise-overlay py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InlineLeadForm
            defaultService="repairs"
            title={`Request a Roof Repair in ${cityName}`}
            subtitle={`Tell us what's going on with your roof. A Target Roofing technician in a red polo will inspect your ${cityName} property and send a same-day report with clear next steps — repair first, always.`}
            buttonText="Request My Estimate"
            darkTheme={true}
            formId={`lead-${city}`}
          />
        </div>
      </section>

      {/* Pillar + region links */}
      <section className="bg-white py-12 border-t border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--gray-600)]">
              Want the full breakdown of how our repair process works?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/roofing-services/roof-repair"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--black)] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[var(--gray-800)] transition-colors font-[family-name:var(--font-display)]"
              >
                Roof Repair Guide
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--gray-300)] text-[var(--gray-700)] text-sm font-bold uppercase tracking-wider rounded hover:border-[var(--red)] hover:text-[var(--red)] transition-colors font-[family-name:var(--font-display)]"
              >
                All Service Areas
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
