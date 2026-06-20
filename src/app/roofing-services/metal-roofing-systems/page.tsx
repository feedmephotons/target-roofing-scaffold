import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShieldCheck,
  Wind,
  Building2,
  Paintbrush,
  Zap,
  Recycle,
  CheckCircle,
  Award,
  Users,
  Clock,
  ArrowRight,
  HardHat,
  Phone,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Metal Roofing Systems | Commercial Standing Seam & R-Panel',
  description:
    'Durable standing seam, corrugated, and R-panel metal roofing systems engineered for Southwest Florida hurricane conditions. Wind ratings up to 180 mph. 40-60 year lifespans. Installed by Target Roofing.',
  openGraph: {
    title: 'Metal Roofing Systems | Target Roofing',
    description:
      'Standing seam, corrugated, and R-panel metal roofing for commercial buildings in Southwest Florida. Hurricane-rated up to 180 mph with 40-60 year lifespans.',
    type: 'website',
  },
}

const features = [
  {
    label: 'Standing Seam Panels with Concealed Fastener Systems',
    description:
      'Interlocking panels eliminate exposed fasteners, preventing water infiltration and reducing long-term maintenance. The concealed clip system allows thermal expansion without panel stress.',
    icon: ShieldCheck,
  },
  {
    label: 'Wind Ratings Up to 180 MPH for Hurricane Zones',
    description:
      'Engineered and tested to meet Florida Building Code High-Velocity Hurricane Zone requirements. Every panel attachment is calculated for your specific building geometry and exposure category.',
    icon: Wind,
  },
  {
    label: 'Corrugated and R-Panel Options for Commercial Buildings',
    description:
      'Cost-effective exposed-fastener profiles ideal for warehouses, manufacturing facilities, and large-footprint commercial structures where budget efficiency is the priority.',
    icon: Building2,
  },
  {
    label: 'Factory-Applied Kynar 500 Finishes Resist Fading and Chalking',
    description:
      'PVDF-based coatings maintain color integrity for 30+ years, even under the intense Southwest Florida UV exposure. Available in over 40 standard colors with custom matching.',
    icon: Paintbrush,
  },
  {
    label: 'Lightning-Safe and Non-Combustible',
    description:
      'Metal roofing dissipates electrical charges safely and carries a Class A fire rating. A critical advantage for Florida properties during the June-through-September lightning season.',
    icon: Zap,
  },
  {
    label: 'Fully Recyclable at End of Life',
    description:
      'Metal roofing is 100% recyclable with no landfill impact. Most panels contain 25-30% recycled content at manufacture, supporting LEED and green building certification goals.',
    icon: Recycle,
  },
]

const whyTargetPoints = [
  {
    label: '30+ Years of Commercial Roofing Experience',
    description:
      'Three decades of installing and maintaining metal roof systems on commercial properties throughout Lee, Collier, and Charlotte counties.',
    icon: Award,
  },
  {
    label: 'GAF Master Elite Certified Contractor',
    description:
      'Only the top 2% of roofing contractors in the country earn this designation, qualifying us for the strongest manufacturer warranties in the industry.',
    icon: ShieldCheck,
  },
  {
    label: '100% Direct Employees - No Subcontractors',
    description:
      'Every crew member is a full-time Target Roofing employee. Background-checked, safety-certified, and accountable to our quality standards.',
    icon: Users,
  },
  {
    label: '24/7/365 Emergency Response',
    description:
      'Storm damage to your metal roof system? Our rapid-response teams are dispatched within hours, not days. Local crews in Fort Myers, Naples, and Sarasota.',
    icon: Clock,
  },
]

