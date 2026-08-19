"use client";

import { useEffect } from "react";

/**
 * `ViewTransition.ready` rejects whenever a transition is skipped or
 * superseded before it can begin — a normal outcome (fast repeat navigation,
 * the DOM changing mid-flight), not a bug. `next-view-transitions` calls
 * `document.startViewTransition()` internally but never handles that
 * rejection, so it surfaces as an unhandled promise rejection on every such
 * navigation. Patching `startViewTransition` here, once, catches it at the
 * source for every caller (this library included) without forking it.
 */
export function ViewTransitionErrorGuard() {
  useEffect(() => {
    if (!("startViewTransition" in document)) return;

    const native = document.startViewTransition.bind(document);
    document.startViewTransition = (...args: Parameters<typeof native>) => {
      const transition = native(...args);
      transition.ready.catch(() => {});
      return transition;
    };

    return () => {
      document.startViewTransition = native;
    };
  }, []);

  return null;
}
