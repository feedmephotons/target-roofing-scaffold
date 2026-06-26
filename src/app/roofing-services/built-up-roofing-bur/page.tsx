import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Layers,
  ShieldCheck,
  Thermometer,
  Footprints,
  CheckCircle,
  Award,
  Users,
  HardHat,
  Phone,
  ArrowRight,
  Building2,
  Clock,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Built-Up Roofing (BUR) Systems | Target Roofing',
  description:
    'Traditional multi-ply built-up roofing (BUR) systems for commercial properties in Southwest Florida. Hot-applied and cold-applied BUR with gravel or cap sheet surfacing. 30+ years of experience. GAF Master Elite certified.',
  openGraph: {
    title: 'Built-Up Roofing (BUR) Systems | Target Roofing',
    description:
      'Multi-ply built-up roofing systems engineered for Southwest Florida commercial properties. Proven waterproofing with 100+ year track record.',
    type: 'website',
  },
}

const features = [
  {
    label: 'Multi-Layer Redundancy',
    description:
      'Alternating plies of bitumen and reinforcing fabric create multiple waterproofing barriers, so a single puncture never compromises the entire system.',
    icon: Layers,
  },
  {
    label: 'Hot & Cold Application',
    description:
      'We install both hot-applied (mopped asphalt) and cold-applied (adhesive) BUR systems, matching the method to your building requirements and occupancy.',
    icon: Thermometer,
  },
  {
    label: 'Gravel or Cap Sheet Surfacing',
    description:
      'Gravel surfacing provides superior UV protection and fire resistance, while mineral cap sheets offer a smoother, lighter-weight finish for re-roofing projects.',
    icon: ShieldCheck,
  },
  {
    label: '100+ Year Track Record',
    description:
      'BUR is the oldest and most proven commercial roofing system in North America. The multi-ply design has protected buildings since the 1800s.',
    icon: Award,
  },
  {
    label: 'Foot Traffic Resistance',
    description:
      'The rigid, gravel-surfaced membrane withstands heavy foot traffic from HVAC technicians, maintenance crews, and rooftop equipment access.',
    icon: Footprints,
  },
  {
    label: 'Energy Code Compliance',
    description:
      'BUR integrates seamlessly with polyiso and other rigid insulation boards to meet Florida Building Code energy requirements without compromising waterproofing.',
    icon: Building2,
  },
]

const whyTargetReasons = [
  {
    label: '30+ Years in Southwest Florida',
    description:
      'We have installed and maintained BUR systems across Sarasota, Fort Myers, Naples, and the surrounding region since 1993.',
    icon: Clock,
  },
  {
    label: 'GAF Master Elite Certified',
    description:
      'Only the top 2% of commercial roofing contractors in the U.S. earn this designation. It means higher material warranties and proven workmanship standards.',
    icon: Award,
  },
  {
    label: '100% Direct Employees',
    description:
      'Every crew member on your roof is a full-time Target Roofing employee. No subcontractors, no temporary labor, no shortcuts.',
    icon: Users,
  },
  {
    label: 'Dedicated Project Management',
    description:
      'A single point of contact manages your BUR installation from survey through final inspection, with documented schedules and photo updates at every milestone.',
    icon: HardHat,
  },
]

