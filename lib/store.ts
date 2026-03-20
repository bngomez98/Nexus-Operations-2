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
  claimedByName?: string
  photos: string[]
  createdAt: string
  updatedAt: string
}

// Serializable user for the store (no Date objects)
export interface StoredUser extends Omit<User, 'createdAt'> {
  password: string
  createdAt: string
}

const users = new Map<string, StoredUser>()
const projects = new Map<string, Project>()
let initialized = false

export function initializeStore() {
  if (initialized) return
  initialized = true

  const homeowner: StoredUser = {
    id: 'h1',
    email: 'john@example.com',
    password: 'password',
    role: 'homeowner',
    name: 'John Smith',
    createdAt: new Date('2024-01-01').toISOString(),
  }
  const contractor: StoredUser = {
    id: 'c1',
    email: 'contractor@example.com',
    password: 'password',
    role: 'contractor',
    name: 'Elite Contractors LLC',
    createdAt: new Date('2024-01-15').toISOString(),
  }
  users.set(homeowner.id, homeowner)
  users.set(contractor.id, contractor)

  const p1: Project = {
    id: 'p1',
    homeownerId: 'h1',
    title: 'Tree Removal – Large Oak',
    category: 'Tree Removal',
    description: 'Need to remove a 60-ft oak tree in the backyard. Stump grinding included if possible.',
    budget: 2500,
    status: 'open',
    photos: [],
    createdAt: new Date('2024-03-15').toISOString(),
    updatedAt: new Date('2024-03-15').toISOString(),
  }
  const p2: Project = {
    id: 'p2',
    homeownerId: 'h1',
    title: 'Roof Repair – Master Bedroom Leak',
    category: 'Roofing',
    description: 'Active leak above master bedroom after recent rain. Need inspection and patch.',
    budget: 1500,
    status: 'open',
    photos: [],
    createdAt: new Date('2024-03-16').toISOString(),
    updatedAt: new Date('2024-03-16').toISOString(),
  }
  const p3: Project = {
    id: 'p3',
    homeownerId: 'h1',
    title: 'Concrete Driveway Extension',
    category: 'Concrete Work',
    description: 'Extend existing driveway by 20 ft to accommodate a third vehicle.',
    budget: 4200,
    status: 'open',
    photos: [],
    createdAt: new Date('2024-03-17').toISOString(),
    updatedAt: new Date('2024-03-17').toISOString(),
  }
  projects.set(p1.id, p1)
  projects.set(p2.id, p2)
  projects.set(p3.id, p3)
}

export function getUserByEmail(email: string): StoredUser | undefined {
  return Array.from(users.values()).find(u => u.email === email)
}

export function getUserById(id: string): StoredUser | undefined {
  return users.get(id)
}

export function createUser(data: Omit<StoredUser, 'createdAt'>): StoredUser {
  const user: StoredUser = { ...data, createdAt: new Date().toISOString() }
  users.set(user.id, user)
  return user
}

export function getOpenProjects(category?: string): Project[] {
  let list = Array.from(projects.values()).filter(p => p.status === 'open')
  if (category && category !== 'all') list = list.filter(p => p.category === category)
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getProjectsByHomeowner(homeownerId: string): Project[] {
  return Array.from(projects.values())
    .filter(p => p.homeownerId === homeownerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getProject(id: string): Project | undefined {
  return projects.get(id)
}

export function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
  const now = new Date().toISOString()
  const project: Project = { ...data, id: `p${Date.now()}`, createdAt: now, updatedAt: now }
  projects.set(project.id, project)
  return project
}

export function claimProject(projectId: string, contractorId: string, contractorName: string): Project | undefined {
  const project = projects.get(projectId)
  if (!project || project.status !== 'open') return undefined
  const updated: Project = {
    ...project,
    status: 'claimed',
    claimedBy: contractorId,
    claimedByName: contractorName,
    updatedAt: new Date().toISOString(),
  }
  projects.set(projectId, updated)
  return updated
}

// Initialize on module load
initializeStore()
