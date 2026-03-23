import Link from 'next/link'
import { Building2, Mail, ArrowRight } from 'lucide-react'

type SignUpSuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function SignUpSuccessPage({ searchParams }: SignUpSuccessPageProps) {
  const params = searchParams ? await searchParams : {}
  const plan = getSingleParam(params.plan)
  const hasSelectedPlan = Boolean(plan)
  const continueHref = hasSelectedPlan
    ? `/login?redirect=${encodeURIComponent(`/dashboard/contractor/subscribe?plan=${plan}`)}`
    : '/login'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 no-underline mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Building2 size={22} className="text-primary-fg" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Nexus <span className="text-primary">Operations</span>
          </span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-primary" />
          </div>

          <h1 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">
            Check your email
          </h1>
          <p className="text-base text-muted mb-8 leading-relaxed">
            {hasSelectedPlan
              ? 'We sent a confirmation link to your email address. Verify your account, then sign in to finish Stripe checkout and unlock the contractor dashboard.'
              : 'We sent a confirmation link to your email address. Please verify your email to complete registration and access your account.'}
          </p>

          <Link 
            href={continueHref}
            className="inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-fg font-bold text-base rounded-xl no-underline hover:bg-primary/90 transition-colors"
          >
            {hasSelectedPlan ? 'Verify then Choose Your Plan' : 'Continue to Sign In'} <ArrowRight size={18} />
          </Link>
        </div>

        <p className="text-sm text-muted mt-8">
          Did not receive the email?{' '}
          <button className="text-primary font-semibold bg-transparent border-none cursor-pointer hover:underline">
            Resend verification
          </button>
        </p>
      </div>
    </div>
  )
}
