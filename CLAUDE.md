# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (localhost:4321)
npm run build            # Production build → dist/
npm run preview          # Serve dist/ locally
npm run generate-icons   # Generate PWA icons + OG image from SVG (run before first build)
npm run lint             # ESLint (0 warnings allowed)
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier auto-format all files
npm run format:check     # Prettier check (used in CI)
npm run typecheck        # Astro type-check (astro check)
```

Full CI pipeline mirrors: `format:check` → `lint` → `typecheck` → `generate-icons` → `build`.

## Architecture

This is a **fully static Astro site** with no database, no server, no auth, and no user data collection. The entire app is a single page (`/`) with a 404 fallback.

### How the daily question works

`src/data/questions.ts` exports `QUESTIONS` (400+ items) and `getTodayQuestion()`. The function derives an index from the day-of-year modulo the array length — everyone sees the same question on the same calendar day, deterministically, without any server or state. The question rotates automatically at midnight local time.

### i18n (EN / PL)

There is **no Astro i18n integration**. Language switching is pure client-side JS in `src/pages/index.astro`:

- `localStorage('ky-lang')` persists the choice
- On first visit, browser language is detected via `navigator.language`
- Both `question.en` and `question.pl` are embedded in the page via `define:vars` at build time

### Theme (light / dark)

Handled entirely in `src/layouts/Layout.astro`:

- An inline `<script is:inline>` runs before paint to set `data-theme="dark"` on `<html>` if needed (prevents flash)
- CSS variables under `:root` (light) and `[data-theme="dark"]` (dark) define the full palette
- Toggle button writes to `localStorage('ky-theme')`

### PWA

- `public/manifest.json` — web app manifest
- `public/sw.js` — service worker (cache-first with network update)
- Icons (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) and `og-image.png` are **generated assets** — not source files. Run `npm run generate-icons` to (re)generate them from SVG defined inside `scripts/generate-icons.mjs`.

### Key constraint

`dist/` and generated PNG assets are gitignored. Netlify runs `generate-icons && build` on every deploy via `netlify.toml`.
