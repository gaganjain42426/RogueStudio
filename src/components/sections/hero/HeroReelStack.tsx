'use client'

import { motion, useReducedMotion } from 'framer-motion'
import LazyVideo from '@/components/LazyVideo'
import Icon from '@/components/ui/Icon'
import type { BunnyReel } from '@/lib/bunny'

function ReelCard({
  src,
  poster,
  client,
  category,
}: {
  src: string
  poster: string
  client: string
  category: string
}) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 group"
      style={{
        width: '100%',
        aspectRatio: '9 / 16',
        borderRadius: '18px',
        background: '#1c1b1b',
        boxShadow: '0 20px 40px -20px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04) inset',
      }}
    >
      <LazyVideo
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        unmuteOnHold
        ariaHidden
      />
      <div
        className="absolute top-3 left-3 px-2 py-0.5 text-[10px] tracking-[0.18em] uppercase rounded-full"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          color: '#fa5c1b',
          fontFamily: 'var(--font-label)',
          border: '1px solid rgba(250,92,27,0.25)',
        }}
      >
        {category}
      </div>

      {/* Hold-for-sound hint — desktop hover only, non-interactive */}
      <div
        className="pointer-events-none absolute top-3 right-3 hidden md:flex items-center gap-1.5 rounded-full px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          color: 'rgba(255,255,255,0.85)',
        }}
        aria-hidden="true"
      >
        <Icon name="volume" size={12} />
        <span
          className="text-[9px] tracking-[0.14em] uppercase"
          style={{ fontFamily: 'var(--font-label)' }}
        >
          Hold for sound
        </span>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)' }}
      >
        <p
          className="text-white text-sm font-semibold leading-tight"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {client}
        </p>
      </div>
    </div>
  )
}

function ReelColumn({
  reels,
  direction,
  duration,
  delay = 0,
}: {
  reels: BunnyReel[]
  direction: 'up' | 'down'
  duration: number
  delay?: number
}) {
  const doubled = [...reels, ...reels]
  const animClass = direction === 'up' ? 'hero-reel-col-up' : 'hero-reel-col-down'

  return (
    <div className="relative overflow-hidden" style={{ height: '100%' }}>
      <div
        className={`flex flex-col gap-4 ${animClass}`}
        style={
          {
            '--reel-duration': `${duration}s`,
            '--reel-delay': `${delay}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((reel, i) => (
          <ReelCard
            key={`${reel.id}-${i}`}
            src={reel.src}
            poster={reel.poster}
            client={reel.client}
            category={reel.category}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * HeroReelStack — the right-column video reel grid + entry animation.
 * Client island: Framer Motion page-load animation + CSS custom properties
 * for the infinite scroll. Mobile renders a single column (half the videos,
 * half the decode/data cost on cellular).
 */
export function HeroReelStack({ reels }: { reels: BunnyReel[] }) {
  const prefersReduced = useReducedMotion()
  const colA = reels.filter((_, i) => i % 2 === 0)
  const colB = reels.filter((_, i) => i % 2 === 1)

  return (
    <>
      <motion.div
        className="lg:col-span-6 xl:col-span-5 relative w-full"
        initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      >
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            height: 'clamp(440px, 72vh, 720px)',
            maxWidth: 560,
            transform: 'rotate(-3deg)',
            transformOrigin: 'center',
          }}
        >
          <div
            className="absolute inset-0 -z-10 blur-3xl opacity-40"
            style={{
              background: 'radial-gradient(ellipse at 60% 50%, rgba(250,92,27,0.35), transparent 60%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            <ReelColumn reels={colA} direction="up" duration={48} />
            <div className="hidden sm:block translate-y-8">
              <ReelColumn reels={colB} direction="down" duration={58} delay={0.4} />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24"
            style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, rgba(13,13,13,0.6) 60%, transparent 100%)' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.6) 60%, transparent 100%)' }}
            aria-hidden="true"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 justify-end mt-6 pr-2">
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.64)', fontFamily: 'var(--font-label)' }}
          >
            Live from the studio
          </span>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#fa5c1b' }}
          />
        </div>
      </motion.div>

      {/* CSS keyframes for reel column animation */}
      <style>{`
        @keyframes hero-reel-scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes hero-reel-scroll-down {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .hero-reel-col-up {
          animation: hero-reel-scroll-up var(--reel-duration, 30s) linear infinite;
          animation-delay: var(--reel-delay, 0s);
          will-change: transform;
        }
        .hero-reel-col-down {
          animation: hero-reel-scroll-down var(--reel-duration, 30s) linear infinite;
          animation-delay: var(--reel-delay, 0s);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reel-col-up,
          .hero-reel-col-down {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}
