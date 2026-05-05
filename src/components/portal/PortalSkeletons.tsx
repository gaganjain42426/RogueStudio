// Skeleton loader components for portal sections.
// Used as Suspense fallbacks so the page shell renders instantly
// while each section's data streams in independently.

/** Stats row on the Overview page (3 cards) */
export function OverviewStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-[#1c1b1b] rounded-xl p-5">
          <div className="h-3 w-28 bg-white/5 rounded mb-3" />
          <div className="h-8 w-14 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  )
}

/** Two-column task + content cards on the Overview page */
export function OverviewCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="bg-[#1c1b1b] rounded-xl p-5">
          <div className="h-4 w-36 bg-white/10 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="flex justify-between items-start gap-3">
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-white/10 rounded w-4/5" />
                  <div className="h-3 bg-white/5 rounded w-2/5" />
                </div>
                <div className="h-5 w-16 bg-white/5 rounded-full flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Combined stats + cards for the Overview Suspense boundary */
export function OverviewSkeleton() {
  return (
    <>
      <OverviewStatsSkeleton />
      <OverviewCardsSkeleton />
    </>
  )
}

/** Grouped task list on the Tasks page */
export function TasksListSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-16 bg-white/10 rounded" />
            <div className="h-5 w-6 bg-white/5 rounded-full" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="bg-[#1c1b1b] rounded-xl p-4 flex items-start justify-between gap-3"
              >
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-2/5" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-5 w-14 bg-white/5 rounded-full" />
                  <div className="h-5 w-16 bg-white/5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Summary cards + table on the Payments page */
export function PaymentsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-[#1c1b1b] rounded-xl p-5">
            <div className="h-3 w-24 bg-white/5 rounded mb-3" />
            <div className="h-8 w-32 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-5 py-3 border-b border-white/5 last:border-0 gap-4"
          >
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/5 rounded" />
            <div className="h-5 w-16 bg-white/5 rounded-full" />
            <div className="h-4 w-20 bg-white/5 rounded hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Full calendar grid on the Calendar page */
export function CalendarSkeleton() {
  return (
    <div className="p-6 md:p-8 max-w-[1000px] animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-48 bg-white/10 rounded" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-white/5 rounded-lg" />
          <div className="h-5 w-32 bg-white/10 rounded" />
          <div className="h-9 w-9 bg-white/5 rounded-lg" />
        </div>
      </div>
      {/* Day-name row */}
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-7 border-b border-white/5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="py-3 flex justify-center">
              <div className="h-3 w-6 bg-white/5 rounded" />
            </div>
          ))}
        </div>
        {/* Calendar cells */}
        <div className="grid grid-cols-7">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[96px] p-2 border-b border-r border-white/5"
            >
              <div className="h-5 w-5 bg-white/5 rounded-full mb-1.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
