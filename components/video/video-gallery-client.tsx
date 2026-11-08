"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Info, Sparkles, Video } from "lucide-react";
import type { MediaItem } from "@/lib/data/mock-data";
import { VideoCard } from "./video-card";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-load the VideoPlayer so HLS.js is only evaluated on the client when needed
const DynamicVideoPlayer = dynamic(
  () => import("./video-player").then((mod) => mod.VideoPlayer),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video w-full rounded-xl bg-card border border-border flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    ),
  }
);

interface VideoGalleryClientProps {
  videos: MediaItem[];
}

export function VideoGalleryClient({ videos }: VideoGalleryClientProps) {
  const [activeVideo, setActiveVideo] = React.useState<MediaItem>(
    videos[0] || null
  );

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* Notice Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3 text-xs text-muted-foreground">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-foreground">
            Development Stream Environment (TODO_VERIFY)
          </p>
          <p>
            Demonstrating adaptive bitrate HLS (.m3u8 via HLS.js) and standard MP4 HD video playback.
            Real department session recordings will be uploaded via the Admin Portal or media pipeline.
          </p>
        </div>
      </div>

      {/* Featured Active Player */}
      {activeVideo && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-6 shadow-xl space-y-4">
            <DynamicVideoPlayer
              key={activeVideo.id}
              src={activeVideo.url}
              poster={activeVideo.thumbnail_url}
              title={activeVideo.title}
              sourceType={activeVideo.source_type}
            />

            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Now Playing
                  </span>
                  <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-mono text-muted-foreground uppercase">
                    {activeVideo.source_type} Stream
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Academic Year: {activeVideo.academic_year}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                {activeVideo.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeVideo.caption}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Video Playlist Grid */}
      <section className="space-y-6">
        <div className="border-b border-border pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display text-foreground">
              All Department Video Recordings ({videos.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Select any recording below to load into the player.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <VideoCard
              key={vid.id}
              video={vid}
              isActive={activeVideo?.id === vid.id}
              onSelect={(selected) => {
                setActiveVideo(selected);
                window.scrollTo({ top: 120, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
