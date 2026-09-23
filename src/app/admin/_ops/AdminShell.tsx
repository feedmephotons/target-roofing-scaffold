'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Inbox, Video, Briefcase, Globe, Star, ListChecks, AudioLines, Mic, LogOut, Menu, Bot } from 'lucide-react'
import { logoutAdmin } from '@/app/actions'

const SECTIONS = [
  { label: 'Website', items: [
    { href: '/admin?tab=leads', match: 'leads', label: 'Lead Manager', icon: Inbox },
    { href: '/admin?tab=videos', match: 'videos', label: 'Manage Videos', icon: Video },
    { href: '/admin?tab=jobs', match: 'jobs', label: 'Job Listings', icon: Briefcase },
    { href: '/admin?tab=seo', match: 'seo', label: 'SEO Settings', icon: Globe },
    { href: '/admin?tab=reviews', match: 'reviews', label: 'Add Review', icon: Star },
  ] },
  { label: 'Operations', items: [
    { href: '/admin/tasks', match: '/admin/tasks', label: 'Tasks', icon: ListChecks },
    { href: '/admin/meetings', match: '/admin/meetings', label: 'Meeting Intelligence', icon: AudioLines },
    { href: '/admin/podcast', match: '/admin/podcast', label: 'Podcast', icon: Mic },
    { href: '/admin/assistant', match: '/admin/assistant', label: 'AI Assistant', icon: Bot },
  ] },
]

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const params = useSearchParams()
  const tab = params.get('tab') || 'leads'
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
      {SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{section.label}</p>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const active = item.match.startsWith('/') ? pathname.startsWith(item.match) : pathname === '/admin' && tab === item.match
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors ${active ? 'bg-[var(--red)] text-white shadow' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Icon className="h-4 w-4 shrink-0" />{item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const logout = async () => { await logoutAdmin(); router.refresh() }

  const sidebar = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col bg-[var(--black)] text-white">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-[var(--red)] rounded-lg flex items-center justify-center font-bold font-[family-name:var(--font-display)]">TR</div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">Target Roofing</p>
          <p className="text-[10px] text-white/50 font-semibold">Administrative Console</p>
        </div>
      </div>
      <Suspense fallback={<div className="flex-1" />}><Nav onNavigate={onNavigate} /></Suspense>
      <div className="border-t border-white/10 px-4 py-4">
        <p className="text-[10px] text-white/40 truncate mb-2">{email}</p>
        <button onClick={logout} className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold uppercase tracking-wider hover:border-[var(--red)]">
          <LogOut className="h-4 w-4" />Log Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[100] flex bg-[var(--gray-50)]">
      <aside className="hidden lg:block w-64 shrink-0">{sidebar()}</aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-[110] flex">
          <div className="w-72 max-w-[85vw]">{sidebar(() => setOpen(false))}</div>
          <button aria-label="Close menu" className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden flex items-center justify-between bg-[var(--black)] text-white px-4 py-3">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 -ml-2"><Menu className="h-5 w-5" /></button>
          <span className="text-sm font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">Target Admin</span>
          <span className="w-9" />
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
