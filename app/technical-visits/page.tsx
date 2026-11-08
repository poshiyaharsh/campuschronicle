import { Building } from "lucide-react";

export default function TechnicalVisitsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Building className="h-4 w-4" />
          <span>Industry Immersion</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Technical & Industrial Visits
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Immersion tours, corporate site visits, and industry exposure programs connecting students with real-world engineering.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          [Phase 06 Implementation Target]
        </p>
        <p className="text-xs text-muted-foreground">
          Technical visit reports and company photo galleries will be rendered dynamically from the database.
        </p>
      </div>
    </div>
  );
}
