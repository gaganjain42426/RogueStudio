import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the session — required for Server Components to read auth state.
  // Do NOT remove this; it keeps the session alive.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const isPortalRoute = pathname === '/portal' || pathname.startsWith('/portal/')
  const isProtected = isAdminRoute || isPortalRoute

  if (!isProtected) return supabaseResponse

  // No session → redirect to login
  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/client-login'
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role lookup via service role key (bypasses RLS)
  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: roleData } = await adminClient
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  const role = roleData?.role as string | undefined

  if (isAdminRoute) {
    if (role === 'admin') return supabaseResponse

    if (role === 'editor') {
      if (pathname === '/admin/calendar' || pathname.startsWith('/admin/calendar/')) {
        return supabaseResponse
      }
      const url = request.nextUrl.clone()
      url.pathname = '/admin/calendar'
      return NextResponse.redirect(url)
    }

    if (role === 'client') {
      const url = request.nextUrl.clone()
      url.pathname = '/portal/overview'
      return NextResponse.redirect(url)
    }

    // No role found
    const url = request.nextUrl.clone()
    url.pathname = '/client-login'
    return NextResponse.redirect(url)
  }

  if (isPortalRoute) {
    if (role === 'client' || role === 'admin' || role === 'editor') {
      return supabaseResponse
    }
    // No role found
    const url = request.nextUrl.clone()
    url.pathname = '/client-login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
