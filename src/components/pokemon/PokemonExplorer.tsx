"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { POKEMON_TYPES, type PokemonTypeName } from "@/constants/pokemonTypes";
import {
  POKEMON_GRID_CLASSES,
  PokemonGrid,
} from "@/components/pokemon/PokemonGrid";
import { PokemonCardSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { getPokemon, getPokemonNamesByType } from "@/services/pokemonApi";
import { capitalize, cn } from "@/lib/utils";
import type { Pokemon } from "@/types/pokemon";

const RESULTS_LIMIT = 24;
const DEBOUNCE_MS = 300;
const SKELETON_COUNT = 8;

interface PokemonExplorerProps {
  initialPokemons: Pokemon[];
  allNames: string[];
}

export function PokemonExplorer({
  initialPokemons,
  allNames,
}: PokemonExplorerProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonTypeName | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [totalMatches, setTotalMatches] = useState<number | null>(null);

  const typeCache = useRef(new Map<PokemonTypeName, string[]>());
  const requestId = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedQuery(query.trim().toLowerCase()),
      DEBOUNCE_MS
    );
    return () => clearTimeout(timeout);
  }, [query]);

  const isFiltering = debouncedQuery !== "" || selectedType !== null;
  const pokemons = isFiltering ? searchResults : initialPokemons;

  useEffect(() => {
    if (!isFiltering) {
      return;
    }

    const currentRequest = ++requestId.current;

    async function run() {
      setStatus("loading");

      try {
        let candidates: string[];

        if (selectedType) {
          const cached = typeCache.current.get(selectedType);
          candidates = cached ?? (await getPokemonNamesByType(selectedType));
          typeCache.current.set(selectedType, candidates);
        } else {
          candidates = allNames;
        }

        if (debouncedQuery) {
          candidates = candidates.filter((name) =>
            name.includes(debouncedQuery)
          );
        }

        if (requestId.current !== currentRequest) return;

        const limited = candidates.slice(0, RESULTS_LIMIT);
        const details = await Promise.all(limited.map((name) => getPokemon(name)));

        if (requestId.current !== currentRequest) return;

        details.sort((a, b) => a.id - b.id);
        setSearchResults(details);
        setTotalMatches(candidates.length);
        setStatus("idle");
      } catch {
        if (requestId.current === currentRequest) {
          setStatus("error");
        }
      }
    }

    run();
  }, [debouncedQuery, selectedType, allNames, isFiltering]);

  function toggleType(type: PokemonTypeName) {
    setSelectedType((current) => (current === type ? null : type));
  }

  function clearFilters() {
    setQuery("");
    setDebouncedQuery("");
    setSelectedType(null);
  }

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Pokémon by name..."
            aria-label="Search Pokémon by name"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pr-9 pl-10 text-sm text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((value) => !value)}
          aria-expanded={showFilters}
          className={cn(
            "transition-fast inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium",
            selectedType
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-border bg-surface text-foreground hover:border-border-strong"
          )}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
          {selectedType && <span>· {capitalize(selectedType)}</span>}
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-4">
          {POKEMON_TYPES.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                aria-pressed={isSelected}
                className={cn(
                  `type-${type}`,
                  "transition-fast inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                  isSelected
                    ? "border-transparent text-primary-foreground"
                    : "border-border text-foreground hover:border-border-strong"
                )}
                style={
                  isSelected ? { background: "var(--type-color)" } : undefined
                }
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{
                    background: isSelected ? "currentColor" : "var(--type-color)",
                  }}
                  aria-hidden="true"
                />
                {capitalize(type)}
              </button>
            );
          })}
          {(selectedType || query) && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-xs font-medium text-muted hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {isFiltering ? (
        <>
          {status === "idle" && totalMatches !== null && (
            <p className="text-sm text-muted" role="status">
              {totalMatches === 0
                ? "No Pokémon matched your search."
                : `Showing ${pokemons.length} of ${totalMatches} match${
                    totalMatches === 1 ? "" : "es"
                  }${
                    totalMatches > RESULTS_LIMIT
                      ? " — refine your search to narrow it down"
                      : ""
                  }.`}
            </p>
          )}

          {status === "error" && (
            <ErrorState
              title="Couldn't load these Pokémon"
              message="Something went wrong while searching. Please try again."
            />
          )}

          {status === "loading" && (
            <div className={POKEMON_GRID_CLASSES} aria-hidden="true">
              {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <PokemonCardSkeleton key={index} />
              ))}
            </div>
          )}

          {status === "idle" && pokemons.length > 0 && (
            <PokemonGrid pokemons={pokemons} />
          )}

          {status === "idle" && pokemons.length === 0 && (
            <ErrorState
              title="No Pokémon found"
              message="Try a different name or clear your filters."
            />
          )}
        </>
      ) : (
        <PokemonGrid pokemons={pokemons} />
      )}
    </div>
  );
}
