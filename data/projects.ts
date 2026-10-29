/**
 * All portfolio content, in one typed file.
 *
 * Accuracy rule: every factual claim in here was counted or read in the
 * public repositories of github.com/aghrabooti (READMEs, schemas, test
 * suites, contributor stats). Interpretations are phrased as such.
 * If you edit numbers, re-count them in the repo first.
 */

export interface DiagramBox {
  title: string;
  detail?: string;
  accent?: boolean;
}

export interface Diagram {
  caption: string;
  columns: { heading: string; boxes: DiagramBox[] }[];
  edgeLabels: string[];
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  atlasName: string;
  kind: string;
  period: string;
  status: string;
  repoName: string;
  repoUrl: string;
  demoUrl?: string;
  demoLabel?: string;
  summary: string;
  role: string;
  stack: string[];
  atlas: { x: number; y: number };
  featured: boolean;
  lede: string;
  problem: string;
  architecture: { name: string; detail: string }[];
  diagram?: Diagram;
  decisions: { title: string; detail: string }[];
  hardProblems: { title: string; detail: string }[];
  evidence: { label: string; value: string }[];
  limitations: string[];
}

export const projects: Project[] = [
  {
    slug: "koogymaa",
    index: "01",
    name: "KooGYMaa",
    atlasName: "KooGYMaa",
    kind: "Full-stack platform · Next.js",
    period: "Aug – Sep 2026",
    status: "Deployed demo · actively developed",
    repoName: "aghrabooti/KooGYMaa",
    repoUrl: "https://github.com/aghrabooti/KooGYMaa",
    demoUrl: "https://koo-gy-maa.vercel.app",
    demoLabel: "Live deployment (Vercel)",
    summary:
      "A multi-role gym management platform — admins, trainers, and members share one domain model covering memberships, subscriptions, workout and diet plans, sessions, payments, and progress tracking.",
    role: "Designed and built end-to-end. The commit history is single-author (65 commits), from the Prisma schema to the bilingual interface.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma 7", "libSQL / Turso", "Tailwind CSS 4", "JWT sessions", "Vitest"],
    atlas: { x: 168, y: 118 },
    featured: true,
    lede: "KooGYMaa models an entire gym business: who owns the gym, who is allowed to train there, who is subscribed to what, which plan was assigned to whom, and whether they actually showed up. It is the largest system in this portfolio — 33 Prisma models behind three role-scoped applications.",
    problem:
      "A gym is a web of relationships, not a list of users. A trainer works at several gyms; a member holds a subscription at one gym and a coaching relationship with one trainer; workout and diet plans are reusable templates that get assigned per person. Software that flattens this into a single “users” table cannot express applications, approvals, suspensions, or per-relationship history — which is exactly what gym staff spend their day managing.",
    architecture: [
      {
        name: "Three applications, one codebase",
        detail:
          "Role-scoped route trees — /admin, /trainer, /user — over a single Next.js App Router codebase: 48 pages and 77 API route handlers at last count. Shared validation modules are unit-tested independently of the HTTP layer.",
      },
      {
        name: "Server-validated sessions",
        detail:
          "Signed JWTs in HttpOnly cookies, but every request re-checks the account server-side, so a suspended or deactivated user cannot create or reuse a session. Passwords are bcrypt-hashed; public registration can only mint TRAINER and USER accounts — admins are provisioned separately.",
      },
      {
        name: "Relationships as first-class models",
        detail:
          "The 33-model Prisma schema (16 enums) treats each relationship as its own workflow: GymTrainer carries a trainer's application and status per gym, GymMembership handles approval, suspension, and expiry, TrainerClient tracks coaching pairs, and plans are assigned through dedicated assignment records rather than copied.",
      },
      {
        name: "Payments behind an interface",
        detail:
          "A PaymentProvider interface with a signed demo implementation (HMAC checkout tokens, only hashes stored), a Payment + PaymentEvent ledger, refund routes, and finance reports. Money is stored as integers in the currency's smallest unit, so reports never drift on floating-point rounding.",
      },
      {
        name: "Bilingual, bidirectional UI",
        detail:
          "Persian and English with full direction switching. The Jalali (Persian) calendar conversion, Tehran-time handling, and Rial/Toman formatting in lib/fa.ts are hand-written with zero dependencies, and the Persian typeface (Estedad, variable) is self-hosted.",
      },
      {
        name: "SQLite-family data layer",
        detail:
          "Prisma 7 with the libSQL adapter: a local SQLite file in development, Turso when hosted, same schema either way. Migrations and an idempotent seed are the reproducible source of database state; local .db files are git-ignored on purpose.",
      },
    ],
    diagram: {
      caption:
        "One Next.js application serves three role-scoped surfaces over a single relational model. A cron route drives subscription lifecycle transitions (expiry, renewal windows); payments sit behind a provider interface.",
      columns: [
        {
          heading: "Surfaces",
          boxes: [
            { title: "Admin console", detail: "/admin — gyms, members, finance" },
            { title: "Trainer workspace", detail: "/trainer — clients, plans, sessions" },
            { title: "Member app", detail: "/user — plans, logs, progress" },
          ],
        },
        {
          heading: "Application",
          boxes: [
            { title: "Next.js App Router", detail: "48 pages · 77 API routes" },
            { title: "Session guard", detail: "JWT + per-request status check", accent: true },
          ],
        },
        {
          heading: "Domain",
          boxes: [
            { title: "Prisma schema", detail: "33 models · 16 enums" },
            { title: "Payments interface", detail: "ledger + signed checkout" },
            { title: "Cron", detail: "subscription lifecycle" },
          ],
        },
        {
          heading: "Data",
          boxes: [{ title: "libSQL", detail: "SQLite file locally · Turso hosted" }],
        },
      ],
      edgeLabels: ["role-scoped routes", "typed queries", "adapter-libsql"],
    },
    decisions: [
      {
        title: "Model the relationship, not just the entity",
        detail:
          "Trainer↔gym and member↔gym are explicit application/approval workflows with their own status enums instead of bare foreign keys. It costs more joins and more admin UI; in exchange the system can answer “who applied, who approved, when does it expire” — the questions the software exists for.",
      },
      {
        title: "Server-validated sessions over stateless purity",
        detail:
          "A database read per request is the price for suspensions that take effect immediately. For a system where account standing controls physical-world access (the gym door, effectively), instant revocation beats saving one indexed lookup.",
      },
      {
        title: "SQLite-family database on purpose",
        detail:
          "libSQL gives dev/prod parity (file → Turso) with zero database operations, while Prisma keeps a credible exit path to Postgres if write concurrency ever demands it. The managed-Postgres option was used where it fit better — the Azizi store on Supabase.",
      },
      {
        title: "Provider interface before a real gateway",
        detail:
          "The demo payment provider exercises the full production shape — checkout creation, signed callback tokens, event ledger, refunds — so wiring a real PSP later means implementing one interface, not re-architecting checkout.",
      },
    ],
    hardProblems: [
      {
        title: "A Persian calendar with no library",
        detail:
          "Dates had to render in the Jalali calendar with Tehran time, in both languages. lib/fa.ts implements the standard Jalali conversion algorithm directly and is covered by its own test file — one less dependency in a place where a wrong leap-year rule corrupts every date on screen.",
      },
      {
        title: "Subscription state across two audiences",
        detail:
          "Members and trainers hold different plan types with independent lifecycles (pending, active, suspended, expired). Transitions are centralised and cron-driven rather than scattered across route handlers, with finance and scheduling logic covered by dedicated tests.",
      },
      {
        title: "Keeping three surfaces consistent",
        detail:
          "Admin, trainer, and member views mutate the same entities. Validation lives in shared modules tested in isolation (auth, member, trainer, plan, payment, review, progress, finance, streaks), so a rule fixed once is fixed for all three roles.",
      },
    ],
    evidence: [
      { label: "Prisma models", value: "33 (+16 enums)" },
      { label: "API route handlers", value: "77" },
      { label: "Pages", value: "48" },
      { label: "Test suite", value: "18 files · 73 cases (Vitest)" },
      { label: "TypeScript (app/lib/components)", value: "≈ 12,900 lines" },
      { label: "Commits", value: "65, single author" },
    ],
    limitations: [
      "Checkout runs on a signed demo payment provider — the full flow works, but no production PSP is wired in yet.",
      "The public deployment is a development build with seed data; it demonstrates the system, it is not a claim of gyms in production.",
    ],
  },
  {
    slug: "parsichin",
    index: "02",
    name: "ParsiChin",
    atlasName: "ParsiChin",
    kind: "Browser extension · RTL engine",
    period: "Aug – Sep 2026",
    status: "v0.2.1 · MIT licensed",
    repoName: "aghrabooti/ParsiChin",
    repoUrl: "https://github.com/aghrabooti/ParsiChin",
    summary:
      "A Manifest V3 Chrome extension that makes mixed Persian/English text readable on AI chat sites by deciding text direction from content — not from the first strong character, which is where browsers get it wrong.",
    role: "Sole author, 63 commits — including the audit tooling, the before/after RTL lab, and the store-listing assets.",
    stack: ["Vanilla JS (MV3)", "MutationObserver", "Unicode bidi", "jsdom tests", "Headless Chromium audit", "Vazirmatn (bundled)"],
    atlas: { x: 1010, y: 112 },
    featured: true,
    lede: "When an AI answer mixes Persian prose with English tokens — Prompt, useState, npm install — browsers lay it out wrong: the paragraph flips direction line by line, list bullets detach from their text, and punctuation lands at the wrong end. ParsiChin fixes the direction of every block based on what the block actually contains.",
    problem:
      "The standard tools fail on mixed-script text. dir=\"auto\" trusts the first strong character, so a Persian answer that happens to start with “API” renders left-to-right. unicode-bidi: plaintext lets each line pick its own direction, producing the familiar zig-zag. And when a container is flipped to RTL, the wrongness leaks into English paragraphs inside it. Persian speakers read this garbled output from every major AI chat product, every day.",
    architecture: [
      {
        name: "bidi.js — content-based classification",
        detail:
          "A 237-line engine that counts Persian letters against Latin letters and detects real Persian words, so “API این سرویس …” classifies as Persian despite the Latin start. Direction is decided once per block, never per line, so answers don't flip around while they stream.",
      },
      {
        name: "entry.js — decoration and containment",
        detail:
          "Scans and observes the DOM (MutationObserver for streaming), then writes the decision twice: as a dir attribute and as .pc-rtl/.pc-ltr classes carrying !important rules that survive chat UIs hard-coding direction: ltr !important. A containment pass pins English-only blocks inside flipped containers back to LTR. Disabling the extension restores the page exactly — including a dir attribute the site set itself.",
      },
      {
        name: "rules.js — per-site knowledge, soft failure",
        detail:
          "Dedicated container rules for eight chat products (ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Copilot, Le Chat, Hugging Face Chat). When a site redesigns and the known root vanishes, the scan falls back to generic containers and finally to <body> instead of silently doing nothing.",
      },
      {
        name: "Service worker & diagnostics",
        detail:
          "Settings in chrome.storage, a toolbar badge with the live decorated-block count, one-click “enable on this site” via dynamic injection (no reload), and ParsiChin.reportJson() in the console explaining every Persian block that was not decorated, and why.",
      },
      {
        name: "RTL lab & headless audit",
        detail:
          "A demo page loads the real content script into a mock chat UI and measures 22 layout probes in the visitor's own browser — switchable between the v0.1.0 snapshot and current code, friendly and hostile site stylesheets. tools/rtl-audit.js runs the same sources in headless Chromium across 174 probes.",
      },
    ],
    diagram: {
      caption:
        "The content script observes the chat DOM, classifies each block by content, and stamps direction in a cascade-proof way. The audit loop (headless Chromium, 174 probes) is what proved the v0.2.0 rewrite actually fixed rendering — jsdom tests alone had been green while real pages were visibly broken.",
      columns: [
        {
          heading: "Host page",
          boxes: [{ title: "AI chat UI", detail: "8 known products · every site by default" }],
        },
        {
          heading: "Observe",
          boxes: [
            { title: "entry.js scan", detail: "MutationObserver · streaming-safe" },
            { title: "rules.js", detail: "site roots → generic → <body>" },
          ],
        },
        {
          heading: "Decide",
          boxes: [{ title: "bidi.js", detail: "Persian vs Latin content, once per block", accent: true }],
        },
        {
          heading: "Apply",
          boxes: [
            { title: "dir + .pc-rtl/.pc-ltr", detail: "!important, cascade-proof" },
            { title: "Typesetting", detail: "bundled Vazirmatn · lists flipped whole" },
          ],
        },
      ],
      edgeLabels: ["DOM mutations", "classify", "decorate + contain"],
    },
    decisions: [
      {
        title: "Content over first character",
        detail:
          "v0.1.0 delegated to dir=\"auto\" and plaintext; the audit showed Persian paragraphs rendering LTR and lines flipping independently. The rewrite classifies each block from its actual letter/word composition and commits to one direction per block — stable under streaming, correct for code-switched text.",
      },
      {
        title: "Write the decision twice",
        detail:
          "Some chat UIs ship direction: ltr !important on message bodies. Setting only the dir attribute loses that fight. ParsiChin sets the attribute (for semantics and assistive tech) and a class with its own !important rule (to win the cascade). Slightly impolite CSS; the alternative is not working.",
      },
      {
        title: "Verify in a real layout engine",
        detail:
          "jsdom can prove a class was written; it cannot prove Persian text renders right-aligned. The project's defining engineering move was building a headless-Chromium probe suite that measures rendered direction, alignment, and list-marker positions — the suites that reported 61 failures in v0.1.0 and 0 after the rewrite.",
      },
      {
        title: "A strict safety contract",
        detail:
          "Code blocks, forms, and chat inputs are never touched; numbers-only and code-only blocks are left alone; disabling restores the original DOM bit-for-bit. An extension that rewrites arbitrary pages earns trust by being boringly reversible.",
      },
    ],
    hardProblems: [
      {
        title: "Direction leaks through containers",
        detail:
          "DeepSeek's markdown container, once flipped, dragged nested English paragraphs into RTL. The fix is a containment pass: English-only descendants of a flipped container are explicitly pinned LTR, keeping their punctuation and alignment correct.",
      },
      {
        title: "Streaming text that changes its mind",
        detail:
          "A half-streamed answer can look Latin-dominant at 200 ms and Persian at 2 s. Word-level Persian detection plus once-per-block commitment keeps the layout from visibly flip-flopping mid-answer.",
      },
      {
        title: "Hosts that redesign without notice",
        detail:
          "When a chat product ships new markup, selector-based tools usually die silently. ParsiChin's fallback chain degrades to generic roots, and the console report explains what the scan actually saw — turning “it stopped working” into a debuggable state.",
      },
    ],
    evidence: [
      { label: "Layout audit (headless Chromium)", value: "174 probes · 61 failing in v0.1.0 → 0 in v0.2.x" },
      { label: "Chat products with dedicated rules", value: "8" },
      { label: "Test suites", value: "jsdom smoke · UI sanity · permissions" },
      { label: "Engine size", value: "bidi.js 237 lines · entry.js 703 · rules.js 191" },
      { label: "Releases", value: "v0.1.0 → v0.2.1 (engine rewrite at 0.2.0)" },
      { label: "Commits", value: "63, single author" },
    ],
    limitations: [
      "Chromium only — it is a Manifest V3 extension, and the rules target desktop chat UIs.",
      "The Web Store package, screenshots, and listing text are prepared in the repo; this page doesn't claim a published listing. Installation from source is documented in the README.",
    ],
  },
  {
    slug: "nikmanesh-bot",
    index: "03",
    name: "Nikmanesh Webinar Bot",
    atlasName: "Nikmanesh Bot",
    kind: "Production Telegram bot",
    period: "Oct 2026",
    status: "In service for the academy's webinars",
    repoName: "aghrabooti/nikmanesh-telegram-bot",
    repoUrl: "https://github.com/aghrabooti/nikmanesh-telegram-bot",
    summary:
      "The registration and operations bot for a real academy's webinars: a resumable 7-step signup wizard, named referral links with per-link conversion funnels, partner accounts that see aggregate stats only, scheduled reminders, throttled broadcasts, and nightly backups — operated entirely from inside Telegram.",
    role: "Sole developer, 119 commits. The Persian README and the two PDF operator guides in the repo are written for the academy's own admins — this is a working tool with working documentation, not a demo.",
    stack: ["Python 3.12", "python-telegram-bot v22 (async)", "SQLite", "openpyxl", "pytest", "Ruff"],
    atlas: { x: 150, y: 372 },
    featured: true,
    lede: "An academy runs webinar signups through Telegram because that is where its students already are. The bot has to behave like a small CRM: capture registrations reliably, attribute them to the channel that sent each student, chase the people who abandoned the form halfway, and keep personal phone numbers away from anyone who shouldn't see them.",
    problem:
      "Registration through a chat interface fails in specific ways: people abandon multi-step forms, type phone numbers in four different formats, and ask where the webinar link is. Meanwhile the academy promotes each webinar through partner channels and needs to know which channel actually delivered students — without handing those partners a spreadsheet of teenagers' phone numbers. And the whole operation is run by non-programmers, from their phones.",
    architecture: [
      {
        name: "Resumable registration wizard",
        detail:
          "Seven steps (name → grade → field → city → phone → alternate phone → confirmation), all on reply keyboards with back/exit at every step. Leaving mid-form preserves progress; returning resumes at the same step. Each seminar can define its own final message with template variables ({name}, {seminar}, {date}, {link}).",
      },
      {
        name: "Referral attribution engine",
        detail:
          "Admins mint named deep links (t.me/<bot>?start=ref_<code>). Starts are attributed first-touch; every link gets its own funnel — entries, completed registrations, grade breakdown, conversion rate — plus per-link CSV/Excel exports of registrants. Organic traffic is tracked as its own segment.",
      },
      {
        name: "Three-tier access model",
        detail:
          "Full admins (ADMIN_IDS) run everything. “Wide admins” join through single-use invites bound to their Telegram ID and see only their own links' aggregates. Channel partners authenticate with a per-link password via /channels and see funnel numbers only — no names, no phone numbers, no exports. Destructive actions (permanent link deletion) require the top role and a second confirmation.",
      },
      {
        name: "Scheduled operations",
        detail:
          "Daily nudges for incomplete registrations; reminders at 12 h and 2 h before each webinar for completed ones; broadcasts sent through a queue throttled to 5 messages/second to respect Telegram limits; a gzipped SQLite snapshot delivered to admins in Telegram every night at 00:00 Tehran time, with 30-day local retention.",
      },
      {
        name: "Exports people actually open",
        detail:
          "Real .xlsx workbooks (openpyxl) alongside CSV: per-seminar registrants, per-link registrants, all leads with phone numbers, all form starts — filterable by Jalali date ranges, because the people reading them think in the Persian calendar.",
      },
      {
        name: "Modular, content-centralised codebase",
        detail:
          "handlers / services / keyboards / config / utils, with every Persian string centralised in config/content.py so copy edits never touch logic. SQLite with lightweight migrations; polling and webhook entry points share one application factory.",
      },
    ],
    diagram: {
      caption:
        "Students meet a wizard; the interesting machinery is behind it — attribution, role-scoped statistics, and four scheduled jobs. All state lives in one SQLite file, which is what makes the nightly “send the database to the admin” backup trivially reliable.",
      columns: [
        {
          heading: "Actors",
          boxes: [
            { title: "Students", detail: "deep-link start · 7-step wizard" },
            { title: "Channel partners", detail: "/channels · aggregates only" },
            { title: "Admins", detail: "/admin · full panel" },
          ],
        },
        {
          heading: "Handlers",
          boxes: [
            { title: "wizard.py", detail: "resumable form state", accent: true },
            { title: "admin / wide_admin", detail: "role-scoped panels" },
          ],
        },
        {
          heading: "Services",
          boxes: [
            { title: "referrals", detail: "first-touch funnels" },
            { title: "sender queue", detail: "broadcasts @ 5 msg/s" },
            { title: "reminders", detail: "daily · 12 h · 2 h" },
          ],
        },
        {
          heading: "State",
          boxes: [{ title: "SQLite", detail: "nightly .db.gz → admins on Telegram" }],
        },
      ],
      edgeLabels: ["callback & reply keyboards", "domain calls", "single-file DB"],
    },
    decisions: [
      {
        title: "Aggregate-only partner statistics",
        detail:
          "The academy needs partners to trust the numbers; students need their phone numbers not to leak. So the partner role was designed to be incapable of seeing personal data — the queries behind /channels only ever return counts. It's a privacy boundary enforced by architecture, not by policy text.",
      },
      {
        title: "First-touch attribution, stated plainly",
        detail:
          "A student who taps three channel links belongs to the first one. One rule, applied everywhere, visible in every report. Multi-touch models are more “accurate” and completely unexplainable to the people arguing about channel performance.",
      },
      {
        title: "SQLite as an operations feature",
        detail:
          "One file means the backup story is “gzip it and send it to the admins' Telegram every midnight” — backups the operators can literally see arriving. No hosted database, no dump tooling, no restore runbook. For this scale, that's the right trade.",
      },
      {
        title: "Admin commands hidden from the command menu",
        detail:
          "/admin and /channels work only when typed directly and only for the right identities. Security through obscurity is not a strategy — but as one layer on top of ID checks, it keeps the attack surface out of casual view.",
      },
    ],
    hardProblems: [
      {
        title: "Phone numbers, as humans type them",
        detail:
          "Students share via Telegram's native contact button or type freehand; input is normalised to +98 form, and the alternate-number step offers “same as before” or a different number explicitly — because a parent’s number is often the reachable one for a webinar reminder.",
      },
      {
        title: "Broadcasts without getting rate-limited",
        detail:
          "A naive loop over all users hits Telegram's flood limits and dies halfway. Broadcasts go through a queued sender at 5 messages/second, so an announcement to the full list completes instead of erroring out mid-send.",
      },
      {
        title: "Forms that survive abandonment",
        detail:
          "A registration form inside a chat competes with every other notification on the phone. Step state persists per user, exiting keeps progress, and the daily incomplete-signup reminder exists precisely because the data model expects interruption as the normal case.",
      },
    ],
    evidence: [
      { label: "Test suite", value: "128 pytest cases · 13 files (flows, panels, exports, backups, channels, reminders)" },
      { label: "Codebase", value: "≈ 7,200 lines of Python" },
      { label: "Operator documentation", value: "2 PDF guides (bot admins · channel admins), in-repo" },
      { label: "Commits", value: "119, single author" },
    ],
    limitations: [
      "Built for one academy's catalogue and vocabulary (grades, fields, seminar model) — generalising it would mean parameterising content that is currently, deliberately, concrete.",
      "Registration collects phone numbers by design; the README is explicit that backups therefore go only to trusted admin IDs. The role system exists to keep that boundary real.",
    ],
  },
  {
    slug: "azizi-store",
    index: "04",
    name: "Mahdi Azizi Academy Store",
    atlasName: "Azizi Store",
    kind: "E-commerce · mahdiazizi.com",
    period: "Jul – Oct 2026",
    status: "Live storefront · MIT licensed code",
    repoName: "aghrabooti/tutorial-website",
    repoUrl: "https://github.com/aghrabooti/tutorial-website",
    demoUrl: "https://tutorial-website-lake.vercel.app",
    demoLabel: "Deployment (Vercel)",
    summary:
      "A working Persian e-commerce site for a mathematics teacher's courses, lecture notes, and books: OTP login, cart, ZarinPal payments, postal shipments for physical items, and access-controlled course files — on a deliberately dependency-light stack.",
    role: "Sole developer, 203 commits — the most-iterated repository on the profile, including the payment runbook and SEO documentation.",
    stack: ["Vanilla HTML/CSS/JS", "Supabase Postgres", "36 Deno Edge Functions", "ZarinPal gateway", "SMS OTP", "Node test suites"],
    atlas: { x: 1032, y: 330 },
    featured: true,
    lede: "A mathematics teacher sells two kinds of things: video courses that should unlock the moment payment clears, and printed notes that have to go in the post. This store sells both from one cart, in Persian, with the login (SMS one-time codes) and the payment rail (ZarinPal) that Iranian customers actually use.",
    problem:
      "Off-the-shelf store builders handle neither half well: digital entitlement (this student paid, these session files are theirs, nobody else's) and physical fulfilment (this order is a book, it needs a postal shipment tracked by a human). Add phone-number OTP instead of email passwords, Toman/Rial conversion at the gateway boundary, and an admin who is a teacher, not a developer — and the “simple shop” becomes a small, real system.",
    architecture: [
      {
        name: "Framework-free storefront",
        detail:
          "Fourteen hand-written HTML/CSS/JS pages (~7,100 lines of JS): catalogue, course detail, cart, checkout flow, student dashboard, admin. Shared header/footer are fetched components; a content-manifest keeps course media organised. No build step — every page deploys as-is, which also keeps hosting trivial.",
      },
      {
        name: "Edge Functions as the API",
        detail:
          "Thirty-six single-purpose Deno functions on Supabase: auth (register, login, OTP via an SMS hook), cart operations, checkout, payment-request / payment-verify, entitlement checks, admin CRUD for courses/sessions/orders/users, shipments, and site content. The browser only ever holds the anon key; privileged work happens server-side.",
      },
      {
        name: "Verify-then-fulfil payments",
        detail:
          "Nothing is granted at payment-request time. The ZarinPal callback lands on payment-verify, which confirms with the gateway and only then creates the order, unlocks course access, and — for physical items — creates a postal shipment visible in the admin panel. The Toman↔Rial factor is an explicit, documented setting at exactly that boundary.",
      },
      {
        name: "Entitlement-checked file delivery",
        detail:
          "Course files are not public URLs. get-course-file serves content only after check-course-access confirms the purchase, and session uploads go through admin-issued upload URLs.",
      },
      {
        name: "Tested against a stubbed backend",
        detail:
          "Node test suites (payments, OTP, admin panel, shipments, profile flow, SEO) run against supabase-stub.js, so the edge-function logic is verifiable without a live project. Postgres migrations are versioned and idempotent; a GitHub Actions workflow for function deployment ships in deploy/.",
      },
    ],
    diagram: {
      caption:
        "A static storefront with a function-per-operation backend. The payment boundary is the design's spine: access and shipments come into existence only after gateway verification, never on the customer's say-so.",
      columns: [
        {
          heading: "Storefront",
          boxes: [{ title: "14 static pages", detail: "catalogue · cart · dashboard · admin" }],
        },
        {
          heading: "API",
          boxes: [
            { title: "36 Edge Functions", detail: "auth/OTP · cart · admin · content" },
            { title: "payment-verify", detail: "gateway confirm → fulfil", accent: true },
          ],
        },
        {
          heading: "Platform",
          boxes: [
            { title: "Supabase Postgres", detail: "versioned migrations" },
            { title: "ZarinPal", detail: "request → callback → verify" },
          ],
        },
        {
          heading: "Fulfilment",
          boxes: [
            { title: "Course access", detail: "entitlement-checked files" },
            { title: "Postal shipments", detail: "tracked in admin panel" },
          ],
        },
      ],
      edgeLabels: ["fetch + anon key", "service-role, server-side", "on verified payment"],
    },
    decisions: [
      {
        title: "No framework on the storefront",
        detail:
          "Hand-written pages mean zero build tooling, instant deploys, and nothing between the teacher's content changes and the live site. The honest cost: shared chrome is injected at runtime, and discipline replaces a component system. For a 14-page store that one person maintains, the trade still pays.",
      },
      {
        title: "One function per operation",
        detail:
          "36 small functions look like overkill next to one server — until you review permissions. Each function's blast radius is its own name (admin-shipments cannot accidentally serve course files), and each is testable against the stub in isolation.",
      },
      {
        title: "The gateway is the only source of payment truth",
        detail:
          "The classic small-shop bug is fulfilling on “the customer returned from the bank page”. Here fulfilment hangs off server-side verification, and the runbook documents the production secrets (merchant ID, sandbox flag, callback URL, price factor) so go-live is configuration, not code changes.",
      },
    ],
    hardProblems: [
      {
        title: "OTP login without framework auth",
        detail:
          "SMS one-time codes via a Supabase auth hook, session checks (check-session), password change and profile completion flows — assembled from functions rather than inherited from a framework, and covered by the OTP and profile-flow suites.",
      },
      {
        title: "One cart, two fulfilment worlds",
        detail:
          "A single order can mix unlock-now sessions and post-it books. The verify step splits the order into instant entitlements and a shipment record; the admin shipments tab exists because the second half needs a human with envelopes.",
      },
      {
        title: "Toman vs Rial at the boundary",
        detail:
          "Prices are displayed in Toman; the gateway denominates in Rials. A single explicit PRICE_TO_RIAL_FACTOR at the payment edge — documented in the setup runbook — is the difference between charging correctly and charging 10×.",
      },
    ],
    evidence: [
      { label: "Backend surface", value: "36 Edge Functions · 2 SQL migrations" },
      { label: "Storefront", value: "14 pages · ≈ 7,100 lines of JS" },
      { label: "Test suites", value: "payments · OTP · admin · shipments · SEO (stubbed Supabase)" },
      { label: "Runbooks in repo", value: "payment setup · deployment · SEO/Search Console · content guide" },
      { label: "Commits", value: "203, single author" },
    ],
    limitations: [
      "No build step is a deliberate choice, and it caps how far the frontend can grow before a component model earns its keep.",
      "This page quotes no sales or traffic figures — the repo documents the system and its production configuration, and that's what is claimed here.",
    ],
  },
  {
    slug: "azizi-bot",
    index: "05",
    name: "Azizi Academy Bot",
    atlasName: "Azizi Bot",
    kind: "Production Telegram bot",
    period: "Sep – Oct 2026",
    status: "Companion bot to mahdiazizi.com",
    repoName: "aghrabooti/azizi-telegram-bot",
    repoUrl: "https://github.com/aghrabooti/azizi-telegram-bot",
    summary:
      "The Telegram companion to the Azizi store: the same course/note/book catalogue with the same grade-and-field filters, a mandatory phone gate, anonymous messaging to the teacher, and a full admin panel — built on a “pages as data” navigation core that renders to Telegram and to a live HTML preview from one definition.",
    role: "Sole developer, 72 commits.",
    stack: ["Python 3.10+", "python-telegram-bot 22.8 (pinned)", "SQLite", "Supabase catalogue sync", "pytest (offline)"],
    atlas: { x: 990, y: 538 },
    featured: true,
    lede: "The store sells; the bot keeps students close. It mirrors the website's catalogue and filters inside Telegram, takes anonymous questions a student wouldn't ask with their name attached, and gives the teacher an admin panel that works from the same chat window. Its interesting part is underneath: every screen is a data value, rendered twice.",
    problem:
      "Rebuilding a store's catalogue inside a bot usually means a second, drifting source of truth and a tangle of stateful handler code where every screen hard-codes where “back” goes. This bot had to stay in exact step with mahdiazizi.com (same products, same grade/field taxonomy, real prices, direct buy links), run on cheap shared hosting, and be operable by a non-developer.",
    architecture: [
      {
        name: "Pages as data",
        detail:
          "The navigation service returns Page(text, rows, parent) values — screens are data, not code. Telegram handlers render them via editMessageText on a single message; a separate preview site renders the same definitions as HTML, so the bot's entire page graph can be clicked through in a browser. Back-navigation is stateless: every page knows its parent.",
      },
      {
        name: "Catalogue sync with a fallback",
        detail:
          "Products sync from the store's Supabase (the single source of truth), with a seed snapshot derived from the site's JSON-LD shipped in the repo. If sync fails, the bot still opens with a real catalogue; sync status is visible in the admin panel.",
      },
      {
        name: "Three-layer phone gate",
        detail:
          "First /start offers only Telegram's native contact-share button — no “later” option. The gate handles invalid typed input, stale buttons from old messages, and non-text messages before any feature unlocks.",
      },
      {
        name: "Anonymous relay",
        detail:
          "Students message the teacher under a random code (e.g. #A7F3) with no identity attached; the admin reads and replies inside the panel, by button or reply, without ever learning who sent it.",
      },
      {
        name: "Operability as a feature",
        detail:
          "Admin panel covers stats, users with BOM-marked CSV export (so Excel opens Persian text correctly), rotating logs with automatic bot-token scrubbing, DB backup/restore, and live content editing. Deployment is documented three ways: cPanel polling (recommended), a systemd unit for VPS, and a WSGI webhook “only if you must” — plus diagnose and Supabase-probe scripts.",
      },
    ],
    diagram: {
      caption:
        "One page graph, two renderers. The catalogue flows from the store's Supabase; the bot never becomes a second place where prices are edited.",
      columns: [
        {
          heading: "Source of truth",
          boxes: [{ title: "Store Supabase", detail: "courses · notes · books · prices" }],
        },
        {
          heading: "Sync",
          boxes: [{ title: "catalog service", detail: "live sync + JSON-LD seed fallback" }],
        },
        {
          heading: "Navigation core",
          boxes: [{ title: "Page(text, rows, parent)", detail: "stateless page graph", accent: true }],
        },
        {
          heading: "Renderers",
          boxes: [
            { title: "Telegram", detail: "inline keyboards, one edited message" },
            { title: "HTML preview site", detail: "same definitions, browser-clickable" },
          ],
        },
      ],
      edgeLabels: ["read-only sync", "pages as data", "two renderers"],
    },
    decisions: [
      {
        title: "Pages as data, not handler spaghetti",
        detail:
          "Chat-bot UIs rot quickly when each screen is a function that also knows its neighbours. Making Page a value with an explicit parent turns navigation into a pure function of state — and made the HTML preview almost free, which in turn makes the bot demoable and testable without Telegram at all.",
      },
      {
        title: "Polling first, webhook if forced",
        detail:
          "On shared cPanel hosting, webhooks drag in TLS, Passenger, and silent delivery failures. The recommended deployment polls; the WSGI webhook exists for hosts that leave no choice. Boring, and the bot stays up.",
      },
      {
        title: "Read-only catalogue in the bot",
        detail:
          "Purchase happens on the website; the bot links out with real prices. One checkout to secure and support, two shop windows. The sync's seed-snapshot fallback means a Supabase outage degrades the bot to slightly stale, not empty.",
      },
    ],
    hardProblems: [
      {
        title: "Stateless navigation inside 64 bytes",
        detail:
          "Telegram callback data is capped at 64 bytes, and every button must encode enough to rebuild its screen. The keyboards layer owns that budget (centralised callback constants and regex patterns), and the parent-pointer page model means “back” never needs a server-side history stack.",
      },
      {
        title: "A gate with no side doors",
        detail:
          "Users poke at bots with old buttons, forwarded messages, stickers, and half-typed numbers. The phone gate explicitly handles invalid text, stale keyboards, and non-text input as separate cases — the unglamorous paths are where “mandatory” gates usually leak.",
      },
      {
        title: "Secrets hygiene in a chatty system",
        detail:
          "Logs rotate to disk and are downloadable from the admin panel — so the logging setup scrubs the bot token before anything is written, and the README's security section is written as rules that must not be broken. The 103 tests run fully offline, with no Telegram or Supabase access.",
      },
    ],
    evidence: [
      { label: "Test suite", value: "103 network-free tests" },
      { label: "Codebase", value: "≈ 250 KB of Python · handlers/services/keyboards split" },
      { label: "Deployment paths documented", value: "cPanel polling · systemd · WSGI webhook" },
      { label: "Commits", value: "72, single author" },
    ],
    limitations: [
      "The bot is a catalogue and communication surface, not a second checkout — purchase deliberately stays on the website.",
      "Shared-hosting constraints (polling on cPanel) trade a little latency for a deployment the owner can keep alive without a server to administer.",
    ],
  },
  {
    slug: "v2ray-crawler",
    index: "06",
    name: "On Bir VPN — V2Ray Crawler",
    atlasName: "V2Ray Crawler",
    kind: "Automation pipeline · network tooling",
    period: "Oct 2025 – Oct 2026",
    status: "Maintained across a year · public subscription output",
    repoName: "aghrabooti/V2ray_crawler",
    repoUrl: "https://github.com/aghrabooti/V2ray_crawler",
    demoUrl: "https://v2ray-crawler.vercel.app",
    demoLabel: "Config browser (Vercel)",
    summary:
      "A four-stage automation pipeline: harvest proxy configurations from public Telegram channels, prove each one works by driving a real Xray core, publish the survivors as a subscription file, and serve them through a backend-free website and a Telegram bot.",
    role: "Sole developer, 164 commits over a year — including building the delivery bot twice, in Python and then in TypeScript on Cloudflare Workers.",
    stack: ["Python", "Xray-core & sing-box", "BeautifulSoup", "GeoIP", "Leaflet", "grammY", "Cloudflare Workers + D1"],
    atlas: { x: 318, y: 606 },
    featured: true,
    lede: "Public channels post thousands of proxy configs; most are dead, duplicated, or so slow they're useless. The interesting problem isn't collecting them — it's knowing, with evidence, which ones work right now. This pipeline's answer: don't trust the URI, run it.",
    problem:
      "A proxy config is just a URI — syntactically valid says nothing about whether the server exists, accepts the credentials, or exits in the country it claims. Lists that republish configs unchecked rot within hours. To publish a subscription worth using, every candidate has to complete a real connection through a real core, and previously-good configs have to keep re-earning their place.",
    architecture: [
      {
        name: "Collector — incremental scraping",
        detail:
          "Reads public channel web previews (t.me/s/…) with no Telegram login, extracts config URIs, deduplicates, and caps output. A state file records the last processed message ID per channel, so runs are incremental instead of re-scraping history.",
      },
      {
        name: "Tester — the 1,500-line core of it",
        detail:
          "Hand-written parsers turn VMess, VLESS, Trojan, and Shadowsocks URIs into Xray outbound JSON. Each candidate is validated with xray run -test, then exercised for real: an isolated Xray process per config, an actual request through the local SOCKS inbound, latency measurement, and exit-IP country detection. Survivors are sorted by latency and renamed with flag and date; the previous subscription is re-tested in the same pass and dead entries are evicted. A parallel 1,476-line tester does the same job against the sing-box core.",
      },
      {
        name: "Publication — GitHub as the CDN",
        detail:
          "The pipeline's output is a text file committed to the repo (crawler/sublink.txt). Everything downstream reads it from raw.githubusercontent.com — there is no server to run, patch, or pay for.",
      },
      {
        name: "Website — zero backend",
        detail:
          "A static page fetches the subscription, lets visitors filter by exit country, copy configs in one click, and see the exit distribution on a Leaflet map.",
      },
      {
        name: "Bot — built twice",
        detail:
          "The Python bot (python-telegram-bot) serves configs from an inline menu and watches the subscription file to broadcast updates. The TypeScript rewrite runs on Cloudflare Workers with grammY, a D1 user store, and a five-minute cron — same product, serverless shape.",
      },
    ],
    diagram: {
      caption:
        "The README's own architecture, redrawn. The tester is the quality gate: configs enter as claims and leave as measurements, and the previously published list is continuously re-audited.",
      columns: [
        {
          heading: "Source",
          boxes: [{ title: "Public Telegram channels", detail: "t.me/s web previews" }],
        },
        {
          heading: "Collect",
          boxes: [{ title: "collector.py", detail: "incremental · dedupe · capped" }],
        },
        {
          heading: "Prove",
          boxes: [{ title: "test_configs.py", detail: "isolated Xray per config · latency · GeoIP exit", accent: true }],
        },
        {
          heading: "Publish",
          boxes: [{ title: "sublink.txt", detail: "committed to GitHub" }],
        },
        {
          heading: "Serve",
          boxes: [
            { title: "Static website", detail: "country filter · Leaflet map" },
            { title: "Telegram bot", detail: "Python · Workers/D1 rewrite" },
          ],
        },
      ],
      edgeLabels: ["scrape", "candidates", "survivors only", "raw file"],
    },
    decisions: [
      {
        title: "Test the proxy, not the promise",
        detail:
          "Parsing a URI successfully only proves the parser agrees with itself. Every config earns publication via a live handshake through the actual Xray core — the same instinct as ParsiChin's headless-browser audit: verify in the real engine, not a simulation of it.",
      },
      {
        title: "Process isolation per config",
        detail:
          "Each candidate gets its own Xray process. Slower than batching, but one malformed or hostile config can't hang or poison the run — and port/state cleanup is just process teardown.",
      },
      {
        title: "A committed text file as the distribution layer",
        detail:
          "Both consumers (site, bots) read one raw file from GitHub. Version history, rollback, and CDN come free; the “API” is a URL in the README. The constraint — write path is a git commit — is acceptable at this cadence and eliminates a whole class of hosting problems.",
      },
    ],
    hardProblems: [
      {
        title: "Four URI dialects, none of them tidy",
        detail:
          "Base64-JSON VMess, query-string VLESS with transport options, Trojan, SIP002 Shadowsocks — each with its own encoding quirks — normalised into one internal outbound model by dedicated parsers (~550 of the tester's 1,500 lines are parsing).",
      },
      {
        title: "A published list that wants to rot",
        detail:
          "Free endpoints die constantly. The tester merges the previous subscription into every run, re-tests it, and evicts failures — publication is a continuous audit, not an append-only log. Latency sorting puts the currently-fastest first.",
      },
    ],
    evidence: [
      { label: "Tester implementations", value: "Xray 1,502 lines · sing-box 1,476 lines" },
      { label: "Protocols parsed", value: "VMess · VLESS · Trojan · Shadowsocks" },
      { label: "Delivery bot", value: "2 implementations (Python · TypeScript/Workers + D1)" },
      { label: "Lifetime", value: "Oct 2025 → Oct 2026 · 164 commits" },
    ],
    limitations: [
      "Sequential testing bounds throughput — isolation per config means a full audit is minutes, not seconds. (The README documents this and other limits plainly.)",
      "Collection depends on public channel web previews remaining available; if Telegram changes that surface, the first stage needs rework.",
      "The repository carries its own legal/educational-use notice; this case study describes the engineering, nothing more.",
    ],
  },
  {
    slug: "reversi-bot",
    index: "07",
    name: "Othello on Telegram",
    atlasName: "Othello Bot",
    kind: "Telegram game bot",
    period: "Feb 2026",
    status: "Complete · MIT licensed",
    repoName: "aghrabooti/talegram-bot-reversi-game",
    repoUrl: "https://github.com/aghrabooti/talegram-bot-reversi-game",
    summary:
      "A complete two-player Othello (Reversi) game played entirely on Telegram inline keyboards — persistent games, live board updates for both players, and a beginner AI when no friend is online.",
    role: "Sole author, 13 commits. The smallest complete system here — included because “finished and clean” at small scale says something the big systems can't.",
    stack: ["Python", "python-telegram-bot", "SQLite", "Inline keyboards"],
    atlas: { x: 660, y: 622 },
    featured: false,
    lede: "An 8×8 board game inside a chat app has no canvas, no WebSocket, and no client state — just edited messages and buttons. Making that feel like a real-time game for two people is a neat, self-contained engineering problem.",
    problem:
      "Telegram bots communicate by sending and editing messages. A two-player board game needs shared state, turn enforcement, move validation with Othello's flank-and-flip rules, and both players' views kept in sync — all through an API designed for chat, where the “UI” is a grid of buttons attached to a message.",
    architecture: [
      {
        name: "Pure game logic, separate from transport",
        detail:
          "game_logic.py owns the board — legal moves, flipping, win detection — with no Telegram types in it. bot.py translates between callbacks and moves; keyboards.py renders the board as an inline keyboard; database.py persists games in SQLite so a restart doesn't forfeit everyone's match; stats.py tracks results; ai_player.py provides the solo opponent.",
      },
      {
        name: "Edited-message rendering",
        detail:
          "Each move re-renders the board by editing the game message for both players, giving the feel of a live board within the Bot API's constraints. Works in private chats and groups.",
      },
    ],
    decisions: [
      {
        title: "Keep the rules engine UI-agnostic",
        detail:
          "Even at this size, the module split means the flipping logic can be tested and read without a bot token or a chat — the same separation the bigger bots in this portfolio rely on, in miniature.",
      },
    ],
    hardProblems: [
      {
        title: "State synchronisation through a chat API",
        detail:
          "Two players, one board, no push channel except message edits. The game row in SQLite is the single source of truth; every callback re-validates the move against it, so stale button taps from an old board rendering can't corrupt the game.",
      },
    ],
    evidence: [
      { label: "Modules", value: "7 (logic · AI · storage · UI · stats …)" },
      { label: "Codebase", value: "≈ 33 KB of Python" },
      { label: "Commits", value: "13, single author" },
    ],
    limitations: [
      "The AI is explicitly a beginner opponent — it exists so the game is playable solo, not to challenge experienced players.",
    ],
  },
  {
    slug: "breast-cancer-ml",
    index: "08",
    name: "Breast Cancer Detection — ML Study",
    atlasName: "Cancer ML",
    kind: "Machine learning notebook",
    period: "Jun 2026",
    status: "Complete study · MIT licensed",
    repoName: "aghrabooti/breast-cancer-detection-ml",
    repoUrl: "https://github.com/aghrabooti/breast-cancer-detection-ml",
    summary:
      "A scikit-learn study on the Wisconsin breast cancer dataset: careful preprocessing, four model families compared head-to-head, and evaluation weighted toward the error that matters — false negatives.",
    role: "Sole author. A methodology exercise rather than a product; included as the one data-science point on the map.",
    stack: ["Python", "scikit-learn", "pandas", "Jupyter"],
    atlas: { x: 128, y: 606 },
    featured: false,
    lede: "Not everything on the map is a deployed system. This notebook is a compact, end-to-end classification study — valuable here less for its (well-trodden) dataset than for how it's worked: distributions examined before models, outliers handled deliberately, and the metric discussion led by the cost of missing a malignant case.",
    problem:
      "The Wisconsin dataset asks a clean question — benign or malignant, from 30 numeric cell features across 569 samples — which makes it a good place to practice the unglamorous 80% of ML: understanding the data before touching a model, and choosing evaluation criteria that reflect that the two error types are not equally bad.",
    architecture: [
      {
        name: "Exploration first",
        detail:
          "Feature distributions, boxplot outlier inspection, normality checks, and a Pearson correlation matrix precede any modelling — several of the 30 features are near-duplicates of each other, which matters for model choice.",
      },
      {
        name: "Deliberate preprocessing",
        detail:
          "IQR-based outlier capping rather than deletion (the dataset is only 569 rows), StandardScaler for the distance-sensitive models, and a stratified 80/20 split so class balance survives into both sets.",
      },
      {
        name: "Four model families, one scoreboard",
        detail:
          "Decision Tree, Naive Bayes, and Logistic Regression as supervised candidates, with K-Means as an unsupervised cross-check on whether the classes separate naturally. All judged on confusion matrices with precision, recall, and F1 — with explicit focus on false negatives.",
      },
    ],
    decisions: [
      {
        title: "Lead with the false-negative rate",
        detail:
          "Accuracy is the easy headline and the wrong one: on a cancer screen, a missed malignant case costs more than a false alarm. The evaluation section is organised around that asymmetry instead of a single leaderboard number.",
      },
    ],
    hardProblems: [
      {
        title: "Small data, correlated features",
        detail:
          "569 rows and blocks of highly correlated measurements punish careless splits and unscaled distance-based models. Stratification, capping instead of dropping, and scaling are the notebook's answers — boring, correct moves.",
      },
    ],
    evidence: [
      { label: "Dataset", value: "Wisconsin (569 samples · 30 features)" },
      { label: "Models compared", value: "Decision Tree · Naive Bayes · Logistic Regression · K-Means" },
      { label: "Commits", value: "6, single author" },
    ],
    limitations: [
      "A single small benchmark dataset and a notebook format: this is a study of method, not a clinical tool or a production model, and it doesn't pretend otherwise.",
    ],
  },
];

