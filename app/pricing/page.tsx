'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { PLANS } from '@/lib/products'
import { ArrowRight, CheckCircle2, X, Zap, ChevronDown } from 'lucide-react'

const COMPARE_ROWS = [
  { label: 'Full project feed access',       standard: true,  premium: true,  elite: true  },
  { label: 'Unlimited project claims',       standard: true,  premium: true,  elite: true  },
  { label: 'Exclusive claim lock',           standard: true,  premium: true,  elite: true  },
  { label: 'Email notifications',            standard: true,  premium: true,  elite: true  },
  { label: 'SMS notifications',              standard: false, premium: true,  elite: true  },
  { label: '90-sec advance window',          standard: false, premium: true,  elite: true  },
  { label: '10-min exclusive on $5K+ jobs',  standard: false, premium: false, elite: true  },
  { label: 'Claim analytics dashboard',      standard: false, premium: true,  elite: true  },
  { label: 'Dedicated account manager',      standard: false, premium: false, elite: true  },
  { label: 'White-glove onboarding',         standard: false, premium: false, elite: true  },
]

const FAQS = [
  { q: 'Is there a contract or commitment?',       a: 'No contracts. All plans are month-to-month and you can cancel anytime from your dashboard with no cancellation fees.' },
  { q: 'What happens when I claim a project?',     a: "The project is immediately and permanently removed from all other contractors' feeds. Only you can see it and contact the homeowner." },
  { q: 'How do advance windows work?',             a: 'Premium members see new projects 90 seconds before Standard. Elite members get that same head start plus a 10-minute exclusive window on any project with a budget over $5,000.' },
  { q: 'Do I need to be licensed?',                a: 'Yes. All contractors must submit proof of valid Kansas licensing before gaining access to the project feed. We verify every application.' },
  { q: 'What service area do you cover?',          a: 'Currently serving Topeka, KS and surrounding Shawnee County. We are actively expanding to additional Kansas markets.' },
  { q: 'Can I upgrade or downgrade my plan?',      a: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.' },
]

function Check({ on }: { on: boolean }) {
  return on
    ? <CheckCircle2 size={17} color="#22c55e" />
    : <X size={15} color="#2a2a2a" />
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        borderBottom: '1px solid #141414',
        transition: 'background-color 0.15s',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '22px 0', cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: 700, color: open ? '#ffffff' : '#d1d5db', letterSpacing: '-0.01em', transition: 'color 0.15s' }}>{q}</span>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
          backgroundColor: open ? 'rgba(34,197,94,0.1)' : '#111111',
          border: open ? '1px solid rgba(34,197,94,0.2)' : '1px solid #1e1e1e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          <ChevronDown size={14} color={open ? '#22c55e' : '#4b5563'} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)' }} />
        </div>
      </button>
      {open && (
        <div style={{ paddingBottom: '22px', animation: 'slideDown 0.25s cubic-bezier(0.16,1,0.3,1)' }}>
          <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.8 }}>{a}</p>
        </div>
      )}
    </div>
  )
}

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: '160px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label">Contractor Membership</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 66px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: '20px', lineHeight: 1.0 }}>
            One flat rate.<br />
            <span className="text-gradient">Unlimited exclusives.</span>
          </h1>
          <p style={{ fontSize: '19px', color: '#6b7280', maxWidth: '520px', margin: '0 auto 12px', lineHeight: 1.7 }}>
            No per-lead fees. No commissions. No surprises. Cancel anytime.
          </p>
          <p style={{ fontSize: '13px', color: '#374151' }}>Homeowners always post for free.</p>
        </div>
      </div>

      {/* Plan cards */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', alignItems: 'stretch' }}>
          {PLANS.map((plan) => {
            const hi = plan.highlight
            return (
              <div
                key={plan.id}
                style={{
                  position: 'relative',
                  backgroundColor: hi ? '#0a1a0a' : '#0d0d0d',
                  border: hi ? '1px solid rgba(34,197,94,0.35)' : '1px solid #1a1a1a',
                  borderRadius: '24px',
                  padding: '44px 36px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: hi ? '0 0 80px rgba(34,197,94,0.07)' : 'none',
                  transform: hi ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  if (!hi) {
                    el.style.borderColor = '#242424'
                    el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)'
                  } else {
                    el.style.boxShadow = '0 0 100px rgba(34,197,94,0.12)'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  if (!hi) {
                    el.style.borderColor = '#1a1a1a'
                    el.style.boxShadow = 'none'
                  } else {
                    el.style.boxShadow = '0 0 80px rgba(34,197,94,0.07)'
                  }
                }}
              >
                {plan.badge && (
                  <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#080808', fontSize: '11px', fontWeight: 800, padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>
                    {plan.badge}
                  </div>
                )}

                <p style={{ fontSize: '11px', fontWeight: 700, color: hi ? '#4ade80' : '#4b5563', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>{plan.name}</p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '56px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.05em', lineHeight: 1 }}>${Math.floor(plan.priceInCents / 100)}</span>
                  <span style={{ fontSize: '15px', color: '#4b5563', fontWeight: 500 }}>/mo</span>
                </div>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.65, marginBottom: '28px' }}>{plan.description}</p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '36px', flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#9ca3af', lineHeight: 1.55 }}>
                      <CheckCircle2 size={14} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/signup?role=contractor&plan=${plan.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '14px',
                    background: hi ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'transparent',
                    color: hi ? '#080808' : '#22c55e',
                    fontWeight: 700, fontSize: '14px', borderRadius: '12px', textDecoration: 'none',
                    border: hi ? 'none' : '1px solid rgba(34,197,94,0.25)',
                    boxShadow: hi ? '0 4px 20px rgba(34,197,94,0.25)' : 'none',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    if (hi) {
                      el.style.transform = 'translateY(-1px)'
                      el.style.boxShadow = '0 6px 24px rgba(34,197,94,0.35)'
                    } else {
                      el.style.backgroundColor = 'rgba(34,197,94,0.06)'
                      el.style.borderColor = 'rgba(34,197,94,0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    if (hi) {
                      el.style.boxShadow = '0 4px 20px rgba(34,197,94,0.25)'
                    } else {
                      el.style.backgroundColor = 'transparent'
                      el.style.borderColor = 'rgba(34,197,94,0.25)'
                    }
                  }}
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', textAlign: 'center', marginBottom: '48px', letterSpacing: '-0.025em' }}>Plan comparison</h2>
          <div style={{ border: '1px solid #1a1a1a', borderRadius: '20px', overflow: 'hidden' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 90px', backgroundColor: '#0d0d0d', padding: '16px 28px', borderBottom: '1px solid #1a1a1a' }}>
              <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Feature</span>
              {PLANS.map((p) => (
                <div key={p.id} style={{ textAlign: 'center', fontSize: '12px', fontWeight: 800, color: p.highlight ? '#22c55e' : '#6b7280', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.name}</div>
              ))}
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 90px 90px 90px',
                  padding: '13px 28px',
                  backgroundColor: i % 2 === 0 ? '#080808' : '#0a0a0a',
                  borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid #111111' : 'none',
                  alignItems: 'center',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0d0d0d' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = i % 2 === 0 ? '#080808' : '#0a0a0a' }}
              >
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{row.label}</span>
                {[row.standard, row.premium, row.elite].map((v, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Check on={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: '#060606', borderTop: '1px solid #111111', padding: '100px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>FAQ</p>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', textAlign: 'center', marginBottom: '52px', letterSpacing: '-0.025em' }}>Common questions</h2>
          <div>
            {FAQS.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '16px', marginBottom: '24px', boxShadow: '0 0 30px rgba(34,197,94,0.1)' }}>
            <Zap size={26} color="#22c55e" />
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.035em' }}>Start claiming projects today.</h2>
          <p style={{ fontSize: '17px', color: '#6b7280', marginBottom: '36px' }}>No setup fees. No per-lead charges. Cancel anytime.</p>
          <Link
            href="/signup?role=contractor"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#080808', fontWeight: 800, fontSize: '15px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 24px rgba(34,197,94,0.25)', letterSpacing: '-0.01em', transition: 'transform 0.15s, box-shadow 0.15s' }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(34,197,94,0.35)' }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 24px rgba(34,197,94,0.25)' }}
          >
            Choose a Plan <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        .section-label {
          font-size: 11px;
          font-weight: 700;
          color: #22c55e;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
