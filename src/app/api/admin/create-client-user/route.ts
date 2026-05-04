import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  // Verify the caller is an authenticated admin session
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Use session-based role check (works without service key)
  const { data: callerRoleRows } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .limit(1)

  if (callerRoleRows?.[0]?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { email, password, clientId } = body as {
    email: string
    password: string
    clientId: string
  }

  if (!email || !password || !clientId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabaseAdmin = createAdminClient()

  const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 400 })
  }

  // Save portal_email to the clients table
  const { data: clientData, error: updateError } = await supabaseAdmin
    .from('clients')
    .update({ portal_email: email })
    .eq('id', clientId)
    .select('name')
    .single()

  if (updateError) {
    console.error('Failed to update portal_email on client:', updateError.message)
  }

  // Insert into user_roles so the new client can log in
  await supabaseAdmin.from('user_roles').insert({
    user_id: newUser.user.id,
    email,
    name: clientData?.name ?? email,
    role: 'client',
  })

  return NextResponse.json({ success: true, userId: newUser.user.id, email })
}

