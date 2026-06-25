# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

J2 Tech Solutions is a Next.js 14 website for a software development consultancy focused on startups. The site features multi-language support (Portuguese/English), a project portfolio, service offerings, a cost calculator, and lead capture forms with email notifications.

**Key Characteristics:**
- Next.js 14 (App Router) with TypeScript
- Internationalization (i18n) using `next-intl` with locale-based routing (`/pt` and `/en`)
- Prisma ORM with PostgreSQL (Vercel Postgres in production)
- Component library built with Radix UI + Shadcn/ui
- Tailwind CSS for styling with custom CSS variables for theming
- Deployed on Vercel with static site generation where possible

---

## Essential Commands

```bash
# Development
npm run dev           # Start dev server on port 3001
npm run lint          # Run ESLint
npm run build         # Build: runs `prisma generate && next build`
npm run start         # Start production server on port 3001

# Database
npx prisma migrate dev --name <migration-name>  # Create and apply migration
npx prisma generate                             # Generate Prisma client
npm run prisma:seed                             # Seed database (via scripts/seed.ts)
```

**Port:** Development and production both run on `3001` (configured in package.json scripts).

---

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (passes children through)
│   ├── page.tsx                 # Root page (redirects to /pt)
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── api/                     # API routes
│   │   ├── contact/route.ts     # Contact form submission endpoint
│   │   └── calculator-lead/route.ts  # Calculator proposal endpoint
│   └── [locale]/                # Locale segment for i18n routing
│       ├── layout.tsx           # Main layout with Header, Footer, metadata, scripts
│       ├── page.tsx             # Home page with hero, services, stats
│       ├── portfolio/page.tsx    # Portfolio with project filtering
│       ├── contact/page.tsx      # Contact form
│       ├── calculator/page.tsx   # Interactive cost calculator
│       ├── services/page.tsx     # Service listings
│       ├── about/page.tsx        # About page
│       ├── process/page.tsx      # Development process
│       ├── blog/page.tsx         # Blog listing (MDX + database)
│       └── blog/[slug]/page.tsx  # Individual blog posts
├── components/
│   ├── ui/                      # Shadcn/ui components (50+ reusable)
│   ├── layout/
│   │   ├── header.tsx          # Fixed header with nav, language switcher, CTA
│   │   └── footer.tsx          # Footer with links and contact info
│   ├── animated-*.tsx           # Animation wrapper components
│   ├── language-switcher.tsx    # Locale switcher
│   ├── whatsapp-button.tsx      # Floating WhatsApp action button
│   ├── theme-provider.tsx       # next-themes wrapper
│   └── mdx-components.tsx       # MDX rendering components
├── lib/
│   ├── db.ts                    # Prisma client singleton
│   ├── navigation.ts            # i18n-aware Link, Router, Pathname
│   ├── schemas.ts               # Zod validation schemas for forms
│   ├── calculator.ts            # Pricing logic and currency formatting
│   ├── analytics.ts             # Google Analytics tracking helper
│   ├── structured-data.ts       # Schema.org JSON-LD generators
│   ├── types.ts                 # TypeScript interfaces
│   └── utils.ts                 # Utility functions (clsx, tailwind-merge)
├── messages/
│   ├── pt.json                  # Portuguese translations
│   └── en.json                  # English translations
├── i18n/
│   └── routing.ts               # Locale definitions (pt, en) and defaultLocale
├── prisma/
│   └── schema.prisma            # Data models (Post, Newsletter, Contact, CalculatorLead)
├── public/                      # Static assets
├── scripts/
│   └── seed.ts                  # Database seeding script
└── docs/                        # Project documentation
    ├── MVP.md                   # Detailed project planning
    ├── DEPLOY.md                # Deployment guide for Vercel
    └── SEO_CHECKLIST.md         # SEO implementation checklist
