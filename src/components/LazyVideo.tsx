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
 *   • starts downloading shortly before it reaches the viewport (preloadMargin) so playback
 *     feels instant once it scrolls into view,
 *   • only decodes/plays while actually on-screen (playMargin), pausing when scrolled away,
 *   • shows a poster for instant first paint,
 *   • stays paused entirely under prefers-reduced-motion.
 *
 * Two separate observers so a large preload distance doesn't also mean a dozen
 * off-screen videos decoding at once — that was the original perf problem.
 *
 * Every path that can start playback is gated on `onScreen`. Browsers cap how many
 * videos can decode at once; once that cap is hit `play()` rejects and the card is
 * stuck on its poster. Pages here mount 50+ clips, so an ungated start — notably
 * `canplay`, which fires whenever buffering completes, on-screen or not — is enough
 * to exhaust the decoder pool and leave visible reels frozen.
 */
export default function LazyVideo({
  src,
  poster,
  className,
  style,
  preloadMargin = '600px',
  playMargin = '100px',
  unmuteOnHold = false,
  ariaHidden = false,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false) // near viewport at least once → set src (download)
  // Mirrors the play observer. A ref, not state, because `canplay` can fire in the
  // same tick the observer updates and must read the current value, not a stale render's.
  const onScreen = useRef(false)
  // Same signal as the ref, as state, so `preload` can react to it. These previews are
  // progressive MP4s (~1.8MB each), so preloading every near-viewport clip at `auto`
  // downloads tens of megabytes the visitor never sees.
  const [visible, setVisible] = useState(false)
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
        onScreen.current = entry.isIntersecting
        setVisible(entry.isIntersecting)
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

  // The play observer fires once, before `src` exists, for anything already on-screen
  // at mount — so that first play() is a no-op. Retry once the source is attached.
  useEffect(() => {
    const el = ref.current
    if (!el || !active || reduced || !onScreen.current) return
    el.play().catch(() => {})
  }, [active, reduced])

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
      preload={active ? (visible ? 'auto' : 'metadata') : 'none'}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
      className={className}
      style={style}
      onPointerDown={(e) => hold(e, true)}
      onPointerUp={(e) => hold(e, false)}
      onPointerLeave={(e) => hold(e, false)}
      onCanPlay={(e) => {
        if (!reduced && onScreen.current) e.currentTarget.play().catch(() => {})
      }}
    />
  )
}
