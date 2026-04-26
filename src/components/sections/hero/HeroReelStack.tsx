'use client'

import { motion, useReducedMotion } from 'framer-motion'

const REELS = [
  { id: '1',  src: '/reels/reel-1.mp4',  client: 'Signature Film',  category: 'Brand Film' },
  { id: '2',  src: '/reels/reel-2.mp4',  client: 'Launch Reel',     category: 'Social' },
  { id: '3',  src: '/reels/reel-3.mp4',  client: 'Hook Reel',       category: 'Performance' },
  { id: '4',  src: '/reels/reel-4.mp4',  client: 'Studio Cut',      category: 'Cinematic' },
  { id: '5',  src: '/reels/reel-5.mp4',  client: 'Product Story',   category: 'Ecommerce' },
  { id: '6',  src: '/reels/reel-6.mp4',  client: 'Founder Spot',    category: 'Personal Brand' },
  { id: '7',  src: '/reels/reel-7.mp4',  client: 'Drop Day',        category: 'Campaign' },
  { id: '8',  src: '/reels/reel-8.mp4',  client: 'Hero Frame',      category: 'Brand Film' },
  { id: '9',  src: '/reels/reel-9.mp4',  client: 'Snack Reel',      category: 'Social' },
  { id: '10', src: '/reels/reel-10.mp4', client: 'Closer',          category: 'Performance' },
]

const COL_A = REELS.slice(0, 5)
const COL_B = REELS.slice(5, 10)

function ReelCard({
  src,
  client,
  category,
}: {
  src: string
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
      <video
        src={src}
        muted
        autoPlay
        playsInline
        loop
        preload="none"
        className="w-full h-full object-cover"
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
      <div
        className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8"
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
  reels: typeof REELS
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
 * Kept as a client island because it uses Framer Motion animate (page-load)
 * and CSS custom properties for the infinite scroll animation.
 */
export function HeroReelStack() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      <motion.div
        className="lg:col-span-6 xl:col-span-5 relative w-full"
        initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.6 }}
      >
        <div
          className="relative mx-auto"
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

          <div className="grid grid-cols-2 gap-4 h-full">
            <ReelColumn reels={COL_A} direction="up" duration={28} />
            <div className="translate-y-8">
              <ReelColumn reels={COL_B} direction="down" duration={34} delay={0.4} />
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
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-label)' }}
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
        @keyframes hero-dot-pulse {
          from { opacity: 0.04; }
          to   { opacity: 0.22; }
        }
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
