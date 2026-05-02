import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Verify the calling user is an admin using session client (RLS-safe)
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: callerRoleRows } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .limit(1)

    if (callerRoleRows?.[0]?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { email, password, name, role } = body as {
      email: string
      password: string
      name: string
      role: string
    }

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['admin', 'editor', 'client'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Create the auth user (requires service role key)
    const adminClient = createAdminClient()
    const { data: userData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    // Insert the role record
    const { error: roleError } = await adminClient.from('user_roles').insert({
      user_id: userData.user.id,
      email,
      name,
      role,
    })

    if (roleError) {
      // Rollback: remove the auth user we just created
      await adminClient.auth.admin.deleteUser(userData.user.id)
      return NextResponse.json({ error: roleError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, userId: userData.user.id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
