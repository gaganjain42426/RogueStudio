/**
 * ─────────────────────────────────────────────────────────────
 *  SUPABASE MIGRATION — run once in the SQL editor
 * ─────────────────────────────────────────────────────────────
 *
 *  create table invoices (
 *    id            uuid primary key default gen_random_uuid(),
 *    invoice_number text unique not null,
 *    client_id     uuid references clients(id) on delete set null,
 *    status        text not null default 'draft'
 *                    check (status in ('draft','sent','paid','overdue')),
 *    issue_date    date not null default current_date,
 *    due_date      date not null,
 *    notes         text,
 *    gst_percent   numeric not null default 0,
 *    created_at    timestamptz default now(),
 *    updated_at    timestamptz default now()
 *  );
 *
 *  create table invoice_items (
 *    id          uuid primary key default gen_random_uuid(),
 *    invoice_id  uuid not null references invoices(id) on delete cascade,
 *    description text not null,
 *    quantity    numeric not null default 1,
 *    unit_price  numeric not null default 0,
 *    sort_order  int not null default 0,
 *    created_at  timestamptz default now()
 *  );
 *
 *  alter table invoices enable row level security;
 *  alter table invoice_items enable row level security;
 *
 *  create policy "auth_all_invoices" on invoices
 *    for all using (auth.role() = 'authenticated');
 *
 *  create policy "auth_all_invoice_items" on invoice_items
 *    for all using (auth.role() = 'authenticated');
 * ─────────────────────────────────────────────────────────────
 */

import { createClient } from '@/lib/supabase/server'
import InvoicesClient from '@/components/admin/InvoicesClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Invoices — Admin' }

export default async function InvoicesPage() {
  const supabase = await createClient()

  const [{ data: invoicesRaw, error: invoicesError }, { data: clients, error: clientsError }] =
    await Promise.all([
      supabase
        .from('invoices')
        .select('*, invoice_items(*), clients(name, color_tag)')
        .order('created_at', { ascending: false }),
      supabase
        .from('clients')
        .select('id, name, color_tag, status')
        .order('name'),
    ])

  if (invoicesError || clientsError) {
    const msg = (invoicesError ?? clientsError)?.message ?? ''
    // Table doesn't exist yet — show migration hint
    if (msg.includes('does not exist') || msg.includes('relation')) {
      return (
        <div className="p-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">Invoices</h1>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <p className="text-orange-300 font-semibold mb-2">Database tables not set up yet</p>
            <p className="text-orange-200/70 text-sm leading-relaxed">
              Run the SQL migration at the top of{' '}
              <code className="text-orange-300">src/app/admin/invoices/page.tsx</code> in your
              Supabase SQL editor to create the <code className="text-orange-300">invoices</code>{' '}
              and <code className="text-orange-300">invoice_items</code> tables, then refresh.
            </p>
          </div>
        </div>
      )
    }
    return (
      <div className="p-8 text-red-400">
        Failed to load: {msg}
      </div>
    )
  }

  return (
    <InvoicesClient
      initialInvoices={(invoicesRaw as unknown as Parameters<typeof InvoicesClient>[0]['initialInvoices']) ?? []}
      clients={clients ?? []}
    />
  )
}
