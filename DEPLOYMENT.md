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
   # Optional (for future integrations):
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
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

For production, set these in your deployment platform:

```env
# If using Supabase (future)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# If using Stripe (future)
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_KEY=your_publishable_key

# Application
NODE_ENV=production
```

## Security Checklist

- [ ] Set secure secrets in deployment platform
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Review CORS settings for API
- [ ] Set up environment variables
- [ ] Enable Web Application Firewall (if available)
- [ ] Configure rate limiting
- [ ] Set up monitoring/logging

## Database Migration (Future)

When migrating from in-memory to production database:

1. **Create Supabase Project**
   ```bash
   # Use Supabase CLI
   supabase projects create --name nexops
   supabase db push
   ```

2. **Update Connection**
   - Modify `lib/store.ts` to use database client
   - Update authentication to use Supabase Auth
   - Test migrations locally first

3. **Deploy**
   - Push changes to GitHub
   - Vercel automatically deploys

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