```

---

## Architecture & Key Patterns

### 1. Internationalization (i18n)

The project uses `next-intl` with a locale-based routing strategy:

- **Locales:** Portuguese (`pt`) as default, English (`en`)
- **Configuration:** `i18n/routing.ts` defines available locales
- **Middleware:** `middleware.ts` handles locale detection and routing
- **Message Loading:** `i18n.ts` dynamically imports translations from `messages/{locale}.json`
- **Usage in Components:**
  - Server: `getMessages()` from `next-intl/server`
  - Client: `useTranslations('namespace')` hook
  - Navigation: Use `Link` from `@/lib/navigation` (i18n-aware version)

**Key Gotcha:** All dynamic routes and pages must use the `[locale]` segment. The root `app/page.tsx` redirects to `/pt` to prevent unlocalized routes.

### 2. Database & Prisma

**Provider:** PostgreSQL via Vercel Postgres (production) or SQLite (development)

**Models:**
- `Post` - Blog posts with bilingual fields (titleEn, contentEn, etc.)
- `Newsletter` - Email subscribers
- `Contact` - Contact form submissions
- `CalculatorLead` - Calculator proposal requests with estimated pricing

**Setup:**
- Connection pooling URL in `POSTGRES_PRISMA_URL` (for Prisma)
- Direct connection URL in `POSTGRES_URL_NON_POOLING` (for migrations)
- Prisma client is a singleton in `lib/db.ts` to avoid connection exhaustion

**Important:** Always use the singleton from `lib/db.ts` instead of creating new PrismaClient instances.

### 3. Form Handling & Validation

All forms use **React Hook Form** + **Zod** validation (defined in `lib/schemas.ts`):

```typescript
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(),
  projectType: z.enum(['mvp', 'app_mobile', 'saas', 'ecommerce', 'corporate', 'other']),
  budget: z.enum([...]).optional(),
  message: z.string().min(10).max(1000),
  consent: z.boolean().refine(val => val === true)
})
```

**API Endpoints:** Forms POST to `/api/contact` and `/api/calculator-lead`. Both:
1. Validate with Zod
2. Save to database via Prisma
3. Send HTML email notification via Abacus.ai

### 4. Styling & Theme

- **Framework:** Tailwind CSS with custom theme
- **CSS Variables:** Colors are defined as HSL CSS variables (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, etc.)
- **Dark Mode:** Configured with `darkMode: ['class']` for next-themes support
- **Components:** Shadcn/ui + Radix UI primitives (extensive component library)
- **Custom Animations:** Tailwindcss-animate plugin, Framer Motion for complex animations

**Important:** When adding new colored elements, use CSS variable syntax like `text-[rgb(var(--primary))]` instead of hardcoded Tailwind classes. This ensures theme consistency.

### 5. Cost Calculator Logic

Located in `lib/calculator.ts`:

- **Base Pricing by Project Type:** MVP (8k), Mobile App (12k), SaaS (15k), E-commerce (10k), Corporate (18k)
- **Complexity Multiplier:** Simple (0.7x), Medium (1.0x), Complex (1.4x)
- **Feature Add-ons:** Auth (800), Payments (2k), Chat (2.5k), etc.
- **Deadline Urgency:** Urgent (1.2x markup), Normal (1.0x), Flexible (0.9x discount)
- **Currency Formatting:** BRL for Portuguese, USD (0.22x conversion) for English
- **Monthly Support:** Special handling with progressive hourly discounts (150/hr base, 20% discount for 50+ hours)

The calculator returns `{ min, max, timeline, breakdown }` which feeds into the estimate display and database storage.

### 6. API Routes & Email Notifications

**Contact & Calculator Lead Endpoints:**
- Both use `export const dynamic = 'force-dynamic'` to disable caching
- Both validate with Zod schemas
- Both save to Prisma database
- Both send HTML emails via Abacus.ai API

**Email Configuration:**
- Uses `ABACUSAI_API_KEY` environment variable
- Recipient: jeferson.jaconetti@gmail.com (hardcoded in routes)
- Sender email is dynamically generated from `NEXTAUTH_URL`

### 7. Metadata & SEO

- **Layout Metadata:** Configured in `app/[locale]/layout.tsx` with locale-specific titles, descriptions, OG tags
- **Structured Data:** Generated by `lib/structured-data.ts`
  - Organization schema with contact info and social profiles
  - BlogPosting schema for articles
- **Open Graph & Twitter Cards:** Configured with OG image `/og-image.png`
- **Robots & Indexing:** Explicitly set to allow indexing and following

### 8. Analytics

Google Analytics integration via `lib/analytics.ts`:
- Global `gtag` object for tracking
- Custom events: `clickCTA`, `submitForm`, `viewProject`, `calculateBudget`, `clickWhatsApp`
- Tracked in Header, Contact Form, Portfolio, Calculator components

---

## Critical Implementation Details

### Locale Handling in Pages

Always destructure params as `Promise`:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // use locale...
}
```

