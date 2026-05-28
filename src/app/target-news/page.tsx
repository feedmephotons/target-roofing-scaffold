import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Target News',
  description:
    'Everything you need to know about commercial roofing in Southwest Florida. News about Target Roofing & Sheet Metal and valuable information for our customers and partners.',
}

const blogPosts = [
  {
    title: "Here's What a Great Roofing Service Team Looks Like",
    slug: 'great-roofing-service-team',
    excerpt:
      'Discover the qualities that set a truly great roofing service team apart, from professionalism and expertise to cutting-edge technology and accountability.',
    image: '/images/blog/good-service-header.webp',
    category: 'Service',
    color: 'bg-[var(--red)]',
  },
  {
    title: 'Hurricane Preparedness',
    slug: 'hurricane-preparedness',
    excerpt:
      'Southwest Florida is no stranger to hurricanes. Learn how to prepare your commercial roof for hurricane season and protect your investment.',
    image: '/images/blog/hurricane-preparedness.jpg',
    category: 'Hurricane',
    color: 'bg-[#1B3A5C]',
  },
  {
    title: 'Preparing Your Commercial Roof for Rainy Season',
    slug: 'preparing-commercial-roof-rainy-season',
    excerpt:
      'Rainy season in Florida can be brutal on commercial roofs. Here are the steps you should take to ensure your roof is ready for the downpours.',
    image: '/images/blog/rainy-season.jpg',
    category: 'Maintenance',
    color: 'bg-[#2D7A4F]',
  },
  {
    title: 'Target Roofing Launches Eco-Friendly Roof Cleaning Service',
    slug: 'eco-friendly-roof-cleaning',
    excerpt:
      'We are excited to announce our new eco-friendly softwash roof cleaning service, designed to protect your roof and the environment.',
    image: null,
    category: 'Company News',
    color: 'bg-[var(--red)]',
  },
  {
    title: 'These 3 Things Are Destroying Your Roof',
    slug: 'three-things-destroying-your-roof',
    excerpt:
      'Your commercial roof faces threats every day that you might not even be aware of. Learn what the top three culprits are and how to stop them.',
    image: null,
    category: 'Maintenance',
    color: 'bg-[#2D7A4F]',
  },
  {
    title: 'How Your Exterior Walls Might Indicate a Problem with Your Roof',
    slug: 'exterior-walls-roof-problems',
    excerpt:
      'Sometimes the signs of roof damage show up where you least expect them. Learn how to read the warning signs on your building\'s exterior walls.',
    image: null,
    category: 'Inspection',
    color: 'bg-[#5B4A8A]',
  },
  {
    title: "Why a High-Rise's Roof Matters to More Than Just Penthouse Residents",
    slug: 'high-rise-roof-importance',
    excerpt:
      'A high-rise roof affects every resident and tenant in the building. Discover why proper maintenance is critical for the entire structure.',
    image: null,
    category: 'Commercial',
    color: 'bg-[var(--black)]',
  },
  {
    title: 'Why Santa (and You) Should Never Walk on Your Roof',
    slug: 'never-walk-on-your-roof',
    excerpt:
      'Walking on your commercial roof can cause serious damage that leads to costly repairs. Here is why you should leave roof access to the professionals.',
    image: null,
    category: 'Safety',
    color: 'bg-[#C75B12]',
  },
  {
    title: '4 Reasons Metal Roofs Have an Advantage in Florida',
    slug: 'metal-roofs-advantage-florida',
    excerpt:
      'Metal roofing offers distinct advantages for Florida\'s unique climate. From hurricane resistance to energy efficiency, here is why metal stands out.',
    image: null,
    category: 'Metal Roofing',
    color: 'bg-[#4A6FA5]',
  },
  {
    title: 'What Is TPO Roofing and Why Is It So Popular?',
    slug: 'what-is-tpo-roofing',
    excerpt:
      'TPO roofing has become one of the most popular commercial roofing systems in the country. Learn what makes it such a smart choice for your building.',
    image: null,
    category: 'TPO Roofing',
    color: 'bg-[#3B7DD8]',
  },
  {
    title: 'Gutters: Critically Important for Health of a Roof',
    slug: 'gutters-important-for-roof',
    excerpt:
      'Gutters play a vital role in protecting your roof and building from water damage. Learn why gutter maintenance should be a top priority.',
    image: null,
    category: 'Maintenance',
    color: 'bg-[#2D7A4F]',
  },
  {
    title: 'GAF Honors Target Roofing with Triple Excellence Award',
    slug: 'gaf-triple-excellence-award',
    excerpt:
      'Target Roofing has been honored by GAF with the prestigious Triple Excellence Award, recognizing our commitment to installation, training, and consumer protection.',
    image: null,
    category: 'Awards',
    color: 'bg-[#B8860B]',
  },
]

export default function TargetNewsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden">
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Diagonal accent */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-[var(--red)] hidden lg:block"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-[var(--red-light)] text-sm font-bold uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              News &amp; Insights
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
              Target <span className="text-[var(--red)]">News</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              Everything You Need to Know About Commercial Roofing in Southwest
              Florida. Here, you&apos;ll find news about Target Roofing &amp;
              Sheet Metal, as well as information we know will be valuable to our
              customers and partners.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BLOG POST GRID ─── */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 text-[var(--red)] text-sm font-bold uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              Latest Articles
              <span className="w-8 h-[2px] bg-[var(--red)]" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] mb-4 font-[family-name:var(--font-display)]">
              From Our Blog
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image or Placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 ${post.color} flex items-center justify-center`}
                    >
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px)',
                          }}
                        />
                      </div>
                      <span className="relative text-white/90 text-sm font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-display)]">
                        {post.category}
                      </span>
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${post.color} rounded-sm shadow-lg font-[family-name:var(--font-display)]`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-bold text-[var(--black)] mb-3 leading-tight font-[family-name:var(--font-display)] group-hover:text-[var(--red)] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/target-news/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--red)] text-sm font-bold uppercase tracking-wide hover:gap-3 transition-all duration-300 font-[family-name:var(--font-display)]"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FREE ESTIMATE CTA ─── */}
      <section className="relative bg-white py-24 md:py-32 overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-[var(--gray-50)]"
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-[var(--red)] text-sm font-bold uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              Get Started Today
              <span className="w-8 h-[2px] bg-[var(--red)]" />
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] mb-6 font-[family-name:var(--font-display)]">
              Have Questions About Your Roof?
            </h2>

            <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed mb-10 max-w-2xl mx-auto">
              Our team is ready to help. Contact us today for a free estimate
              and expert advice on your commercial roofing needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg hover:shadow-xl"
              >
                Get a Free Estimate
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center gap-2 px-10 py-4 border-2 border-[var(--black)] text-[var(--black)] text-sm font-bold uppercase tracking-wide rounded hover:bg-[var(--black)] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                239-332-5707
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
