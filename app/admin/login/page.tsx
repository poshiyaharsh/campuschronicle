"use client";

import { Lock, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 shadow-lg">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-display">
            Admin Portal Access
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in with administrative credentials to manage albums, events, and media.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Email Address</label>
            <input
              type="email"
              placeholder="admin@college.edu"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              disabled
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              disabled
            />
          </div>

          <button
            type="button"
            className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground opacity-60 cursor-not-allowed"
            disabled
          >
            Sign In (Enabled in Phase 10)
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground">
          Protected by Supabase Auth & Role-Based Access Control
        </p>
      </div>
    </div>
  );
}
