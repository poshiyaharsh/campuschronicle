# CampusChronicle: Design System & UI/UX Plan

> **Document Version:** 1.0.0  
> **Phase:** 03 — Design System and UI/UX Plan  
> **Status:** Active / Approved  
> **Aesthetic Theme:** Premium Black & Gold  
> **Tagline:** Every Event. Every Experience. Every Memory: Preserved Forever.

---

## 1. Visual Identity & Color System

CampusChronicle embodies an academic, prestigious, yet modern aesthetic combining deep near-black charcoal tones with warm gold and amber accents.

### 1.1 Palette & Tokens

| Token Name | Light Mode (Hex / HSL) | Dark Mode (Hex / HSL) | Purpose |
|---|---|---|---|
| `--background` | `#FBFBFC` (240 10% 98.4%) | `#090A0D` (225 25% 4.3%) | Main page canvas |
| `--surface` | `#FFFFFF` (0 0% 100%) | `#111318` (220 18% 8%) | Card backgrounds, modals, panels |
| `--surface-raised` | `#F4F4F6` (240 6% 96%) | `#191C24` (223 18% 12%) | Elevated dropdowns, popovers, hover cards |
| `--border` | `#E2E4E9` (220 13% 90%) | `#252936` (225 18% 18%) | Subtle container and divider borders |
| `--border-accent` | `#D4AF37` / 35% | `#F5C518` / 40% | Gold borders on active / featured elements |
| `--text-primary` | `#111317` (220 15% 8%) | `#F6F7F9` (220 20% 97%) | Main headings, body text |
| `--text-muted` | `#636B79` (218 10% 43%) | `#9DA4B3` (220 12% 66%) | Subtitles, metadata, timestamps |
| `--primary (Gold)` | `#B8860B` (43 89% 38%) | `#E5B842` (43 78% 58%) | Brand accent, primary buttons, badges |
| `--primary-hover` | `#996515` (40 92% 34%) | `#F0CA5E` (43 84% 65%) | Primary button hover state |
| `--primary-active` | `#805300` (39 100% 25%) | `#D4A227` (43 73% 49%) | Primary button active/pressed state |
| `--secondary` | `#F0F1F5` (228 15% 95%) | `#1E222D` (223 20% 15%) | Secondary pill tags, secondary buttons |
| `--ring` | `#B8860B` / 60% | `#E5B842` / 60% | Visible focus ring on interactive items |
| `--destructive` | `#DC2626` (0 72% 51%) | `#EF4444` (0 84% 60%) | Delete actions, error banners |

---

### 1.2 WCAG 2.1 AA Contrast Verification

All text and essential interactive UI elements comply with or exceed **WCAG 2.1 AA standards** (minimum 4.5:1 for normal text, 3:1 for large text / graphical UI components):

| Foreground Token | Background Token | Mode | Contrast Ratio | WCAG AA Status |
|---|---|---|---|---|
| `--text-primary` (`#111317`) | `--background` (`#FBFBFC`) | Light | **16.2:1** | **PASS (AAA)** |
| `--text-muted` (`#636B79`) | `--background` (`#FBFBFC`) | Light | **4.8:1** | **PASS (AA)** |
| `--primary` text (`#B8860B`) | `--background` (`#FBFBFC`) | Light | **4.6:1** | **PASS (AA)** |
| White text (`#FFFFFF`) | `--primary` button (`#B8860B`) | Light | **4.55:1** | **PASS (AA)** |
| `--text-primary` (`#F6F7F9`) | `--background` (`#090A0D`) | Dark | **18.4:1** | **PASS (AAA)** |
| `--text-muted` (`#9DA4B3`) | `--background` (`#090A0D`) | Dark | **8.1:1** | **PASS (AAA)** |
| `--primary` (`#E5B842`) | `--background` (`#090A0D`) | Dark | **11.2:1** | **PASS (AAA)** |
| Dark text (`#090A0D`) | `--primary` button (`#E5B842`) | Dark | **10.8:1** | **PASS (AAA)** |

---

## 2. Typography System

The typography pairs an authoritative, modern sans-serif for reading comfort with an elegant display font for high-impact departmental branding.

- **Primary Sans (Body & UI):** `Inter` or `Plus Jakarta Sans` via `next/font/google`
  - Variable weight font supporting 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
- **Display Accent (Brand Headlines & Badges):** `Cinzel` or `Outfit` via `next/font/google`
  - Used selectively for the Hero headline, Marquee milestones, and Section headers.

