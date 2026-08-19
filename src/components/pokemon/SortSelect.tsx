import { ArrowUpDown } from "lucide-react";
import { SORT_OPTIONS, type SortKey } from "@/lib/sortPokemons";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

/** Accessible native select. */
export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative">
      <ArrowUpDown
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        aria-label="Sort Pokémon by"
        className="transition-fast h-full w-full cursor-pointer appearance-none rounded-full border border-border bg-surface py-2.5 pr-4 pl-10 text-sm font-medium text-foreground hover:border-border-strong"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
