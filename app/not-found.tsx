import Link from "next/link";

export default function NotFound() {
  return (
    <div className="blueprint-grid mx-auto max-w-6xl px-5 sm:px-8">
      <div className="py-24 sm:py-32">
        <p className="annotation text-signal">Error 404 — node not on this map</p>
        <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-paper sm:text-6xl">
          Uncharted coordinates.
        </h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-paper-dim">
          The page you asked for isn&apos;t part of this atlas. It may have been moved, renamed,
          or never surveyed.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="border border-signal/70 px-5 py-3 font-mono text-xs tracking-[0.12em] text-signal uppercase transition-colors hover:bg-signal hover:text-graphite-950"
          >
            ← Back to the atlas
          </Link>
          <Link
            href="/projects"
            className="border border-line px-5 py-3 font-mono text-xs tracking-[0.12em] text-paper uppercase transition-colors hover:border-line-bright"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}
