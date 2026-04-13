'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type PortalContentEvent = {
  id: string
  title: string
  platform: string
  content_type: string
  scheduled_date: string
  status: string
  notes: string | null
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const PLATFORM_COLOR: Record<string, string> = {
  Instagram: '#ec4899',
  Facebook:  '#3b82f6',
  YouTube:   '#ef4444',
  LinkedIn:  '#14b8a6',
}

const PLATFORM_BADGE: Record<string, string> = {
  Instagram: 'bg-pink-500/20 text-pink-400',
  Facebook:  'bg-blue-500/20 text-blue-400',
  YouTube:   'bg-red-500/20 text-red-400',
  LinkedIn:  'bg-teal-500/20 text-teal-400',
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <div>{children}</div>
    </div>
  )
}

export default function PortalCalendarClient({
  events,
  defaultYear,
  defaultMonth,
}: {
  events: PortalContentEvent[]
  defaultYear: number
  defaultMonth: number
}) {
  const [year, setYear] = useState(defaultYear)
  const [month, setMonth] = useState(defaultMonth)
  const [selectedEvent, setSelectedEvent] = useState<PortalContentEvent | null>(null)

  function prevMonth() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11) }
    else setMonth((m) => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0) }
    else setMonth((m) => m + 1)
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  const todayStr = new Date().toISOString().split('T')[0]

  function toDateStr(day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function eventsForDay(day: number) {
    return events.filter((e) => e.scheduled_date === toDateStr(day))
  }

  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const monthEvents = [...events]
    .filter((e) => e.scheduled_date.startsWith(monthPrefix))
    .sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date))

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-white font-semibold text-sm min-w-[130px] text-center">
            {MONTHS[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="bg-[#1c1b1b] rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-7 border-b border-white/5">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-500 py-3">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: totalCells }, (_, i) => {
            const dayNum = i - firstDay + 1
            const isValid = dayNum >= 1 && dayNum <= daysInMonth
            const dayEvents = isValid ? eventsForDay(dayNum) : []
            const isToday = isValid && toDateStr(dayNum) === todayStr

            return (
              <div
                key={i}
                className={`min-h-[96px] p-2 border-b border-r border-white/5 ${
                  !isValid ? 'bg-[#0e0e0e]/30' : ''
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
                      {dayEvents.map((ev) => (
                        <button
                          key={ev.id}
                          onClick={() => setSelectedEvent(ev)}
                          className="w-full text-left text-[10px] px-1.5 py-0.5 rounded truncate leading-tight hover:opacity-80 transition-opacity"
                          style={{
                            backgroundColor: (PLATFORM_COLOR[ev.platform] ?? '#fa5c1b') + '28',
                            color: PLATFORM_COLOR[ev.platform] ?? '#fa5c1b',
                            borderLeft: `2px solid ${PLATFORM_COLOR[ev.platform] ?? '#fa5c1b'}`,
                          }}
                        >
                          {ev.title}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* This month event list */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {MONTHS[month]} {year} — All Events
        </h2>
        {monthEvents.length === 0 ? (
          <p className="text-xs text-gray-600">No events scheduled this month.</p>
        ) : (
          <div className="space-y-2">
            {monthEvents.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className="w-full text-left bg-[#1c1b1b] rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-[#222] transition-colors"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: PLATFORM_COLOR[ev.platform] ?? '#fa5c1b' }}
                />
                <span className="text-white text-sm flex-1 truncate">{ev.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    PLATFORM_BADGE[ev.platform] ?? 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {ev.platform}
                </span>
                <span className="text-xs text-gray-500 hidden sm:block flex-shrink-0">
                  {ev.scheduled_date}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Event detail modal — view only */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1b1b] rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-start justify-between mb-5 gap-3">
              <h2 className="text-white font-bold text-base leading-snug">
                {selectedEvent.title}
              </h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <Row label="Platform">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    PLATFORM_BADGE[selectedEvent.platform] ?? 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {selectedEvent.platform}
                </span>
              </Row>
              <Row label="Content Type">
                <span className="text-sm text-white">{selectedEvent.content_type}</span>
              </Row>
              <Row label="Scheduled Date">
                <span className="text-sm text-white">{selectedEvent.scheduled_date}</span>
              </Row>
              <Row label="Status">
                <span className="text-sm text-gray-400 capitalize">{selectedEvent.status}</span>
              </Row>
              {selectedEvent.notes && (
                <div className="pt-1 border-t border-white/5">
                  <p className="text-xs text-gray-500 mb-1.5">Notes</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedEvent.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
