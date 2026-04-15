'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const inputCls =
  'w-full bg-[#0e0e0e] text-white text-sm px-3 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] placeholder:text-gray-600'

const defaultForm = {
  title: '',
  description: '',
  priority: 'medium',
  due_date: '',
}

export default function PortalTaskRequestButton({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function openModal() {
    setForm(defaultForm)
    setError('')
    setSuccess(false)
    setOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const { error: err } = await supabase.from('tasks').insert({
      title: form.title,
      description: form.description || null,
      priority: form.priority,
      due_date: form.due_date || null,
      client_id: clientId,
      status: 'todo',
      requested_by: 'client',
    })

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setSaving(false)
    setSuccess(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="bg-[#fa5c1b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Add Task Request
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Task Request</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {success ? (
              <div className="text-center py-6">
                <p className="text-green-400 font-medium text-sm leading-relaxed">
                  Your request has been submitted.<br />
                  We&apos;ll review and get started shortly.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-6 py-2 rounded-lg bg-white/10 text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
                )}

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Task Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className={inputCls}
                    placeholder="What do you need done?"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${inputCls} resize-none`}
                    rows={3}
                    placeholder="Describe what you need done…"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className={inputCls}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Preferred Due Date</label>
                  <input
                    type="date"
                    value={form.due_date}
                    onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-2.5 rounded-lg bg-[#fa5c1b] text-white font-medium text-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
                  >
                    {saving ? 'Submitting…' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
