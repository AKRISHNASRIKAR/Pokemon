"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Pokemon } from "@/types/pokemon";
import { capitalize, formatPokemonId, getPokemonArtwork } from "@/lib/utils";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { TiltCard } from "@/components/ui/TiltCard";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const artwork = getPokemonArtwork(pokemon.sprites);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`type-${primaryType} group block rounded-3xl focus-visible:outline-none`}
      aria-label={`View details for ${capitalize(pokemon.name)}`}
    >
      <TiltCard className="rounded-3xl">
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="transition-normal flex h-full flex-col gap-1 rounded-3xl border border-[var(--card-border)] bg-[var(--card-surface)] p-4 shadow-sm group-hover:border-[var(--type-color)]/40 group-hover:bg-[var(--card-surface-hover)] group-hover:shadow-lg group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-info"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--card-muted)]">
              {formatPokemonId(pokemon.id)}
            </span>
            <TypeBadge type={primaryType} variant="solid" tone="onDark" />
          </div>

          <div
            className="relative mx-auto -mt-2 flex aspect-square w-3/4 items-center justify-center"
            style={{ transform: "translateZ(48px)" }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-4 rounded-full opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
              style={{ background: "var(--type-color)" }}
            />
            {artwork ? (
              <Image
                src={artwork}
                alt={capitalize(pokemon.name)}
                fill
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 40vw, 70vw"
                className="relative object-contain p-3 transition-normal group-hover:scale-110"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center text-[var(--card-muted)]">
                <ImageOff className="size-10" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <div className="flex items-center justify-center gap-1">
              <h3 className="truncate text-base font-semibold text-[var(--card-foreground)] group-hover:underline">
                {capitalize(pokemon.name)}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                className="size-0 shrink-0 scale-0 text-[var(--card-foreground)] opacity-0 transition-transform duration-200 group-hover:size-4 group-hover:scale-100 group-hover:opacity-100"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {pokemon.types.map(({ type }) => (
                <TypeBadge key={type.name} type={type.name} tone="onDark" />
              ))}
            </div>
          </div>
        </motion.article>
      </TiltCard>
    </Link>
  );
}
