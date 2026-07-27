import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded-md bg-muted/60" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
          >
            <div className="mb-4 h-12 w-12 animate-pulse rounded-xl bg-muted" />
            <div className="h-3 w-24 animate-pulse rounded-md bg-muted/60" />
            <div className="mt-3 h-8 w-16 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="h-5 w-36 animate-pulse rounded-md bg-muted mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 flex-1 animate-pulse rounded-md bg-muted/40" />
                <div className="h-5 w-16 animate-pulse rounded-full bg-muted/60" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="h-5 w-28 animate-pulse rounded-md bg-muted mb-6" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-muted/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
