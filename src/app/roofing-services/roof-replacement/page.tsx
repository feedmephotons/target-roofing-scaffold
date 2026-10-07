import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import InlineLeadForm from '@/components/InlineLeadForm'
import { CITIES_BY_COUNTY, CITY_MAP } from '@/lib/locations'

export const metadata: Metadata = {
  title: 'Roof Replacement in Southwest Florida',
  description: 'Plan roof replacement for homes, commercial buildings and HOAs in Lee, Collier, Charlotte and Sarasota counties. Compare roof systems and request an estimate.',
  alternates: { canonical: '/roofing-services/roof-replacement' },
  openGraph: {
    title: 'Roof Replacement in Southwest Florida | Target Roofing',
    description: 'Repair or replace? Explore roofing systems, occupied-building planning and the next steps for your property.',
    url: 'https://targetroofers.com/roofing-services/roof-replacement',
  },
}

const systems = [
  { name: 'TPO & PVC membranes', href: '/roofing-services/tpo-pvc-membrane-roofing', text: 'For flat and low-slope commercial roofs. Review drainage, insulation, equipment curbs and the condition of the existing assembly before choosing a membrane.' },
  { name: 'Metal roofing', href: '/roofing-services/metal-roofing-systems', text: 'Consider panel profile, attachment, flashing and exposure. A metal roof proposal should describe the whole assembly, including details at transitions and penetrations.' },
  { name: 'Tile roofing', href: '/roofing-services/tile-roofing', text: 'Evaluate the underlayment and decking as well as the tile covering. Changing materials can affect roof weight, attachment and the scope of the project.' },
  { name: 'Asphalt shingles', href: '/roofing-services/asphalt-shingle-roofing', text: 'Compare shingle systems alongside underlayment, ventilation, flashing and deck repairs. Color and profile are only part of the replacement decision.' },
  { name: 'Built-up roofing', href: '/roofing-services/built-up-roofing-bur', text: 'An option for low-slope properties. The existing layers, moisture condition and building use help determine the appropriate replacement scope.' },
]

const faqs = [
  { q: 'Does a leak mean I need a new roof?', a: 'An isolated leak does not automatically mean replacement. A roof inspection helps distinguish a repairable detail from widespread deterioration, trapped moisture or recurring failures. Compare the scope and limitations of a repair with the proposed replacement before deciding.' },
  { q: 'What affects the price of a roof replacement?', a: 'Roof size and geometry, material choice, access, tear-off, damaged decking, insulation, drainage and equipment details all affect the scope. A property-specific written estimate is more useful than a generic price per square foot.' },
  { q: 'Can an occupied building stay open during roofing work?', a: 'Discuss building access, resident or tenant notices, delivery routes, noise, parking and areas that need protection before work is scheduled. The plan depends on the property and scope; review any restrictions with your project team.' },
  { q: 'What warranty will my roof have?', a: 'Ask for the written manufacturer and workmanship warranty terms that apply to the selected system and proposal. Coverage, exclusions, registration and maintenance requirements vary. Certification alone does not establish the warranty on your project.' },
]

