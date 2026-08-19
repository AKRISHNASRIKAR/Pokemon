import Link from "next/link";
import { Crown, ArrowUpRight } from "lucide-react";
import type { Pokemon } from "@/types/pokemon";
import { capitalize, formatPokemonId, getPokemonArtwork } from "@/lib/utils";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { PokemonArtwork } from "@/components/pokemon/PokemonArtwork";

interface ComparePanelProps {
  pokemon: Pokemon;
  isWinner: boolean;
}

/** A trading-card-styled identity card for one side of the comparison. */
export function ComparePanel({ pokemon, isWinner }: ComparePanelProps) {
  const artwork = getPokemonArtwork(pokemon.sprites);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <Link 
      href={`/${pokemon.name}`}
      className={`type-${primaryType} group relative mx-auto block w-full max-w-[18rem] focus-visible:outline-none`}
    >
      {isWinner && (
        <span className="absolute -top-3 -right-3 z-10 flex items-center gap-1 rounded-full bg-[var(--type-color)] px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Crown className="size-3.5" aria-hidden="true" />
          LEADS
        </span>
      )}

      <div
        className="rounded-[1.75rem] p-[3px] shadow-lg transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-xl group-focus-visible:-translate-y-2 group-focus-visible:ring-2 group-focus-visible:ring-info group-focus-visible:ring-offset-2"
        style={{
          background:
            "linear-gradient(155deg, var(--type-color), color-mix(in srgb, var(--type-color) 30%, transparent))",
        }}
      >
        <div className="dot-grid flex flex-col items-center gap-3 rounded-[1.6rem] border border-[var(--card-border)] bg-[var(--card-surface)] p-4">
          <div className="flex w-full items-center justify-between">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-[var(--card-foreground)] uppercase">
              {formatPokemonId(pokemon.id)}
            </span>
            <span className="text-[0.65rem] font-bold tracking-wide text-[var(--card-foreground)]">
              BST {totalStats}
            </span>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black/20">
            <span
              aria-hidden="true"
              className="absolute inset-6 rounded-full opacity-40 blur-2xl"
              style={{ background: "var(--type-color)" }}
            />
            <PokemonArtwork
              src={artwork}
              alt={capitalize(pokemon.name)}
              sizes="(min-width: 640px) 13rem, 11rem"
              fallbackClassName="size-8"
              className="relative object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-110"
            />
          </div>

          <div className="flex items-center justify-center gap-1">
            <h2 className="truncate text-lg font-semibold text-[var(--card-foreground)] group-hover:underline sm:text-xl">
              {capitalize(pokemon.name)}
            </h2>
            <ArrowUpRight
              aria-hidden="true"
              className="size-0 shrink-0 scale-0 text-[var(--card-foreground)] opacity-0 transition-all duration-200 group-hover:size-5 group-hover:scale-100 group-hover:opacity-100"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} variant="solid" tone="onDark" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
