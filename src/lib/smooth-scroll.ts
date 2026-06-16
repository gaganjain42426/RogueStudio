import type Lenis from 'lenis'

/**
 * Tiny registry so non-wrapper components (e.g. the portfolio bookshelf) can
 * drive the single Lenis instance owned by <SmoothScroll>. Falls back to native
 * smooth scrolling when Lenis is disabled (touch devices, reduced-motion).
 */
let instance: Lenis | null = null

export function setLenis(l: Lenis | null): void {
  instance = l
}

/** Smooth-scroll to an element id, offset to clear the fixed nav + filter bar. */
export function scrollToId(id: string, offset = -120): void {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return

  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.2 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
