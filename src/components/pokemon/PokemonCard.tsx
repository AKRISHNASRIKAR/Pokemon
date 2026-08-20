"use client";

import Link from "next/link";
import { m } from "framer-motion";
import type { Pokemon } from "@/types/pokemon";
import { capitalize, formatPokemonId, getPokemonArtwork } from "@/lib/utils";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { TypeIcon } from "@/components/pokemon/TypeIcon";
import { TiltCard } from "@/components/ui/TiltCard";
import { PokemonArtwork } from "@/components/pokemon/PokemonArtwork";
import { FavoriteButton } from "@/components/pokemon/FavoriteButton";

interface PokemonCardProps {
  pokemon: Pokemon;
  /** LCP candidate flag. */
  priority?: boolean;
  /** Grid position index. */
  index?: number;
}

export function PokemonCard({
  pokemon,
  priority = false,
  index = 0,
}: PokemonCardProps) {
  const artwork = getPokemonArtwork(pokemon.sprites);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const hp = pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat ?? "?";
  const href = `/${pokemon.name}`;

  return (
    <div className={`type-${primaryType} relative`}>
      <Link
        href={href}
        className="group block rounded-[26px] focus-visible:outline-none"
        aria-label={`View details for ${capitalize(pokemon.name)}`}
      >
        <TiltCard className="rounded-[26px]">
          <m.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.04, 0.4),
              ease: "easeOut",
            }}
            className="pokemon-card-frame transition-normal relative rounded-[26px] p-[3px] shadow-sm group-hover:shadow-xl group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-info"
          >
            <div className="flex h-full flex-col gap-3 rounded-[23px] border border-[var(--card-border)] bg-[var(--card-surface)] p-3.5">
              {/* Header: name + HP, like a card's name/HP plate */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="truncate pt-0.5 text-[15px] leading-tight font-bold tracking-tight text-[var(--card-foreground)] group-hover:underline">
                  {capitalize(pokemon.name)}
                </h2>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-black/25 py-1 pr-2.5 pl-1 text-xs font-bold text-[var(--card-foreground)]">
                  <TypeIcon type={primaryType} size={18} />
                  HP {hp}
                </span>
              </div>

              {/* Artwork window */}
              <div className="dot-grid relative aspect-square overflow-hidden rounded-2xl border border-[var(--card-border)] bg-black/20">
                <span
                  aria-hidden="true"
                  className="absolute inset-6 rounded-full opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
                  style={{ background: "var(--type-color)" }}
                />
                <PokemonArtwork
                  src={artwork}
                  alt={capitalize(pokemon.name)}
                  sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 23vw, (min-width: 640px) 33vw, 45vw"
                  priority={priority}
                  transitionName={`pokemon-artwork-${pokemon.id}`}
                  className="relative object-contain p-3 transition-normal group-hover:-translate-y-1.5 group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="holo-sweep pointer-events-none absolute -inset-full"
                />
              </div>

              {/* Footer: Pokédex number + type "energy" pills */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold tracking-wide text-[var(--card-muted)]">
                  {formatPokemonId(pokemon.id)}
                </span>
                <div className="flex flex-wrap justify-end gap-1">
                  {pokemon.types.map(({ type }) => (
                    <TypeBadge key={type.name} type={type.name} tone="onDark" />
                  ))}
                </div>
              </div>
            </div>
          </m.article>
        </TiltCard>
      </Link>

      <FavoriteButton
        name={pokemon.name}
        className="absolute -top-2.5 -right-2.5 z-20 size-9 border border-[var(--card-border)] bg-[var(--card-surface)] text-white shadow-md hover:scale-105 hover:text-white"
      />
    </div>
  );
}
