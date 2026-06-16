'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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
      className="group/card relative flex h-full min-h-[104px] w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.06]"
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
          className="text-[10px] font-bold uppercase leading-tight tracking-[0.16em]"
          style={{ color: brand.accent }}
        >
          {brand.industry}
        </p>
        <p
          className="mt-1 text-lg font-black leading-tight text-white"
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
 * BrandCarousel — a still grid of brand cards (the hero already has the moving
 * name marquee, so these stay put). Cards fade in once on scroll and lift /
 * glow on hover; clicking jumps to that brand's panel.
 */
export default function BrandCarousel({
  brands,
  onJump,
}: {
  brands: BrandItem[]
  onJump: (slug: string) => void
}) {
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

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="inline-block h-px w-8" style={{ background: '#fa5c1b' }} />
          <span
            className="text-[11px] uppercase tracking-[0.28em] text-white/50"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            The Roster · tap a brand to jump in
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((b, i) => (
            <motion.div
              key={b.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <BrandCard brand={b} onJump={onJump} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
