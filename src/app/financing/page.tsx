import type { Metadata } from 'next'
import Link from 'next/link'
import {
  DollarSign,
  CheckCircle2,
  Clock,
  Percent,
  Ban,
  Phone,
  FileCheck,
  Hammer,
  ChevronDown,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'
import RoofSchematic from '@/components/RoofSchematic'

export const metadata: Metadata = {
  title: 'Financing Options',
  description:
    'Flexible financing for your roofing project. Target Roofing offers affordable payment plans for roof repair and replacement in Southwest Florida.',
}

const benefits = [
  {
    title: 'Low Monthly Payments',
    description:
      'Break your roofing investment into manageable monthly payments that fit your budget.',
    icon: DollarSign,
  },
  {
    title: 'Quick & Easy Approval',
    description:
      'Our streamlined application process gets you an answer fast so your project can move forward.',
    icon: Clock,
  },
  {
    title: 'Competitive Interest Rates',
    description:
      'We work with trusted lending partners to offer you competitive rates on your roofing project.',
    icon: Percent,
  },
  {
    title: 'No Prepayment Penalties',
    description:
      'Pay off your balance early without any additional fees or penalties.',
    icon: Ban,
  },
]

const steps = [
  {
    number: '01',
    title: 'Contact Us for a Free Estimate',
    description:
      'Reach out to our team for a no-obligation roof inspection and detailed project estimate. We will assess your roof and provide a clear scope of work.',
    icon: Phone,
  },
  {
    number: '02',
    title: 'Apply for Financing',
    description:
      'Once you have your estimate, apply for financing through our simple application process. Most applicants receive a decision quickly.',
    icon: FileCheck,
  },
  {
    number: '03',
    title: 'We Start Your Project',
    description:
      'With financing approved, our expert crew gets to work on your roof right away. No waiting, no delays.',
    icon: Hammer,
  },
]

const faqs = [
  {
    question: 'Who is eligible for financing?',
    answer:
      'Financing is available to most homeowners and commercial property owners. Eligibility is determined by our lending partners based on standard credit criteria. Contact us to learn more about qualification requirements.',
  },
  {
    question: 'How long does the approval process take?',
    answer:
      'The application process is quick and straightforward. Many applicants receive a decision within minutes. Our team will walk you through every step so there are no surprises.',
  },
  {
    question: 'Can I finance both repairs and full roof replacements?',
    answer:
      'Yes. Financing is available for a wide range of roofing services, including repairs, full replacements, and new installations. Talk to our team about what options are available for your specific project.',
  },
  {
    question: 'Will applying for financing affect my credit score?',
    answer:
      'Initial pre-qualification typically involves a soft credit check, which does not affect your credit score. A full application may involve a hard inquiry. Our lending partners can provide specific details during the application process.',
  },
  {
    question: 'What if I want to pay off my balance early?',
    answer:
      'There are no prepayment penalties. You are free to pay off your remaining balance at any time without incurring additional fees.',
  },
]

export default function FinancingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[var(--black)] text-white noise-overlay overflow-hidden">
        <RoofSchematic className="text-white/[0.04] z-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <AnimateIn animation="fade-up">
            <span className="inline-block mb-4 px-4 py-1.5 border border-[var(--red)] text-[var(--red)] text-xs font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-display)]">
              Flexible Payment Plans
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-6 font-[family-name:var(--font-display)]">
              Roofing Financing
              <br />
              <span className="text-[var(--red)]">Options</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-[var(--gray-300)] leading-relaxed font-[family-name:var(--font-body)]">
              Protect your property now with flexible payment plans designed to
              fit your budget.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
              >
                Ask About Financing
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                See How It Works
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
              Make Your Roof{' '}
              <span className="text-[var(--red)]">Affordable</span>
            </h2>
            <div className="mt-4 mx-auto w-20 h-1 bg-[var(--red)]" />
            <p className="mt-8 text-lg md:text-xl text-[var(--gray-600)] leading-relaxed font-[family-name:var(--font-body)]">
              We understand a new roof is a significant investment. That is why
              Target Roofing offers flexible financing options to make your
              roofing project affordable. Whether you need a minor repair or a
              complete roof replacement, our financing plans help you get the
              work done now without the burden of a large upfront cost.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Benefits Cards ── */}
      <section className="relative bg-[var(--gray-50)] py-20 md:py-28 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
                Financing <span className="text-[var(--red)]">Benefits</span>
              </h2>
              <div className="mt-4 mx-auto w-20 h-1 bg-[var(--red)]" />
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <AnimateIn
                  key={benefit.title}
                  animation="fade-up"
                  delay={idx * 100}
                >
                  <div className="relative bg-white rounded-lg p-8 shadow-lg border-t-4 border-[var(--red)] h-full text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--red)]/10 text-[var(--red)] mb-6">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-[var(--gray-600)] leading-relaxed font-[family-name:var(--font-body)]">
                      {benefit.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works (3-Step) ── */}
      <section
        id="how-it-works"
        className="bg-white py-20 md:py-28 scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
                How It <span className="text-[var(--red)]">Works</span>
              </h2>
              <div className="mt-4 mx-auto w-20 h-1 bg-[var(--red)]" />
            </AnimateIn>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-[var(--gray-300)]" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <AnimateIn
                    key={step.number}
                    animation="fade-up"
                    delay={idx * 150}
                  >
                    <div className="relative text-center">
                      {/* Step number circle */}
                      <div className="relative z-10 inline-flex items-center justify-center w-32 h-32 rounded-full bg-[var(--black)] text-white mb-8 shadow-xl">
                        <div>
                          <span className="block text-4xl font-bold font-[family-name:var(--font-display)]">
                            {step.number}
                          </span>
                          <Icon className="w-6 h-6 mx-auto mt-1 text-[var(--red)]" />
                        </div>
                      </div>

                      {/* Arrow between steps (mobile) */}
                      {idx < steps.length - 1 && (
                        <div className="lg:hidden flex justify-center my-4">
                          <ArrowRight className="w-6 h-6 text-[var(--red)] rotate-90" />
                        </div>
                      )}

                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] mb-4">
                        {step.title}
                      </h3>
                      <p className="text-[var(--gray-600)] leading-relaxed font-[family-name:var(--font-body)] max-w-sm mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </AnimateIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Finance Your Roof ── */}
      <section className="relative bg-[var(--black)] text-white noise-overlay py-20 md:py-28 overflow-hidden">
        <RoofSchematic className="text-white/[0.04] z-0" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="md:flex items-center gap-12">
              <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-[var(--red)] text-[var(--red)]">
                  <ShieldAlert className="w-16 h-16" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
                  Don&apos;t Wait for a{' '}
                  <span className="text-[var(--red)]">Small Leak</span> to
                  Become a Big Problem
                </h2>
                <p className="text-lg text-[var(--gray-300)] leading-relaxed font-[family-name:var(--font-body)] mb-6">
                  A damaged roof only gets more expensive over time. Water
                  intrusion leads to mold, structural damage, and costly
                  interior repairs. Financing lets you address roofing issues
                  immediately, protecting your property and saving you money in
                  the long run.
                </p>
                <ul className="space-y-3">
                  {[
                    'Prevent further damage to your property',
                    'Avoid emergency repair costs',
                    'Maintain your property value',
                    'Enjoy peace of mind with a secure roof',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[var(--gray-300)] font-[family-name:var(--font-body)]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[var(--red)] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
                Frequently Asked{' '}
                <span className="text-[var(--red)]">Questions</span>
              </h2>
              <div className="mt-4 mx-auto w-20 h-1 bg-[var(--red)]" />
            </AnimateIn>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <AnimateIn key={faq.question} animation="fade-up" delay={idx * 80}>
                <details className="group bg-[var(--gray-50)] rounded-lg border border-[var(--gray-200)] overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-bold text-[var(--black)] font-[family-name:var(--font-display)] text-lg hover:bg-[var(--gray-100)] transition-colors">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--red)] shrink-0 ml-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-[var(--gray-600)] leading-relaxed font-[family-name:var(--font-body)]">
                    {faq.answer}
                  </div>
                </details>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative bg-[var(--black)] text-white noise-overlay py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn animation="fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              Ready to Get <span className="text-[var(--red)]">Started</span>?
            </h2>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed font-[family-name:var(--font-body)] mb-10 max-w-2xl mx-auto">
              Contact Target Roofing today to learn more about our financing
              options. Our team will help you find a payment plan that works for
              your budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-base"
            >
              Ask About Financing Options
              <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
