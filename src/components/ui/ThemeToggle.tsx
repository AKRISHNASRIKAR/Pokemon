"use client";

import { useRef, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

const THEME_TRANSITION_CLASS = "theme-transition";

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pendingTransition = useRef<ViewTransition | null>(null);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");

    function applyTheme() {
      root.classList.toggle("dark", next);
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Let an in-flight fade finish on its own rather than starting an
    // overlapping one — the browser would just abort the first anyway.
    if (
      !document.startViewTransition ||
      prefersReducedMotion ||
      pendingTransition.current
    ) {
      applyTheme();
      return;
    }

    root.classList.add(THEME_TRANSITION_CLASS);
    const transition = document.startViewTransition(applyTheme);
    pendingTransition.current = transition;

    // `ready` rejects (not `finished`) when the transition is skipped before
    // it can begin — e.g. the DOM changes again mid-flight. The theme itself
    // is already applied by the callback above either way, so just swallow it.
    transition.ready.catch(() => {});

    transition.finished.finally(() => {
      pendingTransition.current = null;
      root.classList.remove(THEME_TRANSITION_CLASS);
    });
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark theme"
      className="transition-fast inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface-secondary"
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
