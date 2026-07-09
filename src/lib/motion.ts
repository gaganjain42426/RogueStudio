/**
 * Motion tokens — the single source of truth for the site's motion language.
 *
 * One cinematic ease, three durations, used everywhere. Individual sections
 * never invent their own curves; a consistent hand is what separates a motion
 * system from scattered animations.
 */

/** Signature ease — a heavy cinematic settle (fast in, long decelerate). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const DUR = {
  /** Micro-interactions: hovers, chips, small fades. */
  fast: 0.35,
  /** Standard element reveals. */
  base: 0.7,
  /** Hero moments and large surface transitions. */
  slow: 1.1,
} as const

/** Shared viewport config for whileInView reveals. */
export const VIEWPORT = { once: true, margin: '-80px' } as const
