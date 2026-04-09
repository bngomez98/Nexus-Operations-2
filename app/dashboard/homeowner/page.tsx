import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import HomeownerDashboardClient from './client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import {
  LogOut, Zap, Plus, AlertCircle, X, CheckCircle2,
  Clock, MapPin, ChevronDown, Hammer, FolderOpen,
  TrendingUp, FileText,
} from 'lucide-react'
import type { Project } from '@/lib/store'
import { CATEGORIES, URGENCY_LABELS } from '@/lib/store'
import type { User } from '@/lib/auth'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const URGENCY_OPTIONS = [
  { value: 'flexible',     label: 'Flexible timeline' },
  { value: 'within_month', label: 'Within a month' },
  { value: 'within_week',  label: 'Within a week' },
  { value: 'asap',         label: 'As soon as possible' },
]

const inpStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#0d0d0d',
  border: '1px solid #1e1e1e',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

function statusStyle(status: Project['status']) {
  if (status === 'open')     return { bg: 'rgba(59,130,246,0.08)',  color: '#60a5fa', border: '1px solid rgba(59,130,246,0.18)',  label: 'Awaiting Contractor', icon: Clock }
  if (status === 'claimed')  return { bg: 'rgba(34,197,94,0.08)',   color: '#4ade80', border: '1px solid rgba(34,197,94,0.18)',   label: 'Matched',            icon: CheckCircle2 }
  return                           { bg: 'rgba(107,114,128,0.08)', color: '#9ca3af', border: '1px solid rgba(107,114,128,0.18)', label: 'Completed',          icon: CheckCircle2 }
}

function NewProjectForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [focus, setFocus] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '', category: CATEGORIES[0] as string, description: '',
    budgetMin: '', budgetMax: '', address: '', urgency: 'flexible',
  })

  function set(field: string, value: string) { setForm((prev) => ({ ...prev, [field]: value })) }

  const inp = (field: string): React.CSSProperties => ({
    ...inpStyle,
    borderColor: focus === field ? 'rgba(34,197,94,0.4)' : '#1e1e1e',
    boxShadow: focus === field ? '0 0 0 3px rgba(34,197,94,0.07)' : 'none',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, budgetMin: form.budgetMin ? Math.round(parseFloat(form.budgetMin) * 100) : 0, budgetMax: form.budgetMax ? Math.round(parseFloat(form.budgetMax) * 100) : 0 }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Submission failed.'); return }
      onCreated(); onClose()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '20px', padding: '32px', marginBottom: '28px', animation: 'slideDown 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.015em' }}>Submit a New Project</h2>
          <p style={{ fontSize: '13px', color: '#4b5563', marginTop: '3px' }}>Fill in your project details to get matched with a contractor.</p>
        </div>
        <button onClick={onClose} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid #1e1e1e', borderRadius: '8px', cursor: 'pointer', color: '#6b7280', fontFamily: 'inherit', transition: 'border-color 0.15s, color 0.15s' }} onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = '#2a2a2a'; el.style.color = '#9ca3af' }} onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = '#1e1e1e'; el.style.color = '#6b7280' }}>
          <X size={15} />
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Project Title *</label>
          <input style={inp('title')} type="text" value={form.title} onChange={(e) => set('title', e.target.value)} onFocus={() => setFocus('title')} onBlur={() => setFocus(null)} required placeholder="e.g. Tree Removal — Large Oak in Backyard" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Category *</label>
            <div style={{ position: 'relative' }}>
              <select value={form.category} onChange={(e) => set('category', e.target.value)} style={{ ...inp('category'), appearance: 'none', paddingRight: '36px', cursor: 'pointer' }} onFocus={() => setFocus('category')} onBlur={() => setFocus(null)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} color="#4b5563" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Timeline</label>
            <div style={{ position: 'relative' }}>
              <select value={form.urgency} onChange={(e) => set('urgency', e.target.value)} style={{ ...inp('urgency'), appearance: 'none', paddingRight: '36px', cursor: 'pointer' }} onFocus={() => setFocus('urgency')} onBlur={() => setFocus(null)}>
                {URGENCY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} color="#4b5563" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Description *</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} onFocus={() => setFocus('desc')} onBlur={() => setFocus(null)} required rows={4} placeholder="Describe the scope of work, access, any special requirements..." style={{ ...inp('desc'), resize: 'vertical', lineHeight: 1.65 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Min Budget ($)</label>
            <input style={inp('bmin')} type="number" min="0" value={form.budgetMin} onChange={(e) => set('budgetMin', e.target.value)} onFocus={() => setFocus('bmin')} onBlur={() => setFocus(null)} placeholder="500" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Max Budget ($)</label>
            <input style={inp('bmax')} type="number" min="0" value={form.budgetMax} onChange={(e) => set('budgetMax', e.target.value)} onFocus={() => setFocus('bmax')} onBlur={() => setFocus(null)} placeholder="5000" />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4b5563', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Address</label>
          <input style={inp('addr')} type="text" value={form.address} onChange={(e) => set('address', e.target.value)} onFocus={() => setFocus('addr')} onBlur={() => setFocus(null)} placeholder="123 Main St, Topeka, KS 66601" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '8px', borderTop: '1px solid #141414' }}>
          <button type="button" onClick={onClose} style={{ padding: '11px 22px', backgroundColor: 'transparent', border: '1px solid #1e1e1e', color: '#6b7280', fontSize: '13px', fontWeight: 600, borderRadius: '9px', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s, color 0.15s' }} onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = '#2a2a2a'; el.style.color = '#9ca3af' }} onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = '#1e1e1e'; el.style.color = '#6b7280' }}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} style={{ padding: '11px 24px', background: submitting ? '#1a1a1a' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: submitting ? '#4b5563' : '#080808', fontSize: '13px', fontWeight: 700, borderRadius: '9px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '7px', boxShadow: submitting ? 'none' : '0 2px 12px rgba(34,197,94,0.2)', transition: 'all 0.2s' }}>
            {submitting ? (
              <><span style={{ width: '14px', height: '14px', border: '2px solid #374151', borderTopColor: '#6b7280', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Submitting…</>
            ) : (
              <><Plus size={14} /> Submit Project</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const s = statusStyle(project.status)
  const StatusIcon = s.icon
  const hasBudget = project.budgetMin || project.budgetMax
  const budgetText = hasBudget
    ? `$${(project.budgetMin / 100).toLocaleString()} – $${(project.budgetMax / 100).toLocaleString()}`
    : 'Budget TBD'
  const urgencyLabel = URGENCY_LABELS[project.urgency] ?? project.urgency

  return (
    <article
      style={{ backgroundColor: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '22px 24px', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = '#242424'; el.style.boxShadow = '0 6px 28px rgba(0,0,0,0.4)'; el.style.transform = 'translateY(-1px)' }}
      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = '#1a1a1a'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em', marginBottom: '3px' }}>{project.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: '#374151', fontWeight: 600, backgroundColor: '#131313', border: '1px solid #1a1a1a', padding: '2px 8px', borderRadius: '100px' }}>{project.category}</span>
            <span style={{ fontSize: '11px', color: '#374151' }}>·</span>
            <span style={{ fontSize: '11px', color: '#374151' }}>{urgencyLabel}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 11px', backgroundColor: s.bg, border: s.border, borderRadius: '100px', flexShrink: 0 }}>
          <StatusIcon size={11} color={s.color} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.65, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '12px', borderTop: '1px solid #131313', alignItems: 'center' }}>
        {project.address && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={11} color="#374151" />
            <span style={{ fontSize: '12px', color: '#374151' }}>{project.address}</span>
          </div>
        )}
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ fontSize: '16px', fontWeight: 800, background: 'linear-gradient(135deg, #22c55e, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.02em', lineHeight: 1 }}>{budgetText}</p>
          <p style={{ fontSize: '11px', color: '#374151', marginTop: '2px' }}>
            {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {project.status === 'claimed' && project.claimedByName && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', padding: '10px 14px', backgroundColor: 'rgba(34,197,94,0.05)', borderRadius: '10px', border: '1px solid rgba(34,197,94,0.1)' }}>
          <Hammer size={13} color="#22c55e" />
          <span style={{ fontSize: '13px', color: '#4ade80' }}>
            Claimed by <strong style={{ color: '#ffffff' }}>{project.claimedByName}</strong> — they will contact you soon.
          </span>
        </div>
      )}
    </article>
  )
}

