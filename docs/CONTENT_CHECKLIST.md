# CampusChronicle: Content Checklist

> **Purpose:** Master checklist of real departmental facts, media assets, and credentials required from the project owner.  
> **Rule:** The agent will NEVER invent any values. All missing values remain marked as `TODO_VERIFY` until provided by the owner.

---

## 1. Department Identity & Contact Information

| Item | Description | Needed for Phase | Provided? | Value |
|---|---|---|---|---|
| **Department Name** | Full official name of the department (e.g., *Department of Information Technology*) | Phase 04 / 06 | No | `TODO_VERIFY` |
| **College Name** | Full collegiate institution name | Phase 04 / 06 | No | `TODO_VERIFY` |
| **Campus / Building Address** | Physical postal address, block, and room numbers | Phase 06 | No | `TODO_VERIFY` |
| **Official Contact Email** | Public inquiry and departmental email address | Phase 06 | No | `TODO_VERIFY` |
| **Department Phone Number** | Official office telephone / helpdesk line | Phase 06 | No | `TODO_VERIFY` |
| **Social Links: LinkedIn** | Official department or college LinkedIn page URL | Phase 06 | No | `TODO_VERIFY` |
| **Social Links: YouTube** | Official department video channel URL | Phase 06 / 08 | No | `TODO_VERIFY` |
| **Social Links: X (Twitter)** | Official department Twitter/X handle URL | Phase 06 | No | `TODO_VERIFY` |
| **Social Links: GitHub** | Departmental GitHub organization or repository link | Phase 06 | No | `TODO_VERIFY` |
| **Head of Department (HOD) Name** | Name and title for welcome/introductory note | Phase 06 | No | `TODO_VERIFY` |
| **Welcome Message Copy** | Paragraph introducing the department ethos and community | Phase 06 | No | `TODO_VERIFY` |

---

## 2. Media Assets (Photos & Videos)

| Item | Description | Needed for Phase | Provided? | Value / Location |
|---|---|---|---|---|
| **Classroom Photos** | High-resolution photos of lectures, labs, and student activities | Phase 05 | No | `media-source/classroom/` (`TODO_VERIFY`) |
| **Technical Visit Photos** | Industrial visit photos, company tour snapshots | Phase 05 | No | `media-source/visits/` (`TODO_VERIFY`) |
| **IT Event Photos** | Hackathons, coding contests, symposiums, tech fest coverage | Phase 05 | No | `media-source/events/` (`TODO_VERIFY`) |
| **General / Banner Images** | Department hero banner, campus building shots | Phase 04 / 05 | No | `media-source/banners/` (`TODO_VERIFY`) |
| **Video Files / URLs** | MP4 recordings or HLS (`.m3u8`) streaming playlist URLs | Phase 05 / 08 | No | `media-source/videos/` (`TODO_VERIFY`) |
| **Photo Captions & Credits** | Captions describing who/what/when for gallery items | Phase 05 / 07 | No | `TODO_VERIFY` |
| **Academic Years List** | Range of active academic years to display (e.g. 2023-24, 2024-25) | Phase 05 / 06 | No | `TODO_VERIFY` |

---

## 3. Events & Milestones Data

| Item | Description | Needed for Phase | Provided? | Value |
|---|---|---|---|---|
| **Featured Events List** | Titles, dates, and summaries of marquee IT events | Phase 06 | No | `TODO_VERIFY` |
| **Event Slugs & Descriptions** | Detailed writeups, agendas, and winner lists for `/events/[slug]` | Phase 06 | No | `TODO_VERIFY` |
| **Company Visit Details** | Names of companies visited, dates, and immersion focus | Phase 06 | No | `TODO_VERIFY` |

---

## 4. Cloud & Administrative Credentials

| Item | Description | Needed for Phase | Provided? | Value |
|---|---|---|---|---|
| **Supabase Project URL** | Production Supabase project endpoint | Phase 04 / 05 | No | `TODO_VERIFY` (stored in `.env.local`) |
| **Supabase Anon Key** | Public client anonymous API key | Phase 04 / 05 | No | `TODO_VERIFY` (stored in `.env.local`) |
| **Supabase Service Role Key** | Privileged server-side key for migrations & admin | Phase 05 / 10 | No | `TODO_VERIFY` (stored in `.env.local`) |
| **Cloudinary Cloud Name** | Target Cloudinary account identifier | Phase 05 | No | `TODO_VERIFY` (stored in `.env.local`) |
| **Cloudinary API Key & Secret** | Media ingestion credentials | Phase 05 | No | `TODO_VERIFY` (stored in `.env.local`) |
| **Admin Email Address(es)** | Email address to be granted initial administrator role | Phase 10 | No | `TODO_VERIFY` |
