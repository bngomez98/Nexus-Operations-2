import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowRight, MapPin, Shield, Users, TrendingUp } from 'lucide-react'

export const metadata: Metadata = { title: 'About' }

const VALUES = [
  { icon: Shield, title: 'Exclusivity First', body: 'Every project claim is permanent and exclusive. We built our core promise into the product itself — not a policy that can be bent.' },
  { icon: Users, title: 'Local by Design', body: 'Nexus Operations is not a national aggregator. We are built for Topeka, KS. Every feature, every pricing decision, every conversation is grounded in this local market.' },
  { icon: TrendingUp, title: 'Built for Professionals', body: "Contractors are the engine of this platform. We don't charge per lead because we respect your livelihood. A flat monthly rate is the only honest model." },
]

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '160px 24px 80px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <MapPin size={14} color="#22c55e" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Topeka, KS</span>
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.035em', color: '#ffffff', lineHeight: 1.05, marginBottom: '24px' }}>
              Built to fix a<br />
              <span className="text-gradient">broken system.</span>
            </h1>
            <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.8, marginBottom: '24px' }}>
              Local contractors in Topeka were spending hundreds — sometimes thousands — of dollars every month on lead platforms that sent the same lead to five, ten, or fifteen other contractors. They were paying to compete, not paying to win.
            </p>
            <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.8 }}>
              Nexus Operations was built to change that. One project. One contractor. No competition from the moment of claim.
            </p>
          </div>
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
            <Image src="/images/team-work.jpg" alt="Nexus Operations team" width={640} height={520} style={{ width: '100%', height: 'auto', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 60%)' }} />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: '#070707', borderTop: '1px solid #111111', borderBottom: '1px solid #111111', padding: '100px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>Our Mission</p>
          <blockquote style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.5, letterSpacing: '-0.02em' }}>
            &ldquo;Every home improvement project deserves one dedicated expert — and every skilled contractor deserves a fair shot without competing on price before they even walk in the door.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>What We Stand For</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Our principles are in the product.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} style={{ backgroundColor: '#0e0e0e', borderRadius: '20px', border: '1px solid #1a1a1a', padding: '40px 32px' }}>
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

      {/* Service area */}
      <section style={{ backgroundColor: '#070707', borderTop: '1px solid #111111', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>Service Area</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '16px', lineHeight: 1.1 }}>
              Topeka, KS &amp;<br />surrounding area.
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.75, marginBottom: '16px' }}>
              We currently serve Topeka and Shawnee County. We are deliberately starting local to build the right relationships before scaling. Expansion to Lawrence, Manhattan, and Wichita is planned.
            </p>
            <p style={{ fontSize: '14px', color: '#4b5563' }}>Interested in your city? Reach us at <span style={{ color: '#22c55e' }}>hello@nexusoperations.org</span></p>
          </div>
          <div style={{ backgroundColor: '#0e0e0e', borderRadius: '20px', border: '1px solid #1a1a1a', padding: '44px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { city: 'Topeka, KS', status: 'Live', color: '#22c55e' },
              { city: 'Lawrence, KS', status: 'Coming soon', color: '#6b7280' },
              { city: 'Manhattan, KS', status: 'Coming soon', color: '#6b7280' },
              { city: 'Wichita, KS', status: 'Planned', color: '#374151' },
            ].map((item) => (
              <div key={item.city} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#141414', borderRadius: '12px', border: '1px solid #1a1a1a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={15} color={item.color} />
                  <span style={{ fontSize: '15px', fontWeight: 600, color: item.color === '#22c55e' ? '#ffffff' : '#4b5563' }}>{item.city}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: item.color }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
          Join the movement.
        </h2>
        <p style={{ fontSize: '17px', color: '#6b7280', marginBottom: '40px' }}>Whether you&apos;re a homeowner or a contractor, Nexus Operations is built for you.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 30px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none' }}>
            Post a Project <ArrowRight size={17} />
          </Link>
          <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 30px', border: '1px solid #2d2d2d', color: '#ffffff', fontWeight: 600, fontSize: '15px', borderRadius: '12px', textDecoration: 'none' }}>
            Contractor Plans
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
