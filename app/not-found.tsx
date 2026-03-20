import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <p className="text-8xl font-bold" style={{ color: 'var(--color-primary)' }}>404</p>
      <h1 className="text-2xl font-bold mt-4" style={{ color: 'var(--color-foreground)' }}>Page not found</h1>
      <p className="mt-2 text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-xl font-semibold text-sm"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
      >
        Back to Home
      </Link>
    </div>
  )
}
