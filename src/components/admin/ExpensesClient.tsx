'use client'

import { useState } from 'react'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, Trash2, Download } from 'lucide-react'

type ClientOption = { id: string; name: string; retainer_amount: number; status: string }

type Expense = {
  id: string
  description: string
  category: string
  amount: number
  date: string | null
  notes: string | null
  client_id: string | null
  clients: { name: string } | null
}

const CATEGORIES = ['Software', 'Ads', 'Operations', 'Travel', 'Freelancer', 'Other']

const CATEGORY_STYLE: Record<string, string> = {
  Software:   'text-blue-400',
  Ads:        'text-purple-400',
  Operations: 'text-orange-400',
  Travel:     'text-teal-400',
  Freelancer: 'text-pink-400',
  Other:      'text-gray-400',
}

const thCls =
  'sticky top-0 z-10 bg-[#0e0e0e] text-left text-[10px] text-gray-400 font-medium uppercase tracking-wider px-3 py-3 border-b border-white/10 whitespace-nowrap select-none'
const editInputCls =
  'w-full bg-[#0e0e0e] text-white text-sm px-2 py-0.5 rounded border border-[#fa5c1b] focus:outline-none'
const editSelectCls =
  'w-full bg-[#111] text-white text-sm px-2 py-0.5 rounded border border-[#fa5c1b] focus:outline-none cursor-pointer'
const filterSelectCls =
  'bg-[#1c1b1b] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] cursor-pointer'

