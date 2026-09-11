# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project Overview

Personal portfolio site for Dheeraj Reddy Bhumanapalli. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4, framer-motion, and lucide-react. Single page with sections: Hero, Projects, Experience, Contact. Deployed to GitHub Pages as a static export.

## Commands

```bash
npm run dev          # Local dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Lint (next lint)
npm run build:pages  # Static export for GitHub Pages (GITHUB_PAGES=true)
npm run deploy       # Build + push to gh-pages branch
```

There is no test suite. Verify changes with `npm run lint` and `npm run build`.

## Architecture

- `app/` — Next.js App Router: `layout.tsx`, `page.tsx`, `globals.css`
- `components/` — React components, one per file (Navbar, Hero, Projects, ProjectCard, Experience, ExperienceTimeline, Contact, FadeIn, SectionHeading, ThemeProvider)
- `data/portfolio.ts` — All site content (projects, experience, socials). Edit content here, not in components.
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge), `basePath`, `assetPath()`
- `public/` — Static assets (resume.pdf, profile_image.jpg, etc.)

## Conventions

- TypeScript strict mode; no runtime libraries outside those in `package.json`
- Use the `@/` path alias for all imports (e.g., `import { cn } from "@/lib/utils"`)
- Components use **named exports** (`export function Navbar()`), not default exports
- Merge conditional classes with `cn()` from `lib/utils.ts`
- Use `assetPath("/...")` from `lib/utils.ts` for asset URLs in `src`/`href` so GitHub Pages basePath is respected; plain relative paths are fine for `<next/image>` in `public/`
- Animations: framer-motion; reuse the `FadeIn` component for scroll/fade effects and respect `useReducedMotion`
- Icons: lucide-react only
- Dark mode: next-themes via `ThemeProvider`; use Tailwind's `dark:` variants
- Styling: Tailwind utility classes inline; no CSS modules
- Keep components small and section-focused; presentational content lives in `data/portfolio.ts`

## Deployment Notes

- GitHub Pages static export via `out/` directory (see `next.config.ts` for the `GITHUB_PAGES` env handling)
- `npm run deploy` runs `build:pages` then `gh-pages -d out --nojekyll`
- Do not introduce server-side features (API routes, server actions, middleware) — the site must remain a static export
