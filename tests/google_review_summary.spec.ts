import { expect, test } from '@playwright/test'

if (process.env.CHAT_TEST_BROWSER_PATH) {
  test.use({ launchOptions: { executablePath: process.env.CHAT_TEST_BROWSER_PATH } })
}

test('Google review summary is accurate and business schema does not claim review stars', async ({ page }) => {
  for (const path of ['/', '/reviews', '/locations', '/locations/sarasota', '/locations/sarasota/roof-repair']) {
    await page.goto(path)
    const text = await page.locator('body').innerText()
    expect(text, path).toMatch(/4\.7/)
    expect(text, path).toMatch(/396/)
    expect(text, path).toMatch(/Google/)
    expect(text, path).not.toMatch(/34 Verified Reviews|5\.0 across 34|5\.0 from 34|5\.0 \/ 34/i)

    const businesses = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts =>
      scripts.flatMap(script => {
        try {
          const data = JSON.parse(script.textContent || '')
          const nodes = Array.isArray(data) ? data : [data]
          return nodes.filter(node => ['RoofingContractor', 'LocalBusiness'].includes(node['@type']))
        } catch {
          return []
        }
      }),
    )
    expect(businesses.length, path).toBeGreaterThan(0)
    for (const business of businesses) {
      expect(business.aggregateRating, path).toBeUndefined()
    }
  }
})
