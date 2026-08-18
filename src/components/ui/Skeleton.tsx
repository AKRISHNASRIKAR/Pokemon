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
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <Skeleton className="mx-auto aspect-square w-3/4 rounded-xl" />
      <Skeleton className="h-5 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
