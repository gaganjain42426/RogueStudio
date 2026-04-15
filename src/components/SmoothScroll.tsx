'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useAnimationFrame } from 'framer-motion'

// ease-in-out-cubic
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) return
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: easeInOutCubic,
    })

    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return <div>{children}</div>
}
