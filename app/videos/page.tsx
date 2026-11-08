import { Video } from "lucide-react";

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Video className="h-4 w-4" />
          <span>Stream Archives</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Video Gallery
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          High-definition recordings, symposium keynotes, and student project demonstrations with adaptive MP4 & HLS streaming.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          [Phase 08 Implementation Target: Adaptive Video Player]
        </p>
        <p className="text-xs text-muted-foreground">
          HTML5 MP4 and HLS.js adaptive player with keyboard controls, quality selector, and custom styling.
        </p>
      </div>
    </div>
  );
}
