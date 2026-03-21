'use server'

import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { getPlanById } from '@/lib/products'
import { getSession } from '@/lib/auth'

export async function createCheckoutSession(planId: string) {
  const session = await getSession()
  if (!session || session.user.role !== 'contractor') {
    redirect('/login?redirect=/pricing')
  }

  const plan = getPlanById(planId)
  if (!plan) throw new Error('Invalid plan')

  // Create a recurring price on the fly (or use pre-created Stripe Price IDs in production)
  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: plan.priceInCents,
    recurring: { interval: 'month' },
    product_data: {
      name: `Nexus Operations — ${plan.name} Plan`,
    },
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: price.id, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${planId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/pricing`,
    customer_email: session.user.email,
    metadata: {
      userId: session.user.id,
      planId: plan.id,
    },
    allow_promotion_codes: true,
  })

  redirect(checkoutSession.url!)
}
