'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VaultEntranceProps {
  onEnter: () => void
}

export default function VaultEntrance({ onEnter }: VaultEntranceProps) {
  const [progress, setProgress] = useState(0)
  const [loadingDone, setLoadingDone] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const duration = 2800
    const interval = 30
    const step = 100 / (duration / interval)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoadingDone(true), 300)
          return 100
        }
        return Math.min(prev + step + Math.random() * 0.5, 100)
      })
    }, interval)
    return () => clearInterval(timer)
  }, [])

  const handleEnter = () => {
    setExiting(true)
    setTimeout(onEnter, 800)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background"
          exit={{ clipPath: 'inset(50% 0 50% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Corner frame markers */}
          <div className="absolute inset-6 md:inset-12 pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10" />
          </div>

          {/* Loading counter */}
          <AnimatePresence>
            {!loadingDone && (
              <motion.div
                className="absolute bottom-12 right-12"
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <span
                  className="text-6xl font-light tracking-tighter text-primary/40"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  {Math.floor(progress).toString().padStart(3, '0')}
                  <span className="text-2xl ml-1">%</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo & CTA */}
          <motion.div
            className="relative flex flex-col items-center gap-10"
            initial={{ opacity: 0 }}
            animate={loadingDone ? { opacity: 1 } : { opacity: progress > 30 ? 0.3 : 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Brand Mark */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ scale: 0.85 }}
              animate={loadingDone ? { scale: 1 } : { scale: 0.85 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Light sweep overlay */}
              {loadingDone && (
                <motion.div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-primary/10 to-transparent bg-[length:200%_100%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              )}
              <span
                className="text-7xl md:text-9xl font-bold tracking-tight text-on-background"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                RS
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-outline-variant/50" />
                <span className="text-xs tracking-[0.35em] uppercase text-on-surface-variant">
                  Rogue Studio
                </span>
                <div className="w-12 h-px bg-outline-variant/50" />
              </div>
            </motion.div>

            {/* Enter CTA */}
            <AnimatePresence>
              {loadingDone && (
                <motion.button
                  onClick={handleEnter}
                  className="px-10 py-3 border border-outline-variant/40 text-xs tracking-[0.3em] uppercase text-on-surface-variant hover:border-primary hover:text-primary transition-all duration-500 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Enter the Vault
                  <span className="ml-2 group-hover:ml-4 transition-all duration-300">→</span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subtitle bottom */}
          <motion.div
            className="absolute bottom-12 left-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadingDone ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/40">
              Portfolio — 2026
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
