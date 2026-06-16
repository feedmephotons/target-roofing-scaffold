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

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
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
    cpus: 2,
  },
}

export default nextConfig as NextConfig

