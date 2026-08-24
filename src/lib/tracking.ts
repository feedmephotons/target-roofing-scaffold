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
 * Fire a conversion to GA4 and the OpenAI pixel. Attribution is attached
 * automatically. Both tags are optional — this never throws if they're absent.
 */
export function fireConversion(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  const payload = { ...params, ...(getAttribution() || {}) }
  try {
    window.gtag?.('event', event, payload)
  } catch {
    /* no-op */
  }
  try {
    // OpenAI (oaiq) pixel — event-name mapping finalized against Casey's setup code.
    window.oaiq?.('track', event, payload)
  } catch {
    /* no-op */
  }
}
