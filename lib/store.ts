export type ProjectStatus = 'open' | 'claimed' | 'completed'
export type Urgency = 'flexible' | 'within_month' | 'within_week' | 'asap'

export interface Project {
  id: string
  homeownerId: string
  homeownerName: string
  title: string
  category: string
  description: string
  address: string
  budgetMin: number
  budgetMax: number
  status: ProjectStatus
  claimedBy?: string
  claimedByName?: string
  claimedAt?: string
  urgency: Urgency
  createdAt: string
}

export const CATEGORIES = [
  'Tree Removal',
  'Concrete Work',
  'Roofing',
  'HVAC',
  'Fencing',
  'Electrical',
  'Plumbing',
  'Excavation',
  'Landscaping',
  'Deck / Patio',
  'Painting',
  'Flooring',
  'General Contracting',
  'Other',
] as const

export type Category = (typeof CATEGORIES)[number]

export const URGENCY_LABELS: Record<Urgency, string> = {
  flexible: 'Flexible timeline',
  within_month: 'Within a month',
  within_week: 'Within a week',
  asap: 'As soon as possible',
}

const projectStore = new Map<string, Project>()
let seeded = false

function seed() {
  if (seeded) return
  seeded = true
  const now = new Date()
  const hrs = (h: number) => new Date(now.getTime() - h * 3600000).toISOString()

  const demo: Project[] = [
    {
      id: 'proj-1',
      homeownerId: 'user-homeowner-1',
      homeownerName: 'Alex Johnson',
      title: 'Large Oak Tree Removal — 3 Trees',
      category: 'Tree Removal',
      description:
        'Three mature oak trees need to be removed from the backyard. One is leaning toward the fence. Stump grinding needed as well. Yard is accessible through a double gate.',
      address: '2847 SW Topeka Blvd, Topeka, KS 66611',
      budgetMin: 150000,
      budgetMax: 350000,
      status: 'open',
      urgency: 'within_month',
      createdAt: hrs(2),
    },
    {
      id: 'proj-2',
      homeownerId: 'user-homeowner-demo-2',
      homeownerName: 'Sarah Williams',
      title: 'Concrete Driveway Replacement',
      category: 'Concrete Work',
      description:
        'Existing asphalt driveway (~1,200 sq ft) needs full removal and replacement with concrete. Would also like a decorative border. Permit may be required.',
      address: '1204 NW Tyler St, Topeka, KS 66608',
      budgetMin: 800000,
      budgetMax: 1500000,
      status: 'open',
      urgency: 'within_month',
      createdAt: hrs(5),
    },
    {
      id: 'proj-3',
      homeownerId: 'user-homeowner-demo-3',
      homeownerName: 'Robert Chen',
      title: 'Full Roof Replacement — Asphalt Shingles',
      category: 'Roofing',
      description:
        '2,200 sq ft ranch home. Current roof is 18 years old with visible granule loss and one soft spot near the chimney. Looking for architectural shingles with 30-year warranty.',
      address: '4512 SE California Ave, Topeka, KS 66609',
      budgetMin: 1200000,
      budgetMax: 2000000,
      status: 'open',
      urgency: 'within_week',
      createdAt: hrs(8),
    },
    {
      id: 'proj-4',
      homeownerId: 'user-homeowner-demo-4',
      homeownerName: 'Linda Martinez',
      title: 'HVAC System Replacement — 4-Ton Unit',
      category: 'HVAC',
      description:
        'Central A/C and furnace both failing. Home is 2,100 sq ft, two story. Want to upgrade to a high-efficiency system. Has existing ductwork in good condition.',
      address: '789 NE Chandler Dr, Topeka, KS 66617',
      budgetMin: 600000,
      budgetMax: 1200000,
      status: 'open',
      urgency: 'asap',
      createdAt: hrs(12),
    },
    {
      id: 'proj-5',
      homeownerId: 'user-homeowner-demo-5',
      homeownerName: 'James Thompson',
      title: '200-Foot Cedar Privacy Fence',
      category: 'Fencing',
      description:
        '200 linear feet of 6-foot cedar privacy fence around backyard. Need removal of existing chain-link fence first. Corner posts and double gate included.',
      address: '3301 SW Oakley Ave, Topeka, KS 66604',
      budgetMin: 400000,
      budgetMax: 800000,
      status: 'open',
      urgency: 'within_month',
      createdAt: hrs(24),
    },
    {
      id: 'proj-6',
      homeownerId: 'user-homeowner-demo-6',
      homeownerName: 'Diana Patel',
      title: 'Electrical Panel Upgrade — 200 Amp Service',
      category: 'Electrical',
      description:
        'Upgrading from 100A to 200A service. Home is 1,950 sq ft, built 1972. Need full panel replacement and utility coordination. Adding EV charger outlet in garage.',
      address: '621 NW Mulvane St, Topeka, KS 66606',
      budgetMin: 250000,
      budgetMax: 500000,
      status: 'open',
      urgency: 'within_month',
      createdAt: hrs(36),
    },
  ]

  for (const p of demo) projectStore.set(p.id, p)
}

seed()

export function getAllProjects(): Project[] {
  return [...projectStore.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getOpenProjects(category?: string): Project[] {
  let list = getAllProjects().filter((p) => p.status === 'open')
  if (category && category !== 'all') list = list.filter((p) => p.category === category)
  return list
}

export function getProjectsByHomeowner(homeownerId: string): Project[] {
  return getAllProjects().filter((p) => p.homeownerId === homeownerId)
}

export function getProjectsByContractor(contractorId: string): Project[] {
  return getAllProjects().filter((p) => p.claimedBy === contractorId)
}

export function getProject(id: string): Project | undefined {
  return projectStore.get(id)
}

export function createProject(
  data: Omit<Project, 'id' | 'createdAt' | 'status'>
): Project {
  const project: Project = {
    ...data,
    id: `proj-${crypto.randomUUID().slice(0, 8)}`,
    status: 'open',
    createdAt: new Date().toISOString(),
  }
  projectStore.set(project.id, project)
  return project
}

export function claimProject(
  projectId: string,
  contractorId: string,
  contractorName: string
): Project | null {
  const project = projectStore.get(projectId)
  if (!project || project.status !== 'open') return null
  const updated: Project = {
    ...project,
    status: 'claimed',
    claimedBy: contractorId,
    claimedByName: contractorName,
    claimedAt: new Date().toISOString(),
  }
  projectStore.set(projectId, updated)
  return updated
}
