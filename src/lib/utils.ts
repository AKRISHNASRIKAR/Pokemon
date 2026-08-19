type ClassValue = string | number | null | undefined | false;

/** Join class names. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Format slug. */
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

/** Format Pokémon ID. */
export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

/** Extract ID from URL. */
export function getIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

/** Get Pokémon artwork. */
export function getPokemonArtwork(sprites: {
  front_default: string | null;
  other?: { ["official-artwork"]?: { front_default: string | null } };
}): string | null {
  return sprites.other?.["official-artwork"]?.front_default ?? sprites.front_default;
}
