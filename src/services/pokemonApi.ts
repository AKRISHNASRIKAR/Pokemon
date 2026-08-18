import type { Pokemon, PokemonListResponse } from "@/types/pokemon";

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

/**
 * Fetches a page of Pokémon list entries. Each entry only contains
 * `name` and `url` — use `getPokemon` to load full details.
 */
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

/** Fetches full details for a single Pokémon by name or numeric id. */
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

/**
 * Fetches a page of Pokémon with full details, resolved for the caller so
 * the UI never needs to know the list endpoint is name/url only.
 */
export async function getPokemonListWithDetails(
  limit = 20,
  offset = 0
): Promise<Pokemon[]> {
  const list = await getPokemonList(limit, offset);
  return Promise.all(list.results.map((item) => getPokemon(item.name)));
}
