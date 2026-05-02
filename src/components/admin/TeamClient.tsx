'use client'

import { useState } from 'react'
import { Plus, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'

type UserRole = {
  id: string
  user_id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'client'
  created_at: string
}

type ClientRecord = {
  id: string
  name: string
  portal_email: string | null
  status: string
  color_tag: string
}

type ClientWithAccess = ClientRecord & {
  hasAccess: boolean
  userId?: string
}

export default function TeamClient({
  initialUsers,
  clients,
  currentUserId,
}: {
  initialUsers: UserRole[]
  clients: ClientRecord[]
  currentUserId: string
}) {
  const [users, setUsers] = useState<UserRole[]>(initialUsers)
  const [showModal, setShowModal] = useState<'admin' | 'editor' | null>(null)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [revokeConfirm, setRevokeConfirm] = useState<string | null>(null)

  const admins = users.filter((u) => u.role === 'admin')
  const editors = users.filter((u) => u.role === 'editor')
  const clientUsers = users.filter((u) => u.role === 'client')

  const clientsWithAccess: ClientWithAccess[] = clients.map((client) => {
    const userRole = clientUsers.find((u) => u.email === client.portal_email)
    return { ...client, hasAccess: !!userRole, userId: userRole?.user_id }
  })
  const activePortalCount = clientsWithAccess.filter((c) => c.hasAccess).length

  function openModal(role: 'admin' | 'editor') {
    setForm({ name: '', email: '', password: '' })
    setFormError('')
    setFormSuccess('')
    setShowPw(false)
    setShowModal(role)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)

    const res = await fetch('/api/admin/create-team-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, role: showModal }),
    })
    const data = await res.json()

    if (!res.ok) {
      setFormError(data.error ?? 'Failed to create user')
      setSubmitting(false)
      return
    }

    const newUser: UserRole = {
      id: crypto.randomUUID(),
      user_id: data.userId,
      email: form.email,
      name: form.name,
      role: showModal!,
      created_at: new Date().toISOString(),
    }
    setUsers((prev) => [...prev, newUser])
    setFormSuccess(`${showModal === 'admin' ? 'Admin' : 'Editor'} account created`)
    setSubmitting(false)
    setTimeout(() => {
      setShowModal(null)
      setFormSuccess('')
    }, 1500)
  }

  async function handleRevoke(userId: string) {
    const res = await fetch('/api/admin/delete-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.user_id !== userId))
    }
    setRevokeConfirm(null)
  }

  const thCls =
    'text-left text-[10px] text-gray-500 font-medium uppercase tracking-wider px-3 py-3 border-b border-white/5'
  const tdCls = 'px-3 py-3 text-sm text-gray-300'

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  function RevokeCell({ userId }: { userId: string }) {
    if (userId === currentUserId) return <td className={tdCls}>—</td>
    return (
      <td className={tdCls}>
        {revokeConfirm === userId ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-red-400">Confirm?</span>
            <button
              onClick={() => handleRevoke(userId)}
              className="text-xs text-red-400 hover:text-red-300 font-medium"
            >
              Yes
            </button>
            <button
              onClick={() => setRevokeConfirm(null)}
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setRevokeConfirm(userId)}
            className="flex items-center gap-1 text-xs text-red-400/70 hover:text-red-400 transition-colors"
          >
            <Trash2 size={12} /> Revoke
          </button>
        )}
      </td>
    )
  }

  function UserTable({ rows }: { rows: UserRole[] }) {
    if (rows.length === 0)
      return <p className="text-gray-500 text-sm py-4 px-3">No accounts yet.</p>
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className={thCls}>Name</th>
              <th className={thCls}>Email</th>
              <th className={thCls}>Role</th>
              <th className={thCls}>Created</th>
              <th className={thCls}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr
                key={u.user_id}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className={tdCls + ' font-medium text-white'}>{u.name || '—'}</td>
                <td className={tdCls}>{u.email}</td>
                <td className={tdCls}>
                  <RoleBadge role={u.role} />
                </td>
                <td className={tdCls}>{formatDate(u.created_at)}</td>
                <RevokeCell userId={u.user_id} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Team & Access</h1>
        <p className="text-gray-500 text-sm mt-1">{users.length} total accounts</p>
      </div>

      {/* Section 1 — Admin Accounts */}
      <div className="bg-[#1c1b1b] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold border-l-2 border-[#fa5c1b] pl-3">
            Admin Accounts
          </h2>
          <button
            onClick={() => openModal('admin')}
            className="flex items-center gap-1.5 text-sm text-[#fa5c1b] hover:text-white border border-[#fa5c1b]/30 hover:border-[#fa5c1b] px-3 py-1.5 rounded-lg transition-all"
          >
            <Plus size={13} /> Add Admin
          </button>
        </div>
        <UserTable rows={admins} />
      </div>

      {/* Section 2 — Editor Accounts */}
      <div className="bg-[#1c1b1b] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold border-l-2 border-blue-400 pl-3">
            Editor Accounts
          </h2>
          <button
            onClick={() => openModal('editor')}
            className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-white border border-blue-400/30 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-all"
          >
            <Plus size={13} /> Add Editor
          </button>
        </div>
        <UserTable rows={editors} />
      </div>

      {/* Section 3 — Client Portal Access */}
      <div className="bg-[#1c1b1b] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold border-l-2 border-green-400 pl-3">
            Client Portal Access
          </h2>
          <span className="text-xs text-gray-500">
            {activePortalCount} of {clients.length} clients have portal access
          </span>
        </div>
        {clients.length === 0 ? (
          <p className="text-gray-500 text-sm px-3 py-4">No clients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className={thCls}>Client Name</th>
                  <th className={thCls}>Portal Email</th>
                  <th className={thCls}>Status</th>
                  <th className={thCls}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientsWithAccess.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className={tdCls + ' font-medium text-white'}>{client.name}</td>
                    <td className={tdCls}>
                      {client.portal_email ?? (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className={tdCls}>
                      {client.hasAccess ? (
                        <span className="text-[11px] font-semibold tracking-wide bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold tracking-wide bg-white/10 text-gray-500 px-2 py-0.5 rounded">
                          No Access
                        </span>
                      )}
                    </td>
                    <td className={tdCls}>
                      {client.hasAccess && client.userId ? (
                        revokeConfirm === client.userId ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-400">Confirm?</span>
                            <button
                              onClick={() => handleRevoke(client.userId!)}
                              className="text-xs text-red-400 hover:text-red-300 font-medium"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setRevokeConfirm(null)}
                              className="text-xs text-gray-500 hover:text-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRevokeConfirm(client.userId!)}
                            className="flex items-center gap-1 text-xs text-red-400/70 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={12} /> Revoke
                          </button>
                        )
                      ) : (
                        <a
                          href="/admin/clients"
                          className="flex items-center gap-1 text-xs text-green-400/70 hover:text-green-400 transition-colors"
                        >
                          <ExternalLink size={12} /> Generate Login
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/10">
            <h3 className="text-white font-bold text-lg mb-6">
              Add {showModal === 'admin' ? 'Admin' : 'Editor'} Account
            </h3>

            {formSuccess ? (
              <div className="text-green-400 text-center py-6 text-sm">{formSuccess}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-[#111] text-white text-sm px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                    Email
                  </label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    required
                    placeholder="jane@roguestudio.in"
                    className="w-full bg-[#111] text-white text-sm px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className="w-full bg-[#111] text-white text-sm px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {showModal === 'editor' && (
                  <p className="text-xs text-gray-500 bg-white/5 px-3 py-2 rounded-lg">
                    Editors can only access the Content Calendar.
                  </p>
                )}

                {formError && <p className="text-red-400 text-xs">{formError}</p>}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(null)}
                    className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 rounded-lg bg-[#fa5c1b] hover:bg-[#e04e10] text-white font-medium text-sm transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'admin')
    return (
      <span className="text-[10px] font-bold tracking-wide bg-[#fa5c1b]/20 text-[#fa5c1b] px-2 py-0.5 rounded">
        ADMIN
      </span>
    )
  if (role === 'editor')
    return (
      <span className="text-[10px] font-bold tracking-wide bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
        EDITOR
      </span>
    )
  return (
    <span className="text-[10px] font-bold tracking-wide bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
      CLIENT
    </span>
  )
}
