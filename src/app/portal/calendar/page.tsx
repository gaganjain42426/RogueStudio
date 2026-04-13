import { getPortalClient } from '@/lib/portal'
import PortalCalendarClient, { type PortalContentEvent } from '@/components/portal/PortalCalendarClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Calendar — Client Portal' }

export default async function PortalCalendarPage() {
  const { supabase, client } = await getPortalClient()

  const now = new Date()
  const defaultYear = now.getFullYear()
  const defaultMonth = now.getMonth()

  const { data: events } = await supabase
    .from('content_events')
    .select('id, title, platform, content_type, scheduled_date, status, notes')
    .eq('client_id', client.id)
    .order('scheduled_date')

  return (
    <PortalCalendarClient
      events={(events ?? []) as PortalContentEvent[]}
      defaultYear={defaultYear}
      defaultMonth={defaultMonth}
    />
  )
}
