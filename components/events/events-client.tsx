"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Tag } from "lucide-react";
import type { EventItem } from "@/lib/data/mock-data";
import { EventCard } from "@/components/cards/event-card";
import { EmptyState } from "@/components/common/empty-state";
import { cn } from "@/lib/utils";

interface EventsClientProps {
  initialEvents: EventItem[];
}

export function EventsClient({ initialEvents }: EventsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeYear = searchParams.get("year") || "all";
  const activeCategory = searchParams.get("category") || "all";

  // Distinct academic years
  const academicYears = React.useMemo(() => {
    const years = new Set<string>();
    initialEvents.forEach((e) => e.academic_year && years.add(e.academic_year));
    return Array.from(years).sort().reverse();
  }, [initialEvents]);

  // Distinct categories
  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    initialEvents.forEach((e) => e.category && cats.add(e.category));
    return Array.from(cats);
  }, [initialEvents]);

  const filteredEvents = React.useMemo(() => {
    return initialEvents.filter((e) => {
      const matchYear = activeYear === "all" || e.academic_year === activeYear;
      const matchCat = activeCategory === "all" || e.category === activeCategory;
      return matchYear && matchCat;
    });
  }, [initialEvents, activeYear, activeCategory]);

  const updateFilters = (yr: string, cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (yr === "all") {
      params.delete("year");
    } else {
      params.set("year", yr);
    }
    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }

    const queryString = params.toString();
    router.push(queryString ? `/events?${queryString}` : "/events", {
      scroll: false,
    });
  };

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="space-y-4 border-b border-border pb-6">
        {/* Academic Year Chips */}
        {academicYears.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              Academic Year:
            </span>
            <button
              onClick={() => updateFilters("all", activeCategory)}
              className={cn(
                "rounded-full px-4 py-2 min-h-[44px] text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center justify-center",
                activeYear === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              All Years ({initialEvents.length})
            </button>
            {academicYears.map((yr) => {
              const count = initialEvents.filter(
                (e) => e.academic_year === yr
              ).length;
              const isActive = activeYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => updateFilters(yr, activeCategory)}
                  className={cn(
                    "rounded-full px-4 py-2 min-h-[44px] text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary inline-flex items-center justify-center",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {yr} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Category Sub-filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              Event Type:
            </span>
            <button
              onClick={() => updateFilters(activeYear, "all")}
              className={cn(
                "rounded-lg px-3 py-1.5 min-h-[36px] text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                activeCategory === "all"
                  ? "bg-amber-500 text-stone-950 font-semibold"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              All Types
            </button>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => updateFilters(activeYear, cat)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 min-h-[36px] text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-amber-500 text-stone-950 font-semibold"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          title="No events found"
          description="No events match your selected filters. Try choosing a different year or category."
          actionHref="/events"
          actionLabel="Clear Filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
