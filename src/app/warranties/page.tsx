import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Shield,
  Award,
  BadgeCheck,
  CheckCircle,
  AlertTriangle,
  Phone,
  ClipboardCheck,
  Search,
  Handshake,
  Wrench,
  ChevronRight,
  Star,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Warranties & Guarantees',
  description:
    'Industry-leading warranty coverage from Target Roofing. Owens Corning Platinum and GAF Master Elite certified contractor offering extended manufacturer warranties in Southwest Florida.',
}

const warrantyVoidReasons = [
  'Improper attic or roof ventilation not meeting manufacturer specifications',
  'Unauthorized modifications or repairs by non-certified contractors',
  'Lack of regular maintenance or neglecting routine inspections',
  'Installation of incompatible roofing components or materials',
  'Failure to address known issues such as leaks or storm damage promptly',
]

const claimSteps = [
  {
    step: '01',
    title: 'Contact Target Roofing',
    description:
      'Call us or submit a form online. Our team will document your concern and schedule a prompt inspection.',
    icon: Phone,
  },
  {
    step: '02',
    title: 'Professional Inspection',
    description:
      'A Target Roofing foreman inspects your roof, identifies the issue, and documents findings with photos and measurements.',
    icon: Search,
  },
  {
    step: '03',
    title: 'Manufacturer Coordination',
    description:
      'We handle all communication with the manufacturer on your behalf, submitting claims and coordinating approvals.',
    icon: Handshake,
  },
  {
    step: '04',
    title: 'Resolution & Repair',
    description:
      'Once approved, our crew completes the warranty repair quickly and professionally, restoring your roof to full protection.',
    icon: Wrench,
  },
]

