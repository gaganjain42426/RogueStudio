'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ActiveReel } from '@/data/portfolio'
import Icon from '@/components/ui/Icon'

interface ReelLightboxProps {
  reel: ActiveReel | null
  onClose: () => void
}

/**
 * ReelLightbox — fullscreen 9:16 reel playback with sound + controls.
 *
 * Accessibility: focus moves into the dialog on open, Tab is trapped inside,
 * Escape closes, and focus returns to whatever opened it. Scroll is locked
 * while open.
 */
export default function ReelLightbox({ reel, onClose }: ReelLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!reel) return

    restoreRef.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'

    // Move focus into the dialog once it mounts.
    const focusTimer = requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>('button, [href], video[controls]')
        ?.focus()
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      // Trap Tab inside the dialog.
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], video[controls], [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(focusTimer)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      restoreRef.current?.focus?.()
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
            ref={dialogRef}
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
                  <Icon name="instagram" size={16} />
                  Instagram
                </a>
              )}
            </div>

            {/* close — inside the dialog so the focus trap covers it */}
            <button
              onClick={onClose}
              aria-label="Close reel"
              className="absolute -right-2 -top-14 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:-right-14 md:-top-2"
            >
              <Icon name="close" size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
