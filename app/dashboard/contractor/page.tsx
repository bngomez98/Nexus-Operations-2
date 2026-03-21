'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import {
  LogOut, Zap, AlertCircle, Filter, MapPin, Clock, DollarSign,
  CheckCircle2, Crown, ArrowRight, TrendingUp
} from 'lucide-react'
import type { Project } from '@/lib/store'
import { URGENCY_LABELS } from '@/lib/store'
import type { User } from '@/lib/auth'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ALL_CATS = [
  'All', 'Tree Removal', 'Concrete Work', 'Roofing', 'HVAC',
  'Fencing', 'Electrical', 'Plumbing', 'Excavation', 'Landscaping',
  'Deck / Patio', 'Painting', 'Flooring', 'General Contracting',
]

function formatBudget(min: number, max: number) {
  const fmt = (n: number) =>
    n >= 100000
      ? `$${(n / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`
      : `$${(n / 100).toLocaleString()}`
  if (!min && !max) return 'Budget TBD'
  if (!max) return `${fmt(min)}+`
  return `${fmt(min)} – ${fmt(max)}`
}

function urgencyColor(u: string) {
  if (u === 'asap') return '#ef4444'
  if (u === 'within_week') return '#f97316'
  if (u === 'within_month') return '#eab308'
  return '#6b7280'
}

function ProjectCard({
  project,
  onClaim,
  claiming,
}: {
  project: Project
  onClaim: (id: string) => void
  claiming: string | null
}) {
  const isClaiming = claiming === project.id

  return (
    <article
      style={{
        backgroundColor: '#0e0e0e',
        border: '1px solid #1e1e1e',
        borderRadius: '18px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 600, color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)', padding: '3px 10px', borderRadius: '100px', marginBottom: '8px', border: '1px solid rgba(34,197,94,0.15)' }}>
            {project.category}
          </span>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            {project.title}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: urgencyColor(project.urgency) }} />
          <span style={{ fontSize: '11px', color: urgencyColor(project.urgency), fontWeight: 600 }}>
            {URGENCY_LABELS[project.urgency]}
          </span>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <MapPin size={13} color="#4b5563" />
          <span style={{ fontSize: '13px', color: '#4b5563' }}>{project.address}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Clock size={13} color="#4b5563" />
          <span style={{ fontSize: '13px', color: '#4b5563' }}>
            {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Budget */}
      <div style={{ backgroundColor: '#141414', borderRadius: '12px', padding: '14px 18px', border: '1px solid #1a1a1a' }}>
        <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '4px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Budget Range</p>
        <p style={{ fontSize: '22px', fontWeight: 800, color: '#22c55e', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {formatBudget(project.budgetMin, project.budgetMax)}
        </p>
      </div>

      {/* Claim button */}
      <button
        onClick={() => onClaim(project.id)}
        disabled={project.status !== 'open' || isClaiming}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '13px',
          backgroundColor: project.status === 'open' ? '#22c55e' : '#1a1a1a',
          color: project.status === 'open' ? '#0a0a0a' : '#4b5563',
          fontWeight: 700,
          fontSize: '14px',
          borderRadius: '12px',
          border: 'none',
          cursor: project.status === 'open' && !isClaiming ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit',
          transition: 'opacity 0.2s',
          opacity: isClaiming ? 0.6 : 1,
        }}
      >
        {isClaiming ? (
          'Claiming...'
        ) : project.status === 'open' ? (
          <><CheckCircle2 size={16} /> Claim This Project</>
        ) : (
          'Already Claimed'
        )}
      </button>
    </article>
  )
}

export default function ContractorDashboard() {
  const [category, setCategory] = useState('All')
  const [claiming, setClaiming] = useState<string | null>(null)
  const [claimError, setClaimError] = useState('')

  const leadsKey =
    category === 'All' ? '/api/leads' : `/api/leads?category=${encodeURIComponent(category)}`
  const { data: leadsData, isLoading } = useSWR<{ projects: Project[] }>(leadsKey, fetcher)
  const { data: meData } = useSWR<{ user: User }>('/api/auth/me', fetcher)

  const projects = leadsData?.projects ?? []
  const user = meData?.user
  const hasPlan = user?.subscriptionStatus === 'active'

  async function handleClaim(projectId: string) {
    setClaimError('')
    setClaiming(projectId)
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })
      const data = await res.json()
      if (!res.ok) {
        setClaimError(data.error || 'Failed to claim project.')
      } else {
        mutate(leadsKey)
      }
    } finally {
      setClaiming(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      {/* Top nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#0a0a0a" fill="#0a0a0a" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {user && (
              <div style={{ textAlign: 'right', display: 'none' }} className="sm:block">
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', lineHeight: 1 }}>{user.name}</p>
                <p style={{ fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>
                  {user.plan ? `${user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan` : 'No active plan'}
                </p>
              </div>
            )}

            {!hasPlan && (
              <Link
                href="/dashboard/contractor/subscribe"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: '13px', fontWeight: 600, borderRadius: '8px', textDecoration: 'none' }}
              >
                <Crown size={14} /> Get a Plan
              </Link>
            )}

            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'none', border: '1px solid #222222', color: '#6b7280', fontSize: '13px', fontWeight: 500, borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Subscription upsell banner */}
        {!hasPlan && (
          <div style={{ backgroundColor: '#0d1f0d', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '16px', padding: '24px 28px', marginBottom: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Crown size={22} color="#22c55e" />
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '3px' }}>Activate your membership to claim projects</p>
                <p style={{ fontSize: '13px', color: '#4ade80' }}>Plans start at $299/mo — flat rate, unlimited claims, zero per-lead fees.</p>
              </div>
            </div>
            <Link
              href="/dashboard/contractor/subscribe"
              style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 24px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '14px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Choose a Plan <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '6px' }}>
              Available Projects
            </h1>
            <p style={{ fontSize: '14px', color: '#4b5563' }}>
              {projects.length > 0 ? `${projects.length} open project${projects.length !== 1 ? 's' : ''} in your area` : 'Browse exclusive project leads'}
            </p>
          </div>
          {hasPlan && user?.plan && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '100px' }}>
              <TrendingUp size={14} color="#22c55e" />
              <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} member
              </span>
            </div>
          )}
        </div>

        {claimError && (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '13px 18px', marginBottom: '24px', fontSize: '14px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={16} /> {claimError}
          </div>
        )}

        {/* Category filter */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Filter size={14} color="#4b5563" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filter by category</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {ALL_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '7px 15px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '100px',
                  border: category === cat ? '1px solid #22c55e' : '1px solid #1e1e1e',
                  backgroundColor: category === cat ? 'rgba(34,197,94,0.1)' : '#0e0e0e',
                  color: category === cat ? '#22c55e' : '#6b7280',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ height: '340px', borderRadius: '18px', backgroundColor: '#0e0e0e', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', border: '1px dashed #1e1e1e', borderRadius: '20px', textAlign: 'center' }}>
            <AlertCircle size={40} color="#2a2a2a" style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '17px', fontWeight: 700, color: '#4b5563', marginBottom: '8px' }}>No open projects</p>
            <p style={{ fontSize: '14px', color: '#2d2d2d' }}>Check back soon or try a different category filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClaim={handleClaim}
                claiming={claiming}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
