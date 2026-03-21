'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate as globalMutate } from 'swr'
import { LogOut, Plus, AlertCircle, X, CheckCircle2, Clock, Wrench, Zap, MapPin } from 'lucide-react'
import { CATEGORIES, URGENCY_LABELS, type Project, type Urgency } from '@/lib/store'
import type { User } from '@/lib/auth'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  open:      { label: 'Open',      color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  claimed:   { label: 'Claimed',   color: '#60a5fa', bg: 'rgba(96,165,250,0.08)' },
  completed: { label: 'Completed', color: '#9ca3af', bg: 'rgba(156,163,175,0.08)' },
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '100px', backgroundColor: cfg.bg, border: `1px solid ${cfg.color}33`, fontSize: '11px', fontWeight: 600, color: cfg.color }}>
      {status === 'open' && <Clock size={10} />}
      {(status === 'claimed' || status === 'completed') && <CheckCircle2 size={10} />}
      {cfg.label}
    </span>
  )
}

function NewProjectModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    title: '', category: CATEGORIES[0] as string, description: '',
    budgetMin: '', budgetMax: '', address: '', urgency: 'flexible' as Urgency,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          budgetMin: Number(form.budgetMin) * 100,
          budgetMax: Number(form.budgetMax) * 100,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Failed to submit.'); return }
      onCreated()
      onClose()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inp: React.CSSProperties = { width: '100%', padding: '10px 14px', backgroundColor: '#111111', border: '1px solid #2a2a2a', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '580px', backgroundColor: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '20px', padding: '36px', maxHeight: '92vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>New Project</h2>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '3px' }}>Tell contractors exactly what you need</p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={15} />
          </button>
        </div>

        {error && (
          <div style={{ padding: '12px 14px', backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', fontSize: '13px', color: '#f87171', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={lbl}>Project Title</label>
            <input name="title" value={form.title} onChange={handle} required placeholder="e.g. Tree Removal – Large Oak in Backyard" style={inp} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={lbl}>Category</label>
              <select name="category" value={form.category} onChange={handle} style={inp}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Timeline</label>
              <select name="urgency" value={form.urgency} onChange={handle} style={inp}>
                {(Object.entries(URGENCY_LABELS) as [Urgency, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={lbl}>Budget Min ($)</label>
              <input name="budgetMin" type="number" min="0" value={form.budgetMin} onChange={handle} placeholder="1,000" style={inp} />
            </div>
            <div>
              <label style={lbl}>Budget Max ($)</label>
              <input name="budgetMax" type="number" min="0" value={form.budgetMax} onChange={handle} placeholder="5,000" style={inp} />
            </div>
          </div>

          <div>
            <label style={lbl}>Project Address</label>
            <input name="address" value={form.address} onChange={handle} placeholder="123 Main St, Topeka, KS 66601" style={inp} />
          </div>

          <div>
            <label style={lbl}>Description</label>
            <textarea name="description" value={form.description} onChange={handle} required rows={4} placeholder="Describe the scope of work, any special requirements, and timeline..." style={{ ...inp, resize: 'vertical' }} />
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', color: '#9ca3af', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={submitting} style={{ flex: 2, padding: '12px', backgroundColor: '#22c55e', border: 'none', borderRadius: '10px', color: '#0a0a0a', fontSize: '14px', fontWeight: 700, cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}>
              {submitting ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const budgetStr =
    project.budgetMin && project.budgetMax
      ? `$${(project.budgetMin / 100).toLocaleString()} – $${(project.budgetMax / 100).toLocaleString()}`
      : project.budgetMin
      ? `$${(project.budgetMin / 100).toLocaleString()}+`
      : 'TBD'

  return (
    <article style={{ backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em', marginBottom: '3px' }}>{project.title}</h3>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>{project.category}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.65, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6b7280', backgroundColor: '#141414', border: '1px solid #1e1e1e', borderRadius: '6px', padding: '4px 8px' }}>
          <MapPin size={10} color="#22c55e" /> {project.address}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6b7280', backgroundColor: '#141414', border: '1px solid #1e1e1e', borderRadius: '6px', padding: '4px 8px' }}>
          <Clock size={10} color="#22c55e" /> {URGENCY_LABELS[project.urgency]}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #1a1a1a' }}>
        <div>
          <p style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Budget</p>
          <p style={{ fontSize: '18px', fontWeight: 800, color: project.status === 'open' ? '#22c55e' : '#ffffff', letterSpacing: '-0.03em' }}>{budgetStr}</p>
        </div>
        {project.status === 'claimed' && project.claimedByName ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)', borderRadius: '8px', padding: '7px 10px' }}>
            <Wrench size={12} color="#60a5fa" />
            <span style={{ fontSize: '12px', color: '#93c5fd', fontWeight: 600 }}>{project.claimedByName}</span>
          </div>
        ) : (
          <p style={{ fontSize: '11px', color: '#4b5563' }}>
            {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        )}
      </div>
    </article>
  )
}

export default function HomeownerDashboard() {
  const [showModal, setShowModal] = useState(false)

  const { data: requestsData, isLoading } = useSWR<{ projects: Project[] }>('/api/requests', fetcher)
  const { data: meData } = useSWR<{ user: Omit<User, 'passwordHash'> }>('/api/auth/me', fetcher)

  const projects = requestsData?.projects ?? []
  const user = meData?.user

  const stats = [
    { label: 'Total', value: projects.length },
    { label: 'Open', value: projects.filter((p) => p.status === 'open').length },
    { label: 'Claimed', value: projects.filter((p) => p.status === 'claimed').length },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={17} color="#0a0a0a" fill="#0a0a0a" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
              Nexus<span style={{ color: '#22c55e' }}>Ops</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user && <span style={{ fontSize: '13px', color: '#6b7280' }}>{user.name}</span>}
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#9ca3af', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                <LogOut size={13} /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Homeowner Portal</p>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>Your Projects</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>Submit projects and track contractor responses.</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: '#22c55e', border: 'none', borderRadius: '10px', color: '#0a0a0a', fontSize: '14px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <Plus size={15} /> New Project
          </button>
        </div>

        {/* Stats */}
        {projects.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ backgroundColor: '#0e0e0e', border: '1px solid #1a1a1a', borderRadius: '14px', padding: '20px 24px' }}>
                <p style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Project grid */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {[1, 2].map((i) => (
              <div key={i} style={{ height: '220px', backgroundColor: '#0e0e0e', borderRadius: '16px', border: '1px solid #1a1a1a' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', border: '1px dashed #2a2a2a', borderRadius: '20px', textAlign: 'center' }}>
            <AlertCircle size={36} color="#2a2a2a" style={{ marginBottom: '16px' }} />
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>No projects yet</p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Submit your first project to get matched with a verified contractor.</p>
            <button onClick={() => setShowModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: '#22c55e', border: 'none', borderRadius: '10px', color: '#0a0a0a', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={15} /> Submit a Project
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </main>

      {showModal && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          onCreated={() => globalMutate('/api/requests')}
        />
      )}
    </div>
  )
}
