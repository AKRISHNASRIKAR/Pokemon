import { CircleDot } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          <CircleDot className="size-5" aria-hidden="true" />
          <span className="text-lg">Pokédex</span>
        </Link>

        {/* Reserved for future actions: favorites, theme toggle */}
        <div className="flex items-center gap-2" />
      </Container>
    </header>
  );
}
