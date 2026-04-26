import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/components/layout/NavLinks'
import { NavInteractiveClient } from '@/components/layout/NavInteractiveClient'

/**
 * Navbar — Server Component.
 *
 * Island architecture:
 *   • Logo <Link> → server-rendered (crawlable anchor)
 *   • Desktop nav <Link>s → NavLinks (server component, no JS bundle)
 *   • Scroll background, hamburger, mobile drawer → NavInteractiveClient (client island)
 *
 * The Logo and NavLinks are passed as children to NavInteractiveClient.
 * In Next.js App Router, server-component children passed to a client wrapper
 * are included in the initial SSR HTML — Googlebot sees all links immediately.
 */
export default function Navbar() {
  return (
    <NavInteractiveClient>
      {/* Logo — server-rendered */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Rogue Studio"
          width={160}
          height={52}
          className="h-10 w-auto object-contain"
          style={{ mixBlendMode: 'screen' }}
          priority
        />
      </Link>

      {/* Desktop nav links — server component, no client JS */}
      <NavLinks />
    </NavInteractiveClient>
  )
}

