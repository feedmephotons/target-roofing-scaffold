'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null,
})

export default function DelayedChatWidget() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null
  return <ChatWidget />
}
