export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPlanById, PLANS } from '@/lib/products'
import { createCheckoutSession } from '@/app/actions/stripe'
import { ArrowLeft, CheckCircle2, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

type SubscribePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function SubscribePage({ searchParams }: SubscribePageProps) {
  const params = searchParams ? await searchParams : {}
  const planParam = getSingleParam(params.plan)
  const selectedPlanId = planParam && getPlanById(planParam) ? planParam : undefined
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirect=${encodeURIComponent(`/dashboard/contractor/subscribe${selectedPlanId ? `?plan=${selectedPlanId}` : ''}`)}`)

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, subscription_tier, subscription_status')
    .eq('id', user.id)
    .maybeSingle()

  if ((profile?.role || user.user_metadata?.role || 'contractor') !== 'contractor') redirect('/dashboard/homeowner')

  const hasPlan = profile?.subscription_status === 'active'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      {/* Nav */}
      <header style={{ backgroundColor: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a', padding: '0 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#0a0a0a" fill="#0a0a0a" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
          </Link>
          <Link href="/dashboard/contractor" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
        {hasPlan ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Crown size={32} color="#22c55e" />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.025em' }}>
              You&apos;re already subscribed
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px' }}>
              You have an active {profile?.subscription_tier} plan. Head back to your dashboard to claim projects.
            </p>
            <Link href="/dashboard/contractor" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', borderRadius: '10px', textDecoration: 'none' }}>
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>Contractor Membership</p>
              <h1 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '14px', lineHeight: 1.1 }}>
                {selectedPlanId ? 'Finish activating your plan' : 'Choose your plan'}
              </h1>
              <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
                {selectedPlanId
                  ? 'Verify your account, then complete Stripe checkout to unlock the contractor dashboard.'
                  : 'Flat monthly rate. Unlimited project claims. Cancel anytime. Secure checkout via Stripe.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '940px', margin: '0 auto' }}>
              {PLANS.map((plan) => {
                const hi = plan.highlight
                const isSelected = selectedPlanId === plan.id
                return (
                  <div
                    key={plan.id}
                    style={{
                      position: 'relative',
                      backgroundColor: hi || isSelected ? '#0d1f0d' : '#0e0e0e',
                      border: hi || isSelected ? '1px solid rgba(34,197,94,0.35)' : '1px solid #1e1e1e',
                      borderRadius: '20px',
                      padding: '40px 32px 36px',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: hi || isSelected ? '0 0 60px rgba(34,197,94,0.07)' : 'none',
                      transform: hi || isSelected ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {(plan.badge || isSelected) && (
                      <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: '#0a0a0a', fontSize: '11px', fontWeight: 700, padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                        {isSelected ? 'Selected' : plan.badge}
                      </div>
                    )}
                    <p style={{ fontSize: '12px', fontWeight: 700, color: hi || isSelected ? '#4ade80' : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>{plan.name}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '52px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                        ${Math.floor(plan.priceInCents / 100)}
                      </span>
                      <span style={{ fontSize: '15px', color: '#6b7280' }}>/mo</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.65, marginBottom: '24px' }}>{plan.description}</p>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '32px', flex: 1 }}>
                      {plan.features.map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '13px', color: '#c9d1d9', lineHeight: 1.5 }}>
                          <CheckCircle2 size={14} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <form action={createCheckoutSession.bind(null, plan.id)}>
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '14px',
                          backgroundColor: hi || isSelected ? '#22c55e' : 'transparent',
                          color: hi || isSelected ? '#0a0a0a' : '#22c55e',
                          fontWeight: 700,
                          fontSize: '15px',
                          borderRadius: '12px',
                          border: hi || isSelected ? 'none' : '1px solid rgba(34,197,94,0.3)',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
                      >
                        {isSelected ? `Continue with ${plan.name}` : `Subscribe — $${Math.floor(plan.priceInCents / 100)}/mo`}
                      </button>
                    </form>
                  </div>
                )
              })}
            </div>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#2d2d2d', marginTop: '32px' }}>
              Secured by Stripe. Cancel anytime. No setup fees.
            </p>
          </>
        )}
      </main>
    </div>
  )
}
