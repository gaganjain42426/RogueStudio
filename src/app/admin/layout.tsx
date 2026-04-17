import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Admin — Rogue Studio' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('clients')
    .select('retainer_amount')
    .eq('status', 'active')

  const mrr = data?.reduce((sum, c) => sum + (c.retainer_amount ?? 0), 0) ?? 0

  return (
    // Fixed overlay covers the public Navbar/Footer from root layout
    <div className="fixed inset-0 z-[200] flex bg-[#0e0e0e] overflow-hidden">
      <AdminNav mrr={mrr} />
      <main className="flex-1 overflow-y-auto bg-[#0e0e0e]" data-lenis-prevent>
        {children}
      </main>
    </div>
  )
}
