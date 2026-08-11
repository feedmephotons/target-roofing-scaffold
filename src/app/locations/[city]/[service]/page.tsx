import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Star,
  Quote,
  CheckCircle,
  Wrench,
  RotateCcw,
  Building2,
  ShieldCheck,
  Clock,
  HardHat,
  Phone,
  ArrowRight,
  MapPin,
} from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getReviews } from '@/app/actions'
import projectsData from '@/data/projects.json'
import RoofSchematic from '@/components/RoofSchematic'
import {
  CITIES,
  SERVICES,
  CITY_MAP,
  SERVICE_MAP,
  type CitySlug,
  type ServiceSlug,
  isCity,
  isService,
} from '@/lib/locations'

export const dynamicParams = false

const PHONE_DISPLAY = '239-332-5707'
const PHONE_HREF = 'tel:+12393325707'

/**
 * Curated geographic adjacency for the "nearby cities" internal-link block.
 * Keeps the interlinking locally sensible instead of alphabetical.
 */
const NEARBY: Record<CitySlug, CitySlug[]> = {
  'southwest-florida': ['fort-myers', 'cape-coral', 'naples', 'punta-gorda', 'sarasota'],
  'fort-myers': ['cape-coral', 'bonita-springs', 'sanibel', 'naples', 'punta-gorda'],
  'cape-coral': ['fort-myers', 'bonita-springs', 'sanibel', 'punta-gorda', 'port-charlotte'],
  'bonita-springs': ['naples', 'fort-myers', 'cape-coral', 'sanibel'],
  'sanibel': ['fort-myers', 'cape-coral', 'bonita-springs', 'naples'],
  'naples': ['bonita-springs', 'fort-myers', 'cape-coral', 'sanibel'],
  'punta-gorda': ['port-charlotte', 'arcadia', 'sarasota', 'fort-myers', 'cape-coral'],
  'port-charlotte': ['punta-gorda', 'arcadia', 'sarasota', 'cape-coral', 'fort-myers'],
  'sarasota': ['port-charlotte', 'punta-gorda', 'arcadia', 'fort-myers', 'cape-coral'],
  'arcadia': ['port-charlotte', 'punta-gorda', 'sarasota', 'fort-myers'],
}

interface CityContent {
  description: string
  highlights: string[]
  /** Repair-specific, locally concrete detail: named storms, neighborhoods, failure modes. */
  repairDetail: string
}

