# CampusChronicle - Testing & Quality Assurance Guide

This document describes the automated testing suites, continuous integration (CI) workflows, and manual QA procedures used to ensure stability, performance, and accessibility across **CampusChronicle**.

---

## 1. Automated Test Architecture

The testing strategy follows a pyramid approach:

```
        ▲
       / \
      / E2E \       Playwright (End-to-End browser interactions)
     /-------\
    /  Unit   \     Vitest (Fast validation of pure logic, schemas, and search)
   /-----------\
  / Static Pass \   TypeScript (Strict typechecking) & ESLint (Next.js rules)
 /---------------\
```

---

## 2. Running Tests Locally

### A. Static Code Quality
```bash
# Run ESLint across all components and pages
npm run lint

# Run strict TypeScript compiler verification without emitting files
npm run typecheck
```

### B. Unit Testing (Vitest)
Unit tests validate pure functions, Zod schema validations, slug generators, and search filtering algorithms without requiring a running web server.
```bash
# Run all unit tests once
npm run test

# Run unit tests in interactive watch mode during development
npm run test:watch
```

### C. End-to-End Testing (Playwright)
Playwright spins up headless browser instances (Chromium and Mobile Chrome emulation) and tests full user flows against the Next.js production build.
```bash
# First time setup: install Playwright browser binaries
npx playwright install chromium

# Run all E2E tests headlessly
npm run test:e2e

# Run with interactive Playwright UI mode
npx playwright test --ui
```

### D. Run the Complete Test Suite
```bash
npm run test:all
```

---

## 3. What is Covered

### Unit Tests (`tests/unit/pure-logic.test.ts`)
- **Video Detection Logic:** Verification of HLS `.m3u8` playlists vs. MP4 files vs. unknown streaming blobs.
- **Slug Generation:** Stripping special characters, lowercasing, handling whitespace, and creating URL-friendly slugs.
- **Zod Schemas:** Verification of login credentials, album parameters, event attributes, media schemas (image & video), and site settings.
- **Search Engine Logic:** Keyword matching across titles, captions, and tags; multi-term queries; distinct academic year extraction.

### End-to-End Tests (`tests/e2e/campuschronicle.spec.ts`)
1. **Core Navigation & 404:** Traverses `/`, `/classroom`, `/technical-visits`, `/events`, `/gallery`, `/videos`, `/contact`, and asserts custom 404 page behavior.
2. **Theme Switcher:** Toggles between Dark and Light mode and ensures preference persistence on reload.
3. **Gallery Filters:** Tests category chips and academic year chips, asserting URL query parameter synchronization (`?category=...&year=...`).
4. **Lightbox Modal:** Opens high-resolution photo view, tests keyboard navigation, and verifies modal dismissal on `Escape`.
5. **Video Streaming Interface:** Tests video container rendering and playback element availability.
6. **Search Archives:** Tests live search input, keyword submission, result card rendering, and the zero-result empty state.
7. **Admin Security Guard:** Asserts that unauthenticated requests to `/admin` are redirected server-side to `/admin/login`.
8. **Mobile Viewport Smoke Test:** Simulates a mobile screen (390x844px), opens the mobile menu drawer, and checks navigation.

---

## 4. What is Not Covered by Automation

Automated tests cannot evaluate subjective human experiences:
- **Visual Aesthetic & Typography Balance:** Aesthetic appeal of Black & Gold color accents on varying screen resolutions.
- **True Touch Ergonomics on Physical Mobile Hardware:** Thumb reachability on physical phone screens.
- **Real-time Video Network Degradation:** Video buffering under flaky 3G/2G mobile data connections.

---

## 5. Manual QA Checklist for Releases

Before deploying a new version to production, perform the following manual checks:

- [ ] **Physical Device Check:** Open the site on an iOS (Safari) and Android (Chrome) device.
- [ ] **Orientation Test:** Rotate mobile device between portrait and landscape modes. Verify no layout breaking or horizontal scrolling.
- [ ] **Video Audio Scrubbing:** Start video playback, scrub the timeline forward and backward, adjust volume slider, and enter full screen.
- [ ] **Form Error States:** On `/admin/login`, enter an invalid email format and verify error message rendering.
- [ ] **Color Contrast Verification:** Switch to Light mode in direct sunlight to ensure all text remains legible (WCAG AA compliant).
