import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Building,
  Calendar,
  Image as ImageIcon,
  Video,
  Sparkles,
  Award,
  Users,
} from "lucide-react";
import { getFeaturedEvents, getAlbums, getSiteSettings } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";
import { EventCard } from "@/components/cards/event-card";

export default async function HomePage() {
  const [featuredEvents, recentAlbums, settings] = await Promise.all([
    getFeaturedEvents(),
    getAlbums(),
    getSiteSettings(),
  ]);

  const modules = [
    {
      title: "Classroom Activities",
      description: "Hands-on labs, interactive problem-solving workshops, and presentations.",
      href: "/classroom",
      icon: BookOpen,
      stat: "Curriculum Practical Labs",
    },
    {
      title: "Technical Visits",
      description: "Industrial immersion trips, enterprise data center tours, and corporate briefings.",
      href: "/technical-visits",
      icon: Building,
      stat: "Industry Connections",
    },
    {
      title: "IT Events & Hackathons",
      description: "Annual hackathons, code sprints, technical symposiums, and achievements.",
      href: "/events",
      icon: Calendar,
      stat: "Student Innovation",
    },
    {
      title: "Photo Gallery",
      description: "Curated high-resolution visual archive with category filters and lightbox view.",
      href: "/gallery",
      icon: ImageIcon,
      stat: "Curated Moments",
    },
    {
      title: "Video Archives",
      description: "Symposium keynote addresses, project demonstrations, and milestone recaps in HD.",
      href: "/videos",
      icon: Video,
      stat: "Adaptive HLS & MP4",
    },
  ];

  return (
    <div className="flex flex-col space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36 border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{settings.department_name}</span>
            <span>•</span>
            <span>{settings.college_name}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-display max-w-4xl mx-auto leading-tight">
            Every Event. Every Experience.{" "}
            <span className="text-primary block sm:inline">
              Every Memory: Preserved Forever.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            The permanent digital chronicle for students, faculty, and alumni.
            Explore practical sessions, industry immersion visits, and tech championships.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore Media Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              View IT Events
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Welcome & Ethos Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card/60 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                About The Chronicle
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
                Preserving Academic Vitality and Student Milestones
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                CampusChronicle centralizes every departmental milestone in one cohesive,
                interactive showcase. From the late-night debugging in our hackathons to
                deep industry insights during corporate tours, our students continuously innovate.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-1">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-1">
                  <Award className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold font-display text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Practical Immersion</div>
              </div>
              <div className="space-y-1">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-1">
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold font-display text-foreground">Active</div>
                <div className="text-xs text-muted-foreground">Community & Alumni</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Modules Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="Department Pillars"
          title="Browse By Module"
          description="Explore organized galleries and records categorized by activity type."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {mod.stat}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors font-display">
                      {mod.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary pt-3 border-t border-border">
                  <span>Explore Section</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured IT Events */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeader
            badge="Spotlight"
            title="Featured Events & Hackathons"
            description="Major departmental competitions and academic symposiums."
          />
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            <span>All Events</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 5. Recent Albums Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeader
            badge="Recent Memories"
            title="Latest Photo Albums"
            description="Recent practical experiments, workshops, and company visits."
          />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            <span>Full Gallery</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentAlbums.slice(0, 4).map((album) => (
            <Link
              key={album.id}
              href={`/gallery?album=${album.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={album.cover_image_url}
                  alt={`Cover for ${album.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-primary bg-background/80 px-2 py-0.5 rounded backdrop-blur-sm border border-primary/20">
                  {album.academic_year}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-semibold font-display text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {album.title}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {album.photo_count} photos recorded
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
