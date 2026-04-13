import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalNav from '@/components/portal/PortalNav'

export const dynamic = 'force-dynamic'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) redirect('/client-login')

  const { data: client } = await supabase
    .from('clients')
    .select('id, name')
    .eq('portal_email', user.email)
    .single()

  if (!client) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#0e0e0e] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <p className="text-white font-semibold text-lg mb-2">Access Denied</p>
          <p className="text-gray-400 text-sm">
            Your account is not linked to a client. Please contact your account manager.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[#0e0e0e] overflow-hidden">
      <PortalNav clientName={client.name} />
      <main className="flex-1 overflow-y-auto bg-[#0e0e0e]">{children}</main>
    </div>
  )
}
