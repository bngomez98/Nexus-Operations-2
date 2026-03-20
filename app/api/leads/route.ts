import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getOpenProjects } from '@/lib/store'

export async function GET(request: Request) {
  const session = await getSession()

  if (!session || session.user.role !== 'contractor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') ?? undefined

  const projects = getOpenProjects(category)
  return NextResponse.json({ projects })
}
