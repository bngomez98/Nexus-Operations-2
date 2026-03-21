import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Nexus Operations | One Contractor. Exclusively Yours.',
    template: '%s | Nexus Operations',
  },
  description:
    "Nexus Operations connects Topeka homeowners with verified contractors through an exclusive lead marketplace. No bidding wars. One contractor per project.",
  keywords: ['contractor', 'Topeka', 'home improvement', 'exclusive leads', 'Kansas contractor'],
  metadataBase: new URL('https://nexusoperations.org'),
  openGraph: {
    type: 'website',
    siteName: 'Nexus Operations',
    title: 'Nexus Operations | One Contractor. Exclusively Yours.',
    description: 'The exclusive contractor marketplace for Topeka, KS.',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Nexus Operations' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#22c55e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#0a0a0a', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
