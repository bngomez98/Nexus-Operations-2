'use client'

import Link from 'next/link'
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
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
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
    </footer>
  )
}
