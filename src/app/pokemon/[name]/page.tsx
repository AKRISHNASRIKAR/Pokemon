import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowLeft, ImageOff } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { StatBar } from "@/components/pokemon/StatBar";
import {
  getPokemon,
  getPokemonSpecies,
  PokemonNotFoundError,
} from "@/services/pokemonApi";
import {
  capitalize,
  formatPokemonId,
  formatSlug,
  formatStatName,
  getPokemonArtwork,
} from "@/lib/utils";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;

  try {
    const pokemon = await getPokemon(name);
    return { title: `${capitalize(pokemon.name)} | Pokémon Explorer` };
  } catch {
    return { title: "Pokémon Explorer" };
  }
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;

  let pokemon;
  try {
    pokemon = await getPokemon(name);
  } catch (error) {
    if (error instanceof PokemonNotFoundError) {
      notFound();
    }
    throw error;
  }

  const species = await getPokemonSpecies(pokemon.id).catch(() => null);
  const artwork = getPokemonArtwork(pokemon.sprites);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";

  return (
    <Container
      className={`type-${primaryType} flex flex-col gap-10 py-8 md:py-12`}
    >
      <Link
        href="/"
        className="transition-fast inline-flex w-fit items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to explorer
      </Link>

      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div
          className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl"
          style={{
            background:
              "color-mix(in srgb, var(--type-color) 14%, var(--surface-secondary))",
            viewTransitionName: `pokemon-artwork-${pokemon.name}`,
          }}
        >
          {artwork ? (
            <Image
              src={artwork}
              alt={capitalize(pokemon.name)}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-contain p-8"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOff className="size-16" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            {formatPokemonId(pokemon.id)}
          </span>
          <h1
            style={{ viewTransitionName: `pokemon-name-${pokemon.name}` }}
            className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            {capitalize(pokemon.name)}
          </h1>
          {species?.genus && (
            <p className="text-base text-muted">{species.genus}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} size="md" />
            ))}
          </div>

          {species?.flavorText && (
            <p className="max-w-md text-base leading-relaxed text-muted">
              {species.flavorText}
            </p>
          )}

          <div className="mt-2 grid max-w-sm grid-cols-2 gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Height
              </p>
              <p className="text-lg font-semibold text-foreground">
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Weight
              </p>
              <p className="text-lg font-semibold text-foreground">
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Base stats
          </h2>
          <div className="flex flex-col gap-3">
            {pokemon.stats.map((stat) => (
              <StatBar
                key={stat.stat.name}
                label={formatStatName(stat.stat.name)}
                value={stat.base_stat}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Abilities
          </h2>
          <ul className="flex flex-col gap-3">
            {pokemon.abilities.map((ability) => (
              <li
                key={ability.ability.name}
                className="flex items-center justify-between rounded-xl bg-surface-secondary px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground">
                  {formatSlug(ability.ability.name)}
                </span>
                {ability.is_hidden && (
                  <span className="text-xs font-medium text-muted-foreground">
                    Hidden
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
