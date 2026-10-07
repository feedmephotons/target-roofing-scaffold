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
  Building2,
  Search,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CITIES, CITY_MAP } from '@/lib/locations'

export const metadata: Metadata = {
  title: 'Roof Inspections & Surveys',
  description:
    'Commercial roof inspections and surveys in Southwest Florida. Plan the assessment scope, photo documentation, optional testing and repair priorities for your property.',
  alternates: { canonical: '/roofing-services/roof-inspections-surveys' },
  openGraph: {
    title: 'Commercial Roof Inspections & Surveys | Target Roofing',
    description:
      'Roof condition surveys for property managers and HOAs. Confirm inspection methods, report deliverables and next steps for your building.',
    url: 'https://targetroofers.com/roofing-services/roof-inspections-surveys',
    images: ['/images/crew/crew-roof-inspection-hires.png'],
  },
}

const inspectionFeatures = [
  {
    label: 'Infrared Thermographic Moisture Scanning',
    description:
      'Where suitable and included in the scope, infrared scanning can help identify areas for further investigation. Conditions and roof assembly affect interpretation; confirm findings with appropriate follow-up.',
    icon: Thermometer,
  },
  {
    label: 'Core Sample Analysis for Membrane Integrity',
    description:
      'Where authorized and appropriate, targeted samples can help evaluate the assembly at the sampled locations. Agree on sample locations, any laboratory work and how openings will be repaired.',
    icon: Layers,
  },
  {
    label: 'Detailed Photo Documentation with GPS Mapping',
    description:
      'Agree on photo documentation and a location reference for findings, such as a roof plan or area labels. Confirm whether GPS mapping is part of your assignment.',
    icon: Camera,
  },
  {
    label: 'Prioritized Repair Recommendations with Cost Estimates',
    description:
      'Discuss repair priorities and whether your assignment includes a separate itemized repair proposal or budget guidance. Confirm pricing and timing before authorizing work.',
    icon: ClipboardList,
  },
  {
    label: 'Pre-Purchase and Post-Storm Assessment Reports',
    description:
      'Explain the purpose of the assessment and any records your buyer, insurer or property team needs. A roof condition report does not determine insurance coverage or guarantee acceptance by another party.',
    icon: CloudLightning,
  },
  {
    label: 'Annual Inspection Programs for Proactive Maintenance',
    description:
      'Recurring visits can help track condition changes. Review the written manufacturer warranty to confirm required care, documentation and authorized repair methods.',
    icon: CalendarCheck,
  },
]

const whyTargetReasons = [
  { label: 'Purpose and Roof History', description: 'Share the decision you need to make, affected areas, previous repairs and available roof documents.', icon: ClipboardList },
  { label: 'Access and Authorization', description: 'Identify the on-site contact, restricted areas and who can approve samples or additional investigation.', icon: Users },
  { label: 'Scope and Limitations', description: 'Confirm which roof areas and methods are included and how inaccessible or concealed conditions will be reported.', icon: ShieldCheck },
  { label: 'Report and Follow-Up', description: 'Agree on recipients, delivery timing and whether separate repair pricing or another specialist is needed.', icon: Building2 },
]

export default function RoofInspectionsSurveysPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Roof Inspections & Surveys',
            url: 'https://targetroofers.com/roofing-services/roof-inspections-surveys',
            description:
              'Evaluate commercial roof conditions and plan the next step. Confirm the visual survey, documentation and any specialized testing appropriate for your property.',
            provider: {
              '@type': 'RoofingContractor',
              '@id': 'https://targetroofers.com',
              name: 'Target Roofing',
            },
            areaServed: CITIES.filter((c) => c !== 'southwest-florida').map((c) => ({
              '@type': 'City',
              name: CITY_MAP[c].name,
            })),
            serviceType: 'Roof Inspection',
          }),
        }}
      />
      {/* ==================== BREADCRUMBS ==================== */}
      <section className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { name: 'Roofing Services', href: '/roofing-services' },
              { name: 'Roof Inspections & Surveys' },
            ]}
          />
        </div>
      </section>

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
              Commercial roof condition surveys for your next property decision. Confirm the visual assessment, documentation and any specialized testing appropriate for your roof and the agreed scope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Schedule an Inspection
              </a>
              <a
                href="tel:+12393325707"
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
                    A useful roof assessment starts with the question you need answered: the source of a leak, changes after a storm, current condition or options for an upcoming capital decision. Share the roof history and agree on the areas and methods to be evaluated.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  A visual survey can document accessible roof surfaces, flashings, penetrations and drainage details. Concealed conditions may need additional investigation. Infrared scanning, core samples and other testing should be selected for the roof assembly and purpose, with access, weather and any destructive testing agreed in advance.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  For a purchase, storm review, warranty concern or budget meeting, explain who will use the findings. Agree on the report format and timing, and distinguish observed conditions from assumptions, inaccessible areas and recommendations for further evaluation.
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
                Define the Inspection Methods
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Select the assessment methods for the question you need answered. The options below may be included where suitable and agreed in advance; the report should explain accessible findings, testing limits and any concealed conditions that still need investigation.
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
                    Inspection Planning
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Prepare for a Useful Roof Inspection
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Give the assessment a clear purpose and assemble the information your property team already has. The items below help define a useful assignment and avoid gaps in the report or follow-up.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-8">
                  Target Roofing serves Lee, Collier, Charlotte and Sarasota counties. Before requesting a survey, collect earlier reports, roof plans if available, known system information and the history of leaks or repairs. Identify an on-site contact and any access restrictions so the assessment can be planned around your property.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <div className="flex items-center gap-4 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] shadow-sm rounded-lg">
                  <Phone className="h-8 w-8 text-[var(--red)] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[var(--black)] text-sm uppercase tracking-wide font-[family-name:var(--font-display)]">
                      Questions? Call Us Directly
                    </p>
                    <a href="tel:+12393325707" className="text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors inline-block py-2 px-1">
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
                Confirm these deliverables in your inspection scope before scheduling. Report timing depends on the agreed assignment, access, property size and any additional testing. Not every inspection includes every item below.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn animation="fade-up" delay={200}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[var(--red)]">
                <h3 className="text-xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)] uppercase tracking-wide">
                  Agree on the Report Deliverables:
                </h3>
                <ul className="space-y-4">
                  {[
                    'Executive summary with overall roof condition rating',
                    'Photos and location references for observed findings',
                    'Infrared findings and limitations, if scanning is included',
                    'Sample locations and testing results, if authorized and included',
                    'Recommended next actions and repair priorities',
                    'Separate repair estimates or budget guidance, if requested',
                    'Condition-based planning guidance with assumptions explained',
                    'Warranty documents to review and any required follow-up',
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

      <section className="bg-white py-16"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">Turn the Findings into the Next Step</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-6">An inspection documents the agreed assessment at a point in time. It does not guarantee future performance, certify concealed conditions or automatically establish manufacturer warranty or insurance compliance. Ask which findings need attention, what remains uncertain and whether another evaluation is appropriate.</p>
        <div className="grid gap-6 sm:grid-cols-3">
          <p><Link href="/roofing-services/commercial-roof-repair" className="font-bold text-[var(--red)] underline underline-offset-4">Plan a commercial roof repair</Link></p>
          <p><Link href="/commercial-hoa-roof-maintenance" className="font-bold text-[var(--red)] underline underline-offset-4">Organize recurring maintenance</Link></p>
          <p><Link href="/roofing-services/roof-replacement" className="font-bold text-[var(--red)] underline underline-offset-4">Compare replacement options</Link></p>
        </div>
      </div></section>

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
                  Use the findings to plan repair priorities, routine care and the next property decision.
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
              formId="inspection"
              title="Schedule a Roof Inspection"
              subtitle="Tell us what you need evaluated and how the findings will be used. Our team will follow up to confirm scope, access and scheduling."
              buttonText="Request Inspection"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
