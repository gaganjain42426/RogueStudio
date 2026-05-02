import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import AdminNav from '@/components/admin/AdminNav'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Admin — Rogue Studio' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const adminClient = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [{ data: clientsData }, { data: roleData }] = await Promise.all([
    supabase.from('clients').select('retainer_amount').eq('status', 'active'),
    user
      ? adminClient.from('user_roles').select('role').eq('user_id', user.id).single()
      : Promise.resolve({ data: null }),
  ])

  const mrr = clientsData?.reduce((sum, c) => sum + (c.retainer_amount ?? 0), 0) ?? 0
  const userRole = roleData?.role as string | undefined

  return (
    // Fixed overlay covers the public Navbar/Footer from root layout
    <div className="fixed inset-0 z-[200] flex bg-[#0e0e0e] overflow-hidden">
      <AdminNav mrr={mrr} userRole={userRole} />
      <main className="flex-1 overflow-y-auto bg-[#0e0e0e]" data-lenis-prevent>
        {children}
      </main>
    </div>
  )
}
