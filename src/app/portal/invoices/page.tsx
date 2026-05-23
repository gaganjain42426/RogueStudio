import { Suspense } from 'react'
import { getPortalClient } from '@/lib/portal'
import { PaymentsSkeleton } from '@/components/portal/PortalSkeletons'
import InvoiceSection from './InvoiceSection'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Invoices — Client Portal' }

export default async function PortalInvoicesPage() {
  const { client } = await getPortalClient()

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <h1 className="text-2xl font-bold text-white mb-6">Invoices</h1>
      <Suspense fallback={<PaymentsSkeleton />}>
        <InvoiceSection clientId={client.id} />
      </Suspense>
    </div>
  )
}
