'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, X } from 'lucide-react'

type ClientOption = { id: string; name: string; color_tag: string; retainer_amount: number; status: string }

type Payment = {
  id: string
  amount: number
  month: string
  status: string
  date: string | null
  client_id: string | null
  clients: { name: string; color_tag: string } | null
}

const inputCls =
  'w-full bg-[#0e0e0e] text-white text-sm px-3 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] placeholder:text-gray-600'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div
      className="bg-[#1c1b1b] rounded-xl p-5 border-t-2"
      style={{ borderColor: accent ?? '#fa5c1b' }}
    >
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
    </div>
  )
}

const currentMonthLabel = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })

function getCurrentMonthKey() {
  const now = new Date()
  return `${now.toLocaleString('en-US', { month: 'long' })} ${now.getFullYear()}`
}

export default function PaymentsClient({
  initialPayments,
  clients,
}: {
  initialPayments: Payment[]
  clients: ClientOption[]
}) {
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    client_id: '',
    amount: '',
    month: currentMonthLabel,
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
  })

  // Compute stats
  const mrr = clients
    .filter((c) => c.status === 'active')
    .reduce((s, c) => s + c.retainer_amount, 0)

  const thisMonth = getCurrentMonthKey()
  const thisMonthReceived = payments
    .filter((p) => p.month === thisMonth && p.status === 'received')
    .reduce((s, p) => s + p.amount, 0)
  const thisMonthPending = payments
    .filter((p) => p.month === thisMonth && p.status === 'pending')
    .reduce((s, p) => s + p.amount, 0)
  const allTimeTotal = payments
    .filter((p) => p.status === 'received')
    .reduce((s, p) => s + p.amount, 0)

  async function toggleStatus(payment: Payment) {
    setToggling(payment.id)
    const newStatus = payment.status === 'received' ? 'pending' : 'received'
    const supabase = createSupabaseClient()
    const { error: err } = await supabase
      .from('payments')
      .update({ status: newStatus })
      .eq('id', payment.id)

    if (!err) {
      setPayments((prev) =>
        prev.map((p) => (p.id === payment.id ? { ...p, status: newStatus } : p))
      )
      router.refresh()
    }
    setToggling(null)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase
      .from('payments')
      .insert({
        client_id: form.client_id || null,
        amount: parseFloat(form.amount) || 0,
        month: form.month,
        status: form.status,
        date: form.date || null,
      })
      .select('*, clients(name, color_tag)')
      .single()

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setPayments((prev) => [data as unknown as Payment, ...prev])
    setShowModal(false)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Payments</h1>
        <button
          onClick={() => {
            setForm({
              client_id: '',
              amount: '',
              month: currentMonthLabel,
              status: 'pending',
              date: new Date().toISOString().split('T')[0],
            })
            setError('')
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-[#fa5c1b] text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          Add Payment
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <StatCard label="Monthly MRR" value={`₹${mrr.toLocaleString('en-IN')}`} />
        <StatCard
          label="This Month Received"
          value={`₹${thisMonthReceived.toLocaleString('en-IN')}`}
          accent="#22c55e"
        />
        <StatCard
          label="This Month Pending"
          value={`₹${thisMonthPending.toLocaleString('en-IN')}`}
          accent="#eab308"
        />
        <StatCard label="All Time Total" value={`₹${allTimeTotal.toLocaleString('en-IN')}`} />
      </div>

      {/* Table */}
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden">
        {payments.length === 0 ? (
          <p className="text-gray-600 text-sm p-8 text-center">No payments recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Client</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Month</th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3">Amount</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Date</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Status</th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
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
                  <td className="px-5 py-3 text-gray-400">
                    {p.date ? p.date.split('-').reverse().join('/') : '—'}
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
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => toggleStatus(p)}
                      disabled={toggling === p.id}
                      className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors disabled:opacity-40"
                    >
                      {toggling === p.id
                        ? '…'
                        : p.status === 'received'
                        ? 'Mark Pending'
                        : 'Mark Received'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Payment</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <form onSubmit={handleAdd} className="space-y-4">
              <Field label="Client">
                <select
                  value={form.client_id}
                  onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}
                  className={inputCls}
                >
                  <option value="">— No client —</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Amount (₹) *">
                <input
                  required
                  type="number"
                  min="0"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  className={inputCls}
                  placeholder="40000"
                />
              </Field>

              <Field label="Month *">
                <input
                  required
                  value={form.month}
                  onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))}
                  className={inputCls}
                  placeholder="April 2026"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="pending">Pending</option>
                    <option value="received">Received</option>
                  </select>
                </Field>
                <Field label="Date">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-[#fa5c1b] text-white font-medium text-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
                >
                  {saving ? 'Saving…' : 'Add Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
