import type { NextConfig } from 'next'
import fs from 'fs'
import path from 'path'

// Dynamic generation of datasets during build/config loading
try {
  const rootDir = process.cwd();
  const srcDir = path.join(rootDir, '..', '.agents', 'explorer_initial_analysis');
  const destDir = path.join(rootDir, 'src', 'data');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const primaryPath = path.join(srcDir, 'proposed_blog.json');
  const sitemapPath = path.join(srcDir, 'proposed_sitemap_blogs.json');

  if (fs.existsSync(primaryPath) && fs.existsSync(sitemapPath)) {
    const primaryBlogs = JSON.parse(fs.readFileSync(primaryPath, 'utf8'));
    const sitemapBlogs = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));

    const blogMap = new Map();

    sitemapBlogs.forEach((post: { slug: string } & Record<string, unknown>) => {
      blogMap.set(post.slug, { ...post });
    });

    primaryBlogs.forEach((post: { slug: string } & Record<string, unknown>) => {
      if (blogMap.has(post.slug)) {
        const existing = blogMap.get(post.slug);
        blogMap.set(post.slug, {
          ...existing,
          ...post
        });
      } else {
        blogMap.set(post.slug, { ...post });
      }
    });

    const mergedBlogs = Array.from(blogMap.values());
    console.log(`[Config Hook] Merged blogs: total unique items = ${mergedBlogs.length}`);

    fs.writeFileSync(path.join(destDir, 'blogs.json'), JSON.stringify(mergedBlogs, null, 2), 'utf8');
    console.log('[Config Hook] Successfully wrote blogs.json');
  }
} catch (e) {
  console.error('[Config Hook] Error in build dataset generation:', e);
}

// ---------------------------------------------------------------------------
// Redirects from the old WordPress site (targetroofers.com) so existing links, ads,
// and search results land on the matching page here. Next.js forwards query strings
// (UTMs, oai_click_id) through every redirect.
// ---------------------------------------------------------------------------

// Old WordPress pages and posts whose address changed.
const LEGACY_PAGE_REDIRECTS: Record<string, string> = {
  // Consolidate the duplicate award summary into the recovered original report.
  '/gaf-triple-excellence-award': '/target-news/gaf-honors-target-roofing-with-triple-excellence-award',
  '/target-news/gaf-triple-excellence-award': '/target-news/gaf-honors-target-roofing-with-triple-excellence-award',
  '/about-us': '/about',
  '/brand-guide': '/about',
  '/commercial-roofing-repairs-from-sarasota-to-marco-island': '/roofing-services/roof-repair',
  '/commercial-roofing-experts-southwest-florida': '/locations/southwest-florida/commercial-roofing',
  '/commercial-roofing-southwest-florida': '/locations/southwest-florida/commercial-roofing',
  '/the-best-commercial-roofing-in-marco-island': '/locations/naples/commercial-roofing',
  '/commercial-roofing-services-booklet': '/roofing-services',
  '/hurricane-roofing-services': '/roofing-services/emergency-storm-repair',
  '/roof-cleaning-system': '/softwash?request=roof-cleaning',
  '/googlereview': '/reviews',
  '/video-gallery-test': '/video-gallery',
  '/contact-us': '/contact',
  '/thank-you': '/',
  '/thank-you-sem': '/',
  '/blog': '/target-news',
  '/feed': '/target-news',
  '/hurricaneprep': '/target-news/hurricane-preparedness',
  '/4-reasons-metal-roofs-have-an-advantage-in-florida': '/target-news/metal-roofs-advantage-florida',
  '/heres-what-a-great-roofing-service-team-looks-like': '/target-news/great-roofing-service-team',
  '/how-your-exterior-walls-might-indicate-a-problem-with-your-roof': '/target-news/exterior-walls-roof-problems',
  '/preparing-your-commercial-roof-for-rainy-season': '/target-news/preparing-commercial-roof-rainy-season',
  '/target-roofing-launches-eco-friendly-roof-cleaning-service': '/target-news/eco-friendly-roof-cleaning',
  '/these-3-things-are-destroying-your-roof': '/target-news/three-things-destroying-your-roof',
  '/why-a-high-rises-roof-matters-to-more-than-just-residents-of-the-penthouse-suite': '/target-news/high-rise-roof-importance',
  '/why-santa-and-you-should-never-walk-on-your-roof': '/target-news/never-walk-on-your-roof',
}

// Old WordPress archive sections, matched with everything under them.
const LEGACY_SECTION_REDIRECTS: Record<string, string> = {
  '/portfolio-items': '/our-projects',
  '/portfolio_tags': '/our-projects',
  '/our_projects_categories': '/our-projects',
  '/category': '/target-news',
  '/author': '/target-news',
  '/faq-items': '/roofing-services/roof-repair',
  '/faq_category': '/roofing-services/roof-repair',
}

// Top-level routes on this site; a blog slug never shadows one of these.
const RESERVED_TOP_LEVEL = new Set([
  'about', 'admin', 'api', 'careers', 'commercial-hoa-roof-maintenance', 'contact', 'financing',
  'locations', 'mobile-privacy-policy', 'our-process', 'prospect-intake-form', 'our-projects', 'our-team', 'podcast',
  'portal', 'reviews', 'roofing-services', 'softwash', 'target-news', 'video-gallery',
  'warranties', 'website-privacy-policy',
])

function legacyBlogRedirects() {
  try {
    const blogsPath = path.join(process.cwd(), 'src', 'data', 'blogs.json')
    const blogs: { slug?: string }[] = JSON.parse(fs.readFileSync(blogsPath, 'utf8'))
    return blogs
      .map((b) => b.slug)
      .filter((slug): slug is string => !!slug && !RESERVED_TOP_LEVEL.has(slug))
      .map((slug) => ({ source: `/${slug}`, destination: `/target-news/${slug}`, permanent: true }))
  } catch (e) {
    console.error('[redirects] Could not read blogs.json:', e)
    return []
  }
}

const nextConfig: NextConfig & { eslint?: { ignoreDuringBuilds?: boolean } } = {
  async redirects() {
    return [
      // The former customer portal was a non-production demo. Send visitors to
      // a real contact path without rendering credential or payment fields.
      { source: '/portal', destination: '/contact', permanent: true },
      ...Object.entries(LEGACY_PAGE_REDIRECTS).map(([source, destination]) => ({ source, destination, permanent: true })),
      ...Object.entries(LEGACY_SECTION_REDIRECTS).flatMap(([source, destination]) => [
        { source, destination, permanent: true },
        { source: `${source}/:path*`, destination, permanent: true },
      ]),
      ...legacyBlogRedirects(),
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'targetroofers.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  experimental: {
    cpus: 1,
  },
}

export default nextConfig as NextConfig

