import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ContractorDashboardClient from './client'

export default async function ContractorDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch available projects (pending status)
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const userProfile = {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.full_name || profile?.full_name || user.email?.split('@')[0] || 'User',
    role: user.user_metadata?.role || profile?.role || 'contractor',
    subscriptionTier: profile?.subscription_tier || null,
    subscriptionStatus: profile?.subscription_status || 'inactive',
  }

  return <ContractorDashboardClient user={userProfile} initialProjects={projects || []} />
}
