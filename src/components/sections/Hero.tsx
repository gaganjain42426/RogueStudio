import Link from 'next/link'
import { HeroOverlayClient } from './hero/HeroOverlayClient'
import { HeroReelStack } from './hero/HeroReelStack'
import { HeroScrollIndicator } from './hero/HeroScrollIndicator'
import { AnimateIn } from '@/components/ui/AnimateIn'

/**
 * Hero — Server Component.
 *
 * Island architecture:
 *   • H1, paragraph, CTAs, meta strip → server-rendered HTML (crawlable by Googlebot)
 *   • Decorative overlays (dot grid, ROGUE watermark) → HeroOverlayClient
 *   • Video reel stack + entry animation → HeroReelStack
 *   • Scroll indicator → HeroScrollIndicator
 *
 * The `heroSlide` variant keeps opacity:1 in SSR HTML so the H1 text
 * is visible to crawlers on the first HTML pass.
 */
export default function Hero() {
  return (
    <header
      className="relative min-h-screen overflow-hidden pt-24 md:pt-28"
      style={{ background: '#0D0D0D' }}
    >
      {/* LAYER 1 & 2: decorative client-only overlays (aria-hidden) */}
      <HeroOverlayClient />

      {/* LAYER 3: Radial vignette — purely static, no JS */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 30% 60%, transparent 10%, rgba(13,13,13,0.9) 80%, #0D0D0D 100%)',
        }}
        aria-hidden="true"
      />

      {/* LAYER 4: Main content grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-16 md:pb-24 min-h-[calc(100vh-7rem)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* ── LEFT: server-rendered copy + CTAs ── */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">

          {/* Eyebrow */}
          <AnimateIn delay={0.2}>
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-px" style={{ background: '#fa5c1b' }} />
              <span
                className="text-[11px] md:text-xs tracking-[0.28em] uppercase"
                style={{ fontFamily: 'var(--font-label)', color: '#fa5c1b' }}
              >
                Jaipur · Creative Studio
              </span>
            </div>
          </AnimateIn>

          {/* ── H1 — two staggered lines ──
              heroSlide variant: opacity stays 1 in SSR HTML → Googlebot reads the text.
              Only y + skewY animate (transform), not opacity.               */}
          <div className="flex flex-col">
            <AnimateIn delay={0.2} variant="heroSlide">
              <h1
                className="font-black text-white leading-[0.88] tracking-tighter"
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'clamp(56px, 9.5vw, 160px)',
                }}
              >
                SCROLL<span style={{ color: '#fa5c1b' }}>-</span>STOPPING
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.34} variant="heroSlide">
              <h1
                className="italic leading-[0.9] tracking-tighter mt-1"
                style={{
                  fontFamily: 'var(--font-serif-accent)',
                  fontSize: 'clamp(56px, 9.5vw, 160px)',
                  color: '#fa5c1b',
                }}
              >
                Content.
              </h1>
            </AnimateIn>
          </div>

          {/* Decorative rule */}
          <AnimateIn delay={1.0}>
            <div
              className="mt-8 h-px"
              style={{ width: 180, background: 'rgba(250, 92, 27, 0.4)' }}
            />
          </AnimateIn>

          {/* Body paragraph */}
          <AnimateIn delay={1.15}>
            <p
              className="mt-8 max-w-[540px] text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(229, 226, 225, 0.72)' }}
            >
              We produce reels, social content and cinematic brand films that turn scrolls
              into customers — for founders and brands who refuse to blend in.
            </p>
          </AnimateIn>

          {/* CTAs */}
          <AnimateIn delay={1.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5"
                style={{
                  background: '#fa5c1b',
                  color: '#0D0D0D',
                  fontFamily: 'var(--font-headline)',
                  boxShadow: '0 10px 30px -10px rgba(250,92,27,0.6)',
                }}
              >
                See Our Work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-colors"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Book a Call
              </Link>
            </div>
          </AnimateIn>

          {/* Meta strip */}
          <AnimateIn delay={1.5}>
            <div
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.4)' }}
            >
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#fa5c1b' }} />
                200+ Reels Produced
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#fa5c1b' }} />
                40M+ Views Delivered
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#fa5c1b' }} />
                Jaipur · India
              </span>
            </div>
          </AnimateIn>
        </div>

        {/* ── RIGHT: reel stack — client island ── */}
        <HeroReelStack />
      </div>

      <HeroScrollIndicator />
    </header>
  )
}


/* ─────────────────────────────────────────────────────────────
   Reel source list — reused from /public/reels
   Two offset columns scroll in opposite directions to create
   a film-strip feel anchored to the right side of the hero.
   ───────────────────────────────────────────────────────────── */
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

/* ─── Dot grid (kept from previous hero, softened) ─── */
const COLS = 40
const ROWS = 26
const dots = Array.from({ length: COLS * ROWS }, (_, i) => ({
  x: (i % COLS) * 40 + 20,
  y: Math.floor(i / COLS) * 40 + 20,
  duration: 2 + (i % 13) * 0.23,
  delay: (i % 17) * 0.18,
}))