export default function ExpensesClient({
  initialExpenses,
  clients,
}: {
  initialExpenses: Expense[]
  clients: ClientOption[]
}) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)

  // ── Filters ────────────────────────────────────────────────────────────────
  const [filterMonth, setFilterMonth] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // ── Inline edit ────────────────────────────────────────────────────────────
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null)
  const [editValue, setEditValue] = useState('')

  // ── New inline row ─────────────────────────────────────────────────────────
  const [showNewRow, setShowNewRow] = useState(false)
  const [newRow, setNewRow] = useState({
    description: '', category: 'Software', client_id: '',
    amount: '', date: new Date().toISOString().split('T')[0], notes: '',
  })
  const [newRowSaving, setNewRowSaving] = useState(false)
  const [newRowError, setNewRowError] = useState('')

  // ── Delete confirm ─────────────────────────────────────────────────────────
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // ── Stats ──────────────────────────────────────────────────────────────────
  const now = new Date()
  const mrr = clients.filter(c => c.status === 'active').reduce((s, c) => s + c.retainer_amount, 0)
  const thisMonthExpenses = expenses
    .filter(e => {
      if (!e.date) return false
      const d = new Date(e.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((s, e) => s + e.amount, 0)
  const netProfit = mrr - thisMonthExpenses

  // ── Derived ────────────────────────────────────────────────────────────────
  const months = Array.from(new Set(
    expenses.filter(e => e.date).map(e => {
      const d = new Date(e.date!)
      return `${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`
    })
  )).sort()

  const filtered = expenses
    .filter(e => {
      if (!filterMonth) return true
      if (!e.date) return false
      const d = new Date(e.date)
      const label = `${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`
      return label === filterMonth
    })
    .filter(e => !filterCategory || e.category === filterCategory)

  const isEditing = (id: string, field: string) =>
    editingCell?.id === id && editingCell.field === field

  // ── Inline edit handlers ───────────────────────────────────────────────────
  function startEdit(id: string, field: string, value: string) {
    setEditingCell({ id, field })
    setEditValue(value ?? '')
  }

  async function commitEdit(expense: Expense) {
    if (!editingCell || editingCell.id !== expense.id) return
    const { field } = editingCell
    let val: string | number | null = editValue.trim()
    if (field === 'amount') val = parseFloat(editValue) || 0
    if ((field === 'date' || field === 'notes') && !editValue.trim()) val = null

    const supabase = createSupabaseClient()
    await supabase.from('expenses').update({ [field]: val }).eq('id', expense.id)

    let updated: Expense = { ...expense, [field]: val }
    if (field === 'client_id') {
      const c = clients.find(cl => cl.id === val)
      updated = { ...updated, clients: c ? { name: c.name } : null }
    }
    setExpenses(prev => prev.map(e => e.id === expense.id ? updated : e))
    setEditingCell(null)
  }

  async function commitSelect(expense: Expense, field: string, val: string) {
    const supabase = createSupabaseClient()
    await supabase.from('expenses').update({ [field]: val || null }).eq('id', expense.id)
    let updated: Expense = { ...expense, [field]: val || null }
    if (field === 'client_id') {
      const c = clients.find(cl => cl.id === val)
      updated = { ...updated, clients: c ? { name: c.name } : null }
    }
    setExpenses(prev => prev.map(e => e.id === expense.id ? updated : e))
    setEditingCell(null)
  }

  function onKeyDown(e: React.KeyboardEvent, expense: Expense) {
    if (e.key === 'Enter') { e.preventDefault(); commitEdit(expense) }
    if (e.key === 'Escape') setEditingCell(null)
  }

  // ── New row ────────────────────────────────────────────────────────────────
  async function saveNewRow() {
    if (!newRow.description) { setNewRowError('Description is required'); return }
    if (!newRow.amount) { setNewRowError('Amount is required'); return }
    setNewRowSaving(true); setNewRowError('')
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        description: newRow.description,
        category: newRow.category,
        client_id: newRow.client_id || null,
        amount: parseFloat(newRow.amount) || 0,
        date: newRow.date || null,
        notes: newRow.notes || null,
      })
      .select('*, clients(name)')
      .single()
    if (!error && data) {
      setExpenses(prev => [data as unknown as Expense, ...prev])
      setShowNewRow(false)
      setNewRow({ description: '', category: 'Software', client_id: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' })
    } else {
      setNewRowError(error?.message ?? 'Failed to save')
    }
    setNewRowSaving(false)
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    const supabase = createSupabaseClient()
    await supabase.from('expenses').delete().eq('id', id)
    setExpenses(prev => prev.filter(e => e.id !== id))
    setDeleteConfirm(null)
  }

  // ── CSV ────────────────────────────────────────────────────────────────────
  function exportCSV() {
    const header = ['Description', 'Category', 'Client', 'Amount', 'Date', 'Notes']
    const rows = filtered.map(e => [
      e.description, e.category, e.clients?.name ?? '', e.amount, e.date ?? '', e.notes ?? '',
    ])
    const csv = [header, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'expenses.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-8 max-w-[1600px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Expenses</h1>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 border border-white/10 text-gray-300 rounded-lg px-4 py-2 text-sm hover:border-white/30 hover:text-white transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b]">
          <p className="text-sm text-gray-400 mb-2">This Month Expenses</p>
          <p className="text-2xl font-bold text-white tabular-nums">₹{thisMonthExpenses.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2 border-[#fa5c1b]">
          <p className="text-sm text-gray-400 mb-2">Monthly MRR</p>
          <p className="text-2xl font-bold text-white tabular-nums">₹{mrr.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2" style={{ borderColor: netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
          <p className="text-sm text-gray-400 mb-2">Net Profit</p>
          <p className="text-2xl font-bold tabular-nums" style={{ color: netProfit >= 0 ? '#22c55e' : '#ef4444' }}>
            {netProfit < 0 ? '−' : ''}₹{Math.abs(netProfit).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className={filterSelectCls}>
          <option value="">All Months</option>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className={filterSelectCls}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {(filterMonth || filterCategory) && (
          <button
            onClick={() => { setFilterMonth(''); setFilterCategory('') }}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Clear filters
          </button>
        )}
        <span className="text-xs text-gray-600 ml-auto">{filtered.length} row{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Ledger Table */}
      <div className="rounded-xl border border-white/5 overflow-auto" style={{ maxHeight: '60vh' }}>
        <table className="w-full text-sm border-collapse" style={{ minWidth: 900 }}>
          <thead>
            <tr>
              <th className={thCls} style={{ minWidth: 180 }}>Description</th>
              <th className={thCls} style={{ minWidth: 120 }}>Category</th>
              <th className={thCls} style={{ minWidth: 140 }}>Client</th>
              <th className={`${thCls} text-right`} style={{ minWidth: 110 }}>Amount (₹)</th>
              <th className={thCls} style={{ minWidth: 120 }}>Date</th>
              <th className={thCls} style={{ minWidth: 200 }}>Notes</th>
              <th className={thCls} style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && !showNewRow && (
              <tr>
                <td colSpan={7} className="text-center text-gray-600 py-12 text-sm bg-[#131313]">
                  No expenses match the current filters.
                </td>
              </tr>
            )}
            {filtered.map((expense, i) => {
              const rowBg = i % 2 === 0 ? 'bg-[#131313]' : 'bg-[#1a1a1a]'
              const tdBase = `px-3 py-2.5 border-b border-white/[0.04] ${rowBg}`
              return (
                <tr key={expense.id} className="group">
                  {/* Description */}
                  <td className={tdBase}>
                    {isEditing(expense.id, 'description') ? (
                      <input value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(expense)}
                        onKeyDown={e => onKeyDown(e, expense)}
                        className={editInputCls} placeholder="Canva Pro" />
                    ) : (
                      <span
                        onClick={() => startEdit(expense.id, 'description', expense.description)}
                        className="cursor-pointer text-white hover:opacity-80"
                        title="Click to edit"
                      >{expense.description}</span>
                    )}
                  </td>

                  {/* Category */}
                  <td className={tdBase}>
                    {isEditing(expense.id, 'category') ? (
                      <select value={editValue} autoFocus
                        onChange={e => commitSelect(expense, 'category', e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        className={editSelectCls}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : (
                      <span
                        onClick={() => startEdit(expense.id, 'category', expense.category)}
                        className={`cursor-pointer text-sm font-medium ${CATEGORY_STYLE[expense.category] ?? 'text-gray-400'}`}
                        title="Click to edit"
                      >{expense.category}</span>
                    )}
                  </td>

                  {/* Client */}
                  <td className={tdBase}>
                    {isEditing(expense.id, 'client_id') ? (
                      <select value={editValue} autoFocus
                        onChange={e => commitSelect(expense, 'client_id', e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        className={editSelectCls}
                      >
                        <option value="">— None —</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    ) : (
                      <span
                        onClick={() => startEdit(expense.id, 'client_id', expense.client_id ?? '')}
                        className="cursor-pointer text-gray-400 hover:text-white"
                        title="Click to edit"
                      >{expense.clients?.name ?? <span className="text-gray-600">—</span>}</span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className={`${tdBase} text-right`}>
                    {isEditing(expense.id, 'amount') ? (
                      <input type="number" min="0" value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(expense)}
                        onKeyDown={e => onKeyDown(e, expense)}
                        className={`${editInputCls} text-right`} />
                    ) : (
                      <span
                        onClick={() => startEdit(expense.id, 'amount', String(expense.amount))}
                        className="cursor-pointer font-medium text-white tabular-nums hover:text-[#fa5c1b]"
                        title="Click to edit"
                      >₹{expense.amount.toLocaleString('en-IN')}</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className={tdBase}>
                    {isEditing(expense.id, 'date') ? (
                      <input type="date" value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(expense)}
                        onKeyDown={e => onKeyDown(e, expense)}
                        className={editInputCls} />
                    ) : (
                      <span
                        onClick={() => startEdit(expense.id, 'date', expense.date ?? '')}
                        className="cursor-pointer text-gray-400 hover:text-white"
                        title="Click to edit"
                      >
                        {expense.date ? expense.date.split('-').reverse().join('/') : <span className="text-gray-600">—</span>}
                      </span>
                    )}
                  </td>

                  {/* Notes */}
                  <td className={tdBase}>
                    {isEditing(expense.id, 'notes') ? (
                      <input value={editValue} autoFocus
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(expense)}
                        onKeyDown={e => onKeyDown(e, expense)}
                        className={editInputCls} placeholder="add note…" />
                    ) : (
                      <span
                        onClick={() => startEdit(expense.id, 'notes', expense.notes ?? '')}
                        className="cursor-pointer text-gray-500 hover:text-white text-xs"
                        title="Click to add note"
                      >
                        {expense.notes || <span className="italic text-gray-700">add note…</span>}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className={`${tdBase} text-center`}>
                    {deleteConfirm === expense.id ? (
                      <div className="flex items-center gap-1.5 justify-center">
                        <button onClick={() => handleDelete(expense.id)} className="text-[10px] text-red-400 hover:text-red-300 font-medium">Delete</button>
                        <span className="text-gray-700 text-[10px]">|</span>
                        <button onClick={() => setDeleteConfirm(null)} className="text-[10px] text-gray-500 hover:text-white">Cancel</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(expense.id)}
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
                  <input value={newRow.description} onChange={e => setNewRow(r => ({ ...r, description: e.target.value }))} className={editInputCls} placeholder="Description *" autoFocus />
                </td>
                <td className="px-3 py-2">
                  <select value={newRow.category} onChange={e => setNewRow(r => ({ ...r, category: e.target.value }))} className={editSelectCls}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select value={newRow.client_id} onChange={e => setNewRow(r => ({ ...r, client_id: e.target.value }))} className={editSelectCls}>
                    <option value="">— None —</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input type="number" min="0" value={newRow.amount} onChange={e => setNewRow(r => ({ ...r, amount: e.target.value }))} className={`${editInputCls} text-right`} placeholder="0" />
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

