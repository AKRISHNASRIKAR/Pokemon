"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { capitalize, cn } from "@/lib/utils";

const MAX_SUGGESTIONS = 8;

interface CompareSelectProps {
  label: string;
  allNames: string[];
  value: string | null;
  onChange: (name: string) => void;
}

/** Search box that narrows the full Pokédex name list down to a pick. */
export function CompareSelect({
  label,
  allNames,
  value,
  onChange,
}: CompareSelectProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return allNames
      .filter((name) => name.includes(term))
      .slice(0, MAX_SUGGESTIONS);
  }, [query, allNames]);

  // Close on outside click or Escape, rather than on input blur, so
  // Tab-ing from the input into a suggestion doesn't unmount the list out
  // from under the newly focused button.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function pick(name: string) {
    onChange(name);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </label>

      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="no-focus-ring transition-fast flex w-full items-center justify-between rounded-full border border-border bg-surface py-2.5 pr-3 pl-4 text-left text-sm font-medium text-foreground hover:border-border-strong focus-visible:border-border-strong"
        >
          {capitalize(value)}
          <X className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
      ) : (
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search a Pokémon..."
            aria-label={label}
            className="no-focus-ring w-full rounded-full border border-border bg-surface py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-border-strong"
          />

          {isOpen && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
              {suggestions.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => pick(name)}
                    className={cn(
                      "no-focus-ring transition-fast block w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-surface-secondary focus-visible:bg-surface-secondary"
                    )}
                  >
                    {capitalize(name)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
