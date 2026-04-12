import { createClient } from '@/lib/supabase/server'
import PaymentsClient from '@/components/admin/PaymentsClient'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Payments — Admin' }

export default async function PaymentsPage() {
  const supabase = await createClient()

  const [
    { data: paymentsRaw, error: paymentsError },
    { data: clients, error: clientsError },
  ] = await Promise.all([
    supabase
      .from('payments')
      .select('*, clients(name, color_tag)')
      .order('date', { ascending: false }),
    supabase
      .from('clients')
      .select('id, name, color_tag, retainer_amount, status')
      .order('name'),
  ])

  if (paymentsError || clientsError) {
    return (
      <div className="p-8 text-red-400">
        Failed to load data: {(paymentsError ?? clientsError)?.message}
      </div>
    )
  }

  return (
    <PaymentsClient
      initialPayments={(paymentsRaw as unknown as Parameters<typeof PaymentsClient>[0]['initialPayments']) ?? []}
      clients={clients ?? []}
    />
  )
}
