import { NextResponse } from 'next/server'
import { getSession, destroySession } from '@/lib/auth'

export async function POST() {
  await destroySession()

  return NextResponse.json({
    message: 'Logout successful',
  })
}
