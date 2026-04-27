import Link from 'next/link'
import { HeroOverlayClient } from './hero/HeroOverlayClient'
import { HeroReelStack } from './hero/HeroReelStack'
import { HeroScrollIndicator } from './hero/HeroScrollIndicator'
import { AnimateIn } from '@/components/ui/AnimateIn'

/**
 * Hero â€” Server Component.
 *
 * Island architecture:
 *   â€¢ H1, paragraph, CTAs, meta strip â†’ server-rendered HTML (crawlable by Googlebot)
 *   â€¢ Decorative overlays (dot grid, ROGUE watermark) â†’ HeroOverlayClient
 *   â€¢ Video reel stack + entry animation â†’ HeroReelStack
 *   â€¢ Scroll indicator â†’ HeroScrollIndicator
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

      {/* LAYER 3: Radial vignette â€” purely static, no JS */}
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

        {/* â”€â”€ LEFT: server-rendered copy + CTAs â”€â”€ */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">

          {/* Eyebrow */}
          <AnimateIn delay={0.2}>
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-px" style={{ background: '#fa5c1b' }} />
              <span
                className="text-[11px] md:text-xs tracking-[0.28em] uppercase"
                style={{ fontFamily: 'var(--font-label)', color: '#fa5c1b' }}
              >
                Jaipur Â· Creative Studio
              </span>
            </div>
          </AnimateIn>

          {/* â”€â”€ H1 â€” two staggered lines â”€â”€
              heroSlide variant: opacity stays 1 in SSR HTML â†’ Googlebot reads the text.
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
              into customers â€” for founders and brands who refuse to blend in.
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
                <span className="transition-transform group-hover:translate-x-1">â†’</span>
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
                Jaipur Â· India
              </span>
            </div>
          </AnimateIn>
        </div>

        {/* â”€â”€ RIGHT: reel stack â€” client island â”€â”€ */}
        <HeroReelStack />
      </div>

      <HeroScrollIndicator />
    </header>
  )
}
