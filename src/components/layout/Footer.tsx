import { Container } from "@/components/layout/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-2 py-8 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>&copy; {year} Pokémon Explorer. Not affiliated with Nintendo, Game Freak, or The Pokémon Company.</p>
        <p>
          Data from{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            PokéAPI
          </a>
        </p>
      </Container>
    </footer>
  );
}
