import { NextResponse } from 'next/server'
import { getSession, createSession, destroySession, type User } from '@/lib/auth'
import { getUserByEmail, createUser, getUser } from '@/lib/store'

export async function POST(request: Request) {
  const { email, password, role, name } = await request.json()

  if (!email || !password || !role || !name) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Check if user exists
  if (getUserByEmail(email)) {
    return NextResponse.json(
      { error: 'Email already registered' },
      { status: 409 }
    )
  }

  // Create new user
  const newUser = createUser({
    id: `${role[0]}${Date.now()}`,
    email,
    role: role as 'homeowner' | 'contractor',
    name,
  })

  // Create session
  await createSession(newUser)

  return NextResponse.json({
    user: newUser,
    message: 'Signup successful',
  })
}
