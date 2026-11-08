import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-border bg-card/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold font-display tracking-tight text-foreground">
                CampusChronicle
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Every Event. Every Experience. Every Memory: Preserved Forever.
              A centralized digital showcase for collegiate Information Technology departments.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Sections
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/classroom" className="hover:text-primary transition-colors">
                  Classroom Activities
                </Link>
              </li>
              <li>
                <Link href="/technical-visits" className="hover:text-primary transition-colors">
                  Technical Visits
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors">
                  IT Events & Hackathons
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-primary transition-colors">
                  Video Archives
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Administration & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Portal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Department Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-primary transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} CampusChronicle. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern Next.js & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
