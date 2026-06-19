import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, Quote, CheckCircle, Wrench, RotateCcw, Building2, ShieldCheck, Users, Clock, HardHat } from 'lucide-react'
import InlineLeadForm from '@/components/InlineLeadForm'
import reviewsData from '@/data/reviews.json'
import projectsData from '@/data/projects.json'

export const dynamicParams = false

const CITIES = [
  'southwest-florida',
  'fort-myers',
  'cape-coral',
  'bonita-springs',
  'sanibel',
  'naples',
  'punta-gorda',
  'port-charlotte',
  'sarasota',
  'arcadia'
]

const SERVICES = [
  'roof-repair',
  'roof-replacement',
  'commercial-roofing'
]

const CITY_MAP: Record<string, { name: string; county: string; reg: string; zipRange: string }> = {
  'southwest-florida': {
    name: 'Southwest Florida',
    county: 'Lee, Collier, Charlotte, Sarasota, and DeSoto counties',
    reg: 'Florida Building Code (FBC) regulations and High Velocity Hurricane Zone (HVHZ) requirements',
    zipRange: '33901 - 34293'
  },
  'fort-myers': {
    name: 'Fort Myers',
    county: 'Lee County',
    reg: 'City of Fort Myers and Lee County building department standards, ensuring compliance with local permitting rules',
    zipRange: '33901, 33905, 33907, 33908, 33912, 33913, 33916, 33919, 33966'
  },
  'cape-coral': {
    name: 'Cape Coral',
    county: 'Lee County',
    reg: 'City of Cape Coral structural engineering codes, wind-load guidelines, and local permit regulations',
    zipRange: '33904, 33909, 33914, 33990, 33991, 33993'
  },
  'bonita-springs': {
    name: 'Bonita Springs',
    county: 'Lee County',
    reg: 'City of Bonita Springs building division rules, focusing on wind mitigation and structural elevation guidelines',
    zipRange: '34134, 34135'
  },
  'sanibel': {
    name: 'Sanibel',
    county: 'Lee County',
    reg: 'Sanibel Island coastal construction code and environmental protection guidelines, built for wind resistance in coastal zones',
    zipRange: '33957'
  },
  'naples': {
    name: 'Naples',
    county: 'Collier County',
    reg: 'City of Naples and Collier County high wind load specifications, meeting strict structural wind resistance requirements',
    zipRange: '34102, 34103, 34104, 34105, 34108, 34109, 34110, 34112, 34119'
  },
  'punta-gorda': {
    name: 'Punta Gorda',
    county: 'Charlotte County',
    reg: 'City of Punta Gorda structural codes and wind-mitigation guidelines for coastal Charlotte Harbor projects',
    zipRange: '33950, 33982'
  },
  'port-charlotte': {
    name: 'Port Charlotte',
    county: 'Charlotte County',
    reg: 'Charlotte County building department codes and local structural requirements for high wind speeds',
    zipRange: '33948, 33952, 33953, 33954, 33980, 33981'
  },
  'sarasota': {
    name: 'Sarasota',
    county: 'Sarasota County',
    reg: 'City of Sarasota and Sarasota County building standards, enforcing high wind load design protocols',
    zipRange: '34231, 34232, 34233, 34234, 34236, 34237, 34238, 34239, 34240, 34241'
  },
  'arcadia': {
    name: 'Arcadia',
    county: 'DeSoto County',
    reg: 'DeSoto County building codes and inland wind load guidelines for agricultural and residential properties',
    zipRange: '34266, 34269'
  }
}

const SERVICE_MAP: Record<string, { title: string; defaultService: string }> = {
  'roof-repair': {
    title: 'Roof Repair',
    defaultService: 'repairs'
  },
  'roof-replacement': {
    title: 'Roof Replacement',
    defaultService: 'reroofing'
  },
  'commercial-roofing': {
    title: 'Commercial Roofing',
    defaultService: 'new-roofs'
  }
}

