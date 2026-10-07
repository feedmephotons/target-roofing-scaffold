import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function route({ saveFails = false, sent = true, notifyThrows = false, marker = true } = {}) {
  const module = { exports: {} }, rows = [], notices = []
  const require = name => {
    if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } }
    if (name === '@google/genai') return { GoogleGenAI: class { models = { generateContent: async () => ({ text: 'Your request was emailed.' }) } } }
    if (name === '@/lib/supabase') return { supabase: { from: () => ({ insert: row => { rows.push(row); return { select: () => ({ single: async () => saveFails ? { error: Error('save failed') } : { data: { id: 'saved-chat-row' }, error: null } }) } } }) } }
    if (name === '@/lib/notify') return { recipientList: value => [value], sendNotification: async notice => { notices.push(notice); if (notifyThrows) throw Error('mail failed'); return { sent, error: sent ? undefined : 'mail unavailable' } } }
    if (name === '@/lib/chat-lead-marker') return { extractChatLeadMarkers: () => ({ cleanText: 'Helpful reply', markers: marker ? [{ json: JSON.stringify({ firstName: 'Test', lastName: 'Customer', phone: '2390000000', email: 'test@example.com', address: 'TEST ONLY', issue: 'TEST ONLY leak' }) }] : [] }) }
    throw Error('Unexpected import ' + name)
  }
  vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/app/api/chat/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText,
    { module, exports: module.exports, require, process: { env: { GOOGLE_AI_API_KEY: 'test' } }, console: { error: () => {} } })
  return { POST: module.exports.POST, rows, notices }
}
const request = { json: async () => ({ messages: [{ role: 'user', content: 'TEST ONLY' }], attribution: 'source=search | campaign=roof-repair' }) }

test('only confirmed saved chat returns the row ID; attribution stays with the lead', async () => {
  const { POST, rows, notices } = route()
  const res = await POST(request)
  assert.equal(res.status, 200)
  assert.equal(res.body.lead.id, 'saved-chat-row')
  assert.equal(res.body.lead.notified, true)
  assert.match(rows[0].message, /Lead channel: website chat/)
  assert.match(rows[0].message, /campaign=roof-repair/)
  assert.equal(notices[0].to[0], 'projects@targetroofers.com')
  assert.equal(notices[0].replyTo, 'test@example.com')
})

for (const opts of [{ sent: false }, { notifyThrows: true }]) test(`mail failure retains saved ID without inviting duplicate resubmission ${JSON.stringify(opts)}`, async () => {
  const { POST, rows } = route(opts)
  const res = await POST(request)
  assert.equal(res.status, 200)
  assert.equal(rows.length, 1)
  assert.equal(res.body.lead.id, 'saved-chat-row')
  assert.equal(res.body.lead.notified, false)
  assert.match(res.body.message, /request is saved/)
  assert.match(res.body.message, /call 239-332-5707/)
  assert.doesNotMatch(res.body.message, /emailed|team has been notified/)
})

test('failed persistence has no saved lead or notification', async () => {
  const { POST, notices } = route({ saveFails: true })
  const res = await POST(request)
  assert.equal(res.status, 500)
  assert.equal(res.body.lead, undefined)
  assert.equal(notices.length, 0)
})

test('casual chat returns no lead ID and writes nothing', async () => {
  const { POST, rows, notices } = route({ marker: false })
  const res = await POST(request)
  assert.equal(res.body.lead, undefined)
  assert.equal(rows.length, 0)
  assert.equal(notices.length, 0)
})
