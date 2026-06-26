import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ClipboardList, FileText, Handshake, BarChart3, ShieldCheck } from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'
import RoofSchematic from '@/components/RoofSchematic'

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'Our structured 5-step roofing process ensures smooth repairs and seamless replacements, maximizing your roof\'s lifecycle with clear milestones.',
}

const steps = [
  {
    number: '01',
    title: 'Requesting a Proposal',
    description:
      'To begin a new commercial roof, re-roof or roof repair job, first we start with an assessment. For an existing roof, one of our professional surveyors will visit the site and talk with you to collect all the key information needed to begin work. For new constructions, a member of our new construction department will work with your general contractor to identify and account for all the specifics of your individual roofing job.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Delivering a Scope of Work',
    description:
      'Following the initial assessment, next we\'ll develop and deliver to you a full scope of work. Here we\'ll outline all the stages and costs of your new roof installation or construction. This comprehensive estimate will include any custom roofing materials or taper packages needed. It will also include base pricing with options, and outline any specific qualifications pertaining to your project.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Approval to Begin & Pre-Job Conference',
    description:
      'With your approval on the scope of work, we can begin work on your roof.',
    icon: Handshake,
  },
  {
    number: '04',
    title: 'Progress Reports',
    description:
      'Our customers love staying closely involved with the development of their roofing projects. Throughout construction, we provide timely and detailed progress reports, so you always know how your roofing project is tracking.',
    icon: BarChart3,
  },
  {
    number: '05',
    title: 'Job Completion',
    description:
      'Once the roofing construction or repair is complete, you get to enjoy peace of mind. There\'s nothing quite like knowing your new roof will keep you safe and dry, for many years to come.',
    icon: ShieldCheck,
  },
]

export default function OurProcessPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[var(--black)] text-white noise-overlay overflow-hidden">
        <RoofSchematic className="text-white/[0.04] z-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <AnimateIn animation="fade-up">
          <span className="inline-block mb-4 px-4 py-1.5 border border-[var(--red)] text-[var(--red)] text-xs font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-display)]">
            Our 5-Step Process
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-6 font-[family-name:var(--font-display)]">
            How We Serve You<br />
            <span className="text-[var(--red)]">Better</span> at Target Roofing
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-[var(--gray-300)] leading-relaxed font-[family-name:var(--font-body)]">
            At Target Roofing, we created a 5-Step Process designed to better serve our customers, maximize roof lifespan through expert repairs, and coordinate seamless replacements when necessary.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
            >
              Schedule Repair
            </a>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
            >
              Request a Survey
            </a>
          </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
              See Our Process <span className="text-[var(--red)]">in Action</span>
            </h2>
          </div>
          <AnimateIn animation="scale">
          <div className="video-container rounded-lg overflow-hidden shadow-2xl ring-1 ring-black/5">
            <iframe
              src="https://www.youtube.com/embed/cGLaC7x9btw"
              title="Target Roofing Process"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 5-Step Process ── */}
      <section className="relative bg-[var(--gray-50)] py-20 md:py-28 overflow-hidden">
        {/* Monochrome background */}
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-tpo-mono.jpg" alt="" fill className="object-cover opacity-[0.04]" />
        </div>

        {/* Section heading */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
            The Target Roofing <span className="text-[var(--red)]">Process</span>
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-[var(--red)]" />
        </div>

        {/* Steps */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Vertical timeline line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--gray-300)] -translate-x-1/2" />

          {steps.map((step, idx) => {
            const Icon = step.icon
            const isEven = idx % 2 === 0

            return (
              <AnimateIn key={step.number} animation="fade-up" delay={idx * 150}>
              <div className="relative mb-20 md:mb-28 last:mb-0">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-20 w-5 h-5 rounded-full bg-[var(--red)] ring-4 ring-white shadow-lg" />

                <div
                  className={`md:grid md:grid-cols-2 md:gap-16 items-start ${
                    isEven ? '' : 'md:direction-rtl'
                  }`}
                >
                  {/* Number side */}
                  <div
                    className={`flex flex-col ${
                      isEven
                        ? 'md:items-end md:text-right md:pr-12'
                        : 'md:items-start md:text-left md:pl-12 md:order-2'
                    }`}
                  >
                    {/* Big step number */}
                    <span className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-[family-name:var(--font-display)] font-bold leading-none text-[var(--red)] opacity-15 select-none -mb-12 sm:-mb-16 md:-mb-20">
                      {step.number}
                    </span>
                    {/* Visible number + title overlay */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded bg-[var(--red)] text-white">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-sm font-bold text-[var(--red)] uppercase tracking-[0.15em] font-[family-name:var(--font-display)]">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description side */}
                  <div
                    className={`mt-6 md:mt-8 ${
                      isEven
                        ? 'md:pl-12'
                        : 'md:pr-12 md:order-1 md:text-right'
                    }`}
                  >
                    <div
                      className={`relative bg-white rounded-lg p-6 sm:p-8 shadow-lg border-t-4 border-[var(--red)]`}
                    >
                      <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed font-[family-name:var(--font-body)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </AnimateIn>
            )
          })}
        </div>

        {/* Visual accent images */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimateIn animation="fade-left">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/crew/crew-tpo-welding.png"
                  alt="Close-up of Target Roofing crew member welding on a commercial roof"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </AnimateIn>
            <AnimateIn animation="fade-right">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/crew/crew-overhead-worksite.png"
                  alt="Target Roofing professional equipment laid out for a commercial roofing job"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── CTA INLINE LEAD FORM ── */}
      <section id="lead-form" className="relative bg-[var(--black)] text-white noise-overlay py-20 md:py-28 scroll-mt-24">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
          <InlineLeadForm
            defaultService="repairs"
            title="Ready to Get Started?"
            subtitle="Let our expert crew extend your roof's service life. Tell us about your repair needs, and our technicians in red polos will survey your property and provide an itemized proposal."
            buttonText="Submit Lead Details"
            darkTheme={true}
          />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
