import type {
  Pokemon,
  PokemonListItem,
  PokemonListResponse,
  PokemonSpecies,
} from "@/types/pokemon";
import type { PokemonTypeName } from "@/constants/pokemonTypes";

const BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonNotFoundError extends Error {
  constructor(nameOrId: string | number) {
    super(`Pokémon "${nameOrId}" could not be found.`);
    this.name = "PokemonNotFoundError";
  }
}

class PokemonApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "PokemonApiError";
  }
}

/** Fetch a page of Pokémon list entries. */
export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new PokemonApiError(
      `Failed to load Pokémon list (status ${response.status}).`,
      response.status
    );
  }

  return response.json() as Promise<PokemonListResponse>;
}

/** Fetch details for a single Pokémon. */
export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  const response = await fetch(
    `${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`
  );

  if (response.status === 404) {
    throw new PokemonNotFoundError(nameOrId);
  }

  if (!response.ok) {
    throw new PokemonApiError(
      `Failed to load Pokémon "${nameOrId}" (status ${response.status}).`,
      response.status
    );
  }

  return response.json() as Promise<Pokemon>;
}

/** Fetch a page of Pokémon with full details. */
export async function getPokemonListWithDetails(
  limit = 20,
  offset = 0
): Promise<Pokemon[]> {
  const list = await getPokemonList(limit, offset);
  return Promise.all(list.results.map((item) => getPokemon(item.name)));
}

/** Fetch all Pokémon names. */
export async function getAllPokemonNames(): Promise<PokemonListItem[]> {
  const list = await getPokemonList(20000, 0);
  return list.results;
}

interface RawPokemonTypeDetail {
  pokemon: { pokemon: { name: string; url: string } }[];
}

/** Fetch Pokémon names by type. */
export async function getPokemonNamesByType(
  type: PokemonTypeName
): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/type/${type}`);

  if (!response.ok) {
    throw new PokemonApiError(
      `Failed to load Pokémon for type "${type}" (status ${response.status}).`,
      response.status
    );
  }

  const data = (await response.json()) as RawPokemonTypeDetail;
  return data.pokemon.map((entry) => entry.pokemon.name);
}

/** Fetch related Pokémon. */
export async function getRelatedPokemon(
  pokemon: Pokemon,
  limit = 4
): Promise<Pokemon[]> {
  const primaryType = pokemon.types[0]?.type.name;
  if (!primaryType) return [];

  const names = await getPokemonNamesByType(primaryType);
  const others = names.filter((name) => name !== pokemon.name).slice(0, limit);

  return Promise.all(others.map((name) => getPokemon(name)));
}

interface RawPokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
}

/** Fetch species data. */
export async function getPokemonSpecies(
  id: number
): Promise<PokemonSpecies> {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);

  if (!response.ok) {
    throw new PokemonApiError(
      `Failed to load species data for Pokémon #${id} (status ${response.status}).`,
      response.status
    );
  }

  const data = (await response.json()) as RawPokemonSpecies;
  const flavorEntry = data.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  const genusEntry = data.genera.find((entry) => entry.language.name === "en");

  return {
    flavorText: flavorEntry
      ? flavorEntry.flavor_text
          .replace(/[\n\f\r]+/g, " ")
          .replace(/pok[eé]mon/gi, "Pokémon")
      : null,
    genus: genusEntry?.genus ?? null,
  };
}
