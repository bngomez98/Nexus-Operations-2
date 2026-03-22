import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import HomeownerDashboardClient from './client'

export default async function HomeownerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user's projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const userProfile = {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    role: user.user_metadata?.role || 'homeowner',
  }

  return <HomeownerDashboardClient user={userProfile} initialProjects={projects || []} />
}