export default function RoofReplacementPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Service', name: 'Roof Replacement',
      url: 'https://targetroofers.com/roofing-services/roof-replacement',
      provider: { '@type': 'RoofingContractor', '@id': 'https://targetroofers.com', name: 'Target Roofing' },
      areaServed: ['Lee', 'Collier', 'Charlotte', 'Sarasota'].map(name => ({ '@type': 'AdministrativeArea', name: `${name} County, Florida` })),
    }) }} />
    <div className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]"><div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Roofing Services', href: '/roofing-services' }, { name: 'Roof Replacement' }]} />
    </div></div>
    <section className="relative bg-[var(--black)] text-white overflow-hidden py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-[var(--red-light)] font-bold uppercase tracking-widest mb-4">Homes · Commercial · Condominiums &amp; HOAs</p>
          <h1 className="text-4xl md:text-5xl font-bold uppercase font-[family-name:var(--font-display)] leading-tight mb-6">Roof Replacement in Southwest Florida</h1>
          <p className="text-lg text-[var(--gray-300)] mb-8">Make the next roof decision with a clear scope. Target Roofing provides reroofing services across Lee, Collier, Charlotte and Sarasota counties, from material selection to planning work around an occupied property.</p>
          <a href="#lead-form" className="inline-flex min-h-11 px-7 py-4 bg-[var(--red)] font-bold uppercase rounded hover:bg-[var(--red-dark)]">Request a Replacement Estimate</a>
          <a href="tel:+12393325707" className="block mt-5 text-white underline underline-offset-4">Call 239-332-5707</a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border-l-4 border-[var(--red)]">
          <Image src="/images/portfolio/willow-glen.jpg" alt="Willow Glen property in Target Roofing's project portfolio" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2">
      <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Repair or replace?</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">Start with the roof&apos;s condition, the cause of the problem and your plans for the property. An isolated flashing or membrane defect may be repairable. Repeated leaks, deterioration across multiple areas or a failing assembly call for a broader evaluation.</p>
        <Link href="/roofing-services/roof-repair" className="font-bold text-[var(--red)] underline underline-offset-4">Explore roof repair options</Link>
      </div>
      <div className="bg-[var(--gray-50)] border-t-4 border-[var(--red)] p-8"><h3 className="text-2xl font-bold uppercase mb-4 font-[family-name:var(--font-display)]">What to compare in a proposal</h3>
        <ul className="list-disc pl-5 space-y-3 text-[var(--gray-600)]"><li>Condition findings and the reason for the recommendation.</li><li>Tear-off or recover scope, deck repairs and how concealed damage is handled.</li><li>Roof system, insulation, drainage, flashing and applicable product approvals.</li><li>Permits, inspection stages, access arrangements and written warranty terms.</li></ul>
      </div>
    </div></section>
    <section className="bg-[var(--gray-50)] py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold uppercase mb-8 font-[family-name:var(--font-display)]">Choose a system for the building</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{systems.map(system => <div key={system.href} className="bg-white p-7 border border-[var(--gray-200)]">
        <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]"><Link className="text-[var(--red)] underline underline-offset-4" href={system.href}>{system.name}</Link></h3><p className="text-[var(--gray-600)] leading-relaxed">{system.text}</p>
      </div>)}</div>
    </div></section>
    <section className="bg-white py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
      <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Plan around the people inside</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">For a condominium, HOA or operating business, the roofing scope and the communication plan belong together. Before scheduling, identify who approves the work, where equipment can be staged, which entrances must stay accessible and how occupants will receive updates.</p>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">For capital planning, ask for a comparison of repair, maintenance and replacement options with their limits explained. Separate urgent water-entry problems from work that can be scheduled. Review the proposed sequence, weather contingencies and closeout documents with the team.</p>
        <Link href="/our-process" className="font-bold text-[var(--red)] underline underline-offset-4">See our roofing process</Link>
      </div>
      <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">See the kinds of properties we serve</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-5">Our existing portfolio includes Willow Glen, Hotel Indigo, Boca Grande Health Clinic and RT Moore Warehouse. Browse the gallery for examples across condominium, hospitality, healthcare and warehouse properties, and ask which experience is relevant to your scope.</p>
        <Link href="/our-projects" className="font-bold text-[var(--red)] underline underline-offset-4">Browse Target Roofing projects</Link>
        <p className="mt-6"><Link href="/warranties" className="text-[var(--red)] underline underline-offset-4">Review warranty information</Link></p>
      </div>
    </div></section>
    <section className="bg-[var(--gray-50)] py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold uppercase mb-8 font-[family-name:var(--font-display)]">Roof replacement near you</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{CITIES_BY_COUNTY.filter(group => group.county !== 'DeSoto County').map(group => <div key={group.county}>
        <h3 className="text-xl font-bold mb-3">{group.county}</h3><ul className="space-y-3">{group.cities.map(city => <li key={city}><Link className="text-[var(--red)] underline underline-offset-4" href={`/locations/${city}/roof-replacement`}>{CITY_MAP[city].name} roof replacement</Link></li>)}</ul>
      </div>)}</div>
    </div></section>
    <section className="bg-white py-16"><div className="mx-auto max-w-4xl px-4 sm:px-6">
      <h2 className="text-3xl font-bold uppercase mb-8 font-[family-name:var(--font-display)]">Roof replacement questions</h2>
      <div className="divide-y divide-[var(--gray-200)]">{faqs.map(faq => <div key={faq.q} className="py-6"><h3 className="text-xl font-bold mb-3">{faq.q}</h3><p className="text-[var(--gray-600)] leading-relaxed">{faq.a}</p></div>)}</div>
    </div></section>
    <section id="lead-form" className="bg-[var(--red)] py-16 scroll-mt-28"><div className="mx-auto max-w-3xl px-4 sm:px-6">
      <InlineLeadForm defaultService="reroofing" title="Request a Roof Replacement Estimate" subtitle="Tell us about your property and the roof you need evaluated. Our team will follow up to discuss the next step." buttonText="Submit Replacement Request" formId="replacement" />
    </div></section>
  </>
}
