'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Building2,
  FolderOpen,
  Trophy,
  Clock,
  Eye,
  X,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Metadata (exported from a separate layout or handled via generateMetadata) */
/* ------------------------------------------------------------------ */
// Note: 'use client' pages can't export metadata directly.
// We use a wrapper approach — see bottom of file.

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook                                         */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */
function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, start])
  return count
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
type Category =
  | 'Churches'
  | 'Condos/HOA'
  | 'Country Clubs'
  | 'Government'
  | 'Healthcare'
  | 'High Rises'
  | 'Hospitality'
  | 'Office'
  | 'Retail'
  | 'RV Parks'
  | 'Schools'
  | 'Theaters'
  | 'Warehouses'

interface Project {
  name: string
  categories: Category[]
}

const CATEGORIES: Category[] = [
  'Churches',
  'Condos/HOA',
  'Country Clubs',
  'Government',
  'Healthcare',
  'High Rises',
  'Hospitality',
  'Office',
  'Retail',
  'RV Parks',
  'Schools',
  'Theaters',
  'Warehouses',
]

import PROJECTS_DATA from '@/data/projects.json'
const PROJECTS: Project[] = PROJECTS_DATA as Project[]

/* Category color mapping for card accents & gradients */
const CATEGORY_COLORS: Record<Category, { gradient: string; accent: string; bg: string }> = {
  Churches:        { gradient: 'from-amber-900/90 to-amber-800/70',   accent: '#92400E', bg: 'bg-amber-900' },
  'Condos/HOA':    { gradient: 'from-slate-800/90 to-slate-700/70',   accent: '#334155', bg: 'bg-slate-800' },
  'Country Clubs': { gradient: 'from-emerald-900/90 to-emerald-800/70', accent: '#064E3B', bg: 'bg-emerald-900' },
  Government:      { gradient: 'from-blue-900/90 to-blue-800/70',     accent: '#1E3A5F', bg: 'bg-blue-900' },
  Healthcare:      { gradient: 'from-sky-900/90 to-sky-800/70',       accent: '#0C4A6E', bg: 'bg-sky-900' },
  'High Rises':    { gradient: 'from-zinc-800/90 to-zinc-700/70',     accent: '#27272A', bg: 'bg-zinc-800' },
  Hospitality:     { gradient: 'from-purple-900/90 to-purple-800/70', accent: '#581C87', bg: 'bg-purple-900' },
  Office:          { gradient: 'from-gray-800/90 to-gray-700/70',     accent: '#1F2937', bg: 'bg-gray-800' },
  Retail:          { gradient: 'from-rose-900/90 to-rose-800/70',     accent: '#881337', bg: 'bg-rose-900' },
  'RV Parks':      { gradient: 'from-teal-900/90 to-teal-800/70',     accent: '#134E4A', bg: 'bg-teal-900' },
  Schools:         { gradient: 'from-indigo-900/90 to-indigo-800/70', accent: '#312E81', bg: 'bg-indigo-900' },
  Theaters:        { gradient: 'from-fuchsia-900/90 to-fuchsia-800/70', accent: '#701A75', bg: 'bg-fuchsia-900' },
  Warehouses:      { gradient: 'from-stone-800/90 to-stone-700/70',   accent: '#44403C', bg: 'bg-stone-800' },
}

