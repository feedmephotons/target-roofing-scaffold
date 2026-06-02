'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X, ChevronDown, LogIn } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    children: [
      { name: 'Our Company', href: '/about' },
      { name: 'Our Process', href: '/our-process' },
      { name: 'Our Team', href: '/our-team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Reviews', href: '/reviews' },
    ],
  },
  {
    name: 'Services',
    href: '/roofing-services',
    children: [
      { name: 'New Roofs', href: '/roofing-services#new-roofs' },
      { name: 'Reroofing', href: '/roofing-services#reroofing' },
      { name: 'Repairs', href: '/roofing-services#repairs' },
      { name: 'Maintenance Plans', href: '/roofing-services#maintenance-plans' },
      { name: 'Softwash', href: '/softwash' },
      { name: 'Free Estimate', href: '/contact' },
    ],
  },
  { name: 'Portfolio', href: '/our-projects' },
  {
    name: 'News',
    href: '/target-news',
    children: [
      { name: 'Target News', href: '/target-news' },
      { name: 'Video Gallery', href: '/video-gallery' },
    ],
  },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-[var(--red)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <span className="hidden sm:inline">License #CCC1334168</span>
              <span className="hidden md:inline">Serving Sarasota, Tampa, Fort Myers, Naples</span>
            </div>
            <a
              href="tel:239-332-5707"
              className="flex items-center gap-2 font-semibold hover:text-white/90 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              239-332-5707
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/images/logos/target-roofing-logo.png"
                alt="Target Roofing & Sheet Metal"
                width={220}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[var(--black)] hover:text-[var(--red)] transition-colors font-[family-name:var(--font-display)]"
                  >
                    {item.name}
                    {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                  </Link>

                  {/* Dropdown */}
                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-lg border-t-2 border-[var(--red)] py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[var(--gray-700)] hover:bg-[var(--gray-50)] hover:text-[var(--red)] transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <Link
                href="/portal"
                className="ml-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-md"
              >
                <LogIn className="h-4 w-4" />
                Customer Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-3 text-[var(--black)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden bg-white border-t transition-all duration-300 ease-in-out overflow-hidden mobile-menu-container ${mobileMenuOpen ? 'max-h-[calc(100vh-120px)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none invisible'}`}>
          <div className="px-4 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-120px)]">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3.5 text-sm font-semibold uppercase text-[var(--black)] hover:text-[var(--red)] hover:bg-[var(--gray-50)] rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-[var(--gray-600)] hover:text-[var(--red)] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/portal"
              className="flex items-center justify-center gap-2 mx-4 mt-4 px-6 py-3.5 bg-[var(--red)] text-white text-sm font-bold uppercase rounded hover:bg-[var(--red-dark)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              Customer Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
