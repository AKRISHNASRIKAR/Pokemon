"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "pokemon-favorites";
const CHANGE_EVENT = "favorites-changed";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

/** Favorited Pokémon names, persisted to localStorage. */
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favorites = useMemo<string[]>(() => {
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  }, [raw]);

  function isFavorite(name: string) {
    return favorites.includes(name);
  }

  function toggleFavorite(name: string) {
    const next = favorites.includes(name)
      ? favorites.filter((favorite) => favorite !== name)
      : [...favorites, name];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return { favorites, isFavorite, toggleFavorite };
}
