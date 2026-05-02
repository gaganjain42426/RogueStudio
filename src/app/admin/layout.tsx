import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Admin — Rogue Studio' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [{ data: clientsData }, { data: roleRows }] = await Promise.all([
    supabase.from('clients').select('retainer_amount').eq('status', 'active'),
    user
      ? supabase.from('user_roles').select('role').eq('user_id', user.id).limit(1)
      : Promise.resolve({ data: null }),
  ])

  const mrr = clientsData?.reduce((sum, c) => sum + (c.retainer_amount ?? 0), 0) ?? 0
  const userRole = roleRows?.[0]?.role as string | undefined

  return (
    <div className="fixed inset-0 z-[200] flex bg-[#0e0e0e] overflow-hidden">
      <AdminNav mrr={mrr} userRole={userRole} />
      <main className="flex-1 overflow-y-auto bg-[#0e0e0e]" data-lenis-prevent>
        {children}
      </main>
    </div>
  )
}
