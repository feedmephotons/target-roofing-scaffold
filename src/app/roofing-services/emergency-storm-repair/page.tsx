import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  Clock,
  Shield,
  FileText,
  Camera,
  Hammer,
  CalendarCheck,
  Users,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  CloudRain,
  ShieldCheck,
  HardHat,
  Droplets,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import AnimateIn from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Emergency Storm & Hurricane Repair | Target Roofing',
  description:
    'When storms hit Southwest Florida, Target Roofing responds with 24/7 emergency tarping, leak mitigation, and permanent storm damage repair. Insurance claim assistance and adjuster coordination included.',
  keywords: [
    'emergency roof repair',
    'hurricane roof damage',
    'storm damage repair',
    'emergency tarping',
    'Southwest Florida roofing',
    'commercial roof emergency',
    'insurance claim roofing',
    'Fort Myers storm repair',
    'Sarasota roof repair',
    'Naples emergency roofing',
  ],
}

const emergencyFeatures = [
  {
    label: '24/7/365 Emergency Response Dispatch',
    description:
      'Our crews are on standby around the clock. When a storm strikes, we mobilize immediately to minimize damage to your commercial property.',
    icon: Clock,
  },
  {
    label: 'Temporary Tarping & Water Intrusion Mitigation',
    description:
      'Rapid deployment of industrial-grade tarps and waterproofing barriers to halt active leaks and prevent interior damage while permanent repairs are planned.',
    icon: Droplets,
  },
  {
    label: 'Insurance Claim Assistance & Adjuster Coordination',
    description:
      'We work directly with your insurance adjuster, providing the documentation and scope of work they need to process your claim efficiently.',
    icon: FileText,
  },
  {
    label: 'Detailed Damage Documentation',
    description:
      'Comprehensive photo reports and damage assessments that satisfy insurance requirements and provide a clear record of pre-repair conditions.',
    icon: Camera,
  },
  {
    label: 'Permanent Repair or Full Replacement',
    description:
      'Once your insurance claim is approved, our direct-employ crews execute permanent repairs or a full roof replacement to restore your property.',
    icon: Hammer,
  },
  {
    label: 'Priority Scheduling for Maintenance Plan Customers',
    description:
      'Properties enrolled in our preventative maintenance program receive top-priority dispatch and expedited scheduling after a storm event.',
    icon: CalendarCheck,
  },
]

const stormTimeline = [
  {
    step: '01',
    title: 'Emergency Call',
    desc: 'You call our 24/7 emergency hotline. Our dispatch team gathers critical details about the damage and your property.',
  },
  {
    step: '02',
    title: 'Rapid Assessment',
    desc: 'A Target Roofing crew arrives on site to assess the damage, identify immediate hazards, and determine the scope of emergency stabilization needed.',
  },
  {
    step: '03',
    title: 'Tarping & Mitigation',
    desc: 'We deploy industrial-grade tarps and waterproofing measures to stop active leaks and protect your building interior from further damage.',
  },
  {
    step: '04',
    title: 'Documentation & Insurance',
    desc: 'Our team produces a detailed damage report with photographs, measurements, and repair scopes to support your insurance claim submission.',
  },
  {
    step: '05',
    title: 'Permanent Restoration',
    desc: 'After insurance approval, we execute the permanent repair or full replacement using our in-house crews, restoring your roof to full performance.',
  },
]

