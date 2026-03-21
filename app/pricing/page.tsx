import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { PLANS } from '@/lib/products'
import { createCheckoutSession } from '@/app/actions/stripe'
import { ArrowRight, CheckCircle2, X, Zap } from 'lucide-react'

export const metadata: Metadata = { title: 'Pricing' }

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

function Check({ on }: { on: boolean }) {
  return on
    ? <CheckCircle2 size={18} color="#22c55e" />
    : <X size={16} color="#2a2a2a" />
}

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <div style={{ padding: '160px 24px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>Contractor Membership</p>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '20px', lineHeight: 1.05 }}>
          One flat rate.<br />
          <span className="text-gradient">Unlimited exclusives.</span>
        </h1>
        <p style={{ fontSize: '19px', color: '#6b7280', maxWidth: '520px', margin: '0 auto 12px', lineHeight: 1.65 }}>
          No per-lead fees. No commissions. No surprises. Cancel anytime.
        </p>
        <p style={{ fontSize: '14px', color: '#4b5563' }}>Homeowners always post for free.</p>
      </div>

      {/* Plan cards */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
          {PLANS.map((plan) => {
            const hi = plan.highlight
            return (
              <div
                key={plan.id}
                style={{
                  position: 'relative',
                  backgroundColor: hi ? '#0d1f0d' : '#0e0e0e',
                  border: hi ? '1px solid rgba(34,197,94,0.4)' : '1px solid #1a1a1a',
                  borderRadius: '24px',
                  padding: '44px 36px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: hi ? '0 0 80px rgba(34,197,94,0.08)' : 'none',
                  transform: hi ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {plan.badge && (
                  <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: '#0a0a0a', fontSize: '11px', fontWeight: 700, padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>
                    {plan.badge}
                  </div>
                )}

                <p style={{ fontSize: '12px', fontWeight: 700, color: hi ? '#4ade80' : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>{plan.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '54px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1 }}>${Math.floor(plan.priceInCents / 100)}</span>
                  <span style={{ fontSize: '16px', color: '#6b7280', fontWeight: 500 }}>/mo</span>
                </div>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '28px' }}>{plan.description}</p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#c9d1d9', lineHeight: 1.5 }}>
                      <CheckCircle2 size={15} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <form action={createCheckoutSession.bind(null, plan.id)}>
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '15px',
                      width: '100%',
                      backgroundColor: hi ? '#22c55e' : 'transparent',
                      color: hi ? '#0a0a0a' : '#22c55e',
                      fontWeight: 700,
                      fontSize: '15px',
                      borderRadius: '12px',
                      border: hi ? 'none' : '1px solid rgba(34,197,94,0.3)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Get Started <ArrowRight size={15} />
                  </button>
                </form>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', textAlign: 'center', marginBottom: '48px', letterSpacing: '-0.02em' }}>Plan comparison</h2>
          <div style={{ border: '1px solid #1a1a1a', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px', backgroundColor: '#0e0e0e', padding: '18px 28px', borderBottom: '1px solid #1a1a1a' }}>
              <span style={{ fontSize: '13px', color: '#4b5563' }}>Feature</span>
              {PLANS.map((p) => (
                <div key={p.id} style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: p.highlight ? '#22c55e' : '#9ca3af' }}>{p.name}</div>
              ))}
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={row.label}
                style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px', padding: '15px 28px', backgroundColor: i % 2 === 0 ? '#0a0a0a' : '#0c0c0c', borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid #111111' : 'none', alignItems: 'center' }}
              >
                <span style={{ fontSize: '14px', color: '#9ca3af' }}>{row.label}</span>
                {[row.standard, row.premium, row.elite].map((v, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'center' }}><Check on={v} /></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: '#070707', borderTop: '1px solid #111111', padding: '100px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', textAlign: 'center', marginBottom: '56px', letterSpacing: '-0.02em' }}>Common questions</h2>
          {[
            { q: 'Is there a contract or commitment?', a: 'No contracts. All plans are month-to-month and you can cancel anytime from your dashboard with no cancellation fees.' },
            { q: 'What happens when I claim a project?', a: "The project is immediately and permanently removed from all other contractors' feeds. Only you can see it and contact the homeowner." },
            { q: 'How do advance windows work?', a: 'Premium members see new projects 90 seconds before Standard. Elite members get that same head start plus a 10-minute exclusive window on any project with a budget over $5,000.' },
            { q: 'Do I need to be licensed?', a: 'Yes. All contractors must submit proof of valid Kansas licensing before gaining access to the project feed. We verify every application.' },
            { q: 'What service area do you cover?', a: 'Currently serving Topeka, KS and surrounding Shawnee County. We are actively expanding to additional Kansas markets.' },
          ].map((item) => (
            <div key={item.q} style={{ borderBottom: '1px solid #1a1a1a', padding: '28px 0' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{item.q}</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '16px', marginBottom: '24px' }}>
          <Zap size={28} color="#22c55e" />
        </div>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.03em' }}>Start claiming projects today.</h2>
        <p style={{ fontSize: '17px', color: '#6b7280', marginBottom: '36px' }}>No setup fees. No per-lead charges. Cancel anytime.</p>
        <Link href="/signup?role=contractor" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '16px', borderRadius: '12px', textDecoration: 'none' }}>
          Choose a Plan <ArrowRight size={18} />
        </Link>
      </section>

      <Footer />
    </div>
  )
}
