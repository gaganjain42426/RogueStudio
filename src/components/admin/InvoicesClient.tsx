'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, Trash2, Eye, FileText, X, Pencil } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ClientOption = {
  id: string
  name: string
  color_tag: string
  status: string
}

export type InvoiceItem = {
  id: string
  invoice_id: string
  description: string
  quantity: number
  unit_price: number
  sort_order: number
}

export type Invoice = {
  id: string
  invoice_number: string
  client_id: string | null
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  issue_date: string
  due_date: string
  notes: string | null
  gst_percent: number
  created_at: string
  clients: { name: string; color_tag: string } | null
  invoice_items: InvoiceItem[]
}

type FormItem = { description: string; quantity: string; unit_price: string }
type FormState = {
  client_id: string
  invoice_number: string
  issue_date: string
  due_date: string
  gst_percent: string
  notes: string
  items: FormItem[]
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  draft:   'text-gray-400 bg-gray-500/10',
  sent:    'text-blue-400 bg-blue-500/10',
  paid:    'text-green-400 bg-green-500/10',
  overdue: 'text-red-400 bg-red-500/10',
}

const inputCls =
  'w-full bg-[#0e0e0e] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] placeholder:text-gray-700 transition-colors'
const selectCls =
  'w-full bg-[#0e0e0e] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] cursor-pointer transition-colors'

// ── Helpers ───────────────────────────────────────────────────────────────────

function invoiceSubtotal(inv: Invoice) {
  return inv.invoice_items.reduce((s, i) => s + i.quantity * i.unit_price, 0)
}

function invoiceTotal(inv: Invoice) {
  const sub = invoiceSubtotal(inv)
  return sub + sub * (inv.gst_percent / 100)
}

function generateNextNumber(existing: Invoice[]): string {
  const year = new Date().getFullYear()
  const nums = existing
    .map((i) => i.invoice_number.match(/RS-\d{4}-(\d+)/)?.[1])
    .filter(Boolean)
    .map(Number)
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1
  return `RS-${year}-${String(next).padStart(3, '0')}`
}

