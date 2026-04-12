import { createClient } from '@/lib/supabase/server'
import ExpensesClient from '@/components/admin/ExpensesClient'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Expenses — Admin' }

export default async function ExpensesPage() {
  const supabase = await createClient()

  const [
    { data: expensesRaw, error: expensesError },
    { data: clients, error: clientsError },
  ] = await Promise.all([
    supabase
      .from('expenses')
      .select('*, clients(name)')
      .order('date', { ascending: false }),
    supabase
      .from('clients')
      .select('id, name, retainer_amount, status')
      .order('name'),
  ])

  if (expensesError || clientsError) {
    return (
      <div className="p-8 text-red-400">
        Failed to load data: {(expensesError ?? clientsError)?.message}
      </div>
    )
  }

  return (
    <ExpensesClient
      initialExpenses={(expensesRaw as unknown as Parameters<typeof ExpensesClient>[0]['initialExpenses']) ?? []}
      clients={clients ?? []}
    />
  )
}
