"use client";

import { useEffect } from "react";

/**
 * The View Transitions API can reject a transition's `finished` promise as
 * "aborted because of invalid state" when a navigation resolves faster than
 * the transition lifecycle expects — a known, documented edge case (see
 * next-view-transitions' README) that doesn't affect the actual navigation.
 * This silences only that specific, narrow case so it doesn't surface as an
 * unhandled rejection, without masking unrelated errors.
 */
export function ViewTransitionErrorGuard() {
  useEffect(() => {
    function handleRejection(event: PromiseRejectionEvent) {
      const reason = event.reason;
      if (
        reason instanceof DOMException &&
        reason.name === "InvalidStateError" &&
        reason.message.toLowerCase().includes("transition")
      ) {
        event.preventDefault();
      }
    }

    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return null;
}
