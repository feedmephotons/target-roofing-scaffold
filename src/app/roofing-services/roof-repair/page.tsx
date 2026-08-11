import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  Search,
  Droplets,
  CloudRain,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Clock,
  MapPin,
  Wrench,
  Scale,
  FileText,
  Home,
  Layers,
  Wind,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CITIES, CITY_MAP } from '@/lib/locations'

export const metadata: Metadata = {
  title: 'Roof Repair in Fort Myers & SW Florida',
  description:
    'Fast, honest roof repair and leak fixes for SW Florida homes and businesses. 24/7 storm-damage response and free repair surveys. Call 239-332-5707.',
  alternates: { canonical: '/roofing-services/roof-repair' },
  keywords: [
    'roof repair',
    'roof leak repair',
    'emergency roof repair',
    'roof repair Fort Myers',
    'roof repair Cape Coral',
    'storm damage roof repair',
    'flat roof repair',
    'tile roof repair',
    'roof repair Southwest Florida',
    'Target Roofing',
  ],
  openGraph: {
    title: 'Roof Repair in Fort Myers & Southwest Florida | Target Roofing',
    description:
      'Fast, honest roof repair and leak fixes for homes and businesses across Southwest Florida. 24/7 storm-damage response and free repair surveys.',
    url: 'https://targetroofers.com/roofing-services/roof-repair',
    type: 'website',
    images: [
      {
        url: 'https://targetroofers.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Target Roofing technician repairing a roof leak in Southwest Florida',
      },
    ],
  },
}

const repairTypes = [
  {
    icon: Layers,
    title: 'Flat & Membrane Roof Repair',
    desc: 'Ponding water, split seams, and punctures around rooftop equipment are the usual failures on low-slope TPO, PVC, and built-up roofs. We heat-weld membrane patches, re-flash penetrations, and re-seal seams so the repair bonds as one continuous surface.',
  },
  {
    icon: Home,
    title: 'Shingle Roof Repair',
    desc: 'Wind-lifted, cracked, or missing shingles let water reach the underlayment. We replace damaged shingles with matching profiles, re-seal exposed nails, and rebuild flashing at walls, valleys, and chimneys where most shingle leaks actually start.',
  },
  {
    icon: ShieldCheck,
    title: 'Tile Roof Repair',
    desc: 'A cracked or slipped tile is cosmetic. The real leak is the torn underlayment beneath it. We lift the tile, repair or replace the underlayment that does the waterproofing, and reset a matching tile so the system sheds water again.',
  },
  {
    icon: Wind,
    title: 'Metal Roof Repair',
    desc: 'Backed-out fasteners, failed sealant at panel laps, and corroded flashing are the leak points on standing-seam and R-panel roofs. We replace fasteners with oversized gaskets, re-seal laps, and treat rust before it spreads across the panel.',
  },
]

const repairFaqs = [
  {
    q: 'How do you find a roof leak when the stain is nowhere near the roof damage?',
    a: 'Water travels along the deck and framing before it shows up inside, so the stain is rarely directly under the breach. We trace it back to the source using interior stain mapping, a close exterior inspection of flashing and penetrations, and infrared moisture scanning on flat roofs. We repair the cause, not the symptom.',
  },
  {
    q: 'Should I repair my roof or replace it?',
    a: 'If the roof is relatively young, the leak is isolated, and the deck is sound, a repair is the smart, affordable choice. If you are repairing it every storm season or a large share of the roof is failing, a replacement usually costs less over time. We show you both numbers with photos and let you decide - no pressure.',
  },
  {
    q: 'Do you offer 24/7 emergency roof repair?',
    a: 'Yes. Our crews respond around the clock, 365 days a year, across Southwest Florida. For active leaks and storm damage we tarp and stabilize fast - often in under two hours during an active emergency - then complete the permanent repair once the property is secure. Call 239-332-5707.',
  },
  {
    q: 'Will insurance cover my roof repair?',
    a: 'Storm and sudden accidental damage are frequently covered, while normal wear and age are not. We document the damage with dated photos, provide an itemized scope of work, and coordinate directly with your adjuster so the claim reflects everything the storm actually did to your roof.',
  },
  {
    q: 'Do you warranty your roof repairs?',
    a: 'Every Target Roofing repair carries a one-year workmanship warranty. If a repair we performed leaks again within that year, we return and correct it at no cost to you. That warranty is our incentive to fix the real problem the first time.',
  },
  {
    q: 'What does a roof repair cost in Southwest Florida?',
    a: 'It depends on the roof type, the source of the leak, and roof access, but most residential repairs are a small fraction of a full replacement. We provide a free repair survey and an itemized, no-obligation estimate before any work begins.',
  },
]

