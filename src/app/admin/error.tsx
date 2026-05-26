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
    console.error("[Admin Error Boundary]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 text-center bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 m-4">
      <h2 className="text-2xl font-bold tracking-tight text-red-600">
        Admin Area Error
      </h2>
      <p className="text-muted-foreground max-w-md">
        An error occurred in the admin dashboard. We have logged this issue.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 rounded-md hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
