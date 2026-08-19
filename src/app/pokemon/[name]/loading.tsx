import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PokemonDetailLoading() {
  return (
    <Container className="flex flex-col gap-10 py-8 md:py-12">
      <Skeleton className="h-5 w-32" />

      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <Skeleton className="mx-auto aspect-square w-full max-w-sm rounded-3xl" />

        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
          <div className="grid max-w-sm grid-cols-2 gap-3">
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>

      <Skeleton className="h-40 rounded-2xl" />
    </Container>
  );
}
