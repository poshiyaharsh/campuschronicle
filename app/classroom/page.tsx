import { BookOpen } from "lucide-react";

export default function ClassroomPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          <span>Curriculum & Practical Sessions</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Classroom Activities
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Visual documentation of practical lab experiments, technical presentations, and interactive classroom sessions.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          [Phase 06 Implementation Target]
        </p>
        <p className="text-xs text-muted-foreground">
          Classroom activity albums will be dynamically populated from Supabase after Media Import (Phase 05).
        </p>
      </div>
    </div>
  );
}
