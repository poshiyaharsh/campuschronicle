import { Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <ImageIcon className="h-4 w-4" />
          <span>Curated Media Archives</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Photo Gallery
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Filterable visual archive of all departmental moments with full-screen lightbox preview.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          [Phase 07 Implementation Target: Masonry Gallery & Lightbox]
        </p>
        <p className="text-xs text-muted-foreground">
          Dynamic category filters (Classroom, Visits, Events), masonry grid, and yet-another-react-lightbox integration.
        </p>
      </div>
    </div>
  );
}
