import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShieldCheck,
  Wind,
  Home,
  Layers,
  DollarSign,
  Wrench,
  CheckCircle,
  Award,
  Users,
  Clock,
  ArrowRight,
  HardHat,
  Phone,
  CloudLightning,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Asphalt Shingle Roofing',
  description:
    'Professional asphalt shingle roof installation, repair, and replacement in Southwest Florida. GAF Master Elite & Owens Corning Platinum certified. License CCC1334168.',
  openGraph: {
    title: 'Asphalt Shingle Roofing | Target Roofing',
    description:
      'Professional asphalt shingle roof installation, repair, and replacement in Southwest Florida. GAF Master Elite & Owens Corning Platinum certified.',
    type: 'website',
  },
}

const features = [
  {
    label: 'Most Popular Residential Roofing in America',
    description:
      'Asphalt shingles protect more homes than any other roofing material. Proven performance, wide availability, and a massive range of colors and styles make them the default choice for Southwest Florida homeowners.',
    icon: Home,
  },
  {
    label: 'Hurricane-Rated Wind Resistance Up to 130+ MPH',
    description:
      'High-wind rated shingles meet Florida Building Code and Miami-Dade NOA requirements. Enhanced nailing patterns and adhesive strips keep shingles locked down during tropical storms and hurricanes.',
    icon: Wind,
  },
  {
    label: 'GAF Master Elite - Golden Pledge Warranty',
    description:
      'As a GAF Master Elite contractor, Target Roofing qualifies for the Golden Pledge warranty - 50 years of material coverage plus 25 years of workmanship protection. Only the top 2% of roofers earn this designation.',
    icon: Award,
  },
  {
    label: 'Owens Corning Platinum Preferred - Lifetime Warranty',
    description:
      'Our Owens Corning Platinum Preferred status unlocks their strongest warranty package - lifetime limited material coverage with workmanship protection that transfers to future homeowners.',
    icon: ShieldCheck,
  },
  {
    label: 'Cost-Effective with Excellent ROI',
    description:
      'Asphalt shingles are the most affordable roofing option per square foot, delivering strong curb appeal and reliable protection without the premium price tag of tile or metal systems.',
    icon: DollarSign,
  },
  {
    label: 'Fast, Clean Installation',
    description:
      'Most residential shingle roofs are completed in 1-3 days. Our crews follow strict jobsite cleanliness standards, running magnetic nail sweeps and thorough debris removal on every project.',
    icon: Wrench,
  },
]

const whyTargetPoints = [
  {
    label: '30+ Years Serving Southwest Florida',
    description:
      'Three decades of shingle installations across Lee, Collier, and Charlotte counties. We know every HOA requirement, local code nuance, and wind zone classification in the region.',
    icon: Award,
  },
  {
    label: 'GAF Master Elite & Owens Corning Platinum',
    description:
      'Dual manufacturer certifications unlock the strongest warranties in the industry. Your shingle roof is backed by both the manufacturer and our 25-year workmanship guarantee.',
    icon: ShieldCheck,
  },
  {
    label: '100% Direct Employees - No Subcontractors',
    description:
      'Every crew member is a full-time Target Roofing employee. Background-checked, safety-certified, and accountable to our quality standards on every job.',
    icon: Users,
  },
  {
    label: '24/7/365 Emergency Storm Response',
    description:
      'Hurricane damage to your shingle roof? Our rapid-response teams are dispatched within hours, not days. Local crews based in Fort Myers, Naples, and surrounding areas.',
    icon: Clock,
  },
]

