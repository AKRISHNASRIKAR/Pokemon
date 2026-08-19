import { cn } from "@/lib/utils";

interface CompareStatRowProps {
  label: string;
  valueA: number;
  valueB: number;
  max: number;
  colorA: string;
  colorB: string;
}

/** One category row: two bars growing outward from a centered label, winner highlighted. */
export function CompareStatRow({
  label,
  valueA,
  valueB,
  max,
  colorA,
  colorB,
}: CompareStatRowProps) {
  const percentA = Math.min(100, Math.round((valueA / max) * 100));
  const percentB = Math.min(100, Math.round((valueB / max) * 100));
  const aWins = valueA > valueB;
  const bWins = valueB > valueA;

  return (
    <div className="grid grid-cols-[1fr_5.5rem_1fr] items-center gap-2 sm:grid-cols-[1fr_7rem_1fr] sm:gap-4">
      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <span
          className={cn(
            "tabular-nums text-sm sm:text-base",
            aWins
              ? "font-semibold text-[var(--card-foreground)]"
              : "text-[var(--card-muted)]"
          )}
        >
          {valueA}
        </span>
        <div className="h-2 w-16 overflow-hidden rounded-full bg-white/10 sm:w-28">
          <div
            className="ml-auto h-full rounded-full transition-normal"
            style={{
              width: `${percentA}%`,
              background: aWins ? colorA : "var(--card-muted)",
            }}
          />
        </div>
      </div>

      <span className="text-center text-[0.65rem] font-medium tracking-wide text-[var(--card-muted)] uppercase sm:text-xs">
        {label}
      </span>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-2 w-16 overflow-hidden rounded-full bg-white/10 sm:w-28">
          <div
            className="h-full rounded-full transition-normal"
            style={{
              width: `${percentB}%`,
              background: bWins ? colorB : "var(--card-muted)",
            }}
          />
        </div>
        <span
          className={cn(
            "tabular-nums text-sm sm:text-base",
            bWins
              ? "font-semibold text-[var(--card-foreground)]"
              : "text-[var(--card-muted)]"
          )}
        >
          {valueB}
        </span>
      </div>
    </div>
  );
}
