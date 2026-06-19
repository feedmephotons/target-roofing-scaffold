'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Shield,
  Wrench,
  Building,
  ChevronRight,
  Star,
  Award,
  ArrowRight,
  Home,
  CalendarCheck,
  CheckCircle,
  Quote,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */
function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, start])
  return count
}

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook                                         */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ================================================================== */
/*  HOMEPAGE                                                           */
/* ================================================================== */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSignalsSection />
      <ServicesSection />
      <RepairFormSection />
      <StatsSection />
      <CommunitySection />
      <PortfolioSection />
      <TestimonialsSection />
      <NewsSection />
      <PartnersSection />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  TRUST SIGNALS                                                      */
/* ------------------------------------------------------------------ */
function TrustSignalsSection() {
  return (
    <section className="bg-blueprint-dark py-6 border-b border-white/10 text-white relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center text-center">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)] border border-[var(--red)]/20 flex-shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-sm tracking-wider uppercase font-[family-name:var(--font-display)]">GAF Master Elite</div>
              <div className="text-xs text-[var(--gray-400)]">Certified Contractor</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)] border border-[var(--red)]/20 flex-shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-sm tracking-wider uppercase font-[family-name:var(--font-display)]">A+ Accredited</div>
              <div className="text-xs text-[var(--gray-400)]">Better Business Bureau</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)] border border-[var(--red)]/20 flex-shrink-0">
              <Star className="h-6 w-6 fill-current text-[var(--red)]" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-sm tracking-wider uppercase font-[family-name:var(--font-display)]">5-Star Rated</div>
              <div className="text-xs text-[var(--gray-400)]">500+ Google Reviews</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)] border border-[var(--red)]/20 flex-shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-sm tracking-wider uppercase font-[family-name:var(--font-display)]">Licensed & Insured</div>
              <div className="text-xs text-[var(--gray-400)]">License #CCC1334168</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const audiences = ['Property Managers', 'Contractors', 'Property Owners', 'Condos/HOAs']

  return (
    <section className="relative -mt-[7.5rem] min-h-screen lg:h-screen overflow-hidden flex items-center pt-36 pb-12 lg:pt-[7.5rem] lg:pb-0 bg-[var(--black)]">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="hidden md:block absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ minWidth: '100vw', minHeight: '100vh' }}
          src="https://www.youtube.com/embed/yz5H6FkrWhs?autoplay=1&mute=1&loop=1&playlist=yz5H6FkrWhs&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&origin=https://targetroofers.com"
          title="Target Roofing Background Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/backgrounds/hero-fallback.jpg"
            alt="Target Roofing Background Fallback"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/85 via-black/70 to-black/85" />

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="col-span-1 lg:col-span-7 text-left text-white flex flex-col justify-center">
            <h1 className="animate-fade-in-up mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-display)] uppercase leading-[0.95]">
              Extend Your Roof&apos;s Life<br />
              <span className="text-[var(--red)]">With Expert Repairs</span>
            </h1>

            <p className="animate-fade-in-up mb-6 text-base sm:text-lg text-white/90 leading-relaxed font-light font-[family-name:var(--font-body)]"
               style={{ animationDelay: '0.15s' }}>
              Timely, professional repairs prevent minor leaks from turning into catastrophic failures. We specialize in extending the service life of commercial and residential roofs in Southwest Florida, transitioning seamlessly to replacement only when repairs are no longer cost-effective.
            </p>

            <h3 className="animate-fade-in-up mb-6 text-sm sm:text-base font-semibold tracking-wide text-white/80 uppercase font-[family-name:var(--font-display)]"
              style={{ animationDelay: '0.2s' }}
            >
              Serving Sarasota, Tampa, Fort Myers, Naples
            </h3>

            {/* Audience pills */}
            <div
              className="animate-fade-in-up mb-8 flex flex-wrap gap-2.5"
              style={{ animationDelay: '0.3s' }}
            >
              {audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm transition-colors hover:bg-[var(--red)] hover:border-[var(--red)]"
                >
                  {a}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="animate-fade-in-up flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: '0.4s' }}
            >
              <a
                href="#repair-form"
                className="inline-flex items-center justify-center gap-2 rounded bg-brand-gradient hover-bg-brand-gradient px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                <Wrench className="h-4.5 w-4.5" />
                Schedule Repair
              </a>
              <Link
                href="/contact?service=free-estimate"
                className="inline-flex items-center justify-center gap-2 rounded border-2 border-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[var(--black)]"
              >
                <CalendarCheck className="h-4.5 w-4.5" />
                Request a Survey
              </Link>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div 
            className="animate-fade-in-up col-span-1 lg:col-span-5 w-full relative z-10"
            style={{ animationDelay: '0.45s' }}
          >
            <InlineLeadForm
              defaultService="repairs"
              darkTheme={true}
              title="Get a Roof Repair Survey"
              subtitle="SWFL's local, reliable roofing experts. 24-hour response."
              buttonText="Schedule Inspection Survey"
              formId="hero"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="h-10 w-6 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <div className="h-2 w-1 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  2. SERVICES                                                        */
/* ------------------------------------------------------------------ */
const services = [
  {
    icon: Wrench,
    title: 'Roof Repair',
    desc: 'Extend your roof\'s life. We resolve leaks and structural wear early to prevent costly deterioration.',
    href: '/roofing-services#repairs',
  },
  {
    icon: Building,
    title: 'Replacement Transition',
    desc: 'When repairs are no longer cost-effective, we guide you through a seamless transition to a new roof.',
    href: '/roofing-services#reroofing',
  },
  {
    icon: Shield,
    title: 'Proactive Maintenance',
    desc: 'Preventative checkups and minor repairs designed to maximize roof service life and satisfy warranties.',
    href: '/roofing-services#maintenance-plans',
  },
  {
    icon: Home,
    title: 'New Construction',
    desc: 'Delivering top-tier new roof installations on-time and on-budget, built to withstand harsh weather.',
    href: '/roofing-services#new-roofs',
  },
]

function ServicesSection() {
  return (
    <section className="bg-blueprint-light py-24 lg:py-32 relative">
      {/* Subtle monochrome background texture */}
      <div className="absolute inset-0">
        <Image src="/images/backgrounds/bg-tpo-mono.jpg" alt="" fill className="object-cover opacity-[0.04]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn animation="fade-up" className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            Commercial Roof Repair & Lifecycle Management
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Maximize your roofing investment. We specialize in expert commercial roof repairs and proactive maintenance that extend your roof&apos;s lifespan. When replacement eventually becomes necessary, we leverage our deep property expertise to execute a seamless, stress-free transition.
          </p>
        </AnimateIn>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <AnimateIn key={service.title} animation="fade-up" delay={i * 100}>
                <Link
                  href={service.href}
                  className="group relative rounded-lg border border-[var(--gray-200)] bg-white p-8 text-center shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[var(--red)] hover:-translate-y-1 block h-full"
                >
                  {/* Red top accent */}
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-[var(--red)] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)] transition-colors group-hover:bg-[var(--red)] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold uppercase text-[var(--black)] font-[family-name:var(--font-display)]">
                    {service.title}
                  </h3>
                  <p className="mb-5 text-[var(--gray-600)] leading-relaxed text-sm">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-[var(--red)] group-hover:gap-2 transition-all">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </AnimateIn>
            )
          })}
        </div>

        {/* Equipment spread image */}
        <AnimateIn animation="fade-up" delay={200} className="mt-16">
          <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
            <Image
              src="/images/crew/crew-equipment-spread.jpg"
              alt="Professional roofing tools and equipment"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </div>
        </AnimateIn>

        {/* Bottom CTA */}
        <AnimateIn animation="fade-up" delay={300} className="mt-10 text-center">
          <Link
            href="/our-process"
            className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--black)] hover:text-[var(--red)] transition-colors group"
          >
            Learn About Our Process... and Why Customers Love It
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Lead Capture Form Section                                         */
/* ------------------------------------------------------------------ */
function RepairFormSection() {
  return (
    <section id="repair-form" className="bg-[var(--red)] py-20 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Form */}
            <div className="col-span-1 lg:col-span-7">
              <InlineLeadForm
                defaultService="repairs"
                title="Schedule Your Roof Repair Inspection"
                subtitle="Timely repairs extend roof life. Describe your leak or damage, and our certified crew in red polos will perform a comprehensive survey and provide an itemized estimate."
                buttonText="Schedule Inspection Survey"
                formId="repair"
                darkTheme={true}
              />
            </div>
            {/* Right Column: Visual Infographic */}
            <div className="hidden lg:block lg:col-span-5 relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/crew/crew-roof-inspection-hires.png"
                alt="Target Roofing crew member performing a commercial roof inspection"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  3. STATS COUNTER                                                   */
/* ------------------------------------------------------------------ */
function StatsSection() {
  const { ref, inView } = useInView(0.3)
  const projects = useCountUp(2500, 2200, inView)
  const professionals = useCountUp(75, 1800, inView)
  const response = useCountUp(24, 1400, inView)

  const stats = [
    { value: projects, suffix: '+', label: 'Completed Projects' },
    { value: professionals, suffix: '+', label: 'Full Time Professionals' },
    { value: response, suffix: '', label: 'Hour Response Rate' },
  ]

  return (
    <>
      {/* Slash divider into dark */}
      <div className="-black relative h-0">
        <div className="absolute bottom-0 left-0 right-0 h-20" />
      </div>

      <section
        ref={ref}
        className="relative bg-[var(--black)] py-24 lg:py-32 noise-overlay"
      >
        {/* Subtle monochrome background texture */}
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-welding-mono.jpg" alt="" fill className="object-cover opacity-[0.05]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <AnimateIn
                key={stat.label}
                animation="scale"
                delay={i * 200}
                className="text-center"
              >
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[var(--red)] font-[family-name:var(--font-display)]">
                  {stat.value.toLocaleString()}
                  <span>{stat.suffix}</span>
                </div>
                <div className="mt-3 text-lg font-semibold uppercase tracking-widest text-white/80 font-[family-name:var(--font-display)]">
                  {stat.label}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Slash divider out of dark */}
      <div className="-reverse relative bg-[var(--black)]">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0% 100%)',
            background: 'var(--gray-50)',
          }}
        />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  4. COMMUNITY PARTNER                                               */