export default function WarrantiesPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-team-photo.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)] via-[var(--black)]/80 to-transparent" />
        </div>

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Diagonal accent */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-[var(--red)] hidden lg:block"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-44">
          <AnimateIn animation="fade-left">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <p className="inline-flex items-center gap-2 text-[var(--red-light)] text-sm font-bold uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-display)]">
                <span className="w-8 h-[2px] bg-[var(--red)]" />
                Protection You Can Count On
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
                WARRANTIES &amp;{' '}
                <span className="text-[var(--red)]">GUARANTEES</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
                Your roof investment, protected. Target Roofing&apos;s elite
                manufacturer certifications unlock warranty coverage most
                contractors simply cannot offer.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
                >
                  Learn About Your Options
                </a>
                <a
                  href="tel:+12398231483"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  (239) 823-1483
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="bg-white py-20 md:py-28">
        <AnimateIn animation="fade-up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="inline-flex items-center gap-2 text-[var(--red)] text-sm font-bold uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-display)]">
                <span className="w-8 h-[2px] bg-[var(--red)]" />
                Why Our Warranties Stand Apart
                <span className="w-8 h-[2px] bg-[var(--red)]" />
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)]">
                Coverage Most Contractors Can&apos;t Offer
              </h2>
              <div className="red-accent-left text-left sm:text-center sm:[&]:border-l-0">
                <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                  As both an Owens Corning Platinum Preferred Contractor and a GAF
                  Master Elite Contractor, Target Roofing holds the highest
                  certifications available in the roofing industry. These
                  designations are earned through rigorous training, proven
                  craftsmanship, and a track record of customer satisfaction. The
                  result: our customers gain access to extended manufacturer
                  warranties that go far beyond standard coverage, giving you
                  lasting peace of mind for your investment.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ─── WORKMANSHIP WARRANTY ─── */}
      <section className="relative bg-[var(--gray-50)] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-aerial-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
          />
        </div>
        <AnimateIn animation="fade-up">
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              {/* Icon / visual */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -z-0 w-full h-full bg-[var(--red)] rounded-sm top-0 right-0 sm:-top-4 sm:-right-4" />
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl bg-[var(--black)] flex items-center justify-center">
                    <div className="text-center p-8">
                      <Shield className="w-24 h-24 text-[var(--red)] mx-auto mb-6" />
                      <p className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-display)] mb-2">
                        OUR WORKMANSHIP
                      </p>
                      <p className="text-3xl md:text-4xl font-bold text-[var(--red)] font-[family-name:var(--font-display)]">
                        GUARANTEE
                      </p>
                      <div className="w-16 h-[3px] bg-[var(--red)] mx-auto mt-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 bg-[var(--red)] text-white rounded-sm">
                    <Wrench className="w-6 h-6" />
                  </span>
                  <span className="text-[var(--gray-400)] text-sm font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-display)]">
                    Our Promise
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[var(--black)] leading-[1.05] mb-6 font-[family-name:var(--font-display)]">
                  We Stand Behind Every Installation
                </h2>

                <div className="red-accent-left">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed mb-6">
                    Target Roofing backs every project with our own workmanship
                    guarantee. This means if an issue arises from installation,
                    we return to make it right at no additional cost to you. Our
                    experienced foremen and in-house crews never use
                    subcontractors, so the same team that installs your roof is
                    the team that stands behind it.
                  </p>
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    This commitment to quality is why we&apos;ve completed over
                    10,000 projects across Southwest Florida and maintain an A+
                    rating with the Better Business Bureau.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ─── MANUFACTURER WARRANTIES ─── */}
      <section className="relative bg-[var(--black)] text-white py-24 md:py-32 overflow-hidden">
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Subtle diagonal accent */}
        <div
          className="absolute top-0 left-0 w-1/4 h-full bg-[var(--red)] opacity-5"
          style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 text-[var(--red-light)] text-sm font-bold uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              Manufacturer-Backed Coverage
              <span className="w-8 h-[2px] bg-[var(--red)]" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-display)]">
              Extended Manufacturer Warranties
            </h2>
            <p className="text-lg text-[var(--gray-400)] max-w-2xl mx-auto">
              Our elite certifications give you access to the strongest warranty
              programs in the industry, backed directly by the manufacturers.
            </p>
          </div>

          {/* Two warranty cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Owens Corning */}
            <AnimateIn animation="scale" delay={0}>
              <div className="group relative bg-white/5 border border-white/10 rounded-sm p-8 hover:bg-white/10 hover:border-[var(--red)]/50 transition-all duration-300 h-full">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-[var(--red)]/20 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors duration-300">
                    <Award className="w-7 h-7 text-[var(--red)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide font-[family-name:var(--font-display)]">
                      Owens Corning
                    </h3>
                    <p className="text-sm text-[var(--red-light)] font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">
                      Platinum Preferred Contractor
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    'Lifetime limited shingle warranty on qualifying products',
                    'Extended workmanship coverage included with installation',
                    'System warranties available when using the full Owens Corning roofing system',
                    'Transferable warranty adds value if you sell your property',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--gray-300)] text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            {/* GAF */}
            <AnimateIn animation="scale" delay={100}>
              <div className="group relative bg-white/5 border border-white/10 rounded-sm p-8 hover:bg-white/10 hover:border-[var(--red)]/50 transition-all duration-300 h-full">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-[var(--red)]/20 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors duration-300">
                    <Star className="w-7 h-7 text-[var(--red)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide font-[family-name:var(--font-display)]">
                      GAF Master Elite
                    </h3>
                    <p className="text-sm text-[var(--red-light)] font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">
                      Golden Pledge Warranty
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    '50-year non-prorated material coverage on shingles and accessories',
                    '25-year workmanship coverage backed by GAF',
                    '10-year Smart Choice leak protection with 100% repair cost coverage',
                    'The strongest warranty in the roofing industry, period',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--gray-300)] text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>

          {/* Badge image */}
          <div className="flex justify-center mt-12">
            <Image
              src="/images/badges/gaf-master-silverstar.png"
              alt="GAF Master Elite and Silver Star Certified"
              width={300}
              height={120}
              className="h-20 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* ─── WHY CERTIFICATIONS MATTER ─── */}
      <section className="bg-white py-20 md:py-28">
        <AnimateIn animation="fade-up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 bg-[var(--red)] text-white rounded-sm">
                    <BadgeCheck className="w-6 h-6" />
                  </span>
                  <span className="text-[var(--gray-400)] text-sm font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-display)]">
                    The Difference
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[var(--black)] leading-[1.05] mb-6 font-[family-name:var(--font-display)]">
                  Why Certifications Matter
                </h2>

                <div className="red-accent-left">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed mb-6">
                    Only the top 1-2% of roofing contractors in the country earn
                    Platinum Preferred and Master Elite designations. These are
                    not pay-to-play programs. Manufacturers require documented
                    proof of proper licensing, insurance, training, and a
                    consistent record of quality installations.
                  </p>
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    When a manufacturer extends their warranty through a
                    certified contractor like Target Roofing, they are putting
                    their own reputation on the line. They do this because they
                    trust our installation quality, know our crews are factory
                    trained, and are confident the roof will perform as designed
                    for decades.
                  </p>
                </div>
              </div>

              {/* Stats cards */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      stat: 'Top 1%',
                      label: 'Owens Corning Platinum Preferred',
                      description:
                        'Fewer than 1% of contractors nationwide hold this designation',
                    },
                    {
                      stat: 'Top 2%',
                      label: 'GAF Master Elite',
                      description:
                        'Only 2% of roofing contractors qualify for Master Elite status',
                    },
                    {
                      stat: '30+',
                      label: 'Years of Excellence',
                      description:
                        'Three decades of proven craftsmanship in Southwest Florida',
                    },
                    {
                      stat: 'A+',
                      label: 'BBB Rating',
                      description:
                        'Highest rating for trust, reliability, and customer satisfaction',
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-sm p-6 hover:border-[var(--red)]/30 transition-colors"
                    >
                      <p className="text-3xl font-bold text-[var(--red)] font-[family-name:var(--font-display)] mb-1">
                        {card.stat}
                      </p>
                      <p className="text-sm font-bold uppercase tracking-wide text-[var(--black)] font-[family-name:var(--font-display)] mb-2">
                        {card.label}
                      </p>
                      <p className="text-xs text-[var(--gray-500)]">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ─── WHAT VOIDS A WARRANTY ─── */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <AnimateIn animation="fade-up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="inline-flex items-center gap-2 text-[var(--red)] text-sm font-bold uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-display)]">
                  <span className="w-8 h-[2px] bg-[var(--red)]" />
                  Protect Your Coverage
                  <span className="w-8 h-[2px] bg-[var(--red)]" />
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)]">
                  What Can Void a Warranty
                </h2>
                <p className="text-lg text-[var(--gray-600)]">
                  Understanding these common pitfalls helps you maintain full
                  warranty protection throughout the life of your roof.
                </p>
              </div>

              <div className="space-y-4">
                {warrantyVoidReasons.map((reason, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white border border-[var(--gray-200)] rounded-sm p-5 hover:border-[var(--red)]/30 transition-colors"
                  >
                    <AlertTriangle className="w-5 h-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                    <p className="text-[var(--gray-700)] leading-relaxed">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[var(--red)]/5 border border-[var(--red)]/20 rounded-sm p-6">
                <p className="text-[var(--gray-700)] leading-relaxed">
                  <span className="font-bold text-[var(--black)]">
                    Pro tip:
                  </span>{' '}
                  Schedule annual roof inspections with Target Roofing to catch
                  potential issues early and keep your warranty fully intact. Our
                  maintenance programs are designed to maximize the lifespan of
                  your roof and your warranty coverage.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ─── WARRANTY CLAIM PROCESS ─── */}
      <section className="relative bg-[var(--black)] text-white py-24 md:py-32 overflow-hidden">
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 text-[var(--red-light)] text-sm font-bold uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              Simple &amp; Straightforward
              <span className="w-8 h-[2px] bg-[var(--red)]" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-display)]">
              Warranty Claim Process
            </h2>
            <p className="text-lg text-[var(--gray-400)] max-w-2xl mx-auto">
              If you ever need to use your warranty, we make the process as
              painless as possible. Target Roofing handles everything.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimSteps.map((step, i) => {
              const StepIcon = step.icon
              return (
                <AnimateIn key={step.title} animation="scale" delay={i * 80}>
                  <div className="group relative bg-white/5 border border-white/10 rounded-sm p-6 hover:bg-white/10 hover:border-[var(--red)]/50 transition-all duration-300 h-full">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    {/* Step number */}
                    <p className="text-4xl font-bold text-[var(--red)]/30 font-[family-name:var(--font-display)] mb-4">
                      {step.step}
                    </p>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-[var(--red)]/20 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors duration-300">
                        <StepIcon className="w-5 h-5 text-[var(--red)] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wide font-[family-name:var(--font-display)]">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[var(--gray-400)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA STATS STRIP ─── */}
      <section className="bg-[var(--red)] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { number: '50yr', label: 'Non-Prorated Coverage' },
              { number: '25yr', label: 'Workmanship Protection' },
              { number: 'Top 1%', label: 'Certified Contractor' },
              { number: '100%', label: 'Claim Support' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-2">
                  {stat.number}
                </p>
                <p className="text-sm uppercase tracking-wider text-white/80 font-[family-name:var(--font-display)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INLINE LEAD CAPTURE FORM ─── */}
      <section
        id="lead-form"
        className="relative bg-white py-24 md:py-32 overflow-hidden scroll-mt-24"
      >
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-[var(--gray-50)]"
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InlineLeadForm
            defaultService="residential"
            title="Learn More About Your Warranty Options"
            subtitle="Whether you need a new roof with full warranty protection or want to understand your current coverage, our team is here to help. Fill out the form below and a Target Roofing specialist will be in touch."
            buttonText="Get Warranty Information"
            darkTheme={false}
          />
        </div>
      </section>
    </>
  )
}
