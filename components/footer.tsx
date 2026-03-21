'use client'

import Link from 'next/link'
import { Zap, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid #1a1a1a',
        padding: '64px 24px 32px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '56px',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  backgroundColor: '#22c55e',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={18} color="#0a0a0a" fill="#0a0a0a" />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                Nexus<span style={{ color: '#22c55e' }}>Ops</span>
              </span>
            </Link>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7', marginBottom: '20px' }}>
              Topeka&apos;s exclusive contractor marketplace. One project, one contractor, zero competition.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="tel:7855550100"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}
              >
                <Phone size={14} color="#22c55e" />
                (785) 555-0100
              </a>
              <a
                href="mailto:support@nexusoperations.org"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}
              >
                <Mail size={14} color="#22c55e" />
                support@nexusoperations.org
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
                <MapPin size={14} color="#22c55e" />
                Topeka, KS 66601
              </span>
            </div>
          </div>

          {/* For Homeowners */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Homeowners
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/signup?role=homeowner', label: 'Submit a Project' },
                { href: '/how-it-works#homeowners', label: 'How It Works' },
                { href: '/login', label: 'My Dashboard' },
                { href: '/faq', label: 'FAQ' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#d1d5db' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6b7280' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* For Contractors */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Contractors
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/signup?role=contractor', label: 'Join as Contractor' },
                { href: '/pricing', label: 'View Plans' },
                { href: '/how-it-works#contractors', label: 'How It Works' },
                { href: '/login', label: 'Contractor Portal' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#d1d5db' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6b7280' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Company
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/about', label: 'About Us' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#d1d5db' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6b7280' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #1a1a1a',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#4b5563' }}>
            &copy; {new Date().getFullYear()} Nexus Operations LLC. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: '#4b5563' }}>
            Serving Topeka, KS &amp; surrounding areas
          </p>
        </div>
      </div>
    </footer>
  )
}
