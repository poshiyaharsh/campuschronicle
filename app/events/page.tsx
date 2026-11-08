import Link from "next/link";
import { Calendar } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Calendar className="h-4 w-4" />
          <span>Department Milestones</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          IT Events & Highlights
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Archives of hackathons, symposiums, technical paper presentations, and department tech celebrations.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          [Phase 06 Implementation Target]
        </p>
        <p className="text-xs text-muted-foreground">
          Events directory with academic-year filters and dedicated event detail pages.
        </p>
        <div className="pt-2">
          <Link
            href="/events/sample-event"
            className="text-xs text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Preview Event Detail Shell (/events/sample-event)
          </Link>
        </div>
      </div>
    </div>
  );
}
