import Link from 'next/link'
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react'
import { getPlanById } from '@/lib/products'

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; session_id?: string }>
}) {
  const { plan: planId } = await searchParams
  const plan = planId ? getPlanById(planId) : undefined

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '56px' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#22c55e', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
        </Link>

        {/* Success icon */}
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <CheckCircle2 size={40} color="#22c55e" />
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          You&apos;re in.
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.7, marginBottom: '8px' }}>
          {plan
            ? <>Your <span style={{ color: '#22c55e', fontWeight: 700 }}>{plan.name}</span> membership is now active. Start claiming projects immediately.</>
            : 'Your membership is now active. Start claiming exclusive projects immediately.'}
        </p>

        {plan && (
          <div style={{ backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '24px', margin: '32px 0', textAlign: 'left' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Your plan</p>
            <p style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '4px' }}>{plan.name}</p>
            <p style={{ fontSize: '24px', fontWeight: 800, color: '#22c55e', letterSpacing: '-0.03em' }}>
              ${Math.floor(plan.priceInCents / 100)}<span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>/month</span>
            </p>
            {plan.advanceWindow && (
              <p style={{ fontSize: '13px', color: '#4ade80', marginTop: '10px' }}>
                +{plan.advanceWindow} advance window active
              </p>
            )}
          </div>
        )}

        <Link
          href="/dashboard/contractor"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none' }}
        >
          Go to Contractor Portal <ArrowRight size={17} />
        </Link>

        <p style={{ fontSize: '13px', color: '#374151', marginTop: '24px' }}>
          Questions?{' '}
          <a href="mailto:support@nexusoperations.org" style={{ color: '#4b5563', textDecoration: 'underline' }}>
            support@nexusoperations.org
          </a>
        </p>
      </div>
    </div>
  )
}
