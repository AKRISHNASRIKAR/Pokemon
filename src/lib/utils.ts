type ClassValue = string | number | null | undefined | false;

/** Joins truthy class names together. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Turns a kebab-case API slug into a readable label, e.g. "solar-power" -> "Solar Power". */
export function formatSlug(value: string): string {
  return value.split("-").map(capitalize).join(" ");
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export function formatStatName(name: string): string {
  return STAT_LABELS[name] ?? formatSlug(name);
}

/** Formats a Pokémon id as a zero-padded dex number, e.g. 7 -> "#007". */
export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

/** Extracts the numeric id from a PokéAPI resource url like `.../pokemon/7/`. */
export function getIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

/** Prefers the official artwork, falling back to the classic front sprite. */
export function getPokemonArtwork(sprites: {
  front_default: string | null;
  other?: { ["official-artwork"]?: { front_default: string | null } };
}): string | null {
  return sprites.other?.["official-artwork"]?.front_default ?? sprites.front_default;
}
