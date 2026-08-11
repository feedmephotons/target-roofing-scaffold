/**
 * Single source of truth for the programmatic location × service landing pages.
 *
 * Imported by:
 *   - src/app/locations/[city]/[service]/page.tsx  (generateStaticParams / content)
 *   - src/app/locations/page.tsx                   (locations hub)
 *   - src/app/locations/[city]/page.tsx            (per-city hub)
 *   - src/app/sitemap.ts                           (must match the pages that build)
 *   - src/components/Header.tsx                    (nav city list)
 *
 * NEVER hardcode a divergent city/service list anywhere else — the sitemap must
 * only ever advertise URLs that actually build (dynamicParams = false on the
 * location route means any un-generated combo is a hard 404).
 */

export const CITIES = [
  'southwest-florida',
  'fort-myers',
  'cape-coral',
  'bonita-springs',
  'sanibel',
  'naples',
  'punta-gorda',
  'port-charlotte',
  'sarasota',
  'arcadia',
] as const

export const SERVICES = ['roof-repair', 'roof-replacement', 'commercial-roofing'] as const

export type CitySlug = (typeof CITIES)[number]
export type ServiceSlug = (typeof SERVICES)[number]

export interface CityInfo {
  name: string
  county: string
  /** Local building-code / permitting language used in on-page copy. */
  reg: string
  zipRange: string
}

export const CITY_MAP: Record<CitySlug, CityInfo> = {
  'southwest-florida': {
    name: 'Southwest Florida',
    county: 'Lee, Collier, Charlotte, Sarasota, and DeSoto counties',
    reg: 'Florida Building Code (FBC) regulations and High Velocity Hurricane Zone (HVHZ) requirements',
    zipRange: '33901 - 34293',
  },
  'fort-myers': {
    name: 'Fort Myers',
    county: 'Lee County',
    reg: 'City of Fort Myers and Lee County building department standards, ensuring compliance with local permitting rules',
    zipRange: '33901, 33905, 33907, 33908, 33912, 33913, 33916, 33919, 33966',
  },
  'cape-coral': {
    name: 'Cape Coral',
    county: 'Lee County',
    reg: 'City of Cape Coral structural engineering codes, wind-load guidelines, and local permit regulations',
    zipRange: '33904, 33909, 33914, 33990, 33991, 33993',
  },
  'bonita-springs': {
    name: 'Bonita Springs',
    county: 'Lee County',
    reg: 'City of Bonita Springs building division rules, focusing on wind mitigation and structural elevation guidelines',
    zipRange: '34134, 34135',
  },
  'sanibel': {
    name: 'Sanibel',
    county: 'Lee County',
    reg: 'Sanibel Island coastal construction code and environmental protection guidelines, built for wind resistance in coastal zones',
    zipRange: '33957',
  },
  'naples': {
    name: 'Naples',
    county: 'Collier County',
    reg: 'City of Naples and Collier County high wind load specifications, meeting strict structural wind resistance requirements',
    zipRange: '34102, 34103, 34104, 34105, 34108, 34109, 34110, 34112, 34119',
  },
  'punta-gorda': {
    name: 'Punta Gorda',
    county: 'Charlotte County',
    reg: 'City of Punta Gorda structural codes and wind-mitigation guidelines for coastal Charlotte Harbor projects',
    zipRange: '33950, 33982',
  },
  'port-charlotte': {
    name: 'Port Charlotte',
    county: 'Charlotte County',
    reg: 'Charlotte County building department codes and local structural requirements for high wind speeds',
    zipRange: '33948, 33952, 33953, 33954, 33980, 33981',
  },
  'sarasota': {
    name: 'Sarasota',
    county: 'Sarasota County',
    reg: 'City of Sarasota and Sarasota County building standards, enforcing high wind load design protocols',
    zipRange: '34231, 34232, 34233, 34234, 34236, 34237, 34238, 34239, 34240, 34241',
  },
  'arcadia': {
    name: 'Arcadia',
    county: 'DeSoto County',
    reg: 'DeSoto County building codes and inland wind load guidelines for agricultural and residential properties',
    zipRange: '34266, 34269',
  },
}

export interface ServiceInfo {
  title: string
  /** Maps to the InlineLeadForm service <option> value. */
  defaultService: string
}

export const SERVICE_MAP: Record<ServiceSlug, ServiceInfo> = {
  'roof-repair': { title: 'Roof Repair', defaultService: 'repairs' },
  'roof-replacement': { title: 'Roof Replacement', defaultService: 'reroofing' },
  'commercial-roofing': { title: 'Commercial Roofing', defaultService: 'new-roofs' },
}

/** Cities grouped by county, for the /locations hub. Excludes the regional roll-up. */
export const CITIES_BY_COUNTY: { county: string; cities: CitySlug[] }[] = [
  { county: 'Lee County', cities: ['fort-myers', 'cape-coral', 'bonita-springs', 'sanibel'] },
  { county: 'Collier County', cities: ['naples'] },
  { county: 'Charlotte County', cities: ['punta-gorda', 'port-charlotte'] },
  { county: 'Sarasota County', cities: ['sarasota'] },
  { county: 'DeSoto County', cities: ['arcadia'] },
]

export function isCity(slug: string): slug is CitySlug {
  return (CITIES as readonly string[]).includes(slug)
}

export function isService(slug: string): slug is ServiceSlug {
  return (SERVICES as readonly string[]).includes(slug)
}
