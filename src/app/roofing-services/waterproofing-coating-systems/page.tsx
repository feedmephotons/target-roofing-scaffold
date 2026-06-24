import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Droplets,
  ShieldCheck,
  Thermometer,
  Layers,
  CheckCircle,
  Award,
  Users,
  Clock,
  ArrowRight,
  Building2,
  Paintbrush,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Waterproofing & Coating Systems | Commercial Roof Coatings',
  description:
    'Extend your commercial roof life by 10-15 years with professional silicone and elastomeric coating systems from Target Roofing. Restore reflectivity, seal cracks, and eliminate tear-off costs across Southwest Florida.',
  keywords: [
    'commercial roof coatings',
    'silicone roof coating',
    'elastomeric roof coating',
    'waterproofing systems',
    'roof restoration Southwest Florida',
    'cool roof coatings',
    'reflective roof coating',
    'commercial roof maintenance Fort Myers',
    'roof coating Naples',
    'roof coating Sarasota',
  ],
}

const features = [
  {
    label: 'Silicone Roof Coatings for Ponding Water Resistance',
    description:
      'Silicone-based coatings cure into a permanently waterproof membrane that withstands indefinite ponding water without degradation, ideal for flat commercial roofs with poor drainage.',
    icon: Droplets,
  },
  {
    label: 'Acrylic Elastomeric Coatings for Sloped Surfaces',
    description:
      'Elastomeric acrylics stretch up to 300% without cracking, conforming to thermal expansion and contraction cycles typical of Southwest Florida rooftops.',
    icon: Layers,
  },
  {
    label: 'Reduces Cooling Costs by Up to 30%',
    description:
      'Highly reflective white and light-colored coatings deflect solar radiation, significantly reducing heat absorption and lowering interior cooling demands.',
    icon: Thermometer,
  },
  {
    label: 'Seamless Application Eliminates Leak-Prone Seams',
    description:
      'Spray-applied or roller-applied coatings form a monolithic membrane with zero seams, fasteners, or lap joints, removing the most common source of commercial roof leaks.',
    icon: ShieldCheck,
  },
  {
    label: 'Applied Over Existing Substrate with No Tear-Off',
    description:
      'Coatings bond directly to existing TPO, modified bitumen, metal, and built-up roofing, eliminating the expense and disruption of a full roof removal.',
    icon: Paintbrush,
  },
  {
    label: 'Renewable Warranty with Periodic Recoat Maintenance',
    description:
      'Most coating manufacturers offer renewable warranties when a maintenance recoat is applied at scheduled intervals, keeping your roof protected indefinitely.',
    icon: Clock,
  },
]

const whyTargetReasons = [
  {
    label: '30+ Years of Commercial Experience',
    description:
      'Three decades of hands-on commercial roofing in Southwest Florida. We understand every substrate, every climate challenge, and every code requirement.',
    icon: Award,
  },
  {
    label: 'GAF Master Elite Certified',
    description:
      'Fewer than 3% of roofing contractors in the U.S. hold this certification. It reflects our installation quality, training standards, and financial stability.',
    icon: ShieldCheck,
  },
  {
    label: '100% Direct Employees, No Subcontractors',
    description:
      'Every technician on your roof is a fully trained, background-checked Target Roofing employee in a red polo. We never outsource our work.',
    icon: Users,
  },
  {
    label: '24/7/365 Emergency Response',
    description:
      'Active leak during a storm? Our local Southwest Florida crews are dispatched within hours, any day of the year, including holidays.',
    icon: Clock,
  },
]

export default function WaterproofingCoatingSystemsPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-coating-application.png"
            alt="Target Roofing crew applying a reflective silicone coating system on a commercial flat roof"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/90 via-[var(--black)]/75 to-[var(--black)]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Roof Restoration &amp; Protection
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Waterproofing &amp; Coating Systems
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              Extend your existing roof life by 10-15 years with professional silicone and elastomeric coating systems. Restore reflectivity, seal minor cracks, and eliminate the cost of a full tear-off.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Request a Coating Estimate
              </a>
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Building2 className="h-4 w-4" />
                Call 239-332-5707
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
                  <Droplets className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    System Overview
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  The Smart Alternative to a Full Roof Replacement
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Southwest Florida&apos;s combination of intense UV exposure, heavy seasonal rainfall, and salt-laden coastal air accelerates roof degradation faster than almost any other climate in the country. For commercial property owners and managers, this means costly reroof projects can arrive years ahead of schedule if the existing membrane is left unprotected.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  Waterproofing coating systems offer a proven, cost-effective solution. Applied as a liquid membrane directly over your existing roof substrate, these coatings cure into a seamless, fully adhered barrier that restores waterproofing integrity, reflects solar heat, and extends the functional service life of the roof by 10 to 15 years. Whether your facility sits on TPO, modified bitumen, built-up roofing, or metal panels, a properly specified coating system eliminates the need for a disruptive and expensive full tear-off.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Target Roofing evaluates each roof on a case-by-case basis, performing moisture scans and adhesion testing to confirm the existing substrate is a viable candidate for a coating application. We then specify the correct chemistry, whether silicone for ponding-water conditions or elastomeric acrylic for sloped configurations, and apply the system with our own trained crews under strict quality-control protocols. The result is a renewable, warrantied roof system that protects your building and your budget.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/crew-roof-inspection.png"
                  alt="Target Roofing technician inspecting a commercial roof surface before coating application"
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
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <Layers className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Benefits &amp; Capabilities
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Why Commercial Roof Coatings Work
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Coating systems address the most common failure modes of commercial roofs in Southwest Florida while delivering measurable energy savings and long-term budget predictability.
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
                    <h3 className="font-bold text-[var(--black)] text-sm font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
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
          <Image src="/images/backgrounds/bg-welding-mono.jpg" alt="" fill className="object-cover opacity-[0.03]" />
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
                  Why Target Roofing for Your Coating Project
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    A coating system is only as good as the team that installs it. Surface preparation, mil-thickness consistency, and proper dry-time management are critical to long-term performance. Target Roofing brings the expertise and workforce discipline that separate a 15-year coating from one that fails in three.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-8">
                  We have applied coating systems across hundreds of commercial properties throughout Lee, Collier, and Sarasota counties. From retail plazas and industrial warehouses to HOA clubhouses and municipal facilities, our crews understand the substrate-specific preparation protocols that manufacturers require for full warranty coverage.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <div className="flex items-center gap-4 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] shadow-sm rounded-lg">
                  <Award className="h-8 w-8 text-[var(--red)] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[var(--black)] text-sm uppercase tracking-wide font-[family-name:var(--font-display)]">
                      License CCC1334168
                    </p>
                    <p className="text-xs text-[var(--gray-500)] mt-0.5">
                      Florida State Certified Roofing Contractor
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right: Reason cards */}
            <div className="space-y-4">
              {whyTargetReasons.map((reason, idx) => {
                const Icon = reason.icon
                return (
                  <AnimateIn key={reason.label} animation="fade-right" delay={idx * 100}>
                    <div className="bg-[var(--gray-50)] rounded-lg p-6 border border-[var(--gray-200)] hover:border-[var(--red)] hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--red)]/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-[var(--red)]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide text-sm mb-1">
                            {reason.label}
                          </h3>
                          <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimateIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SUBSTRATES WE COAT ==================== */}
      <section className="bg-blueprint-dark text-white py-16 md:py-20 noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <AnimateIn animation="fade-up">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] uppercase tracking-wide mb-3">
                Substrates We Coat
              </h2>
              <p className="text-[var(--gray-400)] max-w-2xl mx-auto">
                Our coating systems are compatible with virtually every commercial roofing substrate found in Southwest Florida.
              </p>
            </AnimateIn>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'TPO',
              'Modified Bitumen',
              'Built-Up Roofing',
              'Metal Panels',
              'EPDM',
              'Spray Foam',
            ].map((substrate, idx) => (
              <AnimateIn key={substrate} animation="fade-up" delay={idx * 80}>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:border-[var(--red)] transition-colors">
                  <CheckCircle className="h-6 w-6 text-[var(--red-light)] mx-auto mb-2" />
                  <span className="text-sm font-semibold uppercase tracking-wide font-[family-name:var(--font-display)]">
                    {substrate}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA / BACK LINK ==================== */}
      <section className="bg-white py-12 border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/roofing-services"
                className="inline-flex items-center gap-2 text-[var(--gray-500)] hover:text-[var(--red)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[44px] py-2 px-3"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                All Roofing Services
              </Link>
              <a
                href="#lead-form"
                className="inline-flex items-center gap-2 text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[44px] py-2 px-3"
              >
                Get a Free Coating Assessment
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== INLINE LEAD CAPTURE FORM ==================== */}
      <section id="lead-form" className="bg-[var(--red)] text-white py-20 md:py-28 scroll-mt-24 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="scale">
            <InlineLeadForm
              defaultService="waterproofing-coatings"
              title="Request a Free Coating Assessment"
              subtitle="Our crew will inspect your existing roof, perform moisture scans, and recommend the right coating system for your building. Expect a detailed report with photos and a line-item estimate."
              buttonText="Submit Coating Request"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
