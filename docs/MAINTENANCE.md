# CampusChronicle - Long-Term Maintenance & Operations Guide

This guide provides technical coordinators, student leads, and IT administrators with the procedures required to maintain, monitor, and back up **CampusChronicle** over multi-year operational cycles.

---

## 1. Free-Tier Quota Monitoring

CampusChronicle is architected to operate efficiently within generous free-tier thresholds across cloud providers:

| Provider | Metric / Resource | Free Tier Limit | Threshold Warning Action |
|----------|-------------------|-----------------|--------------------------|
| **Supabase** | Database Size | 500 MB | Compress or archive legacy text logs when reaching 400 MB |
| **Supabase** | Monthly Active Users | 50,000 MAU | Clean up inactive student coordinator sessions |
| **Supabase** | Storage Bucket | 1 GB | Migrate high-volume raw images to Cloudinary |
| **Cloudinary** | Monthly Transformations | 25 Credits / mo (~25,000 transforms) | Ensure client requests reuse cached responsive image sizes |
| **Vercel** | Bandwidth | 100 GB / month | Check for excessive uncompressed media downloads if traffic spikes |
| **Vercel** | Build Execution | 6,000 build mins / mo | Rely on preview builds only for major PRs |

---

## 2. Database Backup & Disaster Recovery

### Automated Backups
- Supabase automatically takes daily snapshots of your PostgreSQL database.
- Snapshots are retained for 7 days on the free tier.

### Manual SQL Dump (Recommended before major updates)
Using the PostgreSQL command-line tool `pg_dump`:
```bash
pg_dump -h db.<your-project-id>.supabase.co -U postgres -d postgres -F c -b -v -f campuschronicle_backup_$(date +%Y%m%d).dump
```

### Restoring from Backup
```bash
pg_restore -h db.<your-project-id>.supabase.co -U postgres -d postgres -v campuschronicle_backup_YYYYMMDD.dump
```

---

## 3. Dependency Updates Cadence

To maintain security and prevent bit-rot, execute quarterly dependency health checks:

```bash
# Check for outdated packages
npm outdated

# Update non-breaking dependencies
npm update

# Run security audit
npm audit

# Verify application passes all quality checks
npm run lint
npm run typecheck
npm run test
npm run build
```

---

## 4. Key & Secret Rotation Protocol

Rotate API keys and administrative secrets annually or immediately upon personnel departure:

### Supabase Keys
1. In Supabase Dashboard, navigate to **Settings > API**.
2. Click **Generate New API Secret** for `service_role` or reset your JWT secret.
3. Update `SUPABASE_SERVICE_ROLE_KEY` in Vercel project environment variables.
4. Redeploy the latest production build in Vercel.

### Cloudinary Credentials
1. In Cloudinary Console, go to **Settings > Access Keys**.
2. Generate a new API Key/Secret and deactivate the retired key after updating Vercel.

### Faculty Admin Access
1. Revoke the administrative role of graduated student coordinators in the `profiles` table:
   ```sql
   UPDATE public.profiles SET role = 'viewer' WHERE email = 'graduated.student@college.edu';
   ```

---

## 5. Annual Academic Rollover Checklist

At the beginning of each academic year (e.g. July/August):

- [ ] **Create New Academic Year Tag:** Add the upcoming academic year (e.g. `2026-27`) into the dropdown selection in `/admin/media` and `/admin/albums`.
- [ ] **Archive Prior Year Highlights:** Unfeature older events to let new student hackathons appear on the homepage spotlight.
- [ ] **Update Department Contacts:** On `/admin/settings`, verify the HOD name, contact telephone extensions, room numbers, and active student coordinator emails.
- [ ] **Faculty Account Review:** Verify that only active departmental staff have admin privileges in Supabase Auth.
- [ ] **Media Cleanup:** Delete duplicate or out-of-focus draft photos stored in the `media` storage bucket.