const CITY_CONTENT: Record<CitySlug, CityContent> = {
  'southwest-florida': {
    description:
      'Southwest Florida stretches from Sarasota to Naples, encompassing some of the most hurricane-vulnerable coastline in the United States. With a subtropical climate that delivers intense UV radiation, heavy seasonal rains, and the ever-present threat of tropical storms, roofing systems across the region must be built to withstand extreme conditions year-round.',
    highlights: [
      'Multi-county service area covering Lee, Collier, Charlotte, Sarasota, and DeSoto counties',
      'Region heavily impacted by Hurricane Ian (2022) and Hurricane Charley (2004)',
      'Subtropical climate with extreme UV, humidity, and wind exposure',
    ],
    repairDetail:
      'From the barrier islands to the inland ag belt, our crews trace leaks on every roof type in the region: concrete and clay tile, asphalt shingle, standing-seam metal, and low-slope commercial membrane. After Hurricane Ian in 2022, and Hurricane Charley before it in 2004, we have repaired everything from wind-lifted tile and torn underlayment to failed pipe-boot flashing and ponding water on flat commercial roofs.',
  },
  'fort-myers': {
    description:
      'As the county seat of Lee County, Fort Myers faces unique roofing challenges from hurricane exposure, heavy summer rains, and salt air. From downtown commercial buildings to Cape Coral-adjacent neighborhoods, Target Roofing has been the trusted local contractor for decades.',
    highlights: [
      'Hurricane-prone coastal area',
      'Mix of residential and commercial properties',
      'Historic downtown district with preservation needs',
    ],
    repairDetail:
      'Fort Myers took a direct hit from Hurricane Ian in 2022, and we have been repairing its aftermath ever since. The most common calls we get here are wind-lifted shingles in San Carlos Park, cracked barrel tile along McGregor Boulevard, failed pipe-boot and valley flashing, and ponding water on the flat commercial roofs of the downtown River District. Our technicians trace each leak to its true source across ZIP codes 33901 to 33966 before a single repair begins.',
  },
  'cape-coral': {
    description:
      'Cape Coral, known as the Waterfront Wonderland with over 400 miles of canals, presents unique roofing considerations. The salt water environment accelerates roof wear, making regular maintenance and quality materials essential for long-lasting protection.',
    highlights: [
      'Canal city with high salt exposure',
      'Rapidly growing residential community',
      'Newer construction with modern building codes',
    ],
    repairDetail:
      'With more than 400 miles of saltwater canals, Cape Coral roofs corrode from the fasteners up. The leaks we chase most here are rusted-through nail heads, dried and cracked sealant at penetrations, salt-driven corrosion on metal roofs, and slipped tile after summer squall lines. Hurricane Ian punished exposed roofs across the SW and SE Cape in 2022. We work every corner of the city, from Pelican to Palmetto-Pine, across ZIP codes 33904 through 33993.',
  },
  'bonita-springs': {
    description:
      'Bonita Springs sits between Fort Myers and Naples, combining coastal living with inland communities. Flood-prone areas and proximity to the Gulf make waterproof, wind-rated roofing systems essential for property protection.',
    highlights: [
      'Coastal and flood-prone areas',
      'Mix of condos and single-family homes',
      'Active retirement community',
    ],
    repairDetail:
      'Wedged between Fort Myers and Naples, Bonita Springs mixes low-slope condo roofs with tile-roofed single-family homes. The repairs we see most are ponding water and split seams on flat condo roofs near the Imperial River, wind-lifted tile in Pelican Landing and Spanish Wells, and flashing failures exposed by Hurricane Ian storm surge in 2022. Our crews cover the 34134 and 34135 ZIP codes from Bonita Beach inland.',
  },
  'sanibel': {
    description:
      'Sanibel Island was devastated by Hurricane Ian in September 2022, with the storm destroying the causeway and damaging the vast majority of structures on the island. The ongoing rebuilding effort demands roofing contractors who understand coastal construction codes, wind-rated systems, and the unique environmental protections that govern barrier island development.',
    highlights: [
      'Barrier island with maximum hurricane exposure',
      'Ongoing Hurricane Ian rebuilding efforts',
      'Strict environmental and coastal construction codes',
    ],
    repairDetail:
      'Hurricane Ian tore across Sanibel in September 2022 and severed the causeway, leaving nearly every roof on the island compromised. As the barrier community rebuilds, the repairs we handle here center on salt-driven corrosion, wind-uplift damage on fully exposed roofs, and failed underlayment beneath tile and metal. Every fix in ZIP 33957 is built to the island coastal construction code for maximum wind resistance.',
  },
  'naples': {
    description:
      "Naples and its surrounding communities feature some of Southwest Florida's most prestigious properties. From luxury estates in Port Royal to commercial centers along US-41, property owners demand the highest quality roofing craftsmanship and materials.",
    highlights: [
      'High-end residential properties',
      'Premium materials and finishes expected',
      'Strict HOA and community standards',
    ],
    repairDetail:
      'Naples estates run to intricate tile and metal roofs where a single cracked barrel tile or failed valley can stain a coffered ceiling below. Our repair calls in Port Royal, Old Naples, Aqualane Shores, and Pelican Bay most often involve cracked and slipped tile, leaking skylight and chimney flashing, and hairline valley leaks. Hurricane Ian tested the whole coastline in 2022. We match materials and finishes exactly across ZIP codes 34102 through 34119.',
  },
  'punta-gorda': {
    description:
      'Punta Gorda was devastated by Hurricane Charley in 2004 and hit hard again by Hurricane Ian in 2022. The community understands the critical importance of hurricane-rated roofing. Target Roofing has been a trusted partner in the ongoing rebuilding and strengthening of this resilient city.',
    highlights: [
      'Hurricane Charley and Ian recovery',
      'Strong community resilience',
      'High demand for hurricane-rated roofing',
    ],
    repairDetail:
      'Few places know roof damage like Punta Gorda: Hurricane Charley leveled it in 2004, and Hurricane Ian struck again in 2022. Along the Charlotte Harbor waterfront and through Punta Gorda Isles and Burnt Store, the failures we repair most are wind-lifted metal panels, cracked tile, and flashing driven loose by wind and salt. Our crews trace and stop leaks across ZIP codes 33950 and 33982.',
  },
  'port-charlotte': {
    description:
      'Port Charlotte is the largest unincorporated community in Charlotte County, home to a diverse mix of residential neighborhoods and growing commercial areas. Direct hits from Hurricane Charley and Hurricane Ian demonstrated the critical need for properly engineered roofing systems built to withstand extreme wind events.',
    highlights: [
      'Largest community in Charlotte County',
      'Direct hurricane impact history',
      'Growing commercial and residential development',
    ],
    repairDetail:
      'Port Charlotte took direct hits from both Hurricane Charley in 2004 and Hurricane Ian in 2022. Across Deep Creek, Murdock, and El Jobean, the leaks we chase most are blown-off shingle courses, water intrusion at soffit and fascia, and ponding on aging low-slope roofs. Our technicians pinpoint the entry point before repairing, working every ZIP from 33948 to 33981.',
  },
  'sarasota': {
    description:
      "Sarasota's blend of historic architecture and modern development creates diverse roofing needs. From the cultural district's commercial properties to barrier island residences on Siesta Key and Longboat Key, each project requires specialized expertise.",
    highlights: [
      'Historic and modern architecture mix',
      'Barrier island coastal exposure',
      'Active arts and commercial district',
    ],
    repairDetail:
      'Sarasota spans historic downtown blocks and barrier-island homes on Siesta Key and Longboat Key. The repairs we handle most here are slipped and cracked tile on island properties, split membrane seams on flat downtown commercial roofs, and skylight leaks in Gulf Gate. Our crews trace each leak precisely across ZIP codes 34231 through 34241.',
  },
  'arcadia': {
    description:
      'Arcadia, the seat of DeSoto County, is an inland community with a distinctive mix of historic Florida architecture, agricultural properties, and rural residential homes. While further from the coast, Arcadia still faces significant wind damage from hurricanes and tropical storms that maintain strength as they move inland.',
    highlights: [
      'Inland community with rural and agricultural properties',
      'Historic Florida architecture',
      'Significant inland wind exposure from tropical storms',
    ],
    repairDetail:
      'Arcadia sits inland in DeSoto County, but storms like Hurricane Charley in 2004 and Hurricane Ian in 2022 still arrived with damaging wind. On the metal roofs common to its barns, homes, and historic downtown, our most frequent repairs are backed-out panel fasteners, leaking ridge caps, and wind-torn edges. We serve ZIP codes 34266 and 34269 with same-week dispatch across the rural county.',
  },
}

