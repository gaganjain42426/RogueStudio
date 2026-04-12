import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type TaskRow = {
  id: string
  title: string
  status: string
  priority: string
  due_date: string | null
  clients: { name: string; color_tag: string } | null
}

type PaymentRow = {
  id: string
  amount: number
  month: string
  status: string
  clients: { name: string; color_tag: string } | null
}

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-orange-500/20 text-orange-400',
  low: 'bg-gray-500/20 text-gray-400',
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b]">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
    </div>
  )
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const today = new Date().toISOString().split('T')[0]

  const [
    { data: activeClientsData },
    { count: tasksDueToday },
    { count: pendingPayments },
    { count: activeClientsCount },
    { data: tasksRaw },
    { data: recentPaymentsRaw },
  ] = await Promise.all([
    supabase.from('clients').select('retainer_amount').eq('status', 'active'),
    supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('due_date', today)
      .neq('status', 'done'),
    supabase
      .from('payments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active'),
    supabase
      .from('tasks')
      .select('id, title, status, priority, due_date, clients(name, color_tag)')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('payments')
      .select('id, amount, month, status, clients(name, color_tag)')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const mrr = activeClientsData?.reduce((s, c) => s + (c.retainer_amount ?? 0), 0) ?? 0
  const tasks = (tasksRaw as unknown as TaskRow[]) ?? []
  const recentPayments = (recentPaymentsRaw as unknown as PaymentRow[]) ?? []

  const COLUMNS = [
    { key: 'todo', label: 'To Do' },
    { key: 'inprogress', label: 'In Progress' },
    { key: 'done', label: 'Done' },
  ]

  return (
    <div className="p-8 max-w-[1400px]">
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <StatCard label="Monthly MRR" value={`₹${mrr.toLocaleString('en-IN')}`} />
        <StatCard label="Tasks Due Today" value={tasksDueToday ?? 0} />
        <StatCard label="Pending Payments" value={pendingPayments ?? 0} />
        <StatCard label="Active Clients" value={activeClientsCount ?? 0} />
      </div>

      {/* Mini Kanban */}
      <h2 className="text-base font-semibold text-white mb-4">Work Board Preview</h2>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key).slice(0, 4)
          return (
            <div key={col.key} className="bg-[#1c1b1b] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {col.label}
                </p>
                <span className="text-xs text-gray-600">
                  {tasks.filter((t) => t.status === col.key).length}
                </span>
              </div>
              <div className="space-y-2">
                {colTasks.length === 0 && (
                  <p className="text-xs text-gray-600 py-4 text-center">Empty</p>
                )}
                {colTasks.map((task) => (
                  <div key={task.id} className="bg-[#0e0e0e] rounded-lg p-3">
                    <div className="flex items-start gap-2 mb-2">
                      {task.clients?.color_tag && (
                        <div
                          className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                          style={{ backgroundColor: task.clients.color_tag }}
                        />
                      )}
                      <p className="text-sm text-white leading-snug">{task.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.priority && (
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            PRIORITY_COLORS[task.priority] ?? 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {task.priority}
                        </span>
                      )}
                      {task.due_date && (
                        <span className="text-[10px] text-gray-600">
                          {task.due_date.split('-').reverse().join('/')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Payments */}
      <h2 className="text-base font-semibold text-white mb-4">Recent Payments</h2>
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden">
        {recentPayments.length === 0 ? (
          <p className="text-gray-600 text-sm p-8 text-center">No payments recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Client</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Month</th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3">Amount</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {p.clients?.color_tag && (
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: p.clients.color_tag }}
                        />
                      )}
                      <span className="text-white">{p.clients?.name ?? '—'}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{p.month}</td>
                  <td className="px-5 py-3 text-right text-white font-medium tabular-nums">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        p.status === 'received'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
