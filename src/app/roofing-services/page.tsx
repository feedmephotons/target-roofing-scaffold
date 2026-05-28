import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle,
  Phone,
  Building2,
  RotateCcw,
  Wrench,
  ShieldCheck,
  ClipboardList,
  FileText,
  Clock,
  Users,
  Truck,
  BarChart3,
  HardHat,
  Search,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Roofing Services',
  description:
    'Target Roofing provides commercial roofing services including new roofs, reroofing, roof repairs, and preventative maintenance plans in Southwest Florida.',
}

const commitments = [
  'A complete inspection report with photos and recommendations on the same day we survey a property.',
  'Updated schedules and timelines throughout the duration of a project.',
  'An itemized repair invoice containing before and after photos within 24 hours of job completion.',
  'Emergency repairs 24 hours a day, 7 days a week and 365 days a year.',
  'A one-year warranty on nearly every repair.',
]

const complimentaryReports = [
  'Life expectancy estimates',
  'Itemized repair or replacement costs',
  'Per-building spending reports',
]

const newRoofTypes = [
  'Retail',
  'Industrial',
  'Corporate',
  'Government',
  'High Rises',
  'Schools',
]

const reroofingFeatures = [
  { label: 'Accurate Estimates', icon: ClipboardList },
  { label: 'Professional Project Management', icon: Users },
  { label: 'Detailed Schedules', icon: CalendarCheck },
  { label: 'Dedicated Workforce (No Subs)', icon: HardHat },
  { label: 'Reliable Equipment', icon: Truck },
  { label: 'All Types of Roofs/Structures', icon: Building2 },
]

const repairFeatures = [
  { label: 'Thorough Inspections with Detailed Reports', icon: Search },
  { label: 'A 1-Year Warranty on Repairs', icon: ShieldCheck },
  { label: 'Full Roof Replacements', icon: RotateCcw },
  { label: 'Help with Insurance Claims', icon: FileText },
  { label: 'Online Asset Analysis', icon: BarChart3 },
]

const maintenanceServices = [
  { label: 'Comprehensive Roof System Inspections', icon: Search },
  { label: 'Extensive Reports with Photos', icon: FileText },
  { label: 'Proposals for Work Needed', icon: ClipboardList },
  { label: 'Manufacturer\'s Warranty Maintenance & Extensions', icon: ShieldCheck },
  { label: 'Online Customer Portal', icon: BarChart3 },
  { label: 'Online Asset Analysis', icon: BarChart3 },
]