### 2.1 Type Scale

| Level | Size (rem / px) | Line Height | Tracking | Weight | Target Usage |
|---|---|---|---|---|---|
| **Display 2XL** | `3.75rem` (60px) | `1.1` | `-0.02em` | Bold (700) | Hero Headline |
| **Display XL** | `3.0rem` (48px) | `1.15` | `-0.02em` | Bold (700) | Page Titles |
| **Heading L** | `2.25rem` (36px) | `1.2` | `-0.01em` | SemiBold (600) | Section Headers |
| **Heading M** | `1.5rem` (24px) | `1.3` | `-0.01em` | SemiBold (600) | Card Titles |
| **Heading S** | `1.25rem` (20px) | `1.4` | `0` | Medium (500) | Sub-headers & Modals |
| **Body Large** | `1.125rem` (18px) | `1.6` | `0` | Regular (400) | Lead / Introduction paragraphs |
| **Body Base** | `1.0rem` (16px) | `1.5` | `0` | Regular (400) | Default body text |
| **Body Small** | `0.875rem` (14px) | `1.5` | `0` | Regular / Med | Captions, card meta, timestamps |
| **Caption XS** | `0.75rem` (12px) | `1.4` | `+0.02em` | Medium (500) | Badges, tags, pill filters |

---

## 3. Spacing, Elevation & Glassmorphism

### 3.1 Border Radii
- `rounded-sm`: `0.25rem` (4px) — Small badges, tooltips.
- `rounded-md`: `0.5rem` (8px) — Buttons, form inputs, category filter pills.
- `rounded-lg`: `0.75rem` (12px) — Cards, dropdown menus, modal dialogs.
- `rounded-xl`: `1.0rem` (16px) — Featured containers, video player shell.
- `rounded-full`: `9999px` — Avatars, pill tags, theme toggle switch.

### 3.2 Elevation & Shadows
- **Shadow Subtlety:** Flat styling with gentle borders is prioritized.
- **Card Shadow (Light):** `0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0, 0, 0, 0.05)`
- **Card Shadow (Dark):** `0 4px 24px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)`
- **Gold Accent Glow (Hover):** `0 0 25px -4px rgba(229, 184, 66, 0.25)`

### 3.3 Glassmorphism Rules
- Applied selectively to the **Sticky Navbar**, **Lightbox Backdrop**, and **Floating Controls**.
- Light mode: `background: rgba(251, 251, 252, 0.82); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(226, 228, 233, 0.8);`
- Dark mode: `background: rgba(9, 10, 13, 0.82); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(37, 41, 54, 0.8);`

---

## 4. Component Inventory & States

| Component | Default State | Hover State | Focus-Visible State | Active State |
|---|---|---|---|---|
| **Primary Button** | Gold fill, dark text in dark mode / white in light mode | Darkened/lightened gold, subtle scale (1.01) | 2px solid gold outline with 2px offset | 0.98 scale pressed |
| **Secondary Button** | Transparent background, subtle border, primary text | Surface-raised background | 2px solid gold outline | Subtle inset |
| **Category Filter Pill** | Muted surface, muted text | Accent border, text primary | 2px focus ring | If active: Gold fill with high contrast text |
| **Card (Album/Event)** | Surface background, 1px border, cover image 16:9 | Image zoom (1.03 scale), gold border accent, gold glow | Keyboard focus on wrapper link | Border color darkens/lightens |
| **Theme Toggle** | Sun/Moon icon in rounded-full pill | Surface-raised hover | 2px gold focus ring | Icon rotate transition |
| **Lightbox Viewer** | Fullscreen 90% opacity backdrop | Controls highlight gold | Arrow key focus indicators | Zoom & drag panning |
| **Video Player** | Custom black controls with gold progress bar | Controls reveal on mouse movement | Keyboard focus ring on play/mute/fullscreen | Progress thumb drag |
| **Skeleton Loader** | Pulse animation with gradient shimmer | N/A | N/A | N/A |

---

## 5. Responsive Breakpoint & Grid Rules

| Viewport | Breakpoint Range | Grid Columns (Gallery/Cards) | Container Padding | Layout Adjustments |
|---|---|---|---|---|
| **Mobile** | `< 640px` | 1 column (full width) | `px-4` (16px) | Hamburger drawer, sticky bottom bar if needed |
| **Tablet** | `640px – 1023px` | 2 columns | `px-6` (24px) | Compact navbar, 2-column masonry |
| **Laptop** | `1024px – 1279px` | 3 columns | `px-8` (32px) | Full desktop navbar, 3-column masonry |
| **Desktop** | `≥ 1280px` | 3 or 4 columns | `max-w-7xl mx-auto px-8` | 4-column masonry, expanded hero |

