import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary:
    "bg-surface-secondary text-foreground border border-border hover:border-border-strong",
  ghost: "bg-transparent text-foreground hover:bg-surface-secondary",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "transition-fast inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    />
  );
}
