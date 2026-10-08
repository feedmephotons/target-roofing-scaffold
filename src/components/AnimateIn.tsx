'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Animation = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur'

interface AnimateInProps {
  children: ReactNode
  animation?: Animation
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  as?: keyof HTMLElementTagNameMap
}

const animationStyles: Record<Animation, { from: string; to: string }> = {
  'fade-up': {
    from: 'opacity-0 translate-y-8',
    to: 'opacity-100 translate-y-0',
  },
  'fade-down': {
    from: 'opacity-0 -translate-y-8',
    to: 'opacity-100 translate-y-0',
  },
  'fade-left': {
    from: 'opacity-0 translate-x-8',
    to: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    from: 'opacity-0 -translate-x-8',
    to: 'opacity-100 translate-x-0',
  },
  scale: {
    from: 'opacity-0 scale-95',
    to: 'opacity-100 scale-100',
  },
  blur: {
    from: 'opacity-0 blur-sm',
    to: 'opacity-100 blur-0',
  },
}

export default function AnimateIn({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Keep first-screen and no-JavaScript content visible; animate offscreen content only.
    const bounds = el.getBoundingClientRect()
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    setVisible(false)
    return () => observer.disconnect()
  }, [threshold])

  const { from, to } = animationStyles[animation]

  const Element = Tag as ElementType
  return (
    <Element
      ref={ref}
      className={`transition-all ease-out ${visible ? to : from} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Element>
  )
}

export function StaggerChildren({
  children,
  animation = 'fade-up',
  staggerMs = 100,
  duration = 700,
  threshold = 0.1,
  className = '',
}: {
  children: ReactNode[]
  animation?: Animation
  staggerMs?: number
  duration?: number
  threshold?: number
  className?: string
}) {
  return (
    <>
      {children.map((child, i) => (
        <AnimateIn
          key={i}
          animation={animation}
          delay={i * staggerMs}
          duration={duration}
          threshold={threshold}
          className={className}
        >
          {child}
        </AnimateIn>
      ))}
    </>
  )
}
