import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { ArrowRight, CheckCircle, Building2, Home } from 'lucide-react'

export default async function Home() {
  const session = await getSession()

  return (
    <main className="w-full bg-gradient-to-b from-background to-muted">
      {/* Header Navigation */}
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Nexus Ops</span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href={`/dashboard/${session.user.role}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-opacity-90 transition-all">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance">
            Connect With Verified Contractors
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Topeka's leading project marketplace. Homeowners post once, contractors claim projects with zero competition.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-8">
            <Link href="/signup?role=homeowner" className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              <Home className="w-5 h-5" />
              Submit a Project
            </Link>
            <Link href="/signup?role=contractor" className="flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              <Building2 className="w-5 h-5" />
              Find Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'For Homeowners', icon: Home, items: ['Free to use', 'Verified contractors', 'Instant quotes'] },
              { title: 'For Contractors', icon: Building2, items: ['Unlimited claims', 'Qualified leads', 'Zero competition'] },
              { title: 'Both', icon: CheckCircle, items: ['Fast response', 'Secure process', 'Local focus'] },
            ].map((section, idx) => {
              const Icon = section.icon
              return (
                <div key={idx} className="p-6 rounded-lg border border-border hover:border-primary transition-colors">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Membership Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Standard', price: '$299', features: ['Full project feed', 'First-come first-served', 'Unlimited claims'] },
              { name: 'Premium', price: '$499', features: ['Full project feed', '90-sec advance notice', 'Unlimited claims'] },
              { name: 'Elite', price: '$749', features: ['Full project feed', '10-min exclusive window', '+$5K projects'] },
            ].map((tier, idx) => (
              <div key={idx} className={`p-8 rounded-lg border transition-all ${idx === 1 ? 'border-primary bg-background scale-105' : 'border-border bg-background'}`}>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold text-primary mb-6">{tier.price}<span className="text-lg text-muted-foreground">/mo</span></p>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Nexus Ops</h4>
              <p className="text-sm text-muted-foreground">Topeka's premier contractor marketplace.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:support@nexusops.com" className="hover:text-foreground transition-colors">Email</a></li>
                <li><a href="tel:+17854551234" className="hover:text-foreground transition-colors">Phone</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Nexus Operations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
