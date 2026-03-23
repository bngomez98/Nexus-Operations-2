'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Building2, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function getSafeRedirectTarget(value: string | null) {
    if (!value || !value.startsWith('/') || value.startsWith('//')) {
      return null
    }

    return value
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      // Get user profile to determine role and subscription state
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = user
        ? await supabase
            .from('profiles')
            .select('role, subscription_status')
            .eq('id', user.id)
            .maybeSingle()
        : { data: null }

      const role = profile?.role || user?.user_metadata?.role || 'homeowner'
      const defaultTarget =
        role === 'contractor'
          ? (profile?.subscription_status === 'active' ? '/dashboard/contractor' : '/dashboard/contractor/subscribe')
          : '/dashboard/homeowner'
      const redirectTarget = getSafeRedirectTarget(searchParams.get('redirect')) || defaultTarget

      router.push(redirectTarget)
      router.refresh()
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline mb-14 justify-center">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Building2 size={22} className="text-primary-fg" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Nexus <span className="text-primary">Operations</span>
          </span>
        </Link>

        <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Welcome back</h1>
        <p className="text-base text-muted mb-10">
          No account?{' '}
          <Link href="/signup" className="text-primary no-underline font-semibold hover:underline">
            Create one free
          </Link>
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-muted mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 pr-12 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-muted hover:text-foreground flex items-center"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 py-4 bg-primary text-primary-fg font-bold text-base rounded-xl border-none cursor-pointer mt-2 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-10">
          <Link href="/terms" className="text-muted underline hover:text-foreground">Terms</Link>
          {' · '}
          <Link href="/privacy" className="text-muted underline hover:text-foreground">Privacy</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
