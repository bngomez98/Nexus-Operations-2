import { NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'
import { getUserByEmail, createUser } from '@/lib/store'

export async function POST(request: Request) {
  try {
    const { email, password, role, name } = await request.json()

    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!['homeowner', 'contractor'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role.' }, { status: 400 })
    }
    if (getUserByEmail(email)) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })
    }

    const stored = createUser({
      id: `${role[0]}${Date.now()}`,
      email: email.toLowerCase().trim(),
      password,
      role,
      name: name.trim(),
    })

    const { password: _, ...user } = stored
    await createSession({ ...user })

    return NextResponse.json({ user }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
