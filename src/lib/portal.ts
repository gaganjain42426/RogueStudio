import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type PortalClient = {
  id: string
  name: string
  industry: string | null
  retainer_amount: number
  color_tag: string
  portal_email: string | null
}

/**
 * Verifies the logged-in user's session and looks up their client record
 * by matching session email to clients.portal_email.
 * Redirects to /client-login if not authenticated or no client match.
 */
export async function getPortalClient() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) redirect('/client-login')

  const { data: client } = await supabase
    .from('clients')
    .select('id, name, industry, retainer_amount, color_tag, portal_email')
    .eq('portal_email', user.email)
    .single()

  if (!client) redirect('/client-login')

  return { supabase, user, client: client as PortalClient }
}
