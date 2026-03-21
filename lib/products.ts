export interface Plan {
  id: 'standard' | 'premium' | 'elite'
  name: string
  priceInCents: number
  interval: 'month'
  description: string
  features: string[]
  highlight?: boolean
  badge?: string
  advanceWindow?: string
}

export const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    priceInCents: 29900,
    interval: 'month',
    description: 'Full access to all open projects. Unlimited claims.',
    features: [
      'Full project feed access',
      'Unlimited project claims',
      'Exclusive claim lock',
      'Project history & tracking',
      'Email notifications',
      'Cancel anytime',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    priceInCents: 49900,
    interval: 'month',
    description: 'Everything in Standard plus a 90-second advance window on new projects.',
    highlight: true,
    badge: 'Most Popular',
    advanceWindow: '90 seconds',
    features: [
      'Everything in Standard',
      '90-second advance window',
      'Priority project alerts',
      'SMS + email notifications',
      'Claim analytics dashboard',
      'Dedicated support line',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    priceInCents: 74900,
    interval: 'month',
    description: 'Maximum advantage — 10-minute exclusive window on high-value projects over $5K.',
    badge: 'Best ROI',
    advanceWindow: '10 minutes on $5K+ projects',
    features: [
      'Everything in Premium',
      '10-min exclusive on $5K+ projects',
      'First-look on all new projects',
      'White-glove onboarding',
      'Monthly performance review',
      'Dedicated account manager',
    ],
  },
]

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}
