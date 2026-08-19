import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/layout/Hero";
import { PokemonGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="flex flex-col gap-8 pb-16 md:gap-10">
      <Hero />
      <PokemonGridSkeleton />
    </Container>
  );
}
