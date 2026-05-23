import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import InvoiceDocument from '@/components/InvoiceDocument'
import InvoiceActions from './InvoiceActions'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('invoices')
    .select('invoice_number')
    .eq('id', id)
    .single()
  return { title: data ? `${data.invoice_number} — Admin` : 'Invoice — Admin' }
}

export default async function InvoiceDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*), clients(name, color_tag, industry)')
    .eq('id', id)
    .single()

  if (error || !invoice) notFound()

  return (
    <>
      {/* Fix print: undo Next.js admin layout fixed/overflow-hidden, hide sidebar */}
      <style>{`
        @media print {
          /* Undo the fixed full-screen admin layout wrapper */
          .fixed   { position: static !important; }
          .inset-0 { inset: auto !important; }
          .overflow-hidden, .overflow-y-auto { overflow: visible !important; }

          /* Hide sidebar and action bar */
          aside          { display: none !important; }
          .no-print      { display: none !important; }

          /* White background everywhere */
          body, html, main { background: white !important; }

          /* Remove dark page padding wrapper */
          .min-h-screen { min-height: 0 !important; padding: 0 !important; background: white !important; }

          @page { margin: 15mm; size: A4 portrait; }
        }
      `}</style>

      <div className="min-h-screen bg-[#0e0e0e] py-8 px-6">
        {/* Top bar */}
        <div className="no-print flex items-center justify-between mb-8 max-w-3xl mx-auto">
          <Link
            href="/admin/invoices"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Invoices
          </Link>
          <InvoiceActions
            invoiceId={invoice.id}
            currentStatus={invoice.status}
          />
        </div>

        {/* Invoice document */}
        <div className="max-w-3xl mx-auto">
          <InvoiceDocument invoice={invoice as Parameters<typeof InvoiceDocument>[0]['invoice']} />
        </div>
      </div>
    </>
  )
}
