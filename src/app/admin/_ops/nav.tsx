import { AddToolIcon, AssistantIcon, JobsIcon, LeadsIcon, MeetingsIcon, PodcastIcon, ReviewsIcon, SeoIcon, TasksIcon, VideosIcon } from './icons'

/**
 * Every admin page, in sidebar order. The sidebar and the first-visit guide both read
 * this list, so a new page only needs adding here (plus its folder under src/app/admin).
 * `match` is a path prefix for standalone pages, or the ?tab= value for /admin tabs.
 */
export type AdminNavItem = {
  href: string
  match: string
  label: string
  icon: (p: { className?: string }) => React.ReactElement
  /** What the page does, for the first-visit guide. */
  summary: string
  /** What it is good for, for the first-visit guide. */
  goodFor: string
}

export const ADMIN_SECTIONS: { label: string; items: AdminNavItem[] }[] = [
  { label: 'Website', items: [
    { href: '/admin?tab=leads', match: 'leads', label: 'Lead Manager', icon: LeadsIcon,
      summary: 'Every website form lands here: Contact Us, Free Estimate, Softwash and Roof Cleaning, with the contact details, address, service and message. Mark each one Processed or Spam, or search by name, email or city.',
      goodFor: 'Daily follow-up, so no homeowner falls through the cracks, and weeding out spam.' },
    { href: '/admin?tab=videos', match: 'videos', label: 'Manage Videos', icon: VideosIcon,
      summary: 'Add, remove and reorder the YouTube videos shown in the website video gallery and showcase.',
      goodFor: 'Keeping fresh project walkthroughs and testimonials on the site without a developer.' },
    { href: '/admin?tab=jobs', match: 'jobs', label: 'Job Listings', icon: JobsIcon,
      summary: 'Create, edit and switch on or off the open positions shown on the Careers page.',
      goodFor: 'Hiring crews and office staff, and pausing a listing the moment it is filled.' },
    { href: '/admin?tab=seo', match: 'seo', label: 'SEO Settings', icon: SeoIcon,
      summary: 'Edit the title, description and keywords Google reads for each page of the site.',
      goodFor: 'Tuning how pages show up in search, and seasonal or local pushes like hurricane season.' },
    { href: '/admin?tab=reviews', match: 'reviews', label: 'Add Review', icon: ReviewsIcon,
      summary: 'Post customer reviews to the reviews section of the website.',
      goodFor: 'Showing off new five-star feedback the same day it comes in.' },
  ] },
  { label: 'Operations', items: [
    { href: '/admin/tasks', match: '/admin/tasks', label: 'Tasks', icon: TasksIcon,
      summary: "Everyone's work in one list. Tasks come from meetings, the Telegram bot, the voice assistant, or straight from this page.",
      goodFor: 'Seeing who owes what, and what is overdue, at a glance.' },
    { href: '/admin/meetings', match: '/admin/meetings', label: 'Meeting Intelligence', icon: MeetingsIcon,
      summary: 'Paste a transcript or upload a recording. Each meeting gets a summary, every commitment becomes a suggested task, and tasks for known people land on their list automatically.',
      goodFor: 'Never losing the action items from sales and production meetings.' },
    { href: '/admin/podcast', match: '/admin/podcast', label: 'Podcast', icon: PodcastIcon,
      summary: 'The Target podcast in one place: the name and logo decision, episode plans, who owes what before recording, and production through to Apple, Spotify and YouTube.',
      goodFor: 'Keeping episodes on schedule from idea to published.' },
    { href: '/admin/assistant', match: '/admin/assistant', label: 'AI Assistant', icon: AssistantIcon,
      summary: 'Ask about tasks, meetings and the podcast, or tell it to create, reassign or finish work. The same assistant answers in Telegram and by voice.',
      goodFor: 'Quick updates and hands-free changes, even from a job site.' },
  ] },
  { label: 'Build', items: [
    { href: '/admin/build', match: '/admin/build', label: 'Add a Tool', icon: AddToolIcon,
      summary: 'How to add your own features: a ready-to-paste brief that catches ChatGPT or Claude up on this project, how to get access, and where a new tool can live, including its own targetroofers.com subdomain.',
      goodFor: 'Turning an idea into a working tool without starting from scratch.' },
  ] },
]
