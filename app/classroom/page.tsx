import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getAlbums } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";
import { AlbumCard } from "@/components/cards/album-card";
import { EmptyState } from "@/components/common/empty-state";

export const metadata: Metadata = {
  title: "Classroom Activities & Labs",
  description:
    "Chronicle of practical lab experiments, technical presentations, and interactive classroom sessions.",
  openGraph: {
    title: "Classroom Activities & Labs | CampusChronicle",
    description:
      "Comprehensive photo logs of practical programming laboratories, technical presentations, and hands-on workshops.",
  },
};

export default async function ClassroomPage() {
  const albums = await getAlbums("classroom");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Curriculum Practical Labs"
        title="Classroom Activities"
        description="Comprehensive photo logs of practical programming laboratories, technical presentations, and hands-on workshops."
      />

      {albums.length === 0 ? (
        <EmptyState
          title="No classroom albums found"
          description="Classroom activity albums will be added here once published."
          actionHref="/"
          actionLabel="Return Home"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
}
