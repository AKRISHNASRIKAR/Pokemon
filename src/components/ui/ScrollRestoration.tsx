"use client";

import { useEffect } from "react";

const STORAGE_PREFIX = "scroll:";
const SAVE_THROTTLE_MS = 100;

function scrollKey(pathname: string) {
  return `${STORAGE_PREFIX}${pathname}`;
}

/** Restores scroll position manually on back/forward navigation. */
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

      let attempts = 0;
      const target = Number(saved);

      function tryRestore() {
        window.scrollTo({ top: target, behavior: "instant" });
        attempts += 1;
        if (Math.abs(window.scrollY - target) > 2 && attempts < 20) {
          requestAnimationFrame(tryRestore);
        }
      }

      requestAnimationFrame(() => requestAnimationFrame(tryRestore));
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
