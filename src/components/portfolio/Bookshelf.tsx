'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export interface Book {
  slug: string
  name: string
  logo: string
  accent: string
}

function BookSpine({
  book,
  index,
  onJump,
}: {
  book: Book
  index: number
  onJump: (slug: string) => void
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onJump(book.slug)}
      aria-label={`Jump to ${book.name}`}
      initial={{ opacity: 0, y: 28, rotateY: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateY: -20 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ rotateY: 0, y: -18, scale: 1.05 }}
      className="group relative z-0 -ml-4 shrink-0 first:ml-0 hover:z-20 focus:z-20 focus:outline-none md:-ml-5"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative flex h-[210px] w-[108px] flex-col items-center justify-between overflow-hidden rounded-l-sm rounded-r-md p-3 shadow-[0_22px_45px_-15px_rgba(0,0,0,0.85)] transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.9)] md:h-[248px] md:w-[122px]"
        style={{ background: `linear-gradient(155deg, ${book.accent} 0%, #161616 115%)` }}
      >
        {/* spine shading */}
        <span className="absolute inset-y-0 left-0 w-2.5 bg-black/35" aria-hidden="true" />
        <span className="absolute inset-y-0 left-2.5 w-px bg-white/25" aria-hidden="true" />
        {/* page edges on the right */}
        <span className="absolute inset-y-1 right-0 w-1 rounded-r-md bg-white/15" aria-hidden="true" />

        {/* logo chip */}
        <div className="mt-1.5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-white/95 p-1.5">
          <Image
            src={book.logo}
            alt={`${book.name} logo`}
            width={56}
            height={56}
            className="h-full w-full object-contain"
          />
        </div>

        {/* brand name */}
        <span
          className="mb-1 text-center text-[11px] font-black uppercase leading-tight tracking-wide text-white drop-shadow"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {book.name}
        </span>

        {/* jump hint on hover */}
        <span className="material-symbols-outlined absolute right-1.5 top-1.5 text-sm text-white/0 transition-colors duration-300 group-hover:text-white/80">
          arrow_downward
        </span>
      </div>
    </motion.button>
  )
}

/**
 * Bookshelf — a row of brand "books" standing on a shelf. Each tilts in 3D and
 * straightens/lifts on hover; clicking smooth-scrolls to that brand's panel.
 */
export default function Bookshelf({
  books,
  onJump,
}: {
  books: Book[]
  onJump: (slug: string) => void
}) {
  return (
    <section className="relative border-b border-white/5 bg-[#0D0D0D] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex items-center gap-3">
          <span className="inline-block h-px w-8" style={{ background: '#fa5c1b' }} />
          <span
            className="text-[11px] uppercase tracking-[0.28em] text-white/50"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            The Shelf · tap a brand to jump in
          </span>
        </div>

        <div className="relative">
          {/* Books */}
          <div
            className="flex items-end justify-start overflow-x-auto pb-8 pl-5 [scrollbar-width:none] md:justify-center md:overflow-visible md:pl-0"
            style={{ perspective: '1500px' }}
          >
            {books.map((b, i) => (
              <BookSpine key={b.slug} book={b} index={i} onJump={onJump} />
            ))}
          </div>

          {/* Shelf plank */}
          <div className="relative">
            <div className="h-[6px] w-full rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="mx-auto -mt-px h-5 w-[88%] rounded-b-[50px] bg-gradient-to-b from-black/50 to-transparent blur-md" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
