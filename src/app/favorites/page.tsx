import { Container } from "@/components/layout/Container";
import { FavoritesExplorer } from "@/components/pokemon/FavoritesExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites | Pokémon Explorer",
  description: "View your favorited Pokémon.",
};

export default function FavoritesPage() {
  return (
    <Container className="flex flex-col gap-8 pb-16 md:gap-10">
      <div className="flex flex-col gap-4 py-10 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your Favorites
        </h1>
        <p className="text-lg text-muted-foreground">
          All the Pokémon you&apos;ve saved for quick access.
        </p>
      </div>

      <FavoritesExplorer />
    </Container>
  );
}
