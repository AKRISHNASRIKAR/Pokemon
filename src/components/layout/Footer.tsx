import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex justify-center py-8 text-center text-sm text-muted">
        <p>
          Powered by{" "}
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
