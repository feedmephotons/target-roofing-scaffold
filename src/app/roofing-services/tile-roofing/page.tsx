import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle,
  ShieldCheck,
  Sun,
  Wind,
  Building2,
  Award,
  Users,
  HardHat,
  ArrowRight,
  Phone,
  Layers,
  Clock,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CITIES, CITY_MAP } from '@/lib/locations'

export const metadata: Metadata = {
  title: 'Tile Roofing Services',
  description:
    'Expert tile roof repair, maintenance, and replacement in Southwest Florida. Target Roofing serves Fort Myers, Naples, Cape Coral and surrounding areas. License CCC1334168.',
  keywords: [
    'tile roofing',
    'tile roof repair',
    'tile roof replacement',
    'concrete tile roof',
    'clay tile roof',
    'barrel tile roof',
    'flat tile roof',
    'tile roofing Fort Myers',
    'tile roofing Southwest Florida',
    'tile roof maintenance',
  ],
  openGraph: {
    title: 'Tile Roofing Services | Target Roofing',
    description:
      'Expert tile roof repair, maintenance, and replacement in Southwest Florida. Concrete, clay, barrel, and flat tile systems built for hurricane country.',
    type: 'website',
  },
}

const features = [
  {
    label: 'Hurricane Resistance When Properly Installed',
    description:
      'Tile roofing systems installed with mechanical fasteners and foam adhesive meet Florida High Velocity Hurricane Zone requirements, protecting your home through the most intense storm seasons.',
    icon: Wind,
  },
  {
    label: 'Superior Heat Reflection',
    description:
      'The thermal mass and natural air gap beneath tile reduce heat transfer into your attic space, lowering cooling costs during Southwest Florida summers compared to asphalt shingle systems.',
    icon: Sun,
  },
  {
    label: '50+ Year Lifespan',
    description:
      'Concrete and clay tiles routinely outlast every other residential roofing material. With proper underlayment maintenance, a tile roof installed today can protect your home for half a century or more.',
    icon: Clock,
  },
  {
    label: 'Unmatched Curb Appeal',
    description:
      'Tile is the signature aesthetic of Southwest Florida architecture. Barrel, flat, and S-tile profiles in dozens of colors give your home a distinctive Mediterranean or contemporary look that holds its value.',
    icon: Building2,
  },
  {
    label: 'Low Maintenance Requirements',
    description:
      'Unlike shingles that degrade under UV exposure, tile resists fading, rot, and insect damage. Individual broken tiles can be replaced without disturbing the surrounding roof system.',
    icon: ShieldCheck,
  },
  {
    label: 'Fire and Wind-Driven Rain Resistance',
    description:
      'Tile carries a Class A fire rating and, when installed over proper underlayment, provides outstanding protection against wind-driven rain common during Florida tropical storms.',
    icon: Layers,
  },
]

const services = [
  {
    title: 'Tile Roof Repair',
    description:
      'Cracked, broken, or displaced tiles compromise your underlayment and invite water intrusion. We replace damaged tiles with matching profiles, reseal flashings, and inspect the full underlayment system to catch problems before they spread.',
  },
  {
    title: 'Tile Re-Roofing',
    description:
      'When the tiles are sound but the underlayment has reached end of life, we remove all tile, install new self-adhered modified bitumen or synthetic underlayment to current code, and reset or replace the tile. This extends your roof 25+ years at a fraction of full replacement cost.',
  },
  {
    title: 'New Tile Installation',
    description:
      'From new construction to full tear-off and replacement, we install concrete, clay, barrel, flat, and S-tile profiles with mechanically fastened and foam-adhered attachment systems engineered for your wind zone.',
  },
  {
    title: 'Tile Roof Maintenance Programs',
    description:
      'Our annual and semi-annual maintenance programs include full tile inspections, broken tile replacement, debris removal, mold and mildew treatment, and detailed condition reports with photos so you always know the state of your roof.',
  },
]

