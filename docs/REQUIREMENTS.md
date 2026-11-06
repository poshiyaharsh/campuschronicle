# CampusChronicle: Requirements & Content Plan

> **Document Version:** 1.0.0  
> **Phase:** 01 — Requirements and Content Plan  
> **Status:** Active / Approved  
> **Tagline:** Every Event. Every Experience. Every Memory: Preserved Forever.

---

## 1. Project Overview & Goals

### 1.1 Purpose
CampusChronicle is a dedicated digital memory, showcase, and media archiving platform designed for collegiate Information Technology departments. The platform centralizes classroom memories, industrial and technical visits, hackathons, academic achievements, and departmental media into a unified, responsive, and aesthetically refined website.

### 1.2 Target Audience
1. **Current Students:** Relive lab sessions, view event highlights, browse photo/video galleries, and celebrate achievements.
2. **Faculty & Staff:** Showcase curriculum enrichment, industrial engagements, and student milestones without manual code changes.
3. **Alumni:** Maintain nostalgic connections to department memories and legacy batches.
4. **Prospective Students & Parents:** Explore department vitality, modern lab culture, and industry immersion.
5. **Industry Recruiters & Visitors:** Evaluate student innovation, technical workshops, and departmental vitality.

### 1.3 Success Criteria
- **Zero Broken Layouts:** Fully responsive design from mobile devices (360px) to ultra-wide displays (1920px+).
- **Fast Load Times:** High Core Web Vitals (LCP < 2.5s, CLS < 0.1) with Next.js image optimization, blur placeholders, and CDN delivery.
- **Flawless Theming:** Persistent, flicker-free dark and light modes adhering to a premium black & gold design system.
- **Accessible & Usable:** Full keyboard navigation, screen-reader friendly alt-text, WCAG AA color contrast.
- **Admin Autonomy:** Ability for non-technical faculty to upload media, add event records, and update contact settings via a secure admin panel.

---

## 2. Content Inventory Status

- **Source Location:** `/media-source`
- **Current Status:** `No media provided yet` (contains `.gitkeep` placeholder).
- **Planned Ingestion:**
  - Classroom photos & workshop snapshots
  - Technical and industrial visit media logs
  - IT events, hackathons, and symposium coverage
  - Department promotional / header assets
  - Video recordings (MP4 & HLS `.m3u8` streams)
- **Requirement for Owner:** Real media files (images in JPG/PNG/WebP, videos in MP4 or streaming URLs) must be placed in `/media-source` organized by folder prior to Phase 05 (Media Import).

---

## 3. Core Modules (The 9 Pillars)

| # | Module | Priority | Purpose & Visitor Actions | Required Content |
|---|---|---|---|---|
| **1** | **Home** | **Must have** | Dynamic departmental portal providing brand identity, mission, featured highlight cards, latest updates, and quick navigation. | Welcome text, tagline, department hero banners, featured album cards, quick links. |
| **2** | **Classroom Activities** | **Must have** | Dedicated chronicle of lecture sessions, practical labs, workshops, and guest lectures. Visitors can filter by year and explore activity albums. | Album title, date, academic year, short description, photo collection with captions. |
| **3** | **Technical Visits** | **Must have** | Showcase of industrial exposure, corporate tours, and industry immersion trips. Visitors can view company details, dates, and media. | Organization name, date, location/city, visit overview, attendee photo log. |
| **4** | **IT Events & Highlights** | **Must have** | Structured archives of departmental symposiums, coding competitions, hackathons, and celebrations with dedicated slug pages (`/events/[slug]`). | Event name, date, category tag, venue, overview description, winner highlights, media gallery. |
| **5** | **Media Gallery (Photos)** | **Must have** | High-performance, filterable masonry gallery with instant category filtering, pagination, and a full-screen lightbox with keyboard & touch support. | Photos hosted on Cloudinary, responsive dimensions, category assignment, captions (`TODO_VERIFY`). |
| **6** | **Video Gallery** | **Must have** | Centralized streaming hub supporting MP4 and HTTP Live Streaming (HLS) with auto-detection, responsive player, and custom controls. | Video title, duration, source URL (MP4 or HLS `.m3u8`), category tag, poster thumbnail. |
| **7** | **Theme Management** | **Must have** | Persistent Black & Gold theme system supporting Dark, Light, and System modes with zero flash of unstyled content. | Tokenized colors, CSS variables, theme toggle in navbar, local storage persistence. |
| **8** | **Responsive Interface** | **Must have** | Mobile-first architecture ensuring clean navigation, accessible touch targets (≥44px), and fluid typography across all breakpoints. | Responsive navbar, slide-out mobile drawer, fluid grid columns, adaptive cards. |
| **9** | **Contact & Department Info** | **Must have** | Official department presence displaying address, office email, contact numbers, and social links. | Verified physical address, official email, phone numbers, verified social profiles. |
| **+** | **Admin Panel & RBAC** | **Later (Phase 10)** | Secure administrative backend for creating, editing, and publishing media and events without modifying source code. | Supabase Auth credentials, admin roles, media upload forms, event management UI. |
| **+** | **Full-Text Search & Filters** | **Later (Phase 11)** | Search capability across albums, events, and captions, with academic year faceted filtering. | Postgres full-text search indexes, query parser, search results interface. |

