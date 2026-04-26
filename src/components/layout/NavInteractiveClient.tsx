'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'

interface NavInteractiveClientProps {
  /** Server-rendered logo + desktop nav links passed as children */
  children: ReactNode
}

/**
 * NavInteractiveClient — client island that owns all interactive navbar behaviour:
 *  - Scroll-based background opacity
 *  - Hamburger toggle + mobile drawer (AnimatePresence)
 *  - /work solid-bg override
 *
 * The desktop nav links (children) are server-rendered and passed in,
 * so they appear in the initial HTML for crawlers.
 */
export function NavInteractiveClient({ children }: NavInteractiveClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const alwaysSolid = pathname.startsWith('/work')

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || menuOpen || alwaysSolid
            ? 'bg-surface/80 backdrop-blur-[24px] shadow-lg border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-5 max-w-[1440px] mx-auto">
          {/* Logo + desktop links — server-rendered children */}
          {children}

          {/* Right side CTAs + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/client-login"
              className="hidden md:inline-flex border border-white/30 text-white/80 px-4 py-2 rounded-full text-sm font-headline hover:border-white hover:text-white transition-all duration-200"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Client Login
            </Link>
            <Link
              href="/contact"
              className="hidden md:inline-flex bg-primary-container text-on-primary-fixed px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300 active:scale-95"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Book a Call →
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-surface-container-lowest/95 backdrop-blur-[24px] border-t border-white/5 px-6 py-8 flex flex-col gap-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xl font-black tracking-tight transition-colors ${
                  pathname === link.href ? 'text-primary-container' : 'text-white hover:text-primary'
                }`}
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/client-login"
              className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Client Login
            </Link>
            <Link
              href="/contact"
              className="mt-4 w-full text-center bg-primary-container text-on-primary-fixed px-8 py-4 rounded-full font-bold text-base"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Book a Call →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
