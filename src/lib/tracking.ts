/**
 * Ad + conversion tracking for the ChatGPT Ads campaign.
 *
 * Fires every conversion to BOTH Google Analytics 4 (window.gtag) and the
 * OpenAI Ads pixel (window.oaiq) — each is a safe no-op if that tag isn't
 * loaded, so nothing throws before the pixel/GA IDs are configured.
 *
 * Attribution (UTM params + the OpenAI click id) is captured on first landing
 * and preserved for the session, so a lead that submits three pages later is
 * still attributed to the ad that brought them in.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    oaiq?: (...args: unknown[]) => void
  }
}

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

type UtmKey = (typeof UTM_KEYS)[number]
export type Attribution = Partial<Record<UtmKey | 'oai_click_id' | 'landing_page' | 'referrer', string>>

const STORAGE_KEY = 'tr_attribution'

/** Read UTM params (and the OpenAI click id) from the URL and persist them for the session. First-touch wins. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(window.location.search)
    const found: Attribution = {}
    for (const k of UTM_KEYS) {
      const v = params.get(k)
      if (v) found[k] = v.slice(0, 200)
    }
    // OpenAI ad click identifier — param name confirmed against Casey's setup code.
    const oai = params.get('oai_click_id') || params.get('oaiclid') || params.get('utm_id')
    if (oai) found.oai_click_id = oai.slice(0, 200)

    const existing = getAttribution()
    if (UTM_KEYS.some(key => existing?.[key]) || existing?.oai_click_id) return
    // Only (re)write when this landing actually carried campaign params, so
    // first-touch attribution isn't wiped by later internal navigation.
    if (Object.keys(found).length > 0) {
      found.landing_page = window.location.pathname
      found.referrer = (document.referrer || '').slice(0, 300)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...found }))
    } else if (!existing) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ landing_page: window.location.pathname, referrer: (document.referrer || '').slice(0, 300) })
      )
    }
  } catch {
    /* sessionStorage unavailable (private mode, etc.) — tracking is best-effort */
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

/** Human-readable one-liner stored alongside the lead so the admin/CRM sees the source. */
export function attributionSummary(): string {
  const a = getAttribution()
  if (!a) return ''
  const parts: string[] = []
  if (a.landing_page) parts.push(`landing_page=${a.landing_page}`)
  if (a.utm_source) parts.push(`source=${a.utm_source}`)
  if (a.utm_medium) parts.push(`medium=${a.utm_medium}`)
  if (a.utm_campaign) parts.push(`campaign=${a.utm_campaign}`)
  if (a.utm_content) parts.push(`content=${a.utm_content}`)
  if (a.utm_term) parts.push(`term=${a.utm_term}`)
  if (a.oai_click_id) parts.push(`oai_click_id=${a.oai_click_id}`)
  if (a.referrer) parts.push(`referrer=${a.referrer}`)
  return parts.join(' | ')
}

/**
 * Conversion firing. Two sinks with different rules:
 *  - GA4 (gtag): send only event labels, saved-row ID and safe campaign labels.
 *  - OpenAI pixel (oaiq): validates event props against a strict allowlist, so we
 *    send only its supported shape (never raw utm_* keys, which it would reject).
 *
 * OpenAI event taxonomy (from the oaiq SDK):
 *   lead_created  -> standard customer_action  (form / estimate submissions)
 *   custom + custom_event_name                 (call clicks — no standard "call" event)
 *   page_viewed   -> auto-fired by the pixel on init; re-fired on SPA route change
 */

// Campaign labels only. Never send inquiry text, names, email, address or raw referrer URLs.
const GA_PARAM_KEYS = ['form_id', 'service', 'phone_number', 'lead_id']
const GA_CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const
function fireGa(event: string, params: Record<string, unknown>): void {
  try {
    const safe: Record<string, string> = {}
    for (const key of GA_PARAM_KEYS) {
      const value = params[key]
      if (typeof value === 'string' && /^[a-zA-Z0-9_+ -]{1,100}$/.test(value)) safe[key] = value
    }
    const attribution = getAttribution()
    for (const key of GA_CAMPAIGN_KEYS) {
      const value = attribution?.[key]
      if (value && /^[a-zA-Z0-9_ -]{1,100}$/.test(value)) safe[key] = value
    }
    window.gtag?.('event', event, safe)
  } catch {
    /* no-op */
  }
}

/** A unique event id per conversion (used by the OpenAI pixel for de-duplication). */
function eventId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  } catch {
    /* fall through */
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/**
 * Fire an OpenAI pixel conversion via the SDK's measure() API. Verified shape:
 *   oaiq("measure", eventName, eventData, options)
 * eventData carries the required `type`; custom_event_name and event_id go in options.
 */
function fireOaiqMeasure(
  eventName: string,
  data: Record<string, unknown>,
  options: Record<string, unknown> = {}
): void {
  try {
    window.oaiq?.('measure', eventName, data, { event_id: eventId(), ...options })
  } catch {
    /* no-op */
  }
}

/**
 * Successful contact/estimate form submission. Call only after the server confirms the lead
 * was saved, passing the saved lead's ID. The OpenAI event_id is tied to that row
 * (tr-lead-<id>), so each saved lead is reported once and never under a random ID.
 */
const reportedLeads = new Set<string>()

export function trackLead(leadId: string | undefined, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !leadId || reportedLeads.has(leadId)) return
  const key = `tr_lead_${leadId}`
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    /* storage unavailable: still report once for this call */
  }
  reportedLeads.add(leadId)
  fireGa('generate_lead', { ...params, lead_id: leadId })
  fireOaiqMeasure('lead_created', { type: 'customer_action' }, { event_id: `tr-lead-${leadId}` })
}

/** Click on a phone-number link. */
export function trackCallClick(phone: string): void {
  if (typeof window === 'undefined') return
  fireGa('phone_call_click', { phone_number: phone })
  fireOaiqMeasure('custom', { type: 'custom' }, { custom_event_name: 'call_click' })
}

/** Landing / page view for OpenAI attribution (the init snippet does not auto-fire it). */
export function trackPageView(): void {
  if (typeof window === 'undefined') return
  fireOaiqMeasure('page_viewed', { type: 'contents' })
}
