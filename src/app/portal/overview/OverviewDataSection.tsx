import { createClient } from '@/lib/supabase/server'

const PRIORITY_STYLE: Record<string, string> = {
  high:   'bg-red-500/20 text-red-400',
  medium: 'bg-orange-500/20 text-orange-400',
  low:    'bg-gray-500/20 text-gray-400',
}

const PLATFORM_BADGE: Record<string, string> = {
  Instagram: 'bg-pink-500/20 text-pink-400',
  Facebook:  'bg-blue-500/20 text-blue-400',
  YouTube:   'bg-red-500/20 text-red-400',
  LinkedIn:  'bg-teal-500/20 text-teal-400',
}

type Task = {
  id: string
  title: string
  status: string
  priority: string
  due_date: string | null
}

type ContentEvent = {
  id: string
  title: string
  platform: string
  scheduled_date: string
}

type Payment = {
  id: string
  status: string
}

/**
 * Fetches overview data in parallel and renders the stat cards + widget
 * columns. Runs as an async Server Component so it can be wrapped in a
 * <Suspense> boundary — the page shell (welcome header) renders immediately
 * while this section streams in.
 *
 * Query optimisations vs the original:
 * - tasks: filters .neq('status','done') at the DB level (was done in JS)
 * - tasks: .limit(20) — no unbounded fetches
 * - events: already date-bounded (today → +30 days) + .limit(20)
 * - payments: .limit(100) — enough for 8+ years of monthly payments
 * - all three queries run in parallel via Promise.all()
 */
export default async function OverviewDataSection({ clientId }: { clientId: string }) {
  const supabase = await createClient()

  const today    = new Date().toISOString().split('T')[0]
  const in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [{ data: tasks }, { data: events }, { data: payments }] = await Promise.all([
    supabase
      .from('tasks')
      .select('id, title, status, priority, due_date')
      .eq('client_id', clientId)
      .neq('status', 'done')          // filter at DB level — no need to fetch and discard
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('content_events')
      .select('id, title, platform, scheduled_date')
      .eq('client_id', clientId)
      .gte('scheduled_date', today)
      .lte('scheduled_date', in30Days)
      .order('scheduled_date')
      .limit(20),
    supabase
      .from('payments')
      .select('id, status')
      .eq('client_id', clientId)
      .limit(100),
  ])

  const activeTasks      = (tasks    ?? []) as Task[]
  const upcomingEvents   = (events   ?? []) as ContentEvent[]
  const allPayments      = (payments ?? []) as Payment[]
  const pendingPayments  = allPayments.filter((p) => p.status === 'pending').length

  const recentTasks    = activeTasks.slice(0, 5)
  const upcomingContent = upcomingEvents.slice(0, 5)

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-2">Active Tasks</p>
          <p className="text-3xl font-bold text-white">{activeTasks.length}</p>
        </div>
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-2">Upcoming Content (30d)</p>
          <p className="text-3xl font-bold text-white">{upcomingEvents.length}</p>
        </div>
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-2">Payments Due</p>
          <p className={`text-3xl font-bold ${pendingPayments > 0 ? 'text-orange-400' : 'text-white'}`}>
            {pendingPayments}
          </p>
        </div>
      </div>

      {/* Two-column cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active tasks */}
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Your Active Tasks</h2>
          {recentTasks.length === 0 ? (
            <p className="text-xs text-gray-600">No active tasks right now.</p>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{task.title}</p>
                    {task.due_date && (
                      <p className="text-xs text-gray-500 mt-0.5">Due {task.due_date}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        PRIORITY_STYLE[task.priority] ?? 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                      {task.status === 'inprogress'
                        ? 'In Progress'
                        : task.status === 'todo'
                        ? 'To Do'
                        : task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming content */}
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Upcoming Content</h2>
          {upcomingContent.length === 0 ? (
            <p className="text-xs text-gray-600">No content scheduled in the next 30 days.</p>
          ) : (
            <div className="space-y-3">
              {upcomingContent.map((ev) => (
                <div key={ev.id} className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{ev.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ev.scheduled_date}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                      PLATFORM_BADGE[ev.platform] ?? 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {ev.platform}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