/* Geometric pattern SVGs per category type */
function getPatternStyle(category: Category, index: number): React.CSSProperties {
  const patterns: Record<string, string> = {
    Churches: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5v20M20 15h20M30 25v30M15 40h30' stroke='%23ffffff' stroke-width='1.5' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
    'Condos/HOA': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='5' y='5' width='12' height='12' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.08'/%3E%3Crect x='23' y='23' width='12' height='12' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
    'Country Clubs': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.06'/%3E%3Ccircle cx='30' cy='30' r='10' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.06'/%3E%3C/svg%3E")`,
    Government: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 4L44 18H4L24 4z' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.08'/%3E%3Crect x='8' y='18' width='32' height='24' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.05'/%3E%3C/svg%3E")`,
    Healthcare: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 8h10v10h10v10H25v10H15V28H5V18h10V8z' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.07'/%3E%3C/svg%3E")`,
    'High Rises': `url("data:image/svg+xml,%3Csvg width='30' height='60' viewBox='0 0 30 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='15' y1='0' x2='15' y2='60' stroke='%23ffffff' stroke-width='1' opacity='0.06'/%3E%3Cline x1='0' y1='15' x2='30' y2='15' stroke='%23ffffff' stroke-width='0.5' opacity='0.04'/%3E%3Cline x1='0' y1='30' x2='30' y2='30' stroke='%23ffffff' stroke-width='0.5' opacity='0.04'/%3E%3Cline x1='0' y1='45' x2='30' y2='45' stroke='%23ffffff' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E")`,
    Hospitality: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 5L45 25L25 45L5 25Z' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.07'/%3E%3C/svg%3E")`,
    Office: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='40' y2='40' stroke='%23ffffff' stroke-width='0.5' opacity='0.06'/%3E%3Cline x1='40' y1='0' x2='0' y2='40' stroke='%23ffffff' stroke-width='0.5' opacity='0.06'/%3E%3C/svg%3E")`,
    Retail: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23ffffff' opacity='0.06'/%3E%3C/svg%3E")`,
    'RV Parks': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 50L30 10L50 50Z' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.07'/%3E%3C/svg%3E")`,
    Schools: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15h30M15 0v30' stroke='%23ffffff' stroke-width='0.5' opacity='0.06'/%3E%3C/svg%3E")`,
    Theaters: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10a20 20 0 0 1 0 40a20 20 0 0 1 0-40' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.07'/%3E%3Cpath d='M20 25c2 3 6 3 8 0M32 25c2 3 6 3 8 0' stroke='%23ffffff' stroke-width='0.8' fill='none' opacity='0.05'/%3E%3C/svg%3E")`,
    Warehouses: `url("data:image/svg+xml,%3Csvg width='48' height='32' viewBox='0 0 48 32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='8' width='44' height='22' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.06'/%3E%3Cpath d='M2 8L24 2L46 8' stroke='%23ffffff' stroke-width='1' fill='none' opacity='0.06'/%3E%3C/svg%3E")`,
  }
  return {
    backgroundImage: patterns[category] || patterns.Office,
    backgroundSize: category === 'Retail' ? '20px 20px' : undefined,
  }
}

