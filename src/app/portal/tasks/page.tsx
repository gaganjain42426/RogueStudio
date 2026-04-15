import { getPortalClient } from '@/lib/portal'
import PortalTaskRequestButton from '@/components/portal/PortalTaskRequestButton'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Tasks — Client Portal' }

const PRIORITY_STYLE: Record<string, string> = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-orange-500/20 text-orange-400',
  low: 'bg-gray-500/20 text-gray-400',
}

const STATUS_STYLE: Record<string, string> = {
  todo:       'bg-gray-500/20 text-gray-400',
  inprogress: 'bg-orange-500/20 text-orange-400',
  done:       'bg-green-500/20 text-green-400',
}

const STATUS_LABEL: Record<string, string> = {
  todo:       'To Do',
  inprogress: 'In Progress',
  done:       'Done',
}

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  due_date: string | null
}

const GROUPS: { key: string; label: string }[] = [
  { key: 'todo',       label: 'To Do' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'done',       label: 'Done' },
]

export default async function PortalTasksPage() {
  const { supabase, client } = await getPortalClient()

  const { data } = await supabase
    .from('tasks')
    .select('id, title, description, status, priority, due_date')
    .eq('client_id', client.id)
    .order('due_date', { ascending: true, nullsFirst: false })

  const tasks = (data ?? []) as Task[]

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <PortalTaskRequestButton clientId={client.id} />
      </div>

      <div className="space-y-10">
        {GROUPS.map(({ key, label }) => {
          const groupTasks = tasks.filter((t) => t.status === key)
          return (
            <div key={key}>
              {/* Group header */}
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {label}
                </h2>
                <span className="text-xs bg-white/5 text-gray-600 rounded-full px-2 py-0.5">
                  {groupTasks.length}
                </span>
              </div>

              {groupTasks.length === 0 ? (
                <p className="text-xs text-gray-700 pl-1">No tasks here.</p>
              ) : (
                <div className="space-y-2">
                  {groupTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-[#1c1b1b] rounded-xl p-4 flex items-start justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{task.title}</p>
                        {task.description && (
                          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        {task.due_date && (
                          <p className="text-gray-600 text-xs mt-2">Due {task.due_date}</p>
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
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            STATUS_STYLE[task.status] ?? 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {STATUS_LABEL[task.status] ?? task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
