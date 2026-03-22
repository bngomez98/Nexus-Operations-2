'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
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
              {link.label}
            </Link>
          ))}

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

      {/* Mobile menu */}
      {open && (
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
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <Link
              href="/login"
              className="px-4 py-3 text-base font-medium text-muted rounded-lg block no-underline"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-3.5 text-base font-semibold text-primary-fg bg-primary rounded-lg block text-center no-underline mt-2"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
