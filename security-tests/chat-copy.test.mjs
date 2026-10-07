import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function loadTypeScript(relativePath, requireMock = () => { throw new Error('Unexpected import') }) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const testModule = { exports: {} }
  vm.runInNewContext(compiled, {
    module: testModule, exports: testModule.exports, require: requireMock,
    process: { env: { GOOGLE_AI_API_KEY: 'local-test-only' } }, console,
  })
  return testModule.exports
}

const { CHAT_GREETING, PHONE_OPTION, withEarlyPhoneOption } = loadTypeScript('src/lib/chat-copy.ts')
const phoneLink = '[239-332-5707](tel:+12393325707)'

test('neutral opening greets as Target Roofing without an unsolicited AI announcement', () => {
  assert.match(CHAT_GREETING, /Welcome to Target Roofing/)
  assert.doesNotMatch(CHAT_GREETING, /\b(?:AI|bot|automated|virtual assistant)\b/i)
  assert.match(PHONE_OPTION, /tel:\+12393325707/)
})

test('first and second substantive answers get a separate clickable phone paragraph; later replies do not', () => {
  const answer = 'We can inspect the leak and recommend the right repair.'
  for (const previousReplies of [0, 1]) {
    const result = withEarlyPhoneOption(answer, previousReplies)
    assert.ok(result.startsWith(`${answer}\n\n`))
    assert.ok(result.endsWith(PHONE_OPTION))
    assert.ok(result.includes(phoneLink))
  }
  assert.equal(withEarlyPhoneOption(answer, 2), answer)
  assert.equal(withEarlyPhoneOption('', 0), '')
})

test('existing generated call option is deduplicated and its number is clickable', () => {
  const plain = 'We can assess the roof. Call Target Roofing at 239-332-5707.'
  const linked = withEarlyPhoneOption(plain, 0)
  assert.equal(linked, 'We can assess the roof.\n\nCall Target Roofing at [239-332-5707](tel:+12393325707).')
  assert.equal((linked.match(/tel:\+12393325707/g) || []).length, 1)
  assert.equal(withEarlyPhoneOption(linked, 1), linked)
})

test('inline and parenthesized call options move after the answer without losing other sentences', () => {
  const reply = 'Call (239) 332-5707 today. We can inspect the damaged flashing and recommend a repair.'
  assert.equal(
    withEarlyPhoneOption(reply, 0),
    'We can inspect the damaged flashing and recommend a repair.\n\nCall [239-332-5707](tel:+12393325707) today.',
  )
  const inline = 'We can inspect the leak. Call 239-332-5707 today. We can also discuss maintenance.'
  assert.equal(
    withEarlyPhoneOption(inline, 1),
    'We can inspect the leak. We can also discuss maintenance.\n\nCall [239-332-5707](tel:+12393325707) today.',
  )
})

test('an existing canonical footer stays once and noncanonical tel links normalize', () => {
  const answer = 'We can inspect the leak.'
  assert.equal(withEarlyPhoneOption(`${answer}\n\n${PHONE_OPTION}`, 0), `${answer}\n\n${PHONE_OPTION}`)
  assert.equal(withEarlyPhoneOption(`${PHONE_OPTION} ${answer}`, 0), `${answer}\n\n${PHONE_OPTION}`)
  assert.equal(
    withEarlyPhoneOption(`${answer} Call us at [239-332-5707](tel:12393325707).`, 0),
    `${answer}\n\nCall us at ${phoneLink}.`,
  )
  assert.equal(withEarlyPhoneOption('Call tel:12393325707.', 2), `Call ${phoneLink}.`)
})

test('chat route preserves AI routing and instructs honest disclosure on identity questions', async () => {
  let systemInstruction = ''
  let modelCalls = 0
  class GoogleGenAI {
    models = {
      generateContent: async request => {
        modelCalls += 1
        systemInstruction = request.config.systemInstruction
        assert.equal(request.contents.at(-1).parts[0].text, 'Are you a real person?')
        return { text: "I'm an automated Target Roofing assistant. I can help answer roofing questions." }
      },
    }
  }
  const { POST } = loadTypeScript('src/app/api/chat/route.ts', name => {
    if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } }
    if (name === '@google/genai') return { GoogleGenAI }
    if (name === '@/lib/supabase') return { supabase: { from: () => { throw new Error('No leads in this test') } } }
    if (name === '@/lib/notify') return { recipientList: () => [], sendNotification: () => { throw new Error('No email in this test') } }
    if (name === '@/lib/chat-lead-marker') return { extractChatLeadMarkers: text => ({ markers: [], cleanText: text }) }
    throw new Error(`Unexpected import ${name}`)
  })
  const response = await POST({ json: async () => ({ messages: [
    { role: 'assistant', content: CHAT_GREETING },
    { role: 'user', content: 'Are you a real person?' },
  ] }) })

  assert.equal(modelCalls, 1)
  assert.equal(response.status, 200)
  assert.match(systemInstruction, /say clearly that you are an automated Target Roofing assistant/i)
  assert.match(systemInstruction, /Never imply a human is typing/i)
  assert.match(response.body.message, /automated Target Roofing assistant/)
})
