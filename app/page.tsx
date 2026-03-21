import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowRight, CheckCircle2, Shield, Clock, Star, Users, TrendingUp, Zap } from 'lucide-react'

const STATS = [
  { value: '340+', label: 'Projects Claimed' },
  { value: '98%', label: 'Contractor Satisfaction' },
  { value: '$0', label: 'Per-Lead Fees' },
  { value: '24hr', label: 'Average Match Time' },
]

const STEPS_HOMEOWNER = [
  { step: '01', title: 'Describe Your Project', body: 'Tell us what you need — category, scope, budget range, and timeline. Takes less than 3 minutes.' },
  { step: '02', title: 'Get Matched Fast', body: 'Within 24 hours, one verified local contractor claims your project exclusively.' },
  { step: '03', title: 'Work Begins', body: 'Your contractor reaches out directly. No bids, no middleman, no waiting on 5 different companies.' },
]

const STEPS_CONTRACTOR = [
  { step: '01', title: 'Join with a Membership', body: 'Choose a plan that fits your business. Flat monthly rate — no per-lead charges, ever.' },
  { step: '02', title: 'Browse Exclusive Projects', body: 'See real project details: scope, address, budget range, and urgency — everything you need.' },
  { step: '03', title: 'Claim It — Own It', body: "When you claim a project, it's removed from the feed. Zero competition from that point forward." },
]

const FEATURES = [
  { icon: Shield, title: 'Exclusive Claim Lock', body: 'Once a contractor claims a project, it vanishes from the feed. No bidding wars, ever.' },
  { icon: Clock, title: '24-Hour Response', body: 'Every homeowner gets a contractor contact within 24 hours of submission, guaranteed.' },
  { icon: Zap, title: 'Flat Monthly Pricing', body: 'No per-lead fees. One flat rate — $299, $499, or $749/mo. Unlimited project claims.' },
  { icon: Users, title: 'Verified Contractors Only', body: 'Every contractor is license-verified before gaining access to the project feed.' },
  { icon: Star, title: 'Real Project Details', body: 'Budget range, address, full description, and urgency — everything you need to decide fast.' },
  { icon: TrendingUp, title: 'Advance Windows', body: 'Premium and Elite members get early access before Standard — minutes that make all the difference.' },
]

