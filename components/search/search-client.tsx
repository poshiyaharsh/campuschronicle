"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon, Calendar, MapPin, Tag, Film, ImageIcon, ArrowRight, X } from "lucide-react";
import { searchContent, SearchResults } from "@/lib/data/api";
import { EmptyState } from "@/components/common/empty-state";

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = React.useState(initialQuery);
  const [results, setResults] = React.useState<SearchResults | null>(null);
  const [activeTab, setActiveTab] = React.useState<"all" | "albums" | "events" | "media">("all");
  const [loading, setLoading] = React.useState(false);

  const performSearch = React.useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await searchContent(q);
      setResults(res);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      performSearch(query.trim());
    }
  };

  const clearQuery = () => {
    setQuery("");
    setResults(null);
    router.push("/search");
  };

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search albums, hackathons, lab visits, captions..."
            className="w-full pl-12 pr-24 py-3.5 rounded-full border border-border bg-card/60 backdrop-blur-md text-foreground placeholder:text-muted-foreground text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="absolute right-14 p-1 text-muted-foreground hover:text-foreground rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-sm shadow transition-all"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results Header and Category Tabs */}
      {results && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Found{" "}
                <span className="font-semibold text-foreground">
                  {results.total}
                </span>{" "}
                results for &ldquo;
                <span className="text-amber-500 font-medium">
                  {results.query}
                </span>
                &rdquo;
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-amber-500 text-stone-950 font-semibold shadow"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                All ({results.total})
              </button>
              <button
                onClick={() => setActiveTab("albums")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "albums"
                    ? "bg-amber-500 text-stone-950 font-semibold shadow"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Albums ({results.albums.length})
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "events"
                    ? "bg-amber-500 text-stone-950 font-semibold shadow"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Events ({results.events.length})
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "media"
                    ? "bg-amber-500 text-stone-950 font-semibold shadow"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Media ({results.media.length})
              </button>
            </div>
          </div>

          {/* If 0 total results */}
          {results.total === 0 && (
            <EmptyState
              title="No memories found"
              description={`We couldn't find anything matching "${results.query}". Try searching for keywords like "hackathon", "robotics", "classroom", or an academic year like "2024-25".`}
              actionLabel="View All Photos"
              actionHref="/gallery"
            />
          )}

          {/* Results Display */}
          <div className="space-y-10">
            {/* Albums Section */}
            {(activeTab === "all" || activeTab === "albums") &&
              results.albums.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-foreground">
                      Albums ({results.albums.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.albums.map((album) => (
                      <Link
                        key={album.id}
                        href={`/gallery?album=${album.slug}`}
                        className="group flex flex-col rounded-xl overflow-hidden border border-border/60 bg-card hover:border-amber-500/50 hover:shadow-lg transition-all"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                          <Image
                            src={album.cover_image_url}
                            alt={album.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-medium text-amber-400">
                            {album.academic_year}
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                              {album.category_slug}
                            </span>
                            <h4 className="text-base font-bold text-foreground mt-1 group-hover:text-amber-500 transition-colors">
                              {album.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {album.description}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/40">
                            <span>{album.photo_count} photos</span>
                            <span className="text-amber-500 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              Explore album <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Events Section */}
            {(activeTab === "all" || activeTab === "events") &&
              results.events.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-foreground">
                      Events ({results.events.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.events.map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="group flex flex-col rounded-xl overflow-hidden border border-border/60 bg-card hover:border-amber-500/50 hover:shadow-lg transition-all"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                          <Image
                            src={event.cover_image_url}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-medium text-amber-400">
                            {event.category}
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-base font-bold text-foreground group-hover:text-amber-500 transition-colors">
                              {event.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {event.summary}
                            </p>
                          </div>
                          <div className="mt-4 space-y-1 pt-3 border-t border-border/40 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-amber-500/80" />
                              <span>{event.event_date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-500/80" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Media Items Section */}
            {(activeTab === "all" || activeTab === "media") &&
              results.media.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-foreground">
                      Photos & Media ({results.media.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.media.map((item) => (
                      <Link
                        key={item.id}
                        href={item.media_type === "video" ? "/videos" : `/gallery?media=${item.id}`}
                        className="group relative aspect-square rounded-lg overflow-hidden border border-border/60 bg-muted hover:border-amber-500/50 hover:shadow-md transition-all"
                      >
                        <Image
                          src={item.thumbnail_url || item.url}
                          alt={item.alt_text || item.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.media_type === "video" && (
                          <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400">
                            <Film className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                          <p className="text-xs font-semibold text-white truncate">
                            {item.title}
                          </p>
                          {item.caption && (
                            <p className="text-[11px] text-stone-300 line-clamp-1">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
