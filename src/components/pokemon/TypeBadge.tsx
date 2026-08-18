import type { PokemonTypeName } from "@/constants/pokemonTypes";
import { capitalize, cn } from "@/lib/utils";

type TypeBadgeSize = "sm" | "md";
type TypeBadgeVariant = "outline" | "solid";
/** "default" follows the page's light/dark theme; "onDark" is for the
 * always-dark PokemonCard surface, which doesn't flip with the theme toggle. */
type TypeBadgeTone = "default" | "onDark";

interface TypeBadgeProps {
  type: PokemonTypeName;
  size?: TypeBadgeSize;
  variant?: TypeBadgeVariant;
  tone?: TypeBadgeTone;
  className?: string;
}

const SIZE_CLASSES: Record<TypeBadgeSize, string> = {
  sm: "gap-1.5 px-2.5 py-0.5 text-xs",
  md: "gap-2 px-3.5 py-1.5 text-sm",
};

const DOT_SIZE_CLASSES: Record<TypeBadgeSize, string> = {
  sm: "size-1.5",
  md: "size-2",
};

const TONE_SURFACE_VAR: Record<TypeBadgeTone, string> = {
  default: "var(--surface)",
  onDark: "var(--card-surface)",
};

/** Read-only Pokémon type pill, colored via the shared --type-color system. */
export function TypeBadge({
  type,
  size = "sm",
  variant = "outline",
  tone = "default",
  className,
}: TypeBadgeProps) {
  return (
    <span
      className={cn(
        `type-${type}`,
        "inline-flex items-center rounded-full font-medium",
        SIZE_CLASSES[size],
        variant === "outline"
          ? tone === "onDark"
            ? "border border-[var(--card-border)] text-[var(--card-foreground)]"
            : "border border-border text-foreground"
          : "text-[var(--type-color)]",
        className
      )}
      style={
        variant === "solid"
          ? {
              background: `color-mix(in srgb, var(--type-color) 18%, ${TONE_SURFACE_VAR[tone]})`,
            }
          : undefined
      }
    >
      {variant === "outline" && (
        <span
          className={cn("rounded-full", DOT_SIZE_CLASSES[size])}
          style={{ background: "var(--type-color)" }}
          aria-hidden="true"
        />
      )}
      {capitalize(type)}
    </span>
  );
}
