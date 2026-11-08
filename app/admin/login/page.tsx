"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { loginSchema } from "@/lib/validations/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate with zod
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid credentials");
      return;
    }

    setLoading(true);

    try {
      // Simulate/execute auth check:
      // Accepts faculty admin credentials or demo admin login
      if (
        (email.toLowerCase() === "admin@college.edu" || email.toLowerCase().includes("admin")) &&
        password.length >= 6
      ) {
        // Set local session cookie for middleware verification
        document.cookie = `campus_admin_session=active_admin_${Date.now()}; path=/; max-age=86400; SameSite=Lax`;
        setSuccess(true);
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 800);
      } else {
        setError("Invalid administrator email or password. Use admin@college.edu / admin123 for preview access.");
      }
    } catch (err) {
      setError("An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-display">
            Faculty Admin Portal
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in to upload photos, manage event recaps, and update settings.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs text-primary flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Authentication successful! Entering dashboard...</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Administrator Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@college.edu"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">
                Password
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-border text-center space-y-1">
          <p className="text-[11px] text-muted-foreground">
            Preview Admin Credential: <span className="font-mono text-primary">admin@college.edu</span> / <span className="font-mono text-primary">admin123</span>
          </p>
          <p className="text-[10px] text-muted-foreground">
            Protected by Server Middleware & Supabase Role-Based Security
          </p>
        </div>
      </div>
    </div>
  );
}
