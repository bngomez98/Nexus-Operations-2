import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Nexus Operations | Exclusive Contractor Marketplace',
    template: '%s | Nexus Operations',
  },
  description: 'The professional contractor marketplace connecting homeowners with verified local contractors. No bidding wars. One dedicated contractor per project. Serving Topeka, KS and surrounding areas.',
  keywords: [
    'contractor marketplace',
    'Topeka contractors',
    'home improvement',
    'exclusive leads',
    'Kansas contractor',
    'verified contractors',
    'home renovation',
    'local contractors',
    'project management',
    'contractor services',
  ],
  authors: [{ name: 'Nexus Operations LLC' }],
  creator: 'Nexus Operations',
  publisher: 'Nexus Operations LLC',
  metadataBase: new URL('https://nexusoperations.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Nexus Operations',
    title: 'Nexus Operations | Exclusive Contractor Marketplace',
    description: 'The professional contractor marketplace. One project, one contractor, complete dedication.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexus Operations - Exclusive Contractor Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus Operations | Exclusive Contractor Marketplace',
    description: 'The professional contractor marketplace. One project, one contractor, complete dedication.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token',
  },
}

export const viewport: Viewport = {
  themeColor: '#22c55e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
