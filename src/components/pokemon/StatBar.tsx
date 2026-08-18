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
      <span className="w-8 shrink-0 text-right text-sm font-medium text-foreground">
        {value}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-secondary">
        <div
          className="h-full rounded-full"
          style={{ width: `${percent}%`, background: "var(--type-color)" }}
        />
      </div>
    </div>
  );
}
