import type { Metadata } from "next";
import { Mail, MapPin, Phone, Building, Globe, ExternalLink } from "lucide-react";
import { getSiteSettings } from "@/lib/data/api";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Department Contact & Location",
  description:
    "Official contact channels, faculty office location, and institutional presence.",
  openGraph: {
    title: "Department Contact & Location | CampusChronicle",
    description:
      "Connect with the Department of Information Technology faculty, administrative office, and digital community.",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const socialChannels = [
    { name: "LinkedIn", url: settings.social_links.linkedin },
    { name: "YouTube", url: settings.social_links.youtube },
    { name: "Twitter / X", url: settings.social_links.twitter },
    { name: "GitHub", url: settings.social_links.github },
  ].filter((s) => Boolean(s.url));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader
        badge="Official Department Presence"
        title="Contact & Department Directory"
        description="Connect with the Department of Information Technology faculty, administrative office, and digital community."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Office Details Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-foreground">
              {settings.department_name}
            </h2>
            <p className="text-xs text-primary font-semibold">
              {settings.college_name}
            </p>
          </div>

          <div className="space-y-6 text-sm">
            {/* Address */}
            {settings.address && (
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Office Location
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              </div>
            )}

            {/* Email */}
            {settings.contact_email && (
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Official Email
                  </span>
                  <p className="text-muted-foreground">
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="text-primary hover:underline"
                    >
                      {settings.contact_email}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Phone */}
            {settings.contact_phone && (
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Telephone Inquiry
                  </span>
                  <p className="text-muted-foreground">
                    {settings.contact_phone}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Social Channels */}
          {socialChannels.length > 0 && (
            <div className="pt-6 border-t border-border space-y-3">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Digital & Social Channels
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socialChannels.map((ch) => (
                  <a
                    key={ch.name}
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <span>{ch.name}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Location / Campus Map Preview */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-foreground">
              Campus Grounds
            </h2>
            <p className="text-xs text-muted-foreground">
              The Department of Information Technology building houses high-speed computational clusters,
              dedicated project laboratories, and research seminar halls.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Building className="h-10 w-10 text-primary/60" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                Campus Location Map
              </p>
              <p className="text-xs text-muted-foreground max-w-xs">
                Interactive campus map coordinates will render here once verified in Site Settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
