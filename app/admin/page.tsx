import Link from "next/link";
import {
  FolderPlus,
  Image as ImageIcon,
  Video,
  Calendar,
  ArrowRight,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import { getAlbums, getEvents, getMedia } from "@/lib/data/api";

export default async function AdminDashboardPage() {
  const [albums, events, photos, videos] = await Promise.all([
    getAlbums(),
    getEvents(),
    getMedia({ mediaType: "image" }),
    getMedia({ mediaType: "video" }),
  ]);

  const metrics = [
    {
      title: "Published Albums",
      count: albums.length,
      icon: FolderPlus,
      href: "/admin/albums",
      label: "Manage Albums",
    },
    {
      title: "Curated Photos",
      count: photos.length,
      icon: ImageIcon,
      href: "/admin/media",
      label: "Upload & Manage",
    },
    {
      title: "Streamed Videos",
      count: videos.length,
      icon: Video,
      href: "/admin/media",
      label: "Video Manager",
    },
    {
      title: "IT Events",
      count: events.length,
      icon: Calendar,
      href: "/admin/events",
      label: "Event Records",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {m.title}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-bold font-display text-foreground">
                  {m.count}
                </span>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <Link
                  href={m.href}
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  {m.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Cards */}
      <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold font-display text-foreground">
          Quick Administrative Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/media"
            className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Add New Photos</p>
              <p className="text-xs text-muted-foreground">Upload to Cloudinary</p>
            </div>
          </Link>

          <Link
            href="/admin/events"
            className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Publish Event Recap</p>
              <p className="text-xs text-muted-foreground">Hackathon / Symposium</p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Update Contact Info</p>
              <p className="text-xs text-muted-foreground">Email, phone, socials</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
