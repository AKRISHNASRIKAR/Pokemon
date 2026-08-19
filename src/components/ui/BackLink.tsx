"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BackLinkProps {
  variant?: "primary" | "secondary" | "ghost" | "gradient" | "glass";
  className?: string;
}

/** Navigates back in history for scroll restoration. */
export function BackLink({ variant = "glass", className }: BackLinkProps) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <Button onClick={goBack} variant={variant} className={className}>
      <ArrowLeft className="size-4" aria-hidden="true" />
      Back to explorer
    </Button>
  );
}
