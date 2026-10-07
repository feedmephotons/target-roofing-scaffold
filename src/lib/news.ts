import blogsData from '@/data/blogs.json'

export const NEWS_PAGE_SIZE = 12
export const NEWS_POSTS = [...blogsData].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
export const NEWS_PAGE_COUNT = Math.ceil(NEWS_POSTS.length / NEWS_PAGE_SIZE)

export function newsPageHref(page: number): string {
  return page === 1 ? '/target-news' : `/target-news/page/${page}`
}
