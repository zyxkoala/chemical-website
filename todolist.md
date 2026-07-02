# New Product Import Todo

## Current Status

- `new-products/` contains product source images and same-name text stubs.
- `src/content/products.ts` already contains `LDPE 951-000`.
- Three-column technical parameter rendering is already partially implemented:
  - `src/types/product.ts` supports `methodStandard?: LocalizedString`.
  - `src/components/product-detail/SpecsPanel.tsx` renders a third method-standard column when any spec has `methodStandard`.
  - `src/lib/i18n.ts`, `src/messages/en.json`, and `src/messages/zh.json` have related pending changes.
- Product images were read with multimodal model extraction, not Python OCR.
- Windows sandbox writes failed with `CreateProcessWithLogonW failed: 1385`, so the remaining product data and skill edits were not written here.

## Already Added

- `ldpe-951-00`
  - Name: `LDPE 951-000`
  - Category: `ldpe`
  - Source: `new-products/LDPE 951-00.png` and `new-products/LDPE 951-00`

## Still Need To Add

- `ldpe-2426h`
  - Name: `LDPE 2426H`
  - Category: `ldpe`
- `ldpe-2426k`
  - Name: `LDPE 2426K`
  - Category: `ldpe`
- `ldpe-2520d`
  - Name: `LDPE 2520D`
  - Category: `ldpe`
- `hdpe-j50-10n5000`
  - Name: `HDPE J50-10N5000`
  - Category: `hdpe`
- `pp-ep5076x`
  - Name: `PP EP5076X`
  - Category: `pp-impact`
- `pp-ep548g`
  - Name: `PP EP548G`
  - Category: `pp-impact`
- `ppr-mt26`
  - Name: `PPR-MT26`
  - Category: `pp-random`

## Skill Update Needed

Update both files:

- `.codex/skills/chemical-product-publisher/SKILL.md`
- `skill.md`

Required wording change:

- Replace references to using OCR/Python OCR for product image recognition.
- State that `new-products/*.png` must be read directly with a multimodal model.
- State explicitly: do not write or run Python OCR scripts for image recognition.
- Keep the rule that ambiguous values must be verified against the source image.

## Multimodal Extraction Results

### LDPE 2426H

Product standard: `Q/SH3175 3000-2018`

| 分析项目 | 合格证组分名称 | 计量单位 | 最小值 | 最大值 | 方法标准 |
|---|---|---|---|---|---|
| 薄膜外观 | 条纹(≥1cm) | cm/20m² | <=20 | - | GB/T 11115-2009 |
| 拉伸性能 | 拉伸屈服强度 | MPa | >=10 | - | ASTM D638-2022 |
| 熔体流动速率 | 熔体质量流动速率 | g/10min | 1.60 | 2.20 | GB/T 3682.1-2018 |
| 颗粒外观 | 色粒 | 个/kg | <=10 | - | SH/T 1541.1-2019 |
| 薄膜外观 | 鱼眼(0.3~2mm) | 个/1200c m² | <=15 | - | GB/T 11115-2009 |
| 密度 | 密度(23℃) | kg/m³ | 922.0 | 926.0 | GB/T 1033.2-2010 |

### LDPE 2426K

Product standard: `Q/SH3175 3000-2018`

| 分析项目 | 合格证组分名称 | 计量单位 | 最小值 | 最大值 | 方法标准 |
|---|---|---|---|---|---|
| 拉伸性能 | 拉伸屈服强度 | MPa | >=10 | - | ASTM D638-2022 |
| 密度 | 密度(23℃) | kg/m³ | 922.0 | 926.0 | GB/T 1033.2-2010 |
| 薄膜外观 | 条纹(≥1cm) | cm/20m² | <=20 | - | GB/T 11115-2009 |
| 熔体流动速率 | 熔体质量流动速率 | g/10min | 3.60 | 4.40 | GB/T 3682.1-2018 |
| 拉伸性能 | 断裂伸长率 | percent | >=400 | - | ASTM D638-2022 |