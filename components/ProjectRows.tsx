import Link from "next/link";
import type { Project } from "@/data/projects";
import Reveal from "./Reveal";

/**
 * Editorial project rows — the conventional, always-available way to
 * browse the work (the atlas is an alternative view of the same list).
 */
export default function ProjectRows({ items }: { items: Project[] }) {
  return (
    <div className="border-t border-line">
      {items.map((project, i) => (
        <Reveal as="article" key={project.slug} delay={Math.min(i * 60, 240)}>
          <div className="group relative grid gap-4 border-b border-line py-7 transition-colors duration-300 hover:bg-graphite-900/70 sm:grid-cols-[64px_1fr] sm:gap-6 lg:grid-cols-[64px_1.2fr_1fr]">
            <div className="flex items-start justify-between sm:block">
              <span className="font-mono text-sm text-blueprint">{project.index}</span>
              <span className="font-mono text-[11px] tracking-wide text-faint uppercase sm:mt-2 sm:block">
                {project.period}
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-[26px] leading-tight font-medium tracking-tight text-paper sm:text-3xl">
                <Link
                  href={`/projects/${project.slug}`}
                  className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-white"
                >
                  {project.name}
                </Link>
              </h3>
              <p className="annotation mt-2 text-faint">{project.kind}</p>
              <ul className="relative z-10 mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {project.stack.slice(0, 5).map((tech) => (
                  <li
                    key={tech}
                    className="border border-line px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-paper-dim"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-4 lg:pl-4">
              <p className="max-w-[52ch] flex-1 text-sm leading-relaxed text-paper-dim">
                {project.summary}
              </p>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 font-mono text-lg text-blueprint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal"
              >
                →
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
