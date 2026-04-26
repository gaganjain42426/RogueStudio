'use client'

import { useRef, useEffect, useState } from 'react'

interface CountUpClientProps {
  target: number
  suffix?: string
}

/**
 * CountUpClient — animates a number from 0 to `target` when it enters the viewport.
 * Extracted from About.tsx so the surrounding content can be server-rendered.
 */
export function CountUpClient({ target, suffix = '' }: CountUpClientProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const step = 16
          const increment = target / (duration / step)
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + increment, target)
            setCount(Math.floor(current))
            if (current >= target) clearInterval(timer)
          }, step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      <span
        className="text-5xl font-black text-primary-container"
        style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
      >
        {count}
        {suffix}
      </span>
    </div>
  )
}
