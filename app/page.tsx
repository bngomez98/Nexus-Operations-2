import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import {
  ArrowRight, CheckCircle2, Shield, Clock, Star,
  Users, TrendingUp, Zap, Lock, Bell, BarChart3, Award,
} from 'lucide-react'
import { ArrowRight, CheckCircle2, Shield, Clock, Star, Users, TrendingUp, Zap, Building2, BadgeCheck, Lock, Workflow } from 'lucide-react'

const STATS = [
  { value: '24hr', label: 'Average Response Time' },
  { value: '100%', label: 'Verified Contractors' },
  { value: '$0', label: 'Per-Lead Fees' },
  { value: '< 24hr', label: 'Average Match Time' },
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
  { icon: Lock,       title: 'Exclusive Claim Lock',      body: 'Once a contractor claims a project, it vanishes from every other feed permanently. No bidding wars, ever.' },
  { icon: Clock,      title: '< 24-Hour Response',        body: 'Every homeowner gets a contractor contact within 24 hours of submission, guaranteed.' },
  { icon: Zap,        title: 'Flat Monthly Pricing',      body: 'No per-lead fees. One flat rate — $299, $499, or $749/mo. Unlimited project claims.' },
  { icon: Shield,     title: 'Verified Contractors Only', body: 'Every contractor is license-verified before gaining access to the project feed.' },
  { icon: BarChart3,  title: 'Real Project Details',      body: 'Budget range, address, full description, and urgency — everything you need to decide fast.' },
  { icon: TrendingUp, title: 'Advance Windows',           body: 'Premium and Elite members get early access before Standard — minutes that make all the difference.' },
]

const TESTIMONIALS = [
  { name: 'Marcus D.', initials: 'MD', role: 'General Contractor — 12 yrs', body: 'Before Nexus, I was spending $800/month on lead sites and competing against 10 other contractors per job. Now I pay $299 and every lead I claim is mine.', rating: 5, color: '#4ade80' },
  { name: 'Jennifer T.', initials: 'JT', role: 'Topeka Homeowner', body: 'I submitted my project on a Thursday and had a contractor call me by Friday morning. He did great work and I never had to deal with a bidding war.', rating: 5, color: '#60a5fa' },
  { name: 'Rick S.', initials: 'RS', role: 'HVAC Specialist — 20 yrs', body: 'The Premium plan is worth every penny. That 90-second head start means I consistently get to the best jobs first. My close rate went through the roof.', rating: 5, color: '#f97316' },
]