/* ─── Headline motion variants ─── */
const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const lineVariants = {
  hidden: { opacity: 0, y: 80, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

/* ─────────────────────────────────────────────────────────────
   Reel card
   ───────────────────────────────────────────────────────────── */
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
        boxShadow:
          '0 20px 40px -20px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04) inset',
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
      {/* Corner tag */}
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
      {/* Bottom meta */}
      <div
        className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
        }}
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

/* ─────────────────────────────────────────────────────────────
   Reel column — CSS-animated infinite vertical scroll
   ───────────────────────────────────────────────────────────── */
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
  const animClass =
    direction === 'up' ? 'hero-reel-col-up' : 'hero-reel-col-down'

  return (
    <div className="relative overflow-hidden" style={{ height: '100%' }}>
      <div
        className={`flex flex-col gap-4 ${animClass}`}
        style={{
          ['--reel-duration' as string]: `${duration}s`,
          ['--reel-delay' as string]: `${delay}s`,
        } as React.CSSProperties}
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

/* ─────────────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <header
      className="relative min-h-screen overflow-hidden pt-24 md:pt-28"
      style={{ background: '#0D0D0D' }}
    >
      {/* ── LAYER 1: Animated dot grid (softer than before) ── */}
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

      {/* ── LAYER 2: Giant "ROGUE" watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-start pl-[-8vw] pointer-events-none select-none z-0"
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

      {/* ── LAYER 3: Radial vignette ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 30% 60%, transparent 10%, rgba(13,13,13,0.9) 80%, #0D0D0D 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── LAYER 4: Main content grid ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-16 md:pb-24 min-h-[calc(100vh-7rem)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* LEFT — copy + CTAs */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ background: '#fa5c1b' }}
            />
            <span
              className="text-[11px] md:text-xs tracking-[0.28em] uppercase"
              style={{ fontFamily: 'var(--font-label)', color: '#fa5c1b' }}
            >
              Jaipur · Creative Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={headlineVariants}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1
              variants={lineVariants}
              className="font-black text-white leading-[0.88] tracking-tighter"
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(56px, 9.5vw, 160px)',
              }}
            >
              SCROLL<span style={{ color: '#fa5c1b' }}>-</span>STOPPING
            </motion.h1>

            <motion.h1
              variants={lineVariants}
              className="italic leading-[0.9] tracking-tighter mt-1"
              style={{
                fontFamily: 'var(--font-serif-accent)',
                fontSize: 'clamp(56px, 9.5vw, 160px)',
                color: '#fa5c1b',
              }}
            >
              Content.
            </motion.h1>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="mt-8 h-px"
            style={{
              width: 180,
              background: 'rgba(250, 92, 27, 0.4)',
              transformOrigin: 'left',
            }}
            initial={prefersReduced ? {} : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
          />

          {/* Paragraph */}
          <motion.p
            className="mt-8 max-w-[540px] text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(229, 226, 225, 0.72)' }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 1.15 }}
          >
            We produce reels, social content and cinematic brand films that turn scrolls
            into customers — for founders and brands who refuse to blend in.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 1.3 }}
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5"
              style={{
                background: '#fa5c1b',
                color: '#0D0D0D',
                fontFamily: 'var(--font-headline)',
                boxShadow: '0 10px 30px -10px rgba(250,92,27,0.6)',
              }}
            >
              See Our Work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-colors"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Book a Call
            </Link>
          </motion.div>

          {/* Meta strip */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.4)' }}
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: '#fa5c1b' }}
              />
              200+ Reels Produced
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: '#fa5c1b' }}
              />
              40M+ Views Delivered
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: '#fa5c1b' }}
              />
              Jaipur · India
            </span>
          </motion.div>
        </div>

        {/* RIGHT — reel stack */}
        <motion.div
          className="lg:col-span-6 xl:col-span-5 relative w-full"
          initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
        >
          <div
            className="relative mx-auto"
            style={{
              // fixed reel-stack height; scaled by viewport on large screens
              height: 'clamp(440px, 72vh, 720px)',
              maxWidth: 560,
              transform: 'rotate(-3deg)',
              transformOrigin: 'center',
            }}
          >
            {/* Soft glow behind the stack */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse at 60% 50%, rgba(250,92,27,0.35), transparent 60%)',
              }}
              aria-hidden="true"
            />

            {/* Two-column grid */}
            <div className="grid grid-cols-2 gap-4 h-full">
              <ReelColumn reels={COL_A} direction="up" duration={28} />
              <div className="translate-y-8">
                <ReelColumn reels={COL_B} direction="down" duration={34} delay={0.4} />
              </div>
            </div>

            {/* Top & bottom fade masks */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-24"
              style={{
                background:
                  'linear-gradient(to bottom, #0D0D0D 0%, rgba(13,13,13,0.6) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  'linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.6) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Floating caption under stack */}
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
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.3em] text-white/40 uppercase"
          style={{ fontFamily: 'var(--font-label)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-white/30"
          style={{ height: 36 }}
          animate={prefersReduced ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>

      {/* ── Keyframes ── */}
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
    </header>
  )
}
