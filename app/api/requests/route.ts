import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getProjectsByHomeowner, createProject, claimProject } from '@/lib/store'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (session.user.role === 'homeowner') {
    const projects = getProjectsByHomeowner(session.user.id)
    return NextResponse.json({ projects })
  }

  return NextResponse.json({ projects: [] })
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || session.user.role !== 'homeowner') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { title, category, description, budgetMin, budgetMax, address, urgency } = await request.json()
    if (!title || !category || !description) {
      return NextResponse.json({ error: 'Title, category, and description are required.' }, { status: 400 })
    }

    const project = createProject({
      homeownerId: session.user.id,
      homeownerName: session.user.name,
      title: title.trim(),
      category,
      description: description.trim(),
      budgetMin: Number(budgetMin) || 0,
      budgetMax: Number(budgetMax) || 0,
      address: address?.trim() || 'Topeka, KS',
      urgency: urgency || 'flexible',
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const session = await getSession()
  if (!session || session.user.role !== 'contractor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { projectId } = await request.json()
    if (!projectId) return NextResponse.json({ error: 'Project ID required.' }, { status: 400 })

    const project = claimProject(projectId, session.user.id, session.user.name)
    if (!project) {
      return NextResponse.json({ error: 'Project not found or already claimed.' }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
