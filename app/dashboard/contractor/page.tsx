'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LogOut, Plus, AlertCircle, Home } from 'lucide-react'
import { Project } from '@/lib/store'

interface ProjectWithStatus extends Project {
  claimedByName?: string
}

export default function ContractorDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user info
        const userRes = await fetch('/api/auth/me')
        if (userRes.ok) {
          const { user } = await userRes.json()
          setUser(user)
        }

        // Get leads
        const leadsRes = await fetch('/api/leads')
        if (leadsRes.ok) {
          const { projects } = await leadsRes.json()
          setProjects(projects || [])
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const categories = [...new Set(projects.map(p => p.category))]

  const claimProject = async (projectId: string) => {
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })

      if (res.ok) {
        const { project } = await res.json()
        setProjects(prev => prev.map(p => p.id === projectId ? project : p))
      }
    } catch (error) {
      console.error('Failed to claim project:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-foreground text-xl">
            <Home className="w-6 h-6" />
            Nexus Ops
          </Link>
          <div className="flex items-center gap-4">
            {user && <span className="text-sm text-muted-foreground">{user.name}</span>}
            <form action="/api/auth/logout" method="POST">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Available Projects</h1>
          <p className="text-muted-foreground">Browse and claim projects from homeowners</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-border'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-muted">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No projects available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status === 'open' ? 'Open' : 'Claimed'}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Budget</p>
                  <p className="text-2xl font-bold text-foreground">${project.budget.toLocaleString()}</p>
                </div>

                <button
                  onClick={() => claimProject(project.id)}
                  disabled={project.status === 'claimed'}
                  className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {project.status === 'open' ? 'Claim Project' : 'Already Claimed'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