export default function HomeownerDashboard() {
  const [showForm, setShowForm] = useState(false)
  const { data: requestsData, isLoading } = useSWR<{ projects: Project[] }>('/api/requests', fetcher)
  const { data: meData } = useSWR<{ user: User }>('/api/auth/me', fetcher)

  const projects = requestsData?.projects ?? []
  const user = meData?.user
  const stats = {
    total: projects.length,
    open: projects.filter((p) => p.status === 'open').length,
    claimed: projects.filter((p) => p.status === 'claimed').length,
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080808' }}>
      {/* Top nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #141414' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(34,197,94,0.2)' }}>
              <Zap size={17} color="#080808" fill="#080808" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#22c55e' }}>
                    {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }} className="desktop-name">{user.name}</span>
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

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '4px' }}>Your Projects</h1>
            <p style={{ fontSize: '14px', color: '#374151' }}>
              {user ? `Welcome back, ${user.name.split(' ')[0]}.` : 'Track your submitted project requests.'}
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '11px 20px',
              background: showForm ? 'transparent' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: showForm ? '#6b7280' : '#080808',
              fontWeight: 700, fontSize: '13px', borderRadius: '10px',
              border: showForm ? '1px solid #1e1e1e' : 'none',
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: showForm ? 'none' : '0 2px 14px rgba(34,197,94,0.2)',
              transition: 'all 0.2s',
            }}
          >
            {showForm ? <X size={14} /> : <Plus size={14} />}
            {showForm ? 'Cancel' : 'New Project'}
          </button>
        </div>

        {/* Stats row */}
        {projects.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
            {[
              { label: 'Total Submitted', value: stats.total, color: '#ffffff',   icon: FileText,   bg: 'rgba(255,255,255,0.04)',  border: '#1e1e1e' },
              { label: 'Awaiting Match',  value: stats.open,  color: '#60a5fa',   icon: Clock,      bg: 'rgba(59,130,246,0.05)',   border: 'rgba(59,130,246,0.15)' },
              { label: 'Matched',         value: stats.claimed, color: '#4ade80', icon: TrendingUp, bg: 'rgba(34,197,94,0.06)',    border: 'rgba(34,197,94,0.15)' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, borderRadius: '14px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', transition: 'transform 0.2s' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={s.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: '26px', fontWeight: 900, color: s.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: '11px', color: '#374151', fontWeight: 600, marginTop: '3px' }}>{s.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Submission form */}
        {showForm && (
          <NewProjectForm
            onClose={() => setShowForm(false)}
            onCreated={() => mutate('/api/requests')}
          />
        )}

        {/* Project list */}
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: '130px', borderRadius: '16px' }} className="skeleton" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', border: '1px dashed #1a1a1a', borderRadius: '20px', textAlign: 'center', transition: 'border-color 0.2s' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#0d0d0d', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <FolderOpen size={24} color="#2a2a2a" />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#4b5563', marginBottom: '8px' }}>No projects yet</p>
            <p style={{ fontSize: '14px', color: '#2a2a2a', marginBottom: '24px', maxWidth: '320px', lineHeight: 1.7 }}>
              Submit your first project to get matched with a verified local contractor within 24 hours.
            </p>
            <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 22px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#080808', fontWeight: 700, fontSize: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 14px rgba(34,197,94,0.2)' }}>
              <Plus size={15} /> Submit a Project
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
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
        @media (max-width: 600px) {
          .desktop-name { display: none !important; }
        }
      `}</style>
    </div>
  )
export default async function HomeownerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user's projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const userProfile = {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    role: user.user_metadata?.role || 'homeowner',
  }

  return <HomeownerDashboardClient user={userProfile} initialProjects={projects || []} />
}
