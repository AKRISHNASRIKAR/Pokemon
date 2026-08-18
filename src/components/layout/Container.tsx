import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Standard responsive max-width and horizontal padding for page content. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn("container", className)}>{children}</div>;
}
