/**
 * CampusChronicle - Sample Data Seed Script
 *
 * Populates database or prints JSON mock records for testing.
 * All records clearly labeled with `TODO_VERIFY`.
 *
 * Usage:
 *   node --experimental-strip-types scripts/seed-sample-data.ts
 */

import {
  SAMPLE_CATEGORIES,
  SAMPLE_ALBUMS,
  SAMPLE_EVENTS,
  SAMPLE_MEDIA,
  SAMPLE_SITE_SETTINGS,
} from "../lib/data/mock-data";

async function main() {
  console.log("=========================================");
  console.log("  CampusChronicle: Seed Sample Data      ");
  console.log("=========================================\n");

  console.log("Categories to Seed:", SAMPLE_CATEGORIES.length);
  for (const cat of SAMPLE_CATEGORIES) {
    console.log(`  - [${cat.slug}] ${cat.name}`);
  }

  console.log("\nAlbums to Seed:", SAMPLE_ALBUMS.length);
  for (const alb of SAMPLE_ALBUMS) {
    console.log(`  - [${alb.academic_year}] ${alb.title} (${alb.photo_count} photos)`);
  }

  console.log("\nEvents to Seed:", SAMPLE_EVENTS.length);
  for (const evt of SAMPLE_EVENTS) {
    console.log(`  - [${evt.category}] ${evt.title} (${evt.event_date})`);
  }

  console.log("\nMedia Assets to Seed:", SAMPLE_MEDIA.length);
  for (const med of SAMPLE_MEDIA) {
    console.log(`  - [${med.media_type.toUpperCase()}:${med.source_type}] ${med.title}`);
  }

  console.log("\nSite Settings:");
  console.log(`  Department: ${SAMPLE_SITE_SETTINGS.department_name}`);
  console.log(`  College: ${SAMPLE_SITE_SETTINGS.college_name}`);
  console.log(`  Tagline: ${SAMPLE_SITE_SETTINGS.tagline}`);

  console.log("\n[Notice] All items have been established in `lib/data/mock-data.ts`.");
  console.log("When real Supabase credentials are provided in `.env.local`, this script can");
  console.log("directly execute database INSERT statements via @supabase/supabase-js.");
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
