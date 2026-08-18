import type { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

export const POKEMON_GRID_CLASSES =
  "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-6 md:gap-y-10";

interface PokemonGridProps {
  pokemons: Pokemon[];
}

export function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <div className={POKEMON_GRID_CLASSES}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
