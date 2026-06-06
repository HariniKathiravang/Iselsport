# Iselsport Portfolio

A production-ready personal portfolio built with **Next.js 15 (App Router)**, **Sanity CMS**, **Tailwind CSS**, and **shadcn/ui**. All portfolio content is managed in Sanity and rendered through typed GROQ queries. The site uses a rose/pink visual theme with card-based sections, dedicated subpages, and ISR caching for fast updates after CMS publishes.

---

## Architecture Overview

```
Browser request
      │
      ▼
Next.js App Router (src/app)
      │
      ├── Server Components fetch data via sanityFetch()
      │         │
      │         ▼
      │   GROQ queries (src/lib/sanity/queries.ts)
      │         │
      │         ▼
      │   Sanity CDN (published content, 60s revalidate)
      │
      ├── Client Components (header, homepage form)
      │
      └── Sanity Studio (/studio) for content editing
```

**Key design choices**

- **Server-first rendering**: Pages fetch Sanity data on the server and pass typed props to components.
- **Single source of truth**: No hardcoded portfolio content; text, images, and links come from Sanity documents.
- **ISR + tag revalidation**: Pages revalidate every 60 seconds; `/api/revalidate` can force a refresh after CMS publishes.
- **Shared layout primitives**: Header, footer, section wrappers, and page banners keep all routes visually consistent.

---

## Routing Overview

Routes are defined by the Next.js App Router file structure under `src/app/`.

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Homepage — hero, section previews, skills, contact |
| `/about` | `src/app/about/page.tsx` | Full about page with banner, bio, education |
| `/projects` | `src/app/projects/page.tsx` | All projects with GitHub and live demo links |
| `/certifications` | `src/app/certifications/page.tsx` | Certification badge cards |
| `/studio` | `src/app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio |
| `/api/revalidate` | `src/app/api/revalidate/route.ts` | Webhook endpoint for cache invalidation |

**Navigation behavior** (`src/components/portfolio/site-header.tsx`)

| Nav item | Destination |
|----------|-------------|
| About | `/about` |
| Projects | `/projects` |
| Certifications | `/certifications` |
| Skills | `/#skills` (homepage anchor) |
| Contact | `/#contact` (homepage anchor) |

---

## Where to Find Things

### Pages

| Page | Entry file | Main UI |
|------|------------|---------|
| Home | `src/app/page.tsx` | `src/components/portfolio/portfolio-page.tsx` |
| About | `src/app/about/page.tsx` | Inline layout + `PageBanner` |
| Projects | `src/app/projects/page.tsx` | `ProjectCard` grid |
| Certifications | `src/app/certifications/page.tsx` | Badge card grid |

### Shared portfolio components

| Component | Path | Purpose |
|-----------|------|---------|
| `SiteHeader` | `src/components/portfolio/site-header.tsx` | Sticky navbar with routing links |
| `SiteFooter` | `src/components/portfolio/site-footer.tsx` | Copyright and tagline |
| `Section` | `src/components/portfolio/section.tsx` | Titled content section with border separation |
| `PageBanner` | `src/components/portfolio/page-banner.tsx` | Subpage header; optional Sanity banner image |
| `ProjectCard` | `src/components/portfolio/project-card.tsx` | Project display card |
| `SanityImage` | `src/components/portfolio/sanity-image.tsx` | Sanity image URL builder + `next/image` |
| `BackLink` | `src/components/portfolio/back-link.tsx` | Consistent return link on subpages |

### UI primitives (shadcn/ui)

Reusable low-level components live in `src/components/ui/` — buttons, cards, inputs, badges, etc. Portfolio components compose these.

### Global styles and theme

| File | Purpose |
|------|---------|
| `src/app/globals.css` | CSS variables, rose palette, utility classes (`.gradient-hero`, `.border-ink`, `.shadow-soft`) |
| `tailwind.config.ts` | Tailwind theme extensions |
| `src/app/layout.tsx` | Root layout, Inter + Fraunces fonts |

