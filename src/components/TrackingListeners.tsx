'use client'

import { useEffect } from 'react'
import { captureAttribution, fireConversion } from '@/lib/tracking'

/**
 * Mounted once in the root layout. On load it captures the ad attribution
 * (UTMs + OpenAI click id) for the session, then listens site-wide for clicks
 * on any phone-number link and fires a call-click conversion — so every tel:
 * link on every page is tracked without touching each one individually.
 */
export default function TrackingListeners() {
  useEffect(() => {
    captureAttribution()

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const link = el?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null
      if (!link) return
      const phone = link.getAttribute('href')?.replace('tel:', '') ?? ''
      fireConversion('phone_call_click', { phone_number: phone })
    }

    // Capture phase so it still fires if an inner handler stops propagation.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
