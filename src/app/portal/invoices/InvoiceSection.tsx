import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Eye } from 'lucide-react'

const STATUS_STYLE: Record<string, string> = {
  sent:    'bg-blue-500/20 text-blue-400',
  paid:    'bg-green-500/20 text-green-400',
  overdue: 'bg-red-500/20 text-red-400',
}

type PortalInvoice = {
  id: string
  invoice_number: string
  status: string
  issue_date: string
  due_date: string
  gst_percent: number
  invoice_items: { quantity: number; unit_price: number }[]
}

function calcTotal(inv: PortalInvoice) {
  const sub = inv.invoice_items.reduce((s, i) => s + i.quantity * i.unit_price, 0)
  return sub + sub * (inv.gst_percent / 100)
}

export default async function InvoiceSection({ clientId }: { clientId: string }) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('invoices')
    .select('id, invoice_number, status, issue_date, due_date, gst_percent, invoice_items(quantity, unit_price)')
    .eq('client_id', clientId)
    .in('status', ['sent', 'paid', 'overdue'])
    .order('issue_date', { ascending: false })
    .limit(100)

  if (error) {
    if (error.message.includes('does not exist') || error.message.includes('relation')) {
      return (
        <div className="text-gray-600 text-sm py-8 text-center">
          Invoice feature is being set up. Check back soon.
        </div>
      )
    }
    return <div className="text-red-400 text-sm">Failed to load invoices.</div>
  }

  const invoices = (data ?? []) as PortalInvoice[]

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((s, i) => s + calcTotal(i), 0)

  const outstanding = invoices
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((s, i) => s + calcTotal(i), 0)

  return (
    <>
      {/* Pending alert */}
      {invoices.some((i) => i.status === 'overdue') && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <p className="text-red-400 text-sm">
            You have overdue invoices. Please contact your account manager.
          </p>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-2">Total Paid</p>
          <p className="text-3xl font-bold text-green-400">
            ₹{totalPaid.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="bg-[#1c1b1b] rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-2">Outstanding</p>
          <p className={`text-3xl font-bold ${outstanding > 0 ? 'text-orange-400' : 'text-white'}`}>
            ₹{outstanding.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {/* Invoice list */}
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden">
        {invoices.length === 0 ? (
          <p className="text-sm text-gray-600 p-8 text-center">No invoices yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Invoice #</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">
                  Issue Date
                </th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3 hidden sm:table-cell">
                  Due Date
                </th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3">Amount</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Status</th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3 font-mono text-xs text-[#fa5c1b] font-semibold">
                    {inv.invoice_number}
                  </td>
                  <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">
                    {new Date(inv.issue_date + 'T00:00:00').toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">
                    {new Date(inv.due_date + 'T00:00:00').toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3 text-right text-white font-semibold tabular-nums">
                    ₹{calcTotal(inv).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                        STATUS_STYLE[inv.status] ?? 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/portal/invoices/${inv.id}`}
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      <Eye size={12} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
