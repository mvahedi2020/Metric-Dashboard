"use client";

import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50 font-sans">
      <div className="flex flex-col items-center text-center p-8 border border-rose-500/20 rounded-3xl bg-zinc-900/50 backdrop-blur-md shadow-2xl">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-500/20 mb-6">
          <AlertOctagon className="h-8 w-8 text-white opacity-90" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong!</h2>
        <p className="text-zinc-400 mb-8 max-w-sm text-sm">
          A critical error occurred while rendering the dashboard. Our engineering team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-rose-500 text-white px-6 py-2.5 text-sm font-semibold hover:bg-rose-600 transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
