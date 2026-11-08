"use client";

import * as React from "react";
import { Settings, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { SAMPLE_SITE_SETTINGS, SiteSettings } from "@/lib/data/mock-data";
import { siteSettingsSchema } from "@/lib/validations/admin";

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<SiteSettings>(SAMPLE_SITE_SETTINGS);

  const [deptName, setDeptName] = React.useState(settings.department_name);
  const [collegeName, setCollegeName] = React.useState(settings.college_name);
  const [tagline, setTagline] = React.useState(settings.tagline);
  const [address, setAddress] = React.useState(settings.address);
  const [email, setEmail] = React.useState(settings.contact_email);
  const [phone, setPhone] = React.useState(settings.contact_phone);

  const [linkedin, setLinkedin] = React.useState(settings.social_links.linkedin || "");
  const [youtube, setYoutube] = React.useState(settings.social_links.youtube || "");
  const [twitter, setTwitter] = React.useState(settings.social_links.twitter || "");
  const [github, setGithub] = React.useState(settings.social_links.github || "");

  const [notification, setNotification] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const payload = {
      department_name: deptName,
      college_name: collegeName,
      tagline,
      address,
      contact_email: email,
      contact_phone: phone,
      linkedin,
      youtube,
      twitter,
      github,
    };

    const validation = siteSettingsSchema.safeParse(payload);
    if (!validation.success) {
      setNotification({
        type: "error",
        message: validation.error.issues[0]?.message || "Validation failed",
      });
      return;
    }

    setSettings({
      department_name: deptName,
      college_name: collegeName,
      tagline,
      address,
      contact_email: email,
      contact_phone: phone,
      social_links: {
        linkedin: linkedin || undefined,
        youtube: youtube || undefined,
        twitter: twitter || undefined,
        github: github || undefined,
      },
    });

    setNotification({
      type: "success",
      message: "Site settings saved and updated across the portal!",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {notification && (
        <div
          className={`rounded-xl border p-4 text-xs font-semibold flex items-center gap-2.5 ${
            notification.type === "success"
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-8 shadow-sm"
      >
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-display text-foreground">
            Department Identity & Contact Settings
          </h3>
          <p className="text-xs text-muted-foreground">
            All updates here dynamically reflect on the public Home and Contact pages without code modifications.
          </p>
        </div>

        {/* Identity */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Brand Identity
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Department Name</label>
              <input
                type="text"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">College Name</label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-foreground">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Office & Contact
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-foreground">Physical Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Social & Community Links
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">LinkedIn URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">YouTube Channel URL</label>
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Twitter / X Handle URL</label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://x.com/..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">GitHub Organization URL</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}
