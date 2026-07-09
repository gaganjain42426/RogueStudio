'use client'

import { useEffect, useState } from 'react'
import { scrollToId } from '@/lib/smooth-scroll'

/**
 * FilmRail — the fixed film-strip navigator on the right edge (desktop only).
 *
 * A sprocket dot per scene, scroll-spied via IntersectionObserver; the mono
 * readout shows the current scene like a timecode. Clicking a dot cuts to
 * that scene.
 */

interface RailScene {
  slug: string
  name: string
}

export default function FilmRail({ scenes }: { scenes: RailScene[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = scenes.findIndex((s) => s.slug === entry.target.id)
            if (idx !== -1) setActive(idx)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const s of scenes) {
      const el = document.getElementById(s.slug)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [scenes])

  const jump = (slug: string) => scrollToId(slug, -60)

  return (
    <nav
      aria-label="Scenes"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-0 lg:flex"
    >
      <span
        className="mb-3 text-[10px] tabular-nums tracking-[0.2em]"
        style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.64)' }}
      >
        {String(active + 1).padStart(2, '0')}/{String(scenes.length).padStart(2, '0')}
      </span>

      {/* Sprocket strip */}
      <div className="flex flex-col items-center gap-2 rounded-full border border-white/12 bg-black/45 px-2 py-3 backdrop-blur-md">
        {scenes.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => jump(s.slug)}
            aria-label={`Scene ${i + 1}: ${s.name}`}
            aria-current={i === active ? 'true' : undefined}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className="block rounded-[3px] transition-all duration-300"
              style={{
                width: i === active ? 10 : 7,
                height: i === active ? 10 : 7,
                background: i === active ? '#fa5c1b' : 'rgba(255,255,255,0.3)',
              }}
            />
            {/* Name tooltip */}
            <span
              className="pointer-events-none absolute right-7 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              {s.name}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
