import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { ArrowRight, CheckCircle2, Building2, HardHat, HomeIcon, Shield, Zap, Users } from 'lucide-react'

const PLANS = [
  {
    name: 'Standard',
    price: '$299',
    highlight: false,
    features: ['Full project feed', 'Unlimited claims', 'First-come first-served', 'Email support'],
  },
  {
    name: 'Premium',
    price: '$499',
    highlight: true,
    features: ['Full project feed', 'Unlimited claims', '90-sec advance window', 'Priority support'],
  },
  {
    name: 'Elite',
    price: '$749',
    highlight: false,
    features: ['Full project feed', 'Unlimited claims', '10-min exclusive on $5K+ jobs', 'Dedicated support'],
  },
]

const HOW_IT_WORKS = [
  { icon: HomeIcon, title: 'Homeowner Posts', body: 'Submit your project in minutes — free, always. Include scope, photos, and budget.' },
  { icon: Zap, title: 'Contractors Notified', body: 'Verified local contractors see the project appear in their live feed instantly.' },
  { icon: HardHat, title: 'One Contractor Claims', body: 'The first contractor to claim wins — no bidding wars, no competition after that.' },
]

export default async function Home() {
  const session = await getSession()

  return (
    <div style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }} className="min-h-screen">

      {/* Nav */}
      <header style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} className="sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-7 h-7" style={{ color: 'var(--color-primary)' }} />
            <span className="text-xl font-bold" style={{ color: 'var(--color-foreground)' }}>Nexus Ops</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/pricing" className="text-sm font-medium hidden sm:block" style={{ color: 'var(--color-muted-foreground)' }}>
              Pricing
            </Link>
            {session ? (
              <Link
                href={`/dashboard/${session.user.role}`}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ color: 'var(--color-foreground)', border: '1px solid var(--color-border)' }}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-2"
            style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            Now live in Topeka, KS
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-balance" style={{ color: 'var(--color-foreground)' }}>
            The Contractor Marketplace <span style={{ color: 'var(--color-primary)' }}>Built for Topeka</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-pretty max-w-2xl mx-auto" style={{ color: 'var(--color-muted-foreground)' }}>
            Homeowners post projects for free. Verified contractors claim them exclusively — no bidding, no competition, no per-lead fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/signup?role=homeowner"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
            >
              <HomeIcon className="w-4 h-4" />
              Post a Free Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signup?role=contractor"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm"
              style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-secondary-foreground)' }}
            >
              <HardHat className="w-4 h-4" />
              Find Projects
            </Link>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
            Free for homeowners forever. Contractors from $299/mo — cancel anytime.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-balance" style={{ color: 'var(--color-foreground)' }}>
              How It Works
            </h2>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              Simple process. Zero hassle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 p-6 rounded-xl"
                  style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: 'var(--color-muted-foreground)' }}
                    >
                      Step {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold mt-1" style={{ color: 'var(--color-foreground)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-balance" style={{ color: 'var(--color-foreground)' }}>
                Why contractors choose Nexus Ops
              </h2>
              {[
                { icon: Shield, title: 'Exclusive Claims', body: 'Once you claim a project it disappears from all other contractors\' feeds. Zero competition.' },
                { icon: Zap, title: 'No Per-Lead Fees', body: 'Flat monthly membership. Claim 1 or 100 projects — your cost never changes.' },
                { icon: Users, title: 'Qualified Homeowners', body: 'Every project includes a budget, scope, and contact info. No tire kickers.' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--color-muted)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{item.title}</h3>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{item.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className="rounded-2xl p-8 space-y-4"
              style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-muted-foreground)' }}>
                For Homeowners
              </p>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
                Always free. Always fast.
              </h3>
              <ul className="space-y-3">
                {['Post unlimited projects', 'Receive contractor responses within 24 hours', 'No spam, no cold calls', 'Verified local contractors only'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-foreground)' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?role=homeowner"
                className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-xl font-semibold text-sm"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
              >
                Post Your First Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-balance" style={{ color: 'var(--color-foreground)' }}>
              Membership Tiers
            </h2>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              Flat monthly pricing. Cancel anytime. No per-lead fees — ever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col rounded-2xl p-6"
                style={{
                  backgroundColor: plan.highlight ? 'var(--color-primary)' : 'var(--color-card)',
                  border: plan.highlight ? 'none' : '1px solid var(--color-border)',
                  transform: plan.highlight ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: plan.highlight ? 'rgba(255,255,255,0.8)' : 'var(--color-muted-foreground)' }}
                >
                  {plan.name}
                </p>
                <p
                  className="text-4xl font-bold mt-2"
                  style={{ color: plan.highlight ? '#fff' : 'var(--color-foreground)' }}
                >
                  {plan.price}
                  <span
                    className="text-base font-normal"
                    style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--color-muted-foreground)' }}
                  >
                    /mo
                  </span>
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: plan.highlight ? 'rgba(255,255,255,0.9)' : 'var(--color-foreground)' }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0"
                        style={{ color: plan.highlight ? '#fff' : 'var(--color-secondary)' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup?role=contractor"
                  className="mt-8 py-3 rounded-xl font-semibold text-sm text-center"
                  style={{
                    backgroundColor: plan.highlight ? '#fff' : 'var(--color-primary)',
                    color: plan.highlight ? 'var(--color-primary)' : 'var(--color-primary-foreground)',
                  }}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                <span className="font-bold" style={{ color: 'var(--color-foreground)' }}>Nexus Ops</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Topeka's premier contractor marketplace.
              </p>
            </div>
            {[
              { heading: 'Product', links: [{ href: '/pricing', label: 'Pricing' }, { href: '/signup?role=homeowner', label: 'For Homeowners' }, { href: '/signup?role=contractor', label: 'For Contractors' }] },
              { heading: 'Legal', links: [{ href: '/terms', label: 'Terms of Service' }, { href: '/privacy', label: 'Privacy Policy' }] },
              { heading: 'Support', links: [{ href: 'mailto:support@nexusops.com', label: 'Email Support' }, { href: '/login', label: 'Sign In' }] },
            ].map(col => (
              <div key={col.heading}>
                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-foreground)' }}>{col.heading}</p>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)' }} className="pt-6 text-center text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
            &copy; {new Date().getFullYear()} Nexus Operations. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
