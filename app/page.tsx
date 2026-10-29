import Link from "next/link";
import GitHubMark from "@/components/GitHubMark";
import ProjectRows from "@/components/ProjectRows";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SystemsAtlas from "@/components/SystemsAtlas";
import { notes, projects } from "@/data/projects";
import { site } from "@/data/site";

const featured = projects.filter((p) => p.featured);

const heroStats = [
  { value: "08", label: "Original systems mapped & documented" },
  { value: "300+", label: "Automated tests across these repositories" },
  { value: "04", label: "Telegram bots — one of them built twice" },
  { value: "fa + en", label: "Interfaces at home in both directions" },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <div className="blueprint-grid relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-center justify-between pt-6">
            <p className="annotation text-blueprint">Portfolio — the architecture of my work</p>
            <p className="annotation hidden text-faint sm:block">
              SRC · github.com/{site.handle}
            </p>
          </div>

          <div className="pt-14 pb-10 sm:pt-20">
            <Reveal>
              <p className="font-mono text-sm text-paper-dim">
                {site.name} — {site.role}
              </p>
              <h1 className="mt-5 max-w-[13ch] font-display text-[44px] leading-[1.02] font-medium tracking-tight text-paper sm:text-6xl lg:text-7xl">
                Software, drawn as a <em className="text-blueprint italic">system</em>.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-paper-dim sm:text-lg">
                I build web platforms, production Telegram bots, and browser tools — most of them
                for Persian-speaking users, where right-to-left layout, the Jalali calendar, and
                local payment rails are core engineering problems, not localisation afterthoughts.
                Below is a map of the work and of how the pieces connect. Every claim on this site
                links back to a public repository.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#atlas"
                  className="border border-signal/70 px-5 py-3 font-mono text-xs tracking-[0.12em] text-signal uppercase transition-colors hover:bg-signal hover:text-graphite-950"
                >
                  Explore the atlas ↓
                </a>
                <a
                  href="#projects"
                  className="border border-line px-5 py-3 font-mono text-xs tracking-[0.12em] text-paper uppercase transition-colors hover:border-line-bright"
                >
                  Selected projects
                </a>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-line px-5 py-3 font-mono text-xs tracking-[0.12em] text-paper-dim uppercase transition-colors hover:border-line-bright hover:text-paper"
                >
                  <GitHubMark className="h-3.5 w-3.5" /> GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col border-r border-line px-4 py-5 last:border-r-0 sm:px-5 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0"
                >
                  <dt className="order-2 mt-1.5 block text-[11px] leading-snug text-faint">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-display text-3xl font-medium text-paper sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* ---------------- Systems Atlas ---------------- */}
      <section id="atlas" aria-labelledby="atlas-heading" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="annotation text-signal">FIG. 01 — Interactive</p>
                <h2
                  id="atlas-heading"
                  className="mt-3 font-display text-4xl font-medium tracking-tight text-paper sm:text-5xl"
                >
                  The Systems Atlas
                </h2>
              </div>
              <p className="max-w-[40ch] text-sm leading-relaxed text-paper-dim">
                Not eight unrelated side projects — a small ecosystem with shared foundations.
                The map makes the foundations visible.
              </p>
            </div>
          </Reveal>
          <SystemsAtlas />
        </div>
      </section>

      {/* ---------------- Selected projects ---------------- */}
      <Section
        id="projects"
        fig="FIG. 02 — Case studies"
        title="Selected projects"
        caption="The six strongest systems, each with a full case study — architecture, decisions, hard problems, and the evidence, linked to source."
      >
        <ProjectRows items={featured} />
        <Reveal className="mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-blueprint uppercase underline-offset-4 hover:text-paper hover:underline"
          >
            All {projects.length} projects — including the small, finished ones →
          </Link>
        </Reveal>
      </Section>

      {/* ---------------- Engineering notes ---------------- */}
      <Section
        id="notes"
        fig="FIG. 03 — Field notes"
        title="Engineering notes"
        caption="Short observations extracted from the code above — derived from the repositories, not a pretend back-catalogue of articles."
      >
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {notes.map((note, i) => (
            <Reveal key={note.id} as="article" delay={Math.min(i * 80, 240)} className="bg-graphite-900">
              <div className="flex h-full flex-col p-6">
                <p className="annotation text-blueprint">{note.id}</p>
                <h3 className="mt-3 font-display text-[22px] leading-snug font-medium tracking-tight text-paper">
                  {note.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-paper-dim">{note.body}</p>
                <p className="mt-5 border-t border-line pt-3 font-mono text-[11px] leading-relaxed text-faint">
                  {note.source}{" "}
                  <Link
                    href={`/projects/${note.sourceSlug}`}
                    className="text-blueprint underline-offset-4 hover:text-paper hover:underline"
                  >
                    Case study →
                  </Link>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- About & contact ---------------- */}
      <Section
        id="about"
        fig="FIG. 04 — Operator"
        title="About"
        caption="The short, verifiable version."
      >
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal>
            <div className="max-w-[62ch] space-y-4 text-[15px] leading-relaxed text-paper-dim">
              <p>
                I&apos;m <span className="text-paper">{site.name}</span>, a software developer. On
                GitHub since {site.githubSince} as{" "}
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blueprint underline-offset-4 hover:underline"
                >
                  @{site.handle}
                </a>
                , where everything referenced here is public. The recent work concentrates in
                three areas: full-stack web platforms (Next.js/TypeScript — KooGYMaa is the large
                one), Telegram bots run as real operations tools for two academies, and
                Persian-language tooling, from the Azizi store to ParsiChin&apos;s RTL engine.
              </p>
              <p>
                A thread connects the map: most of these systems serve Persian-speaking users, so
                bidirectional text, Jalali dates, SMS one-time codes, and the ZarinPal payment
                rail show up as first-class design constraints. The other thread is a preference
                for evidence over assertion — layout audits in a real browser, proxies proven by
                live handshakes, and portfolios whose numbers can be re-counted in the repos they
                describe. This one included.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-line bg-graphite-900">
              <div className="border-b border-line px-5 py-3">
                <p className="annotation text-blueprint">Contact — spec sheet</p>
              </div>
              <dl className="divide-y divide-line px-5">
                <div className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="annotation text-faint">Name</dt>
                  <dd className="text-sm text-paper">{site.name}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="annotation text-faint">Practice</dt>
                  <dd className="text-right text-sm text-paper">Web platforms · Bots · Browser tools</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="annotation text-faint">GitHub</dt>
                  <dd>
                    <a
                      href={site.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-blueprint underline-offset-4 hover:underline"
                    >
                      <GitHubMark className="h-3.5 w-3.5" /> {site.handle} <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="annotation text-faint">Email</dt>
                  <dd className="text-sm text-paper">
                    {site.email ? (
                      <a href={`mailto:${site.email}`} className="text-blueprint underline-offset-4 hover:underline">
                        {site.email}
                      </a>
                    ) : (
                      <span className="text-paper-dim">Not published — GitHub is the front door</span>
                    )}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-line px-5 py-4">
                <p className="text-[13px] leading-relaxed text-paper-dim">
                  Hiring, or have a project in this territory — a web platform, a bot that has to
                  behave like operations software, a Persian-language product? The fastest route
                  is a message through GitHub.
                </p>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 border border-signal/70 px-5 py-3 font-mono text-xs tracking-[0.12em] text-signal uppercase transition-colors hover:bg-signal hover:text-graphite-950"
                >
                  <GitHubMark className="h-3.5 w-3.5" /> github.com/{site.handle} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
