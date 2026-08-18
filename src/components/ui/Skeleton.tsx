import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-surface-secondary", className)}
    />
  );
}

/** Placeholder shaped like a PokemonCard, used while list data loads. */
export function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[var(--card-border)] bg-[var(--card-surface)] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-10 bg-white/10" />
        <Skeleton className="h-5 w-14 rounded-full bg-white/10" />
      </div>
      <Skeleton className="mx-auto aspect-square w-3/4 rounded-xl bg-white/10" />
      <Skeleton className="mx-auto h-5 w-2/3 bg-white/10" />
      <div className="flex justify-center gap-2">
        <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
        <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
      </div>
    </div>
  );
}
