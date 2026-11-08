import { Suspense } from "react";
import { getMedia, getCategories } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";
import { GalleryClient } from "@/components/gallery/gallery-client";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Media Gallery & Lightbox | CampusChronicle",
  description: "Browse high-resolution departmental photos with category filters and interactive lightbox view.",
};

function GallerySkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex gap-2 pb-6 border-b border-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default async function GalleryPage() {
  const [mediaItems, categories] = await Promise.all([
    getMedia({ mediaType: "image" }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Visual Archives"
        title="Department Photo Gallery"
        description="Filterable photo records capturing practical lab sessions, technical tours, coding marathons, and department celebrations."
      />

      <Suspense fallback={<GallerySkeleton />}>
        <GalleryClient initialMedia={mediaItems} categories={categories} />
      </Suspense>
    </div>
  );
}
