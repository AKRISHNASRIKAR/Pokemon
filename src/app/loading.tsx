import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/layout/Hero";
import { PokemonCardSkeleton } from "@/components/ui/Skeleton";
import { POKEMON_GRID_CLASSES } from "@/components/pokemon/PokemonGrid";

export default function Loading() {
  return (
    <Container className="flex flex-col gap-8 pb-16 md:gap-10">
      <Hero />
      <div className={POKEMON_GRID_CLASSES} aria-hidden="true">
        {Array.from({ length: 20 }).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
}
