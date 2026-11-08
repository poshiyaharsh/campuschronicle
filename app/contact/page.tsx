import { Mail, MapPin, Phone, Building } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
          <Building className="h-4 w-4" />
          <span>Department Inquiries</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Contact & Department Presence
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Connect with the Information Technology department faculty and administration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <h2 className="text-xl font-semibold text-foreground font-display">
            Department Office
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p>Department of Information Technology</p>
                <p className="text-xs text-muted-foreground">TODO_VERIFY (Campus block & postal address)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Official Email</p>
                <p className="text-xs text-muted-foreground">TODO_VERIFY (e.g. it-dept@college.edu)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-muted-foreground">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Office Telephone</p>
                <p className="text-xs text-muted-foreground">TODO_VERIFY</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground font-display">
              Location & Campus Map
            </h2>
            <p className="text-xs text-muted-foreground">
              Interactive map embed placeholder. Real location map coordinates to be configured in Site Settings.
            </p>
          </div>
          <div className="h-48 rounded-lg border border-dashed border-border bg-secondary/40 flex items-center justify-center text-xs text-muted-foreground">
            [Campus Map Embed Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
