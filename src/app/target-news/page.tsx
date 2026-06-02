'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, ChevronRight } from 'lucide-react'
import blogsData from '@/data/blogs.json'

interface BlogPost {
  title: string
  slug: string
  date: string
  category: string
  excerpt: string
  image?: string | null
  color?: string | null
  content?: string
}

const CATEGORY_COLORS: Record<string, string> = {
  'Service': 'bg-[var(--red)]',
  'Hurricane': 'bg-[#1B3A5C]',
  'Maintenance': 'bg-[#2D7A4F]',
  'Company News': 'bg-[var(--red)]',
  'Inspection': 'bg-[#5B4A8A]',
  'Commercial': 'bg-[var(--black)]',
  'Safety': 'bg-[#C75B12]',
  'Metal Roofing': 'bg-[#4A6FA5]',
  'TPO Roofing': 'bg-[#3B7DD8]',
  'Awards': 'bg-[#B8860B]',
}

export default function TargetNewsPage() {
  const [visibleCount, setVisibleCount] = useState(12)

  const sortedPosts = (blogsData as BlogPost[]).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const displayedPosts = sortedPosts.slice(0, visibleCount)

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
            {displayedPosts.map((post) => {
              const postColor = post.color || CATEGORY_COLORS[post.category] || 'bg-[var(--red)]'
              return (
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 ${postColor} flex items-center justify-center`}
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
                        className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${postColor} rounded-sm shadow-lg font-[family-name:var(--font-display)]`}
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
                      className="inline-flex items-center gap-2 text-[var(--red)] text-sm font-bold uppercase tracking-wide hover:gap-3 transition-all duration-300 font-[family-name:var(--font-display)] min-h-[44px] py-2 px-3"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < sortedPosts.length && (
            <div className="text-center mt-16">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg hover:shadow-xl font-[family-name:var(--font-display)]"
              >
                Load More Articles
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
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
