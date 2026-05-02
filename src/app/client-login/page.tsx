'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ClientLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user?.id)
      .single()

    const role = roleData?.role

    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'editor') {
      router.push('/admin/calendar')
    } else if (role === 'client') {
      router.push('/portal/overview')
    } else {
      setError('Access not configured. Contact your account manager.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container blur-[120px] opacity-20" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-secondary-container blur-[100px] opacity-20" />
        </div>

        {/* Logo */}
        <div className="mb-12 z-10">
          <Link
            href="/"
            className="text-3xl font-black tracking-tighter text-white"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            Rogue Studio
          </Link>
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl p-10 md:p-12 shadow-2xl z-10 hover:scale-[1.01] transition-transform duration-500">
          <header className="mb-10 text-center">
            <h1
              className="text-3xl md:text-4xl font-black tracking-tight text-on-tertiary-fixed leading-tight mb-2"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Welcome Back
            </h1>
            <p className="text-on-tertiary-fixed-variant text-sm">
              Login to Your{' '}
              <span
                className="italic font-normal"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                Dashboard
              </span>
            </p>
          </header>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60 mb-2 ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="hello@studio.com"
                autoComplete="email"
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 px-1 text-on-tertiary-fixed focus:outline-none focus:border-primary-container transition-all duration-300 placeholder:text-on-tertiary-fixed/30"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label
                  htmlFor="password"
                  className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60 ml-1"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] uppercase tracking-widest font-bold text-primary-container hover:opacity-80 transition-opacity"
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 px-1 text-on-tertiary-fixed focus:outline-none focus:border-primary-container transition-all duration-300 placeholder:text-on-tertiary-fixed/30"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-primary-fixed font-black py-5 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                {loading ? 'Logging in...' : (
                  <>
                    Login
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
              {error && (
                <p className="mt-3 text-red-500 text-xs text-center font-medium">{error}</p>
              )}
            </div>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-xs text-on-tertiary-fixed-variant/60 font-medium">
              Don&apos;t have access?{' '}
              <Link
                href="/contact"
                className="text-on-tertiary-fixed border-b border-on-tertiary-fixed/20 hover:border-primary-container transition-colors"
              >
                Contact your account manager
              </Link>
            </p>
          </footer>
        </div>

        <div className="mt-12 text-center z-10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-bold">
            Built for the bold &amp; the rogue
          </p>
        </div>
      </main>

      <footer className="w-full py-8 px-8 text-center z-10">
        <p className="text-white/30 text-[10px] tracking-widest uppercase">
          © Rogue Studio. Jaipur, India.
        </p>
      </footer>
    </div>
  )
}
