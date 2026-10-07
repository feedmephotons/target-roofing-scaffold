import assert from 'node:assert/strict'
import fs from 'node:fs'
const origin = process.env.SEO_TEST_ORIGIN || 'http://127.0.0.1:3014'
const posts = JSON.parse(fs.readFileSync('src/data/blogs.json', 'utf8'))
const count = Math.ceil(posts.length / 12), reached = new Set()
const links = html => [...html.replace(/<script[\s\S]*?<\/script>/g, '').matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'))
async function read(path) { const res = await fetch(origin + path); assert.equal(res.status, 200, path); return res.text() }
for (let page = 1; page <= count; page++) {
  const path = page === 1 ? '/target-news' : `/target-news/page/${page}`
  const html = await read(path), hrefs = links(html)
  assert.ok(html.includes(`rel="canonical" href="https://targetroofers.com${path}"`), path + ' canonical')
  const articles = hrefs.filter(href => href.startsWith('/target-news/') && !href.startsWith('/target-news/page/'))
  assert.equal(articles.length, page === count ? posts.length % 12 : 12)
  articles.forEach(href => { assert.ok(!reached.has(href), 'article repeated across pages'); reached.add(href) })
  assert.ok(hrefs.includes('/target-news/page/7'), 'last archive page must have a crawlable link')
}
assert.equal(reached.size, posts.length)
for (const post of posts) { const path = '/target-news/' + post.slug; assert.ok(reached.has(path), path); await read(path) }
const page1 = await fetch(origin + '/target-news/page/1', { redirect: 'manual' })
assert.equal(page1.status, 308); assert.equal(page1.headers.get('location'), '/target-news')
assert.equal((await fetch(origin + '/target-news/page/8')).status, 404)
const replacement = await read('/roofing-services/roof-replacement')
assert.equal((replacement.match(/<h1\b/g) || []).length, 1)
assert.ok(replacement.includes('name="service"'))
assert.ok(links(replacement).includes('/locations/sarasota/roof-replacement'))
assert.ok(links(replacement).includes('/locations/naples/roof-replacement'))
for (const city of ['fort-myers', 'naples', 'punta-gorda', 'sarasota']) {
  for (const route of [`/locations/${city}`, `/locations/${city}/roof-replacement`]) {
    const html = await read(route)
    assert.ok(html.includes('Planning roofing work in'), route)
    assert.ok(links(html).includes('/roofing-services/roof-replacement'), route)
  }
}
const repair = await read('/roofing-services/roof-repair')
assert.ok(repair.includes('id="commercial-repair"'))
assert.ok(links(repair).includes('/commercial-hoa-roof-maintenance'))
assert.ok(!repair.includes('often in under two hours'))
const sitemap = await read('/sitemap.xml')
for (const href of [...reached, '/roofing-services/roof-replacement', ...Array.from({ length: count - 1 }, (_, i) => `/target-news/page/${i + 2}`)]) {
  assert.ok(sitemap.includes(`https://targetroofers.com${href}</loc>`), 'missing sitemap entry ' + href)
}
console.log(JSON.stringify({ archive_pages: count, articles_linked: reached.size, article_urls_200: posts.length, county_routes_checked: 8, replacement_form: 'present', canonical_and_sitemap: 'pass', invalid_archive: '404', first_archive_alias: '308' }, null, 2))
