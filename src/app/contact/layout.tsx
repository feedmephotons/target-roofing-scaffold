import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Target Roofing in Southwest Florida',
  description: 'Contact Target Roofing about roof repair, replacement, inspections, or commercial roofing across Lee, Collier, Charlotte, and Sarasota counties.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Target Roofing in Southwest Florida | Target Roofing',
    description: 'Contact Target Roofing about roof repair, replacement, inspections, or commercial roofing across Lee, Collier, Charlotte, and Sarasota counties.',
    url: '/contact',
    siteName: 'Target Roofing',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Target Roofing in Southwest Florida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Target Roofing in Southwest Florida | Target Roofing',
    description: 'Contact Target Roofing about roof repair, replacement, inspections, or commercial roofing across Lee, Collier, Charlotte, and Sarasota counties.',
    images: ['/og-image.jpg'],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
