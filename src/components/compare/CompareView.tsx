"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2, Swords } from "lucide-react";
import type { Pokemon } from "@/types/pokemon";
import { getPokemon } from "@/services/pokemonApi";
import { capitalize, formatStatName } from "@/lib/utils";
import { CompareSelect } from "@/components/compare/CompareSelect";
import { ComparePanel } from "@/components/compare/ComparePanel";
import { CompareStatRow } from "@/components/compare/CompareStatRow";
import { ErrorState } from "@/components/ui/ErrorState";

interface CompareViewProps {
  allNames: string[];
}

function useComparedPokemon(name: string | null) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    let cancelled = false;

    getPokemon(name)
      .then((data) => {
        if (cancelled) return;
        setPokemon(data);
      })
      .catch(() => {
        if (cancelled) return;
        setErrorName(name);
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  if (!name) {
    return { pokemon: null, status: "idle" as const };
  }
  if (errorName === name) {
    return { pokemon: null, status: "error" as const };
  }
  if (pokemon?.name === name) {
    return { pokemon, status: "idle" as const };
  }
  return { pokemon: null, status: "loading" as const };
}

export function CompareView({ allNames }: CompareViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [nameA, setNameA] = useState(searchParams.get("a") ?? "");
  const [nameB, setNameB] = useState(searchParams.get("b") ?? "");

  const { pokemon: pokemonA, status: statusA } = useComparedPokemon(
    nameA || null
  );
  const { pokemon: pokemonB, status: statusB } = useComparedPokemon(
    nameB || null
  );

  const initialSync = useRef(true);
  useEffect(() => {
    if (initialSync.current) {
      initialSync.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (nameA) params.set("a", nameA);
    if (nameB) params.set("b", nameB);

    const queryString = params.toString();
    const nextSearch = queryString ? `?${queryString}` : "";
    if (nextSearch === window.location.search) return;

    router.replace(`${pathname}${nextSearch}`, { scroll: false });
  }, [nameA, nameB, pathname, router]);

  const bothSelected = Boolean(pokemonA && pokemonB);
  const bstA = pokemonA?.stats.reduce((sum, stat) => sum + stat.base_stat, 0) ?? 0;
  const bstB = pokemonB?.stats.reduce((sum, stat) => sum + stat.base_stat, 0) ?? 0;

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <CompareSelect
          label="Pokémon A"
          allNames={allNames}
          value={nameA || null}
          onChange={setNameA}
        />
        <span
          aria-hidden="true"
          className="btn-gradient flex size-9 shrink-0 items-center justify-center rounded-full text-white"
        >
          <Swords className="size-4" aria-hidden="true" />
        </span>
        <CompareSelect
          label="Pokémon B"
          allNames={allNames}
          value={nameB || null}
          onChange={setNameB}
        />
      </div>

      {(statusA === "error" || statusB === "error") && (
        <ErrorState
          title="Couldn't load that Pokémon"
          message="Something went wrong. Try picking again."
        />
      )}

      {(statusA === "loading" || statusB === "loading") && (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Loading Pokémon...
        </div>
      )}

      {!bothSelected && statusA !== "loading" && statusB !== "loading" && (
        <p className="text-center text-sm text-muted">
          Pick two Pokémon to see how they stack up, category by category.
        </p>
      )}

      {pokemonA && pokemonB && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-8">
            <ComparePanel
              pokemon={pokemonA}
              isWinner={bstA > bstB}
            />
            <span
              aria-hidden="true"
              className="btn-gradient flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg"
            >
              VS
            </span>
            <ComparePanel
              pokemon={pokemonB}
              isWinner={bstB > bstA}
            />
          </div>

          <div className="dot-grid rounded-3xl border border-[var(--card-border)] bg-[var(--card-surface)] p-6 shadow-lg sm:p-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-center text-xs font-semibold tracking-widest text-[var(--card-muted)] uppercase">
                Base stats
              </h2>
              {pokemonA.stats.map((stat, index) => (
                <CompareStatRow
                  key={stat.stat.name}
                  label={formatStatName(stat.stat.name)}
                  valueA={stat.base_stat}
                  valueB={pokemonB.stats[index]?.base_stat ?? 0}
                  max={255}
                  colorA={`var(--type-${pokemonA.types[0]?.type.name ?? "normal"})`}
                  colorB={`var(--type-${pokemonB.types[0]?.type.name ?? "normal"})`}
                />
              ))}

              <div className="my-2 h-px bg-[var(--card-border)]" />

              <CompareStatRow
                label="Height (m)"
                valueA={Number((pokemonA.height / 10).toFixed(1))}
                valueB={Number((pokemonB.height / 10).toFixed(1))}
                max={Math.max(pokemonA.height, pokemonB.height, 1) / 10}
                colorA={`var(--type-${pokemonA.types[0]?.type.name ?? "normal"})`}
                colorB={`var(--type-${pokemonB.types[0]?.type.name ?? "normal"})`}
              />
              <CompareStatRow
                label="Weight (kg)"
                valueA={Number((pokemonA.weight / 10).toFixed(1))}
                valueB={Number((pokemonB.weight / 10).toFixed(1))}
                max={Math.max(pokemonA.weight, pokemonB.weight, 1) / 10}
                colorA={`var(--type-${pokemonA.types[0]?.type.name ?? "normal"})`}
                colorB={`var(--type-${pokemonB.types[0]?.type.name ?? "normal"})`}
              />
            </div>

            <p className="mt-8 text-center text-xs text-[var(--card-muted)]">
              Highlighted bar shows the higher value in each category.{" "}
              {capitalize(pokemonA.name)} vs {capitalize(pokemonB.name)}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
