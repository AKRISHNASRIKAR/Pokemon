"use client";

import { useEffect } from "react";

const STORAGE_PREFIX = "scroll:";
const SAVE_THROTTLE_MS = 100;

function scrollKey(pathname: string) {
  return `${STORAGE_PREFIX}${pathname}`;
}

/**
 * Restores scroll position on back/forward navigation.
 *
 * The View Transitions API wrapping (`next-view-transitions`) swaps in the
 * new page before the browser's own scroll restoration has a chance to run,
 * so back-navigating from a detail page lands at the top instead of where
 * the user was. This takes scroll restoration over manually: it remembers
 * scroll position per path as the user scrolls, and re-applies it once a
 * popstate navigation (back/forward) settles.
 */
export function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let saveTimeout: ReturnType<typeof setTimeout> | null = null;

    function saveScrollPosition() {
      if (saveTimeout) return;
      saveTimeout = setTimeout(() => {
        sessionStorage.setItem(
          scrollKey(window.location.pathname),
          String(window.scrollY)
        );
        saveTimeout = null;
      }, SAVE_THROTTLE_MS);
    }

    function restoreScrollPosition() {
      const saved = sessionStorage.getItem(scrollKey(window.location.pathname));
      if (saved === null) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: Number(saved), behavior: "instant" });
        });
      });
    }

    window.addEventListener("scroll", saveScrollPosition, { passive: true });
    window.addEventListener("popstate", restoreScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
      window.removeEventListener("popstate", restoreScrollPosition);
      if (saveTimeout) clearTimeout(saveTimeout);
    };
  }, []);

  return null;
}
