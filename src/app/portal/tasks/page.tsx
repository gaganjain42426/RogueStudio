import { Suspense } from 'react'
import { getPortalClient } from '@/lib/portal'
import PortalTaskRequestButton from '@/components/portal/PortalTaskRequestButton'
import { TasksListSkeleton } from '@/components/portal/PortalSkeletons'
import TasksListSection from './TasksListSection'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Tasks — Client Portal' }

export default async function PortalTasksPage() {
  // cache() hit — no extra DB round-trip
  const { client } = await getPortalClient()

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      {/* Header renders immediately */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <PortalTaskRequestButton clientId={client.id} />
      </div>

      {/* Task list streams in as data arrives */}
      <Suspense fallback={<TasksListSkeleton />}>
        <TasksListSection clientId={client.id} />
      </Suspense>
    </div>
  )
}
