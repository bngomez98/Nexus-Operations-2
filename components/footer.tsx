'use client'

import Link from 'next/link'
import { Zap, MapPin, Phone, Mail, ArrowRight, ExternalLink } from 'lucide-react'

const FOOTER_LINKS = {
  homeowners: [
    { href: '/signup?role=homeowner', label: 'Submit a Project' },
    { href: '/how-it-works#homeowners', label: 'How It Works' },
    { href: '/login', label: 'My Dashboard' },
  ],
  contractors: [
    { href: '/signup?role=contractor', label: 'Join as Contractor' },
    { href: '/pricing', label: 'View Plans' },
    { href: '/how-it-works#contractors', label: 'How It Works' },
    { href: '/login', label: 'Contractor Portal' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080808', borderTop: '1px solid #141414' }}>
      {/* CTA section */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1a0d 0%, #080808 100%)',
        borderBottom: '1px solid rgba(34,197,94,0.08)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Status badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            backgroundColor: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.18)',
            borderRadius: '100px',
            marginBottom: '28px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              animation: 'dot-pulse 1.5s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#4ade80' }}>
              Now live · Topeka, KS
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            Ready to get started?
          </h2>
          <p style={{
            fontSize: '17px',
            color: '#6b7280',
            lineHeight: 1.65,
            marginBottom: '36px',
            maxWidth: '480px',
            margin: '0 auto 36px',
          }}>
            Homeowners post free. Contractors get exclusive leads. No middleman, no bidding wars.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link
              href="/signup?role=homeowner"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: '#080808',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(34,197,94,0.25)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-1px)'
                el.style.boxShadow = '0 6px 28px rgba(34,197,94,0.35)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 4px 20px rgba(34,197,94,0.25)'
              }}
            >
              Post a Project Free <ArrowRight size={15} />
            </Link>
            <Link
              href="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                color: '#9ca3af',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: '12px',
                textDecoration: 'none',
                border: '1px solid #1e1e1e',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#ffffff'
                el.style.borderColor = '#2a2a2a'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#9ca3af'
                el.style.borderColor = '#1e1e1e'
              }}
            >
              View Contractor Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '48px',
          marginBottom: '56px',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                marginBottom: '18px',
              }}
            >
              <div style={{
                width: '34px',
                height: '34px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(34,197,94,0.2)',
              }}>
                <Zap size={18} color="#080808" fill="#080808" />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Nexus<span style={{ color: '#22c55e' }}>Ops</span>
              </span>
            </Link>

            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.75, marginBottom: '24px' }}>
              Topeka&apos;s exclusive contractor marketplace. One project. One contractor. Zero competition.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: Phone, label: '(785) 555-0100', href: 'tel:7855550100' },
                { icon: Mail, label: 'support@nexusoperations.org', href: 'mailto:support@nexusoperations.org' },
                { icon: MapPin, label: 'Topeka, KS 66601', href: null },
              ].map(({ icon: Icon, label, href }) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', gap: '9px' }}
import { Building2, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 no-underline mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Building2 size={18} className="text-primary-fg" />
              </div>
              <span className="text-base font-bold text-foreground">
                Nexus <span className="text-primary">Operations</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-5">
              The exclusive contractor marketplace. One project, one contractor, complete dedication.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:7855550100"
                className="flex items-center gap-2 text-sm text-muted no-underline hover:text-foreground transition-colors"
              >
                <Phone size={14} className="text-primary" />
                (785) 555-0100
              </a>
              <a
                href="mailto:support@nexusoperations.org"
                className="flex items-center gap-2 text-sm text-muted no-underline hover:text-foreground transition-colors"
              >
                <Mail size={14} className="text-primary" />
                support@nexusoperations.org
              </a>
              <span className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={14} className="text-primary" />
                Topeka, KS 66601
              </span>
            </div>
          </div>

          {/* For Homeowners */}
          <div>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-5">
              Homeowners
            </p>
            <div className="flex flex-col gap-3">
              {[
                { href: '/signup?role=homeowner', label: 'Submit a Project' },
                { href: '/how-it-works#homeowners', label: 'How It Works' },
                { href: '/login', label: 'My Dashboard' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted no-underline hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* For Contractors */}
          <div>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-5">
              Contractors
            </p>
            <div className="flex flex-col gap-3">
              {[
                { href: '/signup?role=contractor', label: 'Contractor Enrollment' },
                { href: '/pricing', label: 'Membership Plans' },
                { href: '/how-it-works#contractors', label: 'How It Works' },
                { href: '/login', label: 'Contractor Portal' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted no-underline hover:text-foreground transition-colors"
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '7px',
                    backgroundColor: 'rgba(34,197,94,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={12} color="#22c55e" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{ fontSize: '13px', color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#9ca3af' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#4b5563' }}
                    >
                      {label}
                    </a>
                  ) : (
                    <span style={{ fontSize: '13px', color: '#4b5563' }}>{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Homeowners */}
          <FooterLinkGroup title="Homeowners" links={FOOTER_LINKS.homeowners} />

          {/* Contractors */}
          <FooterLinkGroup title="Contractors" links={FOOTER_LINKS.contractors} />

          {/* Company */}
          <FooterLinkGroup title="Company" links={FOOTER_LINKS.company} />
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #141414',
          paddingTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <p style={{ fontSize: '13px', color: '#374151' }}>
            &copy; {new Date().getFullYear()} Nexus Operations LLC. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <p style={{ fontSize: '13px', color: '#374151' }}>
              Serving Topeka, KS &amp; surrounding areas
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                animation: 'dot-pulse 1.5s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '12px', color: '#374151' }}>Systems operational</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-5">
              Company
            </p>
            <div className="flex flex-col gap-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted no-underline hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Nexus Operations LLC. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Serving Topeka, KS &amp; surrounding areas
          </p>
        </div>
      </div>

      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </footer>
  )
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <p style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#22c55e',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: '14px',
              color: '#4b5563',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#9ca3af' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#4b5563' }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
