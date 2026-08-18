import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the Pokémon data.",
  action,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-16 text-center shadow-sm"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-error/10 text-error">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted">{message}</p>
      </div>
      {action}
    </div>
  );
}
