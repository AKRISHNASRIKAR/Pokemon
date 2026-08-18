"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import type { Pokemon } from "@/types/pokemon";
import { capitalize, formatPokemonId, getPokemonArtwork } from "@/lib/utils";
import { TypeBadge } from "@/components/pokemon/TypeBadge";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const artwork = getPokemonArtwork(pokemon.sprites);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`type-${primaryType} group block rounded-2xl focus-visible:outline-none`}
      aria-label={`View details for ${capitalize(pokemon.name)}`}
    >
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="transition-normal flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm group-hover:shadow-md group-hover:border-border-strong group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-info"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {formatPokemonId(pokemon.id)}
          </span>
          <TypeBadge type={primaryType} variant="solid" />
        </div>

        <div
          className="relative mx-auto aspect-square w-3/4 overflow-hidden rounded-xl"
          style={{
            background:
              "color-mix(in srgb, var(--type-color) 12%, var(--surface-secondary))",
          }}
        >
          {artwork ? (
            <Image
              src={artwork}
              alt={capitalize(pokemon.name)}
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 40vw, 70vw"
              className="object-contain p-3 transition-normal group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOff className="size-10" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="mt-auto space-y-2">
          <h3 className="truncate text-base font-semibold text-foreground">
            {capitalize(pokemon.name)}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} />
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
