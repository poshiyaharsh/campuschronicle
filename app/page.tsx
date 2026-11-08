import Link from "next/link";
import { ArrowRight, BookOpen, Building, Calendar, Image as ImageIcon, Video } from "lucide-react";

export default function HomePage() {
  const categories = [
    {
      title: "Classroom Activities",
      description: "Chronicle of lectures, laboratory experiments, and student workshops.",
      href: "/classroom",
      icon: BookOpen,
    },
    {
      title: "Technical Visits",
      description: "Industrial immersion trips, corporate tours, and industry insights.",
      href: "/technical-visits",
      icon: Building,
    },
    {
      title: "IT Events & Tech Fests",
      description: "Hackathons, technical symposiums, and student achievements.",
      href: "/events",
      icon: Calendar,
    },
    {
      title: "Photo Gallery",
      description: "High-resolution curated media archive with category filters and lightbox.",
      href: "/gallery",
      icon: ImageIcon,
    },
    {
      title: "Video Archives",
      description: "Keynotes, session recordings, and event highlights in MP4 & HLS.",
      href: "/videos",
      icon: Video,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32 border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span>Official Digital Archive</span>
            <span>•</span>
            <span>Department of IT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-display max-w-4xl mx-auto">
            Every Event. Every Experience.{" "}
            <span className="text-primary block sm:inline">Every Memory: Preserved Forever.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
            A centralized digital memory and showcase website documenting practical sessions,
            industrial tours, competitions, and student milestones.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore Media Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Browse IT Events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Pillars */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-foreground">
              Department Chronicles & Modules
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Select a section to explore memories, photos, and milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="space-y-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-primary">
                    <span>View Section</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
