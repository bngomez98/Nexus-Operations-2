# Nexus Operations - Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account with the nexops repository
- Vercel account (free tier available)

### Deployment Steps

1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your nexops GitHub repository
   - Choose "Next.js" as the framework

2. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_BASE_URL=https://nexusoperations.org
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel automatically detects Next.js 15 configuration
   - Your app deploys in ~2-3 minutes

4. **Custom Domain**
   - Go to project settings
   - Add your custom domain (e.g., nexusops.com)
   - Configure DNS records per Vercel instructions

### Post-Deployment

- Vercel provides automatic SSL/HTTPS
- CDN enabled globally by default
- Analytics available in Vercel dashboard
- Edge Functions ready for API optimization

## Local Deployment

### Docker Setup

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

Build and run:
```bash
docker build -t nexops .
docker run -p 3000:3000 nexops
```

## Environment Variables

Set these in your deployment platform (Vercel → Project Settings → Environment Variables):

```env
# Supabase — https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe — https://dashboard.stripe.com/apikeys (use live keys in production)
STRIPE_SECRET_KEY=sk_live_...

# Application
NEXT_PUBLIC_BASE_URL=https://nexusoperations.org
NODE_ENV=production
```

See `.env.example` in the repository root for a full reference.

## Security Checklist

- [ ] Set secure secrets in deployment platform
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Review CORS settings for API
- [ ] Set up environment variables
- [ ] Enable Web Application Firewall (if available)
- [ ] Configure rate limiting
- [ ] Set up monitoring/logging

## Database Migration

The app currently uses in-memory Maps for users and projects (seeded with demo data). To switch to persistent storage:

1. **Supabase is already wired up** for session middleware — extend it for data queries by replacing the `Map` stores in `lib/auth.ts` and `lib/store.ts` with Supabase client calls.

2. **Create tables** matching the `User` and `Project` interfaces in `lib/auth.ts` and `lib/store.ts`.

3. **Deploy schema**
   ```bash
   supabase login
   supabase link --project-ref your-project-ref
   supabase db push
   ```

4. **Update connection** — Modify `lib/auth.ts` and `lib/store.ts` to query Supabase instead of the in-memory Maps.

5. **Deploy** — Push to GitHub; Vercel deploys automatically.

## Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Dashboard at vercel.com
- Real User Monitoring (RUM)

### Recommended Tools
- **Sentry:** Error tracking
- **PostHog:** Product analytics
- **Datadog:** Infrastructure monitoring

## Scaling Considerations

Current setup handles:
- ~1,000 concurrent users
- ~10,000 projects
- In-memory store adequate for development

For scaling:
1. Migrate to PostgreSQL (Supabase/Neon)
2. Implement caching layer (Redis)
3. Add search indexing (Elasticsearch)
4. Implement CDN for static assets

## Troubleshooting

### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Hot Reload Issues
```bash
# Restart dev server
pnpm dev --turbo
```

### Port Already in Use
```bash
# Use different port
pnpm dev -- -p 3001
```

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Issues:** Report bugs here
- **Discord:** Community support

---

For questions, contact: deploy@nexusops.com
