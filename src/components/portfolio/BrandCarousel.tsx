'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

export interface BrandItem {
  slug: string
  name: string
  logo: string
  accent: string
  industry: string
}

function BrandCard({ brand, onJump }: { brand: BrandItem; onJump: (slug: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onJump(brand.slug)}
      aria-label={`View ${brand.name} work`}
      className="group/card relative mr-4 flex w-[280px] shrink-0 items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.06]"
    >
      {/* accent glow on hover */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-70"
        style={{ background: brand.accent }}
        aria-hidden="true"
      />
      {/* accent hairline that grows on hover */}
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover/card:w-full"
        style={{ background: brand.accent }}
        aria-hidden="true"
      />

      {/* logo */}
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-lg shadow-black/40">
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={64}
          height={64}
          className="h-full w-full object-contain"
        />
      </div>

      {/* text */}
      <div className="relative min-w-0">
        <p
          className="truncate text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ color: brand.accent }}
        >
          {brand.industry}
        </p>
        <p
          className="mt-1 truncate text-lg font-black leading-tight text-white"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {brand.name}
        </p>
        <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-white/40 transition-colors group-hover/card:text-white/75">
          View work
          <span className="transition-transform duration-300 group-hover/card:translate-x-1">→</span>
        </span>
      </div>
    </button>
  )
}

/**
 * BrandCarousel — a continuously scrolling marquee of brand cards.
 * Pauses on hover/focus so cards can be clicked; clicking jumps to that brand's
 * panel. Edge-faded with a mask; falls back to a manual scroll strip under
 * reduced-motion.
 */
export default function BrandCarousel({
  brands,
  onJump,
}: {
  brands: BrandItem[]
  onJump: (slug: string) => void
}) {
  const reduced = useReducedMotion()
  // Duplicate the set so the marquee can loop seamlessly (-50% == one full set).
  const items = reduced ? brands : [...brands, ...brands]

  const cards = items.map((b, i) => <BrandCard key={`${b.slug}-${i}`} brand={b} onJump={onJump} />)

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#0D0D0D] py-16 md:py-20">
      {/* faint depth glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(250,92,27,0.12), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto mb-10 max-w-[1440px] px-6 md:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-block h-px w-8" style={{ background: '#fa5c1b' }} />
          <span
            className="text-[11px] uppercase tracking-[0.28em] text-white/50"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            The Roster · tap a brand to jump in
          </span>
        </div>
      </div>

      {/* edge-faded marquee */}
      <div
        className="group relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
        }}
      >
        {reduced ? (
          <div className="overflow-x-auto">
            <div className="flex w-max px-6">{cards}</div>
          </div>
        ) : (
          <div className="flex w-max animate-vault-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            {cards}
          </div>
        )}
      </div>
    </section>
  )
}
