import { NextResponse } from 'next/server'
import { createSession, getUserByEmail, hashPassword, userStore } from '@/lib/auth'
import type { User } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password, role, name, phone, company } = await request.json()

    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!['homeowner', 'contractor'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
    }
    if (getUserByEmail(email)) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const user: User = {
      id: `user-${role}-${Date.now()}`,
      email: email.toLowerCase().trim(),
      passwordHash,
      role,
      name: name.trim(),
      phone: phone?.trim(),
      company: company?.trim(),
      createdAt: new Date().toISOString(),
    }
    userStore.set(user.id, user)
    await createSession(user)

    const { passwordHash: _ph, ...safeUser } = user
    return NextResponse.json({ user: safeUser, role }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