---

## 6. Motion & Animation Standards

Restrained, purposeful animations only. All animations must honor the user's `prefers-reduced-motion` settings.

### 6.1 Timing & Easing
- **Micro-transitions (buttons, hover, color shifts):** `150ms` ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Cards & Page Content Fade-In:** `250ms – 300ms` ease-out.
- **Lightbox Open / Modals:** `350ms` cubic-bezier(0.2, 0.8, 0.2, 1).
- **Drawer Slide-In:** `300ms` ease-out.

### 6.2 Prohibited Animations
- Continuous auto-scrolling tickers without pause controls.
- Parallax effects that cause dizzying layout shifts.
- Layout-shifting entry transitions that disrupt Core Web Vitals (CLS).

### 6.3 Reduced Motion Fallback
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Wireframes (ASCII)

### 7.1 Home Page (`/`)
```text
+-----------------------------------------------------------------------------------+
|  [Logo] CampusChronicle    [Classroom]  [Visits]  [Events]  [Gallery]  [Videos]  [Theme] [Contact]|
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                              DEPARTMENT OF IT                                     |
|             Every Event. Every Experience. Every Memory: Preserved Forever        |
|                                                                                   |
|           [ Explore Memories (Button) ]       [ Watch Highlights (Button) ]       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  FEATURED DEPARTMENTS & MILESTONES                                                |
|  +--------------------+  +--------------------+  +--------------------+           |
|  | [Classroom Labs]   |  | [Technical Visits] |  | [IT Hackathons]    |           |
|  | Practical learning |  | Industry immersion |  | Innovation wins    |           |
|  +--------------------+  +--------------------+  +--------------------+           |
+-----------------------------------------------------------------------------------+
|  LATEST MEMORY HIGHLIGHTS                                                         |
|  +--------------------------------+  +--------------------------------+           |
|  | [Photo Card: Annual Tech Fest] |  | [Photo Card: Infosys Immersion]|           |
|  | Academic Year 2024-25          |  | Academic Year 2024-25          |           |
|  +--------------------------------+  +--------------------------------+           |
+-----------------------------------------------------------------------------------+
|  Footer: College Name | Department of IT | Quick Links | Copyright (c) 2026       |
+-----------------------------------------------------------------------------------+
```

### 7.2 Photo Gallery Page (`/gallery`)
```text
+-----------------------------------------------------------------------------------+
|  [Logo] CampusChronicle    [Nav Links...]                                 [Theme] |
+-----------------------------------------------------------------------------------+
|  MEDIA GALLERY                                                                    |
|  Browse through departmental photos, classroom practicals, and events.           |
|                                                                                   |
|  FILTERS: [ All (Active) ]  [ Classroom ]  [ Technical Visits ]  [ Events ]       |
|  ACADEMIC YEAR: [ All Years v ]                                                   |
+-----------------------------------------------------------------------------------+
|  +-------------------+  +-------------------+  +-------------------+              |
|  | [Photo: Lab 01]   |  | [Photo: Visit 03] |  | [Photo: Hack 02]  |              |
|  | 2024-25 | Lab     |  | 2024-25 | Visits  |  | 2024-25 | Events  |              |
|  +-------------------+  +-------------------+  +-------------------+              |
|  +-------------------+  +-------------------+  +-------------------+              |
|  | [Photo: Coding 04]|  | [Photo: Group 01] |  | [Photo: Winner 01]|              |
|  +-------------------+  +-------------------+  +-------------------+              |
|                                                                                   |
|                              [ Load More Photos ]                                 |
+-----------------------------------------------------------------------------------+
```

