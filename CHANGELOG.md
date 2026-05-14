# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] — 2025-05-14

### Added

- 400+ therapeutic daily reflection questions in English and Polish
- Daily question rotation based on day-of-year (same question for all users on the same day)
- Client-side EN/PL language detection and switching with `localStorage` persistence
- Light/dark mode toggle with system preference detection and no flash on load
- PWA support: web app manifest, service worker, generated icons (192px, 512px, Apple Touch)
- Open Graph and Twitter Card meta tags with generated 1200×630 OG image
- 404 page with bilingual support
- Fully static Astro build — no backend, no database, no user data collection
- ESLint + Prettier code quality tooling
- Husky pre-commit hooks with lint-staged
- GitHub Actions CI pipeline (format check, lint, typecheck, build)
- Netlify deployment configuration
