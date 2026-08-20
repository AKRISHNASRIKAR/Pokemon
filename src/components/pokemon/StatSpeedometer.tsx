"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface StatSpeedometerProps {
  label: string;
  value: number;
  max?: number;
}

export function StatSpeedometer({
  label,
  value,
  max = 255,
}: StatSpeedometerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after mount
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = 40;
  const circumference = Math.PI * radius;
  const targetOffset = circumference - (percent / 100) * circumference;

  // Start fully empty, then transition to the target value
  const currentOffset = mounted ? targetOffset : circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="relative aspect-[2/1] w-full max-w-[120px]">
        <svg
          viewBox="0 0 100 50"
          className="h-full w-full overflow-visible drop-shadow-sm"
        >
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-surface-secondary"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            style={
              {
                stroke: "var(--type-color)",
                strokeDasharray: circumference,
                strokeDashoffset: currentOffset,
                transition:
                  "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
              } as CSSProperties
            }
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-1">
          <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
            {value}
          </span>
        </div>
      </div>
      <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
