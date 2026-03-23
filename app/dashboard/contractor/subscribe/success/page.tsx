import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react'

type SubscribeSuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function SubscribeSuccessPage({ searchParams }: SubscribeSuccessPageProps) {
  const params = searchParams ? await searchParams : {}
  const sessionId = getSingleParam(params.session_id)
  let planName = 'membership'
  let isVerified = false

  if (sessionId) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['customer', 'subscription'],
      })

      const planId = checkoutSession.metadata?.planId
      const sessionUserId = checkoutSession.metadata?.userId

      if (
        checkoutSession.mode === 'subscription' &&
        checkoutSession.status === 'complete' &&
        sessionUserId === user.id &&
        planId
      ) {
        planName = planId
        isVerified = true

        const stripeCustomerId =
          typeof checkoutSession.customer === 'string'
            ? checkoutSession.customer
            : checkoutSession.customer?.id ?? null

        await supabase
          .from('profiles')
          .update({
            subscription_tier: planId,
            subscription_status: 'active',
            stripe_customer_id: stripeCustomerId,
          })
          .eq('id', user.id)
      }
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        {/* Icon */}
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', border: '1px solid rgba(34,197,94,0.2)' }}>
          <CheckCircle2 size={40} color="#22c55e" />
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
          {isVerified ? 'You&apos;re in.' : 'Checkout received.'}
        </h1>
        <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.7, marginBottom: '12px' }}>
          {isVerified
            ? `Your ${planName} membership is now active. Head to your dashboard to start claiming exclusive projects.`
            : 'We received your checkout return. Sign in again if needed, then reopen this page from Stripe to finish activating your membership.'}
        </p>
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '40px' }}>
          {isVerified
            ? 'A confirmation email has been sent to you from Stripe. Cancel anytime from your dashboard.'
            : 'If you already completed payment, make sure you opened the success link while signed in to the same contractor account.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <Link
            href={isVerified ? '/dashboard/contractor' : '/dashboard/contractor/subscribe'}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 36px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '16px', borderRadius: '12px', textDecoration: 'none' }}
          >
            {isVerified ? 'Start Claiming Projects' : 'Back to Plans'} <ArrowRight size={18} />
          </Link>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#4b5563', textDecoration: 'none' }}>
            <Zap size={13} /> Return to Nexus Ops home
          </Link>
        </div>
      </div>
    </div>
  )
}
