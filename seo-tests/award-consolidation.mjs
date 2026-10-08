import assert from 'node:assert/strict'
const origin = process.env.SEO_TEST_ORIGIN || 'http://127.0.0.1:3018'
const canonical = 'https://targetroofers.com'
const preferred = '/target-news/gaf-honors-target-roofing-with-triple-excellence-award'
const retired = '/target-news/gaf-triple-excellence-award'
for (const alias of [retired, '/gaf-triple-excellence-award']) {
  const query = '?utm_source=award-review&utm_campaign=seo&ref=archive'
  const response = await fetch(origin + alias + query, { redirect: 'manual' })
  assert.equal(response.status, 308, alias)
  const destination = new URL(response.headers.get('location'), origin)
  assert.equal(destination.pathname, preferred)
  assert.equal(destination.searchParams.get('utm_source'), 'award-review')
  assert.equal(destination.searchParams.get('utm_campaign'), 'seo')
  assert.equal(destination.searchParams.get('ref'), 'archive')
  assert.equal((await fetch(destination, { redirect: 'manual' })).status, 200, 'no redirect chain')
}
const response = await fetch(origin + preferred)
assert.equal(response.status, 200)
const html = await response.text()
assert.equal((html.match(/<h1\b/g) || []).length, 1)
assert.ok(html.includes(`rel="canonical" href="${canonical}${preferred}"`))
assert.ok(html.includes('May 16, 2019'), 'original visible publication date retained')
assert.ok(html.includes('property="article:published_time" content="2019-05-16"'), 'original sharing publication date retained')
assert.ok(html.includes('Historical article recovered'), 'historical context retained')
const sitemap = await (await fetch(origin + '/sitemap.xml')).text()
assert.ok(sitemap.includes(`<loc>${canonical}${preferred}</loc>`))
assert.ok(!sitemap.includes(`<loc>${canonical}${retired}</loc>`))
for (let page = 1; page <= 7; page++) {
  const path = page === 1 ? '/target-news' : `/target-news/page/${page}`
  const archive = await (await fetch(origin + path)).text()
  assert.ok(!archive.includes(`href="${retired}"`), 'retired URL excluded from archive')
}
const routes = new Set()
for (const slug of ['roof-repair-or-replacement-questions', 'what-should-a-roofing-estimate-include']) {
  const page = await fetch(origin + '/target-news/' + slug)
  assert.equal(page.status, 200)
  const text = (await page.text()).replace(/<script[\s\S]*?<\/script>/g, '')
  assert.ok(text.includes(`rel="canonical" href="${canonical}/target-news/${slug}"`))
  for (const match of text.matchAll(/href="(\/[^"#]*)"/g)) routes.add(match[1].replaceAll('&amp;', '&'))
}
for (const path of routes) assert.equal((await fetch(origin + path)).status, 200, 'guide link ' + path)
console.log(JSON.stringify({award_aliases:'308 direct with query preservation',original_award:'200, self canonical, original date',retired_url:'absent from sitemap and 7 archives',guide_links_checked:routes.size},null,2))
