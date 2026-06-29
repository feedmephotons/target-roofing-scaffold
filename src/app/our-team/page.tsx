import type { Metadata } from 'next'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the dedicated team behind Target Roofing. Our experienced professionals are committed to serving Southwest Florida with excellence.',
}

const teamMembers = [
  {
    name: 'Casey Crowther',
    title: 'Culture Captain',
    email: 'casey@targetroofers.com',
    image: '/images/team/casey-crowther.jpg',
  },
  {
    name: 'Patrick Davis',
    title: 'Service/Sales Manager',
    email: 'patrick@targetroofers.com',
    image: '/images/team/patrick-davis.jpg',
  },
  {
    name: 'Erik Depaz',
    title: 'Service Coordinator',
    email: 'erik@targetroofers.com',
    image: '/images/team/erik-depaz.jpg',
  },
  {
    name: 'Haylee VanZeyl',
    title: 'Marketing Manager',
    email: 'haylee@targetroofers.com',
    image: '/images/team/haylee-vanzeyl.png',
  },
  {
    name: 'Brent Westerfield',
    title: 'Account Manager',
    email: 'brent@targetroofers.com',
    image: '/images/team/brent-westerfield.jpg',
  },
  {
    name: 'Shanda Carpenter',
    title: 'Project Manager',
    email: 'shanda@targetroofers.com',
    image: '/images/team/shanda-carpenter.jpg',
  },
  {
    name: 'Matt Oberski',
    title: 'Account Manager',
    email: 'matt@targetroofers.com',
    image: '/images/team/matt-oberski.jpg',
  },
  {
    name: 'Arturo Reyes',
    title: 'Estimator',
    email: 'arturo@targetroofers.com',
    image: '/images/team/arturo-reyes.jpg',
  },
  {
    name: 'Sarka Heatherington',
    title: 'Controller',
    email: 'sarka@targetroofers.com',
    image: '/images/team/sarka-heatherington.jpg',
  },
  {
    name: 'Chayla Carlyle',
    title: 'Lead Intake',
    email: 'chayla@targetroofers.com',
    image: '/images/team/chayla-carlyle.jpg',
  },
  {
    name: 'John Sherwood',
    title: 'Senior Surveyor',
    email: 'john@targetroofers.com',
    image: '/images/team/john-sherwood.jpg',
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function OurTeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--black)] py-28 text-white">
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <AnimateIn animation="fade-up">
            <div className="mb-4 inline-block bg-[var(--red)] px-4 py-1">
              <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-widest uppercase">
                Our People
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight md:text-7xl">
              Meet Our Team
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Target Roofing is a roofing company local to Southwest Florida.
              We&apos;re proud of their commitment to serving our customers with
              excellence.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Crew Team Photo Banner */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src="/images/crew/crew-team-photo.jpg"
          alt="Target Roofing crew team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--black)]/40" />
      </section>

      {/* Team Grid */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <AnimateIn key={member.email} animation="fade-up" delay={index * 80}>
              <div
                className="group relative overflow-hidden rounded-sm border border-[var(--gray-200)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Red top accent bar */}
                <div className="h-1 w-full bg-[var(--red)] transition-all duration-300 group-hover:h-1.5" />

                <div className="p-8 text-center">
                  {/* Headshot Image */}
                  <div className="mx-auto mb-6 relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--red)]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-wide text-[var(--black)]">
                    {member.name}
                  </h3>

                  {/* Title */}
                  <p className="mt-1 text-sm font-medium tracking-wide text-[var(--gray-500)] uppercase">
                    {member.title}
                  </p>

                  {/* Divider */}
                  <div className="mx-auto my-4 h-px w-12 bg-[var(--red)] transition-all duration-300 group-hover:w-20" />

                  {/* Email */}
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 min-h-[44px] py-1 px-3 text-sm text-[var(--gray-600)] transition-colors duration-200 hover:text-[var(--red)]"
                  >
                    <Mail className="h-4 w-4" />
                    {member.email}
                  </a>
                </div>
              </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative bg-[var(--red)] py-20 text-white">
        <div className="noise-overlay absolute inset-0" />
        <AnimateIn animation="fade-up">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            Want to Join the Team?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            We&apos;re always looking for talented people who share our
            commitment to excellence.
          </p>
          <a
            href="/careers"
            className="mt-8 inline-block bg-white px-8 py-3 font-[family-name:var(--font-display)] text-sm font-bold tracking-widest text-[var(--red)] uppercase transition-all duration-200 hover:bg-[var(--black)] hover:text-white"
          >
            View Careers
          </a>
        </div>
        </AnimateIn>
      </section>
    </>
  )
}
