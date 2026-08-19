"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/ui/BackLink";
import { capitalize } from "@/lib/utils";

export default function PokemonNotFound() {
  const pathname = usePathname();
  const attempted = decodeURIComponent(pathname.replace(/^\/+/, ""));

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--type-dragon) 22%, transparent), transparent 70%), radial-gradient(ellipse 45% 40% at 20% 15%, color-mix(in srgb, var(--type-psychic) 16%, transparent), transparent 70%), radial-gradient(ellipse 45% 40% at 80% 15%, color-mix(in srgb, var(--type-water) 16%, transparent), transparent 70%)",
        }}
      />

      <Container className="flex min-h-[calc(100dvh-16rem)] items-center justify-center py-12 md:py-24">
        <div className="dot-grid relative flex w-full max-w-md flex-col items-center gap-6 overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-surface)] px-8 py-14 text-center shadow-lg">
          <div
            aria-hidden="true"
            className="absolute inset-10 rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--type-normal)" }}
          />

          <span className="relative text-sm font-medium text-[var(--card-muted)]">
            #???
          </span>

          <Image
            src="/pokemon-logo.png"
            alt="Pokémon"
            width={220}
            height={81}
            quality={65}
            className="relative w-40 opacity-90 drop-shadow-xl sm:w-48"
          />

          <div className="relative space-y-2">
            <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
              Wild card fled before you could catch it!
            </h1>
            <p className="text-sm text-[var(--card-muted)]">
              {attempted ? (
                <>
                  We couldn&apos;t find{" "}
                  <span className="font-medium text-[var(--card-foreground)]">
                    &ldquo;{capitalize(attempted)}&rdquo;
                  </span>{" "}
                  in our Pokédex.
                </>
              ) : (
                "We couldn't find that Pokémon in our Pokédex."
              )}{" "}
              Check the spelling, or head back to the tall grass.
            </p>
          </div>

          <BackLink className="relative" />
        </div>
      </Container>
    </div>
  );
}
