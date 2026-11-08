# Changelog

All notable changes to **CampusChronicle** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.12.0] - 2026-11-08

### Phase 12: Automated Testing and CI

#### Added
- Installed and configured `vitest` with path alias support (`vitest.config.ts`).
- Created unit test suite in `tests/unit/pure-logic.test.ts` covering:
  - Video stream type detection (HLS `.m3u8` playlists vs MP4 files).
  - Slug generation and string sanitization.
  - Zod validation schemas (`loginSchema`, `albumSchema`, `eventSchema`, `mediaSchema`, `siteSettingsSchema`).
  - Search engine keyword matching, multi-term queries, and academic year extraction.
- Configured Playwright end-to-end test framework (`playwright.config.ts`) with desktop Chromium and mobile Pixel emulation.
- Created comprehensive E2E test suite in `tests/e2e/campuschronicle.spec.ts` covering navigation, 404 status, theme toggle persistence, filter URL synchronization, lightbox modal lifecycle, video player availability, search empty states, and server-side admin authentication redirects.
- Configured GitHub Actions continuous integration workflow (`.github/workflows/ci.yml`) automating dependencies installation, linting, typechecking, unit tests, Next.js build, and Playwright execution.
- Added GitHub templates: `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/bug_report.md`, and `.github/ISSUE_TEMPLATE/feature_request.md`.
- Authored comprehensive testing and QA documentation in `docs/TESTING.md`.

### Phase 11: Search, Filters and SEO

#### Added
- Built dedicated search route `/search` with full-text search across albums, events, and media captions (`lib/data/api.ts`).
- Created `components/search/search-client.tsx` with live query input, tabbed categorization (All, Albums, Events, Media), URL parameter synchronization (`?q=...`), and zero-result empty state.
- Integrated quick search button into sticky header navigation (`Navbar`) and mobile navigation drawer.
- Implemented Academic Year filtering on `/gallery` with interactive chips synchronized to URL search params (`?category=...&year=...`).
- Implemented Academic Year and Event Type filtering on `/events` with `components/events/events-client.tsx`.
- Implemented static XML sitemap generation at `/sitemap.xml` (`app/sitemap.ts`) including all core pages and dynamic event routes.
- Implemented robots directives at `/robots.txt` (`app/robots.ts`) with admin route disallows.
- Added Open Graph images, Twitter Cards, canonical metadata base, and keyword arrays across all routes.
- Injected Schema.org JSON-LD structured data for `EducationalOrganization` in root layout and `Event` schema in `/events/[slug]`.
- Conducted semantic HTML and alt-text audit across all image components, ensuring descriptive alt attributes.

### Phase 10: Admin Panel and Auth

#### Added
- Installed `zod` for strict schema validation across admin forms.
- Created `lib/validations/admin.ts` with schemas for login, albums, events, media, and site settings.
- Created Next.js edge middleware `middleware.ts` safeguarding `/admin/*` routes from unauthorized access.
- Built `/admin/login` page with authentication feedback, session cookie management, and redirection handling.
- Built `/admin` layout console shell (`app/admin/layout.tsx`) featuring tabbed navigation and secure session logout.
- Built `/admin` dashboard overview (`app/admin/page.tsx`) with key metrics (albums, photos, videos, events) and quick actions.
- Built `/admin/media` (`app/admin/media/page.tsx`) supporting simulated multi-file photo uploads with progress indicators, caption editing, category assignments, and MP4/HLS video stream registration.
- Built `/admin/albums` (`app/admin/albums/page.tsx`) for creating new albums, toggling publish/draft states, and deletion.
- Built `/admin/events` (`app/admin/events/page.tsx`) for event authoring, featured badges, publish status toggling, and management.
- Built `/admin/settings` (`app/admin/settings/page.tsx`) for live editing of department contact details, office room, and verified social media links.
- Created comprehensive, non-technical faculty user guide `docs/ADMIN_GUIDE.md`.

---

## [0.9.0] - 2026-11-08

### Phase 08: Video Gallery & Adaptive Streaming

