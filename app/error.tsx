"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="py-24 sm:py-32">
        <p className="annotation text-signal">Fault — rendering interrupted</p>
        <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-paper sm:text-6xl">
          Something failed on this plate.
        </h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-paper-dim">
          An unexpected error interrupted this page. The rest of the atlas is unaffected.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="border border-signal/70 px-5 py-3 font-mono text-xs tracking-[0.12em] text-signal uppercase transition-colors hover:bg-signal hover:text-graphite-950"
          >
            Try again
          </button>
          <Link
            href="/"
            className="border border-line px-5 py-3 font-mono text-xs tracking-[0.12em] text-paper uppercase transition-colors hover:border-line-bright"
          >
            ← Home
          </Link>
        </div>
      </div>
    </div>
  );
}
