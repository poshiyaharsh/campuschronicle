import { Video } from "lucide-react";
import { getMedia } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";
import { VideoGalleryClient } from "@/components/video/video-gallery-client";
import { EmptyState } from "@/components/common/empty-state";

export const metadata = {
  title: "Department Video Archives | CampusChronicle",
  description: "Keynote addresses, project demonstrations, and symposium highlights streamed in MP4 and adaptive HLS.",
};

export default async function VideosPage() {
  const videos = await getMedia({ mediaType: "video" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Streaming Archives"
        title="Department Video Gallery"
        description="High-definition recordings of guest lectures, technical symposium keynotes, and student project demonstrations with adaptive MP4 & HLS streaming."
      />

      {videos.length === 0 ? (
        <EmptyState
          title="No video recordings available"
          description="Department video streams and MP4 recordings will be posted here."
          actionHref="/"
          actionLabel="Return Home"
        />
      ) : (
        <VideoGalleryClient videos={videos} />
      )}
    </div>
  );
}
