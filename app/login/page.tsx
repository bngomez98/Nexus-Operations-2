'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react'

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

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Invalid email or password.'); return }
      const redirect = params.get('redirect')
      const role = data.user?.role ?? 'homeowner'
      router.push(redirect || (role === 'contractor' ? '/dashboard/contractor' : '/dashboard/homeowner'))
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '52px', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#22c55e', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
        </Link>

        <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.025em' }}>Welcome back</h1>
        <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '36px' }}>
          No account?{' '}
          <Link href="/signup" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>Sign up free</Link>
        </p>

        {error && (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '13px 16px', marginBottom: '20px', fontSize: '14px', color: '#f87171' }}>
            {error}
          </div>
        )}

        {/* Demo hint */}
        <div style={{ backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '16px 18px', marginBottom: '28px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Demo credentials</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { label: 'Homeowner', e: 'homeowner@demo.com', p: 'password123' },
              { label: 'Contractor', e: 'contractor@demo.com', p: 'password123' },
            ].map((d) => (
              <button
                key={d.label}
                type="button"
                onClick={() => { setEmail(d.e); setPassword(d.p) }}
                style={{ background: 'none', border: '1px solid #1e1e1e', cursor: 'pointer', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#6b7280', backgroundColor: '#141414', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
              >
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{d.label}</span> — {d.e} / {d.p}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#9ca3af', marginBottom: '8px' }}>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inp} placeholder="you@example.com" autoComplete="email" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#9ca3af', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ ...inp, paddingRight: '48px' }} placeholder="••••••••" autoComplete="current-password" />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '15px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px', fontFamily: 'inherit', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}
          >
            {loading ? 'Signing in…' : <><span>Sign In</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <p style={{ fontSize: '13px', color: '#374151', textAlign: 'center', marginTop: '32px' }}>
          <Link href="/terms" style={{ color: '#4b5563', textDecoration: 'underline' }}>Terms</Link>
          {' · '}
          <Link href="/privacy" style={{ color: '#4b5563', textDecoration: 'underline' }}>Privacy</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }} />}>
      <LoginForm />
    </Suspense>
  )
}
