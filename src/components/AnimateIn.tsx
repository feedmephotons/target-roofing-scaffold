'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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
    return () => observer.disconnect()
  }, [threshold])

  const { from, to } = animationStyles[animation]

  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      className={`transition-all ease-out ${visible ? to : from} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
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
