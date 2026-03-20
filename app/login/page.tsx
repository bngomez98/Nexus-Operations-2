'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Login failed')
        return
      }

      const { user } = await res.json()
      router.push(`/dashboard/${user.role}`)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-8 h-8 text-secondary" />
            <span className="text-2xl font-bold text-foreground">Nexus Ops</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-background rounded-lg shadow-lg p-8 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-secondary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-background rounded-lg border border-border text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Demo Accounts:</p>
          <p>Homeowner: john@example.com / password</p>
          <p>Contractor: contractor@example.com / password</p>
        </div>
      </div>
    </div>
  )
}
