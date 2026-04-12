import { createClient } from '@/lib/supabase/server'
import CalendarClient from '@/components/admin/CalendarClient'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Calendar — Admin' }

export default async function CalendarPage() {
  const supabase = await createClient()

  const now = new Date()
  const defaultYear = now.getFullYear()
  const defaultMonth = now.getMonth()

  const [{ data: eventsRaw, error: eventsError }, { data: clients, error: clientsError }] =
    await Promise.all([
      supabase
        .from('content_events')
        .select('*, clients(name, color_tag)')
        .order('scheduled_date'),
      supabase.from('clients').select('id, name, color_tag').order('name'),
    ])

  if (eventsError || clientsError) {
    return (
      <div className="p-8 text-red-400">
        Failed to load data: {(eventsError ?? clientsError)?.message}
      </div>
    )
  }

  return (
    <CalendarClient
      initialEvents={(eventsRaw as unknown as Parameters<typeof CalendarClient>[0]['initialEvents']) ?? []}
      clients={clients ?? []}
      defaultYear={defaultYear}
      defaultMonth={defaultMonth}
    />
  )
}
