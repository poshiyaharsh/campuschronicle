import * as React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { SearchClient } from "@/components/search/search-client";

export const metadata: Metadata = {
  title: "Search Department Archives",
  description:
    "Search across classroom memories, technical industrial visits, hackathons, seminars, and photo/video archives.",
  openGraph: {
    title: "Search Department Archives | CampusChronicle",
    description:
      "Find past events, academic albums, workshop memories, and technical visit photo archives.",
  },
};

export default function SearchPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <SectionHeader
        badge="Department Archives"
        title="Search Memories & Events"
        description="Search across academic milestones, guest lectures, industrial visits, coding competitions, and gallery media."
        align="center"
      />

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mr-3" />
            Loading archive search...
          </div>
        }
      >
        <SearchClient />
      </Suspense>
    </div>
  );
}
