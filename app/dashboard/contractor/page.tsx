'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate as globalMutate } from 'swr'
import { LogOut, AlertCircle, CheckCircle2, MapPin, Clock, Zap, TrendingUp, Filter } from 'lucide-react'
import { CATEGORIES, URGENCY_LABELS, type Project } from '@/lib/store'
import type { User } from '@/lib/auth'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ALL_CATS = ['All', ...CATEGORIES]

function ProjectCard({
  project,
  onClaim,
  claiming,
}: {
  project: Project
  onClaim: (id: string) => void
  claiming: string | null
}) {
  const budgetStr =
    project.budgetMin && project.budgetMax
      ? `$${(project.budgetMin / 100).toLocaleString()} – $${(project.budgetMax / 100).toLocaleString()}`
      : project.budgetMin
      ? `$${(project.budgetMin / 100).toLocaleString()}+`
      : 'Budget TBD'

  const isClaiming = claiming === project.id
  const isOpen = project.status === 'open'

  return (
    <article style={{ backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '18px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'border-color 0.2s' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{project.title}</h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', fontSize: '11px', fontWeight: 600, color: '#22c55e', flexShrink: 0 }}>
            <CheckCircle2 size={9} /> Open
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>{project.category}</p>
      </div>

      {/* Description */}
      <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6b7280', backgroundColor: '#141414', border: '1px solid #1e1e1e', borderRadius: '6px', padding: '4px 8px' }}>
          <MapPin size={10} color="#22c55e" /> {project.address}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6b7280', backgroundColor: '#141414', border: '1px solid #1e1e1e', borderRadius: '6px', padding: '4px 8px' }}>
          <Clock size={10} color="#22c55e" /> {URGENCY_LABELS[project.urgency]}
        </span>
      </div>

      {/* Budget + CTA */}
      <div style={{ paddingTop: '16px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Budget Range</p>
            <p style={{ fontSize: '22px', fontWeight: 800, color: '#22c55e', letterSpacing: '-0.04em', lineHeight: 1 }}>{budgetStr}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Posted</p>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <button
          onClick={() => onClaim(project.id)}
          disabled={!isOpen || isClaiming}
          style={{ width: '100%', padding: '13px', backgroundColor: isOpen ? '#22c55e' : '#1a1a1a', border: isOpen ? 'none' : '1px solid #2a2a2a', borderRadius: '10px', color: isOpen ? '#0a0a0a' : '#4b5563', fontSize: '14px', fontWeight: 700, cursor: isOpen ? 'pointer' : 'not-allowed', opacity: isClaiming ? 0.6 : 1, transition: 'opacity 0.2s, background-color 0.2s' }}
        >
          {isClaiming ? 'Claiming...' : isOpen ? 'Claim This Project' : 'Already Claimed'}
        </button>
      </div>
    </article>
  )
}

export default function ContractorDashboard() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [claiming, setClaiming] = useState<string | null>(null)

  const leadsKey = activeCategory === 'All' ? '/api/leads' : `/api/leads?category=${encodeURIComponent(activeCategory)}`
  const { data: leadsData, isLoading } = useSWR<{ projects: Project[] }>(leadsKey, fetcher)
  const { data: meData } = useSWR<{ user: Omit<User, 'passwordHash'> }>('/api/auth/me', fetcher)

  const projects = leadsData?.projects ?? []
  const user = meData?.user

  async function handleClaim(projectId: string) {
    setClaiming(projectId)
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })
      if (res.ok) {
        globalMutate(leadsKey)
      }
    } finally {
      setClaiming(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={17} color="#0a0a0a" fill="#0a0a0a" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
              Nexus<span style={{ color: '#22c55e' }}>Ops</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {user.plan && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', fontSize: '11px', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <TrendingUp size={9} /> {user.plan}
                  </span>
                )}
                <span style={{ fontSize: '13px', color: '#6b7280' }}>{user.name}</span>
              </div>
            )}
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#9ca3af', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                <LogOut size={13} /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Page header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Contractor Portal</p>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>Available Projects</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>Claim a project to lock it exclusively. It disappears from all other contractors immediately.</p>
        </div>

        {/* Category filter */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Filter size={13} color="#6b7280" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Filter</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {ALL_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ padding: '7px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', backgroundColor: activeCategory === cat ? '#22c55e' : '#111111', color: activeCategory === cat ? '#0a0a0a' : '#9ca3af', border: activeCategory === cat ? 'none' : '1px solid #2a2a2a' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: '300px', backgroundColor: '#0e0e0e', borderRadius: '18px', border: '1px solid #1a1a1a' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', border: '1px dashed #2a2a2a', borderRadius: '20px', textAlign: 'center' }}>
            <AlertCircle size={36} color="#2a2a2a" style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>No open projects</p>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Check back soon — projects are submitted daily.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '13px', color: '#4b5563', marginBottom: '20px', fontWeight: 500 }}>
              {projects.length} project{projects.length !== 1 ? 's' : ''} available
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} onClaim={handleClaim} claiming={claiming} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
