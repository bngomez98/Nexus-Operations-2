# Development Guidelines

## Getting Started

### Local Development Setup

```bash
# 1. Clone and navigate
git clone <repo>
cd nexops

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev

# 4. Open browser
# Visit http://localhost:3000
```

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

### Login
1. User submits credentials at `/login`
2. POST to `/api/auth/login`
3. Server validates and creates session
4. Cookie set with `sessionId`
5. Redirect to dashboard

### Protected Routes
1. Layout checks `getSession()`
2. If no session, redirect to `/login`
3. User data available in page context

### Logout
1. Form POST to `/api/auth/logout`
2. Session deleted from store
3. Cookie cleared
4. Redirect to home

## Database Schema (Current - In-Memory)

### User
```typescript
interface User {
  id: string
  email: string
  name: string
  role: 'homeowner' | 'contractor'
  createdAt: Date
}
```

### Project
```typescript
interface Project {
  id: string
  homeownerId: string
  title: string
  category: string
  description: string
  budget: number
  status: 'open' | 'claimed' | 'completed' | 'cancelled'
  claimedBy?: string
  photos: string[]
  createdAt: Date
  updatedAt: Date
}
```

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

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | Yes (checkout) | Stripe secret key — `sk_test_...` for dev |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes (checkout) | Stripe publishable key — `pk_test_...` for dev |
| `NEXT_PUBLIC_BASE_URL` | Yes (checkout) | App base URL, e.g. `http://localhost:3000` |

> The app runs without Stripe keys, but the contractor subscription flow will throw unless `STRIPE_SECRET_KEY` is set.

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

Happy coding! 🚀
