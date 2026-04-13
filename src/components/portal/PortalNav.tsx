'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'

const NAV_LINKS = [
  { href: '/portal/overview', label: 'Overview' },
  { href: '/portal/tasks', label: 'Tasks' },
  { href: '/portal/calendar', label: 'Calendar' },
  { href: '/portal/payments', label: 'Payments' },
]

export default function PortalNav({ clientName }: { clientName: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/client-login')
  }

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/5 bg-[#0e0e0e] flex-shrink-0 gap-4">
      {/* Logo */}
      <span className="text-white font-black text-lg tracking-tight flex-shrink-0">
        Rogue Studio
      </span>

      {/* Nav links — scrollable on mobile */}
      <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none flex-shrink min-w-0">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#fa5c1b] rounded-full" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Right: client name + logout */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm text-gray-500 hidden md:block truncate max-w-[140px]">
          {clientName}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
          title="Logout"
        >
          <LogOut size={15} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </nav>
  )
}
