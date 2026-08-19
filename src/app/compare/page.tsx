import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CompareView } from "@/components/compare/CompareView";
import { getAllPokemonNames } from "@/services/pokemonApi";

export const metadata: Metadata = {
  title: "Compare Pokémon | Pokémon Explorer",
  description:
    "Compare any two Pokémon side by side across base stats, height, and weight.",
};

export default async function ComparePage() {
  const names = await getAllPokemonNames();

  return (
    <Container className="flex flex-col gap-3 py-8 md:py-12">
      <span className="text-sm font-medium tracking-wide text-muted uppercase">
        Left vs. right
      </span>
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Compare Pokémon
      </h1>
      <p className="mb-6 max-w-xl text-base text-muted">
        Pick any two Pokémon and see how their stats measure up, category by
        category.
      </p>

      <Suspense
        fallback={
          <div className="py-24 text-center text-sm text-muted">
            Loading...
          </div>
        }
      >
        <CompareView allNames={names.map((item) => item.name)} />
      </Suspense>
    </Container>
  );
}
