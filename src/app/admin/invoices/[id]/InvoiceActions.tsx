'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Printer } from 'lucide-react'

const STATUS_OPTIONS = ['draft', 'sent', 'paid', 'overdue']

export default function InvoiceActions({
  invoiceId,
  currentStatus,
}: {
  invoiceId: string
  currentStatus: string
}) {
  const [status, setStatus] = useState(currentStatus)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()

  async function handleStatusChange(newStatus: string) {
    setUpdating(true)
    const supabase = createClient()
    await supabase.from('invoices').update({ status: newStatus }).eq('id', invoiceId)
    setStatus(newStatus)
    setUpdating(false)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={updating}
        className="bg-[#1c1b1b] text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#fa5c1b] cursor-pointer capitalize disabled:opacity-50 transition-colors"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 bg-[#fa5c1b] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <Printer size={14} />
        Print / PDF
      </button>
    </div>
  )
}
