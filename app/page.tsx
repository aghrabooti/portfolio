import Link from "next/link";
import GitHubMark from "@/components/GitHubMark";
import HeroAtlas from "@/components/HeroAtlas";
import ProjectRows from "@/components/ProjectRows";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SystemsAtlas from "@/components/SystemsAtlas";
import { ScrollBurnText } from "@/components/ui/scroll-burn-text";
import { notes, projects, skillLines } from "@/data/projects";
import { site } from "@/data/site";

const featured = projects.filter((p) => p.featured);

const heroStats = [
  { value: "08", label: "Original systems mapped & documented", tag: "SYS.MAP" },
  { value: "300+", label: "Automated tests across these repositories", tag: "CI.SUITE" },
  { value: "04", label: "Telegram bots — one of them built twice", tag: "PROD.BOT" },
  { value: "fa + en", label: "Interfaces at home in both directions", tag: "BIDI.RTL" },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <div className="blueprint-grid relative overflow-hidden">
        {/* نور محیطی ملایم در پس‌زمینه برای ایجاد عمق سه‌بعدی */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[520px] w-[650px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-signal/15 via-blueprint/10 to-transparent blur-[120px]" 
        />

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* هدر بالایی با نشانگر وضعیت زنده */}
          <div className="flex items-center justify-between border-b border-line/60 pt-6 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal"></span>
              </span>
              <p className="font-mono text-xs tracking-wider text-blueprint uppercase">
                Systems Atlas · v2.4 Active
              </p>
            </div>
            <p className="annotation hidden font-mono text-xs text-faint sm:block hover:text-paper transition-colors">
              <a href={site.githubUrl} target="_blank" rel="noreferrer">
                SRC · github.com/{site.handle} ↗
              </a>
            </p>
          </div>

          <div className="grid items-center gap-10 pt-12 pb-14 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-graphite-900/80 px-3.5 py-1 text-xs text-paper-dim backdrop-blur-md">
                  <span className="font-mono text-signal">{site.role}</span>
                  <span className="text-line">/</span>
                  <span className="font-mono">{site.name}</span>
                </div>

                <h1 className="mt-5 max-w-[13ch] font-display text-[46px] leading-[1.02] font-medium tracking-tight text-paper sm:text-6xl lg:text-7xl">
                  Software, drawn as a{" "}
                  <em className="relative inline-block text-blueprint italic">
                    system
                    <svg
                      className="absolute -bottom-2 left-0 w-full drop-shadow-[0_0_8px_var(--color-signal)]"
                      viewBox="0 0 200 9"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M2 7 C 60 2, 140 2, 198 6"
                        fill="none"
                        stroke="var(--color-signal)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        pathLength={1}
                        className="hero-underline"
                      />
                    </svg>
                  </em>
                  .
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-7 max-w-[54ch] text-base leading-relaxed text-paper-dim sm:text-lg">
                  I build web platforms, production Telegram bots, and browser tools — most of
                  them for Persian-speaking users, where right-to-left layout, the Jalali
                  calendar, and local payment rails are core engineering problems, not
                  localisation afterthoughts. This page draws that work as a map; the plate here
                  is the map, live. Pick a node to jump into it.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-9 flex flex-wrap gap-3.5">
                  <a
                    href="#atlas"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-md bg-signal px-5 py-3 font-mono text-xs font-semibold tracking-[0.12em] text-graphite-950 uppercase shadow-[0_0_20px_rgba(var(--color-signal-rgb),0.35)] transition-all hover:shadow-[0_0_28px_rgba(var(--color-signal-rgb),0.55)] hover:brightness-110"
                  >
                    Explore the atlas ↓
                  </a>
                  <a
                    href="#projects"
                    className="flex items-center rounded-md border border-line bg-graphite-900/60 px-5 py-3 font-mono text-xs tracking-[0.12em] text-paper uppercase backdrop-blur-md transition-all hover:border-blueprint/60 hover:bg-graphite-800/80 hover:text-blueprint"
                  >
                    Selected projects
                  </a>
                  <a
                    href={site.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-md border border-line bg-graphite-900/40 px-5 py-3 font-mono text-xs tracking-[0.12em] text-paper-dim uppercase backdrop-blur-md transition-all hover:border-line-bright hover:text-paper"
                  >
                    <GitHubMark className="h-3.5 w-3.5" /> GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* کارت اطلس هیرو با پس‌زمینه شیشه‌ای و بردر های‌لایت */}
            <Reveal delay={180} className="min-w-0">
              <div className="relative rounded-xl border border-line/80 bg-graphite-950/60 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-white/5 transition-all hover:border-blueprint/40">
                <HeroAtlas />
              </div>
            </Reveal>
          </div>

          {/* باکس‌های آمار با استایل مانیتورینگ/تله‌متری */}
          <Reveal delay={300}>
            <dl className="grid grid-cols-2 divide-y divide-line/60 rounded-xl border border-line/80 bg-graphite-950/40 backdrop-blur-md sm:divide-y-0 sm:divide-x lg:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative flex flex-col p-5 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-faint tracking-wider uppercase group-hover:text-blueprint transition-colors">
                      {stat.tag}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-line group-hover:bg-signal transition-colors" />
                  </div>
                  <dd className="mt-2 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-xs leading-snug text-paper-dim/80">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* ---------------- Systems Atlas ---------------- */}
      <section id="atlas" aria-labelledby="atlas-heading" className="scroll-mt-20 border-t border-line/80 relative">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[11px] text-signal uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  FIG. 01 — Interactive Topography
                </div>
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
          
          <div className="rounded-xl border border-line/80 bg-graphite-950/50 p-2 shadow-2xl backdrop-blur-md">
            <SystemsAtlas />
          </div>
        </div>
      </section>

      {/* ---------------- Selected projects ---------------- */}
      <Section
        id="projects"
        fig="FIG. 02 — Case studies"
        title="Selected projects"
        caption="The strongest systems, each with a full case study — architecture, decisions, hard problems, and the evidence, linked to source."
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

      {/* ---------------- Interlude — the toolbox ---------------- */}
      <section aria-label="My skills" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 pt-16 text-center sm:px-8">
          <p className="annotation text-signal">Interlude — the toolbox</p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-paper sm:text-5xl">
            My skills
          </h2>
          <p className="mt-3 text-sm text-paper-dim">
            Five layers — each proven by a system on this page.
          </p>
        </div>
        <ScrollBurnText sections={skillLines} runway="90vh" hint="scroll" />
      </section>

      {/* ---------------- Engineering notes ---------------- */}
      <Section
        id="notes"
        fig="FIG. 03 — Field notes"
        title="Engineering notes"
        caption="Short observations extracted from the code above — derived from the repositories, not a pretend back-catalogue of articles."
      >
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {notes.map((note, i) => (
            <Reveal key={note.id} as="article" delay={Math.min(i * 80, 240)} className="bg-graphite-900 transition-colors hover:bg-graphite-850">
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
            <div className="rounded-xl border border-line bg-graphite-900/90 overflow-hidden shadow-xl">
              <div className="border-b border-line px-5 py-3 bg-graphite-950/60">
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
              <div className="border-t border-line px-5 py-4 bg-graphite-950/40">
                <p className="text-[13px] leading-relaxed text-paper-dim">
                  Hiring, or have a project in this territory — a web platform, a bot that has to
                  behave like operations software, a Persian-language product? The fastest route
                  is a message through GitHub.
                </p>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-md border border-signal/70 bg-signal/10 px-5 py-3 font-mono text-xs tracking-[0.12em] text-signal uppercase transition-all hover:bg-signal hover:text-graphite-950"
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