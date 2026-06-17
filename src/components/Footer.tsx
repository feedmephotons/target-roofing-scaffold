import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'New Roofs', href: '/roofing-services#new-roofs' },
    { name: 'Reroofing', href: '/roofing-services#reroofing' },
    { name: 'Roof Repairs', href: '/roofing-services#repairs' },
    { name: 'Maintenance Plans', href: '/roofing-services#maintenance-plans' },
    { name: 'Softwash', href: '/softwash' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Process', href: '/our-process' },
    { name: 'Our Team', href: '/our-team' },
    { name: 'Portfolio', href: '/our-projects' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Careers', href: '/careers' },
  ],
  resources: [
    { name: 'Target News', href: '/target-news' },
    { name: 'Video Gallery', href: '/video-gallery' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Free Estimate', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-blueprint-dark text-white relative">
      {/* CTA Banner */}
      <div className="bg-brand-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            All property owners, property managers and condo/HOA boards need a reliable, local commercial roofing company. Turn to Target Roofing for all your roofing needs in Southwest Florida.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white text-[var(--red)] font-bold uppercase tracking-wide rounded hover:bg-[var(--gray-100)] transition-colors shadow-lg"
            >
              Get a Free Estimate
            </Link>
            <a
              href="tel:239-332-5707"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold uppercase tracking-wide rounded hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5" />
              239-332-5707
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logos/target-roofing-logo.png"
              alt="Target Roofing"
              width={200}
              height={46}
              className="h-10 w-auto mb-6"
            />
            <div className="space-y-4 text-sm text-[var(--gray-400)]">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                <span>7011 Nalle Grade Rd<br />North Fort Myers, Florida 33917</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--red)] flex-shrink-0" />
                <a href="tel:239-332-5707" className="hover:text-white transition-colors inline-block py-3.5 px-3">239-332-5707</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--red)] flex-shrink-0" />
                <a href="mailto:projects@targetroofers.com" className="hover:text-white transition-colors inline-block py-3.5 px-3">projects@targetroofers.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[var(--red)] flex-shrink-0 mt-0.5" />
                <span>Mon - Fri: 8:00 AM - 5:00 PM<br />Saturday: 8:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Services</h3>
            <ul className="space-y-1 lg:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="block py-3.5 lg:py-1 text-sm text-[var(--gray-400)] hover:text-[var(--red)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Company</h3>
            <ul className="space-y-1 lg:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="block py-3.5 lg:py-1 text-sm text-[var(--gray-400)] hover:text-[var(--red)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Certifications */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Resources</h3>
            <ul className="space-y-1 lg:space-y-3 mb-8">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="block py-3.5 lg:py-1 text-sm text-[var(--gray-400)] hover:text-[var(--red)] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Image
              src="/images/badges/gaf-master-silverstar.png"
              alt="GAF Master Elite & Silver Star Certified"
              width={200}
              height={80}
              className="h-16 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--gray-500)]">
            <p>&copy; {new Date().getFullYear()} Target Roofing & Sheet Metal. All rights reserved. License #CCC1334168</p>
            <div className="flex items-center gap-6">
              <span>Serving Lee, Collier, Charlotte & Sarasota Counties</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
