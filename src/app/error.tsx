"use client";

import { useEffect } from "react";


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div data-component="error" className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-red-600">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-md">
        An unexpected error occurred. We have logged this issue and will investigate it.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
