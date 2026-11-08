import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Events
        </Link>
      </div>

      <div className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
            IT Event
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Academic Year: TODO_VERIFY
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            Venue: Department Auditorium
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-display capitalize">
          Event Record: {params.slug.replace(/-/g, " ")}
        </h1>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/40 p-8 text-center space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          [Phase 06 Implementation Target: Detailed Event Shell]
        </p>
        <p className="text-xs text-muted-foreground">
          Dynamic event description, photo reel, winner spotlights, and schedule will be served here.
        </p>
      </div>
    </div>
  );
}
