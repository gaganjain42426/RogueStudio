'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ActiveReel } from '@/data/portfolio'

interface ReelLightboxProps {
  reel: ActiveReel | null
  onClose: () => void
}

/**
 * ReelLightbox — fullscreen 9:16 reel playback with sound + controls.
 * Closes on backdrop click, the × button, or Escape.
 */
export default function ReelLightbox({ reel, onClose }: ReelLightboxProps) {
  useEffect(() => {
    if (!reel) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // lock scroll while open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [reel, onClose])

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${reel.client} reel`}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px]"
          >
            <div
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl"
              style={{ aspectRatio: '9/16' }}
            >
              <video
                src={reel.src}
                className="h-full w-full object-cover"
                controls
                autoPlay
                loop
                playsInline
              />
            </div>

            {/* meta + actions */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <p
                className="text-lg font-black text-white"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {reel.client}
              </p>
              {reel.instagram && (
                <a
                  href={reel.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20"
                >
                  <span className="material-symbols-outlined text-base">photo_camera</span>
                  Instagram
                </a>
              )}
            </div>
          </motion.div>

          {/* close */}
          <button
            onClick={onClose}
            aria-label="Close reel"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