export default function RoofingServicesPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-[var(--black)] text-white noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Commercial Roofing Experts
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Targeted Commercial Roofing Services
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed">
              Property managers, property owners and condo/HOA boards trust Target Roofing
              because of our longstanding commitment to be responsible, accountable and reliable.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
              >
                Get a Free Estimate
              </Link>
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

      {/* ==================== COMMITMENT SECTION ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Our Commitment to You
              </h2>
              <div className="red-accent-left">
                <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                  At Target Roofing, we hold ourselves to the highest standards of service.
                  When you work with us, you can count on:
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-[var(--red)] flex-shrink-0 mt-0.5" />
                  <p className="text-[var(--gray-700)] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MAINTENANCE PLANS OVERVIEW ==================== */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
              Preventative Maintenance Plans
            </h2>
            <p className="text-lg text-[var(--gray-600)] leading-relaxed">
              Many property managers take advantage of Target Roofing&apos;s preventative maintenance
              plans, which include comprehensive inspections, detailed reports and professional
              recommendations. This documentation is required under a manufacturer&apos;s warranty
              and ultimately helps extend the life of a roof.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-[var(--red)]">
              <h3 className="text-xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)] uppercase tracking-wide">
                Complimentary Reports Include:
              </h3>
              <ul className="space-y-4">
                {complimentaryReports.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0" />
                    <span className="text-[var(--gray-700)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-[var(--black)] mb-4">
              Call us today to schedule a FREE estimate:
            </p>
            <a
              href="tel:239-332-5707"
              className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-[var(--red)] hover:text-[var(--red-dark)] transition-colors font-[family-name:var(--font-display)]"
            >
              <Phone className="h-8 w-8" />
              239-332-5707
            </a>
          </div>
        </div>
      </section>

      {/* ==================== NEW ROOFS ==================== */}
      <section id="new-roofs" className="bg-white py-20 md:py-28 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <Building2 className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  New Construction
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                New Roofs
              </h2>
              <div className="red-accent-left mb-8">
                <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                  It&apos;s our honor to provide commercial roofing services to some premier
                  general contractors.
                </p>
              </div>
              <p className="text-[var(--gray-600)] leading-relaxed mb-8">
                Ask about our value engineering approach to helping you deliver projects
                on-time and on-budget.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)]"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {newRoofTypes.map((type) => (
                <div
                  key={type}
                  className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg p-5 text-center hover:border-[var(--red)] hover:shadow-md transition-all"
                >
                  <Building2 className="h-8 w-8 text-[var(--red)] mx-auto mb-3" />
                  <span className="text-sm font-semibold text-[var(--black)] uppercase tracking-wide font-[family-name:var(--font-display)]">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== REROOFING ==================== */}
      <section id="reroofing" className="bg-[var(--gray-50)] py-20 md:py-28 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
              <RotateCcw className="h-5 w-5 text-[var(--red)]" />
              <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                Roof Replacement
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
              Reroofing
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reroofingFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.label}
                  className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all"
                >
                  <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                  <h3 className="font-bold text-[var(--black)] text-lg font-[family-name:var(--font-display)] uppercase tracking-wide">
                    {feature.label}
                  </h3>
                </div>
              )
            })}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--gray-600)] leading-relaxed text-lg">
              We are happy to provide references from the many property owners, property managers
              and condo/HOA boards we have served over the years.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== REPAIRS ==================== */}
      <section id="repairs" className="bg-white py-20 md:py-28 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <Wrench className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Emergency & Scheduled
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Roof Repairs
              </h2>
              <div className="red-accent-left mb-8">
                <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                  When you need roof repairs, responsiveness is key. Call on us 24 hours a day,
                  seven days a week, 365 days a year.
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--red)]/5 border border-[var(--red)]/20 rounded-lg">
                <Clock className="h-8 w-8 text-[var(--red)] flex-shrink-0" />
                <div>
                  <p className="font-bold text-[var(--black)] text-sm uppercase tracking-wide font-[family-name:var(--font-display)]">
                    24/7/365 Emergency Response
                  </p>
                  <a href="tel:239-332-5707" className="text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors">
                    239-332-5707
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {repairFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-4 p-4 bg-[var(--gray-50)] rounded-lg border border-[var(--gray-200)] hover:border-[var(--red)] transition-colors"
                  >
                    <Icon className="h-6 w-6 text-[var(--red)] flex-shrink-0" />
                    <span className="font-semibold text-[var(--black)]">{feature.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MAINTENANCE PLANS ==================== */}
      <section id="maintenance-plans" className="bg-[var(--gray-50)] py-20 md:py-28 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
              <ShieldCheck className="h-5 w-5 text-[var(--red)]" />
              <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                Protect Your Investment
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
              Maintenance Plans
            </h2>
            <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-2xl mx-auto">
              With yearly preventative maintenance, we help you extend the life of your roof.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all"
                >
                  <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                  <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide">
                    {service.label}
                  </h3>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/commercial-hoa-roof-maintenance"
              className="inline-flex items-center gap-2 text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)]"
            >
              Learn More About Our Maintenance Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-[var(--black)] text-white noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
            We Look Forward to Serving You
          </h2>
          <p className="text-lg text-[var(--gray-300)] leading-relaxed max-w-2xl mx-auto mb-10">
            We look forward to serving you with all your roofing needs, including new roofs,
            reroofing, roof repairs, and maintenance plans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
            >
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:239-332-5707"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              239-332-5707
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
