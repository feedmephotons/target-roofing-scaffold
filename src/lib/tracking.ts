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
 *  - GA4 (gtag): accepts arbitrary params, so we attach the full UTM attribution.
 *  - OpenAI pixel (oaiq): validates event props against a strict allowlist, so we
 *    send only its supported shape (never raw utm_* keys, which it would reject).
 *
 * OpenAI event taxonomy (from the oaiq SDK):
 *   lead_created  -> standard customer_action  (form / estimate submissions)
 *   custom + custom_event_name                 (call clicks — no standard "call" event)
 *   page_viewed   -> auto-fired by the pixel on init; re-fired on SPA route change
 */

function fireGa(event: string, params: Record<string, unknown>): void {
  try {
    window.gtag?.('event', event, { ...params, ...(getAttribution() || {}) })
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

/** Successful contact/estimate form submission. */
export function trackLead(params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  fireGa('generate_lead', params)
  fireOaiqMeasure('lead_created', { type: 'customer_action' })
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
