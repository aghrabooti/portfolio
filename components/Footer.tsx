import Link from "next/link";
import GitHubMark from "./GitHubMark";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-graphite-900">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="annotation text-blueprint">Colophon — reliability note</p>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">
              Every figure on this site — test counts, model counts, commit counts — was
              counted from the public repositories it describes. Where a claim could not be
              verified from code, it was left out. The map draws an edge only where a
              repository evidences the connection.
            </p>
          </div>
          <nav className="flex gap-14" aria-label="Footer">
            <div>
              <p className="annotation text-faint">Site</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="text-paper-dim transition-colors hover:text-paper" href="/#atlas">Systems Atlas</Link></li>
                <li><Link className="text-paper-dim transition-colors hover:text-paper" href="/projects">All projects</Link></li>
                <li><Link className="text-paper-dim transition-colors hover:text-paper" href="/#notes">Engineering notes</Link></li>
                <li><Link className="text-paper-dim transition-colors hover:text-paper" href="/#about">About &amp; contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="annotation text-faint">Elsewhere</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    className="flex items-center gap-2 text-paper-dim transition-colors hover:text-paper"
                    href={site.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubMark className="h-3.5 w-3.5" /> github.com/{site.handle} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {site.name} · {site.role}
          </p>
          <p className="font-mono text-xs text-faint">
            Built with Next.js · Set in Newsreader &amp; IBM Plex · No trackers
          </p>
        </div>
      </div>
    </footer>
  );
}
