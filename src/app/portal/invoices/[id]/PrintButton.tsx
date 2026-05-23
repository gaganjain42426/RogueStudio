'use client'

import { Printer } from 'lucide-react'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-[#fa5c1b] hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
    >
      <Printer size={14} />
      Download / Print PDF
    </button>
  )
}
