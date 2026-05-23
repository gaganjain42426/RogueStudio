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
      {/* Print-only: white body, hide chrome */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { margin: 15mm; }
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
