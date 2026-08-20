"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { capitalize, cn } from "@/lib/utils";

interface FavoriteButtonProps {
  name: string;
  className?: string;
}

/** Toggles a Pokémon's favorited state, persisted via useFavorites. */
export function FavoriteButton({ name, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(name);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(name)}
      aria-pressed={active}
      aria-label={
        active ? `Remove ${capitalize(name)} from favorites` : `Add ${capitalize(name)} to favorites`
      }
      className={cn(
        "transition-fast inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <Heart
        className={cn(
          "transition-fast size-4",
          active ? "scale-110 fill-current text-[#ef4444]" : "fill-none"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
