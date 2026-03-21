import { NextResponse } from 'next/server'
import { createSession, getUserByEmail, verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const user = getUserByEmail(email.toLowerCase().trim())
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    await createSession(user)
    const { passwordHash: _ph, ...safeUser } = user
    return NextResponse.json({ user: safeUser, role: user.role })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
