import { NextResponse } from 'next/server'
import { createSession, getUserByEmail, hashPassword, userStore, type User } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password, role, name, phone, company } = await request.json()

    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!['homeowner', 'contractor'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role.' }, { status: 400 })
    }
    if (getUserByEmail(email)) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const newUser: User = {
      id: `user-${role}-${Date.now()}`,
      email: email.toLowerCase().trim(),
      passwordHash,
      role,
      name: name.trim(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      plan: null,
      subscriptionStatus: null,
      createdAt: new Date().toISOString(),
    }
    userStore.set(newUser.id, newUser)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: ph, ...safeUser } = newUser
    await createSession(newUser)

    return NextResponse.json({ user: safeUser }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
