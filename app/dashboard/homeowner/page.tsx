'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import {
  LogOut, Zap, Plus, AlertCircle, X, CheckCircle2,
  Clock, MapPin, ChevronDown, Hammer
} from 'lucide-react'
import type { Project } from '@/lib/store'
import { CATEGORIES, URGENCY_LABELS } from '@/lib/store'
import type { User } from '@/lib/auth'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const URGENCY_OPTIONS = [
  { value: 'flexible', label: 'Flexible timeline' },
  { value: 'within_month', label: 'Within a month' },
  { value: 'within_week', label: 'Within a week' },
  { value: 'asap', label: 'As soon as possible' },
]

function statusStyle(status: Project['status']) {
  if (status === 'open') return { bg: 'rgba(59,130,246,0.08)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', label: 'Open — Awaiting Contractor' }
  if (status === 'claimed') return { bg: 'rgba(34,197,94,0.08)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)', label: 'Claimed' }
  return { bg: 'rgba(107,114,128,0.08)', color: '#6b7280', border: '1px solid rgba(107,114,128,0.2)', label: 'Completed' }
}

const inp: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#111111',
  border: '1px solid #222222',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'inherit',
}

function NewProjectForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0] as string,
    description: '',
    budgetMin: '',
    budgetMax: '',
    address: '',
    urgency: 'flexible',
  })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          budgetMin: form.budgetMin ? Math.round(parseFloat(form.budgetMin) * 100) : 0,
          budgetMax: form.budgetMax ? Math.round(parseFloat(form.budgetMax) * 100) : 0,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Submission failed.'); return }
      onCreated()
      onClose()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: '20px', padding: '36px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.015em' }}>Submit a New Project</h2>
        <button
          onClick={onClose}
          style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid #222222', borderRadius: '8px', cursor: 'pointer', color: '#6b7280', fontFamily: 'inherit' }}
        >
          <X size={16} />
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#f87171' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Project Title *</label>
          <input style={inp} type="text" value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="e.g. Tree Removal — Large Oak in Backyard" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Category *</label>
            <div style={{ position: 'relative' }}>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                style={{ ...inp, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={15} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Timeline</label>
            <div style={{ position: 'relative' }}>
              <select
                value={form.urgency}
                onChange={(e) => set('urgency', e.target.value)}
                style={{ ...inp, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
              >
                {URGENCY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={15} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            required
            rows={4}
            placeholder="Describe the scope of work, access, any special requirements..."
            style={{ ...inp, resize: 'vertical', lineHeight: 1.65 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Min Budget ($)</label>
            <input style={inp} type="number" min="0" value={form.budgetMin} onChange={(e) => set('budgetMin', e.target.value)} placeholder="500" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Max Budget ($)</label>
            <input style={inp} type="number" min="0" value={form.budgetMax} onChange={(e) => set('budgetMax', e.target.value)} placeholder="5000" />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Address</label>
          <input style={inp} type="text" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="123 Main St, Topeka, KS 66601" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px', borderTop: '1px solid #1a1a1a' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid #222222', color: '#9ca3af', fontSize: '14px', fontWeight: 600, borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{ padding: '12px 28px', backgroundColor: '#22c55e', color: '#0a0a0a', fontSize: '14px', fontWeight: 700, borderRadius: '10px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: submitting ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '7px' }}
          >
            {submitting ? 'Submitting…' : <><Plus size={15} /> Submit Project</>}
          </button>
        </div>
      </form>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const s = statusStyle(project.status)
  const hasBudget = project.budgetMin || project.budgetMax
  const budgetText = !hasBudget
    ? 'Budget TBD'
    : !project.budgetMax
    ? `$${(project.budgetMin / 100).toLocaleString()}+`
    : !project.budgetMin
    ? `Up to $${(project.budgetMax / 100).toLocaleString()}`
    : `$${(project.budgetMin / 100).toLocaleString()} – $${(project.budgetMax / 100).toLocaleString()}`

  return (
    <article style={{ backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em', marginBottom: '4px' }}>{project.title}</h3>
          <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: 500 }}>{project.category}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: s.bg, border: s.border, borderRadius: '100px', flexShrink: 0 }}>
          {project.status === 'open' ? <Clock size={12} color={s.color} /> : <CheckCircle2 size={12} color={s.color} />}
          <span style={{ fontSize: '11px', fontWeight: 700, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.65, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingTop: '14px', borderTop: '1px solid #141414', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={13} color="#4b5563" />
          <span style={{ fontSize: '12px', color: '#4b5563' }}>{project.address}</span>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ fontSize: '16px', fontWeight: 800, color: '#22c55e', letterSpacing: '-0.02em', lineHeight: 1 }}>{budgetText}</p>
          <p style={{ fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>
            {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {project.status === 'claimed' && project.claimedByName && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', padding: '10px 14px', backgroundColor: 'rgba(34,197,94,0.06)', borderRadius: '10px', border: '1px solid rgba(34,197,94,0.12)' }}>
          <Hammer size={14} color="#22c55e" />
          <span style={{ fontSize: '13px', color: '#4ade80' }}>
            Claimed by <strong>{project.claimedByName}</strong> — they will contact you soon.
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
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#0a0a0a" fill="#0a0a0a" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Nexus<span style={{ color: '#22c55e' }}>Ops</span></span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user && <span style={{ fontSize: '13px', color: '#4b5563' }}>{user.name}</span>}
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'none', border: '1px solid #222222', color: '#6b7280', fontSize: '13px', fontWeight: 500, borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
                <LogOut size={14} /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '6px' }}>
              Your Projects
            </h1>
            <p style={{ fontSize: '14px', color: '#4b5563' }}>
              {user ? `Welcome back, ${user.name.split(' ')[0]}.` : 'Track your submitted project requests.'}
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 22px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <Plus size={16} /> New Project
          </button>
        </div>

        {/* Stats */}
        {projects.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Total Submitted', value: stats.total, color: '#ffffff' },
              { label: 'Awaiting Contractor', value: stats.open, color: '#60a5fa' },
              { label: 'Contractor Matched', value: stats.claimed, color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '14px', padding: '20px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: '30px', fontWeight: 800, color: s.color, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '6px' }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: '#4b5563', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: '120px', borderRadius: '16px', backgroundColor: '#0e0e0e', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', border: '1px dashed #1e1e1e', borderRadius: '20px', textAlign: 'center' }}>
            <AlertCircle size={40} color="#2a2a2a" style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '17px', fontWeight: 700, color: '#4b5563', marginBottom: '8px' }}>No projects yet</p>
            <p style={{ fontSize: '14px', color: '#2d2d2d', marginBottom: '20px' }}>Submit your first project to get matched with a verified local contractor.</p>
            <button
              onClick={() => setShowForm(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 22px', backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 700, fontSize: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <Plus size={15} /> Submit a Project
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
