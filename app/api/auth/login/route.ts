import { NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'
import { getUserByEmail } from '@/lib/store'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const stored = getUserByEmail(email.toLowerCase().trim())
    if (!stored || stored.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const { password: _, ...user } = stored
    await createSession({ ...user })

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
