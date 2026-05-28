import type { Metadata } from 'next'
import { Oswald, Source_Sans_3 } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Target Roofing & Sheet Metal | Southwest Florida Commercial Roofing',
    template: '%s | Target Roofing',
  },
  description:
    'Southwest Florida\'s trusted commercial roofing contractor. New roofs, reroofing, repairs, and maintenance plans. Serving Fort Myers, Naples, Sarasota & Tampa. License #CCC1334168.',
  keywords: [
    'commercial roofing',
    'roofing contractor',
    'Fort Myers roofing',
    'Southwest Florida roofing',
    'roof repair',
    'reroofing',
    'maintenance plans',
    'Target Roofing',
  ],
  openGraph: {
    title: 'Target Roofing & Sheet Metal',
    description: 'Southwest Florida\'s trusted commercial roofing contractor.',
    url: 'https://targetroofers.com',
    siteName: 'Target Roofing',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${sourceSans.variable} antialiased`}>
        <Header />
        <main className="pt-[7.5rem]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
