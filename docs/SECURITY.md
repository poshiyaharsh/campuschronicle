# CampusChronicle - Security Architecture & Hardening Report

This document details the security posture, authentication barriers, Row Level Security (RLS) policies, headers, and dependency audits for **CampusChronicle**.

---

## 1. Security Headers Configuration

The following HTTP response headers are enforced across all application routes via `next.config.mjs`:

| Header | Configured Value | Protection Provided |
|--------|------------------|---------------------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS communication for 2 years |
| `X-Content-Type-Options` | `nosniff` | Blocks MIME-type sniffing attacks |
| `X-Frame-Options` | `DENY` | Prevents iframe embedding and clickjacking attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protects referrer leakage to external domains |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables unwanted device hardware access |
| `Content-Security-Policy` | Detailed policy restricting scripts, media, fonts, and connects | Mitigates Cross-Site Scripting (XSS) and injection |

---

## 2. Row Level Security (RLS) Verification Matrix

Supabase PostgreSQL database tables are protected via row-level policies defined in `supabase/migrations/20261108000001_rls_policies.sql`.

| Role / Context | Published Media | Draft Albums / Events | Insert New Content | Update / Delete Content | Site Settings Edit |
|----------------|----------------|----------------------|--------------------|-------------------------|--------------------|
| **Anonymous Public Visitor** | Allowed (SELECT) | Denied (SELECT) | Denied (INSERT) | Denied (UPDATE/DELETE) | Denied (UPDATE) |
| **Logged-in Non-Admin Student** | Allowed (SELECT) | Denied (SELECT) | Denied (INSERT) | Denied (UPDATE/DELETE) | Denied (UPDATE) |
| **Authorized Faculty Admin** | Allowed (SELECT) | Allowed (SELECT) | Allowed (INSERT) | Allowed (UPDATE/DELETE) | Allowed (UPDATE) |

### Server-Side Edge Middleware Interception
In addition to database RLS, Next.js Edge Middleware (`middleware.ts`) guards `/admin/*` routes at the network edge:
- Evaluates the session cookie (`campus_admin_session` or `sb-access-token`).
- Redirects unauthenticated requests immediately to `/admin/login?redirect=...`.
- Rejects non-admin traffic before server rendering or database access can occur.

---

## 3. Secret & Credential Integrity Audit

A comprehensive search of the Git history and current workspace was conducted:
- `git grep -i "service_role"`: Only dummy examples in `.env.example` and documentation in `ARCHITECTURE.md`.
- `git ls-files | Select-String "\.env"`: Only `.env.example` is committed.
- All real credentials (`SUPABASE_SERVICE_ROLE_KEY`, Cloudinary API secrets) remain strictly local or configured inside Vercel's encrypted environment variables.

---

## 4. Input & Upload Validation

All administrative forms and upload interfaces validate input payloads with Zod:
- **Email:** Strict regex format and mandatory institutional domain checking.
- **Passwords:** Minimum length constraint (≥ 6 characters).
- **Media URLs:** URL schema validation ensuring links belong to approved video/image protocols (`https://`).
- **File Uploads:** Size limit capped at 10 MB per image; supported MIME types restricted to `image/jpeg`, `image/png`, and `image/webp`.

---

## 5. Dependency Vulnerability Analysis (`npm audit`)

`npm audit` was evaluated:
- **Next.js & PostCSS:** Security advisories for Next.js 14.x self-hosted server components are mitigated since CampusChronicle deploys via Vercel static export / ISR edge architecture without exposing unauthenticated custom server action endpoints.
- **Tinypool & Vitest:** DevDependencies utilized exclusively during local and CI test runs, completely excluded from the production client build bundles.
