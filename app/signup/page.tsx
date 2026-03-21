'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Zap, Eye, EyeOff, ArrowRight, Home, HardHat } from 'lucide-react'

const inp: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  backgroundColor: '#111111',
  border: '1px solid #222222',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'inherit',
}

function SignUpForm() {
  const router = useRouter()
  const params = useSearchParams()
  const initialRole = (params.get('role') as 'homeowner' | 'contractor') ?? 'homeowner'

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: initialRole, phone: '', company: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handle(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role, phone: form.phone, company: form.company }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Sign up failed.'); return }
      router.push(form.role === 'contractor' ? '/dashboard/contractor' : '/dashboard/homeowner')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '48px', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#22c55e', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.025em' }}>Create your account</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
          Already have one?{' '}
          <Link href="/login" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>

        {/* Role toggle */}
        <div style={{ display: 'flex', backgroundColor: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '4px', marginBottom: '28px', gap: '4px' }}>
          {([['homeowner', 'Homeowner', Home], ['contractor', 'Contractor', HardHat]] as const).map(([role, label, Icon]) => (
            <button
              key={role}
              type="button"
              onClick={() => setForm((p) => ({ ...p, role }))}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '9px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'all 0.15s', backgroundColor: form.role === role ? '#22c55e' : 'transparent', color: form.role === role ? '#0a0a0a' : '#6b7280', fontFamily: 'inherit' }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {form.role === 'homeowner' && (
          <div style={{ backgroundColor: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', fontSize: '13px', color: '#4ade80' }}>
            Homeowner accounts are always <strong>free</strong> — no credit card required.
          </div>
        )}
        {form.role === 'contractor' && (
          <div style={{ backgroundColor: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', fontSize: '13px', color: '#4ade80' }}>
            Choose your membership plan after signup. Starting at <strong>$299/mo</strong>.
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '13px 16px', marginBottom: '20px', fontSize: '13px', color: '#f87171' }}>
            {error}
          </div>
        )}

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Full Name</label>
            <input name="name" type="text" value={form.name} onChange={handle} required placeholder="John Smith" style={inp} autoComplete="name" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" style={inp} autoComplete="email" />
          </div>
          {form.role === 'contractor' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Company Name</label>
                <input name="company" type="text" value={form.company} onChange={handle} placeholder="Torres Home Services" style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Phone</label>
                <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="(785) 555-0100" style={inp} autoComplete="tel" />
              </div>
            </>
          )}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handle} required placeholder="Min. 6 characters" style={{ ...inp, paddingRight: '48px' }} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPw((v) => !v)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }} aria-label={showPw ? 'Hide password' : 'Show password'}>
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Confirm Password</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handle} required placeholder="••••••••" style={inp} autoComplete="new-password" />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '15px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating account...' : <><span>Create Account</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#374151', textAlign: 'center', marginTop: '28px', lineHeight: 1.8 }}>
          By creating an account you agree to our{' '}
          <Link href="/terms" style={{ color: '#4b5563', textDecoration: 'underline' }}>Terms</Link>
          {' and '}
          <Link href="/privacy" style={{ color: '#4b5563', textDecoration: 'underline' }}>Privacy Policy</Link>
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
