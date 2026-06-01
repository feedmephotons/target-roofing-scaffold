import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Quote, ArrowRight, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'Read what property managers, contractors, and property owners throughout Southwest Florida say about Target Roofing. 4.9 average rating with 100+ Google reviews.',
}

import reviewsData from '@/data/reviews.json'
const reviews = reviewsData

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: (typeof reviews)[number]; index: number }) {
  return (
    <div
      className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-[var(--gray-100)]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Decorative quote */}
      <div className="absolute top-4 right-4 opacity-[0.06]">
        <Quote className="h-16 w-16 text-[var(--red)] fill-[var(--red)]" />
      </div>

      {/* Red top accent */}
      <div className="absolute top-0 left-6 right-6 h-[3px] bg-[var(--red)] rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Stars */}
      <div className="mb-4">
        <StarRating />
      </div>

      {/* Review text */}
      <blockquote className="relative z-10 text-[var(--gray-700)] leading-relaxed mb-6 text-[15px]">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      {/* Reviewer info */}
      <div className="flex items-center justify-between border-t border-[var(--gray-100)] pt-4">
        <div>
          <p className="font-semibold text-[var(--black)] text-sm">{review.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {review.source === 'Google' ? (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            )}
            <span className="text-xs text-[var(--gray-400)]">
              {review.source}
              {review.date && ` \u00B7 ${review.date}`}
            </span>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-[var(--gray-100)] flex items-center justify-center text-[var(--red)] font-bold font-[family-name:var(--font-display)] text-sm">
          {review.name.charAt(0)}
        </div>
      </div>
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden noise-overlay">
        {/* Diagonal accent lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border-r-2 border-white/20 transform rotate-12 translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-l-2 border-white/20 transform -rotate-12 -translate-x-1/2 translate-y-1/4" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-36">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--red)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--red)] font-[family-name:var(--font-display)]">
                Testimonials
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6">
              What Our{' '}
              <span className="text-[var(--red)]">Customers</span>{' '}
              Say
            </h1>

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              Don&apos;t just take our word for it. Here&apos;s what property managers, contractors, and
              property owners throughout Southwest Florida have to say about Target Roofing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[var(--red)] text-white py-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {[
              {
                value: '4.9',
                label: 'Average Rating',
                sub: (
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                    ))}
                  </div>
                ),
              },
              {
                value: '100+',
                label: 'Google Reviews',
                sub: null,
              },
              {
                value: '5 Star',
                label: 'Most Common Rating',
                sub: null,
              },
            ].map((stat) => (
              <div key={stat.label} className="py-8 sm:py-10 text-center px-4">
                <div className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-[0.15em] text-white/80 mt-1 font-semibold">
                  {stat.label}
                </div>
                {stat.sub}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Grid ── */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] mb-4">
              Trusted by Southwest Florida
            </h2>
            <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
              From emergency repairs to full reroofs, our customers consistently rate us
              5 stars across Google and Facebook.
            </p>
          </div>

          {/* Masonry-style grid with CSS columns */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="break-inside-avoid">
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden noise-overlay">
        {/* Red diagonal accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--red)] opacity-10 transform skew-x-[-12deg] translate-x-1/4" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience the{' '}
              <span className="text-[var(--red)]">Target Roofing</span>{' '}
              Difference?
            </h2>
            <p className="text-lg text-[var(--gray-300)] mb-10 max-w-xl mx-auto">
              Join hundreds of satisfied property owners and managers across Southwest Florida.
              Get your free estimate today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
              >
                Get a Free Estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:239-332-5707"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                239-332-5707
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
