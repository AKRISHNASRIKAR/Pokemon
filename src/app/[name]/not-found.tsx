"use client";

import { usePathname } from "next/navigation";
import { SearchX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { capitalize } from "@/lib/utils";

export default function PokemonNotFound() {
  const pathname = usePathname();
  const attempted = decodeURIComponent(pathname.replace(/^\/+/, ""));

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-surface-secondary text-muted-foreground">
        <SearchX className="size-10" aria-hidden="true" />
      </div>

      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Pokémon not found
      </h1>

      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        {attempted ? (
          <>
            We couldn&apos;t find{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{capitalize(attempted)}&rdquo;
            </span>{" "}
            in the Pokédex.
          </>
        ) : (
          "We couldn't find that Pokémon in the Pokédex."
        )}{" "}
        Please check your spelling and try again.
      </p>

      <BackLink />
    </Container>
  );
}
