"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex items-center justify-center py-24">
      <div className="w-full max-w-md">
        <ErrorState
          action={<Button onClick={() => reset()}>Try again</Button>}
        />
      </div>
    </Container>
  );
}
