import type { Metadata } from 'next'
import Image from 'next/image'
import {
  DollarSign,
  Heart,
  GraduationCap,
  TrendingUp,
  Users,
  MapPin,
  Mail,
  Phone,
  Briefcase,
} from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'
import RoofSchematic from '@/components/RoofSchematic'
import { getJobListings } from '@/app/actions'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Target Roofing, one of Florida\'s fastest-growing roofing companies. Explore career opportunities in sales, marketing, operations, service, and finance.',
}

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description: 'Industry-leading compensation that rewards your expertise and hard work.',
  },
  {
    icon: Heart,
    title: 'Industry-Leading Benefits Package',
    description: 'Comprehensive health, dental, and vision coverage for you and your family.',
  },
  {
    icon: GraduationCap,
    title: 'Paid On-The-Job Training',
    description: 'Learn and grow with hands-on training from experienced professionals.',
  },
  {
    icon: TrendingUp,
    title: 'Professional Growth Opportunities',
    description: 'Clear paths for advancement as we continue to expand across Florida.',
  },
  {
    icon: Users,
    title: 'Team-Oriented Culture',
    description: 'A supportive environment where collaboration and camaraderie come first.',
  },
  {
    icon: MapPin,
    title: 'Southwest Florida Location',
    description: 'Live and work in one of the most beautiful regions in the country.',
  },
]

export default async function CareersPage() {
  const jobListings = await getJobListings()
  const activeJobs = jobListings.filter(j => j.active)
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--black)] py-28 text-white overflow-hidden">
        <RoofSchematic className="text-white/[0.04] z-0" />
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <AnimateIn animation="fade-up">
            <div className="mb-4 inline-block bg-[var(--red)] px-4 py-1">
              <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-widest uppercase">
                Careers
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight md:text-7xl">
              Join the Target Roofing Team
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Build your career with one of Florida&apos;s fastest-growing
              companies.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* About Working Here */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="red-accent-left">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--black)] md:text-4xl">
              Why Target Roofing?
            </h2>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-[var(--gray-600)]">
            Target Roofing is among the fastest-growing companies on
            Florida&apos;s Gulf Coast, as noted by Business Observer, and
            we&apos;re continuing to add talented team members across our core
            departments: sales, marketing, operations, service and finance.
          </p>
        </div>
      </section>

      {/* Crew Team Photo */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="/images/crew/crew-team-photo.png"
          alt="Target Roofing crew team"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--black)]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimateIn animation="fade-up">
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white tracking-wide uppercase drop-shadow-lg">
              Our Culture. Our Crew.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative bg-[var(--gray-50)] py-20 overflow-hidden">
        {/* Monochrome background */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-crane-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <AnimateIn animation="fade-up">
            <div className="mb-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--black)] md:text-4xl">
                What We Offer
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 bg-[var(--red)]" />
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <AnimateIn key={benefit.title} animation="fade-up" delay={index * 100}>
                <div
                  className="group relative overflow-hidden rounded-sm border border-[var(--gray-200)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center bg-[var(--black)] transition-all duration-300 group-hover:bg-[var(--red)]">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-wide text-[var(--black)]">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-[var(--gray-500)]">
                    {benefit.description}
                  </p>

                  {/* Bottom accent bar on hover */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--red)] transition-all duration-300 group-hover:w-full" />
                </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--black)] md:text-4xl">
              Current Openings
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-[var(--red)]" />
          </div>

          {activeJobs.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-sm border border-dashed border-[var(--gray-300)] bg-[var(--gray-50)] px-8 py-12">
              <Briefcase className="mx-auto mb-4 h-12 w-12 text-[var(--gray-300)]" />
              <p className="text-lg text-[var(--gray-500)]">
                We do not have any job openings at the moment. Please come back
                again later.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              {activeJobs.map((job) => (
                <div key={job.id} className="rounded-lg border border-[var(--gray-200)] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--black)] font-[family-name:var(--font-display)]">{job.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[var(--gray-500)]">
                        <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.department}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                        <span className="rounded-full bg-[var(--red)]/10 px-3 py-0.5 text-xs font-bold text-[var(--red)] uppercase">{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[var(--gray-600)]">{job.description}</p>
                  {job.requirements.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--gray-500)]">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--red)] shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4">
                    <a href={`mailto:info@targetroofers.com?subject=Application: ${encodeURIComponent(job.title)}`} className="inline-flex items-center gap-2 rounded bg-[var(--red)] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-[var(--red-dark)] transition-colors">
                      <Mail className="h-4 w-4" /> Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative bg-[var(--red)] py-20 text-white">
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-white/90">
            For more information about careers at Target Roofing, reach out to
            our team.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="mailto:hr@targetroofers.com"
              className="inline-flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 bg-white px-2.5 xs:px-4 sm:px-8 py-3.5 min-h-[44px] font-[family-name:var(--font-display)] text-[10px] xs:text-xs sm:text-sm font-bold tracking-normal xs:tracking-wider sm:tracking-widest text-[var(--red)] uppercase transition-all duration-200 hover:bg-[var(--black)] hover:text-white max-w-full"
            >
              <Mail className="h-4 w-4 xs:h-5 xs:w-5 flex-shrink-0" />
              <span className="break-all">hr@targetroofers.com</span>
            </a>
            <a
              href="tel:239-332-5707"
              className="inline-flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 border-2 border-white px-2.5 xs:px-4 sm:px-8 py-3.5 min-h-[44px] font-[family-name:var(--font-display)] text-[10px] xs:text-xs sm:text-sm font-bold tracking-normal xs:tracking-wider sm:tracking-widest text-white uppercase transition-all duration-200 hover:bg-white hover:text-[var(--red)] max-w-full"
            >
              <Phone className="h-4 w-4 xs:h-5 xs:w-5 flex-shrink-0" />
              <span className="break-all">239-332-5707</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
