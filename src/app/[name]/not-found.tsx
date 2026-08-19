import { Container } from "@/components/layout/Container";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";

export default function PokemonNotFound() {
  return (
    <Container className="flex items-center justify-center py-24">
      <div className="w-full max-w-md">
        <ErrorState
          title="Pokémon not found"
          message="We couldn't find a Pokémon with that name. Check the spelling and try again."
          action={<Button href="/">Back to explorer</Button>}
        />
      </div>
    </Container>
  );
}
