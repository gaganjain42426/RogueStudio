import { createClient } from '@/lib/supabase/server'
import ClientsClient from '@/components/admin/ClientsClient'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Clients — Admin' }

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name')

  if (error) {
    return (
      <div className="p-8 text-red-400">
        Failed to load clients: {error.message}
      </div>
    )
  }

  return <ClientsClient initialClients={data ?? []} />
}
