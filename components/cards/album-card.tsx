import Image from "next/image";
import Link from "next/link";
import { Calendar, Image as ImageIcon } from "lucide-react";
import type { Album } from "@/lib/data/mock-data";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={album.cover_image_url}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

        {/* Academic Year Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-md bg-background/80 px-2 py-1 text-[11px] font-semibold text-primary backdrop-blur-md border border-primary/20">
            {album.academic_year}
          </span>
        </div>

        {/* Photo Count Tag */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-[11px] font-medium text-foreground backdrop-blur-md border border-border/50">
            <ImageIcon className="h-3 w-3 text-primary" />
            <span>{album.photo_count} photos</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground font-display group-hover:text-primary transition-colors line-clamp-1">
            {album.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {album.description}
          </p>
        </div>

        <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {new Date(album.event_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <Link
            href={`/gallery?album=${album.slug}`}
            className="text-primary font-medium hover:underline text-xs"
          >
            View Album
          </Link>
        </div>
      </div>
    </div>
  );
}
