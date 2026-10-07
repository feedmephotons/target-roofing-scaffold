import Link from 'next/link'
import { CITY_MAP, type CitySlug } from '@/lib/locations'

// Source URLs checked Oct 7, 2026. These are owner resources, not a permit determination.
const countyResources: Record<string, { href: string; title: string; text: string }> = {
  'Lee County': { href: 'https://www.leegov.com/dcd/appinfocenter', title: 'Lee County application and information center', text: 'Lee County provides roof application guides and an eConnect portal for permit records and inspections. Fort Myers, Cape Coral, Bonita Springs and Sanibel also have municipal requirements to confirm for the property address.' },
  'Collier County': { href: 'https://www.collier.gov/Business-Resources/Building-Permits-Construction/Application-Requirements/PRRF', title: 'Collier County roof application requirements', text: 'Collier County has a dedicated roof application page covering replacement, repair and recover work, with submittals tied to the scope. Its guidance distinguishes commercial and multifamily site-planning documents from other roof applications.' },
  'Charlotte County': { href: 'https://www.charlottecountyfl.gov/departments/community-development/forms.stml', title: 'Charlotte County roof permit forms and checklists', text: 'Charlotte County publishes a residential roof application checklist and common application mistakes. For a Punta Gorda property, confirm whether the city or county is the reviewing authority before using a county application.' },
  'Sarasota County': { href: 'https://www.scgov.net/government/planning-and-development-services/building', title: 'Sarasota County building resources', text: 'Start with Sarasota County building resources and identify whether your property is within a municipality. Confirm the address, building use and scope with the responsible building department before planning the permit and inspection sequence.' },
}

const cityPlanning: Record<CitySlug, string> = {
  'southwest-florida': 'A project spanning several properties may involve different permitting authorities and roof assemblies. Keep the address, roof condition, access plan and approval contact separate for each building, then compare repair and replacement scopes consistently.',
  'fort-myers': 'For a downtown business, include delivery hours and public entrances in the access discussion. For a residential property, provide the roof type and the rooms where water appears. The property address determines whether city or county resources apply.',
  'cape-coral': 'For a Cape Coral home, describe whether the issue is on the house, garage or another roof section. Include the material and where the leak appears. Ask the team to distinguish a covering defect from a flashing, underlayment or drainage problem.',
  'bonita-springs': 'For a Bonita Springs condominium or HOA, identify the approval contact and whether the scope covers one unit, a common roof or several buildings. Share material or color restrictions before comparing repair and replacement proposals.',
  'sanibel': 'For a Sanibel property, discuss island access, material deliveries and where equipment can be staged. Identify any association approvals and property-specific constraints early so the roof evaluation and project plan use the same scope.',
  'naples': 'For a Naples tile or metal roof, share association material and appearance requirements before selecting a system. For a commercial or multifamily property, identify roof access, equipment and the person authorized to approve the scope.',
  'punta-gorda': 'For a Punta Gorda roof, distinguish the property location from its mailing address when identifying the permit authority. Share the roof material, any earlier repair records and the locations of recurring leaks so the inspection can focus on the whole assembly.',
  'port-charlotte': 'For a Port Charlotte property, note whether the project concerns a home, a manufactured home or a commercial building. Include any attached roof sections and past storm-repair records; those details help define the evaluation and proposed work.',
  'sarasota': 'For a Sarasota condominium or occupied business, agree on roof access, resident or tenant notices and any protected entrances before scheduling. Share existing maintenance records and clarify who approves a repair versus a capital replacement project.',
  'arcadia': 'For an Arcadia property, identify the building use and any separate agricultural or accessory roofs. Provide the exact property address and access details so the inspection and proposal cover the structures you need evaluated.',
}

export default function LocalRoofPlanning({ city }: { city: CitySlug }) {
  const info = CITY_MAP[city]
  const resources = city === 'southwest-florida' ? Object.entries(countyResources) : Object.entries(countyResources).filter(([county]) => county === info.county)
  return <section className="bg-[var(--gray-50)] py-16 border-y border-[var(--gray-200)]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2">
      <div><h2 className="text-3xl font-bold uppercase mb-5 font-[family-name:var(--font-display)]">Planning roofing work in {info.name}</h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-6">{cityPlanning[city]}</p>
        <p className="text-[var(--gray-600)] leading-relaxed mb-6">Bring photos taken safely from the ground or inside, the approximate age of the roof, the timing of leaks and any warranty or prior repair documents. The site evaluation determines the next step.</p>
        <div className="flex flex-wrap gap-4"><Link href="/roofing-services/roof-repair" className="font-bold text-[var(--red)] underline underline-offset-4">Repair guidance</Link><Link href="/roofing-services/roof-replacement" className="font-bold text-[var(--red)] underline underline-offset-4">Replacement planning</Link><Link href="/commercial-hoa-roof-maintenance" className="font-bold text-[var(--red)] underline underline-offset-4">Commercial &amp; HOA maintenance</Link></div>
      </div>
      <div className="space-y-6">{resources.map(([county, resource]) => <div key={county}><h3 className="text-xl font-bold mb-3">{county} owner resources</h3><p className="text-[var(--gray-600)] leading-relaxed mb-3">{resource.text}</p><a href={resource.href} className="text-[var(--red)] underline underline-offset-4">{resource.title}</a></div>)}
        <p className="text-sm text-[var(--gray-600)]">The city or county building department determines requirements for the exact address and scope. Review current guidance with the project team.</p>
      </div>
    </div>
  </section>
}
