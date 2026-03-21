import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = { title: 'How It Works' }

const HOMEOWNER_STEPS = [
  {
    step: '01',
    title: 'Submit Your Project — Free',
    body: 'Tell us about your home project. Category, description, budget range, address, and urgency. The entire process takes less than 3 minutes and costs you nothing.',
    detail: ['No credit card required', 'Works on any device', 'Takes under 3 minutes'],
  },
  {
    step: '02',
    title: 'One Verified Contractor Claims It',
    body: 'Licensed and verified local contractors browse the live feed. When one claims your project, they get exclusive access — no one else can see or contact you about that job.',
    detail: ['All contractors are license-verified', 'Exclusive claim — no competition', 'You are notified immediately'],
  },
  {
    step: '03',
    title: 'They Reach Out Directly',
    body: 'Your contractor contacts you within 24 hours to schedule a walkthrough, provide a quote, and begin the work. No middleman, no auction, no waiting for 5 callbacks.',
    detail: ['Direct contractor contact', '24-hour response guarantee', 'No bidding wars'],
  },
]

const CONTRACTOR_STEPS = [
  {
    step: '01',
    title: 'Apply and Get Verified',
    body: 'Submit your contractor application with proof of valid Kansas licensing. Our team reviews and approves your account — typically within 24 hours.',
    detail: ['Valid KS license required', 'Fast approval process', 'One-time verification'],
  },
  {
    step: '02',
    title: 'Choose a Membership Plan',
    body: 'Select the plan that fits your volume goals. Standard, Premium, or Elite — all include unlimited project claims and no per-lead fees. Ever.',
    detail: ['Flat monthly rate', 'Unlimited claims', 'Cancel anytime'],
  },
  {
    step: '03',
    title: 'Browse and Claim Exclusively',
    body: 'The live feed shows every open project — full details, address, budget range, and urgency. When you claim a project, it disappears from the feed instantly.',
    detail: ['Full project details visible', 'Instant exclusive lock', 'No shared leads'],
  },
  {
    step: '04',
    title: 'Contact the Homeowner Directly',
    body: 'You receive the homeowner\'s contact info upon claiming. Reach out, schedule a visit, close the job — 100% of the revenue is yours.',
    detail: ['Direct homeowner contact', 'No commission on jobs', '100% of revenue yours'],
  },
]

export default function HowItWorksPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '160px 24px 100px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>How It Works</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 800, letterSpacing: '-0.035em', color: '#ffffff', lineHeight: 1.05, marginBottom: '20px' }}>
            Simple for homeowners.<br />
            <span className="text-gradient">Powerful for contractors.</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Nexus Operations removes the friction from finding and booking local home improvement contractors.
          </p>
        </div>
      </section>

      {/* Homeowners section */}
      <section style={{ padding: '60px 24px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="/images/homeowner-hero.jpg" alt="Modern home exterior" width={640} height={480} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 55%)' }} />
            </div>
            <div>
              <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px', border: '1px solid rgba(34,197,94,0.15)' }}>For Homeowners</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '16px', lineHeight: 1.1 }}>
                Post your project.<br />Get matched. Done.
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.7, marginBottom: '36px' }}>No account fees, no bidding rounds, no chasing contractors. You submit once and one verified local professional claims it.</p>
              <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', borderRadius: '10px', textDecoration: 'none' }}>
                Post a Project — Free <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {HOMEOWNER_STEPS.map((item, idx) => (
              <div key={item.step} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '32px', alignItems: 'center', padding: '40px 32px', backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: idx === 0 ? '20px 20px 0 0' : idx === HOMEOWNER_STEPS.length - 1 ? '0 0 20px 20px' : '0' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '42px', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.05em', lineHeight: 1 }}>{item.step}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>{item.body}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.detail.map((d) => (
                    <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '7px', whiteSpace: 'nowrap' }}>
                      <CheckCircle2 size={13} color="#22c55e" />
                      <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: 500 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #111111', borderBottom: '1px solid #111111', backgroundColor: '#070707', padding: '28px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1a1a1a' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#4b5563', letterSpacing: '0.1em', textTransform: 'uppercase' }}>For Contractors</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1a1a1a' }} />
        </div>
      </div>

      {/* Contractors section */}
      <section style={{ backgroundColor: '#070707', padding: '80px 24px 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '60px' }}>
            <div>
              <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px', border: '1px solid rgba(34,197,94,0.15)' }}>For Contractors</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '16px', lineHeight: 1.1 }}>
                Stop competing.<br />Start closing.
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.7, marginBottom: '36px' }}>One flat monthly rate. The moment you claim a project it is exclusively yours — permanently removed from every other contractor&apos;s feed.</p>
              <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontWeight: 600, fontSize: '15px', borderRadius: '10px', textDecoration: 'none' }}>
                View Pricing <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="/images/contractor-hero.jpg" alt="Contractor at work" width={640} height={480} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,7,0.6) 0%, transparent 55%)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px' }}>
            {CONTRACTOR_STEPS.map((item, idx) => (
              <div key={item.step} style={{ padding: '36px 28px', backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: idx === 0 ? '20px 0 0 20px' : idx === CONTRACTOR_STEPS.length - 1 ? '0 20px 20px 0' : '0', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '56px', fontWeight: 900, color: '#111111', lineHeight: 1, userSelect: 'none' }}>{item.step}</div>
                <div style={{ width: '32px', height: '3px', backgroundColor: '#22c55e', borderRadius: '2px', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize: '17px', color: '#6b7280', marginBottom: '44px' }}>Join Topeka&apos;s exclusive contractor marketplace.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '16px', borderRadius: '12px', textDecoration: 'none' }}>
            Post a Project Free <ArrowRight size={18} />
          </Link>
          <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', border: '1px solid #2d2d2d', color: '#ffffff', fontWeight: 600, fontSize: '16px', borderRadius: '12px', textDecoration: 'none' }}>
            Contractor Plans
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
