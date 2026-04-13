import { getPortalClient } from '@/lib/portal'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Payments — Client Portal' }

const STATUS_STYLE: Record<string, string> = {
  received: 'bg-green-500/20 text-green-400',
  pending:  'bg-orange-500/20 text-orange-400',
  overdue:  'bg-red-500/20 text-red-400',
}

type Payment = {
  id: string
  month: string
  amount: number
  status: string
  date: string | null
}

export default async function PortalPaymentsPage() {
  const { supabase, client } = await getPortalClient()

  const { data } = await supabase
    .from('payments')
    .select('id, month, amount, status, date')
    .eq('client_id', client.id)
    .order('date', { ascending: false, nullsFirst: false })

  const payments = (data ?? []) as Payment[]

  const totalPaid = payments
    .filter((p) => p.status === 'received')
    .reduce((s, p) => s + p.amount, 0)

  const outstanding = payments
    .filter((p) => p.status === 'pending' || p.status === 'overdue')
    .reduce((s, p) => s + p.amount, 0)

  const pendingCount = payments.filter((p) => p.status === 'pending').length

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <h1 className="text-2xl font-bold text-white mb-6">Payments</h1>

      {/* Pending notice */}
      {pendingCount > 0 && (
        <div className="mb-6 flex items-start gap-2 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
          <span className="text-orange-400 text-sm leading-relaxed">
            You have {pendingCount} pending payment{pendingCount > 1 ? 's' : ''}. Please contact
            your account manager.
          </span>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-2">Total Paid</p>
          <p className="text-3xl font-bold text-green-400">
            ₹{totalPaid.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-2">Outstanding Balance</p>
          <p className={`text-3xl font-bold ${outstanding > 0 ? 'text-orange-400' : 'text-white'}`}>
            ₹{outstanding.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Payments table */}
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden">
        {payments.length === 0 ? (
          <p className="text-sm text-gray-600 p-8 text-center">No payments recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Month</th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3">Amount</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Status</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3 text-white">{p.month}</td>
                  <td className="px-5 py-3 text-right text-white font-medium tabular-nums">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        STATUS_STYLE[p.status] ?? 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">
                    {p.date ? p.date.split('-').reverse().join('/') : '—'}
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
