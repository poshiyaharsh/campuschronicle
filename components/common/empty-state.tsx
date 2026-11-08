import Link from "next/link";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({
  title = "No records found",
  description = "No departmental items have been published in this section yet.",
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center flex flex-col items-center justify-center space-y-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
        <FolderOpen className="h-6 w-6" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-semibold text-foreground font-display">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