/* ================================================================== */
/*  PAGE COMPONENT                                                     */
/* ================================================================== */
export default function OurProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory =
      activeFilter === 'All' || p.categories.includes(activeFilter as Category)
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <HeroSection />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        projectCount={filteredProjects.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ProjectGrid 
        projects={filteredProjects} 
        activeFilter={activeFilter} 
        onProjectSelect={setSelectedProject} 
      />

      {/* Lightbox Modal */}
      {selectedProject && (
        <ProjectLightbox 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <StatsBar />
      <CTASection />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="relative -mt-[7.5rem] overflow-hidden bg-[var(--black)]">
      {/* Diagonal red accent stripe */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            var(--red) 80px,
            var(--red) 82px
          )`,
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 z-[1] noise-overlay" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center px-4 pt-52 pb-32 text-center text-white sm:pt-56 sm:pb-36">
        {/* Overline */}
        <div className="animate-fade-in-up mb-6 flex items-center gap-3">
          <div className="h-px w-10 bg-[var(--red)]" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--red)] font-[family-name:var(--font-display)]">
            Our Portfolio
          </span>
          <div className="h-px w-10 bg-[var(--red)]" />
        </div>

        <h1
          className="animate-fade-in-up mb-6 max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-display)] uppercase"
          style={{ animationDelay: '0.1s' }}
        >
          Projects by<br />
          <span className="text-[var(--red)]">Target Roofing</span>
        </h1>

        <p
          className="animate-fade-in-up max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          style={{ animationDelay: '0.25s' }}
        >
          You&apos;ll see our handiwork, including roofing for new construction,
          full roof replacement projects, and repairs and maintenance.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  2. FILTER BAR                                                      */
/* ------------------------------------------------------------------ */
function FilterBar({
  activeFilter,
  onFilterChange,
  projectCount,
  searchQuery,
  onSearchChange,
}: {
  activeFilter: string
  onFilterChange: (filter: string) => void
  projectCount: number
  searchQuery: string
  onSearchChange: (search: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="sticky top-[7.5rem] z-30 border-b border-[var(--gray-200)] bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4 w-full md:w-auto overflow-hidden">
            {/* Project count indicator */}
            <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-[var(--gray-300)]">
              <FolderOpen className="h-4 w-4 text-[var(--gray-400)]" />
              <span className="text-sm font-semibold text-[var(--gray-600)] whitespace-nowrap">
                {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
              </span>
            </div>

            {/* Scrollable filter pills */}
            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto hide-scrollbar py-1"
            >
              {/* All button */}
              <button
                onClick={() => onFilterChange('All')}
                className={`shrink-0 rounded-full px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  activeFilter === 'All'
                    ? 'bg-[var(--red)] text-white border-[var(--red)] shadow-md'
                    : 'bg-white text-[var(--gray-700)] border-[var(--gray-300)] hover:border-[var(--red)] hover:text-[var(--red)]'
                }`}
              >
                All
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onFilterChange(cat)}
                  className={`shrink-0 rounded-full px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                    activeFilter === cat
                      ? 'bg-[var(--red)] text-white border-[var(--red)] shadow-md'
                      : 'bg-white text-[var(--gray-700)] border-[var(--gray-300)] hover:border-[var(--red)] hover:text-[var(--red)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64 shrink-0">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-[var(--gray-300)] px-4 py-2.5 text-base text-[var(--black)] placeholder-[var(--gray-400)] focus:border-[var(--red)] focus:ring-1 focus:ring-[var(--red)] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  3. PROJECT GRID                                                    */
/* ------------------------------------------------------------------ */
function ProjectGrid({
  projects,
  activeFilter,
  onProjectSelect,
}: {
  projects: Project[]
  activeFilter: string
  onProjectSelect: (project: Project) => void
}) {
  const { ref, inView } = useInView(0.05)

  return (
    <section ref={ref} className="bg-[var(--gray-50)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Active filter heading */}
        {activeFilter !== 'All' && (
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase">
              {activeFilter}
              <span className="ml-3 text-lg text-[var(--gray-400)] font-normal lowercase">
                ({projects.length} {projects.length === 1 ? 'project' : 'projects'})
              </span>
            </h2>
            <div className="mt-2 h-1 w-16 bg-[var(--red)]" />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              inView={inView}
              onClick={() => onProjectSelect(project)}
            />
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="py-20 text-center">
            <Building2 className="mx-auto h-16 w-16 text-[var(--gray-300)] mb-4" />
            <p className="text-lg text-[var(--gray-500)]">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  3a. PROJECT CARD                                                   */
/* ------------------------------------------------------------------ */
function ProjectCard({
  project,
  index,
  inView,
  onClick,
}: {
  project: Project
  index: number
  inView: boolean
  onClick: () => void
}) {
  const primaryCategory = project.categories[0]
  const colors = CATEGORY_COLORS[primaryCategory]
  const patternStyle = getPatternStyle(primaryCategory, index)
  const [imageError, setImageError] = useState(false)

  const imgSlug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const imageSrc = `/images/portfolio/${imgSlug}.jpg`

  return (
    <article
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      {/* Card body with gradient bg */}
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${colors.gradient} flex flex-col justify-end p-6 overflow-hidden`}
      >
        {/* Project Image */}
        {!imageError && (
          <>
            <Image
              src={imageSrc}
              alt={project.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          </>
        )}

        {/* Geometric pattern overlay (fallback) */}
        {imageError && (
          <div
            className="absolute inset-0 z-0"
            style={patternStyle}
          />
        )}

        {/* Large faded initial letter */}
        <div className="absolute top-3 right-4 z-0 text-[8rem] leading-none font-bold text-white/[0.04] font-[family-name:var(--font-display)] select-none pointer-events-none">
          {project.name.charAt(0)}
        </div>

        {/* Diagonal red accent */}
        <div
          className="absolute bottom-0 left-0 z-0 h-1 w-0 bg-[var(--red)] transition-all duration-500 group-hover:w-full"
        />

        {/* Category pills */}
        <div className="relative z-10 mb-3 flex flex-wrap gap-1.5 animate-relative">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm border border-white/10"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Project name */}
        <h3 className="relative z-10 text-xl font-bold uppercase text-white font-[family-name:var(--font-display)] leading-tight drop-shadow-lg">
          {project.name}
        </h3>

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--red)]/0 transition-all duration-300 group-hover:bg-[var(--red)]/85">
          <div className="flex items-center gap-2 text-white opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Eye className="h-5 w-5" />
            <span className="text-base font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">
              View Project
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  3b. LIGHTBOX MODAL                                                 */
/* ------------------------------------------------------------------ */
function ProjectLightbox({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [imageError, setImageError] = useState(false)
  const imgSlug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const imageSrc = `/images/portfolio/${imgSlug}.jpg`

  const primaryCategory = project.categories[0]
  const colors = CATEGORY_COLORS[primaryCategory]

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-10 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-35 rounded-full bg-black/60 p-3 text-white/80 hover:text-white hover:bg-black/90 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Media Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-neutral-900 flex items-center justify-center overflow-hidden">
          {!imageError ? (
            <Image 
              src={imageSrc} 
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="max-h-full max-w-full object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center p-8 relative`}>
              <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <Building2 className="h-24 w-24 text-white/20" />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 bg-[#1A1A1A] border-t border-white/5">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.categories.map((cat) => (
              <span 
                key={cat} 
                className="rounded-full bg-[var(--red)]/10 border border-[var(--red)]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--red)]"
              >
                {cat}
              </span>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white font-[family-name:var(--font-display)] mb-4">
            {project.name}
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6 border-t border-white/5">
            <p className="text-white/60 text-sm max-w-md">
              Need roofing work on a similar property in Southwest Florida? We specialize in reroofing, new construction, repairs, and proactive maintenance.
            </p>
            <Link 
              href={`/contact?service=free-estimate&project=${encodeURIComponent(project.name)}`}
              className="inline-flex items-center justify-center gap-2 rounded bg-brand-gradient hover-bg-brand-gradient px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] shrink-0"
            >
              Inquire about this project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  4. STATS BAR                                                       */
/* ------------------------------------------------------------------ */
function StatsBar() {
  const { ref, inView } = useInView(0.3)
  const totalProjects = useCountUp(98, 2000, inView)
  const categories = useCountUp(14, 1600, inView)

  const stats = [
    {
      icon: Trophy,
      value: totalProjects,
      suffix: '',
      label: 'Total Projects Completed',
    },
    {
      icon: Building2,
      value: categories,
      suffix: '',
      label: 'Categories Served',
    },
    {
      icon: Clock,
      value: 25,
      suffix: '+',
      label: 'Years Combined Experience',
      noAnimate: true,
    },
  ]

  return (
    <>
      {/* Divider into dark */}
      <div className="relative bg-[var(--gray-50)]">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)',
            background: 'var(--black)',
          }}
        />
      </div>

      <section
        ref={ref}
        className="relative bg-[var(--black)] py-24 lg:py-28 noise-overlay"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={`text-center transition-all duration-700 ${
                    inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--red)]/20">
                    <Icon className="h-7 w-7 text-[var(--red)]" />
                  </div>
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-[family-name:var(--font-display)]">
                    {stat.noAnimate ? stat.value : (stat.value === 0 && !inView ? '0' : stat.value)}
                    <span className="text-[var(--red)]">{stat.suffix}</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-widest text-white/60 font-[family-name:var(--font-display)]">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Divider out of dark */}
      <div className="relative bg-[var(--black)]">
        <div className="h-0" />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0% 100%)',
            background: 'white',
          }}
        />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  5. BOTTOM CTA                                                      */
/* ------------------------------------------------------------------ */
function CTASection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-6">
            Ready to Start<br />Your Project?
          </h2>
          <p className="mb-10 text-lg text-[var(--gray-600)] leading-relaxed">
            Whether it&apos;s a new roof, a full replacement, or ongoing maintenance,
            Target Roofing delivers quality, on time and on budget.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-[var(--red)] px-8 py-4 text-base font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[var(--red-dark)] hover:shadow-xl hover:scale-[1.02]"
            >
              Get Free Estimate
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/our-process"
              className="inline-flex items-center gap-2 rounded border-2 border-[var(--black)] px-8 py-4 text-base font-bold uppercase tracking-wider text-[var(--black)] transition-all hover:bg-[var(--black)] hover:text-white"
            >
              Our Process
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
