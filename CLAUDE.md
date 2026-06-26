# AOWATT Chemical Website — Development Guide

## Project Overview

Chemical B2B company website (AOWATT Global Materials). Static Next.js site deployed on Vercel.
Domain: aowatt.com.au | Stack: Next.js App Router + TypeScript + Tailwind CSS + next-intl

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (static export)
- `pnpm lint` — ESLint
- `pnpm check:placeholders` — scan for [PLACEHOLDER] content

## Design Tokens (from Figma)

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#010912` | Header bg, Footer bg, dark surfaces |
| `navy-deep` | `#091C1C` | Hero title, section headings, body dark text |
| `gold` | `#F09F14` | Accents, gold rules, active nav underline, footer headings, icon strokes |
| `blue-primary` | `#053B7D` | Primary button fill, primary CTA |
| `gray-body` | `#5C667A` | Subtitle text, body copy, muted descriptions |
| `gray-light` | `#D1E0F0` | Footer links, light text on dark |
| `white` | `#FFFFFF` | Page backgrounds, card fills, button text on primary |
| `border-light` | `#DBE0EB` | Input borders, card strokes |

### Typography

All text uses **Inter** font family.

| Role | Weight | Size | Line Height |
|------|--------|------|-------------|
| Hero Title | Bold (700) | 56px | 68px |
| Page Title (inner pages) | Bold (700) | 52px | 62px |
| Section Heading | Bold (700) | 34px | 42px |
| Card Title / Category Name | Semi Bold (600) | 19px | 25px |
| Card Subtitle / Why Title | Semi Bold (600) | 17px | 24px |
| Body / Why Body | Regular (400) | 15px | 23px |
| Subtitle | Regular (400) | 19px | 30px |
| Nav / Button Label | Semi Bold (600) | 15-16px | 20-22px |
| Footer Links | Regular (400) | 15px | 26px |
| Small / Footer Summary | Regular (400) | 15px | 24px |
| Legal Strip | Regular (400) | 13px | 18px |

### Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `page-max` | 1440px | Max content width |
| `section-px` | 80px | Horizontal section padding (desktop) |
| `header-h` | 96px | Header height (consistent across all pages) |
| `header-px` | 78px | Header horizontal padding |
| `footer-pt` | 56px | Footer top padding |
| `footer-pb` | 48px | Footer bottom padding |
| `footer-gap` | 24px | Footer column gap |
| `hero-pt` | 72px | Hero top padding |
| `hero-pb` | 64px | Hero bottom padding |
| `card-radius` | 7px | Card corner radius |
| `button-radius` | 4px | Button corner radius |
| `button-h` | 48px | Button height |
| `button-px` | 26px | Button horizontal padding |
| `gold-rule-w` | 54px | Section heading gold rule width |
| `gold-rule-h` | 3px | Section heading gold rule height |

### Buttons

- **Primary** (blue): bg `#053B7D`, text white, rounded 4px, h=48, px=26, font 15px Semi Bold
- **Secondary** (outline gold): bg white, border `#F09F14` 1px, text dark, rounded 4px, h=48, px=26
- **Arrow suffix**: all CTAs append ` →` after label text

## Architecture Rules

### Page Height
- Pages are NOT fixed height. Content flows naturally, no min-height on main content area.
- Short pages (Contact) naturally end sooner. Long pages (Products) scroll.
- Only Header and Footer have fixed heights.

### Header (MUST be identical on all pages)
- Height: 96px, bg: navy (#010912)
- Logo left (288×116), divider (1px × 64px), nav items (Home / Products / Contact), spacer, Language Switch right
- Active nav item: gold underline (3px tall) below text
- Horizontal padding: 78px

### Footer (MUST be identical on all pages)
- bg: navy (#010912), padding: 80px horizontal, 56px top, 48px bottom
- 3 columns: Brand (logo + tagline), Products (links), Contact (links)
- Column gap: 24px
- Below: Footer Bottom Strip (bg slightly darker #000D0D, gold hairline 1px top)
  - Left: `© {year} AOWATT Global Materials` (13px, gray)
  - Right: `Privacy · Disclaimer` links (13px, light gray)

### Responsive Breakpoints
- Desktop: ≥1024px (3-column grids, full layout)
- Tablet: 768px–1023px (2-column grids, reduced padding)
- Mobile: <768px (1-column, padding 24px, stacked layout)
- Minimum: 360px (no horizontal scroll)

### Section Pattern
- All content sections: max-width 1440px, px-80 (desktop), centered
- Section heading: centered, 34px Bold, with 54×3px gold rule below (centered, gap 10px)

## File Structure

```
src/
  app/[locale]/         — route-level i18n pages
  components/layout/    — Header, Footer (shared, identical everywhere)
  components/home/      — Home page sections
  components/products/  — Products/detail components
  components/contact/   — Contact components
  components/ui/        — Reusable: Button, SectionHeading, Card
  config/features.ts    — Page enable/disable flags
  content/              — Product/category data files
  lib/                  — Data access layer, i18n, seo utilities
  messages/             — en.json, zh.json
  types/                — TypeScript type definitions
```

## Coding Conventions

- Tailwind CSS for all styling. No CSS modules or styled-components.
- Use Tailwind theme tokens defined in tailwind.config.ts (not arbitrary values) for brand colors/spacing.
- Components: function components, named exports, one component per file.
- All user-facing text from `messages/{locale}.json` via next-intl `useTranslations()`.
- Product/category data via `lib/products.ts` and `lib/categories.ts` access functions.
- Images: Next.js `<Image>` component, always provide `alt` and `sizes`.
- No inline styles. No `!important`.
- Mobile-first responsive: base styles for mobile, `md:` for tablet, `lg:` for desktop.

## Do Not

- Do NOT hardcode product data in page components (use data access layer).
- Do NOT add features beyond V0.1 scope (no forms, no API routes, no Supabase).
- Do NOT use `figma.notify()` or any Figma-specific calls in web code.
- Do NOT create pages for disabled features (Why Us / About / Applications) in navigation or sitemap.
- Do NOT render document download chips (COA/SDS/TDS) — V0.1 doesn't show them.
- Do NOT use fake statistics (years in business, countries served, customer count).
