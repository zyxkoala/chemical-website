---
name: chemical-product-publisher
description: Add new chemical/polymer products to the chemical-website project from supplied product images, multimodal image text extractions, parameter text files, or technical documents. Use when the user asks to extract product data, add a product under the correct products category, create or update product detail data, preserve technical parameter tables exactly, choose the correct product image pattern, and verify the local rendered product page.
---

# Chemical Product Publisher

Use this skill to add a new product to the `chemical-website` project. Work from the repository root, wherever it is located on the current machine.

## Core Rules

- Treat the supplied product file, image, or text extraction as the source of truth.
- Do not invent, infer, normalize, add, or delete parameter values.
- Read product images directly with a multimodal model for image text extraction.
- Do not write or run Python OCR scripts for product image recognition.
- After extracting product image text, perform a second multimodal pass against the source image and compare every extracted header, row, unit, limit/result value, method standard, product standard, date, batch number, and conclusion before using the data.
- Only keep values that are visible in the supplied source image or source text; do not carry over old stub wording as extracted image data unless it is also visible in the source being extracted.
- Verify ambiguous values against the source image before writing product data.
- Preserve units, min/max values, method standards, and product standards exactly as supplied.
- Preserve source table semantics, not just the numbers:
  - If a COA row has `质量指标 / Limits` = `报告`, display it as a reported limit/quality-indicator state and keep the separate detection result clear.
  - If a TDS row uses `典型值 / Typical value`, keep that wording in the displayed value so buyers do not read it as a guaranteed limit.
- Put the product under the most specific matching leaf category in `src/content/categories.ts`.
- Follow existing product patterns in `src/content/products.ts`.
- Use the site's shared product main image pattern unless the user explicitly asks otherwise.
  - Product listing, search-result, related-product, and featured-product card images should use the generated product design image from `heroImage` when available.
  - Product detail body images are product real-object images, not product design/marketing hero images.
  - For polymer product detail body/main images, default to the shared sack image via `image: 'product-lldpe-bag'`, which renders `/images/products/lldpe-bag.jpg`.
  - Only replace the sack image when the user additionally provides a real product photo or explicitly asks for another product body image.
  - Product design/marketing images may be used as `heroImage` for the top page hero, but must not be reused as the product real-object/body image by default.
  - Do not use scanned parameter-sheet images as the product main image unless explicitly requested.
- Keep unrelated user or repository changes intact.

## Workflow

1. Inspect inputs.

- Read the user-provided product text file, multimodal extraction result, or technical document.
- For `new-products/*.png`, inspect the image directly with a multimodal model and extract the visible text and tables from the image.
- Do not create Python OCR helpers or run Python OCR tooling for image recognition.
- Re-inspect the product image after writing the extraction and compare the saved product file against the image row by row. Fix omissions, column shifts, unit changes, copied stub text, and any normalized or invented values immediately.
- If a value cannot be confidently read, mark it as unclear instead of guessing.
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
- For temporary product data sheets or TDS tables with `典型值 / Typical value`, include `Typical value:` / `典型值：` in the value field.
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
- For COA rows with both `质量指标 / Limits` and `检测结果 / Results`, keep both in the value field as `Limit: ...; Result: ...` / `指标：...；结果：...`; the renderer can format `报告` rows for readability.
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
- Set generated product design images as `heroImage`; these are used by the top page hero and product cards such as featured products, search results, and related products.
- Treat the product detail body image as a real-object product image. For polymer products, set `image: 'product-lldpe-bag'` by default and keep generated product-design images in `heroImage` only.
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
