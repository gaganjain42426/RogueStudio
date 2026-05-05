import { Suspense } from 'react'
import { getPortalClient } from '@/lib/portal'
import { OverviewSkeleton } from '@/components/portal/PortalSkeletons'
import OverviewDataSection from './OverviewDataSection'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Overview — Client Portal' }

export default async function PortalOverviewPage() {
  // cache() in getPortalClient means this is a free cache-hit — the layout
  // already ran the auth + client lookup for this request.
  const { client } = await getPortalClient()

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      {/* Welcome header — renders immediately, no data dependency */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Welcome back, {client.name}
        </h1>
        <p className="text-gray-500 text-sm mb-3">Your account manager: Rogue Studio Team</p>
        <div className="flex items-center gap-2 flex-wrap">
          {client.industry && (
            <span className="text-xs bg-white/5 text-gray-400 border border-white/10 rounded-full px-3 py-1">
              {client.industry}
            </span>
          )}
          {client.retainer_amount > 0 && (
            <span className="text-xs bg-[#fa5c1b]/10 text-[#fa5c1b] border border-[#fa5c1b]/20 rounded-full px-3 py-1">
              ₹{client.retainer_amount.toLocaleString('en-IN')} / month
            </span>
          )}
        </div>
      </div>

      {/* Stats + widget cards — streamed in as data arrives */}
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewDataSection clientId={client.id} />
      </Suspense>
    </div>
  )
}
