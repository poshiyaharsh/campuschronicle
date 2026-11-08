import Image from "next/image";
import { Play, Clock, Tag } from "lucide-react";
import type { MediaItem } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: MediaItem;
  isActive?: boolean;
  onSelect: (video: MediaItem) => void;
}

export function VideoCard({ video, isActive, onSelect }: VideoCardProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "HD";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      onClick={() => onSelect(video)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(video);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Select video: ${video.title}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive
          ? "border-primary shadow-lg ring-1 ring-primary/40"
          : "border-border hover:border-primary/50 hover:shadow-md"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={video.thumbnail_url || video.url}
          alt={video.alt_text || video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-[11px] font-mono font-medium text-white backdrop-blur-md border border-white/10">
            <Clock className="h-3 w-3 text-primary" />
            <span>{formatDuration(video.duration)}</span>
          </span>
        </div>

        {/* Stream Type Pill */}
        <div className="absolute top-2.5 left-2.5">
          <span className="rounded bg-background/80 px-2 py-0.5 text-[10px] font-mono uppercase text-primary backdrop-blur-md border border-primary/20">
            {video.source_type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-2">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold tracking-tight text-foreground font-display group-hover:text-primary transition-colors line-clamp-1">
            {video.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {video.caption}
          </p>
        </div>

        <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-primary" />
            {video.category_slug}
          </span>
          <span>AY {video.academic_year}</span>
        </div>
      </div>
    </div>
  );
}
