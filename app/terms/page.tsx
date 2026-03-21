import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = { title: 'Terms of Service' }

const SECTIONS = [
  { title: '1. Acceptance of Terms', body: 'By accessing and using Nexus Operations, you accept and agree to be bound by these Terms of Service. If you do not agree, you may not use this platform.' },
  { title: '2. Eligibility', body: 'You must be at least 18 years of age and a legal resident of the United States to use this platform. Contractors must hold a valid Kansas contractor\'s license to access the project feed.' },
  { title: '3. User Responsibilities', body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, truthful information in all project submissions and account registrations.' },
  { title: '4. Project Posting', body: 'Homeowners posting projects must provide accurate, complete, and non-deceptive information. Nexus Operations reserves the right to remove any project that is inaccurate, harmful, or violates these terms, without notice.' },
  { title: '5. Contractor Obligations', body: 'Contractors agree to provide professional, licensed services and to maintain all insurance and bonding required under Kansas law. Contractors who claim a project are obligated to contact the homeowner within 24 hours. Failure to do so may result in account suspension.' },
  { title: '6. Exclusive Claims', body: 'When a contractor claims a project, that project is permanently and exclusively assigned to that contractor. Nexus Operations does not guarantee project value, homeowner responsiveness, or job completion. All transactions between homeowners and contractors are independent of Nexus Operations.' },
  { title: '7. Subscriptions & Billing', body: 'Contractor memberships are billed monthly via Stripe. You may cancel at any time from your account dashboard. Refunds are not issued for partial billing periods. Nexus Operations reserves the right to modify plan pricing with 30 days\' notice.' },
  { title: '8. Limitation of Liability', body: 'Nexus Operations is provided "as is" without warranties of any kind. We are not liable for indirect, incidental, special, or consequential damages arising out of your use of the platform or any project completed through it.' },
  { title: '9. Governing Law', body: 'These Terms are governed by the laws of the State of Kansas. Any disputes arising under these Terms shall be resolved in the courts of Shawnee County, Kansas.' },
  { title: '10. Modifications', body: 'We reserve the right to modify these Terms at any time. We will notify users of material changes via email. Continued use of the platform after modifications constitutes acceptance of the updated Terms.' },
]

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '160px 24px 120px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>Legal</p>
        <h1 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '12px', lineHeight: 1.1 }}>Terms of Service</h1>
        <p style={{ fontSize: '15px', color: '#4b5563', marginBottom: '64px' }}>Last updated: March 2025</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ borderTop: '1px solid #1a1a1a', paddingTop: '32px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{s.title}</h2>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
