'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { LogOut, Building2, AlertCircle, CheckCircle2, Filter } from 'lucide-react'
import type { Project } from '@/lib/store'
import type { User } from '@/lib/auth'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const CATEGORIES = [
  'All',
  'Tree Removal',
  'Concrete Work',
  'Roofing',
  'HVAC',
  'Fencing',
  'Electrical',
  'Plumbing',
  'Excavation',
]

function StatusBadge({ status }: { status: Project['status'] }) {
  const styles: Record<string, string> = {
    open: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    claimed: 'bg-neutral-100 text-neutral-500 ring-1 ring-neutral-200',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] ?? styles.claimed}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
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
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-[var(--color-foreground)] leading-snug truncate">{project.title}</h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-0.5">{project.category}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed line-clamp-3">{project.description}</p>

      <div className="rounded-lg bg-[var(--color-muted)] px-4 py-3">
        <p className="text-xs text-[var(--color-muted-foreground)] mb-0.5">Project Budget</p>
        <p className="text-2xl font-bold text-[var(--color-foreground)]">
          ${project.budget.toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => onClaim(project.id)}
        disabled={project.status !== 'open' || claiming === project.id}
        className="w-full py-2.5 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {claiming === project.id
          ? 'Claiming...'
          : project.status === 'open'
          ? 'Claim Project'
          : 'Already Claimed'}
      </button>
    </article>
  )
}

export default function ContractorDashboard() {
  const [category, setCategory] = useState('All')
  const [claiming, setClaiming] = useState<string | null>(null)

  const leadsKey = category === 'All' ? '/api/leads' : `/api/leads?category=${encodeURIComponent(category)}`
  const { data: leadsData, isLoading: leadsLoading } = useSWR<{ projects: Project[] }>(leadsKey, fetcher)
  const { data: meData } = useSWR<{ user: User }>('/api/auth/me', fetcher)

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
        mutate(leadsKey)
      }
    } finally {
      setClaiming(null)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-[var(--color-foreground)]">
            <Building2 className="w-6 h-6 text-[var(--color-primary)]" />
            <span className="text-lg">Nexus Ops</span>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden sm:block text-sm text-[var(--color-muted-foreground)]">
                {user.name}
              </span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Available Projects</h1>
          <p className="text-[var(--color-muted-foreground)] mt-1 text-sm">
            Browse open projects from homeowners. Claim one to lock it in exclusively.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-[var(--color-muted-foreground)]" />
            <span className="text-sm font-medium text-[var(--color-foreground)]">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                    : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        {leadsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-xl bg-[var(--color-muted)] animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[var(--color-border)] rounded-xl text-center">
            <AlertCircle className="w-10 h-10 text-[var(--color-muted-foreground)] mb-3" />
            <p className="font-medium text-[var(--color-foreground)]">No open projects</p>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
              Check back soon or try a different category.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
              {projects.length} project{projects.length !== 1 ? 's' : ''} available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClaim={handleClaim}
                  claiming={claiming}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