---

## Sanity Integration

### Schema files (`src/sanity/schemaTypes/`)

| Schema | File | Used for |
|--------|------|----------|
| `aboutSection` | `aboutSection.ts` | Hero text, bio, education, profile/banner/professional photos |
| `project` | `project.ts` | Project title, stack, description, image, repo/live URLs |
| `certification` | `certification.ts` | Badge image, title, issuer, optional link |
| `skills` | `skills.ts` | Skill categories and items |
| `contactInfo` | `contactInfo.ts` | Contact form section, email, social links |
| `siteSettings` | `siteSettings.ts` | Site name, hero buttons, footer, leadership, languages |

Registered in `src/sanity/schemaTypes/index.ts`.

### Client and configuration

| File | Purpose |
|------|---------|
| `src/lib/sanity/client.ts` | `sanityFetch()` read client with ISR tags |
| `src/lib/sanity/env.ts` | Server-side env validation (`SANITY_PROJECT_ID`, dataset) |
| `src/lib/sanity/image.ts` | `urlFor()` helper for Sanity CDN image URLs |
| `src/lib/sanity/types.ts` | TypeScript types mirroring schemas |
| `src/lib/sanity/queries.ts` | GROQ queries for each page |
| `sanity.config.ts` | Studio configuration |
| `sanity.cli.ts` | Sanity CLI configuration |

### Content flow

1. Content is created and **published** in Sanity Studio (`/studio`).
2. Server pages call `sanityFetch()` with a GROQ query and cache tag `"portfolio"`.
3. Responses are typed via `src/lib/sanity/types.ts`.
4. Images are rendered through `urlFor()` → `SanityImage` or `PageBanner`.
5. After publishing, changes appear within 60 seconds, or immediately after calling the revalidate API.

### GROQ queries

| Query | Used by |
|-------|---------|
| `portfolioQuery` | Homepage — fetches all sections in one request |
| `aboutQuery` | About page |
| `projectsQuery` | Projects page |
| `certificationsQuery` | Certifications page |
| `siteMetaQuery` | Subpages — site name, footer, contact email for header/footer |

### Image fields

| Field | Document | Rendered on |
|-------|----------|-------------|
| `profilePhoto` | `aboutSection` | Homepage hero background banner |
| `bannerImage` | `aboutSection` | About page header banner |
| `professionalPhoto` | `aboutSection` | About page sidebar |
| `image` | `project` | Project cards |
| `badge` | `certification` | Certification badge cards |

---

## Debugging Guide

### UI issues

| Symptom | Check |
|---------|-------|
| Hero banner image missing | `aboutSection.profilePhoto` in Sanity; `NEXT_PUBLIC_SANITY_PROJECT_ID` set; `src/components/portfolio/portfolio-page.tsx` hero section |
| About banner not showing | `aboutSection.bannerImage`; `src/components/portfolio/page-banner.tsx` |
| Section titles have trailing punctuation | `src/lib/format-section-title.ts` |
| Layout/spacing inconsistent | `src/components/portfolio/section.tsx`, `globals.css` |
| Cards look wrong | `src/components/portfolio/project-card.tsx`, `src/components/ui/card.tsx` |

### Routing issues

| Symptom | Check |
|---------|-------|
| 404 on subpage | File exists under `src/app/<route>/page.tsx` |
| Nav link goes nowhere | `src/components/portfolio/site-header.tsx` `navItems` |
| Skills/Contact anchor broken | Homepage section IDs `#skills` and `#contact` in `portfolio-page.tsx` |

### Sanity data issues

| Symptom | Check |
|---------|-------|
| Build fails: missing env | `SANITY_PROJECT_ID` in `.env.local` / Vercel env vars |
| Content not updating | Document published? Wait 60s or `POST /api/revalidate?token=...` |
| Images not loading | `NEXT_PUBLIC_SANITY_PROJECT_ID`; `next.config.ts` `remotePatterns` for `cdn.sanity.io` |
| Empty certifications | Create `certification` documents (not the legacy string list in `siteSettings`) |
| Type errors after schema change | Update `src/lib/sanity/types.ts` and `queries.ts` |

