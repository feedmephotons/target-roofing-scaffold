import assert from 'node:assert/strict'

const origin = process.env.SEO_TEST_ORIGIN || 'http://127.0.0.1:3023'
const html = await (await fetch(origin)).text()
const markup = html.replace(/<script\b[\s\S]*?<\/script>/g, '')
// Check actual server output, which must work before hydration or without JavaScript.
for (const value of ['10,000', '75', '24']) {
  assert.ok(markup.includes(`>${value}<`), `server-rendered statistic ${value}`)
}
assert.ok(!/<[^>]*class="[^"]*transition-all ease-out opacity-0/.test(markup), 'entrance content must start visible')
for (const path of [
  '/roofing-services/roof-replacement',
  '/commercial-hoa-roof-maintenance',
  '/target-news/great-roofing-service-team',
  '/target-news/hurricane-preparedness',
  '/target-news/preparing-commercial-roof-rainy-season',
]) {
  assert.ok(markup.includes(`href="${path}"`), path + ' homepage link')
  assert.equal((await fetch(origin + path)).status, 200, path)
}
const about = await (await fetch(origin + '/about')).text()
assert.ok(about.includes('id="certifications"'), 'certifications destination')
assert.ok(markup.includes('A+ Accredited'), 'approved badge remains')
console.log('PASS: visible server fallbacks, real statistics, working service/article links, certifications target and unchanged badge')
