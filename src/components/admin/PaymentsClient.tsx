'use client'

import { useState } from 'react'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, Trash2, Download } from 'lucide-react'

type ClientOption = { id: string; name: string; color_tag: string; retainer_amount: number; status: string }

type Payment = {
  id: string
  amount: number
  month: string
  status: string
  date: string | null
  notes: string | null
  client_id: string | null
  clients: { name: string; color_tag: string } | null
}

const STATUS_OPTIONS = ['received', 'pending', 'overdue']
const STATUS_STYLE: Record<string, string> = {
  received: 'text-green-400',
  pending:  'text-yellow-400',
  overdue:  'text-red-400',
}

const thCls =
  'sticky top-0 z-10 bg-[#0e0e0e] text-left text-[10px] text-gray-400 font-medium uppercase tracking-wider px-3 py-3 border-b border-white/10 whitespace-nowrap select-none'
const editInputCls =
  'w-full bg-[#0e0e0e] text-white text-sm px-2 py-0.5 rounded border border-[#fa5c1b] focus:outline-none'
const editSelectCls =
  'w-full bg-[#111] text-white text-sm px-2 py-0.5 rounded border border-[#fa5c1b] focus:outline-none cursor-pointer'
const filterSelectCls =
  'bg-[#1c1b1b] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] cursor-pointer'

function StatCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2" style={{ borderColor: accent ?? '#fa5c1b' }}>
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
    </div>
  )
}


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
  const [payments, setPayments] = useState<Payment[]>(initialPayments)

  // ── Filters ────────────────────────────────────────────────────────────────
  const [filterMonth, setFilterMonth] = useState('')
  const [filterClient, setFilterClient] = useState('')

  // ── Inline edit ────────────────────────────────────────────────────────────
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null)
  const [editValue, setEditValue] = useState('')

  // ── New inline row ─────────────────────────────────────────────────────────
  const [showNewRow, setShowNewRow] = useState(false)
  const [newRow, setNewRow] = useState({
    client_id: '', month: getCurrentMonthKey(), amount: '',
    status: 'pending', date: new Date().toISOString().split('T')[0], notes: '',
  })
  const [newRowSaving, setNewRowSaving] = useState(false)
  const [newRowError, setNewRowError] = useState('')

  // ── Delete confirm ─────────────────────────────────────────────────────────
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // ── Stats ──────────────────────────────────────────────────────────────────
  const thisMonthKey = getCurrentMonthKey()
  const mrr = clients.filter(c => c.status === 'active').reduce((s, c) => s + c.retainer_amount, 0)
  const thisMonthReceived = payments
    .filter(p => p.month === thisMonthKey && p.status === 'received')
    .reduce((s, p) => s + p.amount, 0)
  const thisMonthPending = payments
    .filter(p => p.month === thisMonthKey && p.status === 'pending')
    .reduce((s, p) => s + p.amount, 0)
  const allTimeTotal = payments
    .filter(p => p.status === 'received')
    .reduce((s, p) => s + p.amount, 0)
  const todayStr = new Date().toISOString().split('T')[0]
  const overdueIds = payments
    .filter(p => p.status === 'pending' && p.date && p.date < todayStr)
    .map(p => p.id)

  async function markAllOverdue() {
    if (overdueIds.length === 0) return
    const supabase = createSupabaseClient()
    await supabase.from('payments').update({ status: 'overdue' }).in('id', overdueIds)
    setPayments(prev => prev.map(p => overdueIds.includes(p.id) ? { ...p, status: 'overdue' } : p))
  }
  // ── Derived ────────────────────────────────────────────────────────────────
  const months = Array.from(new Set(payments.map(p => p.month))).sort()
  const filtered = payments
    .filter(p => !filterMonth || p.month === filterMonth)
    .filter(p => !filterClient || p.client_id === filterClient)

  const isEditing = (id: string, field: string) =>
    editingCell?.id === id && editingCell.field === field

  // ── Inline edit handlers ───────────────────────────────────────────────────
  function startEdit(id: string, field: string, value: string) {
    setEditingCell({ id, field })
    setEditValue(value ?? '')
  }

  async function commitEdit(payment: Payment) {
    if (!editingCell || editingCell.id !== payment.id) return
    const { field } = editingCell
    let val: string | number | null = editValue.trim()
    if (field === 'amount') val = parseFloat(editValue) || 0
    if ((field === 'date' || field === 'notes') && !editValue.trim()) val = null

    const supabase = createSupabaseClient()
    await supabase.from('payments').update({ [field]: val }).eq('id', payment.id)

    let updated: Payment = { ...payment, [field]: val }
    if (field === 'client_id') {
      const c = clients.find(cl => cl.id === val)
      updated = { ...updated, clients: c ? { name: c.name, color_tag: c.color_tag } : null }
    }
    setPayments(prev => prev.map(p => p.id === payment.id ? updated : p))
    setEditingCell(null)
  }

  async function commitSelect(payment: Payment, field: string, val: string) {
    const supabase = createSupabaseClient()
    await supabase.from('payments').update({ [field]: val || null }).eq('id', payment.id)
    let updated: Payment = { ...payment, [field]: val || null }
    if (field === 'client_id') {
      const c = clients.find(cl => cl.id === val)
      updated = { ...updated, clients: c ? { name: c.name, color_tag: c.color_tag } : null }
    }
    setPayments(prev => prev.map(p => p.id === payment.id ? updated : p))
    setEditingCell(null)
  }

  function onKeyDown(e: React.KeyboardEvent, payment: Payment) {
    if (e.key === 'Enter') { e.preventDefault(); commitEdit(payment) }
    if (e.key === 'Escape') setEditingCell(null)
  }

  // ── New row ────────────────────────────────────────────────────────────────
  async function saveNewRow() {
    if (!newRow.amount) { setNewRowError('Amount is required'); return }
    setNewRowSaving(true); setNewRowError('')
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('payments')
      .insert({
        client_id: newRow.client_id || null,
        amount: parseFloat(newRow.amount) || 0,
        month: newRow.month,
        status: newRow.status,
        date: newRow.date || null,
        notes: newRow.notes || null,
      })
      .select('*, clients(name, color_tag)')
      .single()
    if (!error && data) {
      setPayments(prev => [data as unknown as Payment, ...prev])
      setShowNewRow(false)
      setNewRow({
        client_id: '', month: getCurrentMonthKey(), amount: '',
        status: 'pending', date: new Date().toISOString().split('T')[0], notes: '',
      })
    } else {
      setNewRowError(error?.message ?? 'Failed to save')
    }
    setNewRowSaving(false)
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    const supabase = createSupabaseClient()
    await supabase.from('payments').delete().eq('id', id)
    setPayments(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  // ── CSV ────────────────────────────────────────────────────────────────────
  function exportCSV() {
    const header = ['Client', 'Month', 'Amount', 'Status', 'Payment Date', 'Notes']
    const rows = filtered.map(p => [
      p.clients?.name ?? '', p.month, p.amount, p.status, p.date ?? '', p.notes ?? '',
    ])
    const csv = [header, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'payments.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-8 max-w-[1600px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Payments</h1>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 border border-white/10 text-gray-300 rounded-lg px-4 py-2 text-sm hover:border-white/30 hover:text-white transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Overdue banner */}
      {overdueIds.length > 0 && (
        <div className="flex items-center justify-between bg-orange-500/10 border border-orange-500/30 rounded-xl px-5 py-3 mb-6">
          <p className="text-sm text-orange-400">
            <span className="font-semibold">{overdueIds.length}</span> payment{overdueIds.length > 1 ? 's are' : ' is'} past due and still marked as pending.
          </p>
          <button
            onClick={markAllOverdue}
            className="text-xs bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            Mark All Overdue
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Monthly MRR" value={`₹${mrr.toLocaleString('en-IN')}`} />
        <StatCard label="This Month Received" value={`₹${thisMonthReceived.toLocaleString('en-IN')}`} accent="#22c55e" />
        <StatCard label="This Month Pending" value={`₹${thisMonthPending.toLocaleString('en-IN')}`} accent="#eab308" />
        <StatCard label="All Time Total" value={`₹${allTimeTotal.toLocaleString('en-IN')}`} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className={filterSelectCls}>
          <option value="">All Months</option>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={filterClient} onChange={e => setFilterClient(e.target.value)} className={filterSelectCls}>
          <option value="">All Clients</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {(filterMonth || filterClient) && (
          <button
            onClick={() => { setFilterMonth(''); setFilterClient('') }}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Clear filters
          </button>
        )}
        <span className="text-xs text-gray-600 ml-auto">{filtered.length} row{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Ledger Table */}
      <div className="rounded-xl border border-white/5 overflow-auto" style={{ maxHeight: '60vh' }}>
        <table className="w-full text-sm border-collapse" style={{ minWidth: 820 }}>
          <thead>
            <tr>
              <th className={thCls} style={{ minWidth: 140 }}>Client</th>
              <th className={thCls} style={{ minWidth: 130 }}>Month</th>
              <th className={`${thCls} text-right`} style={{ minWidth: 110 }}>Amount (₹)</th>
              <th className={thCls} style={{ minWidth: 100 }}>Status</th>
              <th className={thCls} style={{ minWidth: 120 }}>Payment Date</th>
              <th className={thCls} style={{ minWidth: 200 }}>Notes</th>
              <th className={thCls} style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && !showNewRow && (
              <tr>
                <td colSpan={7} className="text-center text-gray-600 py-12 text-sm bg-[#131313]">
                  No payments match the current filters.
                </td>
              </tr>
            )}
            {filtered.map((p, i) => {
              const rowBg = i % 2 === 0 ? 'bg-[#131313]' : 'bg-[#1a1a1a]'
              const tdBase = `px-3 py-2.5 border-b border-white/[0.04] ${rowBg}`
              return (
                <tr key={p.id} className="group">
                  {/* Client */}
                  <td className={tdBase}>
                    {isEditing(p.id, 'client_id') ? (
                      <select
                        value={editValue} autoFocus
                        onChange={e => commitSelect(p, 'client_id', e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        className={editSelectCls}
                      >
                        <option value="">— None —</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    ) : (
                      <div
                        onClick={() => startEdit(p.id, 'client_id', p.client_id ?? '')}
                        className="flex items-center gap-1.5 cursor-pointer text-white min-h-[20px] hover:opacity-80"
                        title="Click to edit"
                      >
                        {p.clients?.color_tag && (
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.clients.color_tag }} />
                        )}
                        {p.clients?.name ?? <span className="text-gray-600">—</span>}
                      </div>
                    )}
                  </td>

                  {/* Month */}
                  <td className={tdBase}>
                    {isEditing(p.id, 'month') ? (
                      <input value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(p)}
                        onKeyDown={e => onKeyDown(e, p)}
                        className={editInputCls} placeholder="April 2026" />
                    ) : (
                      <span
                        onClick={() => startEdit(p.id, 'month', p.month)}
                        className="cursor-pointer text-gray-300 hover:text-white"
                        title="Click to edit"
                      >{p.month}</span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className={`${tdBase} text-right`}>
                    {isEditing(p.id, 'amount') ? (
                      <input type="number" min="0" value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(p)}
                        onKeyDown={e => onKeyDown(e, p)}
                        className={`${editInputCls} text-right`} />
                    ) : (
                      <span
                        onClick={() => startEdit(p.id, 'amount', String(p.amount))}
                        className="cursor-pointer font-medium text-white tabular-nums hover:text-[#fa5c1b]"
                        title="Click to edit"
                      >₹{p.amount.toLocaleString('en-IN')}</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className={tdBase}>
                    {isEditing(p.id, 'status') ? (
                      <select value={editValue} autoFocus
                        onChange={e => commitSelect(p, 'status', e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        className={editSelectCls}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    ) : (
                      <span
                        onClick={() => startEdit(p.id, 'status', p.status)}
                        className={`cursor-pointer text-sm font-medium capitalize ${STATUS_STYLE[p.status] ?? 'text-gray-400'}`}
                        title="Click to edit"
                      >{p.status}</span>
                    )}
                  </td>

                  {/* Payment Date */}
                  <td className={tdBase}>
                    {isEditing(p.id, 'date') ? (
                      <input type="date" value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(p)}
                        onKeyDown={e => onKeyDown(e, p)}
                        className={editInputCls} />
                    ) : (
                      <span
                        onClick={() => startEdit(p.id, 'date', p.date ?? '')}
                        className="cursor-pointer text-gray-400 hover:text-white"
                        title="Click to edit"
                      >
                        {p.date ? p.date.split('-').reverse().join('/') : <span className="text-gray-600">—</span>}
                      </span>
                    )}
                  </td>

                  {/* Notes */}
                  <td className={tdBase}>
                    {isEditing(p.id, 'notes') ? (
                      <input value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(p)}
                        onKeyDown={e => onKeyDown(e, p)}
                        className={editInputCls} placeholder="e.g. via bank transfer" />
                    ) : (
                      <span
                        onClick={() => startEdit(p.id, 'notes', p.notes ?? '')}
                        className="cursor-pointer text-gray-500 hover:text-white text-xs"
                        title="Click to add note"
                      >
                        {p.notes || <span className="italic text-gray-700">add note…</span>}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className={`${tdBase} text-center`}>
                    {deleteConfirm === p.id ? (
                      <div className="flex items-center gap-1.5 justify-center">
                        <button onClick={() => handleDelete(p.id)} className="text-[10px] text-red-400 hover:text-red-300 font-medium">Delete</button>
                        <span className="text-gray-700 text-[10px]">|</span>
                        <button onClick={() => setDeleteConfirm(null)} className="text-[10px] text-gray-500 hover:text-white">Cancel</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(p.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all p-1"
                        title="Delete row"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}

            {/* New inline row */}
            {showNewRow && (
              <tr className="bg-[#0e0e0e] border-t-2 border-[#fa5c1b]/30">
                <td className="px-3 py-2">
                  <select value={newRow.client_id} onChange={e => setNewRow(r => ({ ...r, client_id: e.target.value }))} className={editSelectCls}>
                    <option value="">— Client —</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input value={newRow.month} onChange={e => setNewRow(r => ({ ...r, month: e.target.value }))} className={editInputCls} placeholder="April 2026" />
                </td>
                <td className="px-3 py-2">
                  <input type="number" min="0" value={newRow.amount} onChange={e => setNewRow(r => ({ ...r, amount: e.target.value }))} className={`${editInputCls} text-right`} placeholder="0" />
                </td>
                <td className="px-3 py-2">
                  <select value={newRow.status} onChange={e => setNewRow(r => ({ ...r, status: e.target.value }))} className={editSelectCls}>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input type="date" value={newRow.date} onChange={e => setNewRow(r => ({ ...r, date: e.target.value }))} className={editInputCls} />
                </td>
                <td className="px-3 py-2">
                  <input value={newRow.notes} onChange={e => setNewRow(r => ({ ...r, notes: e.target.value }))} className={editInputCls} placeholder="Notes (optional)"
                    onKeyDown={e => { if (e.key === 'Enter') saveNewRow() }} />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <button onClick={saveNewRow} disabled={newRowSaving} className="text-[10px] font-semibold text-[#fa5c1b] hover:text-orange-300 disabled:opacity-50 whitespace-nowrap">
                      {newRowSaving ? '…' : 'Save Row'}
                    </button>
                    <button onClick={() => { setShowNewRow(false); setNewRowError('') }} className="text-[10px] text-gray-500 hover:text-white">✕</button>
                  </div>
                  {newRowError && <p className="text-[10px] text-red-400 mt-1 whitespace-nowrap">{newRowError}</p>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Row */}
      {!showNewRow && (
        <button
          onClick={() => setShowNewRow(true)}
          className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#fa5c1b] transition-colors"
        >
          <Plus size={14} /> Add Row
        </button>
      )}
    </div>
  )
}

