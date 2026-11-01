# The Architecture of My Work — portfolio starter

A complete Next.js portfolio homepage with a 3D hero, systems map, project case-study index, engineering notes, skills, and contact section.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalize before publishing

Edit `data/portfolio.ts`:
- Replace `Your Name`, GitHub handle, and email.
- Verify every project description, stack, status, and metric against the actual repositories.
- Replace each project `href` with its exact repository or deployed case-study URL.
- Remove any metric you cannot substantiate.

The initial project descriptions and stats are editable starter content based on the portfolio direction discussed. They are not an independent audit of the repositories.

## Notes

- The 3D hero is client-rendered with React Three Fiber to avoid server-side WebGL issues.
- The atlas section below it is a responsive CSS relationship map and remains usable without WebGL.
- Google Fonts are loaded through CSS. For a fully self-hosted deployment, download and configure the fonts locally.
- Project detail pages are not included in this first homepage package; project links currently point to GitHub until you add verified case-study routes.
