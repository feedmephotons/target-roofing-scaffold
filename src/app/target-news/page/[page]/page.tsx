import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import NewsArchive from '@/components/NewsArchive'
import { NEWS_PAGE_COUNT, newsPageHref } from '@/lib/news'

export const dynamicParams = false

export function generateStaticParams() {
  return Array.from({ length: NEWS_PAGE_COUNT }, (_, i) => ({ page: String(i + 1) }))
}

type Props = { params: Promise<{ page: string }> }

function validPage(value: string): number {
  const page = Number(value)
  if (!/^[1-9]\d*$/.test(value) || page > NEWS_PAGE_COUNT) notFound()
  return page
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = validPage((await params).page)
  return {
    title: `Target News — Page ${page}`,
    description: `Browse page ${page} of Target Roofing's news and roofing advice archive.`,
    alternates: { canonical: newsPageHref(page) },
  }
}

export default async function NewsArchivePage({ params }: Props) {
  const page = validPage((await params).page)
  if (page === 1) permanentRedirect('/target-news')
  return <NewsArchive page={page} />
}
