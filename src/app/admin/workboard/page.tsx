import { createClient } from '@/lib/supabase/server'
import WorkBoardClient from '@/components/admin/WorkBoardClient'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Work Board — Admin' }

export default async function WorkBoardPage() {
  const supabase = await createClient()

  const [{ data: tasksRaw, error: tasksError }, { data: clients, error: clientsError }] =
    await Promise.all([
      supabase
        .from('tasks')
        .select('*, clients(name, color_tag)')
        .order('created_at', { ascending: false }),
      supabase.from('clients').select('id, name, color_tag').order('name'),
    ])

  if (tasksError || clientsError) {
    return (
      <div className="p-8 text-red-400">
        Failed to load data: {(tasksError ?? clientsError)?.message}
      </div>
    )
  }

  return (
    <WorkBoardClient
      initialTasks={(tasksRaw as unknown as Parameters<typeof WorkBoardClient>[0]['initialTasks']) ?? []}
      clients={clients ?? []}
    />
  )
}
