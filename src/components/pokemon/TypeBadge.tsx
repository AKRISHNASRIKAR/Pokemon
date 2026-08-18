import type { PokemonTypeName } from "@/constants/pokemonTypes";
import { capitalize, cn } from "@/lib/utils";

type TypeBadgeSize = "sm" | "md";
type TypeBadgeVariant = "outline" | "solid";

interface TypeBadgeProps {
  type: PokemonTypeName;
  size?: TypeBadgeSize;
  variant?: TypeBadgeVariant;
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

/** Read-only Pokémon type pill, colored via the shared --type-color system. */
export function TypeBadge({
  type,
  size = "sm",
  variant = "outline",
  className,
}: TypeBadgeProps) {
  return (
    <span
      className={cn(
        `type-${type}`,
        "inline-flex items-center rounded-full font-medium",
        SIZE_CLASSES[size],
        variant === "outline"
          ? "border border-border text-foreground"
          : "text-[var(--type-color)]",
        className
      )}
      style={
        variant === "solid"
          ? { background: "color-mix(in srgb, var(--type-color) 16%, var(--surface))" }
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
