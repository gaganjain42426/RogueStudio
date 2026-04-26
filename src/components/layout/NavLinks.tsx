import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'

/**
 * NavLinks — server component.
 * Renders the desktop nav <Link> elements as static HTML with no JS bundle.
 * Active-state highlighting is omitted here; hover underline is CSS-only.
 * For dynamic active styling see NavInteractiveClient.
 */
export function NavLinks() {
  return (
    <div className="hidden md:flex items-center gap-8 lg:gap-10">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group relative font-bold tracking-tight text-white/80 hover:text-white transition-colors duration-200 text-sm lg:text-base"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          {link.label}
          <span className="absolute -bottom-0.5 left-0 h-px w-full bg-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
      ))}
    </div>
  )
}
