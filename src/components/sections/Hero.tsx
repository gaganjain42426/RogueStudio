import Link from 'next/link'
import { HeroOverlayClient } from './hero/HeroOverlayClient'
import { HeroReelStack } from './hero/HeroReelStack'
import { HeroScrollIndicator } from './hero/HeroScrollIndicator'
import { AnimateIn } from '@/components/ui/AnimateIn'
import type { BunnyReel } from '@/lib/bunny'

/**
 * Hero — Server Component.
 *
 * Island architecture:
 *   - H1, paragraph, CTAs, meta strip: server-rendered HTML (crawlable)
 *   - Decorative overlays (dot grid, watermark): HeroOverlayClient
 *   - Video reel stack + entry animation: HeroReelStack
 *   - Scroll indicator: HeroScrollIndicator
 *
 * The `heroSlide` variant keeps opacity:1 in SSR HTML so the H1 text
 * is visible to crawlers on the first HTML pass.
 */
export default function Hero({ reels }: { reels: BunnyReel[] }) {
  return (
    <header
      className="relative min-h-screen overflow-hidden pt-24 md:pt-28"
      style={{ background: '#0D0D0D' }}
    >
      <HeroOverlayClient />

      {/* Radial vignette — purely static, no JS */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 30% 60%, transparent 10%, rgba(13,13,13,0.9) 80%, #0D0D0D 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-16 md:pb-24 min-h-[calc(100vh-7rem)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* LEFT: server-rendered copy + CTAs */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">

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

          <div className="flex flex-col">
            <AnimateIn delay={0.2} variant="heroSlide">
              <h1
                className="font-black text-white tracking-tighter"
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'clamp(48px, 9.5vw, 160px)',
                }}
              >
                <span className="block leading-[0.88]">
                  SCROLL<span style={{ color: '#fa5c1b' }}>-</span>STOPPING
                </span>
                <span
                  className="block italic leading-[0.9] mt-1"
                  style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}
                >
                  Content.
                </span>
              </h1>
            </AnimateIn>
          </div>

          <AnimateIn delay={1.0}>
            <div
              className="mt-8 h-px"
              style={{ width: 180, background: 'rgba(250, 92, 27, 0.4)' }}
            />
          </AnimateIn>

          <AnimateIn delay={1.15}>
            <p
              className="mt-8 max-w-[540px] text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(229, 226, 225, 0.78)' }}
            >
              200+ reels. 40M+ views. Shot, edited, and shipped from our studio in
              Jaipur — then backed by the ads that turn views into customers.
              These are live client clips playing beside you.
            </p>
          </AnimateIn>

          <AnimateIn delay={1.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5"
                style={{
                  background: '#fa5c1b',
                  color: '#0D0D0D',
                  fontFamily: 'var(--font-headline)',
                  boxShadow: '0 10px 30px -10px rgba(250,92,27,0.6)',
                }}
              >
                See the Work
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

          <AnimateIn delay={1.5}>
            <div
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.64)' }}
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
                10X Peak Return on Ad Spend
              </span>
            </div>
          </AnimateIn>
        </div>

        {/* RIGHT: reel stack — client island */}
        <HeroReelStack reels={reels} />
      </div>

      <HeroScrollIndicator />
    </header>
  )
}