interface ServiceCopy {
  /** Service-first, keyword-bearing opening line for the hero. */
  heroLead: string
  /** Distinct section H2 for the localized-details block. */
  h2: string
  /** Distinct body paragraph. */
  body: string
}

function getServiceCopy(service: ServiceSlug, cityName: string, county: string, reg: string, repairDetail: string): ServiceCopy {
  if (service === 'roof-repair') {
    return {
      heroLead: `Fast, professional roof repair in ${cityName}, FL — leak tracing, storm-damage response, and 24/7 emergency dispatch.`,
      h2: `Roof Leak & Storm Damage Repair in ${cityName}`,
      body: `${repairDetail} We do not caulk over a problem and hope it holds. Our repair crews find the true source of the leak, stop the water, and protect the decking and structure underneath so a small fix does not become a full re-roof. For active leaks we run 24/7 emergency dispatch with same-week service across most of ${county}, and every repair meets or exceeds ${reg} for wind resistance.`,
    }
  }
  if (service === 'roof-replacement') {
    return {
      heroLead: `Full roof replacement in ${cityName}, FL — tear-off, dry-in, and hurricane-rated re-roofs built to outlast the next storm season.`,
      h2: `When It Is Time to Replace Your Roof in ${cityName}`,
      body: `When leaks are widespread, the underlayment has failed, or a roof is simply at the end of its service life, a targeted repair only buys a little time. A full roof replacement in ${cityName}, FL starts with a complete tear-off down to the decking, so we can replace any rotted sheathing, install a secondary water barrier, and re-fasten to current uplift standards. Every re-roof is fully permitted and built to meet or exceed ${reg}, using architectural shingle, tile, or standing-seam metal rated for Southwest Florida wind and sun, and backed by GAF Master Elite manufacturer warranties.`,
    }
  }
  return {
    heroLead: `Commercial roofing in ${cityName}, FL — TPO, PVC, and built-up systems for flat and low-slope buildings, installed with minimal disruption.`,
    h2: `Commercial & Flat-Roof Systems in ${cityName}`,
    body: `Flat and low-slope commercial roofs across ${cityName} live and die by their seams, flashings, and drainage. Ponding water, split laps, and failed edge metal are the leaks we chase most for property managers and boards here. Target Roofing installs and services TPO, PVC, and built-up (BUR) membranes, metal systems, and reflective coatings, plus scheduled maintenance plans that catch small problems before they reach the tenants below. We work directly with property managers, condo and HOA associations, and business owners across ${county}, phasing the work to keep your building operational and every installation compliant with ${reg}.`,
  }
}

interface Faq {
  q: string
  a: string
}

