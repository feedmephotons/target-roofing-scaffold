import type { Metadata } from 'next'
import { Oswald, Source_Sans_3, Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import './globals.css'

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Target Roofing | Southwest Florida Commercial Roof Repair',
    template: '%s | Target Roofing',
  },
  description:
    'Southwest Florida\'s trusted commercial roof repair and maintenance specialist. We extend your roof\'s lifespan with expert repairs and manage replacement transitions when needed. Serving Fort Myers, Naples, Sarasota & Tampa. License #CCC1334168.',
  keywords: [
    'commercial roof repair',
    'roofing contractor',
    'Fort Myers roofing',
    'Southwest Florida roofing',
    'leak repair',
    'roof maintenance plans',
    'reroofing',
    'Target Roofing',
  ],
  openGraph: {
    title: 'Target Roofing | Commercial Roof Repair',
    description: 'Southwest Florida\'s trusted commercial roof repair and maintenance specialist.',
    url: 'https://targetroofers.com',
    siteName: 'Target Roofing',
    type: 'website',
    images: [
      {
        url: 'https://targetroofers.com/images/logos/target-roofing-logo-2x.png',
        width: 800,
        height: 400,
        alt: 'Target Roofing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Roofing | Commercial Roof Repair',
    description: 'Southwest Florida\'s trusted commercial roof repair and maintenance specialist.',
    images: ['https://targetroofers.com/images/logos/target-roofing-logo-2x.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${sourceSans.variable} ${poppins.variable} antialiased`}>
        <Header />
        <main className="pt-[7.5rem]">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