/* ---------------- Systems Atlas topology ----------------
 * Hubs are shared technologies / concepts. An edge exists only where the
 * repository itself evidences the connection — see each label.
 */

export interface Hub {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
}

export const hubs: Hub[] = [
  { id: "persian-layer", label: "Persian-first layer", sub: "RTL · Jalali · fa locale", x: 600, y: 168 },
  { id: "sqlite-family", label: "SQLite family", sub: "SQLite · libSQL · D1", x: 420, y: 382 },
  { id: "telegram-platform", label: "Telegram as a platform", sub: "python-telegram-bot · grammY", x: 716, y: 448 },
  { id: "supabase", label: "Supabase backend", sub: "Postgres · Edge Functions", x: 852, y: 252 },
];

export interface AtlasEdge {
  a: string; // project slug or hub id
  b: string;
  label: string;
  direct?: boolean; // project ↔ project
}

export const atlasEdges: AtlasEdge[] = [
  // Persian-first layer
  { a: "koogymaa", b: "persian-layer", label: "Hand-written Jalali calendar + fa/en RTL UI" },
  { a: "parsichin", b: "persian-layer", label: "Exists to fix Persian text direction" },
  { a: "nikmanesh-bot", b: "persian-layer", label: "Persian UI · Jalali-filtered exports" },
  { a: "azizi-store", b: "persian-layer", label: "Persian storefront, Toman pricing" },
  { a: "azizi-bot", b: "persian-layer", label: "Persian content model, Excel-safe CSV" },
  // SQLite family
  { a: "koogymaa", b: "sqlite-family", label: "libSQL (Turso / local SQLite file)" },
  { a: "nikmanesh-bot", b: "sqlite-family", label: "SQLite · nightly file backups" },
  { a: "azizi-bot", b: "sqlite-family", label: "SQLite · backup/restore in admin" },
  { a: "reversi-bot", b: "sqlite-family", label: "SQLite game persistence" },
  { a: "v2ray-crawler", b: "sqlite-family", label: "Cloudflare D1 (SQLite) user store" },
  // Telegram platform
  { a: "nikmanesh-bot", b: "telegram-platform", label: "python-telegram-bot v22, async" },
  { a: "azizi-bot", b: "telegram-platform", label: "python-telegram-bot 22.8, pinned" },
  { a: "reversi-bot", b: "telegram-platform", label: "Inline-keyboard game UI" },
  { a: "v2ray-crawler", b: "telegram-platform", label: "Delivery bots: PTB + grammY" },
  // Supabase
  { a: "azizi-store", b: "supabase", label: "Postgres + 36 Edge Functions" },
  { a: "azizi-bot", b: "supabase", label: "Catalogue synced from the store's Supabase" },
  // Direct project ↔ project
  { a: "azizi-store", b: "azizi-bot", label: "One academy, two surfaces — store + its companion bot", direct: true },
  { a: "v2ray-crawler", b: "breast-cancer-ml", label: "Python data tooling (pipelines, not interfaces)", direct: true },
];

