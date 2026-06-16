'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'

interface LazyVideoProps {
  /** The video source to play (use the small preview path for backgrounds). */
  src: string
  /** Poster image shown before/while the video loads — gives instant paint. */
  poster?: string
  className?: string
  style?: CSSProperties
  /** Start loading this far before the element enters the viewport. */
  rootMargin?: string
  ariaHidden?: boolean
}

/**
 * LazyVideo — an autoplaying, muted, looping video that:
 *   • only sets its `src` (downloads) once it nears the viewport,
 *   • only plays while actually on-screen (pauses when scrolled away),
 *   • shows a poster for instant first paint,
 *   • stays paused entirely under prefers-reduced-motion.
 *
 * This is the core fix for "too many videos decoding at once" — at any moment
 * only the handful of reels actually visible are using the video decoder.
 */
export default function LazyVideo({
  src,
  poster,
  className,
  style,
  rootMargin = '300px',
  ariaHidden = false,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false) // has entered viewport at least once → set src
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          if (!reduced) el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, reduced])

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
      className={className}
      style={style}
      onCanPlay={(e) => {
        if (!reduced) e.currentTarget.play().catch(() => {})
      }}
    />
  )
}
