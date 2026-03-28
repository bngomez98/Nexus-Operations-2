'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Zap, Eye, EyeOff, ArrowRight, CheckCircle2, Lock } from 'lucide-react'

const inpStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  backgroundColor: '#0d0d0d',
  border: '1px solid #1e1e1e',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
      router.push(redirect || (data.role === 'contractor' ? '/dashboard/contractor' : '/dashboard/homeowner'))
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inpStyle,
    borderColor: focusedField === field ? 'rgba(34,197,94,0.45)' : '#1e1e1e',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(34,197,94,0.08)' : 'none',
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080808', display: 'flex' }}>

      {/* ── Left panel (decorative, desktop only) ── */}
      <div style={{
        display: 'none',
        flex: '0 0 440px',
        background: 'linear-gradient(160deg, #0a1a0a 0%, #080808 60%)',
        borderRight: '1px solid #141414',
        padding: '48px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }} className="login-panel">
        {/* Grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}>
              <Zap size={20} color="#080808" fill="#080808" />
            </div>
            <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em' }}>
              Nexus<span style={{ color: '#22c55e' }}>Ops</span>
            </span>
          </Link>
        </div>

        {/* Middle content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            Topeka&apos;s exclusive<br />
            <span style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>contractor marketplace.</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.75, marginBottom: '36px' }}>
            One project. One contractor. Zero bidding wars.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'Free for homeowners — always',
              'Verified, licensed contractors only',
              'Exclusive claim lock per project',
              'Under 24-hour match guarantee',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={15} color="#22c55e" />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat */}
        <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
          <p style={{ fontSize: '28px', fontWeight: 900, color: '#22c55e', letterSpacing: '-0.03em', lineHeight: 1 }}>340+</p>
          <p style={{ fontSize: '13px', color: '#4b5563', marginTop: '4px' }}>Projects successfully matched this year</p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Mobile logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '52px' }} className="mobile-logo">
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(34,197,94,0.25)' }}>
              <Zap size={19} color="#080808" fill="#080808" />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em' }}>
              Nexus<span style={{ color: '#22c55e' }}>Ops</span>
            </span>
          </Link>

          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.025em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '15px', color: '#4b5563', marginBottom: '36px' }}>
            No account?{' '}
            <Link href="/signup" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>Sign up free</Link>
          </p>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '10px', padding: '13px 16px', marginBottom: '20px', fontSize: '14px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ flexShrink: 0 }}>⚠</span> {error}
            </div>
          )}

          {/* Demo credentials */}
          <div style={{ backgroundColor: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '16px', marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Demo credentials</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'Homeowner', e: 'homeowner@demo.com', p: 'password123' },
                { label: 'Contractor', e: 'contractor@demo.com', p: 'password123' },
              ].map((d) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => { setEmail(d.e); setPassword(d.p) }}
                  style={{ background: 'none', border: '1px solid #1a1a1a', cursor: 'pointer', textAlign: 'left', padding: '9px 12px', borderRadius: '8px', fontSize: '12px', color: '#6b7280', backgroundColor: '#111111', fontFamily: 'inherit', transition: 'border-color 0.15s, background-color 0.15s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(34,197,94,0.25)'; el.style.backgroundColor = '#141414' }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = '#1a1a1a'; el.style.backgroundColor = '#111111' }}
                >
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>{d.label}</span> — {d.e} / {d.p}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                style={focusStyle('email')}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{ ...focusStyle('password'), paddingRight: '48px' }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#4b5563', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#9ca3af' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#4b5563' }}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '15px',
                background: loading ? '#1a1a1a' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: loading ? '#4b5563' : '#080808',
                fontWeight: 700, fontSize: '15px',
                borderRadius: '11px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '4px', fontFamily: 'inherit',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(34,197,94,0.25)',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid #374151', borderTopColor: '#6b7280', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Signing in…
                </span>
              ) : (
                <><Lock size={15} /> Sign In <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p style={{ fontSize: '12px', color: '#1f2937', textAlign: 'center', marginTop: '32px' }}>
            <Link href="/terms" style={{ color: '#374151', textDecoration: 'underline' }}>Terms</Link>
            {' · '}
            <Link href="/privacy" style={{ color: '#374151', textDecoration: 'underline' }}>Privacy</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .login-panel { display: flex !important; }
          .mobile-logo { display: none !important; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#080808' }} />}>
      <LoginForm />
    </Suspense>
  )
}
