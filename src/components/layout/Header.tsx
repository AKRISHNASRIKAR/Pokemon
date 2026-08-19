import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <Container className="flex h-24 items-center justify-between rounded-2xl border border-border bg-surface/90 px-4 shadow-sm backdrop-blur-md sm:px-6">
        <div className="flex flex-1 items-center">
          <span className="sr-only">Pokémon Explorer</span>
        </div>

        <Link
          href="/"
          className="transition-fast flex shrink-0 items-center justify-center hover:opacity-80"
          aria-label="Pokémon Explorer home"
        >
          <Image
            src="/pokemon-logo.png"
            alt="Pokémon"
            width={174}
            height={64}
            loading="eager"
            fetchPriority="high"
            className="h-11 w-auto drop-shadow-sm sm:h-12"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
