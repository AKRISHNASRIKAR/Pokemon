"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
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
  const href = `/pokemon/${pokemon.name}`;

  return (
    <Link
      href={href}
      className={`type-${primaryType} group block rounded-3xl focus-visible:outline-none`}
      aria-label={`View details for ${capitalize(pokemon.name)}`}
    >
      <TiltCard className="rounded-3xl">
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="transition-normal relative flex h-full flex-col gap-2 rounded-3xl border border-[var(--card-border)] bg-[var(--card-surface)] p-4 pt-5 shadow-sm group-hover:border-[var(--type-color)]/40 group-hover:bg-[var(--card-surface-hover)] group-hover:shadow-lg group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-info"
        >
          <div className="absolute top-4 left-4 z-10 text-xs font-medium text-[var(--card-muted)]">
            {formatPokemonId(pokemon.id)}
          </div>
          <div className="absolute top-4 right-4 z-10">
            <TypeBadge type={primaryType} variant="solid" tone="onDark" />
          </div>

          <div
            className="relative z-0 mx-auto -mt-10 flex aspect-square w-4/5 items-center justify-center"
            style={{
              transform: "translateZ(56px)",
              viewTransitionName: `pokemon-artwork-${pokemon.name}`,
            }}
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
                className="relative object-contain p-3 transition-normal group-hover:-translate-y-2 group-hover:scale-110"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center text-[var(--card-muted)]">
                <ImageOff className="size-10" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-center gap-1">
              <h3
                style={{ viewTransitionName: `pokemon-name-${pokemon.name}` }}
                className="truncate text-base font-semibold text-[var(--card-foreground)] group-hover:underline"
              >
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
