import Link from 'next/link'
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react'

export default function SubscribeSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        {/* Icon */}
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', border: '1px solid rgba(34,197,94,0.2)' }}>
          <CheckCircle2 size={40} color="#22c55e" />
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
          You&apos;re in.
        </h1>
        <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.7, marginBottom: '12px' }}>
          Your membership is now active. Head to your dashboard to start claiming exclusive projects.
        </p>
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '40px' }}>
          A confirmation email has been sent to you from Stripe. Cancel anytime from your dashboard.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <Link
            href="/dashboard/contractor"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 36px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '16px', borderRadius: '12px', textDecoration: 'none' }}
          >
            Start Claiming Projects <ArrowRight size={18} />
          </Link>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#4b5563', textDecoration: 'none' }}>
            <Zap size={13} /> Return to Nexus Ops home
          </Link>
        </div>
      </div>
    </div>
  )
}
