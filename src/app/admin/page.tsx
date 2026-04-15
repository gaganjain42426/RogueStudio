import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, Kanban, CreditCard, Receipt, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

const MONTHS_LONG = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

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

function RevenueChart({ data }: { data: { label: string; amount: number }[] }) {
  const max = Math.max(...data.map((d) => d.amount), 1)
  const W = 36, GAP = 12, H = 80
  const total = data.length * (W + GAP) - GAP
  return (
    <svg
      width="100%"
      viewBox={`-4 -8 ${total + 8} ${H + 40}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: 130 }}
    >
      {data.map((d, i) => {
        const bh = d.amount > 0 ? Math.max((d.amount / max) * H, 4) : 0
        const x = i * (W + GAP)
        const y = H - bh
        return (
          <g key={d.label}>
            <rect x={x} y={0} width={W} height={H} fill="#ffffff" opacity={0.03} rx={3} />
            {bh > 0 && <rect x={x} y={y} width={W} height={bh} fill="#fa5c1b" opacity={0.8} rx={3} />}
            <text x={x + W / 2} y={H + 16} textAnchor="middle" fontSize={9} fill="#6b7280">
              {d.label}
            </text>
            {d.amount > 0 && (
              <text x={x + W / 2} y={Math.max(y - 4, 8)} textAnchor="middle" fontSize={8} fill="#9ca3af">
                {d.amount >= 100000
                  ? (d.amount / 100000).toFixed(1) + 'L'
                  : (d.amount / 1000).toFixed(0) + 'K'}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default async function AdminDashboard() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  function last6MonthKeys() {
    const result: { key: string; label: string }[] = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      result.push({
        key: `${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`,
        label: MONTHS_SHORT[d.getMonth()],
      })
    }
    return result
  }
  const months6 = last6MonthKeys()

  const [
    { data: activeClientsData },
    { count: pendingPayments },
    { count: activeClientsCount },
    { data: tasksRaw },
    { data: recentPaymentsRaw },
    { data: overdueTasksRaw },
    { data: revenueRaw },
    { count: clientRequestCount },
  ] = await Promise.all([
    supabase.from('clients').select('retainer_amount').eq('status', 'active'),
    supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('clients').select('*', { count: 'exact', head: true }).eq('status', 'active'),
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
    supabase
      .from('tasks')
      .select('id, title, status, priority, due_date, clients(name, color_tag)')
      .lt('due_date', today)
      .neq('status', 'done')
      .order('due_date', { ascending: true })
      .limit(5),
    supabase.from('payments').select('amount, month').eq('status', 'received'),
    supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('requested_by', 'client')
      .eq('status', 'todo'),
  ])

  const mrr = activeClientsData?.reduce((s, c) => s + (c.retainer_amount ?? 0), 0) ?? 0
  const tasks = (tasksRaw as unknown as TaskRow[]) ?? []
  const recentPayments = (recentPaymentsRaw as unknown as PaymentRow[]) ?? []
  const overdueTasks = (overdueTasksRaw as unknown as TaskRow[]) ?? []

  type RevenueRow = { amount: number; month: string }
  const allRevenue = (revenueRaw ?? []) as RevenueRow[]
  const revenueData = months6.map(({ key, label }) => ({
    label,
    amount: allRevenue
      .filter((p) => p.month === key)
      .reduce((s, p) => s + p.amount, 0),
  }))

  const COLUMNS = [
    { key: 'todo', label: 'To Do' },
    { key: 'inprogress', label: 'In Progress' },
    { key: 'done', label: 'Done' },
  ]

  return (
    <div className="p-8 max-w-[1400px]">
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stat Cards — clickable */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        <Link
          href="/admin/clients"
          className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b] hover:bg-[#222] transition-colors group block"
        >
          <p className="text-sm text-gray-400 mb-2">Monthly MRR</p>
          <p className="text-3xl font-bold text-white tabular-nums">₹{mrr.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-700 mt-2 group-hover:text-gray-400 transition-colors">View clients →</p>
        </Link>
        <Link
          href="/admin/workboard"
          className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b] hover:bg-[#222] transition-colors group block"
        >
          <p className="text-sm text-gray-400 mb-2">Tasks Overdue</p>
          <p className={`text-3xl font-bold tabular-nums ${overdueTasks.length > 0 ? 'text-red-400' : 'text-white'}`}>
            {overdueTasks.length}
          </p>
          <p className="text-xs text-gray-700 mt-2 group-hover:text-gray-400 transition-colors">View board →</p>
        </Link>
        <Link
          href="/admin/payments"
          className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b] hover:bg-[#222] transition-colors group block"
        >
          <p className="text-sm text-gray-400 mb-2">Pending Payments</p>
          <p className={`text-3xl font-bold tabular-nums ${(pendingPayments ?? 0) > 0 ? 'text-yellow-400' : 'text-white'}`}>
            {pendingPayments ?? 0}
          </p>
          <p className="text-xs text-gray-700 mt-2 group-hover:text-gray-400 transition-colors">View payments →</p>
        </Link>
        <Link
          href="/admin/clients"
          className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b] hover:bg-[#222] transition-colors group block"
        >
          <p className="text-sm text-gray-400 mb-2">Active Clients</p>
          <p className="text-3xl font-bold text-white tabular-nums">{activeClientsCount ?? 0}</p>
          <p className="text-xs text-gray-700 mt-2 group-hover:text-gray-400 transition-colors">View clients →</p>
        </Link>
        <Link
          href="/admin/workboard"
          className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-blue-500 hover:bg-[#222] transition-colors group block"
        >
          <p className="text-sm text-gray-400 mb-2">New Client Requests</p>
          <p className={`text-3xl font-bold tabular-nums ${(clientRequestCount ?? 0) > 0 ? 'text-blue-400' : 'text-white'}`}>
            {clientRequestCount ?? 0}
          </p>
          <p className="text-xs text-gray-700 mt-2 group-hover:text-gray-400 transition-colors">View board →</p>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <span className="text-xs uppercase text-gray-500 tracking-widest mr-1">Quick Add:</span>
        <Link
          href="/admin/workboard"
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
        >
          <Kanban size={13} /> Task
        </Link>
        <Link
          href="/admin/payments"
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
        >
          <CreditCard size={13} /> Payment
        </Link>
        <Link
          href="/admin/expenses"
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
        >
          <Receipt size={13} /> Expense
        </Link>
        <Link
          href="/admin/clients"
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
        >
          <Users size={13} /> Client
        </Link>
      </div>

      {/* Revenue Chart + Overdue Tasks */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-[#1c1b1b] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Revenue — Last 6 Months</h2>
            <Link
              href="/admin/payments"
              className="text-xs text-gray-500 hover:text-[#fa5c1b] transition-colors flex items-center gap-1"
            >
              All payments <ArrowRight size={11} />
            </Link>
          </div>
          <RevenueChart data={revenueData} />
        </div>

        {/* Overdue Tasks */}
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              Overdue Tasks
              {overdueTasks.length > 0 && (
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                  {overdueTasks.length}
                </span>
              )}
            </h2>
            <Link
              href="/admin/workboard"
              className="text-xs text-gray-500 hover:text-[#fa5c1b] transition-colors flex items-center gap-1"
            >
              Board <ArrowRight size={11} />
            </Link>
          </div>
          {overdueTasks.length === 0 ? (
            <p className="text-xs text-gray-600 text-center py-8">No overdue tasks 🎉</p>
          ) : (
            <div className="space-y-2">
              {overdueTasks.map((task) => (
                <div key={task.id} className="bg-[#0e0e0e] rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-1.5">
                    {task.clients?.color_tag && (
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: task.clients.color_tag }}
                      />
                    )}
                    <p className="text-sm text-white leading-snug flex-1">{task.title}</p>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        PRIORITY_COLORS[task.priority] ?? 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {task.priority}
                    </span>
                    {task.due_date && (
                      <span className="text-[10px] text-red-400">
                        Due {task.due_date.split('-').reverse().join('/')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mini Kanban */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">Work Board Preview</h2>
        <Link
          href="/admin/workboard"
          className="text-xs text-gray-500 hover:text-[#fa5c1b] transition-colors flex items-center gap-1"
        >
          Full board <ArrowRight size={11} />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key).slice(0, 4)
          return (
            <Link
              key={col.key}
              href="/admin/workboard"
              className="bg-[#1c1b1b] rounded-xl p-4 hover:bg-[#222] transition-colors block"
            >
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
            </Link>
          )
        })}
      </div>

      {/* Recent Payments */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">Recent Payments</h2>
        <Link
          href="/admin/payments"
          className="text-xs text-gray-500 hover:text-[#fa5c1b] transition-colors flex items-center gap-1"
        >
          All payments <ArrowRight size={11} />
        </Link>
      </div>
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