const CATEGORIES = [
  'Tree Removal', 'Roofing', 'HVAC', 'Electrical', 'Plumbing',
  'Concrete Work', 'Fencing', 'Landscaping', 'Deck / Patio', 'Painting',
  'Flooring', 'Excavation', 'General Contracting',
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
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-bg.jpg"
            alt="Topeka neighborhood"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.82) 55%, rgba(8,8,8,0.92) 100%)' }} />
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
        </div>

        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '15%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '25%', width: '700px', height: '350px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '140px 24px 80px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'center' }}>

            {/* Left: copy */}
            <div style={{ maxWidth: '680px' }}>
              {/* Live badge */}
              <div
                className="animate-fade-up"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '100px', padding: '7px 18px', marginBottom: '32px' }}
              >
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0, animation: 'dot-pulse 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#4ade80', letterSpacing: '0.01em' }}>Now serving Topeka, KS — expanding soon</span>
              </div>

              <h1
                className="animate-fade-up delay-100"
                style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: '24px' }}
              >
                One contractor.<br />
                <span className="text-gradient">Exclusively yours.</span>
              </h1>

              <p
                className="animate-fade-up delay-200"
                style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: '#6b7280', lineHeight: 1.75, marginBottom: '44px', maxWidth: '520px' }}
              >
                The exclusive project marketplace for Topeka homeowners and verified contractors.
                No bidding wars. No shared leads. One match, one job.
              </p>

              <div className="animate-fade-up delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
                <Link
                  href="/signup?role=homeowner"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: '#080808', fontWeight: 800, fontSize: '15px',
                    borderRadius: '12px', textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    boxShadow: '0 4px 24px rgba(34,197,94,0.3)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(34,197,94,0.4)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 24px rgba(34,197,94,0.3)' }}
                >
                  Post a Project Free <ArrowRight size={16} />
                </Link>
                <Link
                  href="/signup?role=contractor"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '16px 32px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    color: '#ffffff', fontWeight: 600, fontSize: '15px',
                    borderRadius: '12px', textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    transition: 'background-color 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'rgba(255,255,255,0.07)'; el.style.borderColor = 'rgba(255,255,255,0.15)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'rgba(255,255,255,0.04)'; el.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  Join as Contractor
                </Link>
              </div>

              {/* Trust signals */}
              <div className="animate-fade-up delay-400" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {['Free for homeowners', 'Verified contractors only', 'Exclusive claim lock'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <CheckCircle2 size={14} color="#22c55e" />
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: floating live-feed cards (desktop only) */}
            <div className="animate-fade-up delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '240px', flexShrink: 0 }}>
              {/* Live feed card */}
              <div style={{
                background: 'rgba(13,13,13,0.88)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '20px',
                backdropFilter: 'blur(20px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', animation: 'dot-pulse 1.5s ease-in-out infinite' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live Feed</span>
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
                {[
                  { cat: 'Roofing', budget: '$12k–$20k', time: '2m ago' },
                  { cat: 'HVAC', budget: '$6k–$10k', time: '18m ago' },
                  { cat: 'Fencing', budget: '$3k–$6k', time: '41m ago' },
                ].map((item) => (
                  <div key={item.cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#d1d5db' }}>{item.cat}</p>
                      <p style={{ fontSize: '11px', color: '#22c55e', fontWeight: 700 }}>{item.budget}</p>
                    </div>
                    <span style={{ fontSize: '10px', color: '#374151' }}>{item.time}</span>
                  </div>
                ))}
              </div>
              {/* Revenue card */}
              <div style={{
                background: 'rgba(13,13,13,0.88)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '18px 20px',
                backdropFilter: 'blur(20px)',
                display: 'flex', gap: '12px', alignItems: 'center',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <TrendingUp size={18} color="#22c55e" />
                </div>
                <div>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: '#22c55e', letterSpacing: '-0.03em', lineHeight: 1 }}>3.2x</p>
                  <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '3px' }}>avg revenue vs. pay-per-lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid #141414', borderBottom: '1px solid #141414', padding: '52px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center', padding: '8px 24px',
              borderRight: i < STATS.length - 1 ? '1px solid #1a1a1a' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '8px' }}>
                <span className="text-gradient">{s.value}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>{s.label}</div>
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

      {/* ── CATEGORIES MARQUEE ── */}
      <div style={{ borderBottom: '1px solid #141414', padding: '18px 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(90deg, #080808, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(270deg, #080808, transparent)', zIndex: 2 }} />
        <div style={{ display: 'flex', gap: '10px', animation: 'marquee 30s linear infinite', width: 'max-content' }}>
          {[...CATEGORIES, ...CATEGORIES].map((cat, i) => (
            <span key={i} style={{ padding: '5px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, color: '#374151', backgroundColor: '#0d0d0d', border: '1px solid #1a1a1a', whiteSpace: 'nowrap' }}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS: HOMEOWNERS ── */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <p className="section-label">For Homeowners</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '16px', lineHeight: 1.05 }}>
              Your project. One expert.{' '}
              <span className="text-gradient">Done right.</span>
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '500px', lineHeight: 1.7 }}>
              Submit your project for free and get matched with one verified local contractor — no bidding, no back-and-forth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', marginBottom: '52px' }}>
            {STEPS_HOMEOWNER.map((item, idx) => (
              <div
                key={item.step}
                style={{
                  padding: '48px 40px', backgroundColor: '#0d0d0d',
                  border: '1px solid #1a1a1a',
                  borderRadius: idx === 0 ? '20px 0 0 20px' : idx === STEPS_HOMEOWNER.length - 1 ? '0 20px 20px 0' : '0',
                  position: 'relative', overflow: 'hidden',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#101010' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0d0d0d' }}
              >
                <div style={{ position: 'absolute', top: '12px', right: '20px', fontSize: '88px', fontWeight: 900, color: '#131313', lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em' }}>{item.step}</div>
                <div style={{ width: '36px', height: '3px', background: 'linear-gradient(90deg, #22c55e, #4ade80)', borderRadius: '2px', marginBottom: '28px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>{item.body}</p>
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

          <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#080808', fontWeight: 700, fontSize: '15px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(34,197,94,0.2)' }}>
            Post Your Project Free <ArrowRight size={15} />
          <Link href="/signup?role=homeowner" className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-fg font-bold rounded-xl hover:bg-primary/90 transition-colors">
            Submit Your Project — Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS: CONTRACTORS ── */}
      <section style={{ backgroundColor: '#060606', borderTop: '1px solid #111111', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
            {/* Image side */}
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="/images/contractor-hero.jpg" alt="Professional contractor" width={640} height={520} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,6,0.75) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: '28px', left: '28px', backgroundColor: 'rgba(10,10,10,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'center', backdropFilter: 'blur(12px)' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(34,197,94,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={18} color="#22c55e" />
                </div>
                <div>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: '#22c55e', letterSpacing: '-0.03em', lineHeight: 1 }}>3.2x</p>
                  <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '3px' }}>avg revenue vs. pay-per-lead</p>
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
              <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '100px', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '7px', backdropFilter: 'blur(8px)' }}>
                <CheckCircle2 size={12} color="#22c55e" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#4ade80' }}>Exclusive</span>
              </div>
            </div>

            <div>
              <p className="section-label">For Contractors</p>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '20px', lineHeight: 1.05 }}>
                Stop paying <span className="text-gradient">per lead.</span>
              </h2>
              <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.75, marginBottom: '44px' }}>
                One flat monthly rate. Unlimited exclusive project claims. When you claim a job, it disappears from every other contractor&apos;s feed — permanently.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '44px' }}>
                {STEPS_CONTRACTOR.map((item) => (
                  <div key={item.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#22c55e' }}>{item.step}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>{item.body}</p>
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
              <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontWeight: 600, fontSize: '15px', borderRadius: '12px', textDecoration: 'none' }}>
                View Contractor Plans <ArrowRight size={15} />
              <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-4 border border-primary/40 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                View Membership Plans <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p className="section-label">Why Nexus</p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#ffffff', lineHeight: 1.05 }}>
              Built different from every<br />other lead platform.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '20px', padding: '40px 36px',
                  gridColumn: (i === 0 || i === 3) ? 'span 2' : 'span 1',
                  transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s', cursor: 'default',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(34,197,94,0.2)'; el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4)'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#1a1a1a'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(34,197,94,0.08)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(34,197,94,0.1)' }}>
                  <Icon size={22} color="#22c55e" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.015em' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8 }}>{body}</p>
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

      {/* ── TESTIMONIALS ── */}
      <section style={{ backgroundColor: '#060606', borderTop: '1px solid #111111', borderBottom: '1px solid #111111', padding: '120px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="section-label">Testimonials</p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#ffffff', lineHeight: 1.05 }}>
              Trusted by Topeka&apos;s best.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{ backgroundColor: '#0d0d0d', borderRadius: '20px', border: '1px solid #1a1a1a', padding: '36px 32px', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#2a2a2a'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)' }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#1a1a1a'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} color="#22c55e" fill="#22c55e" />)}
                </div>
                <p style={{ fontSize: '15px', color: '#c9d1d9', lineHeight: 1.85, marginBottom: '28px', flex: 1 }}>&ldquo;{t.body}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${t.color}18`, border: `1px solid ${t.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: t.color }}>{t.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '1px' }}>{t.role}</p>
                  </div>
                </div>
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

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '140px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '18px', marginBottom: '28px', boxShadow: '0 0 40px rgba(34,197,94,0.1)' }}>
            <Zap size={30} color="#22c55e" />
          </div>
          <h2 style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: '20px', lineHeight: 1.0 }}>
            Ready to work smarter?
          </h2>
          <p style={{ fontSize: '19px', color: '#6b7280', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 48px' }}>
            Join the exclusive marketplace where every project goes to exactly one contractor. Zero competition. Real jobs. Flat rate.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/signup?role=homeowner" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 36px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#080808', fontWeight: 800, fontSize: '16px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 4px 24px rgba(34,197,94,0.3)', letterSpacing: '-0.01em' }}>
              Post a Project — Free <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 36px', border: '1px solid #1e1e1e', color: '#9ca3af', fontWeight: 600, fontSize: '16px', borderRadius: '14px', textDecoration: 'none' }}>
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
          <p style={{ fontSize: '13px', color: '#374151', marginTop: '28px' }}>
            Free for homeowners · No credit card needed · Cancel contractor plans anytime
          </p>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          .hero-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}
