# Changelog

All notable changes to **CampusChronicle** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-11-08

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
