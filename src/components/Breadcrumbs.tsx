import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  name: string
  /** Absolute path (e.g. "/locations/fort-myers/roof-repair"). Omit on the current page. */
  href?: string
}

const BASE_URL = 'https://targetroofers.com'

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
 * Pass the full trail including the current page (last item, no href).
 * "Home" is prepended automatically — do not include it.
 */
export default function Breadcrumbs({
  items,
  className = '',
}: {
  items: Crumb[]
  className?: string
}) {
  const trail: Crumb[] = [{ name: 'Home', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${BASE_URL}${c.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--gray-500)]">
        {trail.map((c, i) => {
          const last = i === trail.length - 1
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-[var(--gray-400)]" aria-hidden="true" />}
              {last || !c.href ? (
                <span className="font-semibold text-[var(--gray-700)]" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-[var(--red)] transition-colors">
                  {c.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
