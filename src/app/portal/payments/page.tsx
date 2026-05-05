import { Suspense } from 'react'
import { getPortalClient } from '@/lib/portal'
import { PaymentsSkeleton } from '@/components/portal/PortalSkeletons'
import PaymentsDataSection from './PaymentsDataSection'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Payments — Client Portal' }

export default async function PortalPaymentsPage() {
  // cache() hit — no extra DB round-trip
  const { client } = await getPortalClient()

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      {/* Heading renders immediately */}
      <h1 className="text-2xl font-bold text-white mb-6">Payments</h1>

      {/* Summary cards + table stream in as data arrives */}
      <Suspense fallback={<PaymentsSkeleton />}>
        <PaymentsDataSection clientId={client.id} />
      </Suspense>
    </div>
  )
}
