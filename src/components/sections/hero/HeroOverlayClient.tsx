'use client'

import { motion, useReducedMotion } from 'framer-motion'

const COLS = 40
const ROWS = 26
const dots = Array.from({ length: COLS * ROWS }, (_, i) => ({
  x: (i % COLS) * 40 + 20,
  y: Math.floor(i / COLS) * 40 + 20,
  duration: 2 + (i % 13) * 0.23,
  delay: (i % 17) * 0.18,
}))

/**
 * HeroOverlayClient — decorative background elements only.
 * Both are aria-hidden, so no SEO impact from client-rendering.
 * Contains the dot grid (CSS animation) and the ROGUE watermark (Framer Motion).
 */
export function HeroOverlayClient() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      {/* Animated dot grid */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox={`0 0 ${COLS * 40} ${ROWS * 40}`}
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={1.2}
            fill="#fa5c1b"
            style={{
              opacity: 0.1,
              animation: prefersReduced
                ? 'none'
                : `hero-dot-pulse ${dot.duration.toFixed(2)}s ease-in-out ${dot.delay.toFixed(2)}s infinite alternate`,
            }}
          />
        ))}
      </svg>

      {/* Giant "ROGUE" watermark — decorative */}
      <div
        className="absolute inset-0 flex items-center justify-start pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <motion.span
          className="text-[26vw] md:text-[20vw] font-black text-white leading-none whitespace-nowrap -translate-x-[6vw]"
          style={{ fontFamily: 'var(--font-headline)', opacity: 0.035 }}
          animate={prefersReduced ? {} : { x: ['-2%', '2%'] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        >
          ROGUE
        </motion.span>
      </div>
    </>
  )
}
