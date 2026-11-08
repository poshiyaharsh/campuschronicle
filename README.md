# CampusChronicle

<div align="center">

**Every Event. Every Experience. Every Memory: Preserved Forever.**

*A modern digital memory, event showcase, and media archiving platform for collegiate Information Technology departments.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js%20(App%20Router)-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase%20(PostgreSQL)-3ecf8e.svg?style=flat&logo=supabase)](https://supabase.com/)
[![Media: Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448c5.svg?style=flat&logo=cloudinary)](https://cloudinary.com/)

</div>

---

## 📖 About CampusChronicle

**CampusChronicle** (originally *TDEC IT Blog*) is a centralized, digital showcase and archival platform designed to celebrate and preserve collegiate department milestones. It transforms scattered departmental records into an engaging, high-performance web experience for students, faculty, alumni, and prospective visitors.

### Modernization Vision
Modernized from an unmaintained single-file legacy PHP architecture into a modular, production-grade **Next.js App Router** full-stack application with cloud-backed media delivery and role-based administration.

---

## 🚀 Key Modules & Capabilities

- 🏛️ **Department Showcase (Home):** Dynamic hero section, departmental milestones, highlights, and quick access to core sections.
- 🎓 **Classroom Activities:** Interactive timeline and photo-journal of lectures, practical lab sessions, and student workshops.
- 🏭 **Technical & Industrial Visits:** Dedicated media logs chronicling company visits, factory tours, and external technical immersion trips.
- 🏆 **IT Events & Competitions:** Structured archives for hackathons, symposiums, tech fests, and student achievements with slug-based event detail pages (`/events/[slug]`).
- 📸 **Filterable Photo Gallery:** High-performance masonry gallery powered by Cloudinary CDN, responsive image optimization, and full-screen lightbox with touch gestures and keyboard navigation.
- 🎥 **Adaptive Video Player:** Streamlined video player supporting HTML5 MP4 playback and HTTP Live Streaming (HLS `.m3u8`) with automatic stream detection and Safari fallback.
- 🌓 **Theme Management:** Premium **black & gold** visual identity with smooth, persistent switching between Dark, Light, and System themes (zero flicker on first load).
- 🛡️ **Role-Based Admin Panel:** Protected administrative dashboard backed by Supabase Auth and Row Level Security (RLS) for uploading photos, adding video links, and updating departmental records without code changes.
- 🔍 **Full-Text Search & Academic Filters:** Search capabilities across events, captions, and tags, with academic-year filtering.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router, React Server Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict mode) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) (Restrained, prefers-reduced-motion safe) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light/System) |
| **Lightbox** | [yet-another-react-lightbox](https://yet-another-react-lightbox.com/) |
| **Video Streaming**| [HLS.js](https://github.com/video-dev/hls.js/) + HTML5 Native Video |
| **Database & Auth**| [Supabase](https://supabase.com/) (PostgreSQL + RLS + GoTrue Auth) |
| **Media Delivery** | [Cloudinary](https://cloudinary.com/) (WebP/AVIF auto-format, responsive breakpoints) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
campuschronicle/
├── docs/                   # Architectural blueprints, design tokens & audit reports
├── legacy/                 # Preserved original PHP reference project
├── phases/                 # Internal phase specifications & execution playbooks (private)
├── scripts/                # Media migration and database maintenance utilities
├── .env.example            # Environment variables template
├── .gitignore              # Version control ignore rules (protects phases & secrets)
├── CHANGELOG.md            # Release and implementation history
└── README.md               # Project documentation and developer guide
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: v18.18+ or v20+
- **Package Manager**: npm, yarn, or pnpm
- **Git**: Installed and configured

### 1. Clone the Repository
```bash
git clone https://github.com/poshiyaharsh/campuschronicle.git
cd campuschronicle
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local environment file:
```bash
cp .env.example .env.local
```
Fill in your Supabase project credentials and Cloudinary API configuration in `.env.local`.

### 3. Install Dependencies
```bash
npm install
```

### 4. Available Scripts
```bash
# Run local development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run Next.js / ESLint linter
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Security & Privacy Notice

- Sensitive credentials, API keys, database connection strings, and local environment files (`.env*`) are strictly excluded via `.gitignore`.
- Internal implementation playbooks and task breakdown files are isolated under `/phases` and excluded from public commit history.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
