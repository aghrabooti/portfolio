import type { Diagram } from "@/data/projects";
import Reveal from "./Reveal";

/**
 * Renders a columnar architecture diagram from data: real text (not an
 * image), so it stays accessible and wraps to a vertical flow on mobile.
 */
export default function FlowDiagram({ diagram, figLabel }: { diagram: Diagram; figLabel: string }) {
  const cols = diagram.columns.length;
  return (
    <Reveal>
      <figure className="border border-line bg-graphite-900">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="annotation text-blueprint">{figLabel}</span>
          <span className="annotation text-faint">System schematic</span>
        </div>

        <div className="blueprint-grid-fine p-4 sm:p-6">
          <div>
            <ol
              className={`grid gap-3 md:items-stretch ${
                cols === 5
                  ? "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]"
                  : "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]"
              }`}
            >
              {diagram.columns.map((col, i) => (
                <li key={col.heading} className="contents">
                  <div className="flex min-w-0 flex-col">
                    <p className="annotation mb-2 text-faint">{col.heading}</p>
                    <div className="flex flex-1 flex-col gap-2">
                      {col.boxes.map((box) => (
                        <div
                          key={box.title}
                          className={`flex-1 border px-3 py-2.5 ${
                            box.accent
                              ? "border-signal/60 bg-signal/[0.06]"
                              : "border-line-bright bg-graphite-850"
                          }`}
                        >
                          <p className="font-mono text-[12.5px] leading-snug font-medium text-paper">
                            {box.title}
                          </p>
                          {box.detail && (
                            <p className="mt-1 text-[11.5px] leading-snug text-paper-dim">{box.detail}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {i < cols - 1 && (
                    <div
                      className="flex items-center justify-center gap-1 py-0.5 md:flex-col md:py-0"
                      aria-hidden="true"
                    >
                      <span className="hidden font-mono text-[9px] tracking-wide text-faint uppercase md:block md:max-w-[9ch] md:text-center md:leading-tight">
                        {diagram.edgeLabels[i]}
                      </span>
                      <span className="text-blueprint md:rotate-0">
                        <span className="inline-block rotate-90 md:rotate-0">⟶</span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <figcaption className="border-t border-line px-4 py-3 text-[13px] leading-relaxed text-paper-dim">
          {diagram.caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
