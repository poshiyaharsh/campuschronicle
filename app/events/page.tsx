import { Suspense } from "react";
import { getEvents } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";
import { EventsClient } from "@/components/events/events-client";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "IT Events & Hackathons",
  description:
    "Chronicles of hackathons, symposiums, tech fests, coding camps, and student competitions.",
  openGraph: {
    title: "IT Events & Hackathons | CampusChronicle",
    description:
      "Comprehensive records of student hackathons, national technical symposiums, research paper tracks, and developer boot camps.",
  },
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Department Milestones"
        title="IT Events & Tech Celebrations"
        description="Comprehensive records of student hackathons, national technical symposiums, research paper tracks, and developer boot camps."
      />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="aspect-[16/10] rounded-xl" />
            <Skeleton className="aspect-[16/10] rounded-xl" />
            <Skeleton className="aspect-[16/10] rounded-xl" />
          </div>
        }
      >
        <EventsClient initialEvents={events} />
      </Suspense>
    </div>
  );
}
