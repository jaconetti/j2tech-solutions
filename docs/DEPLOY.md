# Deploy Guide - J2 Tech Solutions

## 🚀 Deploy to Vercel - Step by Step

### 1. Create Vercel Account & Install CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login
```

### 2. Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database** → **Postgres**
3. Choose region closest to your users (e.g., US East for Americas)
4. Database will be created automatically
5. Copy all environment variables shown

### 3. Configure Environment Variables

In your Vercel project settings, add these variables:

#### Required (from Vercel Postgres):
```
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NO_SSL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=default
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=verceldb
```

#### Optional:
```
NEXT_PUBLIC_GA_ID=your_google_analytics_id
ABACUSAI_API_KEY=your_api_key
```

### 4. Connect GitHub Repository

1. Go to [Vercel New Project](https://vercel.com/new)
2. Import Git Repository: `jaconetti/j2tech-solutions`
3. Configure Project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `prisma generate && next build` (auto-configured)
   - **Output Directory**: `.next` (auto-configured)
   - **Install Command**: `npm install --legacy-peer-deps` (from vercel.json)

4. Add Environment Variables (paste all from step 3)
5. Click **Deploy**

### 5. Run Database Migration

After first deploy, run migrations:

```bash
# Connect to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migration
npx prisma migrate deploy

# Or if you need to create migration
npx prisma migrate dev --name init
```

### 6. Seed Database (Optional)

After migration, seed the blog posts:

```bash
# Make sure you have .env.local with Postgres credentials
npx tsx scripts/seed-markdown-blog.ts
```

### 7. Verify Deployment

Visit your deployment URL and check:
- ✅ Homepage loads
- ✅ Blog posts appear
- ✅ Calculator works
- ✅ Contact form works
- ✅ Both PT and EN locales work

## 📋 Post-Deploy Checklist

- [ ] Database connected and migrated
- [ ] Blog posts seeded
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)
- [ ] Google Analytics tracking
- [ ] Forms working (test contact form)
- [ ] SEO: Submit sitemap to Google Search Console
- [ ] Performance: Check PageSpeed Insights

## 🔄 Continuous Deployment

Every push to `main` branch will automatically deploy to Vercel:

```bash
git add .
git commit -m "your changes"
git push origin main
```

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Database Connection Error
- Verify POSTGRES_PRISMA_URL is set
- Check if migration was run
- Review Vercel logs

### Pages Not Loading
- Check if build completed successfully
- Verify routes in Vercel dashboard
- Check browser console for errors

## 📊 Monitoring

- **Analytics**: Vercel Analytics (automatic)
- **Speed**: Vercel Speed Insights (automatic)
- **Errors**: Check Vercel Runtime Logs
- **SEO**: Google Search Console

## 🔐 Security Notes

- Never commit `.env` files
- Use environment variables for all secrets
- `.env.example` is safe to commit (no real values)
- Rotate API keys regularly

## 📱 Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your domain (e.g., j2tech.solutions)
3. Follow DNS configuration instructions
4. SSL certificate is automatic

## 🎯 Performance Optimization

Already implemented:
- ✅ Static page generation (45 pages)
- ✅ Image optimization
- ✅ Font optimization (display: swap)
- ✅ Database connection pooling

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs

---

**Ready to deploy?** Run: `vercel`
