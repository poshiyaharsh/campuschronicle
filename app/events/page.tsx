import { Calendar } from "lucide-react";
import { getEvents } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";
import { EventCard } from "@/components/cards/event-card";
import { EmptyState } from "@/components/common/empty-state";

export const metadata = {
  title: "IT Events & Hackathons | CampusChronicle",
  description: "Chronicles of hackathons, symposiums, tech fests, and student competitions.",
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

      {events.length === 0 ? (
        <EmptyState
          title="No events published yet"
          description="Check back soon as department milestone events are posted."
          actionHref="/"
          actionLabel="Return Home"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
