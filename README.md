# Nexus Operations

**The exclusive contractor marketplace connecting homeowners with verified local contractors.**

No bidding wars. One dedicated contractor per project. Serving Topeka, KS and surrounding areas.

🌐 **[nexusoperations.org](https://nexusoperations.org)**

---

## Overview

Nexus Operations is a two-sided marketplace that eliminates the inefficiency of traditional contractor lead platforms:

- **Homeowners** submit projects for free and receive one verified contractor assigned exclusively to their project within 24 hours — no sales calls, no bidding wars.
- **Contractors** pay a flat monthly subscription to access the project feed and claim leads exclusively. Once claimed, a project is removed from all other contractors' feeds.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Auth (middleware) | [Supabase SSR](https://supabase.com/docs/guides/auth/server-side) |
| Auth (session) | In-memory store with bcrypt (development) |
| Payments | [Stripe](https://stripe.com) — subscription billing |
| Data fetching | [SWR](https://swr.vercel.app) |
| Runtime | Node.js 20+ |
| Package manager | pnpm 9 |

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org)
- [pnpm 9](https://pnpm.io/installation)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```env
# Supabase — https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe — https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...

# App base URL (used for Stripe redirect URLs)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note:** The app runs with demo data (no database) even without Supabase credentials. Dashboard route protection requires Supabase. Stripe is required only for contractor subscription checkout.

### 3. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Demo Accounts

The app seeds the following test accounts on startup:

| Role | Email | Password |
|---|---|---|
| Homeowner | `homeowner@demo.com` | `password123` |
| Contractor | `contractor@demo.com` | `password123` |

---

## Project Structure

```
nexus-operations/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout + global metadata
│   ├── globals.css               # Tailwind CSS design tokens
│   ├── about/                    # About page
│   ├── how-it-works/             # Process overview page
│   ├── pricing/                  # Contractor membership plans
│   ├── terms/                    # Terms of Service
│   ├── privacy/                  # Privacy Policy
│   ├── login/                    # Login page
│   ├── signup/                   # Signup + role selection
│   ├── dashboard/
│   │   ├── homeowner/            # Homeowner portal (submit & track projects)
│   │   └── contractor/           # Contractor portal (browse & claim leads)
│   │       └── subscribe/        # Stripe subscription flow
│   ├── actions/
│   │   └── stripe.ts             # Server Action: create Stripe checkout session
│   └── api/
│       ├── auth/                 # login · logout · signup · me
│       ├── leads/                # GET project feed (contractors)
│       └── requests/             # GET · POST · PATCH projects (homeowners)
├── components/
│   ├── navbar.tsx                # Top navigation bar
│   └── footer.tsx                # Site footer
├── lib/
│   ├── auth.ts                   # Session management + in-memory user store
│   ├── store.ts                  # In-memory project store + demo seed data
│   ├── products.ts               # Stripe plan definitions
│   ├── stripe.ts                 # Stripe client (server-only)
│   ├── utils.ts                  # Shared helpers
│   └── supabase/
│       ├── client.ts             # Supabase browser client
│       ├── server.ts             # Supabase server client
│       └── middleware.ts         # Session refresh + route protection
├── middleware.ts                 # Next.js middleware entry point
├── public/
│   └── images/                   # Static images (hero, OG, team)
├── next.config.mjs
├── tsconfig.json
└── .env.example
```

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server (localhost:3000) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |

---

## Pricing Plans

Contractor membership is billed monthly through Stripe. Homeowners always post for free.

| Plan | Price | Highlight |
|---|---|---|
| Standard | $299/mo | Full feed access, unlimited claims |
| Premium | $499/mo | 90-second advance window + SMS alerts |
| Elite | $749/mo | 10-minute exclusive on projects over $5K |

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions including Vercel setup, environment variables, and Docker.

---

## Contributing & Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for coding conventions, authentication flow, and project structure guidelines.

---

## License

Copyright © Nexus Operations LLC. All rights reserved. See [LICENSE](./LICENSE).
