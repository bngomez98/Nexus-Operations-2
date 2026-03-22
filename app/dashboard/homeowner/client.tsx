'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LogOut, Building2, Plus, AlertCircle, X, CheckCircle2,
  Clock, MapPin, ChevronDown, Hammer
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Project {
  id: string
  title: string
  description: string
  category: string
  budget_min: number | null
  budget_max: number | null
  address: string | null
  urgency: string
  status: string
  claimed_by: string | null
  created_at: string
}

interface User {
  id: string
  email: string
  name: string
  role: string
}

const CATEGORIES = [
  'Tree Removal', 'Concrete Work', 'Roofing', 'HVAC', 'Fencing',
  'Electrical', 'Plumbing', 'Excavation', 'Landscaping', 'Deck / Patio',
  'Painting', 'Flooring', 'General Contracting', 'Other',
]

const URGENCY_OPTIONS = [
  { value: 'low', label: 'Flexible timeline' },
  { value: 'normal', label: 'Within a month' },
  { value: 'high', label: 'Within a week' },
  { value: 'urgent', label: 'As soon as possible' },
]

function statusStyle(status: string) {
  if (status === 'pending') return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', label: 'Awaiting Contractor' }
  if (status === 'claimed') return { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', label: 'Contractor Matched' }
  if (status === 'in_progress') return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', label: 'In Progress' }
  if (status === 'completed') return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', label: 'Completed' }
  return { bg: 'bg-muted/10', text: 'text-muted', border: 'border-muted/20', label: 'Unknown' }
}

function NewProjectForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0],
    description: '',
    budgetMin: '',
    budgetMax: '',
    address: '',
    urgency: 'normal',
  })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be logged in to submit a project.')
        return
      }

      const { error: insertError } = await supabase.from('projects').insert({
        user_id: user.id,
        title: form.title,
        category: form.category,
        description: form.description,
        budget_min: form.budgetMin ? parseInt(form.budgetMin) : null,
        budget_max: form.budgetMax ? parseInt(form.budgetMax) : null,
        address: form.address || null,
        urgency: form.urgency,
        status: 'pending',
      })

      if (insertError) {
        setError(insertError.message)
        return
      }

      onCreated()
      onClose()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-9 mb-8">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-xl font-bold text-foreground">Submit a New Project</h2>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center bg-transparent border border-border rounded-lg cursor-pointer text-muted hover:text-foreground">
          <X size={18} />
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Project Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            placeholder="e.g. Tree Removal — Large Oak in Backyard"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Category *</label>
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-3.5 pr-10 bg-background border border-border rounded-xl text-foreground text-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-primary/40"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Timeline</label>
            <div className="relative">
              <select
                value={form.urgency}
                onChange={(e) => set('urgency', e.target.value)}
                className="w-full px-4 py-3.5 pr-10 bg-background border border-border rounded-xl text-foreground text-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-primary/40"
              >
                {URGENCY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            required
            rows={4}
            placeholder="Describe the scope of work, access, any special requirements..."
            className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground text-sm outline-none resize-y leading-relaxed focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Min Budget ($)</label>
            <input
              type="number"
              min="0"
              value={form.budgetMin}
              onChange={(e) => set('budgetMin', e.target.value)}
              className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Max Budget ($)</label>
            <input
              type="number"
              min="0"
              value={form.budgetMax}
              onChange={(e) => set('budgetMax', e.target.value)}
              className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="5000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="123 Main St, Topeka, KS 66601"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-border mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-transparent border border-border text-muted text-sm font-semibold rounded-xl cursor-pointer hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-7 py-3 bg-primary text-primary-fg text-sm font-bold rounded-xl border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : <><Plus size={16} /> Submit Project</>}
          </button>
        </div>
      </form>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const s = statusStyle(project.status)
  const hasBudget = project.budget_min || project.budget_max
  const budgetText = hasBudget
    ? `$${(project.budget_min || 0).toLocaleString()} – $${(project.budget_max || 0).toLocaleString()}`
    : 'Budget TBD'

  return (
    <article className="bg-card border border-border rounded-2xl p-7">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground mb-1">{project.title}</h3>
          <span className="text-xs text-muted font-medium">{project.category}</span>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 ${s.bg} border ${s.border} rounded-full shrink-0`}>
          {project.status === 'pending' ? <Clock size={12} className={s.text} /> : <CheckCircle2 size={12} className={s.text} />}
          <span className={`text-xs font-bold ${s.text} whitespace-nowrap`}>{s.label}</span>
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-4 pt-3.5 border-t border-border items-center">
        {project.address && (
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-muted" />
            <span className="text-xs text-muted">{project.address}</span>
          </div>
        )}
        <div className="ml-auto text-right">
          <p className="text-lg font-extrabold text-primary">{budgetText}</p>
          <p className="text-xs text-muted mt-0.5">
            {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {project.status === 'claimed' && project.claimed_by && (
        <div className="flex items-center gap-2 mt-3.5 p-3 bg-primary/5 rounded-xl border border-primary/10">
          <Hammer size={14} className="text-primary" />
          <span className="text-sm text-primary">
            A contractor has claimed this project and will contact you soon.
          </span>
        </div>
      )}
    </article>
  )
}

export default function HomeownerDashboardClient({ user, initialProjects }: { user: User; initialProjects: Project[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [projects, setProjects] = useState(initialProjects)

  const stats = {
    total: projects.length,
    pending: projects.filter((p) => p.status === 'pending').length,
    claimed: projects.filter((p) => p.status === 'claimed' || p.status === 'in_progress').length,
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  async function refreshProjects() {
    const supabase = createClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (data) setProjects(data)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Building2 size={18} className="text-primary-fg" />
            </div>
            <span className="text-base font-bold text-foreground">Nexus <span className="text-primary">Operations</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted hidden sm:inline">{user.name}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-border text-muted text-sm font-medium rounded-lg cursor-pointer hover:text-foreground"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header row */}
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-1">
              Your Projects
            </h1>
            <p className="text-sm text-muted">
              Welcome back, {user.name.split(' ')[0]}. Manage your project submissions below.
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-fg font-bold text-sm rounded-xl border-none cursor-pointer hover:bg-primary/90"
          >
            <Plus size={18} /> New Project
          </button>
        </div>

        {/* Stats */}
        {projects.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Submitted', value: stats.total, color: 'text-foreground' },
              { label: 'Awaiting Contractor', value: stats.pending, color: 'text-blue-400' },
              { label: 'Contractor Matched', value: stats.claimed, color: 'text-primary' },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-2xl p-5 text-center">
                <p className={`text-4xl font-extrabold ${s.color} tracking-tight mb-1`}>{s.value}</p>
                <p className="text-xs text-muted font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Submission form */}
        {showForm && (
          <NewProjectForm
            onClose={() => setShowForm(false)}
            onCreated={refreshProjects}
          />
        )}

        {/* Project list */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 border border-dashed border-border rounded-2xl text-center">
            <AlertCircle size={44} className="text-muted mb-4" />
            <p className="text-lg font-bold text-muted mb-2">No projects yet</p>
            <p className="text-sm text-muted mb-5">Submit your first project to get matched with a verified local contractor.</p>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-fg font-bold text-sm rounded-xl border-none cursor-pointer"
            >
              <Plus size={16} /> Submit a Project
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
