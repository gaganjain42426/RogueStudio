'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * HeroOverlayClient — decorative background only (aria-hidden).
 *
 * The dot grid is a single static CSS-gradient layer. It previously rendered
 * 1,040 individually-animated <circle> nodes, which forced a full repaint on
 * every frame and was the main source of hero scroll jank — replaced here with
 * one GPU-cheap layer. The ROGUE watermark stays as a single Framer element.
 */
export function HeroOverlayClient() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      {/* Dot grid — one static CSS layer, edge-faded with a mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(250,92,27,0.13) 1.2px, transparent 1.4px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 35% 45%, #000 35%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 35% 45%, #000 35%, transparent 78%)',
        }}
      />

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
