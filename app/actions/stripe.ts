'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { getPlanById } from '@/lib/products'

export async function createCheckoutSession(planId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(`/dashboard/contractor/subscribe?plan=${planId}`)}`)
  }

  const plan = getPlanById(planId)
  if (!plan) throw new Error('Invalid plan')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, subscription_status')
    .eq('id', user.id)
    .maybeSingle()

  if (profile?.role !== 'contractor') {
    redirect('/dashboard/homeowner')
  }

  if (profile?.subscription_status === 'active') {
    redirect('/dashboard/contractor')
  }

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
    customer_email: user.email ?? undefined,
    metadata: {
      userId: user.id,
      planId: plan.id,
    },
    success_url: `${baseUrl}/dashboard/contractor/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/dashboard/contractor/subscribe?plan=${plan.id}`,
    ui_mode: 'hosted',
  })

  redirect(checkoutSession.url!)
}
