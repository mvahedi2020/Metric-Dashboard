import Link from "next/link";
import { Activity } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50 font-sans">
      <div className="flex flex-col items-center text-center p-8">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/20 mb-8">
          <Activity className="h-8 w-8 text-white opacity-80" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">404 - Metric Not Found</h1>
        <p className="text-zinc-400 mb-8 max-w-md">
          We couldn&apos;t find the metric page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link 
          href="/"
          className="rounded-full bg-white text-zinc-950 px-6 py-3 text-sm font-semibold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
        >
          Return to Command Center
        </Link>
      </div>
    </div>
  );
}
