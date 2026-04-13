'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { Plus, X, Trash2 } from 'lucide-react'

type ClientOption = { id: string; name: string; color_tag: string }

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  due_date: string | null
  client_id: string | null
  clients: { name: string; color_tag: string } | null
}

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-orange-500/20 text-orange-400',
  low: 'bg-gray-500/20 text-gray-400',
}

const COLUMNS = [
  { key: 'todo', label: 'To Do' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
]

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
  title: '',
  description: '',
  client_id: '',
  status: 'todo',
  priority: 'medium',
  due_date: '',
}

function TaskForm({
  f,
  setF,
  clients,
  saving,
  onSubmit,
  onClose,
  onDelete,
  submitLabel,
}: {
  f: typeof defaultForm
  setF: (v: typeof defaultForm) => void
  clients: ClientOption[]
  saving: boolean
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  onDelete?: () => void
  submitLabel: string
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Title *">
        <input
          required
          value={f.title}
          onChange={(e) => setF({ ...f, title: e.target.value })}
          className={inputCls}
          placeholder="Task title"
        />
      </Field>
      <Field label="Description">
        <textarea
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          className={`${inputCls} resize-none`}
          rows={3}
          placeholder="Details…"
        />
      </Field>
      <Field label="Client">
        <select
          value={f.client_id}
          onChange={(e) => setF({ ...f, client_id: e.target.value })}
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
      <div className="grid grid-cols-2 gap-4">
        <Field label="Status">
          <select
            value={f.status}
            onChange={(e) => setF({ ...f, status: e.target.value })}
            className={inputCls}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </Field>
        <Field label="Priority">
          <select
            value={f.priority}
            onChange={(e) => setF({ ...f, priority: e.target.value })}
            className={inputCls}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </Field>
      </div>
      <Field label="Due Date">
        <input
          type="date"
          value={f.due_date}
          onChange={(e) => setF({ ...f, due_date: e.target.value })}
          className={inputCls}
        />
      </Field>
      <div className="flex gap-3 pt-2">
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2.5 rounded-lg bg-[#fa5c1b] text-white font-medium text-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {saving ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default function WorkBoardClient({
  initialTasks,
  clients,
}: {
  initialTasks: Task[]
  clients: ClientOption[]
}) {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [editForm, setEditForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [filterClient, setFilterClient] = useState('')

  function openAdd() {
    setForm(defaultForm)
    setError('')
    setShowAddModal(true)
  }

  function openEdit(task: Task) {
    setEditTask(task)
    setEditForm({
      title: task.title,
      description: task.description ?? '',
      client_id: task.client_id ?? '',
      status: task.status,
      priority: task.priority,
      due_date: task.due_date ?? '',
    })
    setError('')
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase
      .from('tasks')
      .insert({
        title: form.title,
        description: form.description || null,
        client_id: form.client_id || null,
        status: form.status,
        priority: form.priority,
        due_date: form.due_date || null,
      })
      .select('*, clients(name, color_tag)')
      .single()

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setTasks((prev) => [data as unknown as Task, ...prev])
    setShowAddModal(false)
    setSaving(false)
    router.refresh()
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editTask) return
    setSaving(true)
    setError('')

    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase
      .from('tasks')
      .update({
        title: editForm.title,
        description: editForm.description || null,
        client_id: editForm.client_id || null,
        status: editForm.status,
        priority: editForm.priority,
        due_date: editForm.due_date || null,
      })
      .eq('id', editTask.id)
      .select('*, clients(name, color_tag)')
      .single()

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === editTask.id ? (data as unknown as Task) : t))
    )
    setEditTask(null)
    setSaving(false)
    router.refresh()
  }

  async function handleDelete() {
    if (!editTask) return
    if (!confirm('Delete this task?')) return

    const supabase = createSupabaseClient()
    await supabase.from('tasks').delete().eq('id', editTask.id)
    setTasks((prev) => prev.filter((t) => t.id !== editTask.id))
    setEditTask(null)
  }

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Work Board</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#fa5c1b] text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          Add Task
        </button>
      </div>

      {/* Client Filter Pills */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <button
          onClick={() => setFilterClient('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filterClient === ''
              ? 'bg-[#fa5c1b] text-white'
              : 'bg-[#1c1b1b] text-gray-400 border border-gray-700 hover:text-white'
          }`}
        >
          All Clients
        </button>
        {clients.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterClient(c.id === filterClient ? '' : c.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterClient === c.id
                ? 'bg-[#fa5c1b] text-white'
                : 'bg-[#1c1b1b] text-gray-400 border border-gray-700 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color_tag }} />
            {c.name}
          </button>
        ))}
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-3 gap-5">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key && (!filterClient || t.client_id === filterClient))
          return (
            <div key={col.key} className="bg-[#1c1b1b] rounded-xl p-4 min-h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {col.label}
                </p>
                <span className="text-xs bg-white/5 text-gray-500 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => openEdit(task)}
                    className="bg-[#0e0e0e] rounded-lg p-3 cursor-pointer hover:bg-[#252424] transition-colors"
                  >
                    <p className="text-sm text-white font-medium leading-snug mb-2">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {task.clients && (
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: task.clients.color_tag }}
                          />
                          <span className="text-[11px] text-gray-500">{task.clients.name}</span>
                        </div>
                      )}
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                          PRIORITY_COLORS[task.priority] ?? 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {task.priority}
                      </span>
                      {task.due_date && (
                        <span className="text-[10px] text-gray-600 ml-auto">
                          {task.due_date.split('-').reverse().join('/')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Task</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
            )}
            <TaskForm
              f={form}
              setF={setForm}
              clients={clients}
              saving={saving}
              onSubmit={handleAdd}
              onClose={() => setShowAddModal(false)}
              submitLabel="Add Task"
            />
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Edit Task</h2>
              <button onClick={() => setEditTask(null)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
            )}
            <TaskForm
              f={editForm}
              setF={setEditForm}
              clients={clients}
              saving={saving}
              onSubmit={handleEdit}
              onClose={() => setEditTask(null)}
              onDelete={handleDelete}
              submitLabel="Save Changes"
            />
          </div>
        </div>
      )}
    </div>
  )
}
