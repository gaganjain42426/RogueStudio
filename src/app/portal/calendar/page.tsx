import { Suspense } from 'react'
import { getPortalClient } from '@/lib/portal'
import { CalendarSkeleton } from '@/components/portal/PortalSkeletons'
import CalendarDataSection from './CalendarDataSection'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Calendar — Client Portal' }

export default async function PortalCalendarPage() {
  // cache() hit — no extra DB round-trip
  const { client } = await getPortalClient()

  const now = new Date()

  return (
    // Skeleton calendar grid renders immediately; real data streams in
    <Suspense fallback={<CalendarSkeleton />}>
      <CalendarDataSection
        clientId={client.id}
        defaultYear={now.getFullYear()}
        defaultMonth={now.getMonth()}
      />
    </Suspense>
  )
}
