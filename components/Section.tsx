import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * A ruled, annotated section — the site's basic compositional unit.
 * Left rail carries the figure number and a short technical caption,
 * like a plate in an engineering notebook.
 */
export default function Section({
  id,
  fig,
  title,
  caption,
  children,
}: {
  id?: string;
  fig: string;
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          <Reveal className="lg:pt-1">
            <p className="annotation text-signal">{fig}</p>
            <h2
              id={headingId}
              className="mt-3 font-display text-3xl leading-[1.08] font-medium tracking-tight text-paper sm:text-4xl"
            >
              {title}
            </h2>
            {caption && (
              <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-paper-dim">{caption}</p>
            )}
          </Reveal>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
