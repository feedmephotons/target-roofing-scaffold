import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  ArrowRight,
  MapPin,
  Quote,
  Star,
  Sun,
  Droplets,
  Wrench,
  Leaf,
  FileText,
  ShieldCheck,
  Building2,
  Home,
  Church,
  School,
  Landmark,
  Users,
  Layers,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Commercial & HOA Roof Maintenance',
  description:
    'Commercial and HOA roof maintenance in Lee, Collier, Charlotte and Sarasota counties. Plan inspections, drainage care, repair approvals and records for your property.',
  alternates: { canonical: '/commercial-hoa-roof-maintenance' },
  openGraph: { title: 'Commercial & HOA Roof Maintenance | Target Roofing', description: 'Plan roof inspections, maintenance scope and records for managed properties in Southwest Florida.', url: 'https://targetroofers.com/commercial-hoa-roof-maintenance' },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const whyYouNeed = [
  { icon: Sun, text: 'Track changes in exposed roofing, sealants and flashing over time.' },
  { icon: Droplets, text: 'Review drainage and areas where water remains after rain.' },
  { icon: Wrench, text: 'Document damage or changes after HVAC and other rooftop work.' },
  { icon: Leaf, text: 'Include drainage debris removal in an agreed maintenance scope.' },
  { icon: FileText, text: 'Keep inspection records with the roof warranty and prior repair documents.' },
  { icon: ShieldCheck, text: 'Separate routine care, approved repairs and longer-term capital planning.' },
]

const maintenanceScope = [
  'Roof areas and systems covered, including any excluded or inaccessible areas.',
  'Visit frequency, scheduling and the process for additional checks after storms or rooftop work.',
  'Inspection documentation, drainage care and minor work included in the plan.',
  'Findings that require a separate repair estimate and who can authorize that work.',
  'Report format, delivery timing and the contact who receives updates.',
  'Service-call availability, billing, renewal and cancellation terms in the written agreement.',
  'Any warranty-related obligations, exclusions or repair coverage confirmed in writing.',
]

const buildingTypes = [
  { icon: Building2, label: 'High-Rises' },
  { icon: Building2, label: 'Apartment Buildings' },
  { icon: Home, label: 'Condominiums' },
  { icon: Landmark, label: 'Shopping Plazas' },
  { icon: Church, label: 'Churches' },
  { icon: School, label: 'Schools' },
  { icon: Landmark, label: 'Government Facilities' },
  { icon: Users, label: 'HOA Communities' },
]

const roofTypes = [
  'TPO',
  'Modified Bitumen',
  'Asphalt Shingle',
  'Metal Panels',
  'Concrete or Clay Tiles',
  'Stone Coated Steel',
]

const serviceAreas = [
  {
    county: 'Lee County',
    cities: ['Bonita Springs', 'Cape Coral', 'Estero', 'Fort Myers', 'Fort Myers Beach', 'Lehigh Acres', 'Sanibel/Captiva'],
  },
  {
    county: 'Collier County',
    cities: ['Golden Gate', 'Immokalee', 'Marco Island', 'Naples'],
  },
  {
    county: 'Charlotte County',
    cities: ['Englewood', 'Port Charlotte', 'Punta Gorda'],
  },
  {
    county: 'Sarasota County',
    cities: ['North Port', 'Sarasota', 'Venice'],
  },
]

