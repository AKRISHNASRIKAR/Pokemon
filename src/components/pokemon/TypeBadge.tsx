import type { PokemonTypeName } from "@/constants/pokemonTypes";
import { capitalize, cn } from "@/lib/utils";
import { TypeIcon } from "@/components/pokemon/TypeIcon";

type TypeBadgeSize = "sm" | "md";
type TypeBadgeVariant = "outline" | "solid";
/** Badge theme tone. */
type TypeBadgeTone = "default" | "onDark";

interface TypeBadgeProps {
  type: PokemonTypeName;
  size?: TypeBadgeSize;
  variant?: TypeBadgeVariant;
  tone?: TypeBadgeTone;
  className?: string;
}

const SIZE_CLASSES: Record<TypeBadgeSize, string> = {
  sm: "gap-1.5 py-0.5 pr-2.5 pl-1 text-xs",
  md: "gap-2 py-1 pr-3.5 pl-1.5 text-sm",
};

const ICON_SIZE: Record<TypeBadgeSize, number> = {
  sm: 16,
  md: 20,
};

const TONE_SURFACE_VAR: Record<TypeBadgeTone, string> = {
  default: "var(--surface)",
  onDark: "var(--card-surface)",
};

const TONE_TEXT_CLASS: Record<TypeBadgeTone, string> = {
  default: "text-foreground",
  onDark: "text-[var(--card-foreground)]",
};

/** Type badge pill. */
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
        variant === "outline" && tone === "onDark"
          ? "border border-[var(--card-border)]"
          : variant === "outline"
            ? "border border-border"
            : undefined,
        TONE_TEXT_CLASS[tone],
        className
      )}
      style={
        variant === "solid"
          ? {
              background: `color-mix(in srgb, var(--type-color) 20%, ${TONE_SURFACE_VAR[tone]})`,
            }
          : undefined
      }
    >
      <TypeIcon type={type} size={ICON_SIZE[size]} />
      {capitalize(type)}
    </span>
  );
}
