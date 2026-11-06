# Changelog

All notable changes to **CampusChronicle** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-11-06

### Phase 0: Master Context, Repository Restructure & Git Remote Setup

#### Added
- Connected Git remote to GitHub repository: `https://github.com/poshiyaharsh/campuschronicle.git` on `main` branch.
- Created root `README.md` showcasing project identity, architecture, feature set, stack, and development guide.
- Added comprehensive `.gitignore` configured to keep all phase documentation, internal agent workflows (`phases/`, `*phase*`, `*PROJECT_LOG*`), `.env*` secrets, and build outputs strictly excluded from the public repository.
- Added `.env.example` template with configuration parameters for Supabase, Cloudinary, and site URL.
- Established clean folder layout with `/docs`, `/legacy`, `/scripts`, and organized all 14 execution phase specifications into the dedicated `/phases` directory.
