import {
  Bird,
  Brain,
  Bug,
  Droplets,
  Flame,
  FlaskConical,
  Gem,
  Ghost,
  Leaf,
  Moon,
  Mountain,
  PawPrint,
  Shield,
  Snowflake,
  Sparkles,
  Swords,
  WandSparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { PokemonTypeName } from "@/constants/pokemonTypes";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Record<PokemonTypeName, LucideIcon> = {
  normal: PawPrint,
  fire: Flame,
  water: Droplets,
  electric: Zap,
  grass: Leaf,
  ice: Snowflake,
  fighting: Swords,
  poison: FlaskConical,
  ground: Mountain,
  flying: Bird,
  psychic: Brain,
  bug: Bug,
  rock: Gem,
  ghost: Ghost,
  dragon: Sparkles,
  dark: Moon,
  steel: Shield,
  fairy: WandSparkles,
};

interface TypeIconProps {
  type: PokemonTypeName;
  size?: number;
  className?: string;
}

/** A type's icon glyph on a filled circle of its own --type-color. */
export function TypeIcon({ type, size = 18, className }: TypeIconProps) {
  const Icon = TYPE_ICONS[type];
  const glyphSize = Math.round(size * 0.6);

  return (
    <span
      aria-hidden="true"
      className={cn(
        `type-${type}`,
        "inline-flex shrink-0 items-center justify-center rounded-full",
        className
      )}
      style={{ width: size, height: size, background: "var(--type-color)" }}
    >
      <Icon size={glyphSize} strokeWidth={2.5} color="white" />
    </span>
  );
}
