'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { ChevronLeft, ChevronRight, X, Trash2, Plus } from 'lucide-react'

type ClientOption = { id: string; name: string; color_tag: string }

type ContentEvent = {
  id: string
  title: string
  client_id: string | null
  platform: string
  content_type: string
  scheduled_date: string
  status: string
  notes: string | null
  clients: { name: string; color_tag: string } | null
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const PLATFORMS = ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Other']
const CONTENT_TYPES = ['Reel', 'Story', 'Post', 'Carousel']
const STATUS_OPTIONS = ['scheduled', 'published', 'draft', 'cancelled']

const PLATFORM_STYLE: Record<string, string> = {
  Instagram: 'bg-pink-500/20 text-pink-400',
  Facebook:  'bg-blue-500/20 text-blue-400',
  YouTube:   'bg-red-500/20 text-red-400',
  LinkedIn:  'bg-teal-500/20 text-teal-400',
}

const STATUS_STYLE: Record<string, string> = {
  planned:       'bg-gray-500/20 text-gray-400',
  in_production: 'bg-orange-500/20 text-orange-400',
  ready:         'bg-green-500/20 text-green-400',
  posted:        'bg-green-700/30 text-green-500',
  scheduled:     'bg-gray-500/20 text-gray-400',
  published:     'bg-green-500/20 text-green-400',
  draft:         'bg-gray-700/20 text-gray-500',
  cancelled:     'bg-red-500/20 text-red-400',
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

type EventForm = {
  title: string
  client_id: string
  platform: string
  content_type: string
  scheduled_date: string
  status: string
  notes: string
}

const emptyForm: EventForm = {
  title: '',
  client_id: '',
  platform: 'Instagram',
  content_type: 'Post',
  scheduled_date: '',
  status: 'scheduled',
  notes: '',
}

function EventModalForm({
  title: modalTitle,
  form,
  setForm,
  clients,
  onSubmit,
  onClose,
  saving,
  error,
  submitLabel,
  onDelete,
}: {
  title: string
  form: EventForm
  setForm: React.Dispatch<React.SetStateAction<EventForm>>
  clients: ClientOption[]
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  saving: boolean
  error: string
  submitLabel: string
  onDelete?: () => void
}) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">{modalTitle}</h2>
          <div className="flex items-center gap-2">
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Title *">
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputCls}
              placeholder="Weekly product reel"
            />
          </Field>

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

          <div className="grid grid-cols-2 gap-4">
            <Field label="Platform">
              <select
                value={form.platform}
                onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
                className={inputCls}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field label="Content Type">
              <select
                value={form.content_type}
                onChange={(e) => setForm((f) => ({ ...f, content_type: e.target.value }))}
                className={inputCls}
              >
                {CONTENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date *">
              <input
                required
                type="date"
                value={form.scheduled_date}
                onChange={(e) => setForm((f) => ({ ...f, scheduled_date: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className={inputCls}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className={`${inputCls} resize-none`}
              rows={3}
              placeholder="Any notes or captions…"
            />
          </Field>

          <div className="flex gap-3 pt-2">
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
      </div>
    </div>
  )
}

export default function CalendarClient({
  initialEvents,
  clients,
  defaultYear,
  defaultMonth,
}: {
  initialEvents: ContentEvent[]
  clients: ClientOption[]
  defaultYear: number
  defaultMonth: number
}) {
  const router = useRouter()
  const [year, setYear] = useState(defaultYear)
  const [month, setMonth] = useState(defaultMonth)
  const [events, setEvents] = useState<ContentEvent[]>(initialEvents)

  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [view, setView] = useState<'month' | 'list'>('month')

  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState<EventForm>(emptyForm)

  const [editEvent, setEditEvent] = useState<ContentEvent | null>(null)
  const [editForm, setEditForm] = useState<EventForm>(emptyForm)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Filtered events based on selected client pill
  const visibleEvents = selectedClient
    ? events.filter((e) => e.client_id === selectedClient)
    : events

  // Upcoming events from today, grouped by date — for List view
  const upcomingGrouped = useMemo<[string, ContentEvent[]][]>(() => {
    const today = new Date().toISOString().split('T')[0]
    const upcoming = [...visibleEvents]
      .filter((e) => e.scheduled_date >= today)
      .sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date))
    const map: Record<string, ContentEvent[]> = {}
    for (const ev of upcoming) {
      if (!map[ev.scheduled_date]) map[ev.scheduled_date] = []
      map[ev.scheduled_date].push(ev)
    }
    return Object.entries(map)
  }, [visibleEvents])

  function prevMonth() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11) }
    else setMonth((m) => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0) }
    else setMonth((m) => m + 1)
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7

  function toDateStr(day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function eventsForDay(day: number) {
    return visibleEvents.filter((e) => e.scheduled_date === toDateStr(day))
  }

  const todayStr = new Date().toISOString().split('T')[0]

  function handleDayClick(day: number) {
    setAddForm({ ...emptyForm, scheduled_date: toDateStr(day), client_id: selectedClient ?? '' })
    setError('')
    setShowAdd(true)
  }

  function handleEventClick(e: React.MouseEvent, event: ContentEvent) {
    e.stopPropagation()
    setEditEvent(event)
    setEditForm({
      title: event.title,
      client_id: event.client_id ?? '',
      platform: event.platform,
      content_type: event.content_type,
      scheduled_date: event.scheduled_date,
      status: event.status,
      notes: event.notes ?? '',
    })
    setError('')
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase
      .from('content_events')
      .insert({
        title: addForm.title,
        client_id: addForm.client_id || null,
        platform: addForm.platform,
        content_type: addForm.content_type,
        scheduled_date: addForm.scheduled_date,
        status: addForm.status,
        notes: addForm.notes || null,
      })
      .select('*, clients(name, color_tag)')
      .single()

    if (err) { setError(err.message); setSaving(false); return }
    setEvents((prev) => [...prev, data as unknown as ContentEvent])
    setShowAdd(false)
    setSaving(false)
    router.refresh()
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editEvent) return
    setSaving(true)
    setError('')
    const supabase = createSupabaseClient()
    const { data, error: err } = await supabase
      .from('content_events')
      .update({
        title: editForm.title,
        client_id: editForm.client_id || null,
        platform: editForm.platform,
        content_type: editForm.content_type,
        scheduled_date: editForm.scheduled_date,
        status: editForm.status,
        notes: editForm.notes || null,
      })
      .eq('id', editEvent.id)
      .select('*, clients(name, color_tag)')
      .single()

    if (err) { setError(err.message); setSaving(false); return }
    setEvents((prev) =>
      prev.map((ev) => (ev.id === editEvent.id ? (data as unknown as ContentEvent) : ev))
    )
    setEditEvent(null)
    setSaving(false)
    router.refresh()
  }

  async function handleDelete() {
    if (!editEvent) return
    if (!confirm('Delete this event?')) return
    const supabase = createSupabaseClient()
    await supabase.from('content_events').delete().eq('id', editEvent.id)
    setEvents((prev) => prev.filter((ev) => ev.id !== editEvent.id))
    setEditEvent(null)
  }

  const activeClientData = selectedClient ? clients.find((c) => c.id === selectedClient) : null

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
        <div className="flex items-center gap-3">
          {/* List view: Add Event button */}
          {view === 'list' && (
            <button
              onClick={() => {
                setAddForm({ ...emptyForm, client_id: selectedClient ?? '' })
                setError('')
                setShowAdd(true)
              }}
              className="flex items-center gap-1.5 bg-[#fa5c1b] text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus size={14} />
              Add Event
            </button>
          )}

          {/* Month / List toggle */}
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                view === 'month'
                  ? 'bg-[#fa5c1b] text-white'
                  : 'bg-[#1c1b1b] text-gray-400 hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors border-l border-white/10 ${
                view === 'list'
                  ? 'bg-[#fa5c1b] text-white'
                  : 'bg-[#1c1b1b] text-gray-400 hover:text-white'
              }`}
            >
              List
            </button>
          </div>

          {/* Month navigation — month view only */}
          {view === 'month' && (
            <>
              <button
                onClick={prevMonth}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-white font-semibold text-base min-w-[150px] text-center">
                {MONTHS[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Client filter pills */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <button
          onClick={() => setSelectedClient(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedClient === null
              ? 'bg-[#fa5c1b] text-white'
              : 'bg-[#1c1b1b] text-gray-400 border border-gray-700 hover:text-white'
          }`}
        >
          All Clients
        </button>
        {clients.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClient(c.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedClient === c.id
                ? 'bg-[#fa5c1b] text-white'
                : 'bg-[#1c1b1b] text-gray-400 border border-gray-700 hover:text-white'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: c.color_tag }}
            />
            {c.name}
          </button>
        ))}
      </div>

      {/* Color legend (All Clients) or thin client bar (specific client) */}
      {selectedClient === null ? (
        clients.length > 0 && (
          <div className="flex items-center gap-5 flex-wrap mb-6">
            {clients.map((c) => (
              <div key={c.id} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: c.color_tag }}
                />
                <span className="text-xs text-gray-500">{c.name}</span>
              </div>
            ))}
          </div>
        )
      ) : (
        activeClientData && (
          <div
            className="h-0.5 rounded-full mb-6"
            style={{ backgroundColor: activeClientData.color_tag }}
          />
        )
      )}

      {/* ── MONTH VIEW ── */}
      {view === 'month' && (
        <div className="bg-[#1c1b1b] rounded-xl overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-white/5">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-gray-500 py-3">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {Array.from({ length: totalCells }, (_, i) => {
              const dayNum = i - firstDayOfMonth + 1
              const isValid = dayNum >= 1 && dayNum <= daysInMonth
              const dayEvents = isValid ? eventsForDay(dayNum) : []
              const isToday = isValid && toDateStr(dayNum) === todayStr

              return (
                <div
                  key={i}
                  onClick={() => isValid && handleDayClick(dayNum)}
                  className={`min-h-[108px] p-2 border-b border-r border-white/5 transition-colors ${
                    isValid ? 'cursor-pointer hover:bg-white/[0.02]' : 'bg-[#0e0e0e]/30'
                  } ${isToday ? 'bg-[#fa5c1b]/5' : ''}`}
                >
                  {isValid && (
                    <>
                      <div
                        className={`text-[11px] font-medium mb-1.5 w-6 h-6 flex items-center justify-center rounded-full ${
                          isToday ? 'bg-[#fa5c1b] text-white' : 'text-gray-500'
                        }`}
                      >
                        {dayNum}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={(e) => handleEventClick(e, event)}
                            className="text-[10px] px-1.5 py-0.5 rounded truncate leading-tight cursor-pointer hover:opacity-80 transition-opacity"
                            style={{
                              backgroundColor: (event.clients?.color_tag ?? '#fa5c1b') + '28',
                              color: event.clients?.color_tag ?? '#fa5c1b',
                              borderLeft: `2px solid ${event.clients?.color_tag ?? '#fa5c1b'}`,
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === 'list' && (
        <div className="space-y-6">
          {upcomingGrouped.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-16">No upcoming events.</p>
          ) : (
            upcomingGrouped.map(([date, dateEvents]) => {
              const d = new Date(date + 'T00:00:00')
              const isToday = date === todayStr
              const label = isToday
                ? 'Today'
                : d.toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
              return (
                <div key={date}>
                  {/* Date group header */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        isToday ? 'text-[#fa5c1b]' : 'text-gray-500'
                      }`}
                    >
                      {label}
                    </span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  {/* Event rows */}
                  <div className="space-y-1.5">
                    {dateEvents.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={(e) => handleEventClick(e, ev)}
                        className="flex items-center gap-3 bg-[#1c1b1b] rounded-lg px-4 py-3 cursor-pointer hover:bg-[#222] transition-colors"
                      >
                        {/* Client color dot */}
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: ev.clients?.color_tag ?? '#fa5c1b' }}
                        />
                        {/* Title */}
                        <span className="text-white text-sm flex-1 truncate">{ev.title}</span>
                        {/* Platform badge */}
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            PLATFORM_STYLE[ev.platform] ?? 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {ev.platform}
                        </span>
                        {/* Content type */}
                        <span className="text-xs text-gray-500 hidden sm:block">{ev.content_type}</span>
                        {/* Status badge */}
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            STATUS_STYLE[ev.status] ?? 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {ev.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Add Event Modal */}
      {showAdd && (
        <EventModalForm
          title="Add Event"
          form={addForm}
          setForm={setAddForm}
          clients={clients}
          onSubmit={handleAdd}
          onClose={() => setShowAdd(false)}
          saving={saving}
          error={error}
          submitLabel="Add Event"
        />
      )}

      {/* Edit Event Modal */}
      {editEvent && (
        <EventModalForm
          title="Edit Event"
          form={editForm}
          setForm={setEditForm}
          clients={clients}
          onSubmit={handleEdit}
          onClose={() => setEditEvent(null)}
          saving={saving}
          error={error}
          submitLabel="Save Changes"
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
