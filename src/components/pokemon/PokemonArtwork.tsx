"use client";

import { useState } from "react";
import { ViewTransition } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PokemonArtworkProps {
  src: string | null;
  alt: string;
  sizes: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  fallbackClassName?: string;
  /** Shared view-transition name. */
  transitionName?: string;
}

/** Pokémon artwork with fallback. */
export function PokemonArtwork({
  src,
  alt,
  sizes,
  quality = 65,
  priority = false,
  className,
  fallbackClassName = "size-10",
  transitionName,
}: PokemonArtworkProps) {
  const [failed, setFailed] = useState(false);

  const content =
    !src || failed ? (
      <div className="relative flex h-full w-full items-center justify-center text-[var(--card-muted)]">
        <ImageOff className={cn("shrink-0", fallbackClassName)} aria-hidden="true" />
      </div>
    ) : (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        onError={() => setFailed(true)}
        className={className}
      />
    );

  if (!transitionName) return content;

  return <ViewTransition name={transitionName}>{content}</ViewTransition>;
}
