'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Building2, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Login failed.'); return }
      router.push(`/dashboard/${data.user.role}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-muted)' }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Building2 className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
            <span className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>Nexus Ops</span>
          </Link>
          <h1 className="mt-5 text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>Welcome back</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 space-y-5"
          style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
        >
          {error && (
            <div
              className="px-4 py-3 rounded-lg text-sm"
              style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)',
                  boxShadow: '0 0 0 2px transparent',
                }}
                onFocus={e => (e.target.style.boxShadow = '0 0 0 2px var(--color-primary)')}
                onBlur={e => (e.target.style.boxShadow = '0 0 0 2px transparent')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm focus:outline-none"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-foreground)',
                    boxShadow: '0 0 0 2px transparent',
                  }}
                  onFocus={e => (e.target.style.boxShadow = '0 0 0 2px var(--color-primary)')}
                  onBlur={e => (e.target.style.boxShadow = '0 0 0 2px transparent')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-muted-foreground)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-sm mt-2"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold" style={{ color: 'var(--color-primary)' }}>
              Sign up free
            </Link>
          </p>
        </div>

        {/* Demo */}
        <div
          className="rounded-xl p-4 text-sm space-y-1"
          style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
        >
          <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>Demo accounts</p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>Homeowner: <span className="font-mono">john@example.com</span> / <span className="font-mono">password</span></p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>Contractor: <span className="font-mono">contractor@example.com</span> / <span className="font-mono">password</span></p>
        </div>
      </div>
    </div>
  )
}