export default function MetalRoofingSystemsPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-repairing-roof.png"
            alt="Target Roofing crew installing a commercial metal roofing system in Southwest Florida"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/90 via-[var(--black)]/70 to-[var(--black)]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Commercial Metal Roofing
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Metal Roofing Systems
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              Durable standing seam, corrugated, and R-panel metal roofing
              systems engineered for Southwest Florida hurricane conditions.
              Metal roofs provide 40-60 year lifespans with minimal maintenance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Request an Estimate
              </a>
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                239-332-5707
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
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Building2 className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    System Overview
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Engineered for Southwest Florida&apos;s Toughest Conditions
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Metal roofing systems are the gold standard for commercial
                    properties that demand longevity, wind resistance, and
                    minimal lifecycle cost. In Southwest Florida&apos;s
                    hurricane-prone environment, a properly engineered metal roof
                    is not a luxury - it is a strategic investment in building
                    protection.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  Target Roofing installs standing seam, corrugated, and R-panel
                  metal roof systems across Lee, Collier, Charlotte, and
                  Sarasota counties. Our crews work with architectural and
                  structural standing seam profiles, trapezoidal and corrugated
                  panels, and insulated metal panel assemblies. Every
                  installation is engineered to meet or exceed Florida Building
                  Code requirements for the specific wind zone, building height,
                  and exposure category of your property.
                </p>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Unlike single-ply membrane systems that typically require
                  replacement every 15-25 years, a quality metal roof system
                  delivers 40-60 years of service life with minimal
                  maintenance. The initial investment is offset by dramatically
                  lower lifecycle costs, superior energy efficiency from
                  reflective coatings, and the elimination of recurring membrane
                  repair cycles that drain maintenance budgets year after year.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/crew-aerial-worksite.png"
                  alt="Aerial view of Target Roofing crew working on a commercial metal roofing installation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-4 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] shadow-sm rounded-lg">
                <HardHat className="h-8 w-8 text-[var(--red)] flex-shrink-0" />
                <div>
                  <p className="font-bold text-[var(--black)] text-sm uppercase tracking-wide font-[family-name:var(--font-display)]">
                    Licensed &amp; Insured
                  </p>
                  <p className="text-xs text-[var(--gray-500)]">
                    FL License CCC1334168 - State Certified Roofing Contractor
                  </p>
                </div>
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
                  System Advantages
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Why Metal Roofing for Your Commercial Property
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Metal roof systems deliver measurable advantages over
                conventional roofing materials - from wind resistance and fire
                safety to energy savings and environmental responsibility.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateIn
                  key={feature.label}
                  animation="fade-up"
                  delay={idx * 100}
                >
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all h-full">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <h3 className="font-bold text-[var(--black)] text-lg font-[family-name:var(--font-display)] uppercase tracking-wide mb-3">
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

      {/* ==================== WHY TARGET ROOFING ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-welding-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Content */}
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Award className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    The Target Roofing Difference
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Why Property Managers Choose Target Roofing
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Metal roofing installation demands precision engineering and
                    experienced crews. A single improperly fastened panel or
                    misaligned flashing detail can compromise the entire system
                    during a hurricane. That is why choosing the right contractor
                    matters as much as choosing the right material.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-8">
                  Target Roofing has served Southwest Florida&apos;s commercial
                  property owners for over 30 years. Our entire workforce is
                  direct-hire - no subcontractors, no temp labor. When you see a
                  crew in red Target Roofing polos on your roof, you know every
                  person is background-checked, safety-trained, and accountable
                  to our standards.
                </p>
              </AnimateIn>
              <AnimateIn animation="scale" delay={300}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[44px] py-2 px-3"
                >
                  Learn About Our Company
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimateIn>
            </div>

            {/* Right: Feature cards */}
            <div className="space-y-4">
              {whyTargetPoints.map((point, idx) => {
                const Icon = point.icon
                return (
                  <AnimateIn
                    key={point.label}
                    animation="fade-left"
                    delay={idx * 100}
                  >
                    <div className="flex items-start gap-4 p-5 bg-[var(--gray-50)] rounded-lg border border-[var(--gray-200)] hover:border-[var(--red)] transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--red)]/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-[var(--red)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide text-sm mb-1">
                          {point.label}
                        </h3>
                        <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                          {point.description}
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

      {/* ==================== METAL ROOF TYPES COMPARISON ==================== */}
      <section className="bg-blueprint-dark text-white py-20 md:py-28 noise-overlay relative">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
                Metal Roof Panel Profiles We Install
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-300)] leading-relaxed max-w-3xl mx-auto">
                Each profile serves a different performance requirement and
                budget. Our estimators will recommend the right system based on
                your building type, wind zone, and operational needs.
              </p>
            </AnimateIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AnimateIn animation="fade-up" delay={0}>
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm hover:border-[var(--red)]/50 transition-colors h-full">
                <div className="w-12 h-12 rounded-lg bg-[var(--red)]/20 flex items-center justify-center mb-5">
                  <ShieldCheck className="h-6 w-6 text-[var(--red-light)]" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 font-[family-name:var(--font-display)]">
                  Standing Seam
                </h3>
                <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-4">
                  The premium choice for commercial and institutional buildings.
                  Concealed fasteners, superior weather tightness, and the
                  longest service life of any metal panel profile. Ideal for
                  corporate offices, government buildings, and properties where
                  aesthetics and performance both matter.
                </p>
                <ul className="space-y-2">
                  {[
                    'Concealed clip fastening',
                    'Thermal movement accommodation',
                    'Wind ratings to 180 mph',
                    '50-60 year expected life',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[var(--gray-400)]"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[var(--red-light)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            <AnimateIn animation="fade-up" delay={100}>
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm hover:border-[var(--red)]/50 transition-colors h-full">
                <div className="w-12 h-12 rounded-lg bg-[var(--red)]/20 flex items-center justify-center mb-5">
                  <Building2 className="h-6 w-6 text-[var(--red-light)]" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 font-[family-name:var(--font-display)]">
                  R-Panel
                </h3>
                <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-4">
                  The workhorse of commercial and industrial metal roofing.
                  Through-fastened panels with a trapezoidal rib profile that
                  provides excellent structural strength at a competitive price
                  point. The go-to system for warehouses, distribution centers,
                  and manufacturing facilities.
                </p>
                <ul className="space-y-2">
                  {[
                    'Through-fastened installation',
                    'High structural strength',
                    'Cost-effective coverage',
                    '40-50 year expected life',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[var(--gray-400)]"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[var(--red-light)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm hover:border-[var(--red)]/50 transition-colors h-full">
                <div className="w-12 h-12 rounded-lg bg-[var(--red)]/20 flex items-center justify-center mb-5">
                  <Wind className="h-6 w-6 text-[var(--red-light)]" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 font-[family-name:var(--font-display)]">
                  Corrugated
                </h3>
                <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-4">
                  A proven, economical profile with excellent water-shedding
                  characteristics. Well-suited for agricultural, light
                  commercial, and covered storage structures. Available in
                  galvanized, galvalume, and painted finishes to match any
                  application.
                </p>
                <ul className="space-y-2">
                  {[
                    'Excellent water shedding',
                    'Economical installation',
                    'Multiple finish options',
                    '40+ year expected life',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[var(--gray-400)]"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[var(--red-light)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn animation="fade-up" delay={300}>
            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-[10px] text-[var(--gray-400)] font-mono">
              <span>LICENSE: CCC1334168</span>
              <span>STATE CERTIFIED ROOFING CONTRACTOR</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== INLINE LEAD CAPTURE FORM ==================== */}
      <section
        id="lead-form"
        className="bg-[var(--red)] text-white py-20 md:py-28 scroll-mt-24 relative"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="scale">
            <InlineLeadForm
              defaultService="metal-roofing"
              title="Request a Metal Roofing Estimate"
              subtitle="Tell us about your commercial property and roofing needs. Our estimators will schedule a complimentary survey, evaluate your building, and provide an engineered proposal with transparent pricing."
              buttonText="Submit Estimate Request"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
