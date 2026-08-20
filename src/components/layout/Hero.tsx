import { Swords } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="flex flex-col gap-3 pt-4 pb-10 md:pt-6 md:pb-16">
      <span className="text-sm font-medium tracking-wide text-muted uppercase">
        Powered by PokéAPI
      </span>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        Explore the world of Pokémon
      </h1>
      <p className="max-w-xl text-base text-muted md:text-lg">
        Browse every Pokémon with clean, detailed stats, types, and artwork
        in one fast, modern explorer.
      </p>
      <div className="mt-2">
        <Button href="/compare" variant="gradient" className="gap-2">
          <Swords className="size-4" aria-hidden="true" />
          Compare two Pokémon
        </Button>
      </div>
    </div>
  );
}
