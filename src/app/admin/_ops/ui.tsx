'use client'

// Small shared UI pieces for the operations pages, matching the existing admin look.
export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold uppercase tracking-tight font-[family-name:var(--font-display)] text-[var(--black)]">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--gray-500)] mt-1 max-w-3xl">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}

export function Card({ title, right, children, className = '' }: { title?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-[var(--gray-200)] bg-white shadow-sm ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between gap-3 border-b border-[var(--gray-100)] px-5 py-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--black)] font-[family-name:var(--font-display)]">{title}</h2>
          {right}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}

export const inputCls = 'w-full rounded-lg border border-[var(--gray-300)] bg-white px-3 py-2 text-sm text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)]'
export const btnPrimary = 'inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--red)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--red-dark)] disabled:opacity-50'
export const btnGhost = 'inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--gray-300)] bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--gray-600)] hover:border-[var(--red)] hover:text-[var(--red)] disabled:opacity-50'

export function Pill({ children, tone = 'gray' }: { children: React.ReactNode; tone?: 'gray' | 'red' | 'green' | 'amber' | 'blue' }) {
  const tones = { gray: 'bg-[var(--gray-100)] text-[var(--gray-600)]', red: 'bg-red-50 text-red-700', green: 'bg-green-50 text-green-700', amber: 'bg-amber-50 text-amber-700', blue: 'bg-blue-50 text-blue-700' }
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tones[tone]}`}>{children}</span>
}

export function fmtDate(d: string | null | undefined, withTime = false) {
  if (!d) return ''
  const date = /^\d{4}-\d{2}-\d{2}$/.test(d) ? new Date(d + 'T12:00:00') : new Date(d)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined, ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}), timeZone: 'America/New_York' })
}
