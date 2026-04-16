import { createClient } from '@/lib/supabase/server'
import PortfolioAdminClient from '@/components/admin/PortfolioAdminClient'
import type { PortfolioProject } from '@/types'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Portfolio — Admin' }

export default async function AdminPortfolioPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('portfolio')
    .select('*')
    .order('sort_order', { ascending: true })

  const projects = (data ?? []) as PortfolioProject[]

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <PortfolioAdminClient initialProjects={projects} />
    </div>
  )
}