/* ------------------------------------------------------------------ */
const communityEvents = [
  { img: '/images/community/year-in-review-2019.jpg', title: '2019 Year in Review' },
  { img: '/images/community/hurricane-dorian-relief.jpg', title: 'Hurricane Dorian Relief - Bahamas' },
  { img: '/images/community/john-morgan.jpg', title: 'Community Event' },
  { img: '/images/community/easter-golisano.jpg', title: 'Easter at Golisano Children\'s Hospital' },
]

function CommunitySection() {
  return (
    <section className="bg-[var(--gray-50)] py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle monochrome background texture */}
      <div className="absolute inset-0">
        <Image src="/images/backgrounds/bg-aerial-mono.jpg" alt="" fill className="object-cover opacity-[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn animation="fade-up" className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            A Community Partner
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Target Roofing is proud of its reputation as Southwest Florida&apos;s top commercial roofer, but equally gratifying are our partnerships with community-based organizations and foundations that generously serve the residents of this community.
          </p>
        </AnimateIn>

        {/* Team photo feature */}
        <AnimateIn animation="fade-up" delay={100} className="mb-12">
          <div className="relative h-72 lg:h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/crew/crew-team-photo.jpg"
              alt="Target Roofing team photo at golden hour"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-xl font-bold font-[family-name:var(--font-display)] uppercase tracking-wide drop-shadow-lg">
                Our Crew. Our Community.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Event cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {communityEvents.map((event, i) => (
            <AnimateIn key={event.title} animation="fade-up" delay={i * 100 + 200}>
              <article className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--black)] font-[family-name:var(--font-display)]">
                    {event.title}
                  </h3>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  5. PORTFOLIO SHOWCASE                                              */
/* ------------------------------------------------------------------ */
const projects = [
  { img: '/images/portfolio/regatta-naples.jpg', title: 'Regatta at Naples' },
  { img: '/images/portfolio/tpo-retrofit.jpg', title: 'TPO Retrofit' },
  { img: '/images/portfolio/site-safety.jpg', title: 'Site Safety Excellence' },
]

function PortfolioSection() {
  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle monochrome background texture */}
      <div className="absolute inset-0">
        <Image src="/images/backgrounds/bg-crane-mono.jpg" alt="" fill className="object-cover opacity-[0.04]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn animation="fade-up" className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            Examples of Peak Performance<br className="hidden sm:block" /> in Commercial Roofing
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Like these businesses, you can trust Target Roofing with your commercial roofing needs. The quality of our work shows in every project.
          </p>
        </AnimateIn>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} animation="fade-up" delay={i * 150}>
              <article className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-bold uppercase text-white font-[family-name:var(--font-display)] drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>

        {/* Crew action images row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimateIn animation="fade-up" delay={0}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/crew/crew-crane-lift.jpg"
                alt="Crane lifting roofing materials onto building"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-bold uppercase tracking-wide font-[family-name:var(--font-display)] drop-shadow-lg">
                  Heavy Lift Capability
                </p>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={150}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/crew/crew-welding-closeup.jpg"
                alt="Close-up of hands welding TPO seams"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-bold uppercase tracking-wide font-[family-name:var(--font-display)] drop-shadow-lg">
                  Precision Welding
                </p>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={300}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/crew/crew-aerial-worksite.png"
                alt="Aerial drone shot of roofing crew on worksite"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-bold uppercase tracking-wide font-[family-name:var(--font-display)] drop-shadow-lg">
                  Coordinated Crews
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* CTA */}
        <AnimateIn animation="fade-up" delay={200} className="mt-14 text-center">
          <Link
            href="/our-projects"
            className="inline-flex items-center gap-2 rounded bg-brand-gradient hover-bg-brand-gradient px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            View All Projects
            <ArrowRight className="h-5 w-5" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  6. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    name: 'Casey B.',
    text: 'I always know that I can count on the team at Target Roofing! Casey, Trey, and Shannon are all great people...',
  },
  {
    name: 'Katie Edmunds',
    text: 'Having worked with other, well-known roofing companies around SWFL, Target Roofing is, by far, second to none...',
  },
  {
    name: 'Orlando C.',
    text: 'Great overall service and product. I was absolutely blown away by the professionalism...',
  },
  {
    name: 'Omar A.',
    text: 'I want to say thank you to Target Roofing! And a bigger thanks to Trey!...',
  },
  {
    name: 'Jessica C.',
    text: 'We use this company for most of the properties we manage in the Fort Myers Area...',
  },
  {
    name: 'Nicole A.',
    text: 'Such friendly and accommodating workers! The service was incredible...',
  },
]

