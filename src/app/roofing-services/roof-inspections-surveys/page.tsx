import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle,
  Phone,
  Thermometer,
  Layers,
  Camera,
  ClipboardList,
  CloudLightning,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Building2,
  Search,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Roof Inspections & Surveys | Target Roofing',
  description:
    'Comprehensive commercial roof inspections using infrared moisture detection, core sampling, and visual survey methods. Detailed reports identify issues before they become expensive problems. Serving Southwest Florida.',
  openGraph: {
    title: 'Commercial Roof Inspections & Surveys | Target Roofing',
    description:
      'Infrared moisture scanning, core sampling, and detailed photo documentation for commercial properties across Southwest Florida. 30+ years of experience.',
    images: ['/images/crew/crew-roof-inspection-hires.png'],
  },
}

const inspectionFeatures = [
  {
    label: 'Infrared Thermographic Moisture Scanning',
    description:
      'Non-invasive infrared cameras detect trapped moisture beneath the membrane, pinpointing wet insulation invisible to the naked eye.',
    icon: Thermometer,
  },
  {
    label: 'Core Sample Analysis for Membrane Integrity',
    description:
      'Strategic core cuts reveal the full roof assembly condition, from membrane to deck, confirming insulation R-values and adhesion quality.',
    icon: Layers,
  },
  {
    label: 'Detailed Photo Documentation with GPS Mapping',
    description:
      'Every deficiency is photographed, annotated, and mapped to exact roof coordinates so your team knows precisely where each issue is located.',
    icon: Camera,
  },
  {
    label: 'Prioritized Repair Recommendations with Cost Estimates',
    description:
      'Our reports rank every finding by urgency and include line-item cost estimates, giving you a clear roadmap for budgeting and capital planning.',
    icon: ClipboardList,
  },
  {
    label: 'Pre-Purchase and Post-Storm Assessment Reports',
    description:
      'Due-diligence inspections for acquisitions and insurance-grade storm damage documentation with before-and-after comparisons.',
    icon: CloudLightning,
  },
  {
    label: 'Annual Inspection Programs for Proactive Maintenance',
    description:
      'Scheduled recurring inspections catch small problems before they escalate, satisfying manufacturer warranty requirements and extending roof life.',
    icon: CalendarCheck,
  },
]

const whyTargetReasons = [
  {
    label: '30+ Years of Commercial Experience',
    description:
      'Three decades inspecting every commercial roof system in Southwest Florida means we know exactly what to look for and where to find it.',
    icon: Award,
  },
  {
    label: 'GAF Master Elite Certified',
    description:
      'Only 2% of roofing contractors earn this distinction. Our inspectors are trained to the highest manufacturer standards in the industry.',
    icon: ShieldCheck,
  },
  {
    label: 'Direct Employees, Never Subcontractors',
    description:
      'Every inspector on your roof is a full-time, background-checked Target Roofing employee in a red polo. No day-labor, no surprises.',
    icon: Users,
  },
  {
    label: 'All Commercial Roof Types',
    description:
      'TPO, PVC, EPDM, modified bitumen, built-up, metal, tile, and coated systems. We inspect and report on every system used in commercial construction.',
    icon: Building2,
  },
]

export default function RoofInspectionsSurveysPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-roof-inspection-hires.png"
            alt="Target Roofing technician performing a commercial roof inspection in Southwest Florida"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/90 via-[var(--black)]/70 to-[var(--black)]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Commercial Roof Inspections
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Roof Inspections &amp; Surveys
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              Comprehensive commercial roof inspections using infrared moisture detection, core sampling, and visual survey methods. Our detailed reports identify issues before they become expensive problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Schedule an Inspection
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
          <Image src="/images/backgrounds/bg-aerial-mono.jpg" alt="" fill className="object-cover opacity-[0.04]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Search className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    Service Overview
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Know Your Roof&apos;s True Condition
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    In Southwest Florida, commercial roofs endure relentless UV exposure, hurricane-force winds, heavy tropical rain, and salt-laden coastal air. These conditions degrade roofing membranes, flashings, and insulation far faster than in temperate climates. A professional roof inspection is the only way to accurately assess what is happening beneath the surface before minor deterioration turns into a six-figure problem.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  Target Roofing&apos;s inspection program goes well beyond a simple visual walkover. Our certified technicians use infrared thermographic imaging to map trapped moisture that is invisible to the naked eye, then confirm findings with targeted core samples that reveal the full condition of every layer in the roof assembly. Every deficiency is photographed, GPS-tagged, and compiled into a prioritized report with repair cost estimates your facilities team or board can act on immediately.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Whether you are evaluating a property for acquisition, documenting storm damage for an insurance claim, fulfilling manufacturer warranty maintenance requirements, or simply keeping your annual capital budget on track, our inspection reports give you the objective, data-driven intelligence you need to make confident roofing decisions.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/crew-roof-inspection.png"
                  alt="Target Roofing inspector documenting roof conditions during a commercial property survey"
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
                <ClipboardList className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Inspection Capabilities
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                What Our Inspections Include
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Every Target Roofing inspection combines advanced technology with hands-on expertise to deliver a complete picture of your roof&apos;s condition, not just what is visible on the surface.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspectionFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateIn key={feature.label} animation="fade-up" delay={idx * 100}>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all h-full">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <h3 className="font-bold text-[var(--black)] text-lg font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
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
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <div className="lg:col-span-6">
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <ShieldCheck className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    The Target Roofing Difference
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Why Target Roofing for Your Inspection
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Not all roof inspections are created equal. A general contractor walking your roof with a phone camera is not the same as a certified commercial roofing firm deploying infrared imaging and core sampling with three decades of local knowledge. Here is what sets us apart.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-8">
                  Target Roofing has inspected thousands of commercial properties across Lee, Collier, Charlotte, and Sarasota counties. We know the common failure points for every roof system used in this market, from TPO and modified bitumen on flat retail centers to standing-seam metal on industrial facilities. Our inspection reports are trusted by property managers, HOA boards, insurance adjusters, and commercial real estate attorneys throughout Southwest Florida.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <div className="flex items-center gap-4 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] shadow-sm rounded-lg">
                  <Phone className="h-8 w-8 text-[var(--red)] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[var(--black)] text-sm uppercase tracking-wide font-[family-name:var(--font-display)]">
                      Questions? Call Us Directly
                    </p>
                    <a href="tel:239-332-5707" className="text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors inline-block py-2 px-1">
                      239-332-5707
                    </a>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right: Reason cards */}
            <div className="lg:col-span-6 space-y-4">
              {whyTargetReasons.map((reason, idx) => {
                const Icon = reason.icon
                return (
                  <AnimateIn key={reason.label} animation="fade-right" delay={idx * 100}>
                    <div className="flex items-start gap-4 p-5 bg-[var(--gray-50)] rounded-lg border border-[var(--gray-200)] hover:border-[var(--red)] transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--red)]/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-[var(--red)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide mb-1">
                          {reason.label}
                        </h3>
                        <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                          {reason.description}
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

      {/* ==================== REPORT DELIVERABLES ==================== */}
      <section className="bg-blueprint-light py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                What You Receive
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                Every inspection concludes with a professional report delivered same-day or next business day, depending on property size. Here is what is included.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn animation="fade-up" delay={200}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[var(--red)]">
                <h3 className="text-xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)] uppercase tracking-wide">
                  Inspection Report Includes:
                </h3>
                <ul className="space-y-4">
                  {[
                    'Executive summary with overall roof condition rating',
                    'Annotated photo documentation of every deficiency',
                    'Infrared moisture scan results with heat-map overlays',
                    'Core sample lab results (when applicable)',
                    'Prioritized repair schedule ranked by urgency',
                    'Itemized cost estimates for recommended repairs',
                    'Remaining useful life estimate for each roof section',
                    'Manufacturer warranty compliance status',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--gray-700)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== CTA / BREADCRUMB ==================== */}
      <section className="bg-[var(--black)] text-white py-16 noise-overlay relative">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] uppercase mb-2">
                  Protect Your Investment
                </h2>
                <p className="text-[var(--gray-400)] leading-relaxed">
                  A professional inspection today can save you hundreds of thousands in emergency repairs tomorrow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
                >
                  Request an Inspection
                </a>
                <Link
                  href="/roofing-services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
                >
                  All Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
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
              defaultService="inspection"
              title="Schedule a Roof Inspection"
              subtitle="Get a comprehensive inspection report with infrared moisture mapping, prioritized repair recommendations, and itemized cost estimates. Our team will survey your property and deliver findings within 24 hours."
              buttonText="Request Inspection"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
