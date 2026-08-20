import { cn } from "@/lib/utils";
import { POKEMON_GRID_CLASSES } from "@/components/pokemon/PokemonGrid";

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

export function PokemonCardSkeleton() {
  return (
    <div className="rounded-[26px] border border-[var(--card-border)] bg-[var(--card-surface)] p-3.5 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20 bg-white/10" />
          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
        </div>
        <Skeleton className="aspect-square w-full rounded-2xl bg-white/10" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-10 bg-white/10" />
          <Skeleton className="h-5 w-14 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

interface PokemonGridSkeletonProps {
  count?: number;
}

export function PokemonGridSkeleton({ count = 20 }: PokemonGridSkeletonProps) {
  return (
    <div className={POKEMON_GRID_CLASSES} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function SearchFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:gap-10" aria-hidden="true">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-[42px] flex-1 rounded-full" />
        <div className="flex gap-3">
          <Skeleton className="h-[42px] w-[100px] rounded-full" />
          <Skeleton className="h-[42px] w-[140px] rounded-full" />
        </div>
      </div>
      <PokemonGridSkeleton count={20} />
    </div>
  );
}
