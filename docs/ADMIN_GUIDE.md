# CampusChronicle - Faculty & Administrator Guide

Welcome to the **CampusChronicle Admin Portal**! This guide is written in plain, non-technical language to help college faculty, student coordinators, and department heads manage, upload, and publish departmental media, albums, and events with ease.

---

## Table of Contents

1. [Accessing the Admin Portal](#1-accessing-the-admin-portal)
2. [Dashboard Overview](#2-dashboard-overview)
3. [Managing Photos & Videos](#3-managing-photos--videos)
   - [Uploading Photos](#uploading-photos)
   - [Adding Videos](#adding-videos)
   - [Deleting Media](#deleting-media)
4. [Managing Albums](#4-managing-albums)
   - [Creating an Album](#creating-an-album)
   - [Publishing & Unpublishing](#publishing--unpublishing)
5. [Managing Events](#5-managing-events)
   - [Creating an Event](#creating-an-event)
   - [Marking an Event as Featured](#marking-an-event-as-featured)
6. [Updating Site Settings](#6-updating-site-settings)
7. [Security & Best Practices](#7-security--best-practices)

---

## 1. Accessing the Admin Portal

- **URL:** Navigate to `/admin` in your web browser (e.g., `https://your-domain.com/admin` or `http://localhost:3000/admin`).
- **Automatic Redirect:** If you are not signed in, you will be redirected to the secure login page at `/admin/login`.
- **Signing In:**
  1. Enter your authorized departmental email address.
  2. Enter your password.
  3. Click **Sign In to Admin Console**.
  4. Once authenticated, an admin session cookie (`sb-access-token`) is stored securely, granting you access to the console.
- **Signing Out:** Click the red **Log Out** button located in the top-right corner of the admin header at any time.

---

## 2. Dashboard Overview

When you log into `/admin`, you will see the **Department Overview**:
- **Total Albums:** Current count of photo/video collections.
- **Photos Preserved:** Total count of individual photos ingested into the gallery.
- **Archived Videos:** Count of MP4 and HLS video recordings.
- **Department Events:** Count of academic, cultural, and technical events on record.
- **Quick Actions:** One-click shortcuts to immediately upload media, create a new album, add an event, or update site settings.
- **Recent Activity:** A chronological audit log of recent publishing and media actions.

---

## 3. Managing Photos & Videos

Navigate to the **Media** tab in the admin navigation bar.

### Uploading Photos
1. In the **Upload Photos** card, select the target **Album** and **Category** (`Classroom`, `Technical Visits`, or `Department Events`).
2. Select the **Academic Year** (e.g., `2024-25`).
3. Click or drag-and-drop image files into the upload box (supports JPEG, PNG, WebP).
4. Enter a descriptive title and optional caption.
5. Click **Upload Photos**. A visual progress bar displays the upload status until complete.

> [!TIP]
> **Recommended Photo Size:** Keep original images under 5 MB each. High-resolution photos are automatically compressed and served via CDN to ensure fast page loads for students on mobile devices.

### Adding Videos
CampusChronicle streams videos directly without buffering using adaptive streaming.
1. In the **Add Video Stream** section, enter the video **Title** and **Category**.
2. Paste the **Video Stream URL**:
   - For regular video files: Paste an `.mp4` link (e.g., Cloudinary or direct storage URL).
   - For adaptive streaming: Paste an `.m3u8` HLS playlist URL.
3. Paste a **Poster Image URL** (the preview thumbnail shown before the video plays).
4. Enter the duration in seconds (e.g., `180` for 3 minutes).
5. Click **Add Video to Gallery**.

### Deleting Media
- In the **Media Library** table, click the red **Delete** button next to any item.
- A confirmation prompt will appear to prevent accidental deletions.

---

## 4. Managing Albums

Navigate to the **Albums** tab.

### Creating an Album
1. Enter the **Album Title** (e.g., *"National Science Day 2025"*).
2. The URL slug will be suggested or entered automatically.
3. Select the **Category** and **Academic Year**.
4. Provide a brief description of the memory or occasion.
5. Provide a cover image URL.
6. Click **Create Album**.

### Publishing & Unpublishing
- Each album card includes a **Published / Draft** badge.
- Click **Unpublish** to temporarily hide an album from the public student portal while you finalize captions or curate photos.
- Click **Publish** when ready. Changes take effect on the live website immediately without redeploying code.

---

## 5. Managing Events

Navigate to the **Events** tab.

### Creating an Event
1. Fill out the event **Title**, **Event Date**, and **Location** (e.g., *"Auditorium, Block B"*).
2. Select the **Category** (`Hackathon`, `Workshop`, `Cultural`, `Seminar`, `Industrial Visit`).
3. Write a summary and detailed agenda.
4. Set whether the event should be **Featured** on the homepage hero carousel.
5. Click **Save Event**.

---

## 6. Updating Site Settings

Navigate to the **Settings** tab. Here faculty can update public contact information without editing code:
- **Department Name:** e.g., Information Technology Department.
- **Office Location:** Building, room number, or block.
- **Contact Email & Phone:** Official departmental inquiry points.
- **Social Media Links:** Official LinkedIn page, YouTube channel, GitHub organization, and Instagram profile.
- Click **Save Changes**. Validation ensures all URL fields contain valid web links before saving.

---

## 7. Security & Best Practices

1. **Role-Based Protection:** Only authorized faculty email addresses configured with admin privileges can log in. The server rejects unauthorized access attempts automatically via edge middleware.
2. **Never Share Credentials:** Each faculty member should use their own institutional credentials.
3. **Draft Mode for In-Progress Events:** Always keep albums or events in **Draft** mode until all student photos and captions are verified.
4. **Questions & Support:** For any technical errors or to grant access to a new faculty coordinator, contact the IT Systems Administrator or file an issue in the project repository.
