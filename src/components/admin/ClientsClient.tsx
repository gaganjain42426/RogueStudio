'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, X } from 'lucide-react'

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
}

const STATUS_BADGE: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  inactive: 'bg-gray-500/20 text-gray-400',
  paused: 'bg-yellow-500/20 text-yellow-400',
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

const defaultForm = {
  name: '',
  industry: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  retainer_amount: '',
  status: 'active',
  color_tag: '#fa5c1b',
}

export default function ClientsClient({ initialClients }: { initialClients: Client[] }) {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function openModal() {
    setForm(defaultForm)
    setError('')
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase
      .from('clients')
      .insert({
        name: form.name,
        industry: form.industry,
        contact_name: form.contact_name,
        contact_phone: form.contact_phone,
        contact_email: form.contact_email,
        retainer_amount: parseFloat(form.retainer_amount) || 0,
        status: form.status,
        color_tag: form.color_tag,
      })
      .select()
      .single()

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setClients((prev) => [data as Client, ...prev])
    setShowModal(false)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-gray-500 mt-1">{clients.length} total</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#fa5c1b] text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          Add Client
        </button>
      </div>

      {/* Grid */}
      {clients.length === 0 ? (
        <div className="text-center py-24 text-gray-600">
          No clients yet. Add your first client to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-[#1c1b1b] rounded-xl p-5 border-l-4"
              style={{ borderColor: client.color_tag || '#fa5c1b' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-base">{client.name}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">{client.industry || '—'}</p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ml-3 ${
                    STATUS_BADGE[client.status] ?? 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {client.status}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-400 mb-4">
                {client.contact_name && <p>{client.contact_name}</p>}
                {client.contact_phone && <p>{client.contact_phone}</p>}
                {client.contact_email && (
                  <p className="truncate">{client.contact_email}</p>
                )}
              </div>

              <div className="pt-3 border-t border-white/5">
                <p className="text-white font-semibold text-lg tabular-nums">
                  ₹{client.retainer_amount.toLocaleString('en-IN')}
                  <span className="text-gray-500 text-xs font-normal ml-1">/mo</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Client</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Client Name *">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputCls}
                  placeholder="Sarvatra Energy"
                />
              </Field>

              <Field label="Industry">
                <input
                  value={form.industry}
                  onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                  className={inputCls}
                  placeholder="Renewable Energy"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Contact Name">
                  <input
                    value={form.contact_name}
                    onChange={(e) => setForm((f) => ({ ...f, contact_name: e.target.value }))}
                    className={inputCls}
                    placeholder="Arjun Gupta"
                  />
                </Field>
                <Field label="Contact Phone">
                  <input
                    value={form.contact_phone}
                    onChange={(e) => setForm((f) => ({ ...f, contact_phone: e.target.value }))}
                    className={inputCls}
                    placeholder="+91 98765 43210"
                  />
                </Field>
              </div>

              <Field label="Contact Email">
                <input
                  type="email"
                  value={form.contact_email}
                  onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))}
                  className={inputCls}
                  placeholder="contact@client.com"
                />
              </Field>

              <Field label="Retainer Amount (₹/mo)">
                <input
                  type="number"
                  min="0"
                  value={form.retainer_amount}
                  onChange={(e) => setForm((f) => ({ ...f, retainer_amount: e.target.value }))}
                  className={inputCls}
                  placeholder="40000"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </Field>
                <Field label="Color Tag">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.color_tag}
                      onChange={(e) => setForm((f) => ({ ...f, color_tag: e.target.value }))}
                      className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0 flex-shrink-0"
                    />
                    <input
                      value={form.color_tag}
                      onChange={(e) => setForm((f) => ({ ...f, color_tag: e.target.value }))}
                      className={`${inputCls} flex-1`}
                      placeholder="#fa5c1b"
                    />
                  </div>
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
                  {saving ? 'Saving…' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
