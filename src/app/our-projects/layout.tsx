import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roofing Project Portfolio in Southwest Florida',
  description: 'Explore Target Roofing’s residential and commercial roofing portfolio in Southwest Florida, with project photos and examples of our work.',
  alternates: { canonical: '/our-projects' },
  openGraph: {
    title: 'Roofing Project Portfolio in Southwest Florida | Target Roofing',
    description: 'Explore Target Roofing’s residential and commercial roofing portfolio in Southwest Florida, with project photos and examples of our work.',
    url: '/our-projects',
    siteName: 'Target Roofing',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Target Roofing in Southwest Florida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Project Portfolio in Southwest Florida | Target Roofing',
    description: 'Explore Target Roofing’s residential and commercial roofing portfolio in Southwest Florida, with project photos and examples of our work.',
    images: ['/og-image.jpg'],
  },
}

export default function OurProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
