import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowRight, CheckCircle2, Shield, Clock, Star, Users, TrendingUp, Zap, Building2, BadgeCheck, Lock, Workflow } from 'lucide-react'

const STATS = [
  { value: '24hr', label: 'Average Response Time' },
  { value: '100%', label: 'Verified Contractors' },
  { value: '$0', label: 'Per-Lead Fees' },
  { value: '1:1', label: 'Exclusive Matching' },
]

const STEPS_HOMEOWNER = [
  { step: '01', title: 'Submit Your Project', body: 'Provide project details including scope, budget range, and preferred timeline. The submission process takes less than three minutes.' },
  { step: '02', title: 'Receive Your Match', body: 'Within 24 hours, one verified local contractor is assigned exclusively to your project. No bidding, no competition.' },
  { step: '03', title: 'Begin Work', body: 'Your assigned contractor contacts you directly to schedule the consultation and commence work on your terms.' },
]

const STEPS_CONTRACTOR = [
  { step: '01', title: 'Membership Enrollment', body: 'Select a subscription tier that aligns with your business objectives. One predictable monthly investment, no per-lead charges.' },
  { step: '02', title: 'Access Project Feed', body: 'Review comprehensive project details including scope, location, budget parameters, and urgency levels before committing.' },
  { step: '03', title: 'Claim Exclusive Leads', body: 'When you claim a project, it is immediately removed from all other contractors. Zero competition from that moment forward.' },
]

const FEATURES = [
  { icon: Lock, title: 'Exclusive Claim System', body: 'Each project is assigned to exactly one contractor. No bidding wars, no shared leads, no wasted time competing for the same client.' },
  { icon: Clock, title: '24-Hour Guarantee', body: 'Every project submission receives contractor contact within 24 hours. Reliable turnaround for homeowners, quality leads for contractors.' },
  { icon: Zap, title: 'Predictable Pricing', body: 'Flat monthly subscription rates. No per-lead fees, no surprise charges. Budget with confidence and maximize your ROI.' },
  { icon: BadgeCheck, title: 'Verified Professionals', body: 'Every contractor undergoes verification before accessing the project feed. Quality assurance for homeowners and credibility for contractors.' },
  { icon: Building2, title: 'Complete Project Details', body: 'Full transparency on every project: budget range, location, scope description, timeline, and urgency level. Make informed decisions.' },
  { icon: Workflow, title: 'Automated Workflows', body: 'Streamlined processes from submission to completion. Automated notifications, status tracking, and documentation management.' },
]

const BENEFITS = [
  { title: 'For Homeowners', items: ['Submit projects at no cost', 'Receive one dedicated contractor', 'No sales calls or bidding wars', 'Verified professionals only'] },
  { title: 'For Contractors', items: ['Predictable monthly investment', 'Exclusive lead ownership', 'Full project details upfront', 'No competition on claimed leads'] },
]

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/hero-bg.jpg" alt="Professional contractor services" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/90" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-36 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-full px-5 py-2 mb-10">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary/90">Now serving Topeka, KS — Regional expansion underway</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.05]">
              One contractor.<br />
              <span className="text-gradient">Exclusively yours.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-xl">
              The professional contractor marketplace connecting homeowners with verified local contractors. No bidding wars. No shared leads. One dedicated match per project.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/signup?role=homeowner" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-fg font-bold text-base rounded-xl hover:bg-primary/90 transition-colors">
                Submit Project — Free <ArrowRight size={18} />
              </Link>
              <Link href="/signup?role=contractor" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-foreground font-semibold text-base rounded-xl border border-border hover:border-muted transition-colors">
                Contractor Enrollment
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {['No cost for homeowners', 'Verified contractors', 'Exclusive matching'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span className="text-sm text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-card border-y border-border py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-2">{s.value}</div>
              <div className="text-sm text-muted font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works: Homeowners */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">For Homeowners</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
              Your project. One expert.<br /><span className="text-gradient">Delivered right.</span>
            </h2>
            <p className="text-lg text-muted max-w-lg leading-relaxed">Submit your project at no cost and receive a dedicated, verified contractor — no bidding, no back-and-forth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-px mb-12 bg-border rounded-2xl overflow-hidden">
            {STEPS_HOMEOWNER.map((item, idx) => (
              <div key={item.step} className={`relative p-12 bg-card ${idx === 0 ? 'rounded-l-2xl' : ''} ${idx === 2 ? 'rounded-r-2xl' : ''}`}>
                <div className="absolute top-6 right-8 text-7xl font-black text-border leading-none select-none">{item.step}</div>
                <div className="w-10 h-1 bg-primary rounded mb-7" />
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-base text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <Link href="/signup?role=homeowner" className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-fg font-bold rounded-xl hover:bg-primary/90 transition-colors">
            Submit Your Project — Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* How It Works: Contractors */}
      <section className="bg-card border-y border-border py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-3xl overflow-hidden">
              <Image src="/images/contractor-hero.jpg" alt="Professional contractor at work" width={640} height={520} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 bg-background/95 backdrop-blur border border-border rounded-2xl p-5 flex gap-4 items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-primary tracking-tight">3.2x</p>
                  <p className="text-xs text-muted">Average ROI vs. pay-per-lead platforms</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">For Contractors</p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-5 leading-tight">
                Stop paying<br /><span className="text-gradient">per lead.</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-12">
                One predictable monthly investment. Unlimited exclusive project claims. When you claim a project, it disappears from every other contractor permanently.
              </p>
              <div className="flex flex-col gap-6 mb-12">
                {STEPS_CONTRACTOR.map((item) => (
                  <div key={item.step} className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 border border-primary/40 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                View Membership Plans <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Platform Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Engineered differently from<br />traditional lead platforms.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-background p-12">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Comparison */}
      <section className="bg-card border-y border-border py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Value Proposition</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Built for both sides.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BENEFITS.map((section) => (
              <div key={section.title} className="bg-background rounded-2xl border border-border p-10">
                <h3 className="text-xl font-bold text-foreground mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-base text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-36 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-muted mb-12 leading-relaxed">
            Join the exclusive marketplace where every project receives exactly one dedicated contractor.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup?role=homeowner" className="inline-flex items-center gap-2 px-9 py-5 bg-primary text-primary-fg font-bold text-lg rounded-xl hover:bg-primary/90 transition-colors">
              Submit Project — Free <ArrowRight size={20} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-9 py-5 border border-border text-foreground font-semibold text-lg rounded-xl hover:border-muted transition-colors">
              View Contractor Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
