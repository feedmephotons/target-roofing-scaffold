import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import InlineLeadForm from '@/components/InlineLeadForm'

export const metadata: Metadata = {
  title: 'Commercial Roof Repair in Southwest Florida',
  description: 'Commercial roof leak repair for businesses, condominiums and HOAs in Lee, Collier, Charlotte and Sarasota counties. Plan diagnosis, repair scope and occupied-building access.',
  alternates: { canonical: '/roofing-services/commercial-roof-repair' },
  openGraph: {
    title: 'Commercial Roof Repair | Target Roofing',
    description: 'A clear next step for roof leaks, recurring water entry and repair planning at occupied commercial properties.',
    url: 'https://targetroofers.com/roofing-services/commercial-roof-repair',
  },
}

const systems = [
  { name: 'TPO & PVC membrane roofs', href: '/roofing-services/tpo-pvc-membrane-roofing', text: 'Evaluate seams, flashings, penetrations and transitions. Identify the membrane and existing repair materials before choosing a compatible repair detail.' },
  { name: 'Built-up & modified bitumen roofs', href: '/roofing-services/built-up-roofing-bur', text: 'Review the condition of the layers, flashing details and drainage. Surface damage and moisture within the assembly can require different scopes.' },
  { name: 'Metal roofs', href: '/roofing-services/metal-roofing-systems', text: 'Consider panel seams, fasteners, corrosion and flashing at roof-mounted equipment. Repair planning should account for the specific panel and attachment system.' },
  { name: 'Tile & shingle roof areas', href: '/roofing-services/roof-repair', text: 'A damaged covering may be only one part of the problem. Review underlayment, flashing and transitions, including connections to adjoining low-slope roofs.' },
]

const questions = [
  { q: 'Can a commercial roof be repaired instead of replaced?', a: 'A localized defect may be repairable when the surrounding roof assembly remains suitable. Recurring leaks, deteriorated areas or moisture within the assembly need a broader evaluation. Ask for the findings, proposed repair boundaries and limitations before comparing repair with replacement.' },
  { q: 'What should I send with a leak repair request?', a: 'Share the building address, affected rooms or roof areas, when water appears, recent rooftop work and earlier repair records. Interior photos taken from a safe location can help describe the issue. Include the property contact and any access or tenant restrictions.' },
  { q: 'Does a repair include a warranty?', a: 'Review the written workmanship and material terms for the proposed repair. Coverage depends on the scope and products; an existing roof warranty may also affect who can perform work and which details are approved. A repair does not automatically renew or extend a roof-system warranty.' },
  { q: 'Can repairs be coordinated around tenants or residents?', a: 'Discuss operating hours, tenant notices, loading areas, roof access and areas requiring protection. Confirm the proposed sequence and restrictions with the project team. Scheduling and any temporary measures depend on weather, access and the condition found.' },
]