export default function EmergencyStormRepairPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative bg-blueprint-dark text-white noise-overlay min-h-[60vh] flex items-center">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/crew/crew-emergency-tarp.png"
            alt="Target Roofing crew performing emergency tarping on a commercial roof after storm damage"
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
              Emergency Storm Services
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-display)] leading-tight uppercase">
              Emergency Storm &amp; Hurricane Repair
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed mb-8 max-w-2xl">
              When storms hit Southwest Florida, Target Roofing responds with 24/7 emergency tarping, leak mitigation, and permanent storm damage repair. We work directly with your insurance adjuster to streamline the claims process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wide rounded transition-colors shadow-lg text-sm"
              >
                <Phone className="h-5 w-5 animate-bounce" />
                Call Emergency Line
              </a>
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <FileText className="h-4 w-4" />
                Report Storm Damage
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EMERGENCY DISPATCH BANNER ==================== */}
      <section className="bg-[var(--red)] text-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <span className="font-bold uppercase tracking-wider text-sm font-[family-name:var(--font-display)]">
                Emergency Dispatch Active
              </span>
            </div>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href="tel:239-332-5707"
              className="font-bold text-lg hover:underline font-[family-name:var(--font-display)]"
            >
              239-332-5707
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/80 text-sm">
              Average response under 2 hours for active emergencies
            </span>
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <AnimateIn animation="fade-up">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <CloudRain className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    Storm Damage Experts
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                  Southwest Florida&apos;s Storm Response Team
                </h2>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                    Southwest Florida sits in one of the most hurricane-vulnerable corridors in the United States. From June through November, commercial properties across Sarasota, Fort Myers, Naples, and Cape Coral face relentless exposure to tropical storms, hurricanes, and severe thunderstorm activity that can compromise even well-maintained roof systems in minutes.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-600)] leading-relaxed mb-6">
                  When a storm damages your commercial roof, the clock starts immediately. Water intrusion that goes unaddressed for even 24 hours can cause exponentially greater damage to insulation, decking, electrical systems, and interior finishes. The difference between a manageable repair and a catastrophic loss often comes down to how quickly a qualified crew can get on site to stabilize the situation. Target Roofing maintains dedicated emergency response crews across our Southwest Florida service area specifically for this purpose.
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={300}>
                <p className="text-[var(--gray-600)] leading-relaxed">
                  Our storm damage protocol goes beyond just patching holes. We perform a systematic assessment of the entire roof system, identifying both visible damage and latent issues that may not manifest for weeks or months after a storm event. This thorough approach ensures that your insurance claim captures the full scope of damage and that no hidden problems are left to create future failures. We then manage the entire restoration process from emergency tarping through permanent repair or replacement, keeping you informed at every stage.
                </p>
              </AnimateIn>
            </div>

            {/* Right Column: Emergency Response Card */}
            <div className="space-y-6">
              <AnimateIn animation="fade-right">
                <div className="relative bg-[var(--black)] rounded-lg shadow-md p-8 border-t-4 border-[var(--red)] text-white overflow-hidden noise-overlay">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--red)] rounded-full opacity-10 blur-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-3 h-3 rounded-full bg-[var(--red)] animate-pulse" />
                      <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--red-light)] font-[family-name:var(--font-display)]">
                        Storm Damage? Act Now.
                      </h3>
                    </div>
                    <h4 className="text-2xl font-bold uppercase mb-4 font-[family-name:var(--font-display)]">
                      Every Hour Counts After a Storm
                    </h4>
                    <p className="text-sm text-[var(--gray-300)] leading-relaxed mb-6">
                      Water intrusion accelerates damage exponentially. Interior damage, mold growth, and structural compromise can begin within hours of a breach. Our local emergency crews across Sarasota, Fort Myers, and Naples are standing by 24/7/365.
                    </p>
                    <AnimateIn animation="scale" delay={300}>
                      <a
                        href="tel:239-332-5707"
                        className="inline-flex items-center justify-center gap-3 w-full py-4 bg-brand-gradient hover-bg-brand-gradient text-white font-bold uppercase tracking-wider rounded transition-colors text-lg font-[family-name:var(--font-display)] shadow-lg shadow-black/25"
                      >
                        <Phone className="h-6 w-6 animate-bounce" />
                        Call 239-332-5707
                      </a>
                    </AnimateIn>
                    <p className="text-center text-[10px] text-[var(--gray-400)] mt-3">
                      Licensed &amp; insured. CCC1334168.
                    </p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-up" delay={200}>
                <div className="bg-[var(--gray-50)] rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
                  <h4 className="font-bold text-[var(--black)] mb-4 font-[family-name:var(--font-display)] uppercase tracking-wide text-sm">
                    After a Storm, Do Not:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Walk on a damaged roof without professional assessment',
                      'Attempt temporary repairs with consumer-grade materials',
                      'Wait for your insurance company before calling for emergency tarping',
                      'Sign contracts with unlicensed storm chasers',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--gray-700)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES / BENEFITS GRID ==================== */}
      <section className="bg-blueprint-light py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                <Shield className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  Full-Service Storm Response
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Emergency Storm Repair Capabilities
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-[var(--gray-600)] leading-relaxed text-lg max-w-3xl mx-auto">
                From the moment a storm hits to the final permanent repair, Target Roofing handles every phase of the recovery process for commercial properties across Southwest Florida.
              </p>
            </AnimateIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <AnimateIn key={feature.label} animation="fade-up" delay={idx * 100}>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--gray-200)] hover:shadow-md hover:border-[var(--red)] transition-all h-full">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <h3 className="font-bold text-[var(--black)] text-lg font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
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

      {/* ==================== STORM RESPONSE TIMELINE ==================== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/bg-aerial-mono.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimateIn animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-6">
                Our Storm Response Process
              </h2>
            </AnimateIn>
            <AnimateIn animation="fade-up" delay={100}>
              <p className="text-[var(--gray-600)] leading-relaxed text-lg max-w-3xl mx-auto">
                A proven, systematic approach to storm damage restoration that protects your property and simplifies the insurance process.
              </p>
            </AnimateIn>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {stormTimeline.map((item, idx) => (
              <AnimateIn key={item.step} animation="fade-left" delay={idx * 100}>
                <div className="flex gap-6 relative">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--red)] flex items-center justify-center text-white font-bold text-sm font-[family-name:var(--font-display)] flex-shrink-0">
                      {item.step}
                    </div>
                    {idx < stormTimeline.length - 1 && (
                      <div className="w-0.5 bg-[var(--red)]/20 flex-1 min-h-[2rem]" />
                    )}
                  </div>
                  <div className="pb-10">
                    <h3 className="font-bold text-[var(--black)] text-lg font-[family-name:var(--font-display)] uppercase tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[var(--gray-600)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY TARGET ROOFING ==================== */}
      <section className="bg-blueprint-dark text-white py-20 md:py-28 noise-overlay relative">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <AnimateIn animation="fade-up">
                <p className="text-[var(--red)] font-semibold uppercase tracking-widest text-sm mb-4 font-[family-name:var(--font-display)]">
                  Licensed. Insured. Local.
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-display)] uppercase">
                  Why Target Roofing for Storm Damage
                </h2>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <div className="red-accent-left mb-8">
                  <p className="text-lg text-[var(--gray-300)] leading-relaxed">
                    After a major storm, unlicensed contractors and out-of-state &ldquo;storm chasers&rdquo; flood Southwest Florida looking for vulnerable property owners. Target Roofing has been a permanent fixture in this community for over 30 years. We are your neighbors, not transient opportunists.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={200}>
                <p className="text-[var(--gray-400)] leading-relaxed mb-8">
                  Our GAF Master Elite certification places us in the top 2% of roofing contractors nationwide, a distinction that requires ongoing training, financial stability checks, and proven installation quality. Every crew member on your roof is a direct Target Roofing employee, fully background-checked and trained to our standards. We never use subcontractors, ensuring consistent quality and accountability on every emergency response call.
                </p>
              </AnimateIn>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  title: 'GAF Master Elite Certified',
                  desc: 'Top 2% of roofing contractors nationwide. The highest standard for manufacturer-backed warranties and installation quality.',
                },
                {
                  icon: HardHat,
                  title: '100% Direct Employees',
                  desc: 'No subcontractors. Every crew member is a full-time, background-checked Target Roofing professional in a red polo.',
                },
                {
                  icon: Clock,
                  title: '30+ Years in Southwest Florida',
                  desc: 'Locally owned and operated since the early 1990s. We have weathered every major storm alongside our clients.',
                },
                {
                  icon: Users,
                  title: 'Insurance Process Expertise',
                  desc: 'Decades of experience working with adjusters, public adjusters, and insurance carriers to ensure claims are documented and processed correctly.',
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <AnimateIn key={idx} animation="fade-right" delay={idx * 100}>
                    <div className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[var(--red)]/30 transition-colors">
                      <Icon className="h-8 w-8 text-[var(--red)] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-wide font-[family-name:var(--font-display)] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                          {item.desc}
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

      {/* ==================== INSURANCE ASSISTANCE CALLOUT ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <AnimateIn animation="fade-up">
              <div className="bg-[var(--gray-50)] rounded-lg shadow-md p-8 md:p-10 border-t-4 border-[var(--red)]">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[var(--red)]/10 rounded">
                  <FileText className="h-5 w-5 text-[var(--red)]" />
                  <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                    Insurance Claim Support
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)] uppercase">
                  We Handle the Paperwork So You Don&apos;t Have To
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-[var(--gray-600)] leading-relaxed">
                    Navigating a commercial insurance claim after storm damage is complex and time-consuming. Target Roofing&apos;s experienced project managers work alongside your insurance adjuster from the initial inspection through final settlement, providing the detailed documentation that carriers require.
                  </p>
                  <p className="text-[var(--gray-600)] leading-relaxed">
                    Our damage reports include comprehensive photography, precise measurements, material specifications, and itemized repair scopes that satisfy even the most rigorous insurance review processes. We have processed hundreds of commercial storm damage claims across Lee, Collier, and Sarasota counties.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Detailed photo documentation',
                    'Itemized damage assessments',
                    'Adjuster meeting coordination',
                    'Scope-of-work preparation',
                    'Supplemental claim support',
                    'Code upgrade documentation',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0" />
                      <span className="text-sm text-[var(--gray-700)] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ==================== CTA: BACK TO SERVICES ==================== */}
      <section className="bg-blueprint-light py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-[var(--gray-500)] uppercase tracking-wider font-[family-name:var(--font-display)] font-semibold mb-1">
                  Explore Our Services
                </p>
                <p className="text-[var(--gray-600)]">
                  Emergency repair is just one part of our comprehensive commercial roofing program.
                </p>
              </div>
              <Link
                href="/roofing-services"
                className="inline-flex items-center gap-2 text-[var(--red)] font-semibold hover:text-[var(--red-dark)] transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[44px] py-2 px-3 whitespace-nowrap"
              >
                All Roofing Services
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
              defaultService="emergency-storm-repair"
              title="Report Storm Damage"
              subtitle="Describe the damage to your commercial property and our emergency team will respond promptly. For active leaks or immediate emergencies, call 239-332-5707 directly."
              buttonText="Submit Emergency Request"
              darkTheme={true}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
