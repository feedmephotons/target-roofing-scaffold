import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Clock,
  Leaf,
  Shield,
  Sparkles,
  ArrowRight,
  MapPin,
} from 'lucide-react'
import SoftwashContactForm from './SoftwashContactForm'

export const metadata: Metadata = {
  title: 'Softwash Services',
  description:
    'Professional roof cleaning and soft wash services by Target Roofing. Same-day service, eco-friendly solutions. Serving Lee, Collier & Charlotte Counties.',
}

const features = [
  {
    icon: Clock,
    title: 'Same Day Service',
    desc: 'Fast, efficient scheduling and same-day pricing to get the job done when you need it.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Solutions',
    desc: 'Biodegradable cleaning agents that are safe for your family, pets, and the environment.',
  },
  {
    icon: Shield,
    title: 'Protect Your Investment',
    desc: 'Increases the lifespan of your roof by preventing deterioration caused by harmful growths.',
  },
  {
    icon: Sparkles,
    title: 'Enhance Curb Appeal',
    desc: 'Instantly improve the appearance of your home or business with a professional clean.',
  },
]

export default function SoftwashPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-[var(--black)] text-white noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Professional Roof Cleaning
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
              Roof Cleaning &amp; Soft Wash
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-10">
              Protect your investment and enhance your curb appeal with our professional,
              same-day soft wash services. Safe for your family, pets, and the environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
              >
                Schedule Today
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                239.332.5707
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE TARGET ROOFING ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
              Why Choose Target Roofing?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-lg border border-[var(--gray-200)] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[var(--red)] hover:-translate-y-1"
                >
                  {/* Red top accent */}
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-[var(--red)] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)] transition-colors group-hover:bg-[var(--red)] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold uppercase text-[var(--black)] font-[family-name:var(--font-display)]">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--gray-600)] leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <div className="relative bg-white">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)',
            background: 'var(--red)',
          }}
        />
      </div>

      <section className="relative bg-[var(--red)] text-white py-20 md:py-28 noise-overlay">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-[family-name:var(--font-display)] uppercase">
            Don&apos;t Let a Dirty Roof Ruin Your Curb Appeal
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-8">
            Get your free same-day estimate now.
          </p>
          <a
            href="tel:239-332-5707"
            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-white hover:scale-[1.02] transition-transform font-[family-name:var(--font-display)] border-2 border-white px-8 py-3 rounded"
          >
            <Phone className="h-6 w-6" />
            Call or Text: 239.332.5707
          </a>
        </div>
      </section>

      <div className="relative bg-[var(--red)]">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0% 100%)',
            background: 'var(--gray-50)',
          }}
        />
      </div>

      {/* ==================== CONTACT FORM ==================== */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-4">
              Get Your Free Quote
            </h2>
            <p className="text-[var(--gray-600)] leading-relaxed">
              Fill out the form below and we&apos;ll get back to you with a same-day estimate.
            </p>
          </div>

          <SoftwashContactForm />
        </div>
      </section>

      {/* ==================== SERVICE AREAS ==================== */}
      <section className="bg-white py-16 md:py-20 border-t border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-[var(--red)]" />
            <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
              Service Areas
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-4">
            Serving Lee, Collier, &amp; Charlotte Counties
          </h2>
          <p className="text-sm text-[var(--gray-500)]">
            Florida License: CCC1334168
          </p>
        </div>
      </section>
    </>
  )
}
