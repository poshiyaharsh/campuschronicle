# CampusChronicle: Architecture and Data Model

> **Document Version:** 1.0.0  
> **Phase:** 02 — Architecture and Data Model  
> **Status:** Active / Approved  
> **Stack:** Next.js (App Router) + TypeScript + Supabase + Cloudinary + Tailwind CSS

---

## 1. Application Folder Structure

The project follows a standard Next.js 14/15 App Router architecture with strict modularity, separation of concerns, and clean boundaries:

```text
campuschronicle/
├── app/                              # Next.js App Router root
│   ├── (auth)/                       # Authentication route group
│   │   └── admin/
│   │       └── login/
│   │           └── page.tsx          # Admin login page
│   ├── (public)/                     # Public pages route group
│   │   ├── layout.tsx                # Public layout (Header, Nav, Footer)
│   │   ├── page.tsx                  # Home page (Hero, Featured, Quick links)
│   │   ├── classroom/
│   │   │   └── page.tsx              # Classroom activities list & albums
│   │   ├── technical-visits/
│   │   │   └── page.tsx              # Technical & industrial visits showcase
│   │   ├── events/
│   │   │   ├── page.tsx              # IT events list with academic year filter
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Event detail page
│   │   ├── gallery/
│   │   │   └── page.tsx              # Photo gallery with masonry & lightbox
│   │   ├── videos/
│   │   │   └── page.tsx              # Video gallery with MP4 & HLS player
│   │   └── contact/
│   │       └── page.tsx              # Contact details & location map
│   ├── admin/                        # Protected admin portal
│   │   ├── layout.tsx                # Admin dashboard layout & sidebar
│   │   ├── page.tsx                  # Metrics & overview dashboard
│   │   ├── albums/                   # Album management (CRUD)
│   │   ├── events/                   # Event management (CRUD)
│   │   ├── media/                    # Media upload & batch tagging
│   │   └── settings/                 # Contact & site settings management
│   ├── api/                          # Route handlers (webhooks, revalidation)
│   │   └── revalidate/
│   │       └── route.ts              # On-demand ISR revalidation webhook
│   ├── globals.css                   # Tailwind CSS tokens & global styles
│   ├── layout.tsx                    # Root layout (ThemeProvider, Font provider)
│   ├── not-found.tsx                 # Custom 404 page
│   └── error.tsx                     # Global error boundary
├── components/                       # Reusable UI & business components
│   ├── ui/                           # Primitive components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── skeleton.tsx
│   │   └── badge.tsx
│   ├── layout/                       # Layout components
│   │   ├── navbar.tsx                # Sticky responsive navigation
│   │   ├── mobile-nav.tsx            # Accessible mobile drawer
│   │   ├── footer.tsx                # Standard site footer
│   │   └── theme-toggle.tsx          # Light/Dark/System switcher
│   ├── gallery/                      # Gallery-specific components
│   │   ├── gallery-grid.tsx          # Masonry grid with category filter
│   │   ├── lightbox-modal.tsx        # yet-another-react-lightbox wrapper
│   │   └── photo-card.tsx            # Optimized image card with blur placeholder
│   ├── video/                        # Video components
│   │   ├── video-player.tsx          # Adaptive MP4 & HLS player (hls.js)
│   │   └── video-card.tsx            # Video thumbnail card with duration tag
│   └── common/                       # Shared utility widgets
│       ├── section-header.tsx        # Consistent section headers
│       └── empty-state.tsx           # Fallback for empty collections
├── lib/                              # Utility libraries & SDK clients
│   ├── supabase/
│   │   ├── client.ts                 # Browser client (anon key)
│   │   ├── server.ts                 # Server component client (cookies)
│   │   ├── admin.ts                  # Service role client (server actions only)
│   │   └── middleware.ts             # Session refresh & route protection
│   ├── cloudinary.ts                 # Cloudinary URL builder & image loader
│   └── utils.ts                      # Tailwind cn() and formatting helpers
├── types/                            # TypeScript interfaces & database definitions
│   ├── database.types.ts             # Supabase generated database schema types
│   └── index.ts                      # Application models (Album, Media, Event)
├── hooks/                            # Custom React hooks
│   ├── use-theme.ts
│   └── use-media-query.ts
├── docs/                             # Architecture & project specifications
├── legacy/                           # Preserved original reference project
├── media-source/                     # Read-only original photos and videos
├── phases/                           # Internal agent playbooks (git-ignored)
├── public/                           # Static assets (favicons, logos, placeholder images)
└── scripts/                          # DB migrations, seeding & migration utilities
```

