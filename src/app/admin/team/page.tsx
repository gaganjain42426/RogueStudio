import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import TeamClient from '@/components/admin/TeamClient'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Team & Access — Admin' }

export default async function TeamPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const adminClient = createAdminClient()

  const [{ data: userRoles }, { data: clients }] = await Promise.all([
    adminClient.from('user_roles').select('*').order('created_at'),
    adminClient
      .from('clients')
      .select('id, name, portal_email, status, color_tag')
      .order('name'),
  ])

  return (
    <TeamClient
      initialUsers={userRoles ?? []}
      clients={clients ?? []}
      currentUserId={user?.id ?? ''}
    />
  )
}
