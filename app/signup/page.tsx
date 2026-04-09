'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Zap, Eye, EyeOff, ArrowRight, HomeIcon, HardHat, CheckCircle2, Shield } from 'lucide-react'

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
import { Building2, Eye, EyeOff, ArrowRight, Home, HardHat } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = (searchParams.get('role') as 'homeowner' | 'contractor') ?? 'homeowner'
  const plan = searchParams.get('plan') ?? ''

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
    phone: '', company: '', role: initialRole,
  })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role, phone: form.phone, company: form.company }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Sign up failed.'); return }
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

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inpStyle,
    borderColor: focusedField === field ? 'rgba(34,197,94,0.45)' : '#1e1e1e',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(34,197,94,0.08)' : 'none',
  })

  const isContractor = form.role === 'contractor'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080808', display: 'flex' }}>

      {/* ── Left panel (desktop only) ── */}
      <div style={{
        display: 'none',
        flex: '0 0 420px',
        background: 'linear-gradient(160deg, #0a1a0a 0%, #080808 70%)',
        borderRight: '1px solid #141414',
        padding: '48px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }} className="signup-panel">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

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

        <div style={{ position: 'relative', zIndex: 1 }}>
          {isContractor ? (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: '100px', marginBottom: '20px' }}>
                <HardHat size={12} color="#4ade80" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Contractor</span>
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}>
                Stop competing.<br />
                <span style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Start owning.</span>
              </h2>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.75, marginBottom: '32px' }}>
                Flat monthly rate. Unlimited exclusive claims. No per-lead fees, ever.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Plans from $299/mo flat rate', 'Unlimited project claims', 'Exclusive lock — no competition', 'License verification required'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={14} color="#22c55e" />
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{item}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.18)', borderRadius: '100px', marginBottom: '20px' }}>
                <HomeIcon size={12} color="#60a5fa" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#60a5fa', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Homeowner</span>
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}>
                Get matched with<br />
                <span style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>one expert.</span>
              </h2>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.75, marginBottom: '32px' }}>
                Submit your project for free. One verified contractor. No bidding wars.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['100% free for homeowners', 'Matched within 24 hours', 'Verified, licensed contractors', 'No bidding wars, ever'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={14} color="#22c55e" />
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield size={16} color="#22c55e" />
          <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.6 }}>
            Your data is encrypted and never sold to third parties.
          </p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Mobile logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '44px' }} className="mobile-logo">
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(34,197,94,0.25)' }}>
              <Zap size={19} color="#080808" fill="#080808" />
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
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em' }}>
              Nexus<span style={{ color: '#22c55e' }}>Ops</span>
            </span>
          </Link>

          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.025em' }}>
            Create your account
          </h1>
          <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '28px' }}>
            Already have one?{' '}
            <Link href="/login" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>

          {/* Role toggle */}
          <div style={{ display: 'flex', backgroundColor: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '4px', gap: '4px', marginBottom: '28px' }}>
            {([['homeowner', 'Homeowner', HomeIcon, 'FREE'], ['contractor', 'Contractor', HardHat, null]] as const).map(([role, label, Icon, tag]) => (
              <button
                key={role}
                type="button"
                onClick={() => set('role', role)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                  padding: '11px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
                  transition: 'all 0.15s',
                  backgroundColor: form.role === role ? '#22c55e' : 'transparent',
                  color: form.role === role ? '#080808' : '#6b7280',
                  boxShadow: form.role === role ? '0 2px 12px rgba(34,197,94,0.25)' : 'none',
                }}
              >
                <Icon size={14} />
                {label}
                {tag && <span style={{ fontSize: '10px', fontWeight: 800, opacity: form.role === role ? 0.7 : 0.4 }}>{tag}</span>}
              </button>
            ))}
          </div>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ flexShrink: 0 }}>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Full Name *</label>
                <input style={focusStyle('name')} type="text" value={form.name} onChange={(e) => set('name', e.target.value)} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} required placeholder="Alex Johnson" autoComplete="name" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Phone</label>
                <input style={focusStyle('phone')} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} placeholder="785-555-0100" autoComplete="tel" />
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

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Email Address *</label>
              <input style={focusStyle('email')} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} required placeholder="you@example.com" autoComplete="email" />
            </div>

            {isContractor && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Company Name</label>
                <input style={focusStyle('company')} type="text" value={form.company} onChange={(e) => set('company', e.target.value)} onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)} placeholder="Your Business Name" autoComplete="organization" />
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

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => set('password', e.target.value)} onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)} required style={{ ...focusStyle('password'), paddingRight: '48px' }} placeholder="Min. 6 characters" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#4b5563', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#9ca3af' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#4b5563' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Confirm Password *</label>
              <input style={focusStyle('confirm')} type="password" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} onFocus={() => setFocusedField('confirm')} onBlur={() => setFocusedField(null)} required placeholder="••••••••" autoComplete="new-password" />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '15px',
                background: loading ? '#1a1a1a' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: loading ? '#4b5563' : '#080808',
                fontWeight: 700, fontSize: '15px', borderRadius: '11px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '4px', fontFamily: 'inherit',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(34,197,94,0.25)',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid #374151', borderTopColor: '#6b7280', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Creating account…
                </span>
              ) : (
                <>{isContractor ? 'Create Contractor Account' : 'Create Free Account'} <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Role-specific note */}
          <div style={{ marginTop: '14px', padding: '12px 16px', backgroundColor: '#0d0d0d', border: `1px solid ${isContractor ? 'rgba(34,197,94,0.12)' : '#141414'}`, borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#374151' }}>
              {isContractor
                ? "After creating your account, you'll choose a membership plan to access the project feed."
                : 'Homeowner accounts are always free — no credit card needed.'}
            </p>
        {form.role === 'homeowner' && (
          <div className="mt-5 p-4 bg-card border border-border rounded-xl text-center">
            <p className="text-sm text-muted">Homeowner accounts are always free — no credit card required.</p>
          </div>
        )}

        {form.role === 'contractor' && (
          <div className="mt-5 p-4 bg-card border border-primary/20 rounded-xl text-center">
            <p className="text-sm text-muted">After creating your account, select a membership plan to access the project feed.</p>
          </div>

          <p style={{ fontSize: '12px', color: '#1f2937', textAlign: 'center', marginTop: '24px' }}>
            <Link href="/terms" style={{ color: '#374151', textDecoration: 'underline' }}>Terms</Link>
            {' · '}
            <Link href="/privacy" style={{ color: '#374151', textDecoration: 'underline' }}>Privacy</Link>
          </p>
        </div>
        <p className="text-xs text-muted text-center mt-8">
          <Link href="/terms" className="text-muted underline hover:text-foreground">Terms</Link>
          {' · '}
          <Link href="/privacy" className="text-muted underline hover:text-foreground">Privacy</Link>
        </p>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .signup-panel { display: flex !important; }
          .mobile-logo { display: none !important; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#080808' }} />}>
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignUpForm />
    </Suspense>
  )
}
