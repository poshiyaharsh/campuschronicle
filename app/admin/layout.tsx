"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderPlus,
  Calendar,
  UploadCloud,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/media", label: "Media & Videos", icon: UploadCloud },
  { href: "/admin/albums", label: "Albums", icon: FolderPlus },
  { href: "/admin/events", label: "IT Events", icon: Calendar },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear session cookie and redirect
    document.cookie = "campus_admin_session=; path=/; max-age=0";
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-foreground">
              CampusChronicle Management Console
            </h1>
            <p className="text-xs text-muted-foreground">
              Department Faculty & Administrator Portal
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors w-fit"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Page Body */}
      <div>{children}</div>
    </div>
  );
}
