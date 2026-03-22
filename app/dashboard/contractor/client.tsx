'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LogOut, Building2, AlertCircle, Filter, MapPin, Clock, 
  CheckCircle2, Crown, ArrowRight, TrendingUp
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
  created_at: string
}

interface User {
  id: string
  email: string
  name: string
  role: string
  subscriptionTier: string | null
  subscriptionStatus: string
}

const ALL_CATS = [
  'All', 'Tree Removal', 'Concrete Work', 'Roofing', 'HVAC',
  'Fencing', 'Electrical', 'Plumbing', 'Excavation', 'Landscaping',
  'Deck / Patio', 'Painting', 'Flooring', 'General Contracting',
]

const URGENCY_LABELS: Record<string, string> = {
  low: 'Flexible',
  normal: 'Within Month',
  high: 'Within Week',
  urgent: 'ASAP',
}

function formatBudget(min: number | null, max: number | null) {
  if (!min && !max) return 'Budget TBD'
  if (!max) return `$${min?.toLocaleString()}+`
  return `$${(min || 0).toLocaleString()} – $${max.toLocaleString()}`
}

function urgencyColor(u: string) {
  if (u === 'urgent') return 'text-red-400'
  if (u === 'high') return 'text-orange-400'
  if (u === 'normal') return 'text-yellow-400'
  return 'text-muted'
}

function ProjectCard({
  project,
  onClaim,
  claiming,
  hasActivePlan,
}: {
  project: Project
  onClaim: (id: string) => void
  claiming: string | null
  hasActivePlan: boolean
}) {
  const isClaiming = claiming === project.id

  return (
    <article className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-5 hover:border-primary/30 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-2 border border-primary/20">
            {project.category}
          </span>
          <h3 className="text-base font-bold text-foreground leading-tight">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className={`w-1.5 h-1.5 rounded-full ${urgencyColor(project.urgency).replace('text-', 'bg-')}`} />
          <span className={`text-xs font-semibold ${urgencyColor(project.urgency)}`}>
            {URGENCY_LABELS[project.urgency] || project.urgency}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Meta */}
      <div className="flex flex-col gap-2">
        {project.address && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-muted" />
            <span className="text-sm text-muted">{project.address}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-muted" />
          <span className="text-sm text-muted">
            {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Budget */}
      <div className="bg-background rounded-xl p-4 border border-border">
        <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Budget Range</p>
        <p className="text-2xl font-extrabold text-primary tracking-tight">
          {formatBudget(project.budget_min, project.budget_max)}
        </p>
      </div>

      {/* Claim button */}
      <button
        onClick={() => onClaim(project.id)}
        disabled={!hasActivePlan || isClaiming}
        className={`flex items-center justify-center gap-2 py-3.5 font-bold text-sm rounded-xl border-none cursor-pointer transition-all ${
          hasActivePlan
            ? 'bg-primary text-primary-fg hover:bg-primary/90'
            : 'bg-border text-muted cursor-not-allowed'
        } disabled:opacity-60`}
      >
        {isClaiming ? (
          'Claiming...'
        ) : hasActivePlan ? (
          <><CheckCircle2 size={16} /> Claim This Project</>
        ) : (
          'Activate Plan to Claim'
        )}
      </button>
    </article>
  )
}

export default function ContractorDashboardClient({ user, initialProjects }: { user: User; initialProjects: Project[] }) {
  const router = useRouter()
  const [category, setCategory] = useState('All')
  const [claiming, setClaiming] = useState<string | null>(null)
  const [claimError, setClaimError] = useState('')
  const [projects, setProjects] = useState(initialProjects)

  const hasPlan = user.subscriptionStatus === 'active'
  const filteredProjects = category === 'All' 
    ? projects 
    : projects.filter(p => p.category === category)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  async function handleClaim(projectId: string) {
    if (!hasPlan) {
      router.push('/dashboard/contractor/subscribe')
      return
    }

    setClaimError('')
    setClaiming(projectId)
    
    try {
      const supabase = createClient()
      
      // Update project status
      const { error: updateError } = await supabase
        .from('projects')
        .update({ 
          status: 'claimed', 
          claimed_by: user.id,
          claimed_at: new Date().toISOString()
        })
        .eq('id', projectId)
        .eq('status', 'pending')

      if (updateError) {
        setClaimError(updateError.message)
        return
      }

      // Create lead record
      await supabase.from('leads').insert({
        project_id: projectId,
        contractor_id: user.id,
        status: 'claimed',
      })

      // Remove from local state
      setProjects(prev => prev.filter(p => p.id !== projectId))
    } catch {
      setClaimError('Failed to claim project. Please try again.')
    } finally {
      setClaiming(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Building2 size={18} className="text-primary-fg" />
            </div>
            <span className="text-base font-bold text-foreground">Nexus <span className="text-primary">Operations</span></span>
          </Link>

          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">{user.name}</p>
              <p className="text-xs text-muted">
                {user.subscriptionTier ? `${user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan` : 'No active plan'}
              </p>
            </div>

            {!hasPlan && (
              <Link
                href="/dashboard/contractor/subscribe"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-sm font-semibold rounded-lg no-underline hover:bg-primary/20"
              >
                <Crown size={16} /> Get a Plan
              </Link>
            )}

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-border text-muted text-sm font-medium rounded-lg cursor-pointer hover:text-foreground"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Subscription upsell banner */}
        {!hasPlan && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-9 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Crown size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground mb-1">Activate your membership to claim projects</p>
                <p className="text-sm text-primary">Plans start at $299/mo — flat rate, unlimited claims, zero per-lead fees.</p>
              </div>
            </div>
            <Link
              href="/dashboard/contractor/subscribe"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-fg font-bold text-sm rounded-xl no-underline whitespace-nowrap hover:bg-primary/90"
            >
              Choose a Plan <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Page header */}
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-1">
              Available Projects
            </h1>
            <p className="text-sm text-muted">
              {filteredProjects.length > 0 
                ? `${filteredProjects.length} open project${filteredProjects.length !== 1 ? 's' : ''} in your area`
                : 'Browse exclusive project leads'
              }
            </p>
          </div>
          {hasPlan && user.subscriptionTier && (
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full">
              <TrendingUp size={16} className="text-primary" />
              <span className="text-sm text-primary font-semibold">
                {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} member
              </span>
            </div>
          )}
        </div>

        {claimError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 mb-6 text-sm text-red-400 flex items-center gap-3">
            <AlertCircle size={18} /> {claimError}
          </div>
        )}

        {/* Category filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-muted" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border cursor-pointer transition-all ${
                  category === cat 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border bg-card text-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 border border-dashed border-border rounded-2xl text-center">
            <AlertCircle size={44} className="text-muted mb-4" />
            <p className="text-lg font-bold text-muted mb-2">No open projects</p>
            <p className="text-sm text-muted">Check back soon or try a different category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClaim={handleClaim}
                claiming={claiming}
                hasActivePlan={hasPlan}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
