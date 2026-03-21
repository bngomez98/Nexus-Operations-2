'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { LogOut, Building2, Plus, AlertCircle, X, CheckCircle2, Clock, Hammer } from 'lucide-react'
import type { Project } from '@/lib/store'
import type { User } from '@/lib/auth'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const CATEGORIES = [
  'Tree Removal',
  'Concrete Work',
  'Roofing',
  'HVAC',
  'Fencing',
  'Electrical',
  'Plumbing',
  'Excavation',
]

const STATUS_STYLES: Record<string, { label: string; className: string; icon: typeof Clock }> = {
  open: {
    label: 'Open',
    className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
    icon: Clock,
  },
  claimed: {
    label: 'Claimed',
    className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    icon: CheckCircle2,
  },
  completed: {
    label: 'Completed',
    className: 'bg-neutral-100 text-neutral-500 ring-1 ring-neutral-200',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-600 ring-1 ring-red-200',
    icon: X,
  },
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.open
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.className}`}>
      <Icon className="w-3 h-3" />
      {s.label}
    </span>
  )
}

interface NewProjectFormProps {
  onClose: () => void
  onCreated: () => void
}

function NewProjectForm({ onClose, onCreated }: NewProjectFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0],
    description: '',
    budget: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, budget: Number(form.budget) }),
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

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Submit a New Project</h2>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-[var(--color-muted)] transition-colors">
          <X className="w-5 h-5 text-[var(--color-muted-foreground)]" />
          <span className="sr-only">Close form</span>
        </button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Tree Removal – Large Oak in Backyard"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
              Budget (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] text-sm">$</span>
              <input
                id="budget"
                name="budget"
                type="number"
                min="100"
                value={form.budget}
                onChange={handleChange}
                required
                placeholder="2500"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe the scope of work, any special requirements, and your timeline..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Project'}
          </button>
        </div>
      </form>
    </div>
  )
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 hover:shadow-sm transition-shadow">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-semibold text-[var(--color-foreground)] truncate">{project.title}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-[var(--color-muted-foreground)]">{project.category}</p>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1.5 line-clamp-2">{project.description}</p>
        {project.status === 'claimed' && project.claimedByName && (
          <p className="text-sm text-emerald-700 mt-2 flex items-center gap-1.5">
            <Hammer className="w-3.5 h-3.5" />
            Claimed by <span className="font-medium">{project.claimedByName}</span>
          </p>
        )}
      </div>
      <div className="shrink-0 text-right sm:text-right">
        <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">Budget</p>
        <p className="text-xl font-bold text-[var(--color-foreground)]">${project.budget.toLocaleString()}</p>
        <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
          {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
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
    open: projects.filter(p => p.status === 'open').length,
    claimed: projects.filter(p => p.status === 'claimed').length,
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-[var(--color-foreground)]">
            <Building2 className="w-6 h-6 text-[var(--color-primary)]" />
            <span className="text-lg">Nexus Ops</span>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden sm:block text-sm text-[var(--color-muted-foreground)]">{user.name}</span>
            )}
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] rounded-md hover:bg-[var(--color-muted)] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Your Projects</h1>
            <p className="text-[var(--color-muted-foreground)] text-sm mt-1">
              Track your submitted projects and contractor responses.
            </p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* Stats */}
        {projects.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total', value: stats.total },
              { label: 'Awaiting Contractor', value: stats.open },
              { label: 'Claimed', value: stats.claimed },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 text-center">
                <p className="text-2xl font-bold text-[var(--color-foreground)]">{stat.value}</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* New project form */}
        {showForm && (
          <NewProjectForm
            onClose={() => setShowForm(false)}
            onCreated={() => mutate('/api/requests')}
          />
        )}

        {/* Projects list */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-28 rounded-xl bg-[var(--color-muted)] animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[var(--color-border)] rounded-xl text-center">
            <AlertCircle className="w-10 h-10 text-[var(--color-muted-foreground)] mb-3" />
            <p className="font-medium text-[var(--color-foreground)]">No projects yet</p>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
              Submit your first project to start receiving contractor responses.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-sm font-semibold hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Submit a Project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map(project => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
