'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Building2, Eye, EyeOff, ArrowRight, Home, HardHat } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = (searchParams.get('role') as 'homeowner' | 'contractor') ?? 'homeowner'
  const plan = searchParams.get('plan') ?? ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    phone: '',
    company: '',
    role: initialRole,
  })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    
    try {
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard/${form.role}`,
          data: {
            full_name: form.name,
            phone: form.phone,
            company: form.company,
            role: form.role,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      // Redirect to success page or dashboard
      if (form.role === 'contractor' && plan) {
        router.push(`/signup/success?plan=${plan}`)
      } else {
        router.push('/signup/success')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline mb-12 justify-center">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Building2 size={22} className="text-primary-fg" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Nexus <span className="text-primary">Operations</span>
          </span>
        </Link>

        <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Create your account</h1>
        <p className="text-base text-muted mb-8">
          Already have one?{' '}
          <Link href="/login" className="text-primary no-underline font-semibold hover:underline">
            Sign in
          </Link>
        </p>

        {/* Role toggle */}
        <div className="flex bg-card border border-border rounded-xl p-1 gap-1 mb-8">
          {([['homeowner', 'Homeowner', Home], ['contractor', 'Contractor', HardHat]] as const).map(([role, label, Icon]) => (
            <button
              key={role}
              type="button"
              onClick={() => set('role', role)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-none cursor-pointer text-sm font-semibold transition-all ${
                form.role === role 
                  ? 'bg-primary text-primary-fg' 
                  : 'bg-transparent text-muted hover:text-foreground'
              }`}
            >
              <Icon size={16} />
              {label}
              {role === 'homeowner' && <span className="text-xs font-bold opacity-70">FREE</span>}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                placeholder="Alex Johnson"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                placeholder="785-555-0100"
                autoComplete="tel"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Email Address *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
              className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>

          {form.role === 'contractor' && (
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Company Name</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
                className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                placeholder="Your Business Name"
                autoComplete="organization"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Password *</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                required
                className="w-full px-4 py-3.5 pr-12 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
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

          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Confirm Password *</label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => set('confirm', e.target.value)}
              required
              className="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              placeholder="Re-enter password"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 py-4 bg-primary text-primary-fg font-bold text-base rounded-xl border-none cursor-pointer mt-2 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : (
              <>
                {form.role === 'homeowner' ? 'Create Free Account' : 'Create Contractor Account'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {form.role === 'homeowner' && (
          <div className="mt-5 p-4 bg-card border border-border rounded-xl text-center">
            <p className="text-sm text-muted">Homeowner accounts are always free — no credit card required.</p>
          </div>
        )}

        {form.role === 'contractor' && (
          <div className="mt-5 p-4 bg-card border border-primary/20 rounded-xl text-center">
            <p className="text-sm text-muted">After creating your account, select a membership plan to access the project feed.</p>
          </div>
        )}

        <p className="text-xs text-muted text-center mt-8">
          <Link href="/terms" className="text-muted underline hover:text-foreground">Terms</Link>
          {' · '}
          <Link href="/privacy" className="text-muted underline hover:text-foreground">Privacy</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignUpForm />
    </Suspense>
  )
}
