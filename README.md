# Parham Afzal — Portfolio · “The Systems Atlas”

A developer portfolio built as an interactive engineering document: instead of
isolated project cards, the work is drawn as a **map of connected systems**.
Projects are nodes; the technologies and concepts they genuinely share
(Telegram platform, the SQLite family, Supabase, Persian/RTL engineering) are
hubs; every edge states its reason. Each of the eight mapped projects has a
full case study grounded in its public repository.

Live content is drawn exclusively from the public code at
[github.com/aghrabooti](https://github.com/aghrabooti) — READMEs, Prisma
schemas, test suites, and commit history were inspected directly. Numbers on
the site (test counts, model counts, lines) were counted in those repos;
where something couldn't be verified, it was omitted.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript**, fully static (SSG)
- **Tailwind CSS 4** with a small custom design system (graphite / blueprint
  blue / signal amber; Newsreader + IBM Plex via Fontsource, self-hosted — no
  Google Fonts requests)
- Hand-built interactive **SVG + HTML atlas** (no chart/graph libraries)
- No database, no CMS, no analytics. All content lives in typed data files.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Scripts:

| command            | what it does                                  |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | development server                            |
| `npm run build`    | production build (all routes prerendered)     |
| `npm run start`    | serve the production build                    |
| `npm run lint`     | ESLint (Next core-web-vitals + TS)            |
| `npm run typecheck`| `tsc --noEmit`                                |

## Project structure

```
app/
  layout.tsx               fonts, metadata, header/footer shell
  page.tsx                 home — hero, atlas, selected work, notes, about
  projects/page.tsx        full project index
  projects/[slug]/page.tsx case-study template (SSG via generateStaticParams)
  opengraph-image.tsx      generated OG card
  icon.svg                 favicon (original node mark)
  sitemap.ts / robots.ts
components/
  SystemsAtlas.tsx         the interactive map (client component)
  FlowDiagram.tsx          per-project architecture schematics from data
  ProjectRows.tsx          editorial project list
  Section.tsx / Reveal.tsx annotated sections + scroll reveal
data/
  projects.ts              ALL content: projects, atlas topology, notes
  site.ts                  identity & contact configuration
```

## Editing content

Everything textual lives in **`data/projects.ts`** and **`data/site.ts`** —
no content is hard-coded in components.

- **Add/change a project:** append a `Project` object. Set `atlas: {x, y}`
  (the map is a 1200×720 coordinate space) and add its edges to `atlasEdges`
  with a one-line justification. The case study page, index rows, atlas node,
  and sitemap update automatically.
- **Add a shared-technology hub:** add to `hubs` + edges. The hub becomes
  selectable in the atlas with its own panel.
- **Email:** `site.email` is `null` (no public email exists on the GitHub
  profile, so none is shown). Set it in `data/site.ts` and the contact
  section links it automatically.
- **Canonical URL:** set `NEXT_PUBLIC_SITE_URL` in your deployment env (used
  for `metadataBase`, sitemap, robots). On Vercel it falls back to
  `VERCEL_URL`.

## Accessibility & interaction notes

- Atlas nodes and hubs are real `<button>`s (Tab / Enter / Space), with
  `aria-pressed`, descriptive labels, visible focus rings, and an
  `aria-live` detail panel. A conventional project list directly follows the
  map, so nothing requires the visualization.
- On small screens the map pans horizontally at a legible minimum width
  instead of shrinking; the detail panel stacks below.
- `prefers-reduced-motion` disables edge draw-in, pulses, and reveals.
- Scroll-reveal is progressive enhancement: with JS off, everything is visible.

## Deploy

Designed for Vercel (zero config): import the repo, framework preset
“Next.js”, and optionally set `NEXT_PUBLIC_SITE_URL` to your domain. Any
static-friendly Next.js host works; every route is prerendered.

## Fact-checking the content

To re-verify any number on the site, look in the linked repository:
test counts are in each repo's test suite (`tests/`), KooGYMaa's model count
in `prisma/schema.prisma`, ParsiChin's audit figures in
`docs/rtl-audit.md`, and commit counts in the GitHub contributors view.
Demo URLs come from each repository's own “homepage” field on GitHub.