export default function RoofRepairPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Roof Repair',
            description:
              'Fast, honest roof repair and leak fixes for residential and commercial properties across Southwest Florida, including 24/7 emergency and storm-damage response.',
            provider: {
              '@type': 'RoofingContractor',
              '@id': 'https://targetroofers.com',
              name: 'Target Roofing',
            },
            areaServed: CITIES.filter((c) => c !== 'southwest-florida').map((c) => ({
              '@type': 'City',
              name: CITY_MAP[c].name,
            })),
            serviceType: 'Roof Repair',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: repairFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* ==================== BREADCRUMBS ==================== */}
      <section className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: 'Roofing Services', href: '/roofing-services' },
              { name: 'Roof Repair' },
            ]}
          />
        </div>
      </section>

      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-repairing-roof.png"
            alt="Target Roofing technician repairing a roof leak on a Southwest Florida home"
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
              Leak Fixes &amp; Storm Repair
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Roof Repair
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              A leak does not wait for business hours, and neither do we. Target
              Roofing fixes roof leaks, storm damage, and failing flashing across
              Southwest Florida - fast, honestly, and backed by a one-year
              workmanship warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12393325707"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                <Phone className="h-5 w-5 animate-bounce" />
                Call 239-332-5707
              </a>
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <FileText className="h-4 w-4" />
                Get a Free Repair Survey
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 24/7 DISPATCH BANNER ==================== */}
      <section className="bg-[var(--red)] text-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <span className="font-bold uppercase tracking-wider text-sm font-[family-name:var(--font-display)]">
                24/7 Emergency Repair
              </span>
            </div>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href="tel:+12393325707"
              className="font-bold text-lg hover:underline font-[family-name:var(--font-display)]"
            >
              239-332-5707
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/80 text-sm">
              Active leak or storm damage? We tarp and stabilize the same day.
            </span>
          </div>
        </div>
      </section>

      {/* ==================== OVERVIEW ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-aerial-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Wrench className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    Repairs Come First
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  We Fix Roofs Before We Sell Them
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Most roofing companies want to sell you a new roof on the
                    first visit. We do it backward, on purpose. A repair is the
                    fastest way to stop water from destroying your ceilings,
                    insulation, and drywall - and it is the honest first step
                    for a roof that still has years of life left in it.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  When a repair genuinely will not hold, we tell you that too,
                  with photos and a straight explanation of why. That is how a
                  leaky-shingle call in Fort Myers becomes a customer who trusts
                  us with the full re-roof three years later. A repair earns the
                  relationship; the replacement follows when the roof actually
                  needs it, not before.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Target Roofing has repaired roofs across Lee, Collier,
                  Charlotte, Sarasota, and DeSoto counties for more than 30
                  years. Every technician who climbs your ladder is a direct,
                  background-checked Target Roofing employee in a red polo -
                  never a day-labor subcontractor. We repair asphalt shingle,
                  tile, metal, TPO, PVC, modified bitumen, and built-up roofs,
                  so we can diagnose the leak no matter what is over your head.
                </p>
              </AnimateIn>
            </div>

            {/* Right Column: Free Survey Card */}
            <div className="space-y-6">
              <AnimateIn animation="fade-right">
                <div className="relative bg-[var(--black)] rounded-lg shadow-md p-8 border-t-4 border-[var(--red)] text-white overflow-hidden noise-overlay">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--red)] rounded-full opacity-10 blur-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-3 h-3 rounded-full bg-[var(--red)] animate-pulse" />
                      <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--red-light)] font-[family-name:var(--font-display)]">
                        Free Repair Survey
                      </h3>
                    </div>
                    <h4 className="text-2xl font-bold uppercase mb-4 font-[family-name:var(--font-display)]">
                      Find the Leak. Fix the Cause.
                    </h4>
                    <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-6">
                      We photograph the damage, trace the leak to its source, and
                      hand you an itemized, no-obligation estimate - usually
                      within 24 hours of your call.
                    </p>
                    <a
                      href="tel:+12393325707"
                      className="inline-flex items-center justify-center gap-3 w-full py-4 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wider rounded transition-colors text-lg font-[family-name:var(--font-display)] shadow-lg shadow-black/25"
                    >
                      <Phone className="h-6 w-6 animate-bounce" />
                      Call 239-332-5707
                    </a>
                    <p className="text-center text-[10px] text-[var(--gray-400)] mt-3">
                      Licensed &amp; insured. FL Lic #CCC1334168.
                    </p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <div className="bg-[var(--gray-50)] rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
                  <h4 className="font-bold text-[var(--black)] mb-4 font-[family-name:var(--font-display)] uppercase tracking-wide text-sm">
                    Leaks We Repair Every Week
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Cracked pipe boots and failed seals around HVAC curbs',
                      'Wind-lifted or missing shingles after a tropical storm',
                      'Slipped tile that tore the underlayment beneath it',
                      'Split seams and ponding on flat commercial roofs',
                      'Corroded valley metal and backed-out panel fasteners',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--gray-700)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LEAK DETECTION ==================== */}
      <section className="bg-blueprint-light py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn animation="fade-right">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/generated/09-inspection-pointing-damage.png"
                  alt="Target Roofing technician tracing a roof leak to its source during an inspection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimateIn>

            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Search className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    Leak Detection &amp; Tracing
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Finding the Leak Is 90% of the Repair
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  Water rarely enters where it drips. It travels along the
                  underside of the deck, down the rafters, and across the ceiling
                  joists before it finally shows up as a stain three feet from the
                  actual breach. Patch the stain and the roof keeps leaking. Trace
                  it to the source and the repair holds.
                </p>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  Our technicians map interior staining, inspect every flashing,
                  penetration, and fastener on the exterior, and - on flat
                  commercial roofs - run infrared moisture scans that reveal wet
                  insulation invisible from the surface. In Southwest Florida the
                  usual culprits are cracked pipe boots, failed sealant around
                  rooftop equipment, wind-lifted shingles, corroded valley metal,
                  and tile that shifted and tore the underlayment.
                </p>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={300}>
                <div className="flex items-center gap-3 text-sm text-[var(--gray-500)]">
                  <Droplets className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                  <span>We fix the cause of the leak, not just the ceiling stain it left behind.</span>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== REPAIR BY ROOF TYPE ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-welding-mono.jpg" alt="" fill className="object-cover opacity-[0.03]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Repair for Every Roof We Build
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-[var(--gray-600)] leading-relaxed text-lg max-w-3xl mx-auto">
                A tile leak and a flat-roof leak fail for completely different
                reasons. Because we install every one of these systems, we know
                exactly where each type breaks down and how to make the repair
                last.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {repairTypes.map((type, idx) => {
              const Icon = type.icon
              return (
                <AnimateIn key={type.title} animation="fade-up" delay={idx * 100}>
                  <div className="bg-[var(--gray-50)] rounded-lg p-8 border border-[var(--gray-200)] shadow-sm hover:shadow-md hover:border-[var(--red)] transition-all h-full">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <h3 className="font-bold text-[var(--black)] text-xl font-[family-name:var(--font-display)] uppercase tracking-wide mb-3">
                      {type.title}
                    </h3>
                    <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                      {type.desc}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== STORM & INSURANCE ==================== */}
      <section className="bg-blueprint-dark text-white py-20 md:py-28 noise-overlay relative">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-white/10 rounded">
                  <CloudRain className="h-5 w-5 text-[var(--red-light)]" />
                  <span className="text-sm font-semibold text-[var(--red-light)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    Storm &amp; Hurricane Damage
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
                  Fast Storm Repair, Handled Insurance
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-300)] leading-relaxed">
                    Southwest Florida takes a beating from June through November.
                    After a tropical storm or hurricane, a fast repair - or at
                    minimum an emergency tarp - is what stands between a wet
                    ceiling and a five-figure interior loss.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-400)] leading-relaxed mb-8">
                  We respond 24/7/365 and document the damage with dated photos
                  before we touch anything, then work directly with your insurance
                  adjuster so the claim reflects the full scope of the storm. If
                  the damage is repairable, we repair it. If your carrier approves
                  a replacement, we handle that too. Either way, you get the
                  documentation the claim requires - and you never sign with an
                  out-of-state storm chaser working out of a rental truck.
                </p>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={300}>
                <Link
                  href="/roofing-services/emergency-storm-repair"
                  className="inline-flex items-center gap-2 text-[var(--red-light)] font-semibold hover:text-white transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)]"
                >
                  Emergency &amp; Storm Repair Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimateIn>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Clock,
                  title: 'Under 2-Hour Emergency Response',
                  desc: 'Active leak in a storm? Our local crews tarp and stabilize the property fast, day or night, before water spreads.',
                },
                {
                  icon: FileText,
                  title: 'Adjuster-Ready Documentation',
                  desc: 'Dated photos, measurements, and an itemized scope of work that carriers accept - so nothing the storm did gets missed.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Licensed, Local, Accountable',
                  desc: 'FL Lic #CCC1334168 and a permanent Southwest Florida address. We are still here long after the storm chasers leave town.',
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <AnimateIn key={idx} animation="fade-right" delay={idx * 100}>
                    <div className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[var(--red)]/30 transition-colors">
                      <Icon className="h-8 w-8 text-[var(--red)] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-wide font-[family-name:var(--font-display)] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== REPAIR VS REPLACE ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="bg-[var(--gray-50)] rounded-lg shadow-md p-8 md:p-10 border-t-4 border-[var(--red)]">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <Scale className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  The Honest Answer
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)] uppercase">
                Repair or Replace? Here Is the Real Math.
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-[var(--gray-600)] leading-relaxed">
                  If your roof is under 15 years old, the leak is isolated, and
                  the deck is sound, a repair is almost always the right call and
                  a fraction of the cost of replacement. There is no reason to buy
                  a new roof to fix a cracked pipe boot.
                </p>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  But if you are patching the same roof every storm season, the
                  underlayment has gone brittle, or more than a third of the field
                  is failing, you are throwing good money after bad - and a
                  re-roof will cost less over five years than a string of repairs.
                  We give you both numbers and the photos behind them, then let you
                  decide. No pressure, no scare tactics, no manufactured urgency.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Free photo-documented repair survey',
                  'Itemized repair estimate within 24 hours',
                  'Side-by-side repair vs. replace numbers',
                  'One-year workmanship warranty on repairs',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0" />
                    <span className="text-sm text-[var(--gray-700)] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={150}>
            <div className="mt-8 flex items-start gap-4 rounded-lg border border-[var(--gray-200)] bg-white p-6 shadow-sm">
              <ShieldCheck className="h-8 w-8 text-[var(--red)] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide mb-1">
                  Backed by a One-Year Repair Warranty
                </h3>
                <p className="text-[var(--gray-600)] leading-relaxed text-sm">
                  Every Target Roofing repair is covered by a one-year workmanship
                  warranty. If a repair we made leaks again within that window, we
                  come back and make it right at no charge. That warranty is our
                  incentive to fix the actual problem the first time - not to sell
                  you a temporary patch.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-blueprint-light py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <FileText className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Roof Repair FAQ
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Roof Repair Questions, Answered Straight
              </h2>
            </AnimateIn>
          </div>

          <div className="space-y-4">
            {repairFaqs.map((faq, idx) => (
              <AnimateIn key={faq.q} animation="fade-up" delay={idx * 60}>
                <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 md:p-8 shadow-sm">
                  <h3 className="font-bold text-[var(--black)] text-lg font-[family-name:var(--font-display)] mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-[var(--gray-600)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ROOF REPAIR BY CITY ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimateIn animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <MapPin className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Local Roof Repair
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Roof Repair by City
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-[var(--gray-600)] leading-relaxed text-lg max-w-3xl mx-auto">
                We dispatch local repair crews across Southwest Florida. Find
                roof repair details and code specifics for your community below.
              </p>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {CITIES.map((city, idx) => (
              <AnimateIn key={city} animation="fade-up" delay={idx * 40}>
                <Link
                  href={`/locations/${city}/roof-repair`}
                  className="group flex items-center justify-between gap-2 rounded-lg border border-[var(--gray-200)] bg-[var(--gray-50)] px-4 py-3 hover:border-[var(--red)] hover:bg-white transition-all"
                >
                  <span className="text-sm font-semibold text-[var(--gray-700)] group-hover:text-[var(--red)] font-[family-name:var(--font-display)]">
                    {CITY_MAP[city].name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[var(--gray-400)] group-hover:text-[var(--red)] flex-shrink-0 transition-colors" />
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BACK TO SERVICES ==================== */}
      <section className="bg-blueprint-light py-12">
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
                href="/roofing-services/roof-inspections-surveys"
                className="inline-flex items-center gap-2 text-[var(--red)] hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] font-semibold min-h-[44px] py-2 px-3"
              >
                Roof Inspections &amp; Surveys
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
              defaultService="repairs"
              title="Request a Free Repair Survey"
              subtitle="Tell us where the roof is leaking and our team will trace the source, document the damage, and send an itemized repair estimate. For active leaks, call 239-332-5707 directly."
              buttonText="Request My Repair Survey"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