#### Added
- Implemented `/videos` route showcasing department video logs and keynote addresses.
- Installed `hls.js` for adaptive bitrate video streaming.
- Built `components/video/video-player.tsx`:
  - Automatic stream detection (HLS `.m3u8` vs standard MP4).
  - Native Safari HLS fallback support.
  - Black & gold custom controls: play/pause, seek scrubber, volume slider, fullscreen, and playback rate selector (0.75x–2.0x).
  - Complete keyboard navigation (Space, K, M, F, Left/Right arrow keys).
  - Playback error state handling with instant retry button.
  - Clean `hls.destroy()` unmount lifecycle prevention of memory leaks.
- Built `components/video/video-card.tsx` with thumbnail, duration badge, stream type pill, and active playback indicator.
- Built `components/video/video-gallery-client.tsx` with dynamic lazy-loaded player and interactive playlist selection.

---

## [0.8.0] - 2026-11-08

### Phase 07: Photo Gallery and Lightbox

#### Added
- Implemented `/gallery` route with high-performance responsive masonry photo grid.
- Built `components/gallery/gallery-client.tsx`:
  - Filter chips with category item counters.
  - URL-synchronized state management (`?category=classroom`, `?category=visits`, etc.).
  - Full-featured modal lightbox using `yet-another-react-lightbox` supporting keyboard navigation (Escape, Left/Right arrows), touch gestures, and focus trapping.
  - Aspect ratio locking (`aspect-[4/3]`) preventing layout shift (CLS).
  - Subtle hover zoom and overlay metadata (tags, academic year, caption).
- Installed and integrated `yet-another-react-lightbox`.

---

## [0.7.0] - 2026-11-08

### Phase 06: Core Pages Implementation

#### Added
- Implemented **Home Page (`/`)**:
  - Hero section with department branding, tagline, and primary/secondary CTAs.
  - Department ethos & welcome card with stats indicators.
  - Interactive grid linking to all 5 department pillars.
  - Featured Events & Hackathons spotlight and recent photo albums showcase.
- Implemented **Classroom Activities (`/classroom`)**:
  - Album grid showing lab sessions, cover images, photo counts, dates, and empty-state fallback.
- Implemented **Technical Visits (`/technical-visits`)**:
  - Showcase for corporate immersion tours and data center visits.
- Implemented **IT Events & Highlights (`/events`)**:
  - Structured event card grid displaying dates, venue, summaries, and category badges.
- Implemented **Event Detail Page (`/events/[slug]`)**:
  - Dynamic SSG routes (`/events/innovatex-hackathon-2024`, etc.) with cover image, narrative story, key highlights checklist, and attached photo reel.
- Implemented **Department Contact (`/contact`)**:
  - Dynamic contact card powered by `site_settings`, showing verified fields (address, email, phone, social links) and hiding unprovided ones.
- Implemented **Skeleton Loaders & UX Components**:
  - `components/common/section-header.tsx`
  - `components/common/empty-state.tsx`
  - `components/cards/album-card.tsx`
  - `components/cards/event-card.tsx`
  - `components/ui/skeleton.tsx`
  - `app/loading.tsx`, `app/classroom/loading.tsx`, `app/events/loading.tsx`.
- Verified production build generating 14/14 static and SSG pages.

---

## [0.6.0] - 2026-11-08

### Phase 05: Media Import & Database Foundation

#### Added
- Created Supabase PostgreSQL migration files:
  - `supabase/migrations/20261108000000_init_schema.sql` (schema, enums, tables, triggers, indexes).
  - `supabase/migrations/20261108000001_rls_policies.sql` (Row Level Security policies).
- Authored media migration utility `scripts/migrate-media.ts` supporting dry-run inspection and live upload with filename sanitization.
- Established mock seed database at `lib/data/mock-data.ts` and runner `scripts/seed-sample-data.ts` with labeled `TODO_VERIFY` placeholders.
- Authored `scripts/verify-media-urls.ts` and verified 100% (8/8) reachable media URLs.
- Documented ingestion results in `docs/MIGRATION_REPORT.md`.

---

## [0.5.0] - 2026-11-08

### Phase 04: Project Scaffold

