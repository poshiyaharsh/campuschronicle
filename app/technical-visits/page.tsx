import { Building } from "lucide-react";
import { getAlbums } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";
import { AlbumCard } from "@/components/cards/album-card";
import { EmptyState } from "@/components/common/empty-state";

export const metadata = {
  title: "Technical & Industrial Visits | CampusChronicle",
  description: "Industry immersion tours, enterprise visits, and corporate technical sessions.",
};

export default async function TechnicalVisitsPage() {
  const albums = await getAlbums("technical-visits");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Industry Immersion"
        title="Technical & Industrial Visits"
        description="Experiential learning tours, corporate site inspections, and technology briefing sessions connecting academia with enterprise engineering."
      />

      {albums.length === 0 ? (
        <EmptyState
          title="No technical visits recorded"
          description="Industrial and technical visit photo journals will be published here."
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
