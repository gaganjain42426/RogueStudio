'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, X, Trash2 } from 'lucide-react'

type ClientOption = { id: string; name: string; retainer_amount: number; status: string }

type Expense = {
  id: string
  description: string
  category: string
  amount: number
  date: string | null
  client_id: string | null
  clients: { name: string } | null
}

const CATEGORIES = ['Software', 'Ads', 'Operations', 'Travel', 'Other']

const CATEGORY_COLORS: Record<string, string> = {
  Software: 'bg-blue-500/20 text-blue-400',
  Ads: 'bg-purple-500/20 text-purple-400',
  Operations: 'bg-orange-500/20 text-orange-400',
  Travel: 'bg-teal-500/20 text-teal-400',
  Other: 'bg-gray-500/20 text-gray-400',
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

export default function ExpensesClient({
  initialExpenses,
  clients,
}: {
  initialExpenses: Expense[]
  clients: ClientOption[]
}) {
  const router = useRouter()
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    description: '',
    category: 'Software',
    client_id: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  })

  // Compute stats
  const now = new Date()
  const mrr = clients
    .filter((c) => c.status === 'active')
    .reduce((s, c) => s + c.retainer_amount, 0)

  const thisMonthExpenses = expenses
    .filter((e) => {
      if (!e.date) return false
      const d = new Date(e.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((s, e) => s + e.amount, 0)

  const netProfit = mrr - thisMonthExpenses

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase
      .from('expenses')
      .insert({
        description: form.description,
        category: form.category,
        client_id: form.client_id || null,
        amount: parseFloat(form.amount) || 0,
        date: form.date || null,
      })
      .select('*, clients(name)')
      .single()

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setExpenses((prev) => [data as unknown as Expense, ...prev])
    setShowModal(false)
    setSaving(false)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this expense? This cannot be undone.')) return
    const supabase = createSupabaseClient()
    const { error: err } = await supabase.from('expenses').delete().eq('id', id)
    if (!err) {
      setExpenses((prev) => prev.filter((e) => e.id !== id))
      router.refresh()
    }
  }

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Expenses</h1>
        <button
          onClick={() => {
            setForm({
              description: '',
              category: 'Software',
              client_id: '',
              amount: '',
              date: new Date().toISOString().split('T')[0],
            })
            setError('')
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-[#fa5c1b] text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          Add Expense
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b]">
          <p className="text-sm text-gray-400 mb-2">This Month Expenses</p>
          <p className="text-2xl font-bold text-white tabular-nums">
            ₹{thisMonthExpenses.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b]">
          <p className="text-sm text-gray-400 mb-2">Monthly MRR</p>
          <p className="text-2xl font-bold text-white tabular-nums">
            ₹{mrr.toLocaleString('en-IN')}
          </p>
        </div>
        <div
          className="bg-[#1c1b1b] rounded-xl p-5 border-t-2"
          style={{ borderColor: netProfit >= 0 ? '#22c55e' : '#ef4444' }}
        >
          <p className="text-sm text-gray-400 mb-2">Net Profit</p>
          <p
            className="text-2xl font-bold tabular-nums"
            style={{ color: netProfit >= 0 ? '#22c55e' : '#ef4444' }}
          >
            {netProfit >= 0 ? '' : '−'}₹{Math.abs(netProfit).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden">
        {expenses.length === 0 ? (
          <p className="text-gray-600 text-sm p-8 text-center">No expenses recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Description</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Category</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Client</th>
                <th className="text-right text-xs text-gray-500 font-medium px-5 py-3">Amount</th>
                <th className="text-left text-xs text-gray-500 font-medium px-5 py-3">Date</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3 text-white">{expense.description}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        CATEGORY_COLORS[expense.category] ?? 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{expense.clients?.name ?? '—'}</td>
                  <td className="px-5 py-3 text-right text-white font-medium tabular-nums">
                    ₹{expense.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-3 text-gray-400">
                    {expense.date ? expense.date.split('-').reverse().join('/') : '—'}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Expense</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <form onSubmit={handleAdd} className="space-y-4">
              <Field label="Description *">
                <input
                  required
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className={inputCls}
                  placeholder="Canva Pro subscription"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className={inputCls}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Client (optional)">
                  <select
                    value={form.client_id}
                    onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="">— None —</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Amount (₹) *">
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    className={inputCls}
                    placeholder="999"
                  />
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
                  {saving ? 'Saving…' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
