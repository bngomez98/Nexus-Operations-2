'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import {
  LogOut, Zap, AlertCircle, Filter, MapPin, Clock, CheckCircle2,
  Crown, ArrowRight, TrendingUp, Lock, Briefcase, ChevronRight,
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
  const fmt = (n: number) => `$${(n / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`
  if (!min && !max) return 'Budget TBD'
  if (!max) return `${fmt(min)}+`
  return `${fmt(min)} – ${fmt(max)}`
}

function urgencyConfig(u: string) {
  if (u === 'asap')         return { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)' }
  if (u === 'within_week')  return { color: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)' }
  if (u === 'within_month') return { color: '#eab308', bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.2)' }
  return                           { color: '#6b7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.2)' }
}

function ProjectCard({
  project, onClaim, claiming,
}: {
  project: Project
  onClaim: (id: string) => void
  claiming: string | null
}) {
  const isClaiming = claiming === project.id
  const urg = urgencyConfig(project.urgency)
  const urgLabel = URGENCY_LABELS[project.urgency] ?? project.urgency
  const isOpen = project.status === 'open'

  return (
    <article
      style={{
        backgroundColor: '#0d0d0d',
        border: '1px solid #1a1a1a',
        borderRadius: '18px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        if (isOpen) {
          const el = e.currentTarget
          el.style.borderColor = 'rgba(34,197,94,0.15)'
          el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
          el.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#1a1a1a'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.07)', padding: '3px 9px', borderRadius: '100px', marginBottom: '7px', border: '1px solid rgba(34,197,94,0.12)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {project.category}
          </span>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            {project.title}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', backgroundColor: urg.bg, border: `1px solid ${urg.border}`, borderRadius: '100px', flexShrink: 0 }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: urg.color, flexShrink: 0 }} />
          <span style={{ fontSize: '10px', color: urg.color, fontWeight: 700, whiteSpace: 'nowrap' }}>{urgLabel}</span>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.75, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {project.address && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={12} color="#374151" />
            <span style={{ fontSize: '12px', color: '#374151' }}>{project.address}</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={12} color="#374151" />
          <span style={{ fontSize: '12px', color: '#374151' }}>
            Posted {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Budget */}
      <div style={{ backgroundColor: '#111111', borderRadius: '12px', padding: '14px 16px', border: '1px solid #1a1a1a' }}>
        <p style={{ fontSize: '10px', color: '#374151', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Budget Range</p>
        <p style={{ fontSize: '20px', fontWeight: 900, background: 'linear-gradient(135deg, #22c55e, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.025em', lineHeight: 1 }}>
          {formatBudget(project.budgetMin, project.budgetMax)}
        </p>
      </div>

      {/* Claim button */}
      <button
        onClick={() => isOpen && onClaim(project.id)}
        disabled={!isOpen || isClaiming}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '13px',
          background: isOpen ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#111111',
          color: isOpen ? '#080808' : '#374151',
          fontWeight: 700, fontSize: '14px', borderRadius: '11px',
          border: isOpen ? 'none' : '1px solid #1a1a1a',
          cursor: isOpen && !isClaiming ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit',
          opacity: isClaiming ? 0.7 : 1,
          boxShadow: isOpen ? '0 2px 14px rgba(34,197,94,0.2)' : 'none',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (isOpen && !isClaiming) {
            const el = e.currentTarget
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 4px 20px rgba(34,197,94,0.35)'
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = isOpen ? '0 2px 14px rgba(34,197,94,0.2)' : 'none'
        }}
      >
        {isClaiming ? (
          <><span style={{ width: '14px', height: '14px', border: '2px solid rgba(8,8,8,0.3)', borderTopColor: '#080808', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Claiming…</>
        ) : isOpen ? (
          <><Lock size={14} /> Claim This Project</>
        ) : (
          <><CheckCircle2 size={14} /> Already Claimed</>
        )}
      </button>
    </article>
  )
}

export default function ContractorDashboard() {
  const [category, setCategory] = useState('All')
  const [claiming, setClaiming] = useState<string | null>(null)
  const [claimError, setClaimError] = useState('')

  const leadsKey = category === 'All' ? '/api/leads' : `/api/leads?category=${encodeURIComponent(category)}`
  const { data: leadsData, isLoading } = useSWR<{ projects: Project[] }>(leadsKey, fetcher, { refreshInterval: 30000 })
  const { data: meData } = useSWR<{ user: User }>('/api/auth/me', fetcher)

  const projects = leadsData?.projects ?? []
  const user = meData?.user
  const hasPlan = user?.subscriptionStatus === 'active'
  const planName = user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : null

  async function handleClaim(projectId: string) {
    setClaimError(''); setClaiming(projectId)
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })
      const data = await res.json()
      if (!res.ok) { setClaimError(data.error || 'Failed to claim project.') }
      else { mutate(leadsKey) }
    } finally {
      setClaiming(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080808' }}>
      {/* Top nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #141414' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(34,197,94,0.2)' }}>
              <Zap size={17} color="#080808" fill="#080808" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Plan badge */}
            {hasPlan && planName && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '100px' }}>
                <TrendingUp size={11} color="#22c55e" />
                <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 700 }}>{planName} Plan</span>
              </div>
            )}

            {!hasPlan && (
              <Link href="/dashboard/contractor/subscribe" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80', fontSize: '12px', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', transition: 'background-color 0.15s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(34,197,94,0.12)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(34,197,94,0.08)' }}>
                <Crown size={12} /> Get a Plan
              </Link>
            )}

            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#22c55e' }}>
                    {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
            )}

            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: 'none', border: '1px solid #1e1e1e', color: '#4b5563', fontSize: '13px', fontWeight: 500, borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s, color 0.15s' }} onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = '#2a2a2a'; el.style.color = '#6b7280' }} onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = '#1e1e1e'; el.style.color = '#4b5563' }}>
                <LogOut size={13} /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Upsell banner */}
        {!hasPlan && (
          <div style={{ background: 'linear-gradient(135deg, rgba(13,26,13,0.8) 0%, rgba(8,8,8,0) 100%)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '16px', padding: '22px 26px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Crown size={20} color="#22c55e" />
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '3px' }}>Activate your membership to claim projects</p>
                <p style={{ fontSize: '13px', color: '#4ade80' }}>Plans start at $299/mo — flat rate, unlimited claims, zero per-lead fees.</p>
              </div>
            </div>
            <Link href="/dashboard/contractor/subscribe" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '11px 22px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#080808', fontWeight: 700, fontSize: '13px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(34,197,94,0.2)' }}>
              Choose a Plan <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '4px' }}>Available Projects</h1>
            <p style={{ fontSize: '14px', color: '#374151' }}>
              {isLoading ? 'Loading…' : projects.length > 0 ? `${projects.length} open project${projects.length !== 1 ? 's' : ''} in your area` : 'No open projects right now — check back soon.'}
            </p>
          </div>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 14px', backgroundColor: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)', borderRadius: '100px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', animation: 'dot-pulse 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>Auto-refreshes every 30s</span>
          </div>
        </div>

        {/* Claim error */}
        {claimError && (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '12px', padding: '13px 18px', marginBottom: '24px', fontSize: '14px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={15} /> {claimError}
          </div>
        )}

        {/* Category filter */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
            <Filter size={13} color="#374151" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filter by category</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {ALL_CATS.map((cat) => {
              const active = category === cat
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                    borderRadius: '100px', fontFamily: 'inherit', cursor: 'pointer',
                    border: active ? '1px solid rgba(34,197,94,0.35)' : '1px solid #1a1a1a',
                    backgroundColor: active ? 'rgba(34,197,94,0.08)' : '#0d0d0d',
                    color: active ? '#22c55e' : '#4b5563',
                    transition: 'all 0.12s',
                    boxShadow: active ? '0 0 12px rgba(34,197,94,0.08)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      const el = e.currentTarget
                      el.style.borderColor = '#2a2a2a'
                      el.style.color = '#9ca3af'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      const el = e.currentTarget
                      el.style.borderColor = '#1a1a1a'
                      el.style.color = '#4b5563'
                    }
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ height: '360px', borderRadius: '18px' }} className="skeleton" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', border: '1px dashed #1a1a1a', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#0d0d0d', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Briefcase size={24} color="#2a2a2a" />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#4b5563', marginBottom: '8px' }}>No open projects</p>
            <p style={{ fontSize: '14px', color: '#2a2a2a', lineHeight: 1.7 }}>Check back soon or try a different category filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onClaim={handleClaim} claiming={claiming} />
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .skeleton {
          background: linear-gradient(90deg, #0d0d0d 0px, #141414 80px, #0d0d0d 160px);
          background-size: 600px 100%;
          animation: skeleton-pulse 1.4s ease-in-out infinite;
        }
        @keyframes skeleton-pulse {
          0%   { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }
      `}</style>
    </div>
  )
}