export default function CommercialRoofRepairPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Service', name: 'Commercial Roof Repair',
      url: 'https://targetroofers.com/roofing-services/commercial-roof-repair',
      description: 'Commercial roof repair evaluation and planning for businesses, condominiums and HOAs in Southwest Florida.',
      provider: { '@type': 'RoofingContractor', '@id': 'https://targetroofers.com', name: 'Target Roofing' },
      areaServed: ['Lee', 'Collier', 'Charlotte', 'Sarasota'].map(name => ({ '@type': 'AdministrativeArea', name: `${name} County, Florida` })),
      serviceType: 'Commercial Roof Repair',
    }) }} />
    <div className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]"><div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Roofing Services', href: '/roofing-services' }, { name: 'Commercial Roof Repair' }]} />
    </div></div>
    <section className="bg-[var(--black)] text-white py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-[var(--red-light)] font-bold uppercase tracking-widest mb-4">Businesses · Property Managers · Condominiums &amp; HOAs</p>
          <h1 className="text-4xl md:text-5xl font-bold uppercase font-[family-name:var(--font-display)] leading-tight mb-6">Commercial Roof Repair in Southwest Florida</h1>
          <p className="text-lg text-[var(--gray-300)] mb-8">Get a clear scope for your building&apos;s roof problem. Target Roofing serves Lee, Collier, Charlotte and Sarasota counties with roof repair services for operating businesses and managed properties.</p>
          <a href="#lead-form" className="inline-flex min-h-11 px-7 py-4 bg-[var(--red)] font-bold uppercase rounded hover:bg-[var(--red-dark)]">Request a Commercial Repair Evaluation</a>
          <a href="tel:+12393325707" className="block mt-5 text-white underline underline-offset-4">Call 239-332-5707 for an active leak</a>
          <p className="text-sm text-[var(--gray-400)] mt-3">Confirm current availability and the next step with the team.</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border-l-4 border-[var(--red)]">
          <Image src="/images/crew/crew-roof-inspection-hires.png" alt="Roof inspection image from Target Roofing's service gallery" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2">
      <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Start with the cause of water entry</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">The location of an interior stain does not always identify the roof defect. A useful evaluation connects the leak history with roof conditions, including seams, drains, flashings, equipment curbs and transitions between roof areas.</p>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">For repeated leaks, keep a record of when they occur and which areas are affected. Share earlier repairs and work by HVAC or other rooftop trades. The findings help distinguish an isolated repair from a problem that needs a wider condition survey.</p>
        <Link href="/roofing-services/roof-inspections-surveys" className="font-bold text-[var(--red)] underline underline-offset-4">Review commercial roof inspection options</Link>
      </div>
      <div className="bg-[var(--gray-50)] border-t-4 border-[var(--red)] p-8"><h3 className="text-2xl font-bold uppercase mb-4 font-[family-name:var(--font-display)]">Make the repair scope clear</h3>
        <ul className="list-disc pl-5 space-y-3 text-[var(--gray-600)]"><li>Areas evaluated and the condition supporting the recommendation.</li><li>Repair locations, materials and compatibility with the existing roof.</li><li>Temporary measures versus permanent work, including any follow-up needed.</li><li>Access, occupant protection, scheduling and written coverage terms.</li><li>How hidden damage, additional work and approval changes will be handled.</li></ul>
      </div>
    </div></section>
    <section className="bg-[var(--gray-50)] py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Match the repair to the roof system</h2>
      <p className="text-[var(--gray-600)] leading-relaxed max-w-3xl mb-8">Commercial properties can have several roof assemblies on one building. Review the existing system, condition and applicable manufacturer details before approving a patch, coating or broader repair.</p>
      <div className="grid gap-6 md:grid-cols-2">{systems.map(system => <div key={system.name} className="bg-white p-7 border border-[var(--gray-200)]">
        <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]"><Link className="text-[var(--red)] underline underline-offset-4" href={system.href}>{system.name}</Link></h3><p className="text-[var(--gray-600)] leading-relaxed">{system.text}</p>
      </div>)}</div>
    </div></section>
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
      <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Coordinate an occupied property</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">Identify the person who authorizes work and the on-site contact who can arrange access. For a condominium or HOA, assemble the affected building or unit list and the approval process. For an operating business, explain delivery routes, sensitive equipment and hours when disruption would be difficult.</p>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">Before scheduling, agree on tenant or resident notices, work areas, parking and a contact for updates. Keep the diagnosis, approved repair scope, photos and closeout records together so the next facilities manager or board can understand what was addressed.</p>
        <Link href="/our-process" className="font-bold text-[var(--red)] underline underline-offset-4">See our roofing process</Link>
      </div>
      <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Plan what follows the repair</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">A repair addresses a defined problem. It does not establish the condition of every roof area or remove the need for future inspections. If the findings show several deteriorated areas, compare the limits of continued repairs with a larger project.</p>
        <p className="mb-5"><Link href="/commercial-hoa-roof-maintenance" className="font-bold text-[var(--red)] underline underline-offset-4">Organize commercial and HOA roof maintenance</Link></p>
        <p className="mb-5"><Link href="/roofing-services/roof-replacement" className="font-bold text-[var(--red)] underline underline-offset-4">Compare roof replacement planning</Link></p>
        <p><Link href="/our-projects" className="font-bold text-[var(--red)] underline underline-offset-4">Browse our existing project portfolio</Link></p>
      </div>
    </div></section>
    <section className="bg-[var(--gray-50)] py-16"><div className="mx-auto max-w-4xl px-4 sm:px-6">
      <h2 className="text-3xl font-bold uppercase mb-8 font-[family-name:var(--font-display)]">Commercial roof repair questions</h2>
      <div className="divide-y divide-[var(--gray-200)]">{questions.map(item => <div key={item.q} className="py-6"><h3 className="text-xl font-bold mb-3">{item.q}</h3><p className="text-[var(--gray-600)] leading-relaxed">{item.a}</p></div>)}</div>
    </div></section>
    <section id="lead-form" className="bg-[var(--red)] py-16 scroll-mt-28"><div className="mx-auto max-w-3xl px-4 sm:px-6">
      <InlineLeadForm defaultService="repairs" title="Request a Commercial Roof Repair Evaluation" subtitle="Describe the property, affected areas and access needs. Our team will follow up to discuss the next step." buttonText="Submit Commercial Repair Request" formId="commercial-repair" />
    </div></section>
  </>
}
