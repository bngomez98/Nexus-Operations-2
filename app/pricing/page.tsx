export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-foreground">Nexus Ops</a>
          <a href="/login" className="text-sm font-medium text-foreground hover:text-primary">Login</a>
        </nav>
      </header>

      {/* Pricing Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Membership Pricing</h1>
          <p className="text-lg text-muted-foreground">Simple, transparent pricing for contractors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Standard',
              price: '$299',
              features: [
                'Full project feed',
                'First-come first-served',
                'Unlimited project claims',
                'Performance dashboard',
              ],
            },
            {
              name: 'Premium',
              price: '$499',
              features: [
                'Full project feed',
                '90-second advance notification window',
                'Unlimited project claims',
                'Performance dashboard',
                'Priority support',
              ],
              highlight: true,
            },
            {
              name: 'Elite',
              price: '$749',
              features: [
                'Full project feed',
                '10-minute exclusive window on $5K+ projects',
                'Unlimited project claims',
                'Performance dashboard',
                'Priority support',
                'Dedicated account manager',
              ],
            },
          ].map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg p-8 ${
                tier.highlight
                  ? 'bg-primary text-primary-foreground border-2 border-primary scale-105'
                  : 'bg-muted border border-border'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${tier.highlight ? '' : 'text-foreground'}`}>{tier.name}</h3>
              <p className={`text-4xl font-bold mb-6 ${tier.highlight ? '' : 'text-foreground'}`}>
                {tier.price}<span className={`text-lg ${tier.highlight ? 'text-primary-foreground' : 'text-muted-foreground'}`}>/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-2 ${tier.highlight ? '' : 'text-foreground'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                tier.highlight
                  ? 'bg-primary-foreground text-primary hover:opacity-90'
                  : 'bg-primary text-primary-foreground hover:bg-opacity-90'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-muted rounded-lg border border-border text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">All plans include:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <li>✓ Full project documentation before claiming</li>
            <li>✓ No per-lead fees</li>
            <li>✓ Cancel anytime, no contracts</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Nexus Operations. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
