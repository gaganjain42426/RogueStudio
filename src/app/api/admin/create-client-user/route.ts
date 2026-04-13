import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  // Verify the caller is an authenticated admin session
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
  if (!adminEmail || user.email !== adminEmail) {
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

  // Use service role key to create auth user
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 400 })
  }

  // Save portal_email to the clients table
  const { error: updateError } = await supabaseAdmin
    .from('clients')
    .update({ portal_email: email })
    .eq('id', clientId)

  if (updateError) {
    // User was created but DB update failed — still succeed, log it
    console.error('Failed to update portal_email on client:', updateError.message)
  }

  return NextResponse.json({ success: true, userId: newUser.user.id, email })
}
