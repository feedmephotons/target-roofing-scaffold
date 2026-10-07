import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function form(response, props = { defaultService: 'reroofing', formId: 'replacement' }) {
  const module = { exports: {} }, states = [], conversions = [], submissions = []
  let cursor = 0
  const element = (type, props) => ({ type, props: props || {} })
  const require = name => {
    if (name === 'react') return { useState: initial => {
      const index = cursor++
      if (!(index in states)) states[index] = initial
      return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value }]
    } }
    if (name === 'react/jsx-runtime') return { jsx: element, jsxs: element, Fragment: 'fragment' }
    if (name === 'next/image') return { default: 'image' }
    if (name === 'lucide-react') return { Send: 'icon', CheckCircle: 'icon', Phone: 'icon' }
    if (name === '@/app/actions') return { submitContactLead: async data => { submissions.push(data); return response } }
    if (name === '@/lib/tracking') return { trackLead: (...args) => conversions.push(args), attributionSummary: () => '' }
    throw Error('Unexpected import ' + name)
  }
  const source = fs.readFileSync('src/components/InlineLeadForm.tsx', 'utf8')
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText,
    { module, exports: module.exports, require })
  const render = () => { cursor = 0; return module.exports.default(props) }
  const descendants = node => typeof node !== 'object' || node === null ? [] : [node, ...[node.props?.children].flat(Infinity).flatMap(descendants)]
  const text = node => typeof node === 'string' ? node : typeof node !== 'object' || node === null ? '' : [node.props?.children].flat(Infinity).map(text).join(' ')
  return { render, descendants, text, conversions, submissions }
}

test('saved replacement request shows the right confirmation without a response-time promise', async () => {
  const view = form({ success: true, leadId: 'saved-replacement', notified: true })
  await view.descendants(view.render()).find(n => n.type === 'form').props.onSubmit({ preventDefault() {} })
  const result = view.render()
  assert.equal(result.props.role, 'status')
  assert.match(view.text(result), /Your request is saved/)
  assert.doesNotMatch(view.text(result), /roof repair|shortly|within 24 hours|emailed/)
  assert.equal(view.conversions[0][0], 'saved-replacement')
})

test('saved request with failed notification offers a call without inviting resubmission', async () => {
  const view = form({ success: true, leadId: 'saved-replacement', notified: false })
  await view.descendants(view.render()).find(n => n.type === 'form').props.onSubmit({ preventDefault() {} })
  const result = view.render()
  assert.match(view.text(result), /request is saved.*could not notify the team/)
  assert.ok(view.descendants(result).some(n => n.type === 'a' && n.props.href === 'tel:+12393325707'))
  assert.ok(!view.descendants(result).some(n => n.type === 'form'))
  assert.equal(view.conversions.length, 1)
})

test('rejected request keeps the form and shows the error without a conversion', async () => {
  const view = form({ success: false, errors: { firstName: 'Required' }, error: 'Please correct the highlighted fields.' })
  await view.descendants(view.render()).find(n => n.type === 'form').props.onSubmit({ preventDefault() {} })
  const result = view.render()
  assert.ok(view.descendants(result).some(n => n.type === 'form'))
  assert.ok(view.descendants(result).some(n => n.props.role === 'alert'))
  assert.equal(view.conversions.length, 0)
})

test('inspection request has a matching selected option and submits that service', async () => {
  const view = form({ success: true, leadId: 'saved-inspection', notified: true }, { defaultService: 'inspection', formId: 'inspection' })
  const nodes = view.descendants(view.render())
  const select = nodes.find(n => n.type === 'select' && n.props.name === 'service')
  assert.equal(select.props.value, 'inspection')
  const option = view.descendants(select).find(n => n.type === 'option' && n.props.value === select.props.value)
  assert.equal(view.text(option), 'Roof Inspection')
  await nodes.find(n => n.type === 'form').props.onSubmit({ preventDefault() {} })
  assert.equal(view.submissions[0].service, 'inspection')
  assert.equal(view.conversions[0][1].form_id, 'inspection')
  assert.equal(view.conversions[0][1].service, 'inspection')
})

test('changing the inspection service updates the submitted inquiry and conversion label', async () => {
  const view = form({ success: true, leadId: 'saved-repair', notified: true }, { defaultService: 'inspection', formId: 'inspection' })
  view.descendants(view.render()).find(n => n.type === 'select' && n.props.name === 'service').props.onChange({ target: { name: 'service', value: 'repairs' } })
  await view.descendants(view.render()).find(n => n.type === 'form').props.onSubmit({ preventDefault() {} })
  assert.equal(view.submissions[0].service, 'repairs')
  assert.equal(view.conversions[0][1].service, 'repairs')
})
