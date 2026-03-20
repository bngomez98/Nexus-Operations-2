import { cookies } from 'next/headers'

export interface User {
  id: string
  email: string
  role: 'homeowner' | 'contractor'
  name: string
  createdAt: string
}

export interface Session {
  userId: string
  user: User
}

// In-memory session store — persists across requests in the same process
const sessionStore = new Map<string, Session>()

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('nexops_session')?.value
  if (!sessionId) return null
  return sessionStore.get(sessionId) ?? null
}

export async function createSession(user: User): Promise<void> {
  const sessionId = crypto.randomUUID()
  sessionStore.set(sessionId, { userId: user.id, user })

  const cookieStore = await cookies()
  cookieStore.set('nexops_session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('nexops_session')?.value
  if (sessionId) sessionStore.delete(sessionId)
  cookieStore.delete('nexops_session')
}