function TestimonialsSection() {
  return (
    <>
      {/* Slash divider into red/dark */}
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
          <AnimateIn animation="fade-up" className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)] uppercase mb-4">
              What Customers Say About<br className="hidden sm:block" /> Target Roofing
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[var(--red)] text-[var(--red)]" />
              ))}
            </div>
          </AnimateIn>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <AnimateIn key={t.name} animation="fade-up" delay={i * 150}>
                <article className="relative rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 h-full">
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
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Slash divider out of dark */}
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
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  7. NEWS                                                            */
/* ------------------------------------------------------------------ */
const blogPosts = [
  {
    img: '/images/blog/good-service-header.webp',
    title: "Here's What a Great Roofing Service Team Looks Like",
    href: '/target-news',
  },
  {
    img: '/images/blog/hurricane-preparedness.jpg',
    title: 'Hurricane Preparedness',
    href: '/target-news',
  },
  {
    img: '/images/blog/rainy-season.jpg',
    title: 'Preparing Your Commercial Roof for Rainy Season',
    href: '/target-news',
  },
]

function NewsSection() {
  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn animation="fade-up" className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            News About Target Roofing
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            You&apos;re seeing our name all over and we&apos;re proud to be making our mark.
          </p>
        </AnimateIn>

        {/* Blog cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <AnimateIn key={post.title} animation="fade-up" delay={i * 150}>
              <Link
                href={post.href}
                className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-[var(--gray-200)] block h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold uppercase text-[var(--black)] font-[family-name:var(--font-display)] group-hover:text-[var(--red)] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-[var(--red)]">
                    Read More <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        {/* Crew action strip */}
        <AnimateIn animation="fade-up" delay={200} className="mt-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 lg:h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/crew/crew-metal-fabrication.png"
                alt="Worker in sheet metal fabrication shop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="relative h-48 lg:h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/crew/crew-repairing-roof.png"
                alt="Worker applying sealant on flat roof"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </AnimateIn>

        {/* CTA */}
        <AnimateIn animation="fade-up" delay={300} className="mt-14 text-center">
          <Link
            href="/target-news"
            className="inline-flex items-center gap-2 rounded bg-brand-gradient hover-bg-brand-gradient px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            Visit Our Blog
            <ArrowRight className="h-5 w-5" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  8. PARTNERS                                                        */
/* ------------------------------------------------------------------ */
const partners = [
  { img: '/images/partners/englert.jpg', name: 'Englert' },
  { img: '/images/partners/genflex.jpg', name: 'GenFlex' },
  { img: '/images/partners/soprema.jpg', name: 'Soprema' },
  { img: '/images/partners/tropical-roofing.jpg', name: 'Tropical Roofing Products' },
  { img: '/images/partners/polyglass.png', name: 'Polyglass' },
  { img: '/images/partners/gaf.png', name: 'GAF' },
  { img: '/images/partners/carlisle.png', name: 'Carlisle' },
]

function PartnersSection() {
  return (
    <section className="border-t border-[var(--gray-200)] bg-[var(--gray-50)] py-20 lg:py-24 w-full">
      <div className="w-full px-4 sm:px-12 lg:px-24">
        {/* Header */}
        <AnimateIn animation="fade-up" className="mx-auto max-w-3xl text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-4">
            Target Roofing Partners
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            To provide the best commercial roofing services to you, we partner with the best.
          </p>
        </AnimateIn>

        {/* Partner logos */}
        <AnimateIn animation="blur" delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex h-24 w-full items-center justify-center max-w-[160px]"
              >
                <Image
                  src={partner.img}
                  alt={partner.name}
                  width={180}
                  height={90}
                  className="max-h-16 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
