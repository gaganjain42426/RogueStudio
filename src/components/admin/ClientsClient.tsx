'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, X, Pencil, ChevronRight, Copy, Check, Trash2, Search } from 'lucide-react'

const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`
}

function fmtDate(d: string): string {
  const dt = new Date(d + 'T00:00:00')
  return `${dt.getDate()} ${SHORT_MONTHS[dt.getMonth()]} ${dt.getFullYear()}`
}

function fmtMonthYear(d: string): string {
  const dt = new Date(d + 'T00:00:00')
  return `${SHORT_MONTHS[dt.getMonth()]} ${dt.getFullYear()}`
}

function monthsSince(d: string): number {
  const dt = new Date(d + 'T00:00:00')
  const now = new Date()
  return (now.getFullYear() - dt.getFullYear()) * 12 + (now.getMonth() - dt.getMonth())
}

type Client = {
  id: string
  name: string
  industry: string
  contact_name: string
  contact_phone: string
  contact_email: string
  retainer_amount: number
  status: string
  color_tag: string
  notes: string
  portal_email: string | null
  onboarded_date: string | null
  billing_cycle_date: number | null
}

type Task = { id: string; title: string; status: string; priority: string; due_date: string | null }
type Payment = { id: string; amount: number; month: string; status: string }
type ContentEvent = { id: string; title: string; platform: string; content_type: string; scheduled_date: string; status: string }
type DetailTab = 'tasks' | 'payments' | 'content'

const STATUS_BADGE: Record<string, string> = {
  active:     'bg-green-500/20 text-green-400',
  paused:     'bg-yellow-500/20 text-yellow-400',
  contractor: 'bg-blue-500/20 text-blue-400',
  inactive:   'bg-gray-500/20 text-gray-400',
}

const PRIORITY_COLORS: Record<string, string> = {
  high:   'bg-red-500/20 text-red-400',
  medium: 'bg-orange-500/20 text-orange-400',
  low:    'bg-gray-500/20 text-gray-400',
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

type ClientFormState = {
  name: string; industry: string; contact_name: string; contact_phone: string
  contact_email: string; retainer_amount: string; status: string; color_tag: string; notes: string
  onboarded_date: string; billing_cycle_date: string
}

const defaultForm: ClientFormState = {
  name: '', industry: '', contact_name: '', contact_phone: '',
  contact_email: '', retainer_amount: '', status: 'active', color_tag: '#fa5c1b', notes: '',
  onboarded_date: '', billing_cycle_date: '',
}

function clientToForm(c: Client): ClientFormState {
  return {
    name: c.name, industry: c.industry ?? '', contact_name: c.contact_name ?? '',
    contact_phone: c.contact_phone ?? '', contact_email: c.contact_email ?? '',
    retainer_amount: String(c.retainer_amount ?? ''), status: c.status,
    color_tag: c.color_tag || '#fa5c1b', notes: c.notes ?? '',
    onboarded_date: c.onboarded_date ?? '',
    billing_cycle_date: c.billing_cycle_date != null ? String(c.billing_cycle_date) : '',
  }
}

function ClientForm({
  form, setForm, onSubmit, onClose, saving, error, submitLabel,
}: {
  form: ClientFormState
  setForm: React.Dispatch<React.SetStateAction<ClientFormState>>
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  saving: boolean
  error: string
  submitLabel: string
}) {
  return (
    <>
      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Client Name *">
          <input required value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
            className={inputCls} placeholder="Sarvatra Energy" />
        </Field>
        <Field label="Industry">
          <input value={form.industry}
            onChange={(e) => setForm(f => ({ ...f, industry: e.target.value }))}
            className={inputCls} placeholder="Renewable Energy" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Contact Name">
            <input value={form.contact_name}
              onChange={(e) => setForm(f => ({ ...f, contact_name: e.target.value }))}
              className={inputCls} placeholder="Arjun Gupta" />
          </Field>
          <Field label="Contact Phone">
            <input value={form.contact_phone}
              onChange={(e) => setForm(f => ({ ...f, contact_phone: e.target.value }))}
              className={inputCls} placeholder="+91 98765 43210" />
          </Field>
        </div>
        <Field label="Contact Email">
          <input type="email" value={form.contact_email}
            onChange={(e) => setForm(f => ({ ...f, contact_email: e.target.value }))}
            className={inputCls} placeholder="contact@client.com" />
        </Field>
        <Field label="Retainer Amount (₹/mo)">
          <input type="number" min="0" value={form.retainer_amount}
            onChange={(e) => setForm(f => ({ ...f, retainer_amount: e.target.value }))}
            className={inputCls} placeholder="40000" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <select value={form.status}
              onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
              className={inputCls}>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="contractor">Contractor</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>
          <Field label="Color Tag">
            <div className="flex items-center gap-2">
              <input type="color" value={form.color_tag}
                onChange={(e) => setForm(f => ({ ...f, color_tag: e.target.value }))}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0 flex-shrink-0" />
              <input value={form.color_tag}
                onChange={(e) => setForm(f => ({ ...f, color_tag: e.target.value }))}
                className={`${inputCls} flex-1`} placeholder="#fa5c1b" />
            </div>
          </Field>
        </div>
        <Field label="Notes">
          <textarea value={form.notes}
            onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
            className={`${inputCls} resize-none`} rows={3}
            placeholder="Internal notes about this client…" />
        </Field>
        <Field label="Onboarded On">
          <input type="date" value={form.onboarded_date}
            onChange={(e) => setForm(f => ({ ...f, onboarded_date: e.target.value }))}
            className={inputCls} />
        </Field>
        <Field label="Billing Cycle Date">
          <input type="number" min="1" max="31" value={form.billing_cycle_date}
            onChange={(e) => setForm(f => ({ ...f, billing_cycle_date: e.target.value }))}
            className={inputCls} placeholder="e.g. 15 (day of month)" />
          <p className="text-xs text-gray-600 mt-1">Day of month when invoice is generated</p>
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 rounded-lg bg-[#fa5c1b] text-white font-medium text-sm hover:opacity-90 disabled:opacity-60 transition-opacity">
            {saving ? 'Saving…' : submitLabel}
          </button>
        </div>
      </form>
    </>
  )
}

export default function ClientsClient({ initialClients }: { initialClients: Client[] }) {
  const router = useRouter()

  const [clients, setClients] = useState<Client[]>(initialClients)

  // Search + filter
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredClients = clients.filter((c) => {
    if (statusFilter && c.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        c.name.toLowerCase().includes(q) ||
        (c.contact_email ?? '').toLowerCase().includes(q) ||
        (c.industry ?? '').toLowerCase().includes(q)
      )
    }
    return true
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [addForm, setAddForm] = useState<ClientFormState>(defaultForm)
  const [addSaving, setAddSaving] = useState(false)
  const [addError, setAddError] = useState('')

  // Edit modal
  const [editClient, setEditClient] = useState<Client | null>(null)
  const [editForm, setEditForm] = useState<ClientFormState>(defaultForm)
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')

  // Detail slide-over
  const [detailClient, setDetailClient] = useState<Client | null>(null)
  const [activeTab, setActiveTab] = useState<DetailTab>('tasks')
  const [tabTasks, setTabTasks] = useState<Task[]>([])
  const [tabPayments, setTabPayments] = useState<Payment[]>([])
  const [tabContent, setTabContent] = useState<ContentEvent[]>([])
  const [tabLoading, setTabLoading] = useState(false)

  // Portal access
  const [showPortalForm, setShowPortalForm] = useState(false)
  const [portalForm, setPortalForm] = useState({ email: '', password: '' })
  const [portalSaving, setPortalSaving] = useState(false)
  const [portalError, setPortalError] = useState('')
  const [portalResult, setPortalResult] = useState<{ email: string; password: string } | null>(null)
  const [copied, setCopied] = useState(false)

  // ── Add client ──────────────────────────────────────────────────────────────

  function openAdd() { setAddForm(defaultForm); setAddError(''); setShowAddModal(true) }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setAddSaving(true); setAddError('')
    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase.from('clients').insert({
      name: addForm.name, industry: addForm.industry,
      contact_name: addForm.contact_name, contact_phone: addForm.contact_phone,
      contact_email: addForm.contact_email,
      retainer_amount: parseFloat(addForm.retainer_amount) || 0,
      status: addForm.status, color_tag: addForm.color_tag, notes: addForm.notes,
      onboarded_date: addForm.onboarded_date || null,
      billing_cycle_date: addForm.billing_cycle_date ? parseInt(addForm.billing_cycle_date) : null,
    }).select().single()
    if (err) { setAddError(err.message); setAddSaving(false); return }
    setClients(prev => [data as Client, ...prev])
    setShowAddModal(false); setAddSaving(false)
    router.refresh()
  }

  // ── Edit client ─────────────────────────────────────────────────────────────

  function openEdit(e: React.MouseEvent, client: Client) {
    e.stopPropagation()
    setEditClient(client); setEditForm(clientToForm(client)); setEditError('')
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editClient) return
    setEditSaving(true); setEditError('')
    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase.from('clients').update({
      name: editForm.name, industry: editForm.industry,
      contact_name: editForm.contact_name, contact_phone: editForm.contact_phone,
      contact_email: editForm.contact_email,
      retainer_amount: parseFloat(editForm.retainer_amount) || 0,
      status: editForm.status, color_tag: editForm.color_tag, notes: editForm.notes,
      onboarded_date: editForm.onboarded_date || null,
      billing_cycle_date: editForm.billing_cycle_date ? parseInt(editForm.billing_cycle_date) : null,
    }).eq('id', editClient.id).select().single()
    if (err) { setEditError(err.message); setEditSaving(false); return }
    const updated = data as Client
    setClients(prev => prev.map(c => c.id === editClient.id ? updated : c))
    if (detailClient?.id === editClient.id) setDetailClient(updated)
    setEditClient(null); setEditSaving(false)
    router.refresh()
  }

  // ── Delete client ────────────────────────────────────────────────────────────

  async function handleDeleteClient(id: string) {
    if (!confirm('Delete this client? This cannot be undone.')) return
    const supabase = createSupabaseClient()
    await supabase.from('clients').delete().eq('id', id)
    setClients((prev) => prev.filter((c) => c.id !== id))
    setEditClient(null)
    if (detailClient?.id === id) setDetailClient(null)
    router.refresh()
  }

  // ── Detail slide-over ───────────────────────────────────────────────────────

  const fetchTab = useCallback(async (clientId: string, tab: DetailTab) => {
    setTabLoading(true)
    const supabase = createSupabaseClient()
    if (tab === 'tasks') {
      const { data } = await supabase.from('tasks').select('id, title, status, priority, due_date')
        .eq('client_id', clientId).order('created_at', { ascending: false })
      setTabTasks(data ?? [])
    } else if (tab === 'payments') {
      const { data } = await supabase.from('payments').select('id, amount, month, status')
        .eq('client_id', clientId).order('created_at', { ascending: false })
      setTabPayments(data ?? [])
    } else {
      const { data } = await supabase.from('content_events')
        .select('id, title, platform, content_type, scheduled_date, status')
        .eq('client_id', clientId).order('scheduled_date')
      setTabContent(data ?? [])
    }
    setTabLoading(false)
  }, [])

  function openDetail(client: Client) {
    setDetailClient(client)
    setActiveTab('tasks')
    setTabTasks([]); setTabPayments([]); setTabContent([])
    setShowPortalForm(false); setPortalResult(null); setPortalError('')
    fetchTab(client.id, 'tasks')
  }

  function switchTab(tab: DetailTab) {
    setActiveTab(tab)
    if (!detailClient) return
    fetchTab(detailClient.id, tab)
  }

  // ── Portal access ───────────────────────────────────────────────────────────

  async function handleGeneratePortal(e: React.FormEvent) {
    e.preventDefault()
    if (!detailClient) return
    setPortalSaving(true); setPortalError('')
    const res = await fetch('/api/admin/create-client-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: portalForm.email, password: portalForm.password, clientId: detailClient.id }),
    })
    const json = await res.json()
    if (!res.ok) { setPortalError(json.error ?? 'Failed to create user'); setPortalSaving(false); return }
    const updatedClient = { ...detailClient, portal_email: portalForm.email }
    setDetailClient(updatedClient)
    setClients(prev => prev.map(c => c.id === detailClient.id ? updatedClient : c))
    setPortalResult({ email: portalForm.email, password: portalForm.password })
    setShowPortalForm(false); setPortalSaving(false)
  }

  function copyCredentials() {
    if (!portalResult) return
    navigator.clipboard.writeText(`Email: ${portalResult.email}\nPassword: ${portalResult.password}`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredClients.length} of {clients.length}</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#fa5c1b] text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={15} /> Add Client
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, industry…"
            className="w-full bg-[#1c1b1b] text-white text-sm pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] placeholder:text-gray-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1c1b1b] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="contractor">Contractor</option>
          <option value="inactive">Inactive</option>
        </select>
        {(search || statusFilter) && (
          <button
            onClick={() => { setSearch(''); setStatusFilter('') }}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Client Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-24 text-gray-600">
          {search || statusFilter ? 'No clients match your search.' : 'No clients yet. Add your first client to get started.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClients.map((client) => (
            <div key={client.id} onClick={() => openDetail(client)}
              className="bg-[#1c1b1b] rounded-xl p-5 border-l-4 cursor-pointer hover:bg-[#232222] transition-colors group"
              style={{ borderColor: client.color_tag || '#fa5c1b' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base">{client.name}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">{client.industry || '—'}</p>
                </div>
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_BADGE[client.status] ?? 'bg-gray-700 text-gray-400'}`}>
                    {client.status}
                  </span>
                  <button onClick={(e) => openEdit(e, client)}
                    className="text-gray-600 hover:text-[#fa5c1b] transition-colors p-1.5 rounded-lg hover:bg-white/5"
                    title="Edit client">
                    <Pencil size={13} />
                  </button>
                  <ChevronRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-400 mb-4">
                {client.contact_name && <p>{client.contact_name}</p>}
                {client.contact_phone && <p>{client.contact_phone}</p>}
                {client.contact_email && <p className="truncate">{client.contact_email}</p>}
              </div>
              <div className="pt-3 border-t border-white/5">
                <p className="text-white font-semibold text-lg tabular-nums">
                  ₹{client.retainer_amount.toLocaleString('en-IN')}
                  <span className="text-gray-500 text-xs font-normal ml-1">/mo</span>
                </p>
                {(client.billing_cycle_date || client.onboarded_date) && (
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {client.billing_cycle_date && (
                      <p className="text-gray-500 text-xs">Billing: {ordinal(client.billing_cycle_date)}</p>
                    )}
                    {client.onboarded_date && (
                      <p className="text-gray-500 text-xs">Since {fmtMonthYear(client.onboarded_date)}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add Client Modal ──────────────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Client</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <ClientForm form={addForm} setForm={setAddForm} onSubmit={handleAdd}
              onClose={() => setShowAddModal(false)} saving={addSaving} error={addError} submitLabel="Add Client" />
          </div>
        </div>
      )}

      {/* ── Edit Client Modal ─────────────────────────────────────────────────── */}
      {editClient && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Edit Client</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteClient(editClient.id)}
                  className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Delete client"
                >
                  <Trash2 size={15} />
                </button>
                <button onClick={() => setEditClient(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
            </div>
            <ClientForm form={editForm} setForm={setEditForm} onSubmit={handleEdit}
              onClose={() => setEditClient(null)} saving={editSaving} error={editError} submitLabel="Save Changes" />
          </div>
        </div>
      )}

      {/* ── Client Detail Slide-over ──────────────────────────────────────────── */}
      {detailClient && (
        <div className="fixed inset-0 z-[300] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDetailClient(null)} />
          <div className="relative w-full max-w-[480px] bg-[#131313] h-full flex flex-col shadow-2xl overflow-hidden">

            {/* Panel Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: detailClient.color_tag || '#fa5c1b' }} />
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">{detailClient.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-1 ${STATUS_BADGE[detailClient.status] ?? 'bg-gray-700 text-gray-400'}`}>
                    {detailClient.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setDetailClient(null)} className="text-gray-400 hover:text-white flex-shrink-0 mt-1"><X size={20} /></button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">

              {/* Contact + business info */}
              <div className="p-6 space-y-4 border-b border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Industry</p>
                    <p className="text-white text-sm">{detailClient.industry || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Retainer</p>
                    <p className="text-white text-sm font-semibold tabular-nums">₹{detailClient.retainer_amount.toLocaleString('en-IN')}/mo</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Contact</p>
                    <p className="text-white text-sm">{detailClient.contact_name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Phone</p>
                    <p className="text-white text-sm">{detailClient.contact_phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Onboarded</p>
                    <p className="text-white text-sm">{detailClient.onboarded_date ? fmtDate(detailClient.onboarded_date) : '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Billing Cycle</p>
                    <p className="text-white text-sm">{detailClient.billing_cycle_date ? `${ordinal(detailClient.billing_cycle_date)} of every month` : 'Not set'}</p>
                  </div>
                  {detailClient.onboarded_date && (
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Time with Agency</p>
                      <p className="text-green-400 text-sm font-medium">{monthsSince(detailClient.onboarded_date)} months</p>
                    </div>
                  )}
                </div>
                {detailClient.contact_email && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Email</p>
                    <p className="text-white text-sm">{detailClient.contact_email}</p>
                  </div>
                )}
                {detailClient.notes && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Notes</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{detailClient.notes}</p>
                  </div>
                )}
              </div>

              {/* Portal Access */}
              <div className="p-6 border-b border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Portal Access</p>
                {detailClient.portal_email ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-medium">Access granted</span>
                    <span className="text-gray-400 text-sm">{detailClient.portal_email}</span>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-3">No portal access</p>
                )}

                {portalResult && (
                  <div className="mt-3 bg-[#0e0e0e] rounded-lg p-4 border border-green-500/20">
                    <p className="text-green-400 text-sm font-medium mb-2">✓ Login created. Share these credentials once.</p>
                    <div className="font-mono text-sm text-gray-300 space-y-1">
                      <p>Email: <span className="text-white">{portalResult.email}</span></p>
                      <p>Password: <span className="text-white">{portalResult.password}</span></p>
                    </div>
                    <button onClick={copyCredentials}
                      className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                      {copied ? <><Check size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy credentials</>}
                    </button>
                  </div>
                )}

                {!showPortalForm && !portalResult && (
                  <button onClick={() => {
                    setPortalForm({ email: detailClient.contact_email ?? '', password: '' })
                    setPortalError(''); setShowPortalForm(true)
                  }}
                    className="mt-3 text-sm px-3 py-1.5 rounded-lg border border-[#fa5c1b]/40 text-[#fa5c1b] hover:bg-[#fa5c1b]/10 transition-colors">
                    Generate Login Credentials
                  </button>
                )}

                {showPortalForm && (
                  <form onSubmit={handleGeneratePortal} className="mt-3 space-y-3">
                    {portalError && (
                      <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-3 py-2">{portalError}</p>
                    )}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Portal Email *</label>
                      <input required type="email" value={portalForm.email}
                        onChange={(e) => setPortalForm(f => ({ ...f, email: e.target.value }))}
                        className={inputCls} placeholder="client@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Temporary Password *</label>
                      <input required value={portalForm.password}
                        onChange={(e) => setPortalForm(f => ({ ...f, password: e.target.value }))}
                        className={inputCls} placeholder="Min 6 characters" minLength={6} />
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setShowPortalForm(false)}
                        className="flex-1 py-2 rounded-lg border border-white/10 text-gray-400 text-xs hover:text-white transition-colors">
                        Cancel
                      </button>
                      <button type="submit" disabled={portalSaving}
                        className="flex-1 py-2 rounded-lg bg-[#fa5c1b] text-white font-medium text-xs hover:opacity-90 disabled:opacity-60 transition-opacity">
                        {portalSaving ? 'Creating…' : 'Create Login'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/5 px-6">
                {(['tasks', 'payments', 'content'] as DetailTab[]).map((tab) => (
                  <button key={tab} onClick={() => switchTab(tab)}
                    className={`capitalize text-sm py-3 px-4 -mb-px border-b-2 transition-colors ${
                      activeTab === tab ? 'border-[#fa5c1b] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-6">
                {tabLoading ? (
                  <p className="text-gray-600 text-sm text-center py-8">Loading…</p>
                ) : (
                  <>
                    {activeTab === 'tasks' && (
                      tabTasks.length === 0 ? (
                        <p className="text-gray-600 text-sm text-center py-8">No tasks for this client.</p>
                      ) : (
                        <div className="space-y-2">
                          {tabTasks.map((task) => (
                            <div key={task.id} className="bg-[#0e0e0e] rounded-lg p-3 flex items-center justify-between gap-3">
                              <p className="text-sm text-white flex-1 min-w-0 truncate">{task.title}</p>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {task.priority && (
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority] ?? 'bg-gray-700 text-gray-400'}`}>
                                    {task.priority}
                                  </span>
                                )}
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{task.status}</span>
                                {task.due_date && (
                                  <span className="text-[10px] text-gray-600">{task.due_date.split('-').reverse().join('/')}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                    {activeTab === 'payments' && (
                      tabPayments.length === 0 ? (
                        <p className="text-gray-600 text-sm text-center py-8">No payments recorded.</p>
                      ) : (
                        <div className="space-y-2">
                          {tabPayments.map((p) => (
                            <div key={p.id} className="bg-[#0e0e0e] rounded-lg p-3 flex items-center justify-between">
                              <div>
                                <p className="text-white text-sm font-medium tabular-nums">₹{p.amount.toLocaleString('en-IN')}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{p.month}</p>
                              </div>
                              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.status === 'received' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {p.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                    {activeTab === 'content' && (
                      tabContent.length === 0 ? (
                        <p className="text-gray-600 text-sm text-center py-8">No content events scheduled.</p>
                      ) : (
                        <div className="space-y-2">
                          {tabContent.map((ev) => (
                            <div key={ev.id} className="bg-[#0e0e0e] rounded-lg p-3">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-white text-sm font-medium leading-snug">{ev.title}</p>
                                <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full flex-shrink-0">{ev.status}</span>
                              </div>
                              <p className="text-gray-500 text-xs">
                                {ev.platform} · {ev.content_type} · {ev.scheduled_date.split('-').reverse().join('/')}
                              </p>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
