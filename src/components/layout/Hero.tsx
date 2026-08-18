export function Hero() {
  return (
    <div className="flex flex-col gap-3 py-10 md:py-16">
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
    </div>
  );
}
