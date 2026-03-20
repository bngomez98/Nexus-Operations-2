import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getProjects } from '@/lib/store'

export async function GET(request: Request) {
  const session = await getSession()

  if (!session || session.user.role !== 'contractor') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status') || 'open'

  const projects = getProjects({ category: category || undefined, status })

  return NextResponse.json({ projects })
}
