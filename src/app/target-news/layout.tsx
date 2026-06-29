import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Target News',
  description:
    'Everything you need to know about commercial roofing in Southwest Florida. News about Target Roofing and valuable information for our customers and partners.',
}

export default function TargetNewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