export default function BuiltUpRoofingPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-roof-inspection-hires.png"
            alt="Target Roofing crew inspecting a commercial built-up roof in Southwest Florida"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/90 via-[var(--black)]/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Commercial Roofing Systems
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Built-Up Roofing (BUR) Systems
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              Traditional multi-ply roofing engineered for Southwest Florida&apos;s
              toughest conditions. Proven waterproofing, unmatched durability, and
              the redundancy that large commercial properties demand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Request a BUR Estimate
              </a>
              <a
                href="tel:2393325707"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                (941) 432-0011
              </a>
            </div>
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <AnimateIn animation="fade-up">
                <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-3 font-[family-name:var(--font-display)]">
                  System Overview
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  What Is Built-Up Roofing?
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-6">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Built-up roofing (BUR) is a time-tested commercial roofing
                    system constructed from alternating layers of bitumen and
                    reinforcing fabrics, finished with a protective surfacing of
                    gravel aggregate or mineral cap sheet. Each ply adds another
                    independent waterproofing barrier, giving the completed assembly
                    a level of redundancy that single-ply membranes cannot match.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  In Southwest Florida, where commercial roofs face relentless UV
                  exposure, driving rain, and hurricane-force winds, BUR&apos;s
                  multi-layer construction provides critical insurance against leaks.
                  The system&apos;s mass and rigidity also make it an excellent
                  platform for rooftop mechanical equipment - HVAC units, exhaust
                  fans, and satellite arrays - without the puncture risk associated
                  with thinner single-ply alternatives.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Target Roofing installs both hot-applied and cold-applied BUR
                  systems, selecting the appropriate method based on the building&apos;s
                  structure, occupancy requirements, and budget. Whether you are
                  re-roofing an aging warehouse in Fort Myers, a retail strip center
                  in Sarasota, or a government facility in Naples, our crews bring
                  the equipment, training, and project management discipline to
                  deliver a watertight roof on schedule and within budget.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/crew-team-photo.png"
                  alt="Target Roofing crew on a completed commercial roofing project"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES / BENEFITS GRID ==================== */}
      <section className="bg-blueprint-light py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-3 font-[family-name:var(--font-display)]">
                Advantages
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-4">
                Why Choose a BUR System?
              </h2>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                Built-up roofing remains one of the most reliable and cost-effective
                systems for large-footprint commercial properties. Here is what sets
                it apart.
              </p>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateIn key={idx} animation="fade-up" delay={idx * 100}>
                  <div className="bg-white rounded-lg p-8 shadow-sm border border-[var(--gray-200)] h-full hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-lg bg-[var(--red)]/10 flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-[var(--red)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--black)] mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide">
                      {feature.label}
                    </h3>
                    <p className="text-[var(--gray-600)] leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== WHY TARGET ROOFING ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-3 font-[family-name:var(--font-display)]">
                The Target Difference
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-4">
                Why Target Roofing for Your BUR Project
              </h2>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                Choosing a BUR system is only half the equation. The contractor
                installing it determines whether the roof performs for 15 years or
                25. Here is why property managers across Southwest Florida trust
                Target Roofing.
              </p>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {whyTargetReasons.map((reason, idx) => {
              const Icon = reason.icon
              return (
                <AnimateIn key={idx} animation="fade-up" delay={idx * 100}>
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[var(--red)]/10 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-[var(--red)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--black)] mb-2 font-[family-name:var(--font-display)] uppercase tracking-wide">
                        {reason.label}
                      </h3>
                      <p className="text-[var(--gray-600)] leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          {/* Credentials bar */}
          <AnimateIn animation="fade-up" delay={400}>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 p-6 bg-blueprint-dark rounded-lg text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[var(--red-light)]" />
                <span className="text-sm font-semibold uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Licensed &amp; Insured
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/20" />
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-[var(--red-light)]" />
                <span className="text-sm font-semibold uppercase tracking-wider font-[family-name:var(--font-display)]">
                  GAF Master Elite
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/20" />
              <div className="text-xs text-[var(--gray-400)] font-mono">
                FL LICENSE: CCC1334168
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== INLINE LEAD CAPTURE FORM ==================== */}
      <section id="lead-form" className="bg-[var(--red)] text-white py-20 md:py-28 scroll-mt-24 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="scale">
            <InlineLeadForm
              defaultService="built-up-roofing"
              title="Get a BUR Estimate for Your Property"
              subtitle="Tell us about your commercial roofing project. Our team will survey your property and deliver a detailed proposal with material options, timelines, and pricing."
              buttonText="Request BUR Estimate"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
