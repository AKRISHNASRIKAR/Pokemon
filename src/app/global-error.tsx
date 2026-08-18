"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f8f9fb",
          color: "#17181c",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
            We couldn&apos;t load the Pokémon data.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              borderRadius: "0.75rem",
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              background: "#18181b",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