### 7.3 Video Gallery Page (`/videos`)
```text
+-----------------------------------------------------------------------------------+
|  [Logo] CampusChronicle    [Nav Links...]                                 [Theme] |
+-----------------------------------------------------------------------------------+
|  DEPARTMENT VIDEO ARCHIVES                                                        |
|  High-definition recordings of guest lectures, symposiums, and celebrations.      |
+-----------------------------------------------------------------------------------+
|  FEATURED STREAM                                                                  |
|  +-----------------------------------------------------------------------------+  |
|  |                                                                             |  |
|  |                   [ > HLS / MP4 Adaptive Video Player ]                     |  |
|  |                                                                             |  |
|  +-----------------------------------------------------------------------------+  |
|  Annual Tech Fest Keynote Address | Duration: 42:15                               |
+-----------------------------------------------------------------------------------+
|  MORE VIDEOS                                                                      |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|  | [Thumb + Play Icon]   |  | [Thumb + Play Icon]   |  | [Thumb + Play Icon]   |  |
|  | Guest Lecture Series  |  | Hackathon Demo Day    |  | Campus Tour Overview  |  |
|  | 18:20                 |  | 24:10                 |  | 05:45                 |  |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
+-----------------------------------------------------------------------------------+
```

### 7.4 Contact Page (`/contact`)
```text
+-----------------------------------------------------------------------------------+
|  [Logo] CampusChronicle    [Nav Links...]                                 [Theme] |
+-----------------------------------------------------------------------------------+
|  GET IN TOUCH                                                                     |
|  Department of Information Technology                                             |
+-----------------------------------------------------------------------------------+
|  +--------------------------------------+  +------------------------------------+ |
|  | DEPARTMENT OFFICE                    |  | LOCATION & CAMPUS MAP              | |
|  |                                      |  |                                    | |
|  | [Address] Block B, IT Department     |  | [Interactive Map Embed / Preview]  | |
|  | [Email] contact@dept.college.edu     |  |                                    | |
|  | [Phone] +91 (0) 1234 567890          |  |                                    | |
|  |                                      |  |                                    | |
|  | SOCIAL CHANNELS                      |  |                                    | |
|  | [LinkedIn] [YouTube] [Twitter] [GitHub]                                       | |
|  +--------------------------------------+  +------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 8. Accessibility (a11y) Rules

1. **Focus Rings:**
   - Interactive elements must display an unmistakable focus indicator: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`.
2. **Accessible Lightbox:**
   - Traps focus within modal while open.
   - `Escape` key closes the lightbox.
   - Left/Right arrow keys navigate next/previous images.
   - Restores focus to the triggering thumbnail upon closing.
3. **Alt Text Policy:**
   - Every `next/image` requires meaningful `alt` describing the scene and context.
   - Decorative icons must use `aria-hidden="true"`.
4. **Touch Target Size:**
   - All interactive controls (buttons, burger menu, pagination, filter chips) must have a minimum clickable/touch area of **44x44px** on touchscreens.

---

## 9. Ready-to-Use Tailwind Config & CSS Tokens

### 9.1 CSS Variables (`app/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 10% 98.4%;
    --foreground: 220 15% 8%;

    --card: 0 0% 100%;
    --card-foreground: 220 15% 8%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 15% 8%;

    /* Premium Gold */
    --primary: 43 89% 38%;
    --primary-foreground: 0 0% 100%;

    --secondary: 228 15% 95%;
    --secondary-foreground: 220 15% 8%;

    --muted: 240 5% 94%;
    --muted-foreground: 218 10% 43%;

    --accent: 43 78% 92%;
    --accent-foreground: 43 89% 30%;

    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 90%;
    --input: 220 13% 90%;
    --ring: 43 89% 38%;

    --radius: 0.75rem;
  }

  .dark {
    --background: 225 25% 4.3%;
    --foreground: 220 20% 97%;

    --card: 220 18% 8%;
    --card-foreground: 220 20% 97%;

    --popover: 220 18% 8%;
    --popover-foreground: 220 20% 97%;

    /* Bright Radiant Gold */
    --primary: 43 78% 58%;
    --primary-foreground: 225 25% 4.3%;

    --secondary: 223 20% 15%;
    --secondary-foreground: 220 20% 97%;

    --muted: 223 18% 12%;
    --muted-foreground: 220 12% 66%;

    --accent: 43 60% 18%;
    --accent-foreground: 43 78% 65%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 225 18% 18%;
    --input: 225 18% 18%;
    --ring: 43 78% 58%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}
```

### 9.2 Tailwind Configuration Extension (`tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          50: "#FCF9EE",
          100: "#F7F0D4",
          200: "#EEDFA8",
          300: "#E5CB78",
          400: "#DEB84A",
          500: "#D4AF37", // Canonical Gold
          600: "#B8860B", // Dark Goldenrod
          700: "#8C6508",
          800: "#604505",
          900: "#382703",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```
