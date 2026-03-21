import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  passwordHash: string
  role: 'homeowner' | 'contractor'
  name: string
  phone?: string
  company?: string
  plan?: 'standard' | 'premium' | 'elite' | null
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  subscriptionStatus?: 'active' | 'inactive' | 'canceled' | null
  createdAt: string
}

export interface Session {
  userId: string
  user: Omit<User, 'passwordHash'>
}

// In-memory stores — replace with a real DB in production
export const userStore = new Map<string, User>()
const sessionStore = new Map<string, Session>()

// Seed demo users
function seedUsers() {
  if (userStore.size > 0) return
  const now = new Date().toISOString()

  const homeownerHash = bcrypt.hashSync('password123', 10)
  userStore.set('user-homeowner-1', {
    id: 'user-homeowner-1',
    email: 'homeowner@demo.com',
    passwordHash: homeownerHash,
    role: 'homeowner',
    name: 'Alex Johnson',
    phone: '785-555-0101',
    createdAt: now,
  })

  const contractorHash = bcrypt.hashSync('password123', 10)
  userStore.set('user-contractor-1', {
    id: 'user-contractor-1',
    email: 'contractor@demo.com',
    passwordHash: contractorHash,
    role: 'contractor',
    name: 'Mike Torres',
    phone: '785-555-0202',
    company: 'Torres Home Services',
    plan: 'premium',
    subscriptionStatus: 'active',
    createdAt: now,
  })
}

seedUsers()

export function getUserByEmail(email: string): User | undefined {
  for (const user of userStore.values()) {
    if (user.email.toLowerCase() === email.toLowerCase()) return user
  }
}

export function getUserById(id: string): User | undefined {
  return userStore.get(id)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('nexops_session')?.value
  if (!sessionId) return null
  return sessionStore.get(sessionId) ?? null
}

export async function createSession(user: User): Promise<void> {
  const { passwordHash: _ph, ...safeUser } = user
  const sessionId = crypto.randomUUID()
  sessionStore.set(sessionId, { userId: user.id, user: safeUser })

  const cookieStore = await cookies()
  cookieStore.set('nexops_session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('nexops_session')?.value
  if (sessionId) sessionStore.delete(sessionId)
  cookieStore.delete('nexops_session')
}
