'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, ShieldCheck } from 'lucide-react'

interface PortalButtonProps {
  /** Full-width pill for the mobile menu; inline pill for the desktop nav. */
  fullWidth?: boolean
  /** Called right before navigating (e.g. to close the mobile menu). */
  onNavigate?: () => void
}

/**
 * Customer Login button with a hidden staff entrance: press and hold for 3
 * seconds and the pill flips to reveal "Admin Portal" on its back face. Once
 * flipped, a click routes to /admin instead of /portal.
 */
export default function PortalButton({ fullWidth = false, onNavigate }: PortalButtonProps) {
  const router = useRouter()
  const [flipped, setFlipped] = useState(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // True only for the release that completes the hold, so it doesn't navigate.
  const justFlipped = useRef(false)

  const clearHold = useCallback(() => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }, [])

  const startHold = useCallback(() => {
    if (flipped) return
    clearHold()
    holdTimer.current = setTimeout(() => {
      setFlipped(true)
      justFlipped.current = true
    }, 3000)
  }, [flipped, clearHold])

  useEffect(() => () => clearHold(), [clearHold])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      // Swallow the click that ends the flip-hold; keep the admin side showing.
      if (justFlipped.current) {
        justFlipped.current = false
        return
      }
      onNavigate?.()
      router.push(flipped ? '/admin' : '/portal')
    },
    [flipped, onNavigate, router]
  )

  const faceBase =
    'absolute inset-0 flex items-center justify-center gap-2 rounded text-sm font-bold uppercase tracking-wide font-[family-name:var(--font-display)]'

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerDown={startHold}
      onPointerUp={clearHold}
      onPointerLeave={clearHold}
      onPointerCancel={clearHold}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={flipped ? 'Enter Admin Portal' : 'Customer Login'}
      className={`relative select-none rounded shadow-md ${
        fullWidth ? 'mt-4 h-[3.25rem] w-full' : 'ml-4 h-11 w-[13.5rem]'
      }`}
      style={{ perspective: '1000px', touchAction: 'manipulation' }}
    >
      <span
        className="block h-full w-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front — Customer Login */}
        <span
          className={`${faceBase} bg-[var(--red)] text-white`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <LogIn className="h-4 w-4" />
          Customer Login
        </span>
        {/* Back — Admin Portal */}
        <span
          className={`${faceBase} border border-[var(--red)]/50 bg-gradient-to-r from-gray-900 to-black text-white`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <ShieldCheck className="h-4 w-4 text-[var(--red)]" />
          Admin Portal
        </span>
      </span>
    </button>
  )
}
