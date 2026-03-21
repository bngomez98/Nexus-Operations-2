'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #222222' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#22c55e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Zap size={20} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            Nexus<span style={{ color: '#22c55e' }}>Ops</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden-mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: pathname === link.href ? '#22c55e' : '#9ca3af',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href) (e.target as HTMLElement).style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href) (e.target as HTMLElement).style.color = '#9ca3af'
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ width: '1px', height: '20px', backgroundColor: '#222222', margin: '0 8px' }} />

          <Link
            href="/login"
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#9ca3af',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#ffffff' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#9ca3af' }}
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#0a0a0a',
              backgroundColor: '#22c55e',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#16a34a' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = '#22c55e' }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            backgroundColor: '#111111',
            borderTop: '1px solid #222222',
            padding: '16px 24px 24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: pathname === link.href ? '#22c55e' : '#d1d5db',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  display: 'block',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ height: '1px', backgroundColor: '#222222', margin: '8px 0' }} />
            <Link
              href="/login"
              style={{
                padding: '12px 16px',
                fontSize: '15px',
                fontWeight: 500,
                color: '#d1d5db',
                textDecoration: 'none',
                borderRadius: '8px',
                display: 'block',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              style={{
                padding: '14px 16px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#0a0a0a',
                backgroundColor: '#22c55e',
                textDecoration: 'none',
                borderRadius: '8px',
                display: 'block',
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
