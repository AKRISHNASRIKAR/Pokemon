import { Search, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/layout/Hero";
import { PokemonGrid } from "@/components/pokemon/PokemonGrid";
import { getPokemonListWithDetails } from "@/services/pokemonApi";

export default async function Home() {
  const pokemons = await getPokemonListWithDetails(20, 0);

  return (
    <Container className="flex flex-col gap-8 pb-16 md:gap-10">
      <Hero />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search Pokémon coming soon..."
            disabled
            aria-label="Search Pokémon (coming soon)"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
        <button
          type="button"
          disabled
          aria-label="Filter by type (coming soon)"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
        </button>
      </div>

      <PokemonGrid pokemons={pokemons} />
    </Container>
  );
}
