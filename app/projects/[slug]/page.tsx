import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FlowDiagram from "@/components/FlowDiagram";
import GitHubMark from "@/components/GitHubMark";
import Reveal from "@/components/Reveal";
import { connectionsFor, getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      type: "article",
      title: `${project.name} — Parham Afzal`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

function SubHeading({ no, children }: { no: string; children: string }) {
  return (
    <h2 className="flex items-baseline gap-3 font-display text-2xl font-medium tracking-tight text-paper sm:text-[28px]">
      <span className="font-mono text-sm text-blueprint">{no}</span>
      {children}
    </h2>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const connections = connectionsFor(project.slug);

  return (
    <article className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* ---------- Header ---------- */}
      <header className="border-b border-line pt-10 pb-10 sm:pt-14">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <p className="annotation text-faint">
              <Link href="/#atlas" className="transition-colors hover:text-blueprint">
                Systems Atlas
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href="/projects" className="transition-colors hover:text-blueprint">
                Projects
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-signal">
                Node {project.index}
              </span>
            </p>
          </nav>
          <h1 className="mt-6 max-w-[16ch] font-display text-4xl leading-[1.05] font-medium tracking-tight text-paper sm:text-6xl">
            {project.name}
          </h1>
          <p className="annotation mt-4 text-blueprint">
            {project.kind} · {project.period}
          </p>
          <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-paper-dim sm:text-lg">
            {project.lede}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-graphite-900 px-4 py-3.5">
              <dt className="annotation text-faint">Status</dt>
              <dd className="mt-1.5 text-sm text-paper">{project.status}</dd>
            </div>
            <div className="bg-graphite-900 px-4 py-3.5">
              <dt className="annotation text-faint">Repository</dt>
              <dd className="mt-1.5">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm break-all text-blueprint underline-offset-4 hover:underline"
                >
                  <GitHubMark className="h-3.5 w-3.5 shrink-0" />
                  {project.repoName} <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
            <div className="bg-graphite-900 px-4 py-3.5">
              <dt className="annotation text-faint">Live</dt>
              <dd className="mt-1.5 text-sm text-paper">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blueprint underline-offset-4 hover:underline"
                  >
                    {project.demoLabel ?? "Live deployment"} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="text-paper-dim">Runs as a service/bot — see the repository</span>
                )}
              </dd>
            </div>
            <div className="bg-graphite-900 px-4 py-3.5">
              <dt className="annotation text-faint">Stack</dt>
              <dd className="mt-1.5">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-line px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-paper-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <p className="mt-4 flex gap-2 text-sm text-paper-dim">
            <span className="annotation mt-0.5 shrink-0 text-signal">My role</span>
            {project.role}
          </p>
        </Reveal>
      </header>

      {/* ---------- 01 Problem ---------- */}
      <div className="grid gap-10 border-b border-line py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
        <Reveal>
          <SubHeading no="01">The problem</SubHeading>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-[66ch] text-[15px] leading-relaxed text-paper-dim">{project.problem}</p>
        </Reveal>
      </div>

      {/* ---------- 02 Architecture ---------- */}
      <div className="grid gap-10 border-b border-line py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
        <Reveal>
          <SubHeading no="02">Architecture</SubHeading>
        </Reveal>
        <div className="min-w-0">
          {project.diagram && (
            <div className="mb-10">
              <FlowDiagram diagram={project.diagram} figLabel={`FIG. ${project.index}.A`} />
            </div>
          )}
          <div className="space-y-7">
            {project.architecture.map((part, i) => (
              <Reveal key={part.name} delay={Math.min(i * 50, 200)}>
                <h3 className="font-mono text-[13px] font-medium tracking-[0.06em] text-paper">
                  <span className="mr-2 text-blueprint">{String(i + 1).padStart(2, "0")}</span>
                  {part.name}
                </h3>
                <p className="mt-2 max-w-[66ch] text-[15px] leading-relaxed text-paper-dim">
                  {part.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 03 Decisions ---------- */}
      <div className="grid gap-10 border-b border-line py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
        <Reveal>
          <SubHeading no="03">Decisions &amp; trade-offs</SubHeading>
        </Reveal>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {project.decisions.map((decision, i) => (
            <Reveal key={decision.title} as="article" delay={Math.min(i * 60, 180)} className="bg-graphite-900">
              <div className="p-5">
                <h3 className="font-display text-lg leading-snug font-medium text-paper">
                  {decision.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-paper-dim">{decision.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------- 04 Hard problems ---------- */}
      <div className="grid gap-10 border-b border-line py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
        <Reveal>
          <SubHeading no="04">Hard problems</SubHeading>
        </Reveal>
        <div className="space-y-8">
          {project.hardProblems.map((problem, i) => (
            <Reveal key={problem.title} delay={Math.min(i * 60, 180)}>
              <div className="border-l-2 border-line-bright pl-5">
                <h3 className="text-[15px] font-semibold text-paper">{problem.title}</h3>
                <p className="mt-2 max-w-[66ch] text-[15px] leading-relaxed text-paper-dim">
                  {problem.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------- 05 Evidence + 06 Limitations ---------- */}
      <div className="grid gap-10 border-b border-line py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
        <Reveal>
          <SubHeading no="05">Evidence &amp; limits</SubHeading>
          <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-paper-dim">
            What the repository itself can prove — and what this page declines to claim.
          </p>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="border border-line bg-graphite-900">
              <p className="annotation border-b border-line px-4 py-2.5 text-blueprint">
                Specification — counted in the repo
              </p>
              <dl className="divide-y divide-line px-4">
                {project.evidence.map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[13px] text-faint">{item.label}</dt>
                    <dd className="text-right font-mono text-[12.5px] text-paper">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="border border-signal/40 bg-signal/[0.04]">
              <p className="annotation border-b border-signal/25 px-4 py-2.5 text-signal">
                Limitations — stated plainly
              </p>
              <ul className="space-y-3 px-4 py-4">
                {project.limitations.map((limit) => (
                  <li key={limit} className="flex gap-2.5 text-sm leading-relaxed text-paper-dim">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-signal">—</span>
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- 07 Connections ---------- */}
      <div className="grid gap-10 py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
        <Reveal>
          <SubHeading no="06">In the atlas</SubHeading>
          <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-paper-dim">
            Where this node sits, and what each edge means.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="divide-y divide-line border-y border-line">
            {connections.map(({ edge, project: other, hub }) => (
              <li key={edge.a + edge.b} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3.5">
                {hub ? (
                  <span className="font-mono text-[12.5px] tracking-wide text-blueprint">
                    ◆ {hub.label}
                    <span className="text-faint"> ({hub.sub})</span>
                  </span>
                ) : other ? (
                  <Link
                    href={`/projects/${other.slug}`}
                    className="font-mono text-[12.5px] tracking-wide text-signal underline-offset-4 hover:underline"
                  >
                    {other.index} {other.name} →
                  </Link>
                ) : null}
                <span className="text-sm text-paper-dim">{edge.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-signal/70 px-5 py-3 font-mono text-xs tracking-[0.12em] text-signal uppercase transition-colors hover:bg-signal hover:text-graphite-950"
            >
              <GitHubMark className="h-3.5 w-3.5" /> Read the code <span aria-hidden="true">↗</span>
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-line px-5 py-3 font-mono text-xs tracking-[0.12em] text-paper uppercase transition-colors hover:border-line-bright"
              >
                Open live <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </Reveal>
      </div>

      {/* ---------- Prev / next ---------- */}
      <nav aria-label="More case studies" className="grid border-t border-line sm:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="group border-b border-line py-6 pr-4 transition-colors hover:bg-graphite-900/70 sm:border-r sm:border-b-0 sm:pr-8"
        >
          <span className="annotation text-faint">← Previous node {prev.index}</span>
          <span className="mt-2 block font-display text-2xl font-medium tracking-tight text-paper group-hover:text-white">
            {prev.name}
          </span>
          <span className="mt-1 block text-sm text-paper-dim">{prev.kind}</span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="group py-6 text-right transition-colors hover:bg-graphite-900/70 sm:pl-8"
        >
          <span className="annotation text-faint">Next node {next.index} →</span>
          <span className="mt-2 block font-display text-2xl font-medium tracking-tight text-paper group-hover:text-white">
            {next.name}
          </span>
          <span className="mt-1 block text-sm text-paper-dim">{next.kind}</span>
        </Link>
      </nav>
    </article>
  );
}