---

## 2. Route Map & Rendering Strategy

| Route | Rendering Strategy | Cache / Revalidation | Purpose |
|---|---|---|---|
| `/` | SSR / ISR | Revalidate on demand or 3600s | Hero banner, marquee events, latest albums, quick links |
| `/classroom` | ISR | Revalidate on demand or 3600s | Classroom sessions and lab activities album list |
| `/technical-visits` | ISR | Revalidate on demand or 3600s | Industrial visit reports and company visit cards |
| `/events` | ISR | Revalidate on demand or 3600s | IT events, competitions, hackathons archive |
| `/events/[slug]` | ISR (Dynamic) | `generateStaticParams` + ISR | Detailed event report, schedule, winners, and photos |
| `/gallery` | Client / ISR | Category-filtered pagination | Filterable masonry photo grid with lightbox modal |
| `/videos` | ISR | Revalidate on demand | Video cards with adaptive MP4 & HLS streaming player |
| `/contact` | Static / ISR | Revalidate on demand | Department contact details, location map, social links |
| `/admin/login` | Client Component | Dynamic | Admin authentication portal |
| `/admin/*` | Dynamic (SSR) | Private, protected by Middleware | Protected CRUD management dashboard |

---

## 3. Database Schema (Supabase PostgreSQL)

```sql
-- Enable necessary PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ----------------------------------------------------
-- Enums
-- ----------------------------------------------------
CREATE TYPE media_type_enum AS ENUM ('image', 'video');
CREATE TYPE media_source_enum AS ENUM ('cloudinary', 'supabase', 'mp4', 'hls');

-- ----------------------------------------------------
-- 1. Profiles Table (Admin users linked to auth.users)
-- ----------------------------------------------------
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------
-- 2. Categories Table
-- ----------------------------------------------------
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------
-- 3. Albums Table
-- ----------------------------------------------------
CREATE TABLE albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    academic_year TEXT NOT NULL, -- e.g. '2024-25'
    cover_image_url TEXT,
    event_date DATE,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------
-- 4. Events Table
-- ----------------------------------------------------
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    summary TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    academic_year TEXT NOT NULL,
    venue TEXT,
    cover_image_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------
-- 5. Media Table (Photos and Videos)
-- ----------------------------------------------------
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    title TEXT,
    media_type media_type_enum NOT NULL DEFAULT 'image',
    source_type media_source_enum NOT NULL DEFAULT 'cloudinary',
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    alt_text TEXT,
    academic_year TEXT,
    width INT,
    height INT,
    duration INT, -- in seconds (for videos)
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX idx_media_album_id ON media(album_id);
CREATE INDEX idx_media_event_id ON media(event_id);
CREATE INDEX idx_media_category_id ON media(category_id);
CREATE INDEX idx_media_academic_year ON media(academic_year);
CREATE INDEX idx_media_type ON media(media_type);
CREATE INDEX idx_albums_category_id ON albums(category_id);
CREATE INDEX idx_albums_academic_year ON albums(academic_year);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_academic_year ON events(academic_year);

-- ----------------------------------------------------
-- 6. Site Settings Table (Key-Value / Singleton Record)
-- ----------------------------------------------------
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_name TEXT NOT NULL DEFAULT 'Department of Information Technology',
    college_name TEXT NOT NULL DEFAULT 'College of Engineering',
    tagline TEXT NOT NULL DEFAULT 'Every Event. Every Experience. Every Memory: Preserved Forever.',
    address TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Helper trigger for automatic updated_at timestamping
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_albums_updated_at BEFORE UPDATE ON albums FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
```

---

## 4. Row Level Security (RLS) Policies

All tables have RLS enabled. Anonymous visitors have read-only permissions for published content. Write operations (INSERT, UPDATE, DELETE) are restricted to authenticated users with the `admin` or `editor` role in the `profiles` table.

```sql
-- Enable RLS across all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if authenticated user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------
-- Policies: Categories
-- ----------------------------------------------------
CREATE POLICY "Public categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ----------------------------------------------------
-- Policies: Albums
-- ----------------------------------------------------
CREATE POLICY "Published albums viewable by everyone" ON albums
    FOR SELECT USING (is_published = true OR is_admin());

CREATE POLICY "Admins can manage albums" ON albums
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ----------------------------------------------------
-- Policies: Events
-- ----------------------------------------------------
CREATE POLICY "Published events viewable by everyone" ON events
    FOR SELECT USING (is_published = true OR is_admin());

CREATE POLICY "Admins can manage events" ON events
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ----------------------------------------------------
-- Policies: Media
-- ----------------------------------------------------
CREATE POLICY "Published media viewable by everyone" ON media
    FOR SELECT USING (is_published = true OR is_admin());

CREATE POLICY "Admins can manage media" ON media
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ----------------------------------------------------
-- Policies: Site Settings
-- ----------------------------------------------------
CREATE POLICY "Site settings viewable by everyone" ON site_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can update site settings" ON site_settings
    FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
```

