import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function load(storageBlocked = false) {
  const module = { exports: {} }, calls = [], values = new Map()
  const sessionStorage = {
    getItem: key => { if (storageBlocked) throw Error('blocked'); return values.get(key) ?? null },
    setItem: (key, value) => { if (storageBlocked) throw Error('blocked'); values.set(key, value) },
  }
  const window = { location: { pathname: '/roofing-services/roof-replacement', search: '?utm_source=search&utm_campaign=roof-replacement' }, gtag: (...args) => calls.push(['ga', ...args]), oaiq: (...args) => calls.push(['ads', ...args]) }
  const source = fs.readFileSync('src/lib/tracking.ts', 'utf8')
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText,
    { module, exports: module.exports, window, sessionStorage, URLSearchParams, document: { referrer: 'https://example.com/' }, crypto: { randomUUID: () => 'test-event' }, Date, Math })
  return { ...module.exports, calls, values, window }
}

for (const blocked of [false, true]) test(`saved lead reports once, including blocked storage=${blocked}`, () => {
  const { trackLead, calls } = load(blocked)
  trackLead(undefined, { form_id: 'chat' })
  assert.equal(calls.length, 0)
  trackLead('saved-row-1', { form_id: 'chat' })
  trackLead('saved-row-1', { form_id: 'chat' })
  assert.equal(calls.filter(x => x[0] === 'ga' && x[2] === 'generate_lead').length, 1)
  assert.equal(calls.filter(x => x[0] === 'ads' && x[2] === 'lead_created').length, 1)
  assert.equal(calls.find(x => x[0] === 'ads')[4].event_id, 'tr-lead-saved-row-1')
})

test('GA receives labels and saved ID without inquiry fields or raw URLs', () => {
  const { trackLead, calls, values } = load()
  values.set('tr_attribution', JSON.stringify({ utm_source: 'search', utm_campaign: 'roof-repair', utm_term: 'private@example.com', referrer: 'https://example.com/?email=private@example.com', utm_content: 'private@example.com' }))
  trackLead('saved-row-2', { form_id: 'chat', email: 'private@example.com', name: 'Test Customer', message: 'Private roof inquiry', street_address: '1 Test Street' })
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0][3])), { form_id: 'chat', lead_id: 'saved-row-2', utm_source: 'search', utm_campaign: 'roof-repair' })
})

test('phone click is separate from a saved inquiry', () => {
  const { trackCallClick, calls } = load()
  trackCallClick('+12393325707')
  assert.equal(calls[0][2], 'phone_call_click')
  assert.ok(!calls.some(x => x[2] === 'generate_lead' || x[2] === 'lead_created'))
})


test('first tagged source survives internal navigation and a later campaign tag', () => {
  const { captureAttribution, getAttribution, window } = load()
  captureAttribution()
  window.location.pathname = '/contact'
  window.location.search = '?utm_source=other&utm_campaign=later'
  captureAttribution()
  assert.equal(getAttribution().utm_source, 'search')
  assert.equal(getAttribution().utm_campaign, 'roof-replacement')
  assert.equal(getAttribution().landing_page, '/roofing-services/roof-replacement')
})
