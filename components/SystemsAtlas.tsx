"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { atlasEdges, connectionsFor, getProject, hubs, projects } from "@/data/projects";

const W = 1200;
const H = 720;

type Selection = { type: "project"; id: string } | { type: "hub"; id: string };

function pointFor(id: string): { x: number; y: number } {
  const project = getProject(id);
  if (project) return project.atlas;
  const hub = hubs.find((h) => h.id === id);
  if (hub) return { x: hub.x, y: hub.y };
  return { x: W / 2, y: H / 2 };
}

/** Slightly curved edge; curvature direction is stable per edge. */
function edgePath(a: { x: number; y: number }, b: { x: number; y: number }, seed: string) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const hash = [...seed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const sign = hash % 2 === 0 ? 1 : -1;
  const offset = Math.min(dist * 0.1, 42) * sign;
  const mx = (a.x + b.x) / 2 + (-dy / dist) * offset;
  const my = (a.y + b.y) / 2 + (dx / dist) * offset;
  return `M ${a.x} ${a.y} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b.x} ${b.y}`;
}

export default function SystemsAtlas() {
  const [selection, setSelection] = useState<Selection>({ type: "project", id: "koogymaa" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const activeId = hovered ?? selection.id;

  const connected = useMemo(() => {
    const set = new Set<string>([activeId]);
    for (const e of atlasEdges) {
      if (e.a === activeId) set.add(e.b);
      if (e.b === activeId) set.add(e.a);
    }
    return set;
  }, [activeId]);

  const selectProject = (slug: string, focusPanel = false) => {
    setSelection({ type: "project", id: slug });
    if (focusPanel) nodeRefs.current.get(slug)?.focus({ preventScroll: false });
  };

  const selectedProject = selection.type === "project" ? getProject(selection.id) : undefined;
  const selectedHub = selection.type === "hub" ? hubs.find((h) => h.id === selection.id) : undefined;
  const hubMembers = selectedHub
    ? atlasEdges
        .filter((e) => e.a === selectedHub.id || e.b === selectedHub.id)
        .map((e) => ({ edge: e, project: getProject(e.a === selectedHub.id ? e.b : e.a)! }))
    : [];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="max-w-[62ch] text-sm leading-relaxed text-paper-dim">
          Eight original systems, drawn as one map. Diamonds are technologies the projects
          genuinely share; <span className="text-signal">dashed amber ties</span> are direct
          relationships between two projects. Select any node — click, tap, or Tab to it.
        </p>
        <p className="annotation shrink-0 text-faint">
          Nodes {String(projects.length).padStart(2, "0")} · Layers {String(hubs.length).padStart(2, "0")} ·
          Edges {String(atlasEdges.length).padStart(2, "0")}
        </p>
      </div>

      {/* ---------- Map ---------- */}
      <div className="border border-line bg-graphite-900">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="annotation text-blueprint">Plate 01 — Systems atlas</span>
          <span className="annotation hidden text-faint sm:block">Scale: conceptual · Not to repository size</span>
          <span className="annotation text-faint sm:hidden">Swipe to pan →</span>
        </div>

        <div className="atlas-scroll overflow-x-auto">
          <div
            className="blueprint-grid-fine relative min-w-[740px]"
            style={{ aspectRatio: `${W} / ${H}` }}
            role="group"
            aria-label="Interactive map of projects and the technologies they share"
          >
            {/* Edges */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${W} ${H}`}
              aria-hidden="true"
              focusable="false"
            >
              {atlasEdges.map((edge, i) => {
                const isActive = edge.a === activeId || edge.b === activeId;
                const stroke = edge.direct
                  ? "var(--color-signal)"
                  : isActive
                    ? "var(--color-blueprint)"
                    : "var(--color-blueprint-dim)";
                return (
                  <path
                    key={`${edge.a}-${edge.b}`}
                    d={edgePath(pointFor(edge.a), pointFor(edge.b), edge.a + edge.b)}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={isActive ? 1.6 : 1}
                    strokeDasharray={edge.direct ? "6 6" : 1}
                    pathLength={edge.direct ? undefined : 1}
                    strokeDashoffset={edge.direct ? undefined : mounted ? 0 : 1}
                    opacity={isActive ? (edge.direct ? 0.9 : 0.85) : 0.16}
                    className="atlas-edge"
                    style={{ transitionDelay: `${Math.min(i * 40, 600)}ms` }}
                  />
                );
              })}
            </svg>

            {/* Hubs */}
            {hubs.map((hub) => {
              const isActive = activeId === hub.id;
              const dimmed = !connected.has(hub.id);
              const isSelected = selection.type === "hub" && selection.id === hub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Shared layer: ${hub.label} (${hub.sub}). Show which projects use it.`}
                  onClick={() => setSelection({ type: "hub", id: hub.id })}
                  onFocus={() => setSelection({ type: "hub", id: hub.id })}
                  onMouseEnter={() => setHovered(hub.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="atlas-node group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 py-1.5"
                  style={{
                    left: `${(hub.x / W) * 100}%`,
                    top: `${(hub.y / H) * 100}%`,
                    opacity: dimmed ? 0.35 : 1,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={`block h-3 w-3 rotate-45 border transition-colors ${
                      isSelected
                        ? "border-signal bg-signal"
                        : isActive
                          ? "border-blueprint bg-blueprint"
                          : "border-blueprint bg-graphite-900 group-hover:bg-blueprint"
                    }`}
                  />
                  <span
                    className={`mt-2 text-center font-mono text-[10px] leading-tight tracking-[0.1em] uppercase ${
                      isSelected ? "text-signal" : "text-blueprint"
                    }`}
                  >
                    {hub.label}
                  </span>
                  <span className="mt-0.5 hidden text-center font-mono text-[9px] tracking-wide text-faint lg:block">
                    {hub.sub}
                  </span>
                </button>
              );
            })}

            {/* Project nodes */}
            {projects.map((project) => {
              const isSelected = selection.type === "project" && selection.id === project.slug;
              const dimmed = !connected.has(project.slug);
              return (
                <button
                  key={project.slug}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(project.slug, el);
                    else nodeRefs.current.delete(project.slug);
                  }}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`${project.index} ${project.name} — ${project.kind}. Show summary.`}
                  onClick={() => selectProject(project.slug)}
                  onFocus={() => setSelection({ type: "project", id: project.slug })}
                  onMouseEnter={() => setHovered(project.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={`atlas-node absolute z-20 w-[15.5%] min-w-[104px] -translate-x-1/2 -translate-y-1/2 border px-2.5 py-2 text-left backdrop-blur-[2px] ${
                    isSelected
                      ? "border-signal bg-graphite-800"
                      : "border-line-bright bg-graphite-850/95 hover:border-blueprint"
                  }`}
                  style={{
                    left: `${(project.atlas.x / W) * 100}%`,
                    top: `${(project.atlas.y / H) * 100}%`,
                    opacity: dimmed ? 0.42 : 1,
                  }}
                >
                  <span className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] tracking-[0.12em] ${
                        isSelected ? "text-signal" : "text-blueprint"
                      }`}
                    >
                      {project.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`atlas-node-dot h-1.5 w-1.5 rounded-full ${
                        isSelected ? "bg-signal" : "bg-line-bright"
                      }`}
                    />
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-tight font-semibold text-paper lg:text-[13.5px]">
                    {project.atlasName}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-[9.5px] leading-tight text-faint lg:text-[10px]">
                    {project.kind.split("·")[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 border-t border-line px-4 py-2.5">
          <span className="annotation flex items-center gap-2 text-faint">
            <span aria-hidden="true" className="inline-block h-2 w-2 rotate-45 border border-blueprint" />
            Shared technology / concept
          </span>
          <span className="annotation flex items-center gap-2 text-faint">
            <span aria-hidden="true" className="inline-block w-5 border-t border-dashed border-signal" />
            Direct project relationship
          </span>
          <span className="annotation flex items-center gap-2 text-faint">
            <span aria-hidden="true" className="inline-block w-5 border-t border-blueprint-dim" />
            Uses / built on
          </span>
        </div>
      </div>

      {/* ---------- Detail panel ---------- */}
      <div aria-live="polite" className="mt-4 border border-line bg-graphite-900">
        {selectedProject && (
          <article
            key={selectedProject.slug}
            className="atlas-panel-swap grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.15fr_1fr_auto] lg:gap-10"
          >
            <div>
              <p className="annotation text-signal">
                Node {selectedProject.index} · {selectedProject.status}
              </p>
              <h3 className="mt-2.5 font-display text-3xl font-medium tracking-tight text-paper">
                {selectedProject.name}
              </h3>
              <p className="annotation mt-1.5 text-faint">{selectedProject.kind}</p>
              <p className="mt-3.5 max-w-[58ch] text-sm leading-relaxed text-paper-dim">
                {selectedProject.summary}
              </p>
            </div>

            <div>
              <p className="annotation text-faint">Connections — and why</p>
              <ul className="mt-3 space-y-2.5">
                {connectionsFor(selectedProject.slug).map(({ edge, project, hub }) => (
                  <li key={edge.a + edge.b} className="text-[13px] leading-snug">
                    {hub ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelection({ type: "hub", id: hub.id })}
                          className="font-mono text-[12px] tracking-wide text-blueprint underline-offset-4 hover:underline"
                        >
                          ◆ {hub.label}
                        </button>
                        <span className="text-paper-dim"> — {edge.label}</span>
                      </>
                    ) : project ? (
                      <>
                        <button
                          type="button"
                          onClick={() => selectProject(project.slug, true)}
                          className="font-mono text-[12px] tracking-wide text-signal underline-offset-4 hover:underline"
                        >
                          {project.index} {project.atlasName}
                        </button>
                        <span className="text-paper-dim"> — {edge.label}</span>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2.5 lg:min-w-[190px]">
              <Link
                href={`/projects/${selectedProject.slug}`}
                className="border border-signal/70 px-4 py-2.5 text-center font-mono text-xs tracking-[0.1em] text-signal uppercase transition-colors hover:bg-signal hover:text-graphite-950"
              >
                Read case study →
              </Link>
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-line px-4 py-2.5 text-center font-mono text-xs tracking-[0.1em] text-paper-dim uppercase transition-colors hover:border-line-bright hover:text-paper"
              >
                Repository ↗
              </a>
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-line px-4 py-2.5 text-center font-mono text-xs tracking-[0.1em] text-paper-dim uppercase transition-colors hover:border-line-bright hover:text-paper"
                >
                  Live ↗
                </a>
              )}
            </div>
          </article>
        )}

        {selectedHub && (
          <article
            key={selectedHub.id}
            className="atlas-panel-swap grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10"
          >
            <div>
              <p className="annotation text-blueprint">◆ Shared layer</p>
              <h3 className="mt-2.5 font-display text-3xl font-medium tracking-tight text-paper">
                {selectedHub.label}
              </h3>
              <p className="annotation mt-1.5 text-faint">{selectedHub.sub}</p>
              <p className="mt-3.5 max-w-[52ch] text-sm leading-relaxed text-paper-dim">
                {hubMembers.length} of the {projects.length} mapped systems sit on this layer. An
                edge appears here only where the repository itself evidences the connection —
                each one states its reason.
              </p>
            </div>
            <div>
              <p className="annotation text-faint">Connected systems</p>
              <ul className="mt-3 divide-y divide-line/70 border-y border-line/70">
                {hubMembers.map(({ edge, project }) => (
                  <li key={project.slug}>
                    <button
                      type="button"
                      onClick={() => selectProject(project.slug, true)}
                      className="group flex w-full items-baseline gap-3 py-2.5 text-left"
                    >
                      <span className="font-mono text-[11px] text-blueprint">{project.index}</span>
                      <span className="text-sm font-medium text-paper group-hover:text-white group-hover:underline group-hover:underline-offset-4">
                        {project.name}
                      </span>
                      <span className="hidden flex-1 text-right text-[12px] text-faint sm:block">
                        {edge.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </div>

      <p className="mt-3 text-[13px] text-faint">
        Prefer reading to exploring? The same projects continue as a plain list{" "}
        <a href="#projects" className="text-blueprint underline-offset-4 hover:underline">
          in the next section
        </a>
        , and every node above is keyboard-reachable with Tab.
      </p>
    </div>
  );
}
