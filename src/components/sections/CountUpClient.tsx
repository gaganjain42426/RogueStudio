'use client'

import { useRef, useEffect } from 'react'

interface CountUpClientProps {
  target: number
  suffix?: string
}

/**
 * CountUpClient — animates a number up to `target` when it enters the viewport.
 *
 * The real figure is what renders: it is in the JSX, so the server-rendered HTML
 * carries it. (It previously started from React state seeded at 0, which meant the
 * page Google indexes read "0+ Projects delivered · 0M+ Views produced".)
 *
 * The count-up then runs as a pure DOM animation over that text. No state, so no
 * re-render can race the SSR value or clobber the animation mid-flight — and a
 * stat that is already on screen at mount is left alone rather than being visibly
 * reset to zero before counting.
 */
export function CountUpClient({ target, suffix = '' }: CountUpClientProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Already in view — the reader would see the number snap back to 0 first.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    const render = (n: number) => {
      el.textContent = `${n}${suffix}`
    }
    render(0)

    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const duration = 1500
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          // easeOutQuad — fast off the mark, settles onto the final figure.
          render(Math.floor(target * (1 - (1 - t) * (1 - t))))
          if (t < 1) raf = requestAnimationFrame(tick)
          else render(target)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      render(target)
    }
  }, [target, suffix])

  return (
    <div>
      <span
        ref={ref}
        className="text-5xl font-black text-primary-container"
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {target}
        {suffix}
      </span>
    </div>
  )
}