function getServiceFaqs(service: ServiceSlug, cityName: string, county: string, reg: string): Faq[] {
  if (service === 'roof-repair') {
    return [
      {
        q: `How much does roof repair cost in ${cityName}, FL?`,
        a: `Repair cost depends on the extent of the damage, your roof type (tile, shingle, metal, or flat membrane), how accessible the roof is, and whether the decking or underlayment is also affected. Minor leak repairs are often a few hundred dollars, while larger storm or structural repairs cost more. We give you a written, itemized estimate after a free survey, with no guesswork.`,
      },
      {
        q: `How fast can you respond to a roof leak in ${cityName}?`,
        a: `For active leaks we offer 24/7 emergency dispatch and same-week service across most of ${county}. Call ${PHONE_DISPLAY} and we will get a technician on your roof to stop the water fast, then follow up with a permanent repair.`,
      },
      {
        q: `Will my homeowner's insurance cover the roof repair?`,
        a: `Storm and wind damage is frequently covered by your homeowner's policy. We document the damage with photos, provide a detailed repair scope, and work directly with your adjuster so your claim reflects the true cost of a proper repair.`,
      },
      {
        q: `Should I repair or replace my roof?`,
        a: `If the damage is localized and your roof still has years of service life left, a targeted repair is the smart, cost-effective choice. If leaks are widespread, the underlayment has failed, or the roof is near the end of its life, replacement usually costs less over time. Our free survey tells you honestly which one you actually need.`,
      },
      {
        q: `Do your roof repairs come with a warranty?`,
        a: `Yes. Our workmanship is warrantied, and as a GAF Master Elite contractor, in the top 2% of U.S. roofers, we can back qualifying repairs and replacements with manufacturer warranties that most roofers cannot offer.`,
      },
      {
        q: `Can you repair tile, metal, and flat roofs in ${cityName}?`,
        a: `Yes. Our crews repair every common Southwest Florida roof system: concrete and clay tile, asphalt shingle, standing-seam and screw-down metal, and low-slope TPO, PVC, and built-up membranes.`,
      },
    ]
  }
  if (service === 'roof-replacement') {
    return [
      {
        q: `How long does a roof replacement take in ${cityName}, FL?`,
        a: `Most residential re-roofs are completed in a few days, weather permitting, while larger or tile roofs take longer. We give you a firm schedule up front and keep the job site clean every single day.`,
      },
      {
        q: `How much does a new roof cost in ${cityName}?`,
        a: `Cost depends on the roof's size and pitch, the material you choose (shingle, tile, or metal), and the condition of the decking underneath. After a free survey we provide a written, itemized estimate with clear material and warranty options.`,
      },
      {
        q: `Will my new roof meet Florida hurricane codes?`,
        a: `Yes. Every re-roof is fully permitted and built to meet or exceed ${reg}, including a secondary water barrier and wind-rated fastening for uplift resistance.`,
      },
      {
        q: `Can I get a new roof through an insurance claim?`,
        a: `If your roof was damaged by a covered storm, a full replacement may be covered. We document the damage thoroughly and work directly with your adjuster to support your claim.`,
      },
      {
        q: `What roofing materials do you install?`,
        a: `We install architectural asphalt shingles, concrete and clay tile, and standing-seam metal, plus flat-roof membranes, all rated for Southwest Florida's wind and sun.`,
      },
      {
        q: `Do you offer a warranty on new roofs?`,
        a: `Yes. As a GAF Master Elite contractor, in the top 2% of U.S. roofers, we offer manufacturer system warranties on qualifying roofs, backed by our own workmanship guarantee.`,
      },
    ]
  }
  return [
    {
      q: `What commercial roofing systems do you install in ${cityName}, FL?`,
      a: `We install and service TPO, PVC, and built-up (BUR) membranes, metal roof systems, and reflective roof coatings for flat and low-slope commercial buildings.`,
    },
    {
      q: `Can you re-roof our building without disrupting operations?`,
      a: `Yes. We schedule around your business hours, phase the work to keep areas of the building operational, and keep the site clean and secure from start to finish.`,
    },
    {
      q: `Do you offer commercial roof maintenance plans?`,
      a: `Yes. Scheduled inspections and preventative maintenance catch ponding water, seam failures, and flashing issues before they become costly leaks, and they extend the usable life of your roof.`,
    },
    {
      q: `How do you handle commercial roof leaks and emergencies?`,
      a: `Our 24/7 dispatch responds quickly to commercial leaks. We trace the source, make the building watertight, and provide a documented repair scope for your records. Call ${PHONE_DISPLAY} any time.`,
    },
    {
      q: `Do you work with property managers and condo associations?`,
      a: `Yes. We work directly with property managers, condo and HOA boards, and business owners across ${county}, delivering projects on time and on budget with clear documentation.`,
    },
    {
      q: `Are your commercial roofs code-compliant and warrantied?`,
      a: `All of our installations comply with ${reg} and are backed by both manufacturer and workmanship warranties.`,
    },
  ]
}

function getLocalizedContent(city: CitySlug, service: ServiceSlug) {
  const cityData = CITY_MAP[city]
  const serviceData = SERVICE_MAP[service]

  const cityName = cityData.name
  const serviceTitle = serviceData.title
  const county = cityData.county
  const regulations = cityData.reg
  const cityContent = CITY_CONTENT[city]

  const copy = getServiceCopy(service, cityName, county, regulations, cityContent.repairDetail)

  return {
    heading: `${serviceTitle} in ${cityName}, FL`,
    heroLead: copy.heroLead,
    h2: copy.h2,
    description: copy.body,
    cityDescription: cityContent.description,
    highlights: cityContent.highlights,
    county,
    regulations,
    faqs: getServiceFaqs(service, cityName, county, regulations),
  }
}

export function generateStaticParams() {
  const paramsList: { city: CitySlug; service: ServiceSlug }[] = []
  for (const city of CITIES) {
    for (const service of SERVICES) {
      paramsList.push({ city, service })
    }
  }
  return paramsList
}

