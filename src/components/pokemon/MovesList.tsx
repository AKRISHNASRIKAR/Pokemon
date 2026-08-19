"use client";

import { useState } from "react";
import { formatSlug } from "@/lib/utils";

const PREVIEW_COUNT = 16;

interface MovesListProps {
  moves: string[];
}

export function MovesList({ moves }: MovesListProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleMoves = showAll ? moves : moves.slice(0, PREVIEW_COUNT);
  const hiddenCount = moves.length - PREVIEW_COUNT;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {visibleMoves.map((move) => (
          <span
            key={move}
            className="rounded-full bg-surface-secondary px-3 py-1.5 text-sm font-medium text-foreground"
          >
            {formatSlug(move)}
          </span>
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="transition-fast w-fit text-sm font-medium text-[var(--type-color)] hover:underline"
        >
          {showAll ? "Show less" : `Show all ${moves.length} moves`}
        </button>
      )}
    </div>
  );
}
