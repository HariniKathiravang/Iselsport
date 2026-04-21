# Portfolio Website (Next.js + Sanity + Vercel)

This project is now structured as a **production-ready portfolio**:
- Next.js (App Router)
- Sanity CMS (hosted content management)
- Vercel deployment ready
- EmailJS contact form (no custom backend needed)

All portfolio content (about, projects, skills, contact, and more) comes from Sanity.  
No portfolio text/projects/images are hardcoded in page data.

---

## 1) Full File Structure

```text
portfoliofrontendsample/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ revalidate/
│  │  │     └─ route.ts
│  │  ├─ studio/
│  │  │  └─ [[...tool]]/
│  │  │     └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ portfolio/
│  │  │  ├─ portfolio-page.tsx
│  │  │  └─ section.tsx
│  │  └─ ui/
│  │     └─ ...existing reusable UI components
│  ├─ lib/
│  │  ├─ utils.ts
│  │  └─ sanity/
│  │     ├─ client.ts
│  │     ├─ env.ts
│  │     ├─ image.ts
│  │     ├─ queries.ts
│  │     └─ types.ts
│  └─ sanity/
│     └─ schemaTypes/
│        ├─ aboutSection.ts
│        ├─ contactInfo.ts
│        ├─ project.ts
│        ├─ siteSettings.ts
│        ├─ skills.ts
│        └─ index.ts
├─ sanity.config.ts
├─ sanity.cli.ts
├─ next.config.ts
├─ tailwind.config.ts
├─ .env.example
└─ README.md
```

---

## 2) Prerequisites

### Required software
- Node.js **20 LTS** or newer
- npm (comes with Node)
- Git

### Required accounts
- [Sanity](https://www.sanity.io/)
- [Vercel](https://vercel.com/)
- [EmailJS](https://www.emailjs.com/)
- GitHub (for deployment workflow)

---

## 3) Environment Variables

Create a `.env.local` file in the project root:

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2026-04-01
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_REVALIDATE_TOKEN=your_random_secret
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Where to get each value:
- `SANITY_PROJECT_ID`: Sanity project settings
- `SANITY_DATASET`: use exactly `production`
- `SANITY_API_VERSION`: keep as `2026-04-01` (stable date-based versioning)
- `SANITY_API_WRITE_TOKEN`: Sanity API token with **Editor** access (not Viewer)
- `SANITY_REVALIDATE_TOKEN`: any long secret string you create yourself
- `NEXT_PUBLIC_EMAILJS_*`: EmailJS dashboard (service, template, public key)

For Vercel: set the same variables in **Project Settings -> Environment Variables**.

---

## 4) Local Setup (Beginner Friendly)

### Step A: Install dependencies
```bash
npm install
```

### Step B: Run the app
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Step C: Open Sanity Studio
Visit [http://localhost:3000/studio](http://localhost:3000/studio) and log in with your Sanity account.

### Step D: Add your content in Studio
Create/fill documents:
1. **About Section**
2. **Projects** (multiple documents)
3. **Skills**
4. **Contact Info**
5. **Site Settings** (extra settings used by this UI)

Publish each document.

---

## 5) Sanity Schema Setup (Already Added)

The project includes these schemas:
- `project`
- `aboutSection`
- `skills`
- `contactInfo`
- `siteSettings` (additional UI content)

They are registered in `src/sanity/schemaTypes/index.ts`.

Studio config is in:
- `sanity.config.ts`
- `sanity.cli.ts`

### Important anti-bug settings
- Dataset is set to `production` by default
- API version is date-based (`2026-04-01`)
- Public read client uses `perspective: "published"` to avoid draft-only confusion
- Secure write token is separate (`SANITY_API_WRITE_TOKEN`)

---

## 6) Data Fetching + ISR (How Updates Reach Vercel)

### Where ISR is configured
- `src/app/page.tsx` has:
  - `export const revalidate = 60`
- `src/lib/sanity/client.ts` also fetches with:
  - `next: { revalidate: 60, tags: ["portfolio"] }`

### Revalidate endpoint
- `src/app/api/revalidate/route.ts`
- Trigger URL format:
  - `POST /api/revalidate?token=SANITY_REVALIDATE_TOKEN`
- It calls `revalidateTag("portfolio")`

This prevents the “Vercel not updating after CMS change” issue.

---

## 7) EmailJS Contact Form

Implemented in `src/components/portfolio/portfolio-page.tsx`.

How it works:
- User fills name/email/message
- Browser calls EmailJS directly
- Message is delivered to your configured email template
- No custom backend is required

Before using it:
1. Create EmailJS service
2. Create EmailJS template with params:
   - `from_name`
   - `from_email`
   - `message`
3. Add IDs and public key to env vars

---

## 8) Admin Control (Only You Can Edit)

Public users:
- Can only read published content via Next frontend
- Cannot access write APIs/tokens

You (admin):
- Edit via `/studio`
- Must log in to Sanity
- Must have project role with write permissions

If your role is Viewer, publish/delete will be disabled.

---

## 9) Deployment to Vercel

### Step A: Push to GitHub
```bash
git add .
git commit -m "Migrate portfolio to Next.js with Sanity CMS"
git push origin main
```

### Step B: Import project in Vercel
1. Open Vercel dashboard
2. Click **Add New -> Project**
3. Select your GitHub repository

### Step C: Add environment variables in Vercel
Copy all values from `.env.local` into Vercel project env vars.

### Step D: Deploy
Click **Deploy**.  
After deployment, your site and Studio route (`/studio`) are live.

---

## 10) CMS Usage Guide

### Log in
1. Open `yourdomain.com/studio`
2. Sign in with your Sanity account

### Add/Edit/Delete content
1. Open document type
2. Edit fields
3. Click **Publish**
4. To remove content, use **Delete**

### How publishing works
- Draft = private working copy
- Published = visible to website
- This project fetches published content for visitors

---

## 11) Troubleshooting

### A) Content not updating
1. Confirm you clicked **Publish**
2. Wait up to 60 seconds (ISR interval)
3. Trigger revalidate endpoint:
   - `POST /api/revalidate?token=YOUR_TOKEN`
4. Check dataset is `production` everywhere

### B) Publish button missing / read-only mode
1. Confirm you are logged in
2. Check role in Sanity project members
3. Use role with write permissions (Editor/Admin)
4. Ensure you are in the correct project/dataset

### C) Environment variables not working
1. Check names exactly (no typos)
2. Restart local server after changing `.env.local`
3. In Vercel, redeploy after adding/changing env vars
4. Never wrap values with extra quotes unless needed

---

## 12) Key Files To Review First

- `src/app/page.tsx` (ISR entry + data render)
- `src/lib/sanity/client.ts` (read/write clients + cache behavior)
- `src/lib/sanity/queries.ts` (all content query)
- `sanity.config.ts` (Studio setup)
- `src/sanity/schemaTypes/*` (CMS models)
- `src/components/portfolio/portfolio-page.tsx` (UI + EmailJS form)