function emptyForm(nextNum: string): FormState {
  const today = new Date().toISOString().split('T')[0]
  const due = new Date(Date.now() + 30 * 86_400_000).toISOString().split('T')[0]
  return {
    client_id: '',
    invoice_number: nextNum,
    issue_date: today,
    due_date: due,
    gst_percent: '0',
    notes: '',
    items: [{ description: '', quantity: '1', unit_price: '' }],
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="bg-[#1c1b1b] rounded-xl p-5 border-t-2" style={{ borderColor: accent }}>
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-gray-400 font-medium block mb-1.5">{label}</label>
      {children}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function InvoicesClient({
  initialInvoices,
  clients,
}: {
  initialInvoices: Invoice[]
  clients: ClientOption[]
}) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterClient, setFilterClient] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(() => emptyForm(generateNextNumber(initialInvoices)))
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((s, i) => s + invoiceTotal(i), 0)
  const outstanding = invoices
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((s, i) => s + invoiceTotal(i), 0)
  const draftCount = invoices.filter((i) => i.status === 'draft').length

  const filtered = invoices
    .filter((i) => !filterStatus || i.status === filterStatus)
    .filter((i) => !filterClient || i.client_id === filterClient)

  // ── Panel helpers ──────────────────────────────────────────────────────────
  function openCreate() {
    setEditingId(null)
    setForm(emptyForm(generateNextNumber(invoices)))
    setSaveError('')
    setPanelOpen(true)
  }

  function openEdit(inv: Invoice) {
    setEditingId(inv.id)
    setForm({
      client_id: inv.client_id ?? '',
      invoice_number: inv.invoice_number,
      issue_date: inv.issue_date,
      due_date: inv.due_date,
      gst_percent: String(inv.gst_percent),
      notes: inv.notes ?? '',
      items:
        inv.invoice_items.length > 0
          ? [...inv.invoice_items]
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((it) => ({
                description: it.description,
                quantity: String(it.quantity),
                unit_price: String(it.unit_price),
              }))
          : [{ description: '', quantity: '1', unit_price: '' }],
    })
    setSaveError('')
    setPanelOpen(true)
  }

  function addItem() {
    setForm((f) => ({ ...f, items: [...f.items, { description: '', quantity: '1', unit_price: '' }] }))
  }

  function removeItem(idx: number) {
    setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== idx) }))
  }

  function updateItem(idx: number, field: keyof FormItem, val: string) {
    setForm((f) => ({
      ...f,
      items: f.items.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    }))
  }

  // ── Save ───────────────────────────────────────────────────────────────────
  async function handleSave() {
    if (!form.invoice_number.trim()) { setSaveError('Invoice number is required'); return }
    if (!form.issue_date || !form.due_date) { setSaveError('Issue and due dates are required'); return }
    const validItems = form.items.filter((i) => i.description.trim())
    if (validItems.length === 0) { setSaveError('At least one line item with a description is required'); return }

    setSaving(true)
    setSaveError('')
    const supabase = createSupabaseClient()

    const invoicePayload = {
      invoice_number: form.invoice_number.trim(),
      client_id: form.client_id || null,
      issue_date: form.issue_date,
      due_date: form.due_date,
      gst_percent: parseFloat(form.gst_percent) || 0,
      notes: form.notes.trim() || null,
    }

    let invoiceId = editingId

    if (editingId) {
      const { error } = await supabase.from('invoices').update(invoicePayload).eq('id', editingId)
      if (error) { setSaveError(error.message); setSaving(false); return }
      await supabase.from('invoice_items').delete().eq('invoice_id', editingId)
    } else {
      const { data, error } = await supabase
        .from('invoices')
        .insert({ ...invoicePayload, status: 'draft' })
        .select('id')
        .single()
      if (error || !data) { setSaveError(error?.message ?? 'Failed to create'); setSaving(false); return }
      invoiceId = data.id
    }

    const itemRows = validItems.map((i, idx) => ({
      invoice_id: invoiceId!,
      description: i.description.trim(),
      quantity: parseFloat(i.quantity) || 1,
      unit_price: parseFloat(i.unit_price) || 0,
      sort_order: idx,
    }))

    const { error: itemsError } = await supabase.from('invoice_items').insert(itemRows)
    if (itemsError) { setSaveError(itemsError.message); setSaving(false); return }

    // Re-fetch saved invoice to get joined data
    const { data: saved } = await supabase
      .from('invoices')
      .select('*, invoice_items(*), clients(name, color_tag)')
      .eq('id', invoiceId!)
      .single()

    if (saved) {
      const typed = saved as unknown as Invoice
      if (editingId) {
        setInvoices((prev) => prev.map((i) => (i.id === editingId ? typed : i)))
      } else {
        setInvoices((prev) => [typed, ...prev])
      }
    }

    setPanelOpen(false)
    setSaving(false)
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    const supabase = createSupabaseClient()
    await supabase.from('invoices').delete().eq('id', id)
    setInvoices((prev) => prev.filter((i) => i.id !== id))
    setDeleteConfirm(null)
  }

  // ── Form totals preview ────────────────────────────────────────────────────
  const previewSubtotal = form.items.reduce(
    (s, i) => s + (parseFloat(i.quantity) || 0) * (parseFloat(i.unit_price) || 0),
    0,
  )
  const previewGst = previewSubtotal * ((parseFloat(form.gst_percent) || 0) / 100)
  const previewTotal = previewSubtotal + previewGst

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-8 max-w-[1400px]">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {invoices.length} invoice{invoices.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#fa5c1b] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={15} />
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Invoices" value={String(invoices.length)} accent="#fa5c1b" />
        <StatCard label="Total Paid" value={`₹${totalPaid.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} accent="#22c55e" />
        <StatCard label="Outstanding" value={`₹${outstanding.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} accent="#eab308" />
        <StatCard label="Drafts" value={String(draftCount)} accent="#6b7280" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#1c1b1b] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
        <select
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="bg-[#1c1b1b] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] cursor-pointer"
        >
          <option value="">All Clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {(filterStatus || filterClient) && (
          <button
            onClick={() => { setFilterStatus(''); setFilterClient('') }}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
        <span className="text-xs text-gray-600 ml-auto">
          {filtered.length} row{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 overflow-auto">
        <table className="w-full text-sm" style={{ minWidth: 720 }}>
          <thead>
            <tr>
              {['Invoice #', 'Client', 'Issue Date', 'Due Date', 'Amount', 'Status', ''].map((h, i) => (
                <th
                  key={i}
                  className="sticky top-0 z-10 bg-[#0e0e0e] text-left text-[10px] text-gray-400 font-medium uppercase tracking-wider px-4 py-3 border-b border-white/10 whitespace-nowrap"
                  style={h === 'Amount' ? { textAlign: 'right' } : {}}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-600 py-16 bg-[#131313] text-sm">
                  No invoices yet. Click <span className="text-[#fa5c1b]">New Invoice</span> to create one.
                </td>
              </tr>
            )}
            {filtered.map((inv, i) => {
              const total = invoiceTotal(inv)
              const rowBg = i % 2 === 0 ? 'bg-[#131313]' : 'bg-[#1a1a1a]'
              const td = `px-4 py-3 border-b border-white/[0.04] ${rowBg}`
              return (
                <tr key={inv.id} className="group">
                  <td className={td}>
                    <span className="font-mono text-xs text-[#fa5c1b] font-semibold">{inv.invoice_number}</span>
                  </td>
                  <td className={td}>
                    <div className="flex items-center gap-2">
                      {inv.clients?.color_tag && (
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: inv.clients.color_tag }}
                        />
                      )}
                      <span className="text-white">
                        {inv.clients?.name ?? <span className="text-gray-600">—</span>}
                      </span>
                    </div>
                  </td>
                  <td className={`${td} text-gray-400`}>
                    {inv.issue_date
                      ? new Date(inv.issue_date + 'T00:00:00').toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className={`${td} text-gray-400`}>
                    {inv.due_date
                      ? new Date(inv.due_date + 'T00:00:00').toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className={`${td} text-right font-semibold text-white tabular-nums`}>
                    ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className={td}>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${STATUS_COLORS[inv.status] ?? 'text-gray-400 bg-gray-500/10'}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className={`${td} text-right`}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="View Invoice"
                      >
                        <Eye size={14} />
                      </Link>
                      <button
                        onClick={() => openEdit(inv)}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === inv.id ? (
                        <div className="flex items-center gap-1 text-[11px] px-1">
                          <button
                            onClick={() => handleDelete(inv.id)}
                            className="text-red-400 hover:text-red-300 font-medium"
                          >
                            Delete
                          </button>
                          <span className="text-gray-700">|</span>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-gray-500 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(inv.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Create / Edit Panel ────────────────────────────────────────────── */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPanelOpen(false)}
          />
          {/* Drawer */}
          <div className="relative ml-auto w-full max-w-[560px] h-full bg-[#131313] flex flex-col overflow-hidden shadow-2xl border-l border-white/5">

            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#fa5c1b]" />
                <h2 className="text-white font-semibold">
                  {editingId ? 'Edit Invoice' : 'New Invoice'}
                </h2>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              {/* Invoice # + Client */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Invoice Number">
                  <input
                    value={form.invoice_number}
                    onChange={(e) => setForm((f) => ({ ...f, invoice_number: e.target.value }))}
                    className={inputCls}
                    placeholder="RS-2026-001"
                  />
                </Field>
                <Field label="Client">
                  <select
                    value={form.client_id}
                    onChange={(e) => setForm((f) => ({ ...f, client_id: e.target.value }))}
                    className={selectCls}
                  >
                    <option value="">— Select Client —</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Issue Date">
                  <input
                    type="date"
                    value={form.issue_date}
                    onChange={(e) => setForm((f) => ({ ...f, issue_date: e.target.value }))}
                    className={inputCls}
                  />
                </Field>
                <Field label="Due Date">
                  <input
                    type="date"
                    value={form.due_date}
                    onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* GST */}
              <Field label="GST">
                <select
                  value={form.gst_percent}
                  onChange={(e) => setForm((f) => ({ ...f, gst_percent: e.target.value }))}
                  className={selectCls}
                >
                  <option value="0">No GST (0%)</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18% (Standard)</option>
                  <option value="28">28%</option>
                </select>
              </Field>

              {/* Line Items */}
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                  Line Items
                </p>

                {/* Column headers */}
                <div className="grid grid-cols-[1fr_60px_90px_28px] gap-2 mb-1.5 px-0.5">
                  <span className="text-[10px] text-gray-600">Description</span>
                  <span className="text-[10px] text-gray-600 text-center">Qty</span>
                  <span className="text-[10px] text-gray-600 text-right">Rate (₹)</span>
                  <span />
                </div>

                <div className="space-y-2">
                  {form.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_60px_90px_28px] gap-2 items-center">
                      <input
                        value={item.description}
                        onChange={(e) => updateItem(idx, 'description', e.target.value)}
                        placeholder="e.g. Social Media Management"
                        className={inputCls}
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={item.quantity}
                        onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                        placeholder="1"
                        className={`${inputCls} text-center`}
                      />
                      <input
                        type="number"
                        min="0"
                        value={item.unit_price}
                        onChange={(e) => updateItem(idx, 'unit_price', e.target.value)}
                        placeholder="0"
                        className={`${inputCls} text-right`}
                      />
                      <button
                        onClick={() => removeItem(idx)}
                        disabled={form.items.length === 1}
                        className="text-gray-600 hover:text-red-400 disabled:opacity-20 transition-colors flex-shrink-0"
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addItem}
                  className="mt-3 text-xs text-gray-500 hover:text-[#fa5c1b] flex items-center gap-1 transition-colors"
                >
                  <Plus size={12} /> Add Line Item
                </button>
              </div>

              {/* Totals preview */}
              {previewSubtotal > 0 && (
                <div className="bg-[#0e0e0e] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span className="tabular-nums">₹{previewSubtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  {previewGst > 0 && (
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>GST ({form.gst_percent}%)</span>
                      <span className="tabular-nums">₹{previewGst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="tabular-nums text-[#fa5c1b]">
                      ₹{previewTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              )}

              {/* Notes */}
              <Field label="Notes / Payment Terms (optional)">
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="e.g. Payment due within 30 days. Bank transfer or UPI accepted."
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>

            {/* Panel footer */}
            <div className="px-6 py-4 border-t border-white/5 flex-shrink-0">
              {saveError && (
                <p className="text-sm text-red-400 mb-3">{saveError}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setPanelOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-[#fa5c1b] hover:bg-orange-500 text-white text-sm font-semibold disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving…' : editingId ? 'Update Invoice' : 'Create Invoice'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