---

## 5. Media Pipeline (Images)

### 5.1 Storage & CDN
- **Image Provider:** Cloudinary.
- **Upload Flow:**
  1. Original media placed in `/media-source` or uploaded via `/admin/media`.
  2. Ingestion script sanitizes filename into `lowercase-kebab-case` (e.g., `2024-hackathon-team-winners-01.jpg`).
  3. Uploaded to Cloudinary under folder `campuschronicle/<category>/<album>/`.
  4. Database stores Cloudinary public ID or base URL.

### 5.2 Dynamic Transformations & Next.js Image Optimization
- URLs generated using Cloudinary transformation parameters:
  - `f_auto,q_auto`: Automatic format delivery (AVIF/WebP) and adaptive compression.
  - Thumbnails: `c_fill,g_auto,w_400,h_300`.
  - Lightbox high-res: `c_limit,w_1920,h_1080`.
  - Blur placeholder: Base64 blur data URL or low-res placeholder (`w_30,e_blur:1000`).

---

## 6. Video Pipeline (MP4 & HLS)

### 6.1 Formats Supported
- **Direct MP4 Video:** Standard progressive download for short clips (< 50MB).
- **HTTP Live Streaming (HLS `.m3u8`):** Adaptive bitrate streaming for long recordings, keynote sessions, and symposium videos.

### 6.2 Player Architecture (`VideoPlayer` component)
- Built with standard HTML5 `<video>` element with [HLS.js](https://github.com/video-dev/hls.js/) integration.
- Automatic source detection:
  - If source URL ends in `.m3u8`:
    - Checks `Hls.isSupported()`: initializes HLS.js instance with attached media element.
    - If native HLS is supported (Apple Safari / iOS): uses native playback directly.
  - If source URL ends in `.mp4`: plays via native HTML5 video player.
- Complete cleanup of HLS instances on unmount to prevent memory leaks.
- Keyboard accessible controls (Space for play/pause, M for mute, F for fullscreen, Left/Right arrows for 5s seek).

---

## 7. Media Mapping Table

When media assets are added to `/media-source`, they map directly to database categories and initial albums:

| Source Directory | Category Name | Category Slug | Album Title Example |
|---|---|---|---|
| `media-source/classroom/` | Classroom Activities | `classroom` | "Web Technologies Practical Lab 2024" |
| `media-source/visits/` | Technical Visits | `technical-visits` | "Industrial Immersion at Infosys Campus" |
| `media-source/events/` | IT Events | `events` | "InnovateX Hackathon 2024" |
| `media-source/general/` | Campus Life | `campus-life` | "Department Orientation & Freshers" |
| `media-source/banners/` | Department Branding | `branding` | "Main Department Showcase Banner" |
| `media-source/videos/` | Department Video Logs | `videos` | "Annual Symposium Keynote Speech" |

---

## 8. Environment Variables Specification

The application requires the following environment variables (stored in `.env.local` and configured in Vercel):

```text
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Public App URL
NEXT_PUBLIC_SITE_URL=
```

---

## 9. Risks, Free-Tier Limits & Open Questions

### 9.1 Free-Tier Limits to Monitor
- **Supabase Free Tier:** 500MB database limit, 50,000 monthly active users, 1GB file storage. (More than sufficient for department memories).
- **Cloudinary Free Tier:** 25 monthly credits (~25GB managed storage / bandwidth). Auto-format (`f_auto,q_auto`) keeps usage minimal.
- **Vercel Hobby Plan:** 100GB monthly bandwidth, Serverless Function execution limits.

### 9.2 Open Questions for Owner
- **Q-001 (Image Host):** Confirm Cloudinary as the primary image CDN, or prefer Supabase Storage? (Cloudinary recommended for automatic WebP/AVIF and thumbnail cropping).
- **Q-002 (Video Host):** For departmental videos, will videos be hosted on Cloudinary, YouTube/Vimeo embed links, or self-hosted HLS streams?
- **Q-003 (Admin Access):** Who will be the primary administrator(s) managing uploads?