const whyTargetPoints = [
  {
    label: 'Owens Corning Platinum Preferred',
    description:
      'This top-tier certification recognizes our installation quality, customer satisfaction record, and commitment to ongoing training. It qualifies your project for the strongest manufacturer warranties available.',
    icon: Award,
  },
  {
    label: 'GAF Master Elite Certified',
    description:
      'Fewer than 2% of roofing contractors in North America hold this certification. It means access to the best warranties and proof of installation excellence across every roofing system we touch.',
    icon: Award,
  },
  {
    label: 'Decades of SWFL Tile Experience',
    description:
      'We have installed and maintained tile roof systems across Lee, Collier, and Charlotte counties for over 30 years. Our crews know how tile performs in this climate, on these structures, through these storms.',
    icon: Clock,
  },
  {
    label: 'Proper Underlayment Systems',
    description:
      'The tiles you see are only half the system. We install code-compliant self-adhered modified bitumen and high-temperature synthetic underlayments that protect your home when tiles crack or lift during storms.',
    icon: Layers,
  },
]

export default function TileRoofingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Tile Roofing Services',
            description:
              'Expert tile roof repair, maintenance, and replacement in Southwest Florida. Target Roofing serves Fort Myers, Naples, Cape Coral and surrounding areas. License CCC1334168.',
            provider: {
              '@type': 'RoofingContractor',
              '@id': 'https://targetroofers.com',
              name: 'Target Roofing',
            },
            areaServed: CITIES.filter((c) => c !== 'southwest-florida').map((c) => ({
              '@type': 'City',
              name: CITY_MAP[c].name,
            })),
            serviceType: 'Tile Roofing',
          }),
        }}
      />
      {/* ==================== BREADCRUMBS ==================== */}
      <section className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: 'Roofing Services', href: '/roofing-services' },
              { name: 'Tile Roofing' },
            ]}
          />
        </div>
      </section>

      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-working-tpo.png"
            alt="Target Roofing crew working on a tile roof in Southwest Florida"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/90 via-[var(--black)]/70 to-[var(--black)]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Southwest Florida Tile Specialists
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Tile Roofing Services
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              Expert tile roof repair, replacement, and installation for Southwest Florida homes and businesses. The signature look of the Gulf Coast, built to last decades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Schedule a Tile Roof Inspection
              </a>
              <a
                href="tel:+12393325707"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                Call (239) 332-5707
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OVERVIEW ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-aerial-mono.jpg" alt="" fill className="object-cover opacity-[0.04]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Layers className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    System Overview
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  The Signature Roof of Southwest Florida
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Tile roofing defines the architectural character of Southwest Florida. From the barrel tile profiles along Gulf Shore Boulevard to the flat concrete tiles on modern Cape Coral builds, tile is the most recognizable and enduring roofing material in our region. Concrete tile, clay tile, barrel tile, and flat tile each bring a distinct aesthetic while sharing the same core advantages: extreme longevity, hurricane resistance, and natural heat deflection.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  What most homeowners do not realize is that the tile itself is only the visible layer. Beneath every tile roof is an underlayment system that carries the real waterproofing burden. When tiles crack during a storm or shift over time, it is the underlayment that keeps water out of your home. That is why proper installation, with code-compliant self-adhered modified bitumen or high-temperature synthetic underlayment, is just as critical as the tile selection itself.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Target Roofing has installed and maintained tile roof systems across Fort Myers, Naples, Cape Coral, Bonita Springs, and Estero for over three decades. We work with every major tile profile and manufacturer, and every installation is engineered to meet current Florida Building Code requirements for wind uplift, underlayment, and hurricane strapping.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/crew-working-tpo.png"
                  alt="Target Roofing crew installing tile roofing on a Southwest Florida home"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-[var(--gray-500)]">
                <Layers className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                <span>Concrete and clay tiles routinely last 50 years or more in the Southwest Florida climate.</span>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES / BENEFITS GRID ==================== */}
      <section className="bg-blueprint-light py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <ShieldCheck className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Tile Roofing Advantages
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Why Tile Roofing Dominates in Southwest Florida
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                No other roofing material combines the durability, beauty, and storm performance that tile delivers in our subtropical Gulf Coast climate. Here is why homeowners and builders across the region continue to choose tile.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateIn key={feature.label} animation="fade-up" delay={idx * 100}>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all h-full">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
                      {feature.label}
                    </h3>
                    <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== OUR TILE ROOFING SERVICES ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-welding-mono.jpg" alt="" fill className="object-cover opacity-[0.03]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Our Tile Roofing Services
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Whether you need a single cracked tile replaced or a complete re-roof with new underlayment, Target Roofing has the expertise and crew to handle every phase of tile roof work.
              </p>
            </AnimateIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <AnimateIn key={service.title} animation={idx % 2 === 0 ? 'fade-left' : 'fade-right'} delay={100}>
                <div className="bg-[var(--gray-50)] rounded-lg p-8 border border-[var(--gray-200)] shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[var(--red)]/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-[var(--red)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[var(--gray-600)] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn animation="fade-up" delay={300}>
            <div className="mt-10 max-w-3xl mx-auto text-center">
              <p className="text-[var(--gray-600)] leading-relaxed">
                Every tile roofing project in Florida must comply with the Florida Building Code, including FBC Section 1507.3 for tile attachment, proper hurricane strapping to roof-to-wall connections, and approved waterproofing underlayment systems. Target Roofing ensures full compliance on every job, from permit to final inspection.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== WHY TARGET ROOFING ==================== */}
      <section className="bg-blueprint-dark text-white py-20 md:py-28 noise-overlay relative">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
                Your Tile Roofing Partner
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
                Why Target Roofing
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-300)] leading-relaxed max-w-3xl mx-auto">
                A tile roof is a 50-year investment. The contractor you choose determines whether it performs for five years or fifty. Target Roofing brings the certifications, workforce, and local experience to get it right.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyTargetPoints.map((point, idx) => {
              const Icon = point.icon
              return (
                <AnimateIn key={point.label} animation="fade-up" delay={idx * 100}>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors h-full">
                    <Icon className="h-8 w-8 text-[var(--red-light)] mb-4" />
                    <h3 className="font-bold text-white font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
                      {point.label}
                    </h3>
                    <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          <AnimateIn animation="fade-up" delay={400}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[10px] text-[var(--gray-400)] font-mono uppercase tracking-wider">License: CCC1334168</span>
                <span className="w-1 h-1 rounded-full bg-[var(--gray-500)]" />
                <span className="text-[10px] text-[var(--gray-400)] font-mono uppercase tracking-wider">Owens Corning Platinum</span>
                <span className="w-1 h-1 rounded-full bg-[var(--gray-500)]" />
                <span className="text-[10px] text-[var(--gray-400)] font-mono uppercase tracking-wider">GAF Master Elite</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== BACK TO SERVICES + CTA ==================== */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/roofing-services"
                className="inline-flex items-center gap-2 text-[var(--gray-600)] hover:text-[var(--red)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] font-semibold min-h-[44px] py-2 px-3"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                All Roofing Services
              </Link>
              <Link
                href="/our-process"
                className="inline-flex items-center gap-2 text-[var(--red)] hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] font-semibold min-h-[44px] py-2 px-3"
              >
                See Our Process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== INLINE LEAD CAPTURE FORM ==================== */}
      <section id="lead-form" className="bg-[var(--red)] text-white py-20 md:py-28 scroll-mt-24 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="scale">
            <InlineLeadForm
              defaultService="tile-roofing"
              title="Schedule Your Tile Roof Inspection"
              subtitle="Tell us about your tile roof and our team will provide a thorough inspection, detailed condition report, and repair or replacement estimate."
              buttonText="Request Tile Roof Inspection"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
