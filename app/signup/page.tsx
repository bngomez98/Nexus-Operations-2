'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Zap, Eye, EyeOff, ArrowRight, HomeIcon, HardHat } from 'lucide-react'

const inp: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  backgroundColor: '#111111',
  border: '1px solid #222222',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

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
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          phone: form.phone,
          company: form.company,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Sign up failed.'); return }

      if (form.role === 'contractor' && plan) {
        router.push(`/dashboard/contractor/subscribe?plan=${plan}`)
      } else if (form.role === 'contractor') {
        router.push('/dashboard/contractor/subscribe')
      } else {
        router.push('/dashboard/homeowner')
      }
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '48px', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#22c55e', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.025em' }}>Create your account</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '28px' }}>
          Already have one?{' '}
          <Link href="/login" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>

        {/* Role toggle */}
        <div style={{ display: 'flex', backgroundColor: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '4px', gap: '4px', marginBottom: '28px' }}>
          {([['homeowner', 'Homeowner', HomeIcon], ['contractor', 'Contractor', HardHat]] as const).map(([role, label, Icon]) => (
            <button
              key={role}
              type="button"
              onClick={() => set('role', role)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                padding: '11px',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.15s',
                backgroundColor: form.role === role ? '#22c55e' : 'transparent',
                color: form.role === role ? '#0a0a0a' : '#6b7280',
              }}
            >
              <Icon size={15} />
              {label}
              {role === 'homeowner' && <span style={{ fontSize: '11px', fontWeight: 700, opacity: form.role === role ? 0.7 : 0.5 }}>FREE</span>}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#f87171' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Full Name *</label>
              <input style={inp} type="text" value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Alex Johnson" autoComplete="name" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Phone</label>
              <input style={inp} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="785-555-0100" autoComplete="tel" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Email Address *</label>
            <input style={inp} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required placeholder="you@example.com" autoComplete="email" />
          </div>

          {form.role === 'contractor' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Company Name</label>
              <input style={inp} type="text" value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Your Business Name" autoComplete="organization" />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Password *</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => set('password', e.target.value)} required style={{ ...inp, paddingRight: '48px' }} placeholder="Min. 6 characters" autoComplete="new-password" />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Confirm Password *</label>
            <input style={inp} type="password" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} required placeholder="••••••••" autoComplete="new-password" />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '15px',
              backgroundColor: '#22c55e',
              color: '#0a0a0a',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '10px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
              fontFamily: 'inherit',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Creating account…' : (
              <>
                {form.role === 'homeowner' ? 'Create Free Account' : 'Create Contractor Account'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {form.role === 'homeowner' && (
          <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#4b5563' }}>Homeowner accounts are always free — no credit card needed.</p>
          </div>
        )}

        {form.role === 'contractor' && (
          <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#0e0e0e', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#4b5563' }}>After creating your account, you&apos;ll choose a membership plan to access the project feed.</p>
          </div>
        )}

        <p style={{ fontSize: '12px', color: '#2d2d2d', textAlign: 'center', marginTop: '28px' }}>
          <Link href="/terms" style={{ color: '#374151', textDecoration: 'underline' }}>Terms</Link>
          {' · '}
          <Link href="/privacy" style={{ color: '#374151', textDecoration: 'underline' }}>Privacy</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }} />}>
      <SignUpForm />
    </Suspense>
  )
}
