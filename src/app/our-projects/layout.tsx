import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Projects',
}

export default function OurProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
