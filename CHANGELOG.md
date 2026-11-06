# Changelog

All notable changes to **CampusChronicle** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-11-06

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