export default function AsphaltShingleRoofingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Asphalt Shingle Roofing',
            description:
              'Professional asphalt shingle roof installation, repair, and replacement in Southwest Florida. GAF Master Elite & Owens Corning Platinum certified. License CCC1334168.',
            provider: {
              '@type': 'RoofingContractor',
              name: 'Target Roofing',
              url: 'https://targetroofers.com',
            },
            areaServed: { '@type': 'State', name: 'Florida' },
            serviceType: 'Roofing',
          }),
        }}
      />
      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-repairing-roof.png"
            alt="Target Roofing crew installing asphalt shingles on a residential roof in Southwest Florida"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/90 via-[var(--black)]/70 to-[var(--black)]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Residential Shingle Roofing
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Asphalt Shingle Roofing
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              America&apos;s most popular roofing material, installed by
              Southwest Florida&apos;s most trusted contractor. GAF Master Elite
              and Owens Corning Platinum certified for the strongest warranties
              in the industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Get Your Free Estimate
              </a>
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                239-332-5707
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OVERVIEW ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-aerial-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Home className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    System Overview
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  The Trusted Choice for Florida Homeowners
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Asphalt shingles are the most popular residential roofing
                    material in America, and for good reason. They deliver
                    reliable weather protection, a wide variety of styles and
                    colors, and excellent value per square foot. In Southwest
                    Florida, high-wind rated shingles provide proven performance
                    against hurricanes, tropical storms, and the relentless
                    summer heat.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  Target Roofing installs asphalt shingle roofs across Lee,
                  Collier, Charlotte, and Sarasota counties. We work with
                  premium manufacturer lines from GAF and Owens Corning,
                  offering everything from economical 3-tab shingles to
                  designer luxury profiles that replicate the look of natural
                  slate or cedar shake. Every installation meets or exceeds
                  Florida Building Code requirements for your specific wind
                  zone.
                </p>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  As both a GAF Master Elite and Owens Corning Platinum
                  Preferred contractor, we unlock warranty packages that most
                  roofing companies simply cannot offer. The GAF Golden Pledge
                  warranty provides 50 years of material coverage and 25 years
                  of workmanship protection. Owens Corning&apos;s Platinum
                  warranty delivers lifetime limited coverage that transfers to
                  future homeowners, adding real value at resale.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/crew-overhead-worksite.png"
                  alt="Target Roofing crew installing asphalt shingles on a residential property"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-4 p-4 bg-[var(--gray-50)] border border-[var(--gray-200)] shadow-sm rounded-lg">
                <HardHat className="h-8 w-8 text-[var(--red)] flex-shrink-0" />
                <div>
                  <p className="font-bold text-[var(--black)] text-sm uppercase tracking-wide font-[family-name:var(--font-display)]">
                    Licensed &amp; Insured
                  </p>
                  <p className="text-xs text-[var(--gray-500)]">
                    FL License CCC1334168 - State Certified Roofing Contractor
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES / BENEFITS GRID ==================== */}
      <section className="bg-blueprint-light py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <ShieldCheck className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Why Asphalt Shingles
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Benefits of Asphalt Shingle Roofing
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Asphalt shingles combine affordability, durability, and
                aesthetic versatility into the most practical roofing solution
                for Florida homes.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateIn
                  key={feature.label}
                  animation="fade-up"
                  delay={idx * 100}
                >
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all h-full">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <h3 className="font-bold text-[var(--black)] text-lg font-[family-name:var(--font-display)] uppercase tracking-wide mb-3">
                      {feature.label}
                    </h3>
                    <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== WHY TARGET ROOFING ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-welding-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Content */}
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <Award className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    The Target Roofing Difference
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Why Homeowners Choose Target Roofing
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    A shingle roof is only as good as the crew that installs it.
                    Improper nailing patterns, skipped starter strips, or
                    shortcuts on flashing details can void your warranty and
                    leave your home vulnerable during the next storm. The
                    contractor you choose matters as much as the shingle you
                    select.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-8">
                  Target Roofing has served Southwest Florida homeowners for
                  over 30 years. Our entire workforce is direct-hire - no
                  subcontractors, no temp labor. When you see a crew in red
                  Target Roofing polos on your roof, every person is
                  background-checked, safety-trained, and accountable to our
                  standards.
                </p>
              </AnimateIn>
              <AnimateIn animation="scale" delay={300}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[44px] py-2 px-3"
                >
                  Learn About Our Company
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimateIn>
            </div>

            {/* Right: Feature cards */}
            <div className="space-y-4">
              {whyTargetPoints.map((point, idx) => {
                const Icon = point.icon
                return (
                  <AnimateIn
                    key={point.label}
                    animation="fade-left"
                    delay={idx * 100}
                  >
                    <div className="flex items-start gap-4 p-5 bg-[var(--gray-50)] rounded-lg border border-[var(--gray-200)] hover:border-[var(--red)] transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--red)]/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-[var(--red)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide text-sm mb-1">
                          {point.label}
                        </h3>
                        <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SHINGLE TYPES COMPARISON ==================== */}
      <section className="bg-blueprint-dark text-white py-20 md:py-28 noise-overlay relative">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
                Shingle Types We Install
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-300)] leading-relaxed max-w-3xl mx-auto">
                From budget-friendly 3-tab to premium designer profiles, we
                install every category of asphalt shingle to match your home,
                budget, and performance requirements.
              </p>
            </AnimateIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AnimateIn animation="fade-up" delay={0}>
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm hover:border-[var(--red)]/50 transition-colors h-full">
                <div className="w-12 h-12 rounded-lg bg-[var(--red)]/20 flex items-center justify-center mb-5">
                  <Layers className="h-6 w-6 text-[var(--red-light)]" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 font-[family-name:var(--font-display)]">
                  3-Tab Shingles
                </h3>
                <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-4">
                  The economical choice for budget-conscious homeowners. A
                  single-layer, flat-profile shingle that provides reliable
                  protection at the lowest price point. Ideal for rental
                  properties, budget renovations, and structures where cost
                  efficiency is the priority.
                </p>
                <ul className="space-y-2">
                  {[
                    'Most affordable option',
                    'Clean, uniform appearance',
                    'Wind ratings up to 60-70 mph',
                    '20-25 year warranty',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[var(--gray-400)]"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[var(--red-light)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            <AnimateIn animation="fade-up" delay={100}>
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm hover:border-[var(--red)]/50 transition-colors h-full">
                <div className="w-12 h-12 rounded-lg bg-[var(--red)]/20 flex items-center justify-center mb-5">
                  <Home className="h-6 w-6 text-[var(--red-light)]" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 font-[family-name:var(--font-display)]">
                  Architectural
                </h3>
                <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-4">
                  The most popular choice for Florida homeowners. Multi-layered,
                  dimensional shingles create depth and shadow lines that
                  enhance curb appeal. Significantly stronger wind resistance
                  than 3-tab, with thicker construction that stands up to
                  Florida&apos;s harsh conditions.
                </p>
                <ul className="space-y-2">
                  {[
                    'Most popular residential choice',
                    'Dimensional, multi-layer profile',
                    'Wind ratings up to 130 mph',
                    '30-year limited warranty',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[var(--gray-400)]"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[var(--red-light)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm hover:border-[var(--red)]/50 transition-colors h-full">
                <div className="w-12 h-12 rounded-lg bg-[var(--red)]/20 flex items-center justify-center mb-5">
                  <Award className="h-6 w-6 text-[var(--red-light)]" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 font-[family-name:var(--font-display)]">
                  Designer / Luxury
                </h3>
                <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-4">
                  Premium shingles that replicate the look of natural slate,
                  cedar shake, or old-world tile at a fraction of the weight and
                  cost. The heaviest, thickest asphalt shingles available, with
                  the highest wind and impact ratings for maximum storm
                  protection.
                </p>
                <ul className="space-y-2">
                  {[
                    'Replicates slate or cedar shake',
                    'Heaviest, thickest construction',
                    'Wind ratings up to 130+ mph',
                    '50-year limited warranty',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[var(--gray-400)]"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-[var(--red-light)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn animation="fade-up" delay={300}>
            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-[10px] text-[var(--gray-400)] font-mono">
              <span>LICENSE: CCC1334168</span>
              <span>STATE CERTIFIED ROOFING CONTRACTOR</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== OUR SERVICES ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-aerial-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <Wrench className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Our Services
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Shingle Roofing Services We Provide
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                From minor leak repairs to complete tear-off and re-roof
                projects, Target Roofing handles every aspect of asphalt
                shingle roofing for homes across Southwest Florida.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Shingle Roof Repair',
                description:
                  'Cracked, curling, or missing shingles replaced quickly. We match existing shingle profiles and colors for seamless repairs that protect your home and preserve its appearance.',
                icon: Wrench,
              },
              {
                title: 'Storm Damage Repair',
                description:
                  'Hurricane and tropical storm damage assessed, documented for insurance, and repaired by certified crews. Emergency tarping available 24/7 to prevent secondary water damage.',
                icon: CloudLightning,
              },
              {
                title: 'Full Re-Roof',
                description:
                  'Complete tear-off of old roofing down to the deck, inspection and repair of sheathing, new underlayment, and fresh shingle installation with manufacturer-specified nailing patterns.',
                icon: Home,
              },
              {
                title: 'New Construction',
                description:
                  'Shingle roofing for new residential builds and additions. Coordinated scheduling with your general contractor, engineered to meet the latest Florida Building Code requirements.',
                icon: HardHat,
              },
            ].map((service, idx) => {
              const Icon = service.icon
              return (
                <AnimateIn
                  key={service.title}
                  animation="fade-up"
                  delay={idx * 100}
                >
                  <div className="bg-[var(--gray-50)] rounded-lg p-6 border border-[var(--gray-200)] hover:border-[var(--red)] hover:shadow-md transition-all h-full">
                    <div className="w-10 h-10 rounded-lg bg-[var(--red)]/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-[var(--red)]" />
                    </div>
                    <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide text-sm mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== INLINE LEAD CAPTURE FORM ==================== */}
      <section
        id="lead-form"
        className="bg-[var(--red)] text-white py-20 md:py-28 scroll-mt-24 relative"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="scale">
            <InlineLeadForm
              defaultService="shingle-roofing"
              title="Get Your Free Shingle Roof Estimate"
              subtitle="Tell us about your home and roofing needs. Our estimators will schedule a complimentary inspection, evaluate your roof, and provide a detailed proposal with transparent pricing and warranty options."
              buttonText="Submit Estimate Request"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
