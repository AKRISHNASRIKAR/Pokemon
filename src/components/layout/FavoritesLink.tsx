"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export function FavoritesLink() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <Link
      href="/favorites"
      aria-label="View favorites"
      className="transition-fast inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface-secondary text-[#f43f5e] hover:text-[#e11d48]"
    >
      <Heart className="size-4 fill-current" aria-hidden="true" />
    </Link>
  );
}
