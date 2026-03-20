import { NextResponse } from 'next/server'
import { getSession, createSession } from '@/lib/auth'
import { getUserByEmail } from '@/lib/store'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password required' },
      { status: 400 }
    )
  }

  const user = getUserByEmail(email)

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Create session
  await createSession(user)

  return NextResponse.json({
    user,
    message: 'Login successful',
  })
}
