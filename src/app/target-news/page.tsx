import type { Metadata } from 'next'
import NewsArchive from '@/components/NewsArchive'

export const metadata: Metadata = {
  title: 'Target News',
  alternates: { canonical: '/target-news' },
}

export default function TargetNewsPage() {
  return <NewsArchive page={1} />
}
