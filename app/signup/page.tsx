'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Building2, Eye, EyeOff, HomeIcon, HardHat } from 'lucide-react'

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = (searchParams.get('role') as 'homeowner' | 'contractor') ?? 'homeowner'

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: initialRole })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Sign up failed.'); return }
      router.push(`/dashboard/${form.role}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    backgroundColor: 'var(--color-background)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-foreground)',
    boxShadow: '0 0 0 2px transparent',
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
          <h1 className="mt-5 text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>Create an account</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Join Topeka's contractor marketplace</p>
        </div>

        {/* Role toggle */}
        <div
          className="flex rounded-xl p-1"
          style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
        >
          {([['homeowner', 'Homeowner', HomeIcon], ['contractor', 'Contractor', HardHat]] as const).map(([role, label, Icon]) => (
            <button
              key={role}
              type="button"
              onClick={() => setForm(prev => ({ ...prev, role }))}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={
                form.role === role
                  ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }
                  : { color: 'var(--color-muted-foreground)' }
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 space-y-4"
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
            {[
              { id: 'name', label: 'Full name', type: 'text', placeholder: 'John Smith', autocomplete: 'name' },
              { id: 'email', label: 'Email address', type: 'email', placeholder: 'john@example.com', autocomplete: 'email' },
            ].map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autocomplete}
                  value={form[field.id as keyof typeof form]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none"
                  style={inputStyle}
                  onFocus={e => (e.target.style.boxShadow = '0 0 0 2px var(--color-primary)')}
                  onBlur={e => (e.target.style.boxShadow = '0 0 0 2px transparent')}
                />
              </div>
            ))}

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm focus:outline-none"
                  style={inputStyle}
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

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>
                Confirm password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                autoComplete="new-password"
                value={form.confirm}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg text-sm focus:outline-none"
                style={inputStyle}
                onFocus={e => (e.target.style.boxShadow = '0 0 0 2px var(--color-primary)')}
                onBlur={e => (e.target.style.boxShadow = '0 0 0 2px transparent')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-sm"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Creating account...' : `Create ${form.role === 'homeowner' ? 'Homeowner' : 'Contractor'} Account`}
            </button>
          </form>

          {form.role === 'homeowner' && (
            <p className="text-center text-xs px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}>
              Homeowner accounts are always free — no credit card required.
            </p>
          )}

          <p className="text-center text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  )
}