interface PageProps {
  params: Promise<{
    city: string
    service: string
  }>
}

function metaDescriptionFor(service: ServiceSlug, cityTitle: string): string {
  if (service === 'roof-repair') {
    return `Roof repair in ${cityTitle}, FL. Fast leak tracing, storm-damage & 24/7 emergency dispatch from Target Roofing. Free surveys. Call ${PHONE_DISPLAY}.`
  }
  if (service === 'roof-replacement') {
    return `Roof replacement in ${cityTitle}, FL. Hurricane-rated re-roofs, full tear-off & free surveys from Target Roofing, GAF Master Elite. Call ${PHONE_DISPLAY}.`
  }
  return `Commercial roofing in ${cityTitle}, FL. TPO, PVC & flat-roof repair, re-roofs & maintenance from Target Roofing. Free surveys. Call ${PHONE_DISPLAY}.`
}

export async function generateMetadata({ params }: PageProps) {
  const { city, service } = await params
  if (!isCity(city) || !isService(service)) {
    return {}
  }

  const cityData = CITY_MAP[city]
  const serviceData = SERVICE_MAP[service]
  const cityTitle = cityData.name
  const serviceTitle = serviceData.title

  const canonical = `https://targetroofers.com/locations/${city}/${service}`
  const metaDescription = metaDescriptionFor(service, cityTitle)
  const ogTitle = `${serviceTitle} in ${cityTitle}, FL | Target Roofing`

  return {
    // Root layout appends "| Target Roofing" to the page title template.
    title: `${serviceTitle} in ${cityTitle}, FL`,
    description: metaDescription,
    alternates: {
      canonical,
    },
    keywords: [
      `${serviceTitle.toLowerCase()} ${cityTitle}`,
      `${serviceTitle.toLowerCase()} in ${cityTitle} FL`,
      `${cityTitle} roofing`,
      `roofing contractor ${cityTitle}`,
      `Target Roofing`,
      `${cityData.county} roofing`,
    ],
    openGraph: {
      title: ogTitle,
      description: metaDescription,
      url: canonical,
      siteName: 'Target Roofing',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://targetroofers.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${serviceTitle} in ${cityTitle}, FL by Target Roofing`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: metaDescription,
      images: ['https://targetroofers.com/og-image.jpg'],
    },
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { city, service } = await params

  if (!isCity(city) || !isService(service)) {
    notFound()
  }

  const citySlug = city as CitySlug
  const serviceSlug = service as ServiceSlug

  const cityData = CITY_MAP[citySlug]
  const serviceData = SERVICE_MAP[serviceSlug]
  const content = getLocalizedContent(citySlug, serviceSlug)

  const reviewsData = await getReviews()

  // Filter reviews dynamically by city name
  const localReviews = reviewsData.filter((r) => {
    const text = r.text.toLowerCase()
    if (city === 'southwest-florida') {
      return text.includes('southwest florida') || text.includes('swfl')
    }
    if (city === 'fort-myers') {
      return text.includes('fort myers') || text.includes('ft. myers') || text.includes('ft myers')
    }
    const cleanCity = city.replace(/-/g, ' ')
    return text.includes(cleanCity)
  })

  // Fallback to high-quality reviews if fewer than 3 reviews are found
  const displayReviews = localReviews.length >= 3 ? localReviews : reviewsData.slice(0, 3)

  // Filter projects dynamically by city name
  const localProjects = projectsData.filter((p) => {
    const name = p.name.toLowerCase()
    if (city === 'fort-myers') {
      return name.includes('fort myers') || name.includes('ft. myers') || name.includes('ft myers')
    }
    const cleanCity = city.replace(/-/g, ' ')
    return name.includes(cleanCity)
  })

  // Fallback to a service-appropriate list of projects if fewer than 4 local ones are found.
  let displayProjects = localProjects
  let isFallbackProjects = false
  if (localProjects.length < 4) {
    isFallbackProjects = true
    let serviceCategories: string[] = []
    if (service === 'commercial-roofing') {
      serviceCategories = ['Office', 'Retail', 'Warehouses', 'Government', 'Healthcare', 'High Rises', 'Hospitality', 'Schools', 'Theaters']
    } else if (service === 'roof-replacement') {
      serviceCategories = ['Condos/HOA', 'Country Clubs', 'RV Parks', 'Churches']
    } else {
      // Roof repair leans residential / community rather than commercial.
      serviceCategories = ['Condos/HOA', 'Country Clubs', 'RV Parks', 'Churches', 'Schools']
    }

    const categoryMatchedProjects = projectsData.filter((project) =>
      project.categories.some((cat) => serviceCategories.includes(cat))
    )
    displayProjects = categoryMatchedProjects.slice(0, 4)
  }

  let ServiceIcon = Wrench
  if (service === 'roof-replacement') {
    ServiceIcon = RotateCcw
  } else if (service === 'commercial-roofing') {
    ServiceIcon = Building2
  }

  const isRepair = service === 'roof-repair'

  // Sibling services within the SAME city (repair <-> replacement <-> commercial).
  const siblingServices = SERVICES.filter((s) => s !== service)
  // Nearby cities for the SAME service.
  const nearbyCities = NEARBY[citySlug]
  // Cross-sell target: repair pages push replacement; everything else pushes repair
  // (keeps the href aligned with the label rendered below).
  const crossSellService: ServiceSlug = isRepair ? 'roof-replacement' : 'roof-repair'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Target Roofing',
    description: `Professional ${serviceData.title.toLowerCase()} in ${cityData.name}, FL from Target Roofing, serving ${cityData.county}.`,
    url: `https://targetroofers.com/locations/${city}/${service}`,
    telephone: '+1-239-332-5707',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7011 Nalle Grade Rd',
      addressLocality: 'North Fort Myers',
      addressRegion: 'FL',
      postalCode: '33917',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: cityData.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: cityData.county,
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceData.title,
      itemListElement: [{
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${serviceData.title} in ${cityData.name}, FL`,
        },
      }],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '34',
    },
    priceRange: '$$',
    image: 'https://targetroofers.com/og-image.jpg',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden noise-overlay py-20 md:py-28">
        <RoofSchematic className="text-white/[0.04] z-0" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border-r-2 border-white/20 transform rotate-12 translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-l-2 border-white/20 transform -rotate-12 -translate-x-1/2 translate-y-1/4" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Locations', href: '/locations' },
              { name: cityData.name, href: `/locations/${city}` },
              { name: serviceData.title },
            ]}
            className="mb-8 [&_*]:text-white/75 [&_a:hover]:text-[var(--red)]"
          />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--red)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--red)] font-[family-name:var(--font-display)]">
                Target Roofing Locations
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-[family-name:var(--font-display)] uppercase">
              {serviceData.title} in <br />
              <span className="text-[var(--red)]">{cityData.name}, FL</span>
            </h1>

            <p className="text-lg md:text-xl text-white font-semibold leading-relaxed max-w-2xl mb-4">
              {content.heroLead}
            </p>

            <p className="text-base md:text-lg text-[var(--gray-300)] leading-relaxed max-w-2xl">
              {content.cityDescription}
            </p>

            {isRepair && (
              <p className="mt-6 text-lg font-bold text-white bg-[var(--red)]/90 inline-block px-4 py-2 rounded">
                Roof leaking? Call {PHONE_DISPLAY} — 24/7 emergency repair in {cityData.name}.
              </p>
            )}

            {/* Above-the-fold click-to-call + survey CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--red)] text-white text-base font-bold uppercase tracking-wider rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg font-[family-name:var(--font-display)]"
              >
                <Phone className="h-5 w-5" />
                Call {PHONE_DISPLAY}
              </a>
              <a
                href="#free-survey"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/25 text-white text-base font-bold uppercase tracking-wider rounded hover:bg-white/20 transition-colors font-[family-name:var(--font-display)]"
              >
                Get a Free Survey
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Details Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 bg-[var(--red)]/10 rounded animate-fade-in-up">
                <ServiceIcon className="h-5 w-5 text-[var(--red)]" />
                <span className="text-sm font-semibold text-[var(--red)] uppercase tracking-wider font-[family-name:var(--font-display)]">
                  {serviceData.title}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--black)] leading-tight uppercase font-[family-name:var(--font-display)]">
                {content.h2}
              </h2>
              <div className="red-accent-left">
                <p className="text-lg text-[var(--gray-700)] leading-relaxed">
                  {content.description}
                </p>
              </div>
              <div className="pt-4 grid sm:grid-cols-2 gap-6">
                <div className="p-5 bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg">
                  <h4 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-2">
                    Service Area Coverage
                  </h4>
                  <p className="text-sm text-[var(--gray-600)]">
                    Serving {cityData.county} including ZIP codes: <br />
                    <span className="font-semibold">{cityData.zipRange}</span>.
                  </p>
                </div>
                <div className="p-5 bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg">
                  <h4 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-2">
                    Hurricane-Ready Standard
                  </h4>
                  <p className="text-sm text-[var(--gray-600)]">
                    All work complies with {cityData.reg}.
                  </p>
                </div>
              </div>
              {content.highlights.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-3">
                    Why {cityData.name} Properties Need Expert Roofing
                  </h4>
                  <ul className="space-y-2">
                    {content.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                        <span className="text-sm text-[var(--gray-700)]">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: SWFL Standards Card */}
            <div className="lg:col-span-5 relative overflow-hidden bg-white border border-[var(--gray-200)] shadow-lg rounded-lg p-8 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--red)]/5 rounded-full opacity-50 blur-2xl pointer-events-none" />
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider font-[family-name:var(--font-display)] text-[var(--black)] mb-6 border-b border-[var(--gray-100)] pb-3">
                  Local Trust &amp; Quality
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "Florida Building Code", desc: "All projects strictly adhere to local county regulations and FBC compliance." },
                    { title: "High-Velocity Hurricane Zone", desc: "Materials and fastenings rated for wind resistance up to 160+ MPH." },
                    { title: "Licensed & State Certified", desc: "Registered under license CCC1334168. Fully bonded and insured." },
                    { title: "GAF Master Elite", desc: "Top 2% of U.S. roofers, eligible to offer premium manufacturer warranties." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-[var(--black)]">{item.title}</h4>
                        <p className="text-xs text-[var(--gray-500)] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--gray-100)] text-center text-xs text-[var(--gray-400)] font-semibold uppercase tracking-wider">
                Target Roofing Trust Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency / Click-to-Call Band */}
      <section className="bg-[var(--red)] text-white noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase font-[family-name:var(--font-display)] leading-tight">
                {isRepair
                  ? `Roof leaking in ${cityData.name}? We answer 24/7.`
                  : `Talk to a ${cityData.name} roofing expert today.`}
              </h2>
              <p className="mt-2 text-white/90 max-w-xl">
                {isRepair
                  ? `Same-week dispatch for active leaks and storm damage across ${cityData.county}. No subcontractors, no runaround.`
                  : `Free surveys, honest recommendations, and hurricane-rated work across ${cityData.county}.`}
              </p>
            </div>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--red)] text-base font-bold uppercase tracking-wider rounded hover:bg-[var(--gray-100)] transition-colors shadow-lg font-[family-name:var(--font-display)] whitespace-nowrap"
            >
              <Phone className="h-5 w-5" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Crew Action Section */}
      <section className="bg-[var(--gray-50)] py-16 md:py-24 border-y border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Strengths Grid */}
            <div className="lg:col-span-5 order-2 lg:order-1 grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "100% Insured", desc: "Full liability & worker's comp coverage." },
                { icon: HardHat, title: "Certified Crew", desc: "Highly-trained professional employees." },
                { icon: Clock, title: "24/7 Dispatch", desc: "Emergency service whenever you need it." },
                { icon: Wrench, title: "Expert Tools", desc: "State-of-the-art diagnostic equipment." }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white p-5 rounded-lg border border-[var(--gray-200)] hover:border-[var(--red)] transition-colors shadow-sm flex flex-col justify-between">
                    <Icon className="h-8 w-8 text-[var(--red)] mb-4" />
                    <div>
                      <h4 className="font-bold text-sm text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide">{item.title}</h4>
                      <p className="text-[11px] text-[var(--gray-500)] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-[var(--black)] uppercase font-[family-name:var(--font-display)]">
                Our Technicians Make the Difference
              </h2>
              <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                At Target Roofing, we do not rely on subcontractors. Every member of our team is a highly trained, dedicated Target Roofing employee. Spot our technicians on your roof wearing their signature red Target Roofing polos, a symbol of our commitment to safety, professionalism, and quality craftsmanship.
              </p>
              <ul className="space-y-3">
                {[
                  'Fully licensed, bonded, and insured team',
                  'Extensively trained on wind-resistance and UV-protection standards',
                  'Equipped with state-of-the-art diagnostic and repair equipment',
                  'Dedicated to keeping your job site clean, with clean-up completed daily'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[var(--red)] flex-shrink-0" />
                    <span className="text-[var(--gray-700)] font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Projects Portfolio Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--black)] uppercase font-[family-name:var(--font-display)]">
              {isFallbackProjects ? `Featured Portfolio Projects` : `Portfolio Projects in ${cityData.name}`}
            </h2>
            <div className="mt-2 h-1 w-16 bg-[var(--red)] mx-auto" />
            <p className="mt-4 text-[var(--gray-500)] max-w-xl mx-auto">
              {isFallbackProjects
                ? `Take a look at some of our premium projects completed within this service category across Southwest Florida.`
                : `We have completed several successful projects right here in ${cityData.name}, FL.`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProjects.map((project) => (
              <div
                key={project.name}
                className="bg-[var(--gray-50)] rounded-lg shadow-sm border border-[var(--gray-200)] p-6 hover:shadow-lg transition-all hover:border-[var(--red)] relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--red)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-white text-[var(--gray-500)] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--gray-200)]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h4 className="text-base font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide">
                  {project.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials Section */}
      <section className="bg-[var(--gray-50)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--black)] uppercase font-[family-name:var(--font-display)]">
              Customer Testimonials
            </h2>
            <div className="mt-2 h-1 w-16 bg-[var(--red)] mx-auto" />
            <p className="mt-4 text-[var(--gray-500)] max-w-xl mx-auto">
              Rated 5.0 across 34 verified reviews. Hear what clients say about our professionalism, quality of work, and quick response times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayReviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-6 relative group hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 opacity-[0.06]">
                  <Quote className="h-12 w-12 text-[var(--red)] fill-[var(--red)]" />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-[var(--gray-700)] text-sm leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--gray-100)] pt-4 mt-auto">
                  <div>
                    <p className="font-bold text-xs text-[var(--black)]">{review.name}</p>
                    <span className="text-[10px] text-[var(--gray-400)]">{review.source}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-[var(--gray-100)] flex items-center justify-center text-[var(--red)] font-bold text-xs font-[family-name:var(--font-display)]">
                    {review.name.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24 border-t border-[var(--gray-200)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--black)] uppercase font-[family-name:var(--font-display)]">
              {serviceData.title} in {cityData.name}: FAQs
            </h2>
            <div className="mt-2 h-1 w-16 bg-[var(--red)] mx-auto" />
            <p className="mt-4 text-[var(--gray-500)] max-w-xl mx-auto">
              Straight answers to the questions we hear most from {cityData.name} property owners.
            </p>
          </div>

          <div className="space-y-4">
            {content.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg p-5 open:border-[var(--red)] transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="font-bold text-base text-[var(--black)] font-[family-name:var(--font-display)]">
                    {faq.q}
                  </h3>
                  <span className="text-[var(--red)] text-2xl leading-none font-light transition-transform group-open:rotate-45 flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[var(--gray-700)] leading-relaxed text-[15px]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related / Internal Links Section */}
      <section className="bg-[var(--gray-50)] py-16 md:py-24 border-t border-[var(--gray-200)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[var(--black)] uppercase font-[family-name:var(--font-display)]">
              Explore More Roofing in {cityData.name}
            </h2>
            <div className="mt-2 h-1 w-16 bg-[var(--red)]" />
          </div>

          {/* Repair-first cross-sell / pillar callout */}
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            <Link
              href={`/locations/${city}/${crossSellService}`}
              className="group flex items-center justify-between gap-4 bg-white border border-[var(--gray-200)] rounded-lg p-6 hover:border-[var(--red)] transition-colors shadow-sm"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--red)] font-[family-name:var(--font-display)]">
                  {isRepair ? 'Beyond Repair?' : 'Just Need a Fix?'}
                </span>
                <p className="mt-1 font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
                  {isRepair
                    ? `Roof beyond repair? See roof replacement in ${cityData.name}.`
                    : `See roof repair in ${cityData.name}.`}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--red)] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/roofing-services/emergency-storm-repair"
              className="group flex items-center justify-between gap-4 bg-white border border-[var(--gray-200)] rounded-lg p-6 hover:border-[var(--red)] transition-colors shadow-sm"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--red)] font-[family-name:var(--font-display)]">
                  Storm Damage?
                </span>
                <p className="mt-1 font-bold text-[var(--black)] font-[family-name:var(--font-display)]">
                  24/7 Emergency &amp; Storm Repair
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[var(--red)] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Sibling services in this city */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gray-500)] font-[family-name:var(--font-display)] mb-4">
                Other Services in {cityData.name}
              </h3>
              <ul className="space-y-2">
                {siblingServices.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/locations/${city}/${s}`}
                      className="inline-flex items-center gap-2 text-[var(--gray-700)] hover:text-[var(--red)] font-semibold transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                      {SERVICE_MAP[s].title} in {cityData.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/roofing-services/roof-repair"
                    className="inline-flex items-center gap-2 text-[var(--gray-700)] hover:text-[var(--red)] font-semibold transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                    All Roof Repair Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nearby cities, same service */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gray-500)] font-[family-name:var(--font-display)] mb-4">
                {serviceData.title} Nearby
              </h3>
              <ul className="space-y-2">
                {nearbyCities.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/locations/${c}/${service}`}
                      className="inline-flex items-center gap-2 text-[var(--gray-700)] hover:text-[var(--red)] font-semibold transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                      {serviceData.title} in {CITY_MAP[c].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Talk to us */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gray-500)] font-[family-name:var(--font-display)] mb-4">
                Talk to Target Roofing
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center gap-2 text-[var(--gray-700)] hover:text-[var(--red)] font-semibold transition-colors"
                  >
                    <Phone className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                    Call {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[var(--gray-700)] hover:text-[var(--red)] font-semibold transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                    Contact us for a free survey
                  </Link>
                </li>
                <li>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-2 text-[var(--gray-700)] hover:text-[var(--red)] font-semibold transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-[var(--red)] flex-shrink-0" />
                    All Service Areas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Lead Capture Form */}
      <section id="free-survey" className="bg-[var(--red)] text-white noise-overlay py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InlineLeadForm
            defaultService={serviceData.defaultService}
            title={`Get a Free ${serviceData.title} Survey`}
            subtitle={`Fill out the form below to schedule a detailed roof survey for your property in ${cityData.name}, FL. Our technicians in red Target Roofing polos will inspect your roof and provide a comprehensive report. Prefer to talk? Call ${PHONE_DISPLAY}.`}
            buttonText={`Submit Estimate Request`}
            darkTheme={true}
          />
        </div>
      </section>
    </>
  )
}
