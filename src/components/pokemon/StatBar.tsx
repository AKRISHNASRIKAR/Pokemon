import type { CSSProperties } from "react";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
}

/** Horizontal bar for a single base stat, tinted via the ancestor's --type-color. */
export function StatBar({ label, value, max = 255 }: StatBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-sm text-muted">{label}</span>
      <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums text-foreground">
        {value}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-secondary">
        <div
          className="stat-bar-fill h-full rounded-full"
          style={
            {
              "--stat-percent": `${percent}%`,
              background:
                "linear-gradient(90deg, var(--type-color), color-mix(in srgb, var(--type-color) 55%, white))",
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}
