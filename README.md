# Portfolio — Dheeraj Reddy Bhumanapalli

A personal portfolio site built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. It is a fully static single-page application exported for hosting on **GitHub Pages**.

**Live site:** [https://dheerajreddybhumanapalli.github.io/](https://dheerajreddybhumanapalli.github.io/)

---

## Features

- Single-page layout with smooth in-page navigation (Home, Projects, Experience, Contact)
- Dark / light theme toggle with system preference support
- Scroll-triggered section highlighting in the navbar
- Expandable project cards with tech stack tags
- Vertical experience timeline
- Contact section with copy-to-clipboard
- Responsive design (mobile + desktop)
- SEO metadata and Open Graph tags
- Static export — no backend or database required

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Language | TypeScript |
| Hosting | GitHub Pages (`gh-pages` branch) |

---

## Prerequisites

- **Node.js** 18.18 or later (Node 20+ recommended)
- **npm** (comes with Node.js)
- A GitHub account (for deployment)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dheerajreddybhumanapalli/dheerajreddybhumanapalli.github.io.git
cd dheerajreddybhumanapalli.github.io
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server with hot reload |
| `npm run build` | Production static export for **local** preview |
| `npm run build:pages` | Production static export for **GitHub Pages** (same as `build`; kept for compatibility) |
| `npm run start` | Serve the `out/` folder locally after `npm run build` |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build for GitHub Pages and publish to the `gh-pages` branch |

### Local production preview

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** `next start` does **not** work with this project because it uses `output: "export"` (static HTML). Use `npm run start`, which serves the `out/` directory with `serve`.

### Development vs production preview vs deploy

| Goal | Command | URL |
|------|---------|-----|
| Active development | `npm run dev` | `http://localhost:3000/` |
| Test production build locally | `npm run build && npm run start` | `http://localhost:3000/` |
| Publish to GitHub Pages | `npm run deploy` | `https://dheerajreddybhumanapalli.github.io/` |

---

## Deploying to GitHub Pages

### One-time GitHub setup

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `(root)`

### Deploy from your machine

```bash
git checkout master
git pull origin master
npm run deploy
```

This runs:

1. `predeploy` → `npm run build:pages` — static export with no base path (user site is served from the domain root)
2. `deploy` → `gh-pages -d out --nojekyll` — pushes the `out/` folder to the `gh-pages` branch (the `--nojekyll` flag is required so GitHub Pages serves the `_next/` directory)

You should see `Published` when it succeeds. Allow 1–2 minutes for GitHub Pages to update.

### How the base path works

This repo is a user site (`<username>.github.io`), so GitHub Pages serves it from the domain root:

```
https://dheerajreddybhumanapalli.github.io/
```

That means `next.config.ts` uses **no `basePath` / `assetPrefix`**. (A `basePath` like `/portfolio` is only needed for project sites served at `<username>.github.io/<repo>/`.)

All static assets and links use `assetPath()` from `lib/utils.ts` so paths keep working if a base path is ever reintroduced.

---

## Project Structure

```
dheerajreddybhumanapalli.github.io/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonts, metadata, theme provider
│   ├── page.tsx            # Home page — composes all sections
│   └── globals.css         # Tailwind import + CSS custom properties (themes)
├── components/             # React components
│   ├── Navbar.tsx          # Sticky nav, theme toggle, mobile menu
│   ├── Hero.tsx            # Profile intro, CTA buttons
│   ├── Projects.tsx        # Projects section wrapper
│   ├── ProjectCard.tsx     # Expandable project card
│   ├── Experience.tsx      # Experience section wrapper
│   ├── ExperienceTimeline.tsx
│   ├── Contact.tsx         # Email/phone with copy buttons
│   ├── SectionHeading.tsx  # Reusable section title
│   ├── FadeIn.tsx          # Framer Motion scroll animation
│   └── ThemeProvider.tsx   # next-themes wrapper
├── data/
│   └── portfolio.ts        # Projects & experience content (edit here)
├── lib/
│   └── utils.ts            # cn(), assetPath(), basePath helpers
├── public/                 # Static assets (copied to out/ on build)
│   ├── profile_image.jpg
│   ├── resume.pdf
│   ├── favicon.ico
│   ├── robots.txt
│   └── .nojekyll           # Disables Jekyll on GitHub Pages
├── next.config.ts          # Static export + GitHub Pages config
├── postcss.config.mjs      # Tailwind PostCSS plugin
├── tsconfig.json           # TypeScript config (@/* path alias)
├── package.json
├── README.md
└── AGENTS.md               # Guide for AI coding agents
```

---

## Updating Content

### Projects and experience

Edit `data/portfolio.ts`. Each entry follows the `CardItem` interface:

```typescript
export interface Role {
  designation: string;   // Job title or tech stack
  duration: string;      // e.g. "Jan 2025 – Present"
  description: string[]; // Bullet points
}

export interface CardItem {
  title: string;
  roles: Role[];
}
```

After editing, run `npm run dev` to preview, then `npm run deploy` to publish.

### Contact info

Edit the `contactInfo` array in `components/Contact.tsx`.

### Hero section

Edit `components/Hero.tsx` for name, title, bio, and image.

### Resume and profile image

Replace files in `public/`:

- `public/resume.pdf`
- `public/profile_image.jpg`

### Site metadata (title, description)

Edit `export const metadata` in `app/layout.tsx`.

---

## Styling & Theming

- **Tailwind v4** is configured via `postcss.config.mjs` and imported in `app/globals.css`.
- Theme colors are CSS custom properties in `:root` (light) and `.dark` (dark).
- The accent color is emerald green (`--accent`).
- Fonts: **Inter** (body) and **JetBrains Mono** (mono), loaded via `next/font/google` in `app/layout.tsx`.
- Use `cn()` from `lib/utils.ts` to merge Tailwind class names.

---

## Git Branches

| Branch | Purpose |
|--------|---------|
| `master` | Source code (active development) |
| `gh-pages` | Built static site deployed by GitHub Pages (auto-updated by `npm run deploy`) |

---

## Troubleshooting

### `next start` fails with `output: export` error

Expected. This app is statically exported. Use:

```bash
npm run build && npm run start
```

### Blank page or broken styles on GitHub Pages

Make sure you deploy with `npm run deploy` so the `out/` folder is rebuilt and pushed to the `gh-pages` branch. If styles/JS are broken, open devtools and check for 404s under `_next/static/` — that usually means the deployed HTML references a stale `basePath` or the `--nojekyll` flag was missing.

### CSS/JS 404 — unstyled page or invisible content

GitHub Pages runs Jekyll by default, which **ignores folders starting with `_`** (like `_next/`). The deploy script must include `--nojekyll`:

```json
"deploy": "gh-pages -d out --nojekyll"
```

Without this, HTML loads but all `_next/static/` assets return 404, so Tailwind styles and React/Framer Motion never run.

### Assets 404 on GitHub Pages but work locally

Ensure links to static files use `assetPath()`:

```typescript
import { assetPath } from "@/lib/utils";

<img src={assetPath("/profile_image.jpg")} />
<a href={assetPath("/resume.pdf")}>Resume</a>
```

### GitHub Pages shows old content

- Hard-refresh the browser (Cmd+Shift+R / Ctrl+Shift+R)
- Confirm `gh-pages` branch was updated after deploy
- Wait 1–2 minutes for GitHub CDN cache

---

## License

Private project. All rights reserved.

## Author

**Dheeraj Reddy Bhumanapalli**  
Email: dheerajbhumanapalli@gmail.com
