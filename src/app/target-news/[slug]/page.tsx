import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Folder, Phone, ChevronRight, FileText } from 'lucide-react'
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

interface PageProps {
  params: Promise<{ slug: string }>
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

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = (blogsData as BlogPost[]).find((b) => b.slug === slug)
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  return {
    title: `${post.title} | Target News`,
    description: post.excerpt,
  }
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = (blogsData as BlogPost[]).find((b) => b.slug === slug)

  if (!post) {
    notFound()
  }

  const postColor = post.color || CATEGORY_COLORS[post.category] || 'bg-[var(--red)]'
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* CSS Styles for dangerouslySetInnerHTML premium typography */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-body-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        .blog-body-content h3 {
          font-family: var(--font-oswald), sans-serif;
          font-size: 1.625rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--black);
          text-transform: uppercase;
        }
        .blog-body-content h4 {
          font-family: var(--font-oswald), sans-serif;
          font-size: 1.375rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: var(--black);
          text-transform: uppercase;
        }
        .blog-body-content ul {
          list-style-type: square;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-body-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
      `}} />

      {/* ─── BREADCRUMBS & NAVIGATION ─── */}
      <div className="bg-[var(--gray-50)] border-b border-[var(--gray-200)] py-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/target-news"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gray-600)] hover:text-[var(--red)] transition-colors font-[family-name:var(--font-display)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          <span className="text-xs text-[var(--gray-400)] uppercase tracking-wider font-[family-name:var(--font-display)]">
            News Details
          </span>
        </div>
      </div>

      {/* ─── HERO HEADER ─── */}
      <header className="relative bg-[var(--black)] text-white overflow-hidden py-16 md:py-24">
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <span className={`inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white ${postColor} rounded-sm shadow-md mb-6 font-[family-name:var(--font-display)]`}>
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-[family-name:var(--font-display)] uppercase">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--gray-300)] font-semibold font-[family-name:var(--font-display)] uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--red)]" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-[var(--red)]" />
              {post.category}
            </span>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Main Article Column */}
            <div className="lg:col-span-12">
              
              {/* Featured Image */}
              {post.image && (
                <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden mb-12 shadow-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* Blog body / Fallsback dynamically */}
              {post.content ? (
                // Full Blog Layout
                <article className="blog-body-content text-lg leading-relaxed text-[var(--gray-700)] font-[family-name:var(--font-body)]">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
              ) : (
                // Fallback Archive Layout
                <div className="space-y-8 font-[family-name:var(--font-body)]">
                  {/* Excerpt Summary */}
                  <div className="border-l-4 border-[var(--red)] pl-6 py-2 text-xl italic text-[var(--gray-700)] leading-relaxed bg-[var(--gray-50)] rounded-r">
                    {post.excerpt}
                  </div>

                  {/* Elegant Archive Announcement Box */}
                  <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded p-8 flex flex-col md:flex-row gap-6 items-start">
                    <div className="p-3 bg-[var(--red)]/10 text-[var(--red)] rounded-sm shrink-0">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--black)] mb-3 font-[family-name:var(--font-display)] uppercase">
                        Archived News Article Summary
                      </h3>
                      <p className="text-base text-[var(--gray-600)] leading-relaxed">
                        This article is part of the Target Roofing news archive. Since 2012, we have been 
                        Southwest Florida&apos;s trusted commercial roofing partner, serving condominiums, country clubs, 
                        high-rises, retail facilities, and government structures.
                      </p>
                      <p className="text-base text-[var(--gray-600)] leading-relaxed mt-3">
                        Our full service department offers 24/7/365 emergency response, preventive maintenance checkups, 
                        and custom sheet metal fabrication.
                      </p>
                    </div>
                  </div>

                  {/* CTA Block */}
                  <div className="border border-[var(--gray-200)] rounded-lg p-8 text-center bg-[var(--gray-50)] mt-12">
                    <h3 className="text-2xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-4">
                      Need Professional Roofing Services?
                    </h3>
                    <p className="text-[var(--gray-600)] max-w-xl mx-auto mb-8">
                      We offer free, high-resolution photo-documented inspections and estimate services 
                      for commercial, industrial, and HOA properties in Southwest Florida.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[var(--red-dark)] transition-colors shadow-md hover:shadow-lg font-[family-name:var(--font-display)]"
                      >
                        Request a Free Estimate
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <a
                        href="tel:239-332-5707"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[var(--black)] text-[var(--black)] text-sm font-bold uppercase tracking-wider rounded hover:bg-[var(--black)] hover:text-white transition-colors font-[family-name:var(--font-display)]"
                      >
                        <Phone className="w-4 h-4" />
                        239-332-5707
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Back to Blog Button */}
              <div className="border-t border-[var(--gray-200)] pt-12 mt-16 flex justify-between items-center">
                <Link
                  href="/target-news"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gray-600)] hover:text-[var(--red)] transition-colors font-[family-name:var(--font-display)]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All News
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-bold uppercase tracking-wider text-[var(--red)] hover:underline font-[family-name:var(--font-display)]"
                >
                  Contact Our Team &rarr;
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}
