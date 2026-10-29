"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import GitHubMark from "./GitHubMark";
import { site } from "@/data/site";

const nav = [
  { href: "/#atlas", label: "Atlas" },
  { href: "/projects", label: "Projects" },
  { href: "/#notes", label: "Notes" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-graphite-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Parham Afzal — home">
          {/* Monogram mark: a node on a grid */}
          <span className="relative grid h-7 w-7 shrink-0 place-items-center border border-line-bright" aria-hidden="true">
            <span className="absolute inset-0 blueprint-grid-fine opacity-70" />
            <span className="relative h-1.5 w-1.5 rotate-45 bg-signal transition-transform duration-300 group-hover:rotate-[135deg]" />
          </span>
          <span className="leading-none">
            <span className="block font-mono text-[13px] font-medium tracking-[0.08em] text-paper">
              Parham Afzal
            </span>
            <span className="mt-0.5 block font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
              Systems Atlas
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = item.href === "/projects" && pathname.startsWith("/projects");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 font-mono text-xs tracking-[0.12em] uppercase transition-colors ${
                  active ? "text-signal" : "text-paper-dim hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-3 flex items-center gap-2 border border-line px-3 py-2 font-mono text-xs tracking-[0.12em] text-paper-dim uppercase transition-colors hover:border-line-bright hover:text-paper"
          >
            <GitHubMark className="h-3.5 w-3.5" />
            GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          type="button"
          className="flex items-center gap-2 border border-line px-3 py-2 font-mono text-xs tracking-[0.12em] text-paper-dim uppercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "+"}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line md:hidden" aria-label="Mobile">
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line/60 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm tracking-[0.12em] text-paper-dim uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-3 font-mono text-sm tracking-[0.12em] text-paper-dim uppercase"
              >
                <GitHubMark className="h-4 w-4" /> GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