const testimonials = [
  {
    name: 'Thomas H.',
    text: 'Target Roofing pointed out problems with our roof drainage that kept water puddles on our roof for extended periods of time.',
  },
  {
    name: 'Valerie C.',
    text: "We love the quick response time and the discounted billing rates with Target Roofing's maintenance plan!",
  },
  {
    name: 'Lisa C.',
    text: 'We called several roofers for quotes thinking we needed a costly new roof. Target Roofing advised us we could extend the roof a few more years...',
  },
]

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function MaintenancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service', name: 'Commercial & HOA Roof Maintenance',
        url: 'https://targetroofers.com/commercial-hoa-roof-maintenance',
        provider: { '@type': 'RoofingContractor', '@id': 'https://targetroofers.com', name: 'Target Roofing' },
        areaServed: ['Lee', 'Collier', 'Charlotte', 'Sarasota'].map(name => ({ '@type': 'AdministrativeArea', name: `${name} County, Florida` })),
        serviceType: 'Roof Maintenance',
      }) }} />
      {/* ==================== HERO ==================== */}
      <section className="relative bg-[var(--black)] text-white noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              TotalCoverage&trade; Maintenance Plan
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
              Commercial &amp; HOA Roof Maintenance
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-10">
              Commercial and HOA roof care built around inspections, documented findings and an agreed maintenance scope.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?service=free-estimate"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
              >
                Get a Free Estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+12393325707"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                239-332-5707
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY YOU NEED A MAINTENANCE PLAN ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
                Why You Need a Maintenance Plan
              </h2>
              <div className="red-accent-left">
                <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                  Florida&apos;s climate is relentless on commercial roofs. A proactive maintenance
                  plan helps your team track condition changes and decide which issues need attention. The right scope depends on the roof system, access and the property&apos;s needs.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {whyYouNeed.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.text} className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--red)]/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[var(--red)]" />
                    </div>
                    <p className="text-[var(--gray-700)] leading-relaxed pt-1.5">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW WE DIFFER ==================== */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
              What to Confirm in Your Maintenance Plan
            </h2>
            <p className="text-lg text-[var(--gray-600)] leading-relaxed">
              Before approving a plan, agree on the visits, deliverables and work included. Ask our team to confirm the current TotalCoverage scope for your property.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-10 border-t-4 border-[var(--red)]">
              <ul className="space-y-5">
                {maintenanceScope.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-[var(--red)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--gray-700)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <div className="relative bg-[var(--gray-50)]">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)',
            background: 'var(--black)',
          }}
        />
      </div>

      <section className="relative bg-[var(--black)] py-20 md:py-28 noise-overlay">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6 font-[family-name:var(--font-display)]">Keep the roof record with the property</h2>
          <p className="text-lg text-[var(--gray-300)] leading-relaxed">A useful maintenance record connects the roof area, inspection date, photos, findings and action taken. Keep the approved scope and completed repairs with earlier reports so the next manager or HOA board can follow the history.</p>
          <p className="text-lg text-[var(--gray-300)] leading-relaxed mt-5">Maintenance does not guarantee a leak-free roof or automatically renew a manufacturer warranty. Review the actual coverage, required care and any approved repair methods in the written documents.</p>
        </div>
      </section>

      <div className="relative bg-[var(--black)]">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0% 100%)',
            background: 'white',
          }}
        />
      </div>

      {/* ==================== BUILDING TYPES ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
              Building Types We Serve
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {buildingTypes.map((type) => {
              const Icon = type.icon
              return (
                <div
                  key={type.label}
                  className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg p-6 text-center hover:border-[var(--red)] hover:shadow-md transition-all"
                >
                  <Icon className="h-8 w-8 text-[var(--red)] mx-auto mb-3" />
                  <span className="text-sm font-semibold text-[var(--black)] uppercase tracking-wide font-[family-name:var(--font-display)]">
                    {type.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== ROOF TYPES ==================== */}
      <section className="bg-[var(--gray-50)] py-16 md:py-20 border-t border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-[var(--red)]" />
              <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                All Roof Systems
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
              Roof Types We Maintain
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {roofTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-[var(--gray-300)] bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[var(--black)] font-[family-name:var(--font-display)] hover:border-[var(--red)] hover:text-[var(--red)] transition-colors"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICE AREAS ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-[var(--red)]" />
              <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                Service Areas
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
              Where We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceAreas.map((area) => (
              <div key={area.county}>
                <h3 className="text-lg font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide mb-4 pb-3 border-b-2 border-[var(--red)]">
                  {area.county}
                </h3>
                <ul className="space-y-2.5">
                  {area.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2 text-[var(--gray-600)]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--red)] flex-shrink-0" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <div className="relative bg-white">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)',
            background: 'var(--black)',
          }}
        />
      </div>

      <section className="relative bg-[var(--black)] py-24 lg:py-32 noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)] uppercase mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[var(--red)] text-[var(--red)]" />
              ))}
            </div>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="relative rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 h-8 w-8 text-[var(--red)]/30" />

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[var(--red)] text-[var(--red)]" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="mb-6 text-white/80 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--red)] text-white font-bold text-sm font-[family-name:var(--font-display)]">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-white text-sm">
                    {t.name}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="relative bg-[var(--black)]">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0% 100%)',
            background: 'white',
          }}
        />
      </div>

      <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
        <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">A practical handoff for managers and boards</h2>
          <p className="text-[var(--gray-600)] leading-relaxed mb-5">Before the first visit, gather the roof system information, installation date if known, warranty documents and earlier leak or repair reports. Identify safe access arrangements, the on-site contact and the person authorized to approve additional work.</p>
          <p className="text-[var(--gray-600)] leading-relaxed">After each visit, ask which findings need prompt attention, which can be scheduled and which should be monitored. Keep a record of approved and deferred work, with the reason for each decision. Confirm the next review date rather than treating one visit as ongoing coverage.</p>
        </div>
        <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Connect maintenance with the next decision</h2>
          <p className="text-[var(--gray-600)] leading-relaxed mb-5">Routine care, a condition survey and a repair project serve different purposes. Confirm whether testing or a broader evaluation is appropriate when leaks recur or the condition changes.</p>
          <div className="space-y-5">
            <p><Link href="/roofing-services/roof-inspections-surveys" className="font-bold text-[var(--red)] underline underline-offset-4">Review roof inspections and report scope</Link></p>
            <p><Link href="/roofing-services/commercial-roof-repair" className="font-bold text-[var(--red)] underline underline-offset-4">Plan commercial roof leak repairs</Link></p>
            <p><Link href="/roofing-services/roof-replacement" className="font-bold text-[var(--red)] underline underline-offset-4">Compare replacement for capital planning</Link></p>
          </div>
        </div>
      </div></section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-[var(--red)] text-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-display)] uppercase mb-6">
            Get Started with TotalCoverage&trade;
          </h2>
          <p className="text-lg text-white/85 leading-relaxed mb-10 max-w-2xl mx-auto">
            Protect your roof investment with a proactive maintenance plan tailored to your property.
            Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=free-estimate"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--black)] font-bold uppercase tracking-wide rounded hover:bg-white/90 transition-colors shadow-lg text-sm"
            >
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+12393325707"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              239-332-5707
            </a>
          </div>
          <p className="mt-8 text-sm text-white/60">
            Florida License: CCC1334168
          </p>
        </div>
      </section>
    </>
  )
}
