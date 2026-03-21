'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { getPlanById } from '@/lib/products'

export async function createCheckoutSession(planId: string) {
  const session = await getSession()
  if (!session || session.user.role !== 'contractor') {
    redirect('/login?redirect=/pricing')
  }

  const plan = getPlanById(planId)
  if (!plan) throw new Error('Invalid plan')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nexusoperations.org'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Nexus Operations — ${plan.name} Plan`,
            description: plan.description,
          },
          unit_amount: plan.priceInCents,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
    ],
    customer_email: session.user.email,
    metadata: {
      userId: session.user.id,
      planId: plan.id,
    },
    success_url: `${baseUrl}/dashboard/contractor/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/dashboard/contractor/subscribe`,
    ui_mode: 'hosted',
  })

  redirect(checkoutSession.url!)
}
