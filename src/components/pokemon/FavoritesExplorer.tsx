"use client";

import { useEffect, useState } from "react";

import { useFavorites } from "@/hooks/useFavorites";
import { PokemonGrid } from "@/components/pokemon/PokemonGrid";
import { PokemonGridSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";
import { getPokemon } from "@/services/pokemonApi";
import type { Pokemon } from "@/types/pokemon";

export function FavoritesExplorer() {
  const { favorites } = useFavorites();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");

  useEffect(() => {
    let mounted = true;

    async function fetchFavorites() {
      if (favorites.length === 0) {
        setPokemons([]);
        setStatus("idle");
        return;
      }

      // Only show full loading state if we don't have any data yet
      if (pokemons.length === 0) {
        setStatus("loading");
      }

      try {
        const results = await Promise.all(
          favorites.map((name) => getPokemon(name))
        );
        if (mounted) {
          setPokemons(results);
          setStatus("idle");
        }
      } catch {
        if (mounted) {
          setStatus("error");
        }
      }
    }

    fetchFavorites();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]); // omit pokemons from deps to avoid infinite loop

  if (status === "idle" && favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          No favorites yet
        </h2>
        <p className="mb-8 text-muted-foreground">
          You haven&apos;t added any Pokémon to your favorites.
        </p>
        <Button href="/" variant="gradient">
          Explore Pokémon
        </Button>
      </div>
    );
  }

  if (status === "loading") {
    return <PokemonGridSkeleton count={Math.min(favorites.length || 8, 24)} />;
  }

  if (status === "error") {
    return (
      <ErrorState
        title="Couldn't load favorites"
        message="Something went wrong while fetching your favorited Pokémon."
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
