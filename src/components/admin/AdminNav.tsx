'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Kanban,
  Calendar,
  CreditCard,
  Receipt,
  Users2,
  LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const ALL_NAV = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/clients', icon: Users, label: 'Clients' },
  { href: '/admin/workboard', icon: Kanban, label: 'Work Board' },
  { href: '/admin/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { href: '/admin/expenses', icon: Receipt, label: 'Expenses' },
]

const EDITOR_NAV = [{ href: '/admin/calendar', icon: Calendar, label: 'Calendar' }]

export default function AdminNav({
  mrr,
  userRole,
}: {
  mrr: number
  userRole?: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/client-login')
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const navItems = userRole === 'editor' ? EDITOR_NAV : ALL_NAV

  return (
    <aside className="w-[220px] flex-shrink-0 bg-[#131313] flex flex-col h-full border-r border-white/5">
      {/* Branding */}
      <div className="px-5 pt-7 pb-8">
        <p className="text-white font-bold text-lg leading-tight">Rogue Studio</p>
        <p className="text-[#fa5c1b] text-[11px] font-semibold tracking-[0.15em] mt-0.5 uppercase">
          Admin
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-px">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                active
                  ? 'bg-white/5 text-white border-l-[3px] border-[#fa5c1b] pl-[9px] pr-3'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border-l-[3px] border-transparent pl-3 pr-3'
              }`}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span>{label}</span>
            </Link>
          )
        })}

        {/* Team & Access — admin only */}
        {userRole === 'admin' && (
          <Link
            href="/admin/team"
            className={`flex items-center gap-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
              isActive('/admin/team')
                ? 'bg-white/5 text-white border-l-[3px] border-[#fa5c1b] pl-[9px] pr-3'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border-l-[3px] border-transparent pl-3 pr-3'
            }`}
          >
            <Users2 size={15} className="flex-shrink-0" />
            <span>Team & Access</span>
          </Link>
        )}
      </nav>

      {/* MRR */}
      <div className="m-3 p-4 rounded-xl bg-[#0e0e0e] border border-white/5">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Monthly MRR</p>
        <p className="text-white font-bold text-xl tabular-nums">
          ₹{mrr.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mx-3 mb-5 w-[calc(100%-24px)] flex items-center gap-2 text-gray-500 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
      >
        <LogOut size={14} />
        <span>Logout</span>
      </button>
    </aside>
  )
}

