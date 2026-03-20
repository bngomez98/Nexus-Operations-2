# Nexus Operations - Second Release

**A modern marketplace connecting homeowners with verified contractors in Topeka, KS**

Nexus Operations is a Next.js 15 web application enabling homeowners to submit project requests and licensed contractors to claim work exclusively. Projects are removed from all other contractors' feeds upon claim, ensuring fair competition and high-quality service delivery.

## 🚀 Project Overview

**Version:** 2.0  
**Status:** Production-Ready Second Release

### For Homeowners
- **Free** to submit project requests
- Include photos, written scope, and budget
- Matched with verified contractors
- 24-hour confirmation guarantee

### For Contractors
- **Membership-based** access to exclusive project leads
- **Flat monthly** pricing ($299-$749) - no per-lead fees
- **Unlimited** project claims
- **Zero competition** - claims are exclusive
- Tiered access with advance notification windows

## 🏗️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, shadcn/ui |
| **Forms** | React Hook Form + Zod |
| **Database** | Development: In-memory (ready for production migration) |
| **Authentication** | Session-based with HTTP-only cookies |
| **Package Manager** | pnpm |

## 📋 Prerequisites

- Node.js 20 or later
- pnpm 9 or later

## ⚡ Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

**Homeowner:**
- Email: `john@example.com`
- Password: `password`

**Contractor:**
- Email: `contractor@example.com`
- Password: `password`

## 📁 Project Structure

```
nexops/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts       # User registration
│   │   │   ├── login/route.ts        # Authentication
│   │   │   ├── logout/route.ts       # Session termination
│   │   │   └── me/route.ts           # Profile endpoint
│   │   ├── leads/route.ts            # Contractor project feed
│   │   └── requests/route.ts         # Homeowner request management
│   ├── dashboard/
│   │   ├── contractor/page.tsx       # Contractor portal
│   │   └── homeowner/page.tsx        # Homeowner portal
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Landing page
│   ├── login/page.tsx               # Login interface
│   ├── signup/page.tsx              # Registration interface
│   ├── pricing/page.tsx             # Membership tiers
│   ├── terms/page.tsx               # Terms of service
│   └── privacy/page.tsx             # Privacy policy
├── lib/
│   ├── auth.ts                      # Session management
│   ├── store.ts                     # Data store & project logic
│   └── utils.ts                     # Helper functions
├── components/                      # (Ready for expansion)
├── middleware.ts                    # Security headers
├── globals.css                      # Design tokens & styles
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                   # TypeScript config
```

## 🔐 Authentication & Security

- **Session Management:** Server-side sessions with HTTP-only cookies
- **Role-Based Access:** Homeowner vs. Contractor role enforcement
- **Middleware Protection:** `/dashboard/*` routes protected by authentication
- **Security Headers:** 
  - Strict-Transport-Security (2-year max-age)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Role | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | User login |
| POST | `/api/auth/logout` | Auth'd | Session termination |
| GET | `/api/auth/me` | Auth'd | User profile |

### Project Management
| Method | Endpoint | Role | Description |
|---|---|---|---|
| GET | `/api/leads` | Contractor | Available projects |
| GET/POST | `/api/requests` | Both | Manage projects |
| PATCH | `/api/requests` | Contractor | Claim project |

## 💰 Membership Tiers

| Plan | Price | Benefits |
|---|---|---|
| **Standard** | $299/mo | Full feed, unlimited claims |
| **Premium** | $499/mo | 90-sec advance window, unlimited claims |
| **Elite** | $749/mo | 10-min exclusive on $5K+ projects |

All include unlimited claims, no per-lead fees, and cancel anytime.

## 🎨 Design System

**Color Palette:**
- Primary: `#FF8C42` (Brand Orange)
- Secondary: `#0080FF` (Bright Blue)
- Accent: `#FF3E87` (Coral)
- Neutrals: White, Grays, Black variants

**Typography:**
- Headings: Inter Bold/Semibold
- Body: Inter Regular/Medium

## 📈 Production Roadmap

### Phase 2 (Upcoming)
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Image uploads (Vercel Blob)
- [ ] Advanced analytics dashboard
- [ ] Review system

### Phase 3
- [ ] Supabase/Neon migration (production database)
- [ ] OAuth integration (Google/Apple Sign-In)
- [ ] SMS notifications
- [ ] Contractor verification system
- [ ] Real-time notifications (WebSockets)

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Next.js 15 configuration
3. Deploy with zero additional setup

```bash
# Build for production
pnpm build
pnpm start
```

## 📊 Service Categories

| Category | Budget Range |
|---|---|
| Tree Removal | $500 – $8,000 |
| Concrete Work | $1,200 – $15,000 |
| Roofing | $300 – $25,000 |
| HVAC | $3,000 – $20,000 |
| Fencing | $1,500 – $8,000 |
| Electrical | $500 – $10,000 |
| Plumbing | $500 – $12,000 |
| Excavation | $1,500 – $25,000 |

## 🛠️ Development Commands

```bash
# Development
pnpm dev              # Start dev server (hot reload)

# Production Build
pnpm build           # Build for production
pnpm start           # Start production server

# Code Quality
pnpm lint            # Run ESLint
pnpm test            # Run test suite
```

## 📝 Key Features Implemented

✅ Dual dashboard (Homeowner/Contractor)  
✅ Project submission & management  
✅ Exclusive project claims  
✅ Role-based authentication  
✅ Responsive design  
✅ Security headers  
✅ Modern UI with Tailwind CSS  
✅ TypeScript type safety  
✅ Demo data seed  

## 🔄 Database Migration Path

Currently using in-memory store for development. For production:

```typescript
// Switch from lib/store.ts to database
// Recommended: Supabase PostgreSQL or Neon

// Example (future):
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(url, key)
```

## 📞 Support & Documentation

- **Issues:** GitHub Issues
- **Email:** support@nexusops.com
- **Phone:** (785) 555-1234
- **Status:** [status.nexusops.com](https://status.nexusops.com)

## 📄 License

See LICENSE file

---

**Nexus Operations © 2024** | Built with Next.js 15 + React 19 + TypeScript
