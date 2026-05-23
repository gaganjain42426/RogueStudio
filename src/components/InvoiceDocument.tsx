export type InvoiceItem = {
  id: string
  description: string
  quantity: number
  unit_price: number
  sort_order: number
}

export type InvoiceData = {
  id: string
  invoice_number: string
  status: string
  issue_date: string
  due_date: string
  notes: string | null
  gst_percent: number
  clients: { name: string; color_tag: string; industry: string | null } | null
  invoice_items: InvoiceItem[]
}

const STATUS_STAMP: Record<string, { border: string; text: string; bg: string }> = {
  draft:   { border: '#6b7280', text: '#6b7280', bg: '#f3f4f6' },
  sent:    { border: '#3b82f6', text: '#2563eb', bg: '#eff6ff' },
  paid:    { border: '#16a34a', text: '#15803d', bg: '#f0fdf4' },
  overdue: { border: '#dc2626', text: '#dc2626', bg: '#fef2f2' },
}

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

function fmtDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function InvoiceDocument({ invoice }: { invoice: InvoiceData }) {
  const items = [...invoice.invoice_items].sort((a, b) => a.sort_order - b.sort_order)
  const subtotal = items.reduce((s, i) => s + i.quantity * i.unit_price, 0)
  const gstAmount = subtotal * (invoice.gst_percent / 100)
  const total = subtotal + gstAmount
  const stamp = STATUS_STAMP[invoice.status] ?? STATUS_STAMP.draft

  return (
    <div className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl print:shadow-none print:rounded-none">

      {/* ── Header strip ─────────────────────────────────────────────────── */}
      <div className="bg-[#131313] px-10 py-8 flex items-start justify-between gap-6">
        <div>
          {/* Logo PNG — brightness invert makes it white on the dark header */}
          <img
            src="/logo.png"
            alt="Rogue Studio"
            style={{ height: 44, width: 'auto', objectFit: 'contain' }}
          />
          <p className="text-[#9DD1C2] text-[10px] tracking-[0.22em] uppercase mt-2 font-medium">
            Creative Digital Agency
          </p>
          <p className="text-gray-500 text-xs mt-3 leading-relaxed">
            Jaipur, Rajasthan 302001<br />
            info@roguestudio.in
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[#fa5c1b] font-black tracking-[0.18em] text-3xl leading-none">INVOICE</p>
          <p className="text-gray-400 font-mono text-sm mt-2">{invoice.invoice_number}</p>
          {/* Status stamp */}
          <div className="mt-4 inline-block">
            <span
              className="px-3 py-1.5 text-xs font-black uppercase tracking-widest rounded border-2"
              style={{ borderColor: stamp.border, color: stamp.text, backgroundColor: stamp.bg }}
            >
              {invoice.status}
            </span>
          </div>
        </div>
      </div>

      <div className="px-10 py-8">

        {/* ── From / To ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-10 mb-8">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Bill From</p>
            <p className="font-semibold text-gray-900">Rogue Studio</p>
            <p className="text-gray-500 text-sm">Creative Digital Agency</p>
            <p className="text-gray-500 text-sm">Jaipur, Rajasthan 302001</p>
            <p className="text-gray-500 text-sm">info@roguestudio.in</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Bill To</p>
            {invoice.clients ? (
              <>
                <p className="font-semibold text-gray-900">{invoice.clients.name}</p>
                {invoice.clients.industry && (
                  <p className="text-gray-500 text-sm">{invoice.clients.industry}</p>
                )}
                <p className="text-gray-500 text-sm">India</p>
              </>
            ) : (
              <p className="text-gray-400 italic text-sm">No client assigned</p>
            )}
          </div>
        </div>

        {/* ── Dates row ─────────────────────────────────────────────────── */}
        <div className="flex items-start gap-10 mb-8 pb-8 border-b border-gray-100">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">Issue Date</p>
            <p className="text-gray-900 font-medium text-sm">{fmtDate(invoice.issue_date)}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">Due Date</p>
            <p className="text-gray-900 font-medium text-sm">{fmtDate(invoice.due_date)}</p>
          </div>
          {invoice.gst_percent > 0 && (
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">GST</p>
              <p className="text-gray-900 font-medium text-sm">{invoice.gst_percent}%</p>
            </div>
          )}
        </div>

        {/* ── Line Items table ──────────────────────────────────────────── */}
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left text-[9px] font-bold text-gray-400 uppercase tracking-[0.18em] pb-3 pr-4 border-b-2 border-gray-900">
                Description
              </th>
              <th className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-[0.18em] pb-3 border-b-2 border-gray-900 w-14">
                Qty
              </th>
              <th className="text-right text-[9px] font-bold text-gray-400 uppercase tracking-[0.18em] pb-3 border-b-2 border-gray-900 w-28">
                Rate
              </th>
              <th className="text-right text-[9px] font-bold text-gray-400 uppercase tracking-[0.18em] pb-3 border-b-2 border-gray-900 w-28">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400 italic text-sm">
                  No line items
                </td>
              </tr>
            )}
            {items.map((item, i) => (
              <tr
                key={item.id}
                className="border-b border-gray-100"
                style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : '#ffffff' }}
              >
                <td className="py-3 pr-4 text-gray-800 text-sm">{item.description}</td>
                <td className="py-3 text-center text-gray-600 text-sm tabular-nums">{item.quantity}</td>
                <td className="py-3 text-right text-gray-600 text-sm tabular-nums">
                  {fmt(item.unit_price)}
                </td>
                <td className="py-3 text-right text-gray-900 font-semibold text-sm tabular-nums">
                  {fmt(item.quantity * item.unit_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── Totals ───────────────────────────────────────────────────── */}
        <div className="flex justify-end mb-10">
          <div className="w-64">
            <div className="flex justify-between text-sm text-gray-600 py-1.5">
              <span>Subtotal</span>
              <span className="tabular-nums">{fmt(subtotal)}</span>
            </div>
            {invoice.gst_percent > 0 && (
              <div className="flex justify-between text-sm text-gray-600 py-1.5">
                <span>GST ({invoice.gst_percent}%)</span>
                <span className="tabular-nums">{fmt(gstAmount)}</span>
              </div>
            )}
            <div
              className="flex justify-between font-black text-lg py-3 mt-1 border-t-2 border-gray-900"
            >
              <span className="text-gray-900">Total</span>
              <span className="tabular-nums" style={{ color: '#fa5c1b' }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* ── Notes ────────────────────────────────────────────────────── */}
        {invoice.notes && (
          <div className="border-t border-gray-100 pt-6 mb-8">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Notes</p>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{invoice.notes}</p>
          </div>
        )}

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.22em]">
              Rogue Studio — Creative Digital Agency
            </p>
            <p className="text-[9px] text-gray-300 tracking-wider mt-0.5">info@roguestudio.in · Jaipur, Rajasthan</p>
          </div>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase font-medium">
            Thank you for your business
          </p>
        </div>
      </div>
    </div>
  )
}