const TESTIMONIALS = [
  { name: 'Marcus D.', role: 'General Contractor — 12 yrs', body: 'Before Nexus, I was spending $800/month on lead sites and competing against 10 other contractors per job. Now I pay $299 and every lead I claim is mine.', rating: 5 },
  { name: 'Jennifer T.', role: 'Topeka Homeowner', body: 'I submitted my project on a Thursday and had a contractor call me by Friday morning. He did great work and I never had to deal with a bidding war.', rating: 5 },
  { name: 'Rick S.', role: 'HVAC Specialist — 20 yrs', body: 'The Premium plan is worth every penny. That 90-second head start means I consistently get to the best jobs first. My close rate went through the roof.', rating: 5 },
]

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image src="/images/hero-bg.jpg" alt="Topeka neighborhood" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,0.88) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '-300px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '140px 24px 80px', width: '100%' }}>
          <div style={{ maxWidth: '740px' }}>
            {/* Live badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '100px', padding: '7px 18px', marginBottom: '36px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#4ade80', letterSpacing: '0.01em' }}>Now serving Topeka, KS — expanding soon</span>
            </div>

            <h1 style={{ fontSize: 'clamp(44px, 7.5vw, 84px)', fontWeight: 800, lineHeight: 1.03, letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '24px' }}>
              One contractor.<br />
              <span className="text-gradient">Exclusively yours.</span>
            </h1>

            <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: '#9ca3af', lineHeight: 1.7, marginBottom: '48px', maxWidth: '540px' }}>
              Nexus Operations is the exclusive project marketplace for Topeka homeowners and verified contractors. No bidding wars. No shared leads. One match, one job.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '56px' }}>
              <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '16px', borderRadius: '12px', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'background-color 0.2s' }}>
                Post a Project Free <ArrowRight size={18} />
              </Link>
              <Link href="/signup?role=contractor" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', backgroundColor: 'transparent', color: '#ffffff', fontWeight: 600, fontSize: '16px', borderRadius: '12px', textDecoration: 'none', border: '1px solid #2d2d2d', transition: 'border-color 0.2s' }}>
                Join as Contractor
              </Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              {['Free for homeowners', 'Verified contractors only', 'Exclusive claim lock'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#22c55e" />
                  <span style={{ fontSize: '14px', color: '#9ca3af' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ backgroundColor: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '52px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#22c55e', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS: HOMEOWNERS ── */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>For Homeowners</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '16px', lineHeight: 1.1 }}>
              Your project. One expert.<br /><span className="text-gradient">Done right.</span>
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '500px', lineHeight: 1.65 }}>Submit your project for free and get matched with one verified local contractor — no bidding, no back-and-forth.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', marginBottom: '48px' }}>
            {STEPS_HOMEOWNER.map((item, idx) => (
              <div key={item.step} style={{ padding: '48px 40px', backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: idx === 0 ? '20px 0 0 20px' : idx === 2 ? '0 20px 20px 0' : '0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '80px', fontWeight: 900, color: '#141414', lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em' }}>{item.step}</div>
                <div style={{ width: '40px', height: '3px', backgroundColor: '#22c55e', borderRadius: '2px', marginBottom: '28px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.02em' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', borderRadius: '10px', textDecoration: 'none' }}>
            Post Your Project Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS: CONTRACTORS ── */}
      <section style={{ backgroundColor: '#070707', borderTop: '1px solid #111111', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Image side */}
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="/images/contractor-hero.jpg" alt="Professional contractor" width={640} height={520} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,7,0.7) 0%, transparent 55%)' }} />
              {/* Floating stat */}
              <div style={{ position: 'absolute', bottom: '28px', left: '28px', backgroundColor: '#111111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '18px 22px', display: 'flex', gap: '14px', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: '42px', height: '42px', backgroundColor: 'rgba(34,197,94,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={20} color="#22c55e" />
                </div>
                <div>
                  <p style={{ fontSize: '22px', fontWeight: 800, color: '#22c55e', letterSpacing: '-0.03em', lineHeight: 1 }}>3.2x</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '3px' }}>avg revenue vs. pay-per-lead</p>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>For Contractors</p>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '20px', lineHeight: 1.1 }}>
                Stop paying<br /><span className="text-gradient">per lead.</span>
              </h2>
              <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.7, marginBottom: '44px' }}>
                One flat monthly rate. Unlimited exclusive project claims. When you claim a job, it disappears from every other contractor&apos;s feed — permanently.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '44px' }}>
                {STEPS_CONTRACTOR.map((item) => (
                  <div key={item.step} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e' }}>{item.step}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.65 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', fontWeight: 600, fontSize: '15px', borderRadius: '10px', textDecoration: 'none' }}>
                View Contractor Plans <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>Why Nexus</p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.1 }}>
              Built different from every<br />other lead platform.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', backgroundColor: '#141414', borderRadius: '24px', overflow: 'hidden', border: '1px solid #141414' }}>
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} style={{ backgroundColor: '#0a0a0a', padding: '48px 40px' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(34,197,94,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Icon size={22} color="#22c55e" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ backgroundColor: '#070707', borderTop: '1px solid #111111', borderBottom: '1px solid #111111', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>Testimonials</p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>Trusted by Topeka&apos;s best.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ backgroundColor: '#0e0e0e', borderRadius: '20px', border: '1px solid #1a1a1a', padding: '36px 32px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={15} color="#22c55e" fill="#22c55e" />)}
                </div>
                <p style={{ fontSize: '15px', color: '#c9d1d9', lineHeight: 1.8, marginBottom: '24px' }}>&ldquo;{t.body}&rdquo;</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{t.name}</p>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '140px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 800, letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '20px', lineHeight: 1.05 }}>
            Ready to work smarter?
          </h2>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '48px', lineHeight: 1.65 }}>
            Join the exclusive marketplace where every project goes to exactly one contractor.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 36px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '16px', borderRadius: '12px', textDecoration: 'none' }}>
              Post a Project — Free <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 36px', border: '1px solid #2d2d2d', color: '#ffffff', fontWeight: 600, fontSize: '16px', borderRadius: '12px', textDecoration: 'none' }}>
              View Contractor Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
