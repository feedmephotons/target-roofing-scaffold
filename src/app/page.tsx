'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  Shield,
  Clock,
  Wrench,
  Building,
  ChevronRight,
  Star,
  Play,
  Users,
  Award,
  ArrowRight,
  Home,
  CalendarCheck,
  Hammer,
  CheckCircle,
  Quote,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'

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
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const audiences = ['Property Managers', 'Contractors', 'Property Owners', 'Condos/HOAs']

  return (
    <section className="relative -mt-[7.5rem] min-h-screen lg:h-screen overflow-hidden flex items-center pt-28 pb-12 lg:py-0">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ minWidth: '100vw', minHeight: '100vh' }}
          src="https://www.youtube.com/embed/yz5H6FkrWhs?autoplay=1&mute=1&loop=1&playlist=yz5H6FkrWhs&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&origin=https://targetroofers.com"
          title="Target Roofing Background Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/85 via-black/70 to-black/85" />

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left text-white flex flex-col justify-center">
            <h1 className="animate-fade-in-up mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-display)] uppercase leading-[1.05]">
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
                className="inline-flex items-center justify-center gap-2 rounded bg-[var(--red)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[var(--red-dark)] hover:shadow-xl hover:scale-[1.02]"
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

          {/* Right Crew Image Column */}
          <div 
            className="animate-fade-in-up hidden lg:block lg:col-span-5 relative h-[480px] w-full rounded-lg overflow-hidden border-4 border-white/10 shadow-2xl"
            style={{ animationDelay: '0.45s' }}
          >
            <Image
              src="/images/crew/crew_repair_action.png"
              alt="Target Roofing technicians in red polos performing expert commercial roof repair"
              fill
              className="object-cover"
              priority
            />
            {/* Soft dark bottom overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">Our Professional Crew</p>
              <p className="text-xs text-white/80 font-light">Equipped, trained, and direct employees — never subcontractors.</p>
            </div>
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
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            Commercial Roof Repair & Lifecycle Management
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Maximize your roofing investment. We specialize in expert commercial roof repairs and proactive maintenance that extend your roof&apos;s lifespan. When replacement eventually becomes necessary, we leverage our deep property expertise to execute a seamless, stress-free transition.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`group relative rounded-lg border border-[var(--gray-200)] bg-white p-8 text-center shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[var(--red)] hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
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
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            href="/our-process"
            className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--black)] hover:text-[var(--red)] transition-colors group"
          >
            Learn About Our Process... and Why Customers Love It
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Lead Capture Form Section                                         */
/* ------------------------------------------------------------------ */
function RepairFormSection() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref} id="repair-form" className={`bg-[var(--gray-50)] py-20 border-t border-b border-[var(--gray-200)] scroll-mt-24 transition-all duration-750 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <InlineLeadForm
          defaultService="repairs"
          title="Schedule Your Roof Repair Inspection"
          subtitle="Timely repairs extend roof life. Describe your leak or damage, and our certified crew in red polos will perform a comprehensive survey and provide an itemized estimate."
          buttonText="Schedule Inspection Survey"
        />
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
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[var(--red)] font-[family-name:var(--font-display)]">
                  {stat.value.toLocaleString()}
                  <span>{stat.suffix}</span>
                </div>
                <div className="mt-3 text-lg font-semibold uppercase tracking-widest text-white/80 font-[family-name:var(--font-display)]">
                  {stat.label}
                </div>
              </div>
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
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="bg-[var(--gray-50)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            A Community Partner
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Target Roofing is proud of its reputation as Southwest Florida&apos;s top commercial roofer, but equally gratifying are our partnerships with community-based organizations and foundations that generously serve the residents of this community.
          </p>
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {communityEvents.map((event, i) => (
            <article
              key={event.title}
              className={`group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
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
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            Examples of Peak Performance<br className="hidden sm:block" /> in Commercial Roofing
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            Like these businesses, you can trust Target Roofing with your commercial roofing needs. The quality of our work shows in every project.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`group relative overflow-hidden rounded-lg shadow-lg transition-all duration-700 hover:shadow-2xl ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
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
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            href="/our-projects"
            className="inline-flex items-center gap-2 rounded bg-[var(--red)] px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[var(--red-dark)] hover:shadow-xl hover:scale-[1.02]"
          >
            View All Projects
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
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
  const { ref, inView } = useInView()

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

      <section ref={ref} className="relative bg-[var(--black)] py-24 lg:py-32 noise-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)] uppercase mb-4">
              What Customers Say About<br className="hidden sm:block" /> Target Roofing
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[var(--red)] text-[var(--red)]" />
              ))}
            </div>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                className={`relative rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-700 hover:bg-white/10 hover:border-white/20 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
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
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            News About Target Roofing
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            You&apos;re seeing our name all over and we&apos;re proud to be making our mark.
          </p>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Link
              key={post.title}
              href={post.href}
              className={`group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-700 hover:shadow-xl hover:-translate-y-1 border border-[var(--gray-200)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
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
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            href="/target-news"
            className="inline-flex items-center gap-2 rounded bg-[var(--red)] px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[var(--red-dark)] hover:shadow-xl hover:scale-[1.02]"
          >
            Visit Our Blog
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
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
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="border-t border-[var(--gray-200)] bg-[var(--gray-50)] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mx-auto max-w-3xl text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-4">
            Target Roofing Partners
          </h2>
          <p className="text-lg text-[var(--gray-600)] leading-relaxed">
            To provide the best commercial roofing services to you, we partner with the best.
          </p>
        </div>

        {/* Partner logos */}
        <div className={`flex flex-wrap items-center justify-center gap-8 lg:gap-12 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex h-20 w-36 items-center justify-center"
            >
              <Image
                src={partner.img}
                alt={partner.name}
                width={140}
                height={70}
                className="max-h-16 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