### Component Client Directives

- Use `'use client'` in components that:
  - Use React hooks (useState, useEffect, useContext)
  - Use next-intl hooks (useTranslations, useLocale)
  - Use event listeners
  - Use browser APIs

### Image Optimization

Images are configured with `unoptimized: true` in `next.config.js` (for static exports). Use Next.js `Image` component for all images to preserve optimization where available.

### MDX Blog Posts

Blog posts come from two sources:
1. Database (Post model in Prisma)
2. MDX files (historical - being migrated to database)

The `next-mdx-remote` library renders dynamic content. Custom components are mapped in `components/mdx-components.tsx`.

---

## Environment Variables

### Development (.env.local)

```
POSTGRES_PRISMA_URL=          # SQLite file path or Postgres URL
NEXT_PUBLIC_GA_ID=            # Google Analytics ID (optional)
ABACUSAI_API_KEY=             # For email notifications
NEXTAUTH_URL=                 # Used to generate email sender domain
```

### Production (Vercel)

All `POSTGRES_*` variables from Vercel Postgres setup plus:
- `NEXT_PUBLIC_GA_ID`
- `ABACUSAI_API_KEY`

---

## Performance Considerations

- **Static Generation:** Use `generateStaticParams()` for locale routes to enable ISR
- **Dynamic Endpoints:** API routes use `export const dynamic = 'force-dynamic'` to ensure fresh data
- **Image Assets:** Placed in `/public` for static serving
- **Font Loading:** Using Google Fonts with `display: 'swap'` to avoid layout shift

---

## Common Development Tasks

### Adding a New Page

1. Create file at `app/[locale]/my-page/page.tsx`
2. Use `useTranslations('my_page')` for translations
3. Add corresponding keys to both `messages/pt.json` and `messages/en.json`
4. Use `Link` from `@/lib/navigation` for internal links

### Adding a Form

1. Define Zod schema in `lib/schemas.ts`
2. Create API route at `app/api/my-endpoint/route.ts` with validation and database save
3. Use React Hook Form with `zodResolver` in your form component
4. Integrate email notification via Abacus.ai if needed

### Adding Database Model

1. Add model to `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name describe_change`
3. Import from `lib/db.ts` and use `db.modelName.create()` in routes

### Styling & Theme

- New components should use CSS variables: `text-[rgb(var(--primary))]`
- Reference Tailwind config for available theme tokens
- Use Shadcn/ui components as building blocks when possible

---

## Notable Dependencies & Versions

- **Next.js:** 14.2.29 (with next-intl plugin)
- **React:** 18.2.0
- **TypeScript:** 5.2.2
- **Tailwind CSS:** 3.3.3
- **Prisma:** 6.7.0
- **next-intl:** 4.7.0
- **React Hook Form:** 7.53.0
- **Zod:** 3.23.8
- **Framer Motion:** 10.18.0
- **Radix UI:** Multiple packages (accordion, dialog, select, etc.)
- **next-mdx-remote:** 6.0.0
- **next-themes:** 0.3.0

---

## Deployment

**Host:** Vercel (configured for automatic CI/CD from GitHub)

**Pre-deployment:**
1. All environment variables set in Vercel project settings
2. Vercel Postgres database created and connected
3. `vercel.json` specifies `npm install --legacy-peer-deps`

**Build Process:**
1. `prisma generate` runs automatically
2. Next.js builds with TypeScript strict mode enabled
3. ESLint errors are ignored during build (per `next.config.js`)

See `docs/DEPLOY.md` for detailed deployment instructions.

---

## Testing & Linting

```bash
npm run lint            # ESLint check (ignores during build)
```

There are currently no automated tests in the project. New utilities or features requiring reliability should have manual testing documented.
