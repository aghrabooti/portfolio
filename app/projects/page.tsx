import type { Metadata } from "next";
import Link from "next/link";
import ProjectRows from "@/components/ProjectRows";
import Reveal from "@/components/Reveal";
import { alsoOnGithub, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All eight documented systems by Parham Afzal — web platforms, Telegram bots, a browser extension, network tooling, and one ML study. Each links to its public repository.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <header className="pt-10 pb-10 sm:pt-14">
        <Reveal>
          <p className="annotation text-signal">Index — all mapped systems</p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-paper sm:text-5xl">
            Projects
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-paper-dim">
            The complete list behind the{" "}
            <Link href="/#atlas" className="text-blueprint underline-offset-4 hover:underline">
              Systems Atlas
            </Link>
            , ordered roughly by scale. Each entry opens a case study — architecture, decisions,
            hard problems, verifiable evidence, stated limitations — and links to its public
            repository. Forks of other people&apos;s work are not listed here; they live on the
            GitHub profile, labelled as forks.
          </p>
        </Reveal>
      </header>

      <ProjectRows items={projects} />

      <Reveal className="mt-14 mb-16">
        <div className="border border-line bg-graphite-900 p-6">
          <p className="annotation text-blueprint">Also on the profile — earlier &amp; smaller</p>
          <ul className="mt-4 space-y-3.5">
            {alsoOnGithub.map((item) => (
              <li key={item.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[12.5px] tracking-wide text-paper underline-offset-4 hover:text-blueprint hover:underline"
                >
                  {item.name} <span aria-hidden="true">↗</span>
                </a>
                <span className="text-sm text-paper-dim">{item.detail}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-faint">
            Kept public on purpose: the path from a first HTML exercise to production systems is
            part of the record.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
