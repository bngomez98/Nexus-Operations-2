'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap, ChevronRight } from 'lucide-react'
import { Menu, X, Building2 } from 'lucide-react'

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
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        {/* Top accent line */}
        {scrolled && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.4) 50%, transparent 100%)',
          }} />
        )}

        <nav
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '70px',
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
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 16px rgba(34,197,94,0.3)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.boxShadow = '0 0 24px rgba(34,197,94,0.5)'
                el.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.boxShadow = '0 0 16px rgba(34,197,94,0.3)'
                el.style.transform = 'scale(1)'
              }}
            >
              <Zap size={19} color="#080808" fill="#080808" />
            </div>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              Nexus<span style={{ color: '#22c55e' }}>Ops</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            className="show-md"
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    padding: '8px 14px',
                    fontSize: '14px',
                    fontWeight: active ? 600 : 500,
                    color: active ? '#ffffff' : '#6b7280',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'color 0.15s ease, background-color 0.15s ease',
                    backgroundColor: active ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#d1d5db'
                      ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#6b7280'
                      ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {link.label}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '2px',
                      borderRadius: '1px',
                      backgroundColor: '#22c55e',
                    }} />
                  )}
                </Link>
              )
            })}

            <div style={{ width: '1px', height: '18px', backgroundColor: '#1e1e1e', margin: '0 6px' }} />

            <Link
              href="/login"
              style={{
                padding: '8px 14px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6b7280',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'color 0.15s, background-color 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#d1d5db'
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#6b7280'
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
              }}
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <Building2 size={20} className="text-primary-fg" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">
            Nexus <span className="text-primary">Operations</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors no-underline ${
                pathname === link.href 
                  ? 'text-primary' 
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#080808',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                textDecoration: 'none',
                borderRadius: '10px',
                transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 2px 12px rgba(34,197,94,0.2)',
                letterSpacing: '-0.01em',
                marginLeft: '4px',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-1px)'
                el.style.boxShadow = '0 4px 20px rgba(34,197,94,0.35)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 2px 12px rgba(34,197,94,0.2)'
              }}
            >
              Get Started
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="hide-md"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: open ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div style={{
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            }}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </div>
          </button>
        </nav>
      </header>
          <div className="w-px h-5 bg-border mx-2" />

          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground rounded-lg transition-colors no-underline"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2.5 text-sm font-semibold text-primary-fg bg-primary rounded-lg hover:bg-primary/90 transition-colors no-underline whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden bg-transparent border-none text-foreground cursor-pointer p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 98,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: '#0d0d0d',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          paddingTop: '70px',
        }}
      >
        <div style={{ padding: '20px 20px 28px' }}>
          {/* Live indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: 'rgba(34,197,94,0.06)',
            border: '1px solid rgba(34,197,94,0.12)',
            borderRadius: '10px',
            marginBottom: '16px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              animation: 'dot-pulse 1.5s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 600 }}>
              Live · Topeka, KS
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' }}>
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '13px 14px',
                  fontSize: '16px',
                  fontWeight: pathname === link.href ? 700 : 500,
                  color: pathname === link.href ? '#22c55e' : '#d1d5db',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: pathname === link.href ? 'rgba(34,197,94,0.06)' : 'transparent',
                  animation: `slideDown 0.3s cubic-bezier(0.16,1,0.3,1) ${idx * 0.05}s both`,
                }}
        <div className="md:hidden bg-card border-t border-border px-6 py-4">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-base font-medium rounded-lg block no-underline ${
                  pathname === link.href ? 'text-primary' : 'text-muted'
                }`}
              >
                {link.label}
                {pathname === link.href && <ChevronRight size={14} color="#22c55e" />}
              </Link>
            ))}
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 100%)', marginBottom: '16px' }} />

          {/* Auth buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/login"
              style={{
                padding: '13px 16px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#9ca3af',
                textDecoration: 'none',
                borderRadius: '10px',
                display: 'block',
                border: '1px solid #1e1e1e',
                textAlign: 'center',
                animation: 'slideDown 0.3s cubic-bezier(0.16,1,0.3,1) 0.15s both',
                backgroundColor: '#131313',
              }}
            <div className="h-px bg-border my-2" />
            <Link
              href="/login"
              className="px-4 py-3 text-base font-medium text-muted rounded-lg block no-underline"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              style={{
                padding: '14px 16px',
                fontSize: '15px',
                fontWeight: 700,
                color: '#080808',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                textDecoration: 'none',
                borderRadius: '10px',
                display: 'block',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(34,197,94,0.25)',
                animation: 'slideDown 0.3s cubic-bezier(0.16,1,0.3,1) 0.2s both',
              }}
              className="px-4 py-3.5 text-base font-semibold text-primary-fg bg-primary rounded-lg block text-center no-underline mt-2"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .show-md { display: flex !important; }
          .hide-md { display: none !important; }
        }
        @media (max-width: 767px) {
          .hide-sm { display: none !important; }
          .show-sm { display: flex !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </>
      )}
    </header>
  )
}
