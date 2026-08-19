import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/layout/Hero";
import { PokemonExplorer } from "@/components/pokemon/PokemonExplorer";
import { PokemonGridSkeleton } from "@/components/ui/Skeleton";
import { getAllPokemonNames, getPokemonListWithDetails } from "@/services/pokemonApi";

export default async function Home() {
  const [pokemons, allNames] = await Promise.all([
    getPokemonListWithDetails(20, 0),
    getAllPokemonNames(),
  ]);

  return (
    <Container className="flex flex-col gap-8 pb-16 md:gap-10">
      <Hero />
      <Suspense fallback={<PokemonGridSkeleton />}>
        <PokemonExplorer
          initialPokemons={pokemons}
          allNames={allNames.map((item) => item.name)}
          totalCount={allNames.length}
        />
      </Suspense>
    </Container>
  );
}
