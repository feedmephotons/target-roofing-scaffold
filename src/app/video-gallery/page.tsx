import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Phone, ChevronRight } from 'lucide-react'
import VideoCard from '@/components/VideoCard'

export const metadata: Metadata = {
  title: 'Video Gallery',
  description:
    'See Target Roofing in action. Watch our project showcases, customer testimonials, and community involvement videos.',
}

import videosData from '@/data/videos.json'
const videos = videosData

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
              <VideoCard key={video.url} video={video} />
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
