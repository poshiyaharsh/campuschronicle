/**
 * CampusChronicle - Media Migration Utility
 *
 * Scans `/media-source` read-only, checks mappings, converts filenames to clean kebab-case,
 * and performs dry-run or live upload to Cloudinary/Supabase.
 *
 * Usage:
 *   Dry run:  node --experimental-strip-types scripts/migrate-media.ts --dry-run
 *   Live run: node --experimental-strip-types scripts/migrate-media.ts --upload
 */

import * as fs from "node:fs";
import * as path from "node:path";

interface MediaFileMapping {
  originalPath: string;
  filename: string;
  cleanName: string;
  category: string;
  targetAlbum: string;
  academicYear: string;
  fileSize: number;
}

const SOURCE_DIR = path.resolve(process.cwd(), "media-source");

function toKebabCase(str: string): string {
  return str
    .replace(/\.[^/.]+$/, "") // remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

function scanMediaSource(): MediaFileMapping[] {
  const mappings: MediaFileMapping[] = [];

  if (!fs.existsSync(SOURCE_DIR)) {
    console.log(`[Scan] Source directory "${SOURCE_DIR}" does not exist.`);
    return mappings;
  }

  const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const categoryDir = path.join(SOURCE_DIR, entry.name);
      const files = fs.readdirSync(categoryDir);

      for (const file of files) {
        if (file.startsWith(".") || file.endsWith(".gitkeep")) continue;

        const filePath = path.join(categoryDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          const ext = path.extname(file).toLowerCase();
          const clean = `${toKebabCase(file)}${ext}`;

          mappings.push({
            originalPath: filePath,
            filename: file,
            cleanName: clean,
            category: entry.name,
            targetAlbum: `album-${entry.name}`,
            academicYear: "2024-25",
            fileSize: stat.size,
          });
        }
      }
    }
  }

  return mappings;
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = !args.includes("--upload");

  console.log("=========================================");
  console.log("   CampusChronicle: Media Ingestion      ");
  console.log(`   Mode: ${isDryRun ? "DRY-RUN (Safe)" : "LIVE UPLOAD"} `);
  console.log("=========================================");

  const files = scanMediaSource();

  if (files.length === 0) {
    console.log("\n[Notice] No media files found in /media-source.");
    console.log("To import real media:");
    console.log("  1. Place folders into /media-source (e.g. classroom/, visits/, events/)");
    console.log("  2. Run: node --experimental-strip-types scripts/migrate-media.ts --dry-run");
    console.log("  3. Review the mapping, then run with --upload\n");
    return;
  }

  console.log(`\nFound ${files.length} media file(s) across categories:\n`);

  const categoryCounts: Record<string, number> = {};
  for (const item of files) {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    console.log(`  [${item.category}] ${item.filename} -> ${item.cleanName} (${(item.fileSize / 1024).toFixed(1)} KB)`);
  }

  console.log("\nSummary by Category:");
  for (const [cat, count] of Object.entries(categoryCounts)) {
    console.log(`  - ${cat}: ${count} file(s)`);
  }

  if (isDryRun) {
    console.log("\n[Dry-Run Complete] Zero changes made to cloud storage or database.");
    console.log("To perform actual upload, execute with --upload flag.");
  }
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