---

## 4. Sitemap & Navigation Structure

```text
/ (Home)
├── /classroom               # Classroom activities & lab sessions
├── /technical-visits        # Industrial & corporate visits
├── /events                  # IT events & tech fests
│   └── /events/[slug]       # Individual event detail pages
├── /gallery                 # Unified photo gallery with category filter & lightbox
├── /videos                  # Video gallery with MP4 & HLS player
├── /contact                 # Department contact information & location
├── /search                  # Search & faceted filter results (Phase 11)
└── /admin                   # Protected admin portal (Phase 10)
    ├── /admin/login         # Admin authentication
    ├── /admin/dashboard     # Metrics overview
    ├── /admin/media         # Media upload and tagging
    ├── /admin/events        # Event CRUD
    └── /admin/settings      # Contact & site settings
```

---

## 5. Draft Content Model

### 5.1 Entities & Attributes

1. **Category**
   - `id`: UUID (Primary Key)
   - `name`: String (e.g., "Classroom", "Technical Visits", "Events", "Campus Life")
   - `slug`: String (Unique, kebab-case)
   - `description`: Text
   - `sort_order`: Integer

2. **Album**
   - `id`: UUID (Primary Key)
   - `category_id`: UUID (Foreign Key to Category)
   - `title`: String
   - `slug`: String (Unique)
   - `description`: Text
   - `academic_year`: String (e.g., "2024-25")
   - `cover_image_url`: String
   - `date`: Date
   - `is_published`: Boolean

3. **Event**
   - `id`: UUID (Primary Key)
   - `title`: String
   - `slug`: String (Unique)
   - `category`: String
   - `event_date`: Date
   - `academic_year`: String
   - `venue`: String
   - `summary`: Text
   - `body`: Text (Markdown / rich text)
   - `cover_image_url`: String
   - `is_featured`: Boolean
   - `is_published`: Boolean

4. **Media (Photo / Video Asset)**
   - `id`: UUID (Primary Key)
   - `album_id`: UUID (Nullable, Foreign Key to Album)
   - `event_id`: UUID (Nullable, Foreign Key to Event)
   - `media_type`: Enum (`image`, `video`)
   - `source_type`: Enum (`cloudinary`, `supabase`, `mp4`, `hls`)
   - `url`: String (Public URL or CDN endpoint)
   - `thumbnail_url`: String (Optimized preview thumbnail)
   - `caption`: Text (`TODO_VERIFY`)
   - `alt_text`: String
   - `academic_year`: String
   - `width`: Integer (Nullable)
   - `height`: Integer (Nullable)
   - `duration`: Integer (Seconds, for videos)
   - `sort_order`: Integer
   - `is_published`: Boolean

