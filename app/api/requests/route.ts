import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getProjects, createProject, getProject, claimProject } from '@/lib/store'

export async function GET(request: Request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const project = getProject(id)
    return NextResponse.json({ project })
  }

  // Get all projects for homeowner
  if (session.user.role === 'homeowner') {
    const projects = getProjects().filter(p => p.homeownerId === session.user.id)
    return NextResponse.json({ projects })
  }

  return NextResponse.json({ projects: [] })
}

export async function POST(request: Request) {
  const session = await getSession()

  if (!session || session.user.role !== 'homeowner') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  const { title, category, description, budget } = await request.json()

  if (!title || !category || !description || !budget) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const project = createProject({
    homeownerId: session.user.id,
    title,
    category,
    description,
    budget,
    status: 'open',
    photos: [],
  })

  return NextResponse.json({ project }, { status: 201 })
}

export async function PATCH(request: Request) {
  const session = await getSession()

  if (!session || session.user.role !== 'contractor') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  const { projectId } = await request.json()

  if (!projectId) {
    return NextResponse.json(
      { error: 'Project ID required' },
      { status: 400 }
    )
  }

  const project = claimProject(projectId, session.user.id)

  if (!project) {
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({ project })
}
