'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LogOut, Plus, AlertCircle, Home } from 'lucide-react'
import { Project } from '@/lib/store'

export default function HomeownerDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showNew, setShowNew] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tree Removal',
    description: '',
    budget: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user info
        const userRes = await fetch('/api/auth/me')
        if (userRes.ok) {
          const { user } = await userRes.json()
          setUser(user)
        }

        // Get requests
        const requestsRes = await fetch('/api/requests')
        if (requestsRes.ok) {
          const { projects } = await requestsRes.json()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          budget: parseInt(formData.budget),
        }),
      })

      if (res.ok) {
        const { project } = await res.json()
        setProjects(prev => [project, ...prev])
        setFormData({ title: '', category: 'Tree Removal', description: '', budget: '' })
        setShowNew(false)
      }
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  const categories = [
    'Tree Removal',
    'Concrete Work',
    'Roofing',
    'HVAC',
    'Fencing',
    'Electrical',
    'Plumbing',
    'Excavation',
  ]

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Projects</h1>
            <p className="text-muted-foreground">Submit new project requests and track contractor responses</p>
          </div>
          <button
            onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* New Project Form */}
        {showNew && (
          <div className="mb-8 p-6 border border-border rounded-lg bg-muted">
            <h2 className="text-lg font-semibold text-foreground mb-4">Submit a New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Tree Removal - Large Oak"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    placeholder="2500"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Provide details about your project..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNew(false)}
                  className="px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-all"
                >
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-muted">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No projects yet</p>
            <button
              onClick={() => setShowNew(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-all"
            >
              <Plus className="w-5 h-5" />
              Submit Your First Project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'open'
                      ? 'bg-blue-100 text-blue-700'
                      : project.status === 'claimed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Budget</p>
                    <p className="text-xl font-bold text-foreground">${project.budget.toLocaleString()}</p>
                  </div>
                  {project.status === 'claimed' && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Claimed by</p>
                      <p className="font-medium text-foreground">Contractor #{project.claimedBy?.slice(-4)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
