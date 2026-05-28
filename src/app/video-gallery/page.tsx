import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Phone, ChevronRight, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Video Gallery',
  description:
    'See Target Roofing in action. Watch our project showcases, customer testimonials, and community involvement videos.',
}

const videos = [
  {
    title: 'Target Roofing Overview',
    url: 'https://www.youtube.com/embed/yz5H6FkrWhs',
    description:
      'Learn about Target Roofing & Sheet Metal and what makes us Southwest Florida\'s trusted commercial roofing partner.',
  },
  {
    title: 'Our Process',
    url: 'https://www.youtube.com/embed/cGLaC7x9btw',
    description:
      'See how we approach every project with precision, accountability, and cutting-edge technology.',
  },
  {
    title: 'Colonial Country Club',
    url: 'https://www.youtube.com/embed/A7Qz9tz8nNU',
    description:
      'A detailed look at our roofing work at the Colonial Country Club community in Fort Myers.',
  },
  {
    title: 'Regatta Condominium Project',
    url: 'https://www.youtube.com/embed/ehuUlnze8L8',
    description:
      'Watch our team complete a full roof replacement at the Regatta condominium in Naples.',
  },
  {
    title: 'TPO Retrofit Spotlight',
    url: 'https://www.youtube.com/embed/sNfPZctunRU',
    description:
      'See how we transformed a commercial property with a modern TPO roofing retrofit.',
  },
  {
    title: 'Site Safety',
    url: 'https://www.youtube.com/embed/fO-jeXa8bus',
    description:
      'Safety is our top priority. See how we maintain the highest safety standards on every job site.',
  },
  {
    title: 'Community Involvement',
    url: 'https://www.youtube.com/embed/rGueLVLaea8',
    description:
      'Target Roofing is proud to give back to the Southwest Florida community. See our outreach in action.',
  },
  {
    title: 'Customer Testimonial',
    url: 'https://www.youtube.com/embed/BGjzGHoxveQ',
    description:
      'Hear directly from our satisfied customers about their experience working with Target Roofing.',
  },
]

export default function VideoGalleryPage() {
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
              See Us in Action
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
              Video <span className="text-[var(--red)]">Gallery</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              See Target Roofing in action. Watch our project showcases,
              customer testimonials, and community involvement.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VIDEO GRID ─── */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 text-[var(--red)] text-sm font-bold uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              Featured Videos
              <span className="w-8 h-[2px] bg-[var(--red)]" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--black)] mb-4 font-[family-name:var(--font-display)]">
              Project Showcases &amp; More
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.url}
                className="group bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Title bar */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--gray-200)]">
                  <span className="flex items-center justify-center w-8 h-8 bg-[var(--red)] rounded-sm">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </span>
                  <h3 className="text-lg font-bold text-[var(--black)] font-[family-name:var(--font-display)] leading-tight">
                    {video.title}
                  </h3>
                </div>

                {/* Video embed */}
                <div className="video-container">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Description */}
                <div className="px-6 py-4">
                  <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HURRICANE PREP PLAYLIST CTA ─── */}
      <section className="relative bg-[var(--black)] text-white py-20 md:py-24 overflow-hidden">
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Subtle diagonal accent */}
        <div
          className="absolute top-0 left-0 w-1/4 h-full bg-[var(--red)] opacity-10"
          style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-[var(--red-light)] text-sm font-bold uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              YouTube Playlist
              <span className="w-8 h-[2px] bg-[var(--red)]" />
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-display)]">
              Hurricane <span className="text-[var(--red)]">Preparation</span>
            </h2>

            <p className="text-lg text-[var(--gray-400)] leading-relaxed mb-10 max-w-2xl mx-auto">
              Check out our Hurricane Preparation playlist on YouTube for
              essential tips on protecting your commercial roof during
              Southwest Florida&apos;s storm season.
            </p>

            <a
              href="https://www.youtube.com/playlist?list=PLSbetEuqZa7JGX2uDYULRxQLoo8bhiy1-"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg hover:shadow-xl"
            >
              Watch the Playlist
              <ExternalLink className="w-4 h-4" />
            </a>
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
              Request Your Free Estimate
            </h2>

            <p className="text-lg md:text-xl text-[var(--gray-600)] leading-relaxed mb-10 max-w-2xl mx-auto">
              Ready to get started? Contact us today for a free, no-obligation
              estimate on your commercial roofing project.
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
