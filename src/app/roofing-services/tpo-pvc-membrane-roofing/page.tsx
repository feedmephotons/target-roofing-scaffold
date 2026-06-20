import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle,
  ShieldCheck,
  Sun,
  Flame,
  Building2,
  Award,
  Users,
  HardHat,
  ArrowRight,
  Thermometer,
  Factory,
  Clock,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'TPO & PVC Membrane Roofing | Commercial Single-Ply Systems',
  description:
    'TPO and PVC single-ply membrane roofing for Southwest Florida commercial buildings. Heat-welded seams, Energy Star rated, and built for Florida hurricane zones. 30+ years of experience. Call Target Roofing at 239-332-5707.',
  keywords: [
    'TPO roofing',
    'PVC roofing',
    'single-ply membrane roofing',
    'commercial roofing Fort Myers',
    'commercial roofing Southwest Florida',
    'flat roof membrane',
    'low-slope roofing',
    'energy efficient roofing',
    'heat welded roofing',
    'thermoplastic roofing',
  ],
  openGraph: {
    title: 'TPO & PVC Membrane Roofing | Target Roofing',
    description:
      'Single-ply thermoplastic roofing membranes for Southwest Florida commercial buildings. Superior UV resistance, energy efficiency, and hurricane-rated protection.',
    type: 'website',
  },
}

const features = [
  {
    label: 'Heat-Welded Seams for Watertight Protection',
    description:
      'Hot-air welded seams create a monolithic, watertight bond that is stronger than the membrane itself, eliminating the adhesive failures common in older roofing systems.',
    icon: Flame,
  },
  {
    label: 'Energy Star Rated Reflective Membranes',
    description:
      'Bright white TPO and PVC membranes reflect up to 90% of solar radiation, reducing rooftop temperatures and lowering cooling costs in the Southwest Florida heat.',
    icon: Sun,
  },
  {
    label: 'Superior UV, Ozone & Chemical Resistance',
    description:
      'Engineered thermoplastic compounds resist degradation from constant UV exposure, ozone, and chemical runoff common in restaurant, industrial, and medical facilities.',
    icon: ShieldCheck,
  },
  {
    label: 'Ideal for Restaurants, Warehouses & Retail',
    description:
      'PVC membranes are particularly well-suited for commercial kitchens and food processing due to their resistance to grease, oils, and animal fats that degrade other roof systems.',
    icon: Factory,
  },
  {
    label: 'Manufacturer Warranties Up to 30 Years',
    description:
      'Our GAF Master Elite certification qualifies your building for the strongest manufacturer warranties available, including labor and material coverage up to 30 years.',
    icon: Award,
  },
  {
    label: 'Florida High Velocity Hurricane Zone Compliant',
    description:
      'Every membrane system we install meets or exceeds Florida Building Code requirements for High Velocity Hurricane Zones, including Miami-Dade NOA approvals.',
    icon: Building2,
  },
]

const whyTargetPoints = [
  {
    label: '30+ Years of Commercial Experience',
    description:
      'We have installed and maintained single-ply membrane systems across Southwest Florida since the early 1990s. Our crews know how TPO and PVC perform in this climate.',
    icon: Clock,
  },
  {
    label: 'GAF Master Elite Certified',
    description:
      'Fewer than 2% of roofing contractors in North America hold this certification. It means access to the best warranties and proof of installation excellence.',
    icon: Award,
  },
  {
    label: '100% Direct Employees',
    description:
      'Every crew member on your roof is a background-checked, trained Target Roofing employee. We never use subcontractors. You will see our red polos on your property.',
    icon: Users,
  },
  {
    label: 'Dedicated Project Management',
    description:
      'A single point of contact manages your project from survey through final inspection, with documented schedules, progress photos, and detailed invoicing.',
    icon: HardHat,
  },
]

export default function TpoPvcMembraneRoofingPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-working-tpo.jpg"
            alt="Target Roofing crew installing TPO membrane on a commercial flat roof in Southwest Florida"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/90 via-[var(--black)]/70 to-[var(--black)]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
              Single-Ply Membrane Systems
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              TPO &amp; PVC Membrane Roofing
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              High-performance thermoplastic roofing membranes engineered for Southwest Florida&apos;s commercial buildings. Energy-efficient, hurricane-rated, and built to last decades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                Request a Membrane Roof Estimate
              </a>
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Thermometer className="h-4 w-4" />
                Call 239-332-5707
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OVERVIEW ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-aerial-mono.jpg" alt="" fill className="object-cover opacity-[0.04]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <ShieldCheck className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    System Overview
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  The Standard for Commercial Flat Roofs in Southwest Florida
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    TPO (Thermoplastic Polyolefin) and PVC (Polyvinyl Chloride) are single-ply thermoplastic membranes that have become the dominant roofing systems for commercial flat and low-slope roofs throughout Southwest Florida. Their reflective white surfaces dramatically reduce cooling loads in our subtropical climate, while heat-welded seam technology creates a fully monolithic waterproofing layer that outperforms mechanically fastened and adhesive-based alternatives.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  In a region where roofs endure year-round UV bombardment, driving rain from tropical systems, and the salt-laden air of the Gulf Coast, membrane selection matters. TPO is the cost-effective workhorse for warehouses, retail centers, and office buildings where reflectivity and wind uplift resistance are primary concerns. PVC is the premium choice for restaurants, chemical plants, and facilities where the roof must resist grease, oils, and harsh chemical exposure without degradation.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Target Roofing installs both systems with fully adhered, mechanically attached, or ballasted configurations depending on building structure, wind zone requirements, and insulation design. Every installation is engineered to meet Florida Building Code Section 1504 and the High Velocity Hurricane Zone provisions that govern Lee, Collier, and Charlotte counties.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn animation="fade-up" delay={200}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew/crew-tpo-welding.png"
                  alt="Close-up of a Target Roofing technician heat-welding a TPO membrane seam"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-[var(--gray-500)]">
                <Flame className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                <span>Hot-air welding creates seams 3-4x stronger than the membrane sheet itself.</span>
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
                <Sun className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Membrane Advantages
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Why TPO &amp; PVC Outperform in Southwest Florida
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Single-ply thermoplastic membranes offer a combination of durability, energy efficiency, and long-term value that makes them the preferred choice for commercial property owners and managers across the Gulf Coast.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateIn key={feature.label} animation="fade-up" delay={idx * 100}>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all h-full">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <h3 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
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

      {/* ==================== TPO vs PVC COMPARISON ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-welding-mono.jpg" alt="" fill className="object-cover opacity-[0.03]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                TPO vs. PVC: Choosing the Right Membrane
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed max-w-3xl mx-auto">
                Both systems use heat-welded seams and deliver outstanding performance. The right choice depends on your building type, budget, and exposure conditions.
              </p>
            </AnimateIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimateIn animation="fade-left" delay={100}>
              <div className="bg-[var(--gray-50)] rounded-lg p-8 border border-[var(--gray-200)] shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--red)]/10 flex items-center justify-center">
                    <Sun className="h-5 w-5 text-[var(--red)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase">
                    TPO
                  </h3>
                </div>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  The most widely installed commercial roofing membrane in North America. TPO offers excellent reflectivity, strong wind uplift ratings, and a lower installed cost per square foot than PVC.
                </p>
                <h4 className="font-bold text-[var(--black)] text-sm uppercase tracking-wide mb-3 font-[family-name:var(--font-display)]">
                  Best For:
                </h4>
                <ul className="space-y-3">
                  {[
                    'Warehouses and distribution centers',
                    'Retail shopping centers',
                    'Office buildings and corporate campuses',
                    'Budget-conscious new construction',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--gray-700)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            <AnimateIn animation="fade-right" delay={100}>
              <div className="bg-[var(--gray-50)] rounded-lg p-8 border border-[var(--gray-200)] shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--red)]/10 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-[var(--red)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase">
                    PVC
                  </h3>
                </div>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  The premium single-ply option with superior chemical resistance. PVC membranes contain plasticizers that make them inherently fire-resistant and resistant to grease, oils, and animal fats.
                </p>
                <h4 className="font-bold text-[var(--black)] text-sm uppercase tracking-wide mb-3 font-[family-name:var(--font-display)]">
                  Best For:
                </h4>
                <ul className="space-y-3">
                  {[
                    'Restaurants and commercial kitchens',
                    'Chemical and manufacturing plants',
                    'Medical and laboratory facilities',
                    'Properties requiring maximum fire resistance',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--gray-700)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn animation="fade-up" delay={300}>
            <div className="mt-10 max-w-3xl mx-auto text-center">
              <p className="text-[var(--gray-600)] leading-relaxed">
                Not sure which system is right for your building? Our project managers will evaluate your roof deck, drainage, mechanical equipment, and exposure conditions, then recommend the membrane that delivers the best long-term value for your specific application.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== WHY TARGET ROOFING ==================== */}
      <section className="bg-blueprint-dark text-white py-20 md:py-28 noise-overlay relative">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
                Your Membrane Roofing Partner
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
                Why Target Roofing
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-lg text-[var(--gray-300)] leading-relaxed max-w-3xl mx-auto">
                When you invest in a membrane roof system, you need a contractor with the certifications, workforce, and track record to install it correctly. A membrane is only as good as the crew that welds it.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyTargetPoints.map((point, idx) => {
              const Icon = point.icon
              return (
                <AnimateIn key={point.label} animation="fade-up" delay={idx * 100}>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors h-full">
                    <Icon className="h-8 w-8 text-[var(--red-light)] mb-4" />
                    <h3 className="font-bold text-white font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
                      {point.label}
                    </h3>
                    <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </AnimateIn>
              )
            })}
          </div>

          <AnimateIn animation="fade-up" delay={400}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[10px] text-[var(--gray-400)] font-mono uppercase tracking-wider">License: CCC1334168</span>
                <span className="w-1 h-1 rounded-full bg-[var(--gray-500)]" />
                <span className="text-[10px] text-[var(--gray-400)] font-mono uppercase tracking-wider">State Certified</span>
                <span className="w-1 h-1 rounded-full bg-[var(--gray-500)]" />
                <span className="text-[10px] text-[var(--gray-400)] font-mono uppercase tracking-wider">GAF Master Elite</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== BACK TO SERVICES + CTA ==================== */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/roofing-services"
                className="inline-flex items-center gap-2 text-[var(--gray-600)] hover:text-[var(--red)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] font-semibold min-h-[44px] py-2 px-3"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                All Roofing Services
              </Link>
              <Link
                href="/our-process"
                className="inline-flex items-center gap-2 text-[var(--red)] hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] font-semibold min-h-[44px] py-2 px-3"
              >
                See Our Process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==================== INLINE LEAD CAPTURE FORM ==================== */}
      <section id="lead-form" className="bg-[var(--red)] text-white py-20 md:py-28 scroll-mt-24 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="scale">
            <InlineLeadForm
              defaultService="tpo-pvc-membrane"
              title="Request a Membrane Roofing Estimate"
              subtitle="Tell us about your commercial flat or low-slope roof, and our team will provide a detailed survey, system recommendation, and itemized estimate."
              buttonText="Submit Estimate Request"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
