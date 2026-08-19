"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";
import { SORT_OPTIONS, type SortKey } from "@/lib/sortPokemons";
import { cn } from "@/lib/utils";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

/** Custom-styled dropdown (not a native <select>, so its open list can match the app's theme). */
export function SortSelect({ value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeOption = SORT_OPTIONS.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="no-focus-ring transition-fast inline-flex h-full items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground hover:border-border-strong focus-visible:border-border-strong"
      >
        <ArrowUpDown className="size-4 text-muted-foreground" aria-hidden="true" />
        {activeOption?.label ?? "Sort"}
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Sort Pokémon by"
          className="absolute top-full right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-surface py-1 shadow-lg"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "no-focus-ring transition-fast flex w-full items-center justify-between px-4 py-2.5 text-left text-sm",
                    isSelected
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground",
                    "hover:bg-surface-secondary focus-visible:bg-surface-secondary"
                  )}
                >
                  {option.label}
                  {isSelected && <Check className="size-4" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
