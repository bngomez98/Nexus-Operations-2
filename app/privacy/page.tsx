import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = { title: 'Privacy Policy' }

const SECTIONS = [
  { title: 'Information We Collect', body: 'We collect information you provide directly to us, such as name, email address, phone number, and project details. We also automatically collect certain information about your device and how you interact with our platform, including IP address and usage patterns.' },
  { title: 'How We Use Your Information', body: 'We use collected information to provide and improve our services, match homeowners with contractors, process payments through Stripe, send service notifications, and comply with legal obligations. We do not sell your personal data.' },
  { title: 'Data Security', body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment data is processed securely by Stripe and is not stored on our servers.' },
  { title: 'Sharing Your Information', body: 'We do not sell your personal information. When a contractor claims your project, their identity is shared with you and vice versa. We may share information with service providers (such as Stripe for payments) subject to strict confidentiality obligations.' },
  { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal information at any time. You may also opt out of promotional emails. To exercise these rights, contact us at privacy@nexusoperations.org.' },
  { title: 'Cookies', body: 'We use essential cookies for authentication (session management). We do not use advertising or tracking cookies. You can control cookie settings through your browser.' },
  { title: 'Contact Us', body: 'If you have questions about this privacy policy, contact us at privacy@nexusoperations.org or write to: Nexus Operations LLC, Topeka, KS 66601.' },
]

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '160px 24px 120px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>Legal</p>
        <h1 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '12px', lineHeight: 1.1 }}>Privacy Policy</h1>
        <p style={{ fontSize: '15px', color: '#4b5563', marginBottom: '64px' }}>Last updated: March 2025</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ borderTop: '1px solid #1a1a1a', paddingTop: '36px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.01em' }}>{s.title}</h2>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