/* ---------------- Engineering notes ----------------
 * Short, evidence-based notes derived from the code above — not a blog,
 * and not presented as published articles.
 */

export interface Note {
  id: string;
  title: string;
  body: string;
  source: string;
  sourceSlug: string;
}

export const notes: Note[] = [
  {
    id: "N-01",
    title: "Direction is a content problem",
    body: "Browsers guess text direction from the first strong character; a Persian paragraph that opens with “API” is therefore laid out backwards. ParsiChin v0.1.0 trusted dir=\"auto\" and its jsdom tests were green while real pages rendered wrong. The fix was twofold: decide direction once per block from letter/word content — and verify in a real layout engine. A headless-Chromium probe suite (174 checks) reported 61 failures in v0.1.0 and 0 after the rewrite. Lesson that generalises: if your claim is about rendering, your test needs a renderer.",
    source: "Derived from ParsiChin — docs/rtl-audit.md",
    sourceSlug: "parsichin",
  },
  {
    id: "N-02",
    title: "Pages as data",
    body: "Chat-bot interfaces rot when every screen is a handler function that hard-codes its neighbours. The Azizi bot's navigation service instead returns Page(text, rows, parent) — a value. Telegram renders it as inline keyboards on one edited message; a small preview site renders the same values as HTML. Consequences compound nicely: back-navigation needs no server-side history, the whole page graph can be clicked through in a browser, and 103 tests exercise the UI with no network at all.",
    source: "Derived from azizi-telegram-bot — bot/services/navigation.py",
    sourceSlug: "azizi-bot",
  },
  {
    id: "N-03",
    title: "SQLite is a deployment strategy",
    body: "Four of the systems on this map store state in the SQLite family — plain SQLite in the bots, libSQL/Turso in KooGYMaa, D1 in the Workers rewrite of the V2Ray bot. The payoff is operational, not ideological: the database is a file, so backup is “gzip it and send it to the admins' Telegram at midnight”, hosting works on a cPanel account, and dev/prod parity is free. Where the shape genuinely wanted managed Postgres — the Azizi store — Supabase is what's running. The tool follows the write pattern, not fashion.",
    source: "Derived from nikmanesh-telegram-bot, KooGYMaa, V2ray_crawler",
    sourceSlug: "nikmanesh-bot",
  },
  {
    id: "N-04",
    title: "Test the proxy, not the promise",
    body: "A proxy URI that parses proves nothing except that your parser agrees with itself. The V2Ray tester therefore refuses to publish on syntax: each candidate gets an isolated Xray process and must complete a real request through it, with latency and exit country measured, before it joins the subscription — and yesterday's list is re-audited every run. It is the same instinct as ParsiChin's browser audit, in a different domain: validate against the real engine, or don't call it validation.",
    source: "Derived from V2ray_crawler — crawler/test_configs.py",
    sourceSlug: "v2ray-crawler",
  },
];

/* Smaller public work that isn't part of the atlas. */
export const alsoOnGithub = [
  {
    name: "odin-recipes · landing-page",
    detail: "The Odin Project foundations — early HTML/CSS exercises, kept public.",
    url: "https://github.com/aghrabooti/landing-page",
  },
  {
    name: "Jalali-Chrome-Extention",
    detail: "An unfinished sketch of a Jalali-calendar popup — an early ancestor of the Persian-tooling thread that became ParsiChin.",
    url: "https://github.com/aghrabooti/Jalali-Chrome-Extention",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function connectionsFor(slug: string) {
  return atlasEdges
    .filter((e) => e.a === slug || e.b === slug)
    .map((e) => {
      const otherId = e.a === slug ? e.b : e.a;
      const project = getProject(otherId);
      const hub = hubs.find((h) => h.id === otherId);
      return { edge: e, project, hub };
    });
}
