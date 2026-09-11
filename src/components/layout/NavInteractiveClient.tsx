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
 *  - Light-page theming (see LIGHT_PAGES)
 *
 * The desktop nav links (children) are server-rendered and passed in,
 * so they appear in the initial HTML for crawlers.
 *
 * Theming note: the logo and desktop links are server components passed in as
 * children, so they can't read `pathname` themselves. The nav publishes its
 * foreground colours as CSS custom properties instead, which those children
 * consume — keeping them out of the client bundle.
 */

/**
 * Routes whose page background is light (cream), where the default white nav
 * foreground would be close to invisible.
 */
const LIGHT_PAGES = ['/contact']

export function NavInteractiveClient({ children }: NavInteractiveClientProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const alwaysSolid = pathname.startsWith('/portfolio')
  const lightPage = LIGHT_PAGES.some((p) => pathname.startsWith(p))
  // Drawer links close the menu on tap (was previously an effect on pathname,
  // which the React Compiler flags as a cascading-render hazard).
  const closeMenu = () => setMenuOpen(false)

  // Consumed by the server-rendered logo and nav links, and by the drawer.
  const navTheme = {
    '--nav-fg': lightPage ? '#1d1c17' : '#ffffff',
    '--nav-fg-dim': lightPage ? 'rgba(29,28,23,0.72)' : 'rgba(255,255,255,0.80)',
    '--nav-border': lightPage ? 'rgba(29,28,23,0.28)' : 'rgba(255,255,255,0.30)',
    '--nav-hover': lightPage ? 'rgba(29,28,23,0.07)' : 'rgba(255,255,255,0.10)',
    // `screen` lifts the logo off dark backgrounds but blows it out on cream.
    '--nav-logo-blend': lightPage ? 'normal' : 'screen',
  } as React.CSSProperties

  const solidBg = lightPage
    ? 'bg-tertiary-fixed/85 backdrop-blur-[24px] shadow-lg border-b border-black/5'
    : 'bg-surface/80 backdrop-blur-[24px] shadow-lg border-b border-white/5'

  return (
    <>
      <nav
        style={navTheme}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || menuOpen || alwaysSolid ? solidBg : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-5 max-w-[1440px] mx-auto">
          {/* Logo + desktop links — server-rendered children */}
          {children}

          {/* Right side CTAs + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/client-login"
              className="hidden md:inline-flex border px-4 py-2 rounded-full text-sm font-headline transition-all duration-200 border-[color:var(--nav-border)] text-[color:var(--nav-fg-dim)] hover:border-[color:var(--nav-fg)] hover:text-[color:var(--nav-fg)]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Client Login
            </Link>
            <Link
              href="/contact"
              className="hidden md:inline-flex bg-primary-container text-on-primary-fixed px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300 active:scale-95"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Book a Call →
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5 rounded-lg hover:bg-[color:var(--nav-hover)] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-[color:var(--nav-fg)] transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[color:var(--nav-fg)] transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[color:var(--nav-fg)] transition-all duration-300 origin-center ${
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
            style={navTheme}
            className={`fixed inset-x-0 top-[72px] z-40 backdrop-blur-[24px] border-t px-6 py-8 flex flex-col gap-6 md:hidden ${
              lightPage
                ? 'bg-tertiary-fixed/95 border-black/5'
                : 'bg-surface-container-lowest/95 border-white/5'
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`text-xl font-black tracking-tight transition-colors ${
                  pathname === link.href
                    ? 'text-primary-container'
                    : 'text-[color:var(--nav-fg)] hover:text-primary-container'
                }`}
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/client-login"
              onClick={closeMenu}
              className="text-xl font-black tracking-tight text-[color:var(--nav-fg-dim)] hover:text-[color:var(--nav-fg)] transition-colors"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Client Login
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-4 w-full text-center bg-primary-container text-on-primary-fixed px-8 py-4 rounded-full font-bold text-base"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Book a Call →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
