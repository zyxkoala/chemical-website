# AOWATT Chemical Website

AOWATT Global Materials bilingual marketing site built with Next.js. The app is static-first, SEO-oriented, and currently ships public pages for Home, Products, Product Detail, Contact, Privacy, and Disclaimer.

## Required Project Files

```txt
chemical-website/
├── src/                 # App routes, components, content, i18n, tests
├── public/              # Runtime public assets
├── scripts/             # Verification scripts used by package.json
├── package.json         # Service scripts and dependencies
├── pnpm-lock.yaml       # Locked dependency versions
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── vitest.config.ts
```

## Development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm test
pnpm run check:placeholders
pnpm run check:no-fake-stats
pnpm run check:no-forms
pnpm build
```

Or run the full suite:

```bash
pnpm verify
```

Feature visibility is controlled in `src/config/features.ts`. Product data lives in `src/content/products.ts`, localized UI strings live in `src/messages`, and runtime images belong under `public`.
