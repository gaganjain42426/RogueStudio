import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ role: null }, { status: 401 })
  }

  const adminClient = createAdminClient()
  const { data } = await adminClient
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return NextResponse.json({ role: data?.role ?? null })
}
