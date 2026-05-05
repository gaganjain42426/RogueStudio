import { createClient } from '@/lib/supabase/server'
import PortalCalendarClient, { type PortalContentEvent } from '@/components/portal/PortalCalendarClient'

/**
 * Async Server Component — fetches content events for the given client within
 * a bounded date window (6 months back → 12 months ahead) so the query never
 * scans the full table. Wrapped in <Suspense> in the parent page so a skeleton
 * calendar grid renders immediately.
 *
 * Optimisations: specific columns, date range, .limit(500), client_id filter.
 * 500 events ≈ ~1.4 per day over 12 months — a safe cap for any client.
 */
export default async function CalendarDataSection({
  clientId,
  defaultYear,
  defaultMonth,
}: {
  clientId: string
  defaultYear: number
  defaultMonth: number
}) {
  const supabase = await createClient()

  // Fetch a rolling 18-month window: 6 months back + 12 months ahead.
  // This covers backward navigation and a full year of planning.
  const rangeStart = new Date()
  rangeStart.setMonth(rangeStart.getMonth() - 6)
  const rangeEnd = new Date()
  rangeEnd.setMonth(rangeEnd.getMonth() + 12)

  const { data: events } = await supabase
    .from('content_events')
    .select('id, title, platform, content_type, scheduled_date, status, notes')
    .eq('client_id', clientId)
    .gte('scheduled_date', rangeStart.toISOString().split('T')[0])
    .lte('scheduled_date', rangeEnd.toISOString().split('T')[0])
    .order('scheduled_date')
    .limit(500)

  return (
    <PortalCalendarClient
      events={(events ?? []) as PortalContentEvent[]}
      defaultYear={defaultYear}
      defaultMonth={defaultMonth}
    />
  )
}
