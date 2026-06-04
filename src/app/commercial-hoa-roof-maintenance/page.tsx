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
    'TotalCoverage Maintenance Plan by Target Roofing. Proactive commercial and HOA roof maintenance with 50+ point inspections. Serving Lee, Collier, Charlotte & Sarasota Counties.',
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const whyYouNeed = [
  { icon: Sun, text: 'Harsh Florida UV and weather exposure breaks down sealants and wears on roofs' },
  { icon: Droplets, text: 'If left unchecked ponding water will cause leaks at seams and/or penetrations' },
  { icon: Wrench, text: 'Damage from other trades can quickly create costly problems' },
  { icon: Leaf, text: 'Small resolvable issues such as clearing drainage systems of debris will prevent future leaks' },
  { icon: FileText, text: 'Most warranties or HOA bylaws recommend it' },
  { icon: ShieldCheck, text: 'A proactive maintenance plan will save you money in the long run' },
]

const howWeDiffer = [
  'Comprehensive checklist of over 50 points for thorough seasonal inspections',
  'GAF Certified Maintenance Professional',
  'Offer maintenance plans on all roofs, even if we did not install it',
  'Priority response times for service calls',
  'Detailed photo inspections and reports',
  'Same-day itemized estimates and recommendations',
  'Fixed or its free guarantee repair program',
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
      {/* ==================== HERO ==================== */}
      <section className="relative bg-[var(--black)] text-white noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Proactive Roof Maintenance
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
              TotalCoverage&trade; Maintenance Plan
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-10">
              Cost-Saving Proactive Maintenance Plan &mdash; Total Coverage, Total Confidence, Total Satisfaction
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
              >
                Get a Free Estimate
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
                  plan identifies and resolves issues before they become expensive emergencies.
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
              How We Differ
            </h2>
            <p className="text-lg text-[var(--gray-600)] leading-relaxed">
              Our maintenance program goes above and beyond what other roofers offer.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-10 border-t-4 border-[var(--red)]">
              <ul className="space-y-5">
                {howWeDiffer.map((item) => (
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
          <Quote className="h-12 w-12 text-[var(--red)] mx-auto mb-6 opacity-50" />
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed italic mb-8">
            &ldquo;Preventative maintenance is an essential tool in keeping your facility or HOA roofs
            leak-free and protect your warranty.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red)] text-white font-bold text-lg font-[family-name:var(--font-display)]">
              RB
            </div>
            <div className="text-left">
              <p className="font-bold text-white font-[family-name:var(--font-display)] uppercase tracking-wide">
                Rast Bryant
              </p>
              <p className="text-sm text-[var(--gray-400)]">Target Roofing</p>
            </div>
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
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--black)] font-bold uppercase tracking-wide rounded hover:bg-white/90 transition-colors shadow-lg text-sm"
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
          <p className="mt-8 text-sm text-white/60">
            Florida License: CCC1334168
          </p>
        </div>
      </section>
    </>
  )
}
