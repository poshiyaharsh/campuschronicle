"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Maximize2, Tag, Calendar } from "lucide-react";
import type { MediaItem, Category } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/common/empty-state";

interface GalleryClientProps {
  initialMedia: MediaItem[];
  categories: Category[];
}

export function GalleryClient({ initialMedia, categories }: GalleryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const activeYear = searchParams.get("year") || "all";

  const [lightboxIndex, setLightboxIndex] = React.useState(-1);

  // Extract distinct academic years
  const academicYears = React.useMemo(() => {
    const years = new Set<string>();
    initialMedia.forEach((m) => m.academic_year && years.add(m.academic_year));
    return Array.from(years).sort().reverse();
  }, [initialMedia]);

  // Filter media based on active category and academic year
  const filteredMedia = React.useMemo(() => {
    return initialMedia.filter((m) => {
      const matchCat =
        activeCategory === "all" || m.category_slug === activeCategory;
      const matchYear =
        activeYear === "all" || m.academic_year === activeYear;
      return matchCat && matchYear;
    });
  }, [initialMedia, activeCategory, activeYear]);

  const updateFilters = (cat: string, yr: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }

    if (yr === "all") {
      params.delete("year");
    } else {
      params.set("year", yr);
    }

    const queryString = params.toString();
    router.push(queryString ? `/gallery?${queryString}` : "/gallery", {
      scroll: false,
    });
  };

  const slides = React.useMemo(() => {
    return filteredMedia.map((item) => ({
      src: item.url,
      alt: item.alt_text,
    }));
  }, [filteredMedia]);

  return (
    <div className="space-y-8">
      {/* Filters Bar: Category & Academic Year */}
      <div className="space-y-4 border-b border-border pb-6">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1 hidden sm:inline">
            Category:
          </span>
          <button
            onClick={() => updateFilters("all", activeYear)}
            className={cn(
              "rounded-full px-4 py-2 min-h-[44px] text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center justify-center",
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            All Categories ({initialMedia.length})
          </button>

          {categories
            .filter((c) => c.slug !== "videos")
            .map((cat) => {
              const count = initialMedia.filter(
                (m) => m.category_slug === cat.slug
              ).length;
              const isActive = activeCategory === cat.slug;

              return (
                <button
                  key={cat.id}
                  onClick={() => updateFilters(cat.slug, activeYear)}
                  className={cn(
                    "rounded-full px-4 py-2 min-h-[44px] text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center justify-center",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
        </div>

        {/* Academic Year Filter Chips */}
        {academicYears.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              Academic Year:
            </span>
            <button
              onClick={() => updateFilters(activeCategory, "all")}
              className={cn(
                "rounded-lg px-3 py-1.5 min-h-[36px] text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                activeYear === "all"
                  ? "bg-amber-500 text-stone-950 font-semibold"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              All Years
            </button>
            {academicYears.map((yr) => {
              const isActive = activeYear === yr;
              const count = initialMedia.filter(
                (m) => m.academic_year === yr
              ).length;
              return (
                <button
                  key={yr}
                  onClick={() => updateFilters(activeCategory, yr)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 min-h-[36px] text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-amber-500 text-stone-950 font-semibold"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {yr} ({count})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid */}
      {filteredMedia.length === 0 ? (
        <EmptyState
          title="No photos match filters"
          description="Try selecting a different category or academic year."
          actionHref="/gallery"
          actionLabel="Clear Filters"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxIndex(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${item.title}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Image
                src={item.thumbnail_url || item.url}
                alt={item.alt_text}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Badge info */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md border border-border/50 shadow-sm">
                    <Maximize2 className="h-4 w-4 text-primary" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] text-primary font-semibold">
                    <span className="flex items-center gap-1 bg-background/80 px-2 py-0.5 rounded backdrop-blur-md">
                      <Tag className="h-3 w-3" />
                      {item.category_slug}
                    </span>
                    <span className="flex items-center gap-1 bg-background/80 px-2 py-0.5 rounded backdrop-blur-md">
                      <Calendar className="h-3 w-3" />
                      {item.academic_year}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground font-display line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Component */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
