export const profile = {
  name: "Your Name",
  role: "Software Developer",
  handle: "aghrabooti",
  github: "https://github.com/aghrabooti",
  email: "",
  githubSince: "2021",
};

export const stats = [
  { value: "08", label: "Systems mapped and documented", tag: "SYS.MAP" },
  { value: "300+", label: "Automated tests across repositories", tag: "CI.SUITE" },
  { value: "04", label: "Telegram bots built for real workflows", tag: "PROD.BOT" },
  { value: "FA + EN", label: "Persian and English interfaces", tag: "BIDI.RTL" },
];

export const projects = [
  {
    id: "koogymaa",
    code: "SYS.001",
    name: "KooGYMaa",
    category: "Full-stack platform",
    status: "FEATURED",
    description:
      "A gym-management platform built around operational workflows, authentication, administration, and reliable data handling.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "API"],
    role: "Product engineering · Full-stack development",
    accent: "cyan",
    featured: true,
    href: "https://github.com/aghrabooti",
  },
  {
    id: "telegram-systems",
    code: "SYS.002",
    name: "Telegram systems",
    category: "Automation infrastructure",
    status: "IN PRODUCTION",
    description:
      "Bots that support real academy operations, including registration flows, user communication, and high-volume message handling.",
    stack: ["Python", "Telegram Bot API", "Queues", "Linux"],
    role: "Backend engineering · Automation",
    accent: "blue",
    featured: true,
    href: "https://github.com/aghrabooti",
  },
  {
    id: "parsichin",
    code: "SYS.003",
    name: "ParsiChin",
    category: "Persian-language tooling",
    status: "ENGINEERING",
    description:
      "A focused RTL and Persian-language tooling project addressing bidirectional text and localization details at the interface level.",
    stack: ["JavaScript", "RTL", "Unicode", "UI"],
    role: "Frontend engineering · Text systems",
    accent: "lime",
    featured: true,
    href: "https://github.com/aghrabooti",
  },
  {
    id: "azizi-store",
    code: "SYS.004",
    name: "Azizi store",
    category: "Web platform",
    status: "SHIPPED",
    description:
      "A Persian-facing commerce experience with a focus on practical workflows, responsive interfaces, and localized product data.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "RTL"],
    role: "Full-stack development",
    accent: "cyan",
    featured: true,
    href: "https://github.com/aghrabooti",
  },
  {
    id: "tutorial-platform",
    code: "SYS.005",
    name: "Tutorial platform",
    category: "Learning platform",
    status: "BUILDING",
    description:
      "A course-oriented web application exploring structured content, authentication, and a maintainable application foundation.",
    stack: ["Next.js", "Supabase", "SQL", "Docker"],
    role: "Application development",
    accent: "blue",
    featured: false,
    href: "https://github.com/aghrabooti",
  },
  {
    id: "browser-tools",
    code: "SYS.006",
    name: "Browser tools",
    category: "Developer utilities",
    status: "EXPERIMENTAL",
    description:
      "Small browser-facing utilities designed to reduce repetitive work and make focused workflows easier to operate.",
    stack: ["JavaScript", "Browser APIs", "HTML", "CSS"],
    role: "Frontend engineering",
    accent: "lime",
    featured: false,
    href: "https://github.com/aghrabooti",
  },
];

export const notes = [
  {
    id: "NOTE.01",
    title: "Localization is an architectural constraint",
    body: "RTL layout, bidirectional text, Jalali dates, and local payment flows affect data models and component boundaries—not just translated labels.",
    source: "ParsiChin",
    project: "parsichin",
  },
  {
    id: "NOTE.02",
    title: "A bot is an operations system",
    body: "Once real users depend on a bot, delivery guarantees, rate limits, retries, and observability become product requirements.",
    source: "Telegram systems",
    project: "telegram-systems",
  },
  {
    id: "NOTE.03",
    title: "Evidence beats impressive numbers",
    body: "A useful engineering claim should be traceable to a repository, a test, a reproducible browser check, or a production workflow.",
    source: "KooGYMaa",
    project: "koogymaa",
  },
  {
    id: "NOTE.04",
    title: "Operational simplicity is a feature",
    body: "A system is easier to maintain when deployment, configuration, and failure states are understandable without tribal knowledge.",
    source: "Tutorial platform",
    project: "tutorial-platform",
  },
];

export const skillGroups = [
  {
    index: "01",
    title: "Application architecture",
    detail: "Turning requirements into maintainable application boundaries.",
    items: ["Next.js", "React", "REST APIs", "Authentication"],
  },
  {
    index: "02",
    title: "Backend systems",
    detail: "Building services that handle real workflows and failure cases.",
    items: ["Python", "Node.js", "PostgreSQL", "Queues"],
  },
  {
    index: "03",
    title: "Interface engineering",
    detail: "Interfaces shaped around actual users, language, and directionality.",
    items: ["TypeScript", "RTL", "Responsive UI", "Accessibility"],
  },
  {
    index: "04",
    title: "Delivery and reliability",
    detail: "Testing, deployment, and operational feedback loops.",
    items: ["Docker", "Git", "Automated tests", "Linux"],
  },
];
