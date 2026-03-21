import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { userStore } from '@/lib/auth'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ''

/**
 * Stripe Webhook Handler
 *
 * Events handled:
 *  - checkout.session.completed  → activate plan on the user
 *  - customer.subscription.updated → sync plan changes (upgrades/downgrades)
 *  - customer.subscription.deleted → mark subscription canceled
 */
export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, WEBHOOK_SECRET)
  } catch (err) {
    console.error('[stripe webhook] signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const planId = session.metadata?.planId as 'standard' | 'premium' | 'elite' | undefined
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id

        if (userId && planId) {
          const user = userStore.get(userId)
          if (user) {
            userStore.set(userId, {
              ...user,
              plan: planId,
              stripeCustomerId: typeof session.customer === 'string' ? session.customer : session.customer?.id,
              stripeSubscriptionId: subscriptionId,
              subscriptionStatus: 'active',
            })
            console.log(`[stripe webhook] activated plan=${planId} for userId=${userId}`)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        // Find user by stripeCustomerId
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
        const targetUser = [...userStore.values()].find((u) => u.stripeCustomerId === customerId)
        if (targetUser) {
          const status = sub.status === 'active' ? 'active' : sub.status === 'canceled' ? 'canceled' : 'inactive'
          userStore.set(targetUser.id, { ...targetUser, subscriptionStatus: status, stripeSubscriptionId: sub.id })
          console.log(`[stripe webhook] subscription updated status=${status} for userId=${targetUser.id}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id
        const targetUser = [...userStore.values()].find((u) => u.stripeCustomerId === customerId)
        if (targetUser) {
          userStore.set(targetUser.id, { ...targetUser, plan: null, subscriptionStatus: 'canceled', stripeSubscriptionId: undefined })
          console.log(`[stripe webhook] subscription canceled for userId=${targetUser.id}`)
        }
        break
      }

      default:
        // Unhandled event type — safe to ignore
        break
    }
  } catch (err) {
    console.error('[stripe webhook] handler error', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
