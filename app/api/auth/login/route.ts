import { NextResponse } from 'next/server'
import { createSession, getUserByEmail } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const stored = getUserByEmail(email.toLowerCase().trim())
    if (!stored) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...user } = stored
    await createSession(stored)

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
