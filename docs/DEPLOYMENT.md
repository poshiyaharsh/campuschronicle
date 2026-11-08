# CampusChronicle - Production Deployment Guide

This guide provides end-to-end instructions for deploying **CampusChronicle** to production using **Vercel** and **Supabase** (with optional **Cloudinary** media storage).

---

## 1. Environment Variables Matrix

| Variable Name | Environment | Access Level | Description & Required Format |
|---------------|-------------|--------------|-------------------------------|
| `NEXT_PUBLIC_SITE_URL` | Vercel & Local | **Public** | The canonical URL of the deployed app (e.g. `https://campuschronicle.vercel.app` or custom domain). |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel & Local | **Public** | Your Supabase Project API URL (e.g. `https://xyzproject.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel & Local | **Public** | Supabase anonymous public key safe for browser client requests. |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel Server Only | **SECRET** | Privileged server-only key for administrative operations. **NEVER expose to client**. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Vercel & Local | **Public** | Cloudinary account cloud identifier for responsive image transformations. |
| `CLOUDINARY_API_KEY` | Vercel Server Only | **SECRET** | Cloudinary administrative API key for server upload signatures. |
| `CLOUDINARY_API_SECRET` | Vercel Server Only | **SECRET** | Cloudinary administrative secret. |

> [!CAUTION]
> Ensure `SUPABASE_SERVICE_ROLE_KEY` and `CLOUDINARY_API_SECRET` are never prefixed with `NEXT_PUBLIC_`. In Vercel, check the "Production" and "Preview" checkboxes only.

---

## 2. Supabase Production Setup

### Step 1: Create a Production Project
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**, select your organization, and choose a region close to your primary audience (e.g. `ap-south-1` for India).
3. Set a strong database password and copy your project URL and keys from **Settings > API**.

### Step 2: Run SQL Migrations
1. In the Supabase dashboard, navigate to the **SQL Editor**.
2. Run the initial schema migration from `supabase/migrations/20261108000000_init_schema.sql`.
3. Run the Row Level Security (RLS) policies migration from `supabase/migrations/20261108000001_rls_policies.sql`.

### Step 3: Configure Storage Bucket
1. Go to **Storage > Buckets**.
2. Click **New Bucket**, name it `media`, and set it to **Public**.
3. Verify public read access policies and authenticated admin write policies.

### Step 4: Configure Authentication & Redirect URLs
1. Go to **Authentication > URL Configuration**.
2. Set **Site URL** to: `https://campuschronicle.vercel.app` (or your custom college domain).
3. Under **Redirect URLs**, add:
   - `https://campuschronicle.vercel.app/**`
   - `https://campuschronicle.vercel.app/admin/login`

### Step 5: Provision First Faculty Administrator
1. Go to **Authentication > Users** and click **Invite User** or **Add User**.
2. Enter the authorized faculty email (e.g. `it.admin@college.edu`) and generate a password.
3. In the SQL Editor, execute the role elevation query:
   ```sql
   INSERT INTO public.profiles (id, email, full_name, role)
   VALUES ('<USER-UUID-FROM-AUTH>', 'it.admin@college.edu', 'Faculty Coordinator', 'admin')
   ON CONFLICT (id) DO UPDATE SET role = 'admin';
   ```

---

## 3. Vercel Production Deployment

### Step 1: Import GitHub Repository
1. Log into [Vercel](https://vercel.com).
2. Click **Add New > Project** and select `poshiyaharsh/campuschronicle`.
3. Ensure Framework Preset is recognized as **Next.js**.
4. Set Root Directory to `./`.

### Step 2: Configure Environment Variables
Expand the **Environment Variables** accordion and add each variable from Section 1:
- `NEXT_PUBLIC_SITE_URL` = `https://campuschronicle.vercel.app`
- `NEXT_PUBLIC_SUPABASE_URL` = `https://<your-project-id>.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your-anon-key>`
- `SUPABASE_SERVICE_ROLE_KEY` = `<your-service-role-key>`

### Step 3: Deploy
1. Click **Deploy**. Vercel will install dependencies (`npm ci`), run linting, TypeScript typechecking, and static page generation.
2. Once the build completes, Vercel provides a live HTTPS URL (e.g. `https://campuschronicle.vercel.app`).

---

## 4. Custom Domain Setup (Optional)

1. In Vercel Project Settings, navigate to **Domains**.
2. Enter your department domain (e.g., `chronicle.it.college.edu` or `campuschronicle.edu`).
3. In your institutional DNS manager (Cloudflare, GoDaddy, Route53), create:
   - **CNAME Record:** `chronicle.it` -> `cname.vercel-dns.com`
   - (or **A Record:** `@` -> `76.76.21.21`)
4. Vercel automatically provisions and renews a free Let's Encrypt SSL certificate.

---

## 5. Post-Deployment Smoke Test Checklist

Once the live production URL is reachable, execute the following verification pass:

- [ ] **Home Page (`/`):** Loads in < 1.5s with hero section, statistics, and module cards.
- [ ] **Classroom (`/classroom`):** Album cards render cover images cleanly.
- [ ] **Technical Visits (`/technical-visits`):** Industrial tour cards render with photo counts.
- [ ] **Events & Detail (`/events` & `/events/[slug]`):** Filter chips function; event detail page renders JSON-LD schema.
- [ ] **Photo Gallery (`/gallery`):** Category and academic-year chips update the URL; clicking an image opens the Lightbox.
- [ ] **Video Gallery (`/videos`):** Video player loads HLS or MP4 stream; controls scrub and toggle fullscreen.
- [ ] **Search (`/search`):** Search queries return relevant results; nonexistent queries show friendly empty state.
- [ ] **Admin Authentication (`/admin`):** Logged-out access redirects to `/admin/login`; valid faculty login sets session cookie and opens dashboard.
- [ ] **Sitemap & Robots:** `https://your-domain.com/sitemap.xml` and `/robots.txt` load with HTTP 200.

---

## 6. Rollback Procedures

If an unexpected regression or database issue occurs in production:

### Instant Vercel Rollback (< 30 seconds)
1. Go to **Deployments** in the Vercel dashboard.
2. Locate the previous stable deployment (tagged with the previous `phase-XX-done`).
3. Click the three dots `...` next to the deployment and select **Promote to Production**.
4. Traffic is immediately redirected to the previous immutable serverless build with zero downtime.

### Database Recovery
1. In Supabase, navigate to **Database > Backups**.
2. Select the daily snapshot prior to the migration and click **Restore**.
3. Alternatively, execute rollback SQL statements for individual tables if schema changes were localized.

---

## 7. Troubleshooting Common Production Issues

- **Issue: Image fails to load with error "hostname not configured in next.config.mjs"**
  - *Fix:* Verify that the image host is registered in `images.remotePatterns` inside `next.config.mjs`.
- **Issue: Video player shows "Playback error"**
  - *Fix:* Ensure CORS headers on the storage server or CDN allow `GET` requests from your production domain, and that the stream source URL begins with `https://`.
- **Issue: Admin redirected in loop**
  - *Fix:* Ensure browser cookies are enabled for your production domain and that `campus_admin_session` or `sb-access-token` is present in browser storage.
