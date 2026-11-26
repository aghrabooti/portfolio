export const profile = {
  name: "Parham Afzal",
  born: "September 2004",
  education: "Bachelor’s degree in Computer Engineering, Semnan University",
  experience: ["Tamland", "Tizgam"],
  handle: "aghrabooti",
  github: "https://github.com/aghrabooti",
};

export const projects = [
  {
    id: "koogymaa",
    name: "KooGYMaa",
    category: "Gym management",
    description: "I built a web app for gym operations, coaching, and member progress. The site is available in English and Persian.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    screenshot: {
      src: "/projects/koogymaa.webp",
      width: 1903,
      height: 923,
      alt: "KooGYMaa homepage with an overview of gym metrics and a weekly activity chart",
    },
  },
  {
    id: "telegram-systems",
    name: "Telegram bots",
    category: "Academy automation",
    description: "I used Telegram for academy sign-ups and messages. Students could register and hear from the academy in the same app.",
    stack: ["Python", "Telegram Bot API"],
  },
  {
    id: "parsichin",
    name: "ParsiChin",
    category: "Persian text tooling",
    description: "I worked on how Persian and English sit next to each other in an interface, where text can run in both directions within a single line.",
    stack: ["JavaScript", "Unicode", "RTL"],
  },
  {
    id: "azizi-store",
    name: "Azizi Academy",
    category: "Education website",
    description: "I built a Persian-language website for a math academy. Students can browse course packages for grades 9 through 12.",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    screenshot: {
      src: "/projects/azizi-academy.webp",
      width: 1919,
      height: 926,
      alt: "Azizi Academy’s right-to-left homepage introducing its math courses",
    },
  },
] as const;

export const skills = [
  { name: "Next.js & React", logos: ["nextdotjs", "react"], description: "I used Next.js to build the KooGYMaa web app for gym operations, coaching, and member progress.", project: "KooGYMaa", href: "#koogymaa" },
  { name: "TypeScript", logos: ["typescript"], description: "I used TypeScript alongside Next.js in KooGYMaa to check types as I worked on the web app.", project: "KooGYMaa", href: "#koogymaa" },
  { name: "Python & Telegram", logos: ["python", "telegram"], description: "I used Python and the Telegram Bot API to handle academy sign-ups and messages directly in Telegram.", project: "Telegram bots", href: "#telegram-systems" },
  { name: "PostgreSQL & Supabase", logos: ["postgresql", "supabase"], description: "I used Supabase and PostgreSQL for the data layer of the Azizi Academy site.", project: "Azizi Academy", href: "#azizi-store" },
  { name: "Responsive Web Design", logos: [], description: "I designed the Azizi Academy site so students could browse the course packages on desktop and smaller screens.", project: "Azizi Academy", href: "#azizi-store" },
  { name: "RTL & Unicode", logos: ["unicode"], description: "I used Unicode bidirectional text and RTL layout in ParsiChin to make Persian sentences containing English words easier to read.", project: "ParsiChin", href: "#parsichin" },
] as const;
