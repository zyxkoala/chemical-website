---
name: chemical-product-publisher
description: Add new chemical/polymer products to the chemical-website project from supplied product images, OCR text files, parameter text files, or technical documents. Use when the user asks to extract product data, add a product under the correct products category, create or update product detail data, preserve technical parameter tables exactly, choose the correct product image pattern, and verify the local rendered product page.
---

# Chemical Product Publisher

Use this skill to add a new product to the `chemical-website` project. Work from the repository root, wherever it is located on the current machine.

## Core Rules

- Treat the supplied product file, image, or text extraction as the source of truth.
- Do not invent, infer, normalize, add, or delete parameter values.
- If OCR is used, verify ambiguous values against the image before writing product data.
- Preserve units, min/max values, method standards, and product standards exactly as supplied.
- Put the product under the most specific matching leaf category in `src/content/categories.ts`.
- Follow existing product patterns in `src/content/products.ts`.
- Use the site's shared product main image pattern unless the user explicitly asks otherwise.
  - For polymer product detail hero/main images, prefer `/images/products/lldpe-bag.jpg` when matching existing product style.
  - Do not use scanned parameter-sheet images as the product main image unless explicitly requested.
- Keep unrelated user or repository changes intact.

## Workflow

1. Inspect inputs.

- Read the user-provided product text file or OCR result.
- Inspect the product image only to confirm unclear OCR values.
- Read nearby existing products in `src/content/products.ts` to match structure and tone.
- Read `src/types/product.ts`, `src/lib/i18n.ts`, and the relevant product detail components if the required parameter structure differs from current rendering.

2. Choose category.

- Map product family to the correct category:
  - LDPE products go under `ldpe`.
  - HDPE products go under `hdpe`.
  - LLDPE C4 products go under `lldpe-c4`.
  - LLDPE C6 products go under `lldpe-c6`.
  - PP products go under the matching PP leaf category.
- Confirm the route by checking the category path generated from `src/content/categories.ts`.

3. Add product data.

- Add a published `Product` object in `src/content/products.ts`.
- Use a stable slug based on the product grade, for example `ldpe-951-00`.
- Use the exact product name or grade from the source.
- Keep summary and overview minimal if the source only provides technical parameters.
- Leave `applications` and `packaging` empty if the source does not provide them.
- Set `published: true` and `placeholder: false`.
- Replace a matching placeholder only when adding the first real product in that leaf category.

4. Preserve technical parameters.

- If parameters are simple key/value specs, use normal `specs` rows:
  - `label`
  - `value`
- If the source has a table with method/test standards, represent each row with:
  - `label`: analysis item or standard name
  - `value`: concrete value including unit, min/max/range
  - `methodStandard`: the method/test standard

Example:

```ts
{
  label: { en: 'Pellet appearance', zh: '颗粒外观' },
  value: { en: '<=10 个/kg', zh: '<=10 个/kg' },
  methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
}
```

- Do not collapse table rows into long prose like `计量单位：...；最大值：...；方法标准：...`.
- Keep method/test standards in a separate third column when present.

5. Update rendering only if needed.

- If `methodStandard` is not supported yet, update:
  - `src/types/product.ts`
  - `src/lib/i18n.ts`
  - `src/components/product-detail/SpecsPanel.tsx`
  - `src/messages/en.json`
  - `src/messages/zh.json`
- Preserve old two-column rendering for products without `methodStandard`.
- Render three columns only when at least one spec row has `methodStandard`:
  - Specification / 标准
  - Value / 具体数值
  - Test standard / 测量标准

6. Product images.

- Use existing shared product visuals unless the user explicitly provides a product marketing/photo image.
- Do not use scanned parameter sheets as product main images.
- If a new image must be used by the website, place it under `public/images/products/`.
- Do not leave unused copied scan images in `public`.

7. Verify.

Run focused verification:

```powershell
.\node_modules\.bin\vitest.cmd run src/lib/__tests__/products.test.ts
```

Also verify the local rendered page when a dev server is running:

```powershell
Invoke-WebRequest -Uri 'http://localhost:3000/zh/products/<category-path>/<slug>/' -UseBasicParsing
```

Check for:

- The product appears at the expected route.
- The product image uses the intended shared image.
- Parameter values appear exactly as supplied.
- Method standards appear in the third column when applicable.
- Old prose-form parameter strings are absent.

8. Report back.

Summarize:

- Product slug and category.
- Files changed.
- Verification performed.
- Any verification that could not be completed.
- Any pre-existing unrelated test/type errors.
