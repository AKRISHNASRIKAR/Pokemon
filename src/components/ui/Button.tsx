import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gradient" | "glass";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Render as link. */
  href?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary:
    "bg-surface-secondary text-foreground border border-border hover:border-border-strong",
  ghost: "bg-transparent text-foreground hover:bg-surface-secondary",
  gradient: "btn-gradient text-white hover:brightness-110 active:brightness-95",
  glass:
    "bg-surface/60 backdrop-blur-md border border-border/50 text-foreground hover:bg-surface-secondary/80 shadow-[0_4px_30px_rgba(0,0,0,0.05)]",
};

const BASE_CLASSES =
  "transition-fast inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}