function getLocalizedContent(city: string, service: string) {
  const cityData = CITY_MAP[city]
  const serviceData = SERVICE_MAP[service]
  if (!cityData || !serviceData) return null

  const cityName = cityData.name
  const serviceTitle = serviceData.title
  const county = cityData.county
  const regulations = cityData.reg

  let text = ''
  if (service === 'roof-repair') {
    text = `Roofs in ${cityName}, FL face continuous weathering from Southwest Florida's severe environmental conditions. High humidity, intense heat, and constant UV exposure degrade roof materials over time, while major weather events like Hurricane Ian and Hurricane Charley have historically tested the limits of local structures. When leaks or damage occur, our professional roof repair services in ${cityName} provide an immediate, reliable solution. We service properties throughout ${county}, strictly adhering to ${regulations} to ensure all repairs provide superior wind resistance and structural durability. Our repair teams focus on identifying the source of leaks, preventing internal water damage, and extending the overall lifespan of your existing roof system.`
  } else if (service === 'roof-replacement') {
    text = `When repair is no longer a viable option, a full roof replacement is necessary to protect your property investment. Years of exposure to intense Florida heat, high humidity, and UV rays can break down even the most durable roofing systems, leaving them vulnerable to severe storms. In ${cityName}, FL, having a roof engineered for maximum wind resistance is essential, especially given the history of powerful storms like Hurricane Ian and Hurricane Charley. Target Roofing specializes in comprehensive roof replacement services throughout ${county}. Every reroofing project we undertake is fully permitted and built to meet or exceed ${regulations}, utilizing top-tier materials and our dedicated crew to ensure a secure, storm-ready installation that will protect your property for decades to come.`
  } else {
    text = `Commercial properties in ${cityName}, FL require specialized roofing solutions that can handle the unique challenges of the Florida climate. The combination of intense heat, high humidity, constant UV exposure, and potential wind speeds from hurricanes like Ian or Charley means that commercial roofs must be built to the highest standards. Target Roofing is a trusted commercial roofing partner in ${county}. We provide expert services including new roof installations, preventative maintenance plans, and rapid-response repairs. All of our commercial roof installations comply with ${regulations}, offering exceptional wind resistance and energy efficiency. We work closely with property managers, condo associations, and business owners in ${cityName} to deliver projects on time and on budget with minimal disruption.`
  }

  return {
    heading: `${serviceTitle} in ${cityName}, FL`,
    description: text,
    county,
    regulations
  }
}

export function generateStaticParams() {
  const paramsList = []
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

export async function generateMetadata({ params }: PageProps) {
  const { city, service } = await params
  if (!CITIES.includes(city) || !SERVICES.includes(service)) {
    return {}
  }
  
  const cityData = CITY_MAP[city]
  const serviceData = SERVICE_MAP[service]
  const cityTitle = cityData.name
  const serviceTitle = serviceData.title

  return {
    title: `${serviceTitle} in ${cityTitle}, FL | Target Roofing`,
    description: `Looking for professional ${serviceTitle.toLowerCase()} in ${cityTitle}, FL? Target Roofing serves ${cityData.county} with storm-ready solutions built for extreme wind resistance.`,
    keywords: [
      `${serviceTitle.toLowerCase()} ${cityTitle}`,
      `${cityTitle} roofing`,
      `roofing contractor ${cityTitle}`,
      `Target Roofing`,
      `Florida roofing`,
    ]
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { city, service } = await params

  if (!CITIES.includes(city) || !SERVICES.includes(service)) {
    notFound()
  }

  const cityData = CITY_MAP[city]
  const serviceData = SERVICE_MAP[service]
  const content = getLocalizedContent(city, service)

  if (!cityData || !serviceData || !content) {
    notFound()
  }

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

  // Fallback to general list of projects matching the service category if fewer than 4 are found
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
      serviceCategories = ['Office', 'Retail', 'Condos/HOA', 'Government', 'Healthcare']
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden noise-overlay py-20 md:py-28">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border-r-2 border-white/20 transform rotate-12 translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-l-2 border-white/20 transform -rotate-12 -translate-x-1/2 translate-y-1/4" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              Professional {serviceData.title.toLowerCase()} services tailored to the building codes and weather challenges of {cityData.name} and the surrounding {cityData.county}.
            </p>
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
                Expert Solutions for {cityData.name} Properties
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
                    { title: "High-Velocity Hurricane Zone", desc: "Materials and fastings rated for wind resistance up to 160+ MPH." },
                    { title: "Licensed & State Certified", desc: "Registered under license CCC1334168. Fully bonded and insured." },
                    { title: "GAF Master Silver Star", desc: "Certified installers eligible for premium manufacturer warranties." }
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
                At Target Roofing, we do not rely on subcontractors. Every member of our team is a highly trained, dedicated Target Roofing employee. Spot our technicians on your roof wearing their signature red Target Roofing polos—a symbol of our commitment to safety, professionalism, and quality craftsmanship.
              </p>
              <ul className="space-y-3">
                {[
                  'Fully licensed, bonded, and insured team',
                  'Extensively trained on wind-resistance and UV-protection standards',
                  'Equipped with state-of-the-art diagnostic and repair equipment',
                  'Dedicated to keeping your job site clean and clean-up completed daily'
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
              Hear what our clients say about our professionalism, quality of work, and quick response times.
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

      {/* Inline Lead Capture Form */}
      <section className="bg-[var(--red)] text-white noise-overlay py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InlineLeadForm
            defaultService={serviceData.defaultService}
            title={`Get a Professional ${serviceData.title} Survey`}
            subtitle={`Fill out the form below to schedule a detailed roof survey for your property in ${cityData.name}, FL. Our technicians in red Target Roofing polos will inspect your roof and provide a comprehensive report.`}
            buttonText={`Submit Estimate Request`}
            darkTheme={true}
          />
        </div>
      </section>
    </>
  )
}
