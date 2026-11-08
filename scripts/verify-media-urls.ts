/**
 * CampusChronicle - Media URL Verification Utility
 *
 * Checks HTTP status codes for all media URLs to verify zero broken links.
 *
 * Usage:
 *   node --experimental-strip-types scripts/verify-media-urls.ts
 */

import { SAMPLE_MEDIA } from "../lib/data/mock-data";

async function verifyUrl(url: string): Promise<{ url: string; status: number; ok: boolean }> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    // Some video or image servers reject HEAD; retry with GET if status is 405 or 403
    if (!res.ok && (res.status === 405 || res.status === 403)) {
      const getRes = await fetch(url, { method: "GET", headers: { Range: "bytes=0-10" } });
      return { url, status: getRes.status, ok: getRes.ok || getRes.status === 206 };
    }
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 0, ok: false };
  }
}

async function main() {
  console.log("=========================================");
  console.log("  CampusChronicle: Verify Media URLs     ");
  console.log("=========================================\n");

  const urlsToCheck = SAMPLE_MEDIA.map((m) => m.url);
  console.log(`Checking ${urlsToCheck.length} media URLs...\n`);

  let passed = 0;
  let failed = 0;

  for (const url of urlsToCheck) {
    const result = await verifyUrl(url);
    if (result.ok) {
      console.log(`[PASS ${result.status}] ${url.substring(0, 70)}...`);
      passed++;
    } else {
      console.log(`[FAIL ${result.status}] ${url}`);
      failed++;
    }
  }

  console.log(`\nVerification Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
