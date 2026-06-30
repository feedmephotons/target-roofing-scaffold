import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Award,
  Shield,
  Star,
  BadgeCheck,
  Building2,
  Wrench,
  Users,
  Clock,
  ChevronRight,
  Phone,
  Cpu,
  ClipboardCheck,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Target Roofing specializes in extending commercial roof lifespans through expert repairs and proactive maintenance in Southwest Florida. We manage replacement transitions seamlessly when needed.',
}

const certifications = [
  {
    name: 'GAF Master Elite Contractor',
    description: 'Top 3% of all roofing contractors nationwide',
    icon: Award,
  },
  {
    name: 'CertainTeed Silver Star Contractor',
    description: 'Recognized for installation excellence',
    icon: Star,
  },
  {
    name: 'Carlisle SynTec Champions Award',
    description: 'Outstanding performance in commercial roofing',
    icon: Award,
  },
  {
    name: 'GAF Triple Excellence Award',
    description: 'Excellence in installation, training & consumer protection',
    icon: BadgeCheck,
  },
  {
    name: 'BBB A+ Rating',
    description: 'Highest rating for trust and integrity',
    icon: Shield,
  },
  {
    name: 'NRCA Member',
    description: 'National Roofing Contractors Association',
    icon: Building2,
  },
  {
    name: 'Inc. Magazine Top 25 Fastest Growing',
    description: 'Recognized for exceptional business growth',
    icon: Star,
  },
  {
    name: 'Builders Care Partner of the Year',
    description: 'Committed to community service',
    icon: Users,
  },
]

const valueProps = [
  {
    title: 'Dedication to Customer Service Excellence',
    body: 'Target Roofing sets a high bar for customer service, taking the steps necessary to achieve excellence. First, our well-trained team is committed to professionalism. Second, they hold the technology to provide fast, accurate estimates in the field, and to track projects from start to completion. Finally, our experienced foremen have the longevity and expertise necessary to lead with precision. We\'re proud to say we promote from within and never use subs.',
    icon: Users,
    image: '/images/crew/crew-roof-inspection.png',
    imageAlt: 'Target Roofing crew member performing a thorough commercial roof inspection',
  },
  {
    title: 'Investment in Roofing Technology and Equipment',
    body: 'Target Roofing goes above and beyond by investing in state-of-the-art technology and equipment. These assets empower us to deliver roofing products and services with speed and efficiency. In fact, we create products most companies must outsource, and we own equipment others rent. This speeds production and delivery immensely! As a result, we can pass the cost savings on to you, and you benefit from the resulting quality control.',
    icon: Cpu,
    image: '/images/crew/crew-working-tpo.png',
    imageAlt: 'Target Roofing crew installing TPO membrane with state-of-the-art equipment',
  },
  {
    title: 'A Commitment to Structure and Accountability',
    body: 'Finally, the processes we\'ve put into place ensure we\'re consistently delivering roofing solutions on-time and on budget. You will know our schedule from the beginning, and we\'ll stay accountable to it. No job is too big for Target Roofing. We have an exceptional reputation for coming through and getting the job done on projects of all sizes. In fact, we are insured to work on high liability projects such as high rises and schools.',
    icon: ClipboardCheck,
    image: '/images/crew/crew-aerial-worksite.png',
    imageAlt: 'Aerial view of Target Roofing crew working on a large commercial roof project',
  },
]

export default function AboutPage() {
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
              About Target Roofing
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
              Extend Your Roof&apos;s Lifespan with the Right{' '}
              <span className="text-[var(--red)]">Repair &amp; Maintenance</span> Partner
            </h1>

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              Hiring a commercial partner who prioritizes repairs is key to controlling capital expenditures. We focus on extending your roof&apos;s life through proactive maintenance, providing a smooth transition to full replacement only when necessary.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
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
          </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── VALUE PROPOSITIONS ─── */}
      {valueProps.map((prop, index) => {
        const isReversed = index % 2 !== 0
        const Icon = prop.icon

        return (
          <section
            key={prop.title}
            className={`relative py-20 md:py-28 overflow-hidden ${
              index % 2 === 0 ? 'bg-white' : 'bg-[var(--gray-50)]'
            }`}
          >
            {/* Monochrome background on the middle section */}
            {index === 1 && (
              <div className="absolute inset-0">
                <Image src="/images/backgrounds/bg-aerial-mono.jpg" alt="" fill className="object-cover opacity-[0.04]" />
              </div>
            )}
            <AnimateIn animation="fade-up">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col gap-12 lg:gap-20 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    {/* Red accent border */}
                    <div
                      className={`absolute -z-0 w-full h-full bg-[var(--red)] rounded-sm ${
                        isReversed
                          ? 'top-0 left-0 sm:-top-4 sm:-left-4'
                          : 'top-0 right-0 sm:-top-4 sm:-right-4'
                      }`}
                    />
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                      <Image
                        src={prop.image}
                        alt={prop.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  {/* Section number */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-12 h-12 bg-[var(--red)] text-white rounded-sm">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="text-[var(--gray-400)] text-sm font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-display)]">
                      0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[var(--black)] leading-[1.05] mb-6 font-[family-name:var(--font-display)]">
                    {prop.title}
                  </h2>

                  <div className="red-accent-left">
                    <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                      {prop.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </AnimateIn>
          </section>
        )
      })}

      {/* ─── STATS STRIP ─── */}
      <section className="bg-[var(--red)] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { number: '30+', label: 'Years of Experience' },
              { number: '10,000+', label: 'Projects Completed' },
              { number: '100%', label: 'Licensed & Insured' },
              { number: '24/7', label: 'Emergency Response' },
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

      {/* ─── CERTIFICATIONS & AWARDS ─── */}
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
              Industry Recognition
              <span className="w-8 h-[2px] bg-[var(--red)]" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-display)]">
              Certifications &amp; Awards
            </h2>
            <p className="text-lg text-[var(--gray-400)] max-w-2xl mx-auto">
              Our commitment to excellence is recognized by the industry&apos;s
              most respected organizations.
            </p>
          </div>

          {/* Certifications grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => {
              const CertIcon = cert.icon
              return (
                <AnimateIn key={cert.name} animation="scale" delay={i * 80}>
                <div
                  className="group relative bg-white/5 border border-white/10 rounded-sm p-6 hover:bg-white/10 hover:border-[var(--red)]/50 transition-all duration-300"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[var(--red)]/20 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors duration-300">
                      <CertIcon className="w-5 h-5 text-[var(--red)] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wide mb-1 font-[family-name:var(--font-display)]">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-[var(--gray-400)]">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
                </AnimateIn>
              )
            })}
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

      {/* ─── INLINE LEAD CAPTURE FORM ─── */}
      <section id="lead-form" className="relative bg-white py-24 md:py-32 overflow-hidden scroll-mt-24">
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-[var(--gray-50)]"
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InlineLeadForm
            defaultService="repairs"
            title="Request a Repair Estimate &amp; Survey"
            subtitle="Let our expert team extend your roof's service life. Fill out the details below, and our crew in red polos will survey your roof and provide an itemized repair estimate."
            buttonText="Request Survey &amp; Estimate"
            darkTheme={false}
          />
        </div>
      </section>
    </>
  )
}
