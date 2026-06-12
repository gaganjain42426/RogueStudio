'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ResolvedMedia } from '@/data/portfolio'

interface MediaSlotProps {
  media: ResolvedMedia
  /** 'dashboard' tweaks the placeholder icon/label. */
  kind?: 'dashboard' | 'sample'
  className?: string
  /** aspect-ratio utility, e.g. 'aspect-video' or 'aspect-[4/3]'. */
  aspect?: string
}

/**
 * MediaSlot — renders a real image when the file exists in /public,
 * otherwise an elegant labeled placeholder (drop the file at `media.src`
 * and it appears automatically on the next load).
 */
export default function MediaSlot({
  media,
  kind = 'sample',
  className = '',
  aspect = 'aspect-video',
}: MediaSlotProps) {
  if (media.available) {
    return (
      <div className={`relative ${aspect} overflow-hidden rounded-xl bg-surface-container ${className}`}>
        <Image
          src={media.src}
          alt={media.label}
          fill
          sizes="(max-width: 768px) 90vw, 40vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative ${aspect} overflow-hidden rounded-xl border border-dashed border-white/12 bg-white/[0.02] ${className}`}
    >
      {/* shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent group-hover:translate-x-full transition-transform duration-1000" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <span
          className="material-symbols-outlined text-2xl text-white/25"
          aria-hidden="true"
        >
          {kind === 'dashboard' ? 'monitoring' : 'add_photo_alternate'}
        </span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          {media.label}
        </p>
        <p className="text-[10px] text-white/20">
          {kind === 'dashboard' ? 'Dashboard screenshot' : 'Work sample'} · drop-in slot
        </p>
      </div>
    </motion.div>
  )
}
