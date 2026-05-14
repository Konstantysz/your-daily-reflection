# Your Daily Reflection

A daily wellbeing app that presents one open-ended reflection question per day to support self-awareness and self-esteem — designed for people in therapy or anyone seeking deeper self-understanding.

**Live:** [your-daily-reflection.netlify.app](https://your-daily-reflection.netlify.app)

## How it works

- Every day, one question from a bank of 400+ therapeutic prompts is shown
- The question is the same for all users on a given day, derived deterministically from the date
- No answers are collected — users reflect privately or in their own journal
- Available in **English** and **Polish**, auto-detected from browser language

## Features

- PWA — installable, works offline
- Light / dark mode with system preference detection
- Fully accessible (ARIA, keyboard navigation, reduced motion)
- Zero trackers, zero analytics, zero user data

## Development

```bash
npm install
npm run generate-icons   # required before first build
npm run dev              # localhost:4321
npm run build            # production build → dist/
```

**Other commands:**

```bash
npm run lint             # ESLint
npm run format           # Prettier
npm run typecheck        # Astro type-check
```

## Adding questions

Edit `src/data/questions.ts`. Each question requires an `en` string, a `pl` string, and a `category`.

## Deployment

The app deploys to Netlify automatically on every push to `main`. The `netlify.toml` runs `generate-icons` and `build` on each deploy.

## License

[MIT](LICENSE)
