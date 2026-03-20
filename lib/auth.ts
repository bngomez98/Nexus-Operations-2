import { cookies } from 'next/headers'

export interface User {
  id: string
  email: string
  role: 'homeowner' | 'contractor'
  name: string
  createdAt: Date
}

export interface Session {
  userId: string
  user: User
}

// Mock session store (production would use database/session management)
const sessionStore = new Map<string, Session>()

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value

  if (!sessionId) return null

  return sessionStore.get(sessionId) || null
}

export async function createSession(user: User): Promise<string> {
  const sessionId = Math.random().toString(36).substring(7)
  sessionStore.set(sessionId, { userId: user.id, user })

  const cookieStore = await cookies()
  cookieStore.set('sessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return sessionId
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value

  if (sessionId) {
    sessionStore.delete(sessionId)
  }

  cookieStore.delete('sessionId')
}