### Styling issues

| Symptom | Check |
|---------|-------|
| Pink theme wrong | `src/app/globals.css` CSS variables (`--primary`, `--rose-*`) |
| Borders too faint | `.border-ink` in `globals.css` |
| Font issues | `src/app/layout.tsx` font imports |

---

## Environment Variables

Create `.env.local` in the project root (see `.env.example`):

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2026-04-01
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_REVALIDATE_TOKEN=your_random_secret

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `SANITY_PROJECT_ID` | Yes (server) | Sanity API access during build and SSR |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes (client) | Studio and client-side image URLs |
| `SANITY_DATASET` | Yes | Must be `production` |
| `SANITY_REVALIDATE_TOKEN` | For webhooks | Secures `/api/revalidate` |
| `NEXT_PUBLIC_EMAILJS_*` | For contact form | EmailJS integration on homepage |

---

## Setup and Development

### Prerequisites

- Node.js 20+
- npm
- Sanity, Vercel, and EmailJS accounts

### Install and run

```bash
npm install
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### Build and lint

```bash
npm run build
npm run lint
```

### Studio only (CLI)

```bash
npm run studio
```

---

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add all environment variables from `.env.local`.
4. Deploy — the site and `/studio` route will both be available.

### Cache revalidation

After publishing in Sanity, trigger:

```
POST /api/revalidate?token=YOUR_SANITY_REVALIDATE_TOKEN
```

This calls `revalidateTag("portfolio")` and refreshes all cached Sanity data.

---

## File Tree (Quick Reference)

```text
Iselsport/
├── src/
│   ├── app/
│   │   ├── about/page.tsx              # About page
│   │   ├── projects/page.tsx           # Projects page
│   │   ├── certifications/page.tsx     # Certifications page
│   │   ├── studio/[[...tool]]/page.tsx # Sanity Studio
│   │   ├── api/revalidate/route.ts     # ISR webhook
│   │   ├── globals.css                 # Theme and utilities
│   │   ├── layout.tsx                  # Root layout
│   │   └── page.tsx                    # Homepage entry
│   ├── components/
│   │   ├── portfolio/
│   │   │   ├── portfolio-page.tsx      # Homepage UI
│   │   │   ├── site-header.tsx         # Navbar
│   │   │   ├── site-footer.tsx         # Footer
│   │   │   ├── section.tsx             # Section wrapper
│   │   │   ├── page-banner.tsx         # Subpage banner
│   │   │   ├── project-card.tsx        # Project card
│   │   │   ├── sanity-image.tsx        # Sanity image helper
│   │   │   └── back-link.tsx           # Subpage back link
│   │   └── ui/                         # shadcn/ui primitives
│   ├── lib/
│   │   ├── format-section-title.ts     # Title cleanup helper
│   │   ├── utils.ts                    # cn() utility
│   │   └── sanity/
│   │       ├── client.ts               # Sanity fetch client
│   │       ├── env.ts                  # Env validation
│   │       ├── image.ts                # Image URL builder
│   │       ├── queries.ts              # GROQ queries
│   │       └── types.ts                # TypeScript types
│   └── sanity/
│       └── schemaTypes/                # Sanity document schemas
├── sanity.config.ts
├── sanity.cli.ts
├── next.config.ts
├── tailwind.config.ts
├── .env.example
└── README.md
```

---

## CMS Content Checklist

When setting up or debugging content in Studio, ensure these documents exist and are **published**:

1. **About Section** — name, bio, photos (`profilePhoto`, `bannerImage`, `professionalPhoto`), education
2. **Projects** — one document per project with image and URLs
3. **Certifications** — one document per credential with badge image
4. **Skills** — categories and skill items
5. **Contact Info** — email, social links, contact section copy
6. **Site Settings** — site name, footer, leadership, languages

---

## License

Private portfolio project.
