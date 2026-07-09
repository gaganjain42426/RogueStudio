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
  /** Start downloading (but not playing) this far before the element enters the viewport. */
  preloadMargin?: string
  /** Only play/pause within this margin — kept tight so off-screen videos never decode. */
  playMargin?: string
  /**
   * Press-and-hold unmutes the clip (mouse pointers only — a pointerdown is a
   * user gesture, so the browser allows audio). Release re-mutes.
   */
  unmuteOnHold?: boolean
  ariaHidden?: boolean
}

/**
 * LazyVideo — an autoplaying, muted, looping video that:
 *   • starts downloading well before it reaches the viewport (preloadMargin) so playback
 *     feels instant once it scrolls into view,
 *   • only decodes/plays while actually on-screen (playMargin), pausing when scrolled away,
 *   • shows a poster for instant first paint,
 *   • stays paused entirely under prefers-reduced-motion.
 *
 * Two separate observers so a large preload distance doesn't also mean a dozen
 * off-screen videos decoding at once — that was the original perf problem.
 */
export default function LazyVideo({
  src,
  poster,
  className,
  style,
  preloadMargin = '1000px',
  playMargin = '100px',
  unmuteOnHold = false,
  ariaHidden = false,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false) // near viewport at least once → set src (download)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const preloadIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { rootMargin: preloadMargin, threshold: 0.01 },
    )
    preloadIo.observe(el)

    const playIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduced) el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: playMargin, threshold: 0.01 },
    )
    playIo.observe(el)

    return () => {
      preloadIo.disconnect()
      playIo.disconnect()
    }
  }, [preloadMargin, playMargin, reduced])

  const hold = (e: React.PointerEvent<HTMLVideoElement>, on: boolean) => {
    if (!unmuteOnHold || e.pointerType !== 'mouse') return
    e.currentTarget.muted = !on
  }

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={active ? 'auto' : 'none'}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
      className={className}
      style={style}
      onPointerDown={(e) => hold(e, true)}
      onPointerUp={(e) => hold(e, false)}
      onPointerLeave={(e) => hold(e, false)}
      onCanPlay={(e) => {
        if (!reduced) e.currentTarget.play().catch(() => {})
      }}
    />
  )
}
