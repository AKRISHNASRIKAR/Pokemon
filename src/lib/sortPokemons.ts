import type { Pokemon } from "@/types/pokemon";

export const SORT_OPTIONS = [
  { value: "id", label: "Pokédex number" },
  { value: "name", label: "Name (A–Z)" },
  { value: "hp", label: "HP" },
  { value: "attack", label: "Attack" },
  { value: "speed", label: "Speed" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export function isSortKey(value: string): value is SortKey {
  return SORT_OPTIONS.some((option) => option.value === value);
}

function getBaseStat(pokemon: Pokemon, statName: string): number {
  return pokemon.stats.find((stat) => stat.stat.name === statName)?.base_stat ?? 0;
}

export function sortPokemons(pokemons: Pokemon[], sort: SortKey): Pokemon[] {
  const sorted = [...pokemons];

  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "hp":
      return sorted.sort((a, b) => getBaseStat(b, "hp") - getBaseStat(a, "hp"));
    case "attack":
      return sorted.sort((a, b) => getBaseStat(b, "attack") - getBaseStat(a, "attack"));
    case "speed":
      return sorted.sort((a, b) => getBaseStat(b, "speed") - getBaseStat(a, "speed"));
    case "id":
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
}
