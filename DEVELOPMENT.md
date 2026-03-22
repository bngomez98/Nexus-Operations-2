# Development Guidelines

## Getting Started

### Local Development Setup

```bash
# 1. Clone and navigate
git clone https://github.com/bngomez98/Nexus-Operations-2.git
cd Nexus-Operations-2

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and fill in your Supabase and Stripe credentials

# 4. Start development server
pnpm dev

# 5. Open browser
# Visit http://localhost:3000
```

See `.env.example` for all required environment variables.

## Project Structure Best Practices

### Adding New Pages

1. Create file in `app/[page]/page.tsx`
2. Use Server Components by default
3. Add metadata to `layout.tsx` for SEO
4. Import components from `components/`

### Adding API Routes

1. Create file in `app/api/[endpoint]/route.ts`
2. Export methods: `GET`, `POST`, `PATCH`, `DELETE`
3. Handle authentication in route handler
4. Return `NextResponse` with proper status

### Adding Components

1. Create in `components/[Feature]/[Component].tsx`
2. Make Client Components with `'use client'` only when needed
3. Keep components focused and reusable
4. Export types alongside components

## Authentication Flow

The app uses a two-layer authentication system:

### Layer 1 — Supabase SSR (route protection)

`middleware.ts` calls `lib/supabase/middleware.ts` on every request. It refreshes the Supabase session cookie and redirects unauthenticated requests to `/dashboard/**` routes back to `/login`.

Requires: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Layer 2 — In-memory session store (development)

`lib/auth.ts` manages users and sessions in plain `Map` objects seeded with demo data. This layer handles the `/api/auth/*` endpoints and the `getSession()` helper used in API routes.

**Demo accounts (seeded on startup):**

| Role | Email | Password |
|---|---|---|
| Homeowner | `homeowner@demo.com` | `password123` |
| Contractor | `contractor@demo.com` | `password123` |

### Login flow
1. User submits credentials at `/login`
2. POST to `/api/auth/login`
3. Server verifies password hash with bcrypt
4. HTTP-only session cookie (`nexops_session`) set for 30 days
5. Redirect to `/dashboard/homeowner` or `/dashboard/contractor`

### Protected routes
1. `middleware.ts` checks Supabase session on every `/dashboard/**` request
2. If no active session → redirect to `/login`
3. Page components call `getSession()` from `lib/auth.ts` for user data

### Logout
1. Form `POST` to `/api/auth/logout`
2. Session deleted from in-memory store
3. Cookie cleared
4. Redirect to `/`

## Data Layer (Current — In-Memory)

Users and projects are stored in `Map` objects defined in `lib/auth.ts` and `lib/store.ts`. Data is seeded once per process startup and does not persist across restarts.

### User (`lib/auth.ts`)

```typescript
interface User {
  id: string
  email: string
  passwordHash: string
  role: 'homeowner' | 'contractor'
  name: string
  phone?: string
  company?: string
  plan?: 'standard' | 'premium' | 'elite' | null
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  subscriptionStatus?: 'active' | 'inactive' | 'canceled' | null
  createdAt: string
}
```

### Project (`lib/store.ts`)

```typescript
interface Project {
  id: string
  homeownerId: string
  homeownerName: string
  title: string
  category: string
  description: string
  address: string
  budgetMin: number   // in cents
  budgetMax: number   // in cents
  status: 'open' | 'claimed' | 'completed'
  claimedBy?: string
  claimedByName?: string
  claimedAt?: string
  urgency: 'flexible' | 'within_month' | 'within_week' | 'asap'
  createdAt: string
}
```

### Migrating to a persistent database

Replace the `Map` stores in `lib/auth.ts` and `lib/store.ts` with Supabase client calls. The middleware already uses Supabase for session management, making it straightforward to extend to full database queries.

## Styling Guide

### Using Design Tokens

```tsx
// ✅ Use design tokens
<div className="bg-background text-foreground border border-border">

// ❌ Avoid hardcoded colors
<div className="bg-white text-black border border-gray-200">
```

### Tailwind Utilities

```tsx
// Layout
className="flex items-center justify-between gap-4"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// States
className="hover:bg-primary transition-colors disabled:opacity-50"
```

## Testing

### Manual Testing Checklist

- [ ] Homeowner signup/login
- [ ] Contractor signup/login
- [ ] Create new project
- [ ] Claim project (contractor)
- [ ] View claimed projects
- [ ] Filter by category
- [ ] Logout functionality

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Code Quality

### ESLint

```bash
# Run linter
pnpm lint

# Fix issues
pnpm lint --fix
```

### Type Checking

```bash
# TypeScript compilation
pnpm build

# Check types only
pnpm tsc --noEmit
```

## Common Tasks

### Adding a New Service Category

1. Update `CATEGORIES` in `lib/store.ts`
2. Update categories array in component
3. Test filtering functionality

### Modifying Authentication

1. Edit `lib/auth.ts` for session logic
2. Update API routes in `app/api/auth/`
3. Test all login flows

### Changing UI Colors

1. Update CSS variables in `app/globals.css`
2. Ensure contrast ratios meet WCAG AA
3. Test in both light modes

## Performance Tips

- Use `Next/Image` for images (future)
- Implement code splitting with dynamic imports
- Cache API responses with SWR (client)
- Use server components for data fetching

## Accessibility

- Add `alt` text to all images
- Use semantic HTML elements
- Include ARIA labels for complex interactions
- Test with screen readers
- Maintain color contrast ratios

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/description

# Commit changes
git commit -m "feat: description"

# Push to remote
git push origin feature/description

# Create Pull Request on GitHub
```

## Debugging

### Console Logging

```typescript
// Use descriptive messages
console.log('[v0] User data:', userData)

// Check execution flow
console.log('[v0] Before API call')
console.log('[v0] After API call')

// Remove before commit
```

### Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Trigger action
4. Check request/response
5. Verify status codes

### Session Issues

```typescript
// Check session in browser
const response = await fetch('/api/auth/me')
console.log(response)
```

## Environment Variables

For local development, create `.env.local` by copying `.env.example`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (route protection) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (route protection) | Supabase anon/public key |
| `STRIPE_SECRET_KEY` | Yes (checkout) | Stripe secret key (`sk_test_...` in dev) |
| `NEXT_PUBLIC_BASE_URL` | Yes (checkout redirects) | Full app URL, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | Optional | Override OAuth redirect URL in local dev |

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

Happy coding! 🚀
