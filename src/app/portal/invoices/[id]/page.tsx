import { createClient } from '@/lib/supabase/server'
import { getPortalClient } from '@/lib/portal'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import InvoiceDocument from '@/components/InvoiceDocument'
import PrintButton from './PrintButton'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PortalInvoiceDetailPage({ params }: Props) {
  const { id } = await params
  const [{ client }, supabase] = await Promise.all([getPortalClient(), createClient()])

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*), clients(name, color_tag, industry)')
    .eq('id', id)
    .eq('client_id', client.id)
    .in('status', ['sent', 'paid', 'overdue'])
    .single()

  if (error || !invoice) notFound()

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { margin: 15mm; }
        }
      `}</style>

      <div className="min-h-screen bg-[#0e0e0e] py-8 px-6">
        <div className="no-print flex items-center justify-between mb-8 max-w-3xl mx-auto">
          <Link
            href="/portal/invoices"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Invoices
          </Link>
          <PrintButton />
        </div>

        <div className="max-w-3xl mx-auto">
          <InvoiceDocument invoice={invoice as Parameters<typeof InvoiceDocument>[0]['invoice']} />
        </div>
      </div>
    </>
  )
}