5. **Site Settings**
   - `id`: UUID
   - `department_name`: String (`TODO_VERIFY`)
   - `college_name`: String (`TODO_VERIFY`)
   - `tagline`: String
   - `address`: Text (`TODO_VERIFY`)
   - `contact_email`: String (`TODO_VERIFY`)
   - `contact_phone`: String (`TODO_VERIFY`)
   - `social_links`: JSON (Twitter, LinkedIn, YouTube, Instagram)

---

## 6. Proposed Category Mapping (Planned Media Ingestion)

When files are placed into `/media-source`, they will map to the target structure as follows:

| Planned Source Folder | Target Category | Target Route | Default Academic Year |
|---|---|---|---|
| `media-source/classroom/` | Classroom Activities | `/classroom` | `TODO_VERIFY` |
| `media-source/visits/` | Technical Visits | `/technical-visits` | `TODO_VERIFY` |
| `media-source/events/` | IT Events | `/events` | `TODO_VERIFY` |
| `media-source/general/` | Campus Life / Showcase | `/gallery` | `TODO_VERIFY` |
| `media-source/videos/` | Department Videos | `/videos` | `TODO_VERIFY` |
| `media-source/banners/` | Site Branding & Headers | `/` (Home banners) | N/A |

---

## 7. Page-by-Page Content Requirements

| Page | Required Copy / Assets | Data Source | Provider |
|---|---|---|---|
| **Home (`/`)** | Hero headline, department subtext, 3–4 featured cards, latest highlight snippets, quick action links | Site settings, featured events | Owner / Content checklist |
| **Classroom (`/classroom`)** | Activity album cards with cover image, date badge, photo count, session description | Albums table (category='classroom') | Owner media |
| **Visits (`/technical-visits`)** | Company visit cards with company name, visit date, brief summary, photo gallery | Albums table (category='visits') | Owner media |
| **Events (`/events`)** | Event cards with date, category tag, short description, link to detail page | Events table | Owner events |
| **Event Details (`/events/[slug]`)** | Full event report, venue, winners, attached photo grid with lightbox integration | Event entity & attached media | Owner events & media |
| **Photo Gallery (`/gallery`)** | Filterable grid with category tags, responsive image tiles, lightbox viewer | Media table | Owner media |
| **Video Gallery (`/videos`)** | Video cards with thumbnail, duration badge, video player modal / inline player | Media table (type='video') | Owner video URLs / files |
| **Contact (`/contact`)** | Department contact card, Google Map link/embed, faculty directory / office hours, feedback link | Site settings table | Owner / Content checklist |

---

## 8. Non-Functional Requirements

1. **Visual System & Aesthetics:**
   - Black & Gold design identity.
   - Dark mode default with smooth toggle to light mode.
   - Zero flash of incorrect theme on initial page load (FOUC).
2. **Performance:**
   - Next.js Server Components for lightning-fast initial render.
   - Cloudinary automatic WebP/AVIF format and responsive image srcset.
   - Core Web Vitals target: Lighthouse score ≥ 90 across Performance, Accessibility, Best Practices, and SEO.
3. **Accessibility (a11y):**
   - Full keyboard navigability for menus, gallery filters, video controls, and modal lightboxes.
   - Visible focus indicators on all interactive elements.
   - Minimum 4.5:1 text-to-background contrast ratio (WCAG AA).
   - Descriptive `alt` attributes for all images.
4. **Security:**
   - Protected admin routes guarded via Supabase Server Authentication and Next.js middleware.
   - Strict Row Level Security (RLS) policies allowing public read of published content, while write operations require admin privileges.
   - All credentials managed through environment variables (`.env.local`), never committed to Git.

---

## 9. Out of Scope for Version 1

- Multi-tenant college support (single department focus for V1).
- Live video streaming (on-demand HLS and MP4 playback only).
- Student user logins or commenting system (content is curated by department admins).
- E-commerce or ticket purchasing for events.
