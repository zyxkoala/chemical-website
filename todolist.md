# New Product Import Todo

## Current Status

- `new-products/` contains product source images and same-name product Markdown-style text files.
- Product image text has been extracted with the multimodal model and saved into the corresponding product files under `new-products/`.
- Extracted parameters have been checked a second time against the source images.
- Extracted products have been added to `src/content/products.ts`.
- Product cards on the products page now use the shared sack image via `product-lldpe-bag`.
- Product detail hero images now use generated usage-scene assets under `public/images/products/`.
- Python OCR was not written or run.
- `.codex/skills/chemical-product-publisher/SKILL.md` now requires multimodal image extraction for product images, explicitly forbids Python OCR scripts/tooling for image recognition, and requires a second image-to-extraction verification pass before product data is used.
- No root-level `skill.md` exists in this repository; only `.codex/skills/chemical-product-publisher/SKILL.md` was found and updated.
- `src/content/products.ts` already contains `LDPE 951-000`.
- Three-column technical parameter rendering is already partially implemented:
  - `src/types/product.ts` supports `methodStandard?: LocalizedString`.
  - `src/components/product-detail/SpecsPanel.tsx` renders a third method-standard column when any spec has `methodStandard`.
  - `src/lib/i18n.ts`, `src/messages/en.json`, and `src/messages/zh.json` have related pending changes.

## Extracted Product Source Files

- `new-products/LDPE 951-00`
  - Source image: `new-products/LDPE 951-00.png`
  - Name: `LDPE 951-000`
  - Category: `ldpe`
- `new-products/LDPE 2426H`
  - Source image: `new-products/LDPE 2426H.png`
  - Name: `LDPE 2426H`
  - Category: `ldpe`
- `new-products/LDPE 2426K`
  - Source image: `new-products/LDPE 2426K.png`
  - Name: `LDPE 2426K`
  - Category: `ldpe`
- `new-products/LDPE 2520D`
  - Source image: `new-products/LDPE 2520D.png`
  - Name: `LDPE 2520D`
  - Category: `ldpe`
- `new-products/HDPE J50-10N5000`
  - Source images: `new-products/HDPE J50-10N5000.png`, `new-products/HDPE J50-10N5000其他信息.png`
  - Name: `HDPE J50-10N5000`
  - Category: `hdpe`
- `new-products/PP EP5076X`
  - Source image: `new-products/PP EP5076X.png`
  - Name: `PP EP5076X`
  - Category: `pp-impact`
- `new-products/PP EP548G`
  - Source image: `new-products/PP EP548G.png`
  - Name: `PP EP548G`
  - Category: `pp-impact`
- `new-products/PPR-MT26`
  - Source image: `new-products/PPR-MT26.png`
  - Name: `PPR-MT26`
  - Category: `pp-random`

## Added Products

- `ldpe-951-00`
- `ldpe-2426h`
- `ldpe-2426k`
- `ldpe-2520d`
- `hdpe-j50-10n5000`
- `pp-ep5076x`
- `pp-ep548g`
- `ppr-mt26`

## Verification

- `npx pnpm@9.12.0 vitest run src/lib/__tests__/products.test.ts` passed.
- `npx pnpm@9.12.0 lint` passed.
- `npx pnpm@9.12.0 verify` passed, including lint, all tests, placeholder checks, fake-stat checks, form checks, and production build.
- Local browser verification passed on `http://localhost:3001/zh/products/`, `ldpe-2426h`, and `pp-ep5076x`.
