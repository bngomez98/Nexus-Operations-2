import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Nexus Operations | Local Project Marketplace',
  description:
    "Topeka's leading contractor marketplace. Homeowners post projects for free — verified contractors claim them with zero competition.",
  keywords: ['contractor', 'homeowner', 'projects', 'Topeka', 'marketplace'],
  openGraph: {
    title: 'Nexus Operations | Local Project Marketplace',
    description: 'Connect homeowners with verified local contractors.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f97316',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
