import type { User } from './auth'

export interface Project {
  id: string
  homeownerId: string
  title: string
  category: string
  description: string
  budget: number
  status: 'open' | 'claimed' | 'completed' | 'cancelled'
  claimedBy?: string
  photos: string[]
  createdAt: Date
  updatedAt: Date
}

// Mock in-memory store for development
const users = new Map<string, User>()
const projects = new Map<string, Project>()

// Seed data
export function initializeStore() {
  // Sample users
  const homeowner: User = {
    id: 'h1',
    email: 'john@example.com',
    role: 'homeowner',
    name: 'John Homeowner',
    createdAt: new Date('2024-01-01'),
  }

  const contractor: User = {
    id: 'c1',
    email: 'contractor@example.com',
    role: 'contractor',
    name: 'Elite Contractors LLC',
    createdAt: new Date('2024-01-15'),
  }

  users.set(homeowner.id, homeowner)
  users.set(contractor.id, contractor)

  // Sample projects
  const project1: Project = {
    id: 'p1',
    homeownerId: 'h1',
    title: 'Tree Removal - Large Oak',
    category: 'Tree Removal',
    description: 'Need to remove a large oak tree in backyard. About 60 feet tall.',
    budget: 2500,
    status: 'open',
    photos: [],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  }

  const project2: Project = {
    id: 'p2',
    homeownerId: 'h1',
    title: 'Roof Repair',
    category: 'Roofing',
    description: 'Roof leak in master bedroom, needs inspection and repair.',
    budget: 1500,
    status: 'open',
    photos: [],
    createdAt: new Date('2024-03-16'),
    updatedAt: new Date('2024-03-16'),
  }

  projects.set(project1.id, project1)
  projects.set(project2.id, project2)
}

export function getUser(id: string): User | undefined {
  return users.get(id)
}

export function getUserByEmail(email: string): User | undefined {
  return Array.from(users.values()).find(u => u.email === email)
}

export function createUser(user: Omit<User, 'createdAt'>): User {
  const newUser = { ...user, createdAt: new Date() }
  users.set(newUser.id, newUser)
  return newUser
}

export function getProjects(filter?: { status?: string; category?: string }): Project[] {
  let result = Array.from(projects.values())

  if (filter?.status) {
    result = result.filter(p => p.status === filter.status)
  }

  if (filter?.category) {
    result = result.filter(p => p.category === filter.category)
  }

  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getProject(id: string): Project | undefined {
  return projects.get(id)
}

export function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
  const newProject = {
    ...project,
    id: `p${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  projects.set(newProject.id, newProject)
  return newProject
}

export function updateProject(id: string, updates: Partial<Project>): Project | undefined {
  const project = projects.get(id)
  if (!project) return undefined

  const updated = { ...project, ...updates, updatedAt: new Date() }
  projects.set(id, updated)
  return updated
}

export function claimProject(projectId: string, contractorId: string): Project | undefined {
  return updateProject(projectId, {
    status: 'claimed',
    claimedBy: contractorId,
  })
}

// Initialize on load
initializeStore()