#### Added
- Initialized Next.js App Router application with TypeScript and Tailwind CSS.
- Applied Black & Gold color design tokens and CSS variables to `app/globals.css` and `tailwind.config.ts`.
- Configured `ThemeProvider` (`next-themes`) with system, light, and dark mode support with zero FOUC.
- Built accessible, responsive app shell with sticky `Navbar`, mobile drawer, and `Footer`.
- Built interactive `ThemeToggle` with smooth icons and persistent local storage state.
- Scaffolded route structure with placeholder views:
  - `/` (Home with hero section & featured module cards)
  - `/classroom` (Classroom activities placeholder)
  - `/technical-visits` (Industrial visits placeholder)
  - `/events` & `/events/[slug]` (IT events directory and detail route)
  - `/gallery` (Photo gallery placeholder)
  - `/videos` (Video gallery placeholder)
  - `/contact` (Department contact card & map preview)
  - `/admin/login` (Admin auth portal view)
  - `/_not-found` & `/error` (Custom 404 & error boundary)
- Verified build and typecheck with `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run dev` (HTTP 200).

---

## [0.4.0] - 2026-11-08

### Phase 03: Design System and UI/UX Plan

#### Added
- Authored `docs/DESIGN.md` establishing the design system for CampusChronicle.
- Defined Black & Gold color token system for Light and Dark modes with HSL and CSS variable definitions.
- Completed WCAG 2.1 AA/AAA contrast verification matrix ensuring high legibility.
- Established typography scale, font pairings, spacing, border radii, shadows, and glassmorphism standards.
- Cataloged component inventory and interactive states for core components.
- Outlined responsive layout breakpoints and motion safety rules (`prefers-reduced-motion`).
- Created ASCII wireframes for Home, Gallery, Videos, and Contact pages.
- Included production-ready Tailwind CSS configuration extension and CSS variables block.

---

## [0.3.0] - 2026-11-06

### Phase 02: Architecture and Data Model

#### Added
- Authored `docs/ARCHITECTURE.md` establishing the architectural blueprint for the Next.js App Router application.
- Designed production Supabase PostgreSQL schema with full DDL for `profiles`, `categories`, `albums`, `events`, `media`, and `site_settings`.
- Defined Row Level Security (RLS) policies allowing public read of published records and role-restricted admin writes.
- Specified Cloudinary image delivery pipeline (automatic format, quality, responsive breakpoints, and blur placeholders).
- Defined adaptive video pipeline supporting HTML5 MP4 and HLS (`.m3u8`) streaming with automatic stream detection and Safari fallback.
- Added free-tier risk analysis and environment variable specifications.

---

## [0.2.0] - 2026-11-06

### Phase 01: Requirements and Content Plan

#### Added
- Created `docs/REQUIREMENTS.md` defining core project objectives, target audience, success criteria, detailed breakdown of all 9 core modules, proposed sitemap, plain-language content model, and non-functional requirements.
- Created `docs/CONTENT_CHECKLIST.md` establishing the master checklist of departmental facts, media assets, event records, and cloud credentials required from the owner (all tracked with `TODO_VERIFY` placeholders).
- Initialized `/media-source` read-only directory with `.gitkeep` for raw photo and video ingestion.
- Updated `.gitignore` to protect raw media files in `media-source/`.

---

## [0.1.0] - 2026-11-06

### Phase 0: Master Context, Repository Restructure & Git Remote Setup

#### Added
- Connected Git remote to GitHub repository: `https://github.com/poshiyaharsh/campuschronicle.git` on `main` branch.
- Created root `README.md` showcasing project identity, architecture, feature set, stack, and development guide.
- Added comprehensive `.gitignore` configured to keep all phase documentation, internal agent workflows (`phases/`, `*phase*`, `*PROJECT_LOG*`), `.env*` secrets, and build outputs strictly excluded from the public repository.
- Added `.env.example` template with configuration parameters for Supabase, Cloudinary, and site URL.
- Established clean folder layout with `/docs`, `/legacy`, `/scripts`, and organized all 14 execution phase specifications into the dedicated `/phases` directory.
