# Product Classification & Navigation System Design

**Date**: 2026-06-21  
**Project**: AOWATT Chemical Website  
**Status**: Approved

## Context

AOWATT Global Materials is a B2B chemical company website built with Next.js (App Router) as a static site. The current product structure is a flat 2-level hierarchy with 6 placeholder categories (industrial-chemicals, specialty-chemicals, etc.) and 6 placeholder products.

The business now needs a hierarchical classification system reflecting the actual product portfolio:
- **Chemical Raw Materials** (化工原料): PE and PP polymers with 3-4 level subcategories
- **Manufactured Goods** (制品): Consumer products like cling film and wash basins

Key constraints:
- Static export (`output: 'export'`) deployed on Vercel
- Bilingual (en/zh) via next-intl
- Must preserve existing design tokens and component patterns
- Mobile-responsive (≥360px)

## Why This Change

Current problems:
1. Flat category structure doesn't reflect PE/PP polymer taxonomy (LDPE/HDPE/LLDPE/MLLDPE with carbon-number variants)
2. No navigation path for users to browse deep product hierarchies
3. Placeholder categories (industrial-chemicals, etc.) don't match business product lines
4. Header navigation has no dropdown — users must enter `/products` to discover categories

Business goals:
- Match industry-standard polymer classification (align with competitors like ExxonMobil Chemical)
- Support future SKU expansion (each leaf category will hold multiple product grades)
- Provide two navigation entry points: quick access (header mega menu) and deep browsing (page sidebar)

## Product Taxonomy

### Final Tree Structure

```
化工原料 (Chemical Raw Materials)
├── PE 聚乙烯 (Polyethylene)
│   ├── LDPE 低密度聚乙烯 (Low-Density Polyethylene)
│   ├── HDPE 高密度聚乙烯 (High-Density Polyethylene)
│   ├── LLDPE 线性低密度聚乙烯 (Linear Low-Density Polyethylene)
│   │   ├── C4 (Butene-based LLDPE)
│   │   └── C6 (Hexene-based LLDPE)
│   └── MLLDPE 茂金属线性低密度聚乙烯 (Metallocene LLDPE)
│       ├── C6 (Hexene-based mLLDPE)
│       └── C8 (Octene-based mLLDPE, 窗口预留)
└── PP 聚丙烯 (Polypropylene)
    ├── 均聚PP (Homopolymer PP)
    ├── 嵌段共聚PP (Impact Copolymer PP)
    ├── 无规共聚PP (Random Copolymer PP)
    ├── 三元共聚PP (Terpolymer PP)
    ├── 高抗冲共聚PP (High-Impact Copolymer PP)
    └── 改性专用PP (Modified PP)

制品 (Manufactured Goods)
└── 厨房/生活用品 (Kitchen & Household)
    ├── 保鲜膜 (Cling Film)
    └── 脸盆 (Wash Basin)
```

**Key design decisions**:
- PE branch: 4 levels deep (Raw Materials → PE → LDPE/LLDPE/etc → C4/C6/C8)
- PP branch: 3 levels deep (Raw Materials → PP → Homopolymer/Copolymer types)
- Manufactured goods: 3 levels deep (Manufactured → Kitchen/Household → specific products)
- Tree depth varies by content — no forced symmetry
- C8 is a real industry "window" category (currently no products, reserved for future)

### Leaf Node Semantics

**Leaf nodes** (LDPE, LLDPE-C4, Homopolymer PP, Cling Film, etc.) are **final category containers**, NOT individual products.

- Click a leaf node → navigate to **category list page** showing all SKU product cards under that category
- Click a SKU card → navigate to **product detail page**
- Each leaf currently contains 1 placeholder SKU (to demonstrate the list→detail flow)
- Future: each leaf will hold multiple real SKU grades (e.g., LDPE 2426H, LDPE 951-000)

## Data Model

### Chosen Approach: Flat Array + Path Array

```typescript
type Category = {
  slug: string;              // 'lldpe-c4'
  name: LocalizedString;     // {en: 'C4', zh: 'C4'}
  summary: LocalizedString;  // short description
  path: string[];            // ['raw-materials', 'pe', 'lldpe', 'lldpe-c4']
  parentSlug: string | null; // 'lldpe'
  level: number;             // 4 (1-based: 1=root, 4=deepest)
  isLeaf: boolean;           // true
  image?: string;            // category card image
  sortOrder: number;
  enabled: boolean;
}
```

**Why this model**:
- **Static export friendly**: `path.join('/')` directly maps to URL segments
- **Breadcrumb construction**: iterate `path` array, look up each slug's `name`
- **Next.js generateStaticParams**: one-liner to enumerate all paths
- **No recursion needed**: parent/child queries are simple array filters
- **Redundancy acceptable**: ~20 category nodes × 4-element path arrays = negligible data size

Products maintain existing schema, with `category` field storing the leaf slug:
```typescript
type Product = {
  // ...existing fields (slug, name, casNo, summary, specs, etc.)
  category: string;  // 'lldpe-c4' (leaf category slug)
  placeholder?: boolean;  // true for demo SKUs
}
```

## URL Structure & Routing

### URL Pattern (Nested Paths)

All category list pages and product detail pages use nested URL segments reflecting the tree hierarchy:

| Purpose | URL Example |
|---------|-------------|
| Product overview | `/products` |
| Level 1 category list | `/products/raw-materials` |
| Level 2 category list | `/products/raw-materials/pe` |
| Level 3 category list (leaf) | `/products/raw-materials/pe/ldpe` |
| Level 3 intermediate | `/products/raw-materials/pe/lldpe` |
| Level 4 category list (leaf) | `/products/raw-materials/pe/lldpe/lldpe-c4` |
| Product detail | `/products/raw-materials/pe/ldpe/ldpe-2426h` |
| Manufactured goods | `/products/manufactured/kitchen` |
| Manufactured product | `/products/manufactured/kitchen/cling-film` |

### Routing Implementation

File structure:
```
src/app/[locale]/products/
├── page.tsx                    ← Product overview
└── [...path]/
    └── page.tsx                ← Catch-all: handles both category lists and product details
```

**Path resolution logic** in `[...path]/page.tsx`:

1. Join `path` array → try to find matching category by `path.join('/')`
   - Match found → **Category List Page**
2. No match → take `path.slice(0, -1)` as category path, last segment as product slug
   - Category found + product exists → **Product Detail Page**
3. No match → `notFound()`

**Static params generation**:
```typescript
export function generateStaticParams() {
  const params: { path: string[] }[] = [];
  
  // All category nodes (1-4 levels) → list pages
  for (const cat of categories) {
    params.push({ path: cat.path });
  }
  
  // All published products → detail pages
  for (const product of getPublishedProducts()) {
    const leaf = categories.find(c => c.slug === product.category);
    if (leaf) params.push({ path: [...leaf.path, product.slug] });
  }
  
  return params;
}
```

### List Page Content Strategy

**Non-leaf category pages** (e.g., `/products/raw-materials/pe`):
- Display: **child category card grid** (3 columns: LDPE, HDPE, LLDPE, MLLDPE)
- Do NOT display product SKU cards

**Leaf category pages** (e.g., `/products/raw-materials/pe/ldpe`):
- Display: **product SKU card grid** (all products where `product.category === 'ldpe'`)
- If no SKUs: show empty state message + Inquiry CTA

Both page types include:
- Page hero (category name as title, summary as subtitle, background image by root category)
- Breadcrumb navigation
- Left sidebar category tree
- Bottom Inquiry CTA band

## Header Mega Menu

### Trigger & Interaction

- "产品" (Products) nav item displays a ▾ icon
- **Hover** on Products button for 200ms → mega menu expands
- Mouse moves into mega menu panel → stays open
- Mouse leaves panel for 200ms → closes
- **Click** Products button (without hover) → navigate to `/products` overview
- Mobile (<768px): mega menu disabled, navigation becomes hamburger drawer with collapsible accordion tree

### Three-Column Layout

Spans full `page-max` width (1440px), centered, with `section-px` (80px) horizontal padding.

```
┌──────────────────┬──────────────────┬────────────────────────┬─────────────────┐
│ Column 1         │ Column 2         │ Column 3               │ Column 4 (cond) │
│ Level 1          │ Level 2          │ Level 3                │ Level 4         │
├──────────────────┼──────────────────┼────────────────────────┼─────────────────┤
│ ▸ 化工原料       │ ▸ PE             │ LDPE                   │ C4              │
│   制品           │   PP             │ HDPE                   │ C6              │
│                  │                  │ ▸ LLDPE  →            │ ────────────    │
│                  │                  │   MLLDPE  →           │ C8 (即将上线)    │
└──────────────────┴──────────────────┴────────────────────────┴─────────────────┘
```

**Interaction rules**:
- Hover level 1 item → column 2 updates with children
- Hover level 2 item → column 3 updates with children
- Hover level 3 item **with children** (marked with → arrow) → column 4 expands
- Hover level 3 leaf item → column 4 collapses
- Default state (first hover): column 1 first item active, columns 2/3/4 show corresponding content
- Click any item → navigate to that category's list page (even non-leaf categories are navigable)

### Visual Design (Using Existing Tokens)

- Background: `white`, border: 1px `border-light` (#DBE0EB)
- Shadow: `0 8px 24px rgba(1, 9, 18, 0.08)` (subtle drop shadow)
- Column separators: 1px `border-light` vertical lines
- Column padding: 24px vertical, 24px horizontal
- Item padding: 12px 16px
- Hover/active item background: `#F7F9FC` (light gray)
- Active item left border: 3px `gold` (#F09F14) vertical bar
- Font: 15px Inter Semi Bold (matches nav), color `navy-deep` (#091C1C)
- Reserved category label (C8): right-side 13px Regular gray text "（即将上线）"
- Close triggers: click outside, Esc key, or mouse fully leaves panel for 200ms

### Data-Driven Rendering

Completely driven by the flat `categories` array, grouped at runtime by `level` and `parentSlug`:

```typescript
const tree = useMemo(() => {
  return {
    level1: categories.filter(c => c.level === 1),
    childrenOf: (parentSlug: string) =>
      categories.filter(c => c.parentSlug === parentSlug)
                .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}, [categories]);
```

Each column renders a `<CategoryColumn>` component receiving:
- Array of category items
- Currently selected slug
- `onHover` callback to update adjacent columns

### Accessibility

- Mega menu panel: `role="menu"`
- Each item: `role="menuitem"`
- Keyboard navigation:
  - Tab → focus Products button
  - Enter/Space → expand menu
  - Arrow Up/Down → navigate within column
  - Arrow Right → move to next column
  - Esc → close menu
- `aria-expanded`, `aria-current` states properly managed

### Shared Data Source

The page-internal **left sidebar tree** reads the same `categories` array but renders as a **vertical accordion**:
- Current path's ancestors default to expanded
- Leaf nodes highlighted
- Click non-leaf → expand/collapse (no navigation)
- Click leaf → navigate to list page

This achieves "two entry points, one data source" — header mega menu for quick jumps, page sidebar for deep browsing.

## Page Layouts

### Category List Page Structure

```
┌────────────────────────────────────────────────────────────┐
│ Header (126px, unchanged)                                  │
├────────────────────────────────────────────────────────────┤
│ Page Hero (reuse existing PageHero component)             │
│  ├─ Background image (varies by root category)            │
│  ├─ Title: current category name (52px Bold)              │
│  └─ Subtitle: category summary from categories table      │
├────────────────────────────────────────────────────────────┤
│ Breadcrumb (Home / Products / Raw Materials / PE / LDPE)  │
├────────────────────────────────────────────────────────────┤
│ ┌──────────┬───────────────────────────────────────────┐  │
│ │          │                                           │  │
│ │ Sidebar  │  Content Area                             │  │
│ │ (sticky) │                                           │  │
│ │          │  ┌─ Non-leaf category:                   │  │
│ │ 280px    │  │   Child category card grid (3 cols)   │  │
│ │          │  │   Card: image + name + desc + → enter │  │
│ │          │  │                                        │  │
│ │          │  └─ Leaf category:                       │  │
│ │          │      Product SKU card grid (3 cols)      │  │
│ │          │      If no SKUs: empty state + CTA       │  │
│ │          │                                           │  │
│ └──────────┴───────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ InquiryCTABand (reuse existing component)                  │
├────────────────────────────────────────────────────────────┤
│ Footer                                                     │
└────────────────────────────────────────────────────────────┘
```

### Left Sidebar (CategorySidebar)

- Desktop ≥1024px: sticky sidebar (`top: header-h + 24px`), 280px width
- Tablet 768–1023px: collapsible drawer triggered by "Expand Categories" button at top
- Mobile <768px: hidden, use hamburger menu's embedded tree instead

Behavior:
- Current path's ancestor nodes: default expanded
- Current node: highlighted (background `#F7F9FC` + 3px left `gold` bar)
- Click non-leaf node → expand/collapse children (no navigation)
- Click leaf node → navigate to leaf list page
- Node caret icon: ▸ collapsed / ▾ expanded
- Font: 15px Inter Regular (leaf) / Semi Bold (non-leaf)

### Breadcrumb Enhancement

Existing `Breadcrumb` component supports max 3 segments. Changes needed:
- Accept arbitrary-length `path` array
- Auto-parse from current URL
- Look up each segment's `name` from `categories` table
- Last segment (current page) not clickable
- Long paths on mobile: collapse middle segments to `...`

### Product Detail Page

Reuse existing `/products/[slug]/page.tsx` structure:
- ProductIntro (product name, CAS, overview, image)
- SpecsPanel + InquiryPanel (side-by-side)
- RelatedProductsSection

Changes:
1. Route moves from `/products/[slug]` to `[...path]` catch-all (detail mode detected when last segment is product slug)
2. Breadcrumb: reverse-lookup leaf category from `product.category`, use leaf's `path` array to build full breadcrumb
3. **No left sidebar** on detail pages (keeps focus on product)
4. RelatedProducts: keep existing logic (`relatedProductSlugs` + same-category fallback)

### Product Overview Page (`/products`)

Redesigned structure:
- Page Hero (unchanged)
- **Two large entry cards** (化工原料 / 制品) → click enters respective level-1 list page
- Featured Products grid (reuse `FeaturedProductsSection`)
- InquiryCTABand

Remove:
- `ProductCategoryGrid` (old 6 flat categories)
- `ProductSearchBox` (search deferred to V0.2)

## Placeholder SKU Strategy

Following ExxonMobil's approach (mega menu shows categories only, SKUs discoverable via Product Selector tool):

**For V0.1 demonstration**:
- Each leaf node: 1 placeholder SKU
- Naming: `{leaf-slug}-sample` (e.g., `ldpe-sample`, `cling-film-sample`)
- Marked: `placeholder: true, published: false`
- Filled with placeholder copy: `name: "LDPE 示例牌号 / Sample LDPE Grade"`

**Behavior**:
- Placeholder SKUs **appear** in leaf category list pages (cards visible)
- Cards **disabled state**: semi-transparent overlay + "敬请期待 / Coming Soon" text, click does nothing
- Placeholder SKUs **excluded** from `generateStaticParams` detail paths (no hollow detail pages built)
- When real SKUs added: flip `placeholder: false, published: true`

This ensures:
- Tree → list → detail flow is demonstrable
- No fake detail pages cluttering the build
- Clean migration path to real data

## Component Inventory

### New Components

```
src/components/products/
├── MegaMenu.tsx              ← Three-column hover mega menu for Header
├── CategorySidebar.tsx       ← Left sidebar accordion tree
├── CategoryCardGrid.tsx      ← Grid of child category cards (non-leaf pages)
└── CategoryCard.tsx          ← Single category card (image + name + desc + → link)
```

### Modified Components

```
src/components/layout/
└── Header.tsx                ← Products nav item: add ▾ icon, hover trigger for MegaMenu
                               Mobile: embed CategorySidebar in hamburger drawer

src/components/product-detail/
└── Breadcrumb.tsx            ← Accept arbitrary-length path array
                               Auto-parse from URL, lookup names from categories table
                               Remove hardcoded 3-segment limit

src/components/products/
└── ProductCard.tsx           ← Add disabled state for placeholder SKUs
                               Visual: semi-transparent overlay + "敬请期待" label
                               Behavior: onClick disabled
```

### Deleted Components/Files

```
src/app/[locale]/products/[slug]/page.tsx   ← Replaced by [...path] catch-all
```

## Data Layer Changes

### Type Definitions (`src/types/product.ts`)

**ProductCategory** type additions:
```typescript
export type ProductCategory = {
  slug: string;
  name: LocalizedString;
  summary?: LocalizedString;
  image?: string;
  sortOrder: number;
  enabled: boolean;
  // NEW FIELDS:
  path: string[];            // Full path array from root to this node
  parentSlug: string | null; // Immediate parent's slug (null for root)
  level: number;             // 1-based depth (1 = root, 4 = deepest)
  isLeaf: boolean;           // True if this node holds products (no children)
};
```

**Product** type: no changes (existing `category: string` field stores leaf slug).

### Content Data Files

**`src/content/categories.ts`** — complete rewrite:
- Delete old 6 categories (industrial-chemicals, specialty-chemicals, etc.)
- Write new ~20-node tree:
  - 2 root nodes (raw-materials, manufactured)
  - PE branch: 4 nodes at level 2, 2 intermediate level-3 nodes (LLDPE/MLLDPE), 4 leaf level-4 nodes (C4/C6/C8)
  - PP branch: 6 leaf nodes at level 3
  - Manufactured branch: 1 intermediate level-2 node, 2 leaf level-3 nodes
- All nodes include bilingual names (en/zh) per industry standard terms
- Example node:
  ```typescript
  {
    slug: 'lldpe-c4',
    name: { en: 'C4 (Butene-based LLDPE)', zh: 'C4（丁烯基 LLDPE）' },
    summary: { en: 'Butene comonomer linear low-density polyethylene...', zh: '...' },
    path: ['raw-materials', 'pe', 'lldpe', 'lldpe-c4'],
    parentSlug: 'lldpe',
    level: 4,
    isLeaf: true,
    sortOrder: 1,
    enabled: true,
  }
  ```

**`src/content/products.ts`** — complete rewrite:
- Delete old 6 products
- Write ~15 placeholder SKUs (1 per leaf node)
- Each placeholder:
  ```typescript
  {
    slug: 'ldpe-sample',
    name: { en: 'Sample LDPE Grade', zh: 'LDPE 示例牌号' },
    category: 'ldpe',  // leaf slug
    casNo: 'TBD',
    summary: { en: 'Placeholder product...', zh: '...' },
    overview: { en: 'Full description pending...', zh: '...' },
    specs: [
      { label: { en: 'Density', zh: '密度' }, value: { en: 'TBD', zh: '待定' } }
    ],
    placeholder: true,
    published: false,
    featured: false,
    sortOrder: 1,
  }
  ```

### Library Functions (`src/lib/categories.ts`)

Keep existing:
- `getEnabledCategories(locale): LocalizedCategory[]`
- `getCategoryBySlug(slug, locale): LocalizedCategory | undefined`

Add new:
```typescript
// Get category by full path array
getCategoryByPath(path: string[]): Category | undefined

// Get immediate children of a category
getChildCategories(parentSlug: string): Category[]

// Get all ancestors of a category (root → parent)
getCategoryAncestors(slug: string): Category[]

// Build nested tree structure for MegaMenu rendering
buildCategoryTree(): CategoryTreeNode[]
```

**`src/lib/products.ts`** — minimal changes:
- `getProductsByCategory(categorySlug, locale)`: keep existing logic (already filters by `product.category === categorySlug`)
- `getFeaturedProducts(locale, limit)`: keep existing
- `getPublishedProducts(locale)`: ensure it filters `published: true` AND `placeholder !== true`

## Routing Implementation

### File Structure

```
src/app/[locale]/products/
├── page.tsx                    ← Product overview (two entry cards + featured)
└── [...path]/
    └── page.tsx                ← Catch-all for both category lists and product details
```

### `[...path]/page.tsx` Logic

```typescript
export default async function ProductPathPage({
  params: { locale, path },
}: {
  params: { locale: string; path: string[] };
}) {
  const fullPath = path.join('/');
  
  // Try to match as category
  const category = getCategoryByPath(path);
  if (category) {
    return <CategoryListPage category={category} locale={locale} />;
  }
  
  // Try to match as product detail (last segment = product slug)
  const categoryPath = path.slice(0, -1);
  const productSlug = path[path.length - 1];
  const parentCategory = getCategoryByPath(categoryPath);
  
  if (parentCategory?.isLeaf) {
    const product = getProductBySlug(productSlug, locale);
    if (product && product.category === parentCategory.slug) {
      return <ProductDetailPage product={product} locale={locale} />;
    }
  }
  
  notFound();
}

export function generateStaticParams() {
  const params: { path: string[] }[] = [];
  
  // All category nodes → list pages
  for (const cat of categories) {
    params.push({ path: cat.path });
  }
  
  // Published non-placeholder products → detail pages
  const products = getPublishedProducts().filter(p => !p.placeholder);
  for (const product of products) {
    const leaf = categories.find(c => c.slug === product.category && c.isLeaf);
    if (leaf) {
      params.push({ path: [...leaf.path, product.slug] });
    }
  }
  
  return params;
}
```

### `CategoryListPage` Component

- If `category.isLeaf === false`: render `<CategoryCardGrid>` with children
- If `category.isLeaf === true`: render `<ProductCardGrid>` with SKU cards (or empty state if no products)
- Both modes include: PageHero + Breadcrumb + CategorySidebar + InquiryCTABand

### `ProductDetailPage` Component

Reuse existing detail page layout:
- ProductIntro
- SpecsPanel + InquiryPanel
- RelatedProductsSection
- Breadcrumb (rebuilt from product's category path)

## Internationalization (i18n)

### New Translation Keys

**`src/messages/en.json`** additions:
```json
{
  "products": {
    "megaMenu": {
      "hoverHint": "Browse products by category",
      "comingSoon": "Coming Soon"
    },
    "sidebar": {
      "title": "Categories",
      "expandButton": "Expand categories"
    },
    "categoryPage": {
      "browseSubcategories": "Browse Subcategories",
      "viewProducts": "View Products"
    },
    "emptyState": {
      "noProducts": "No products available in this category yet.",
      "contactUs": "Contact us for custom grades and specifications."
    }
  },
  "categories": {
    "raw-materials": "Chemical Raw Materials",
    "pe": "Polyethylene (PE)",
    "ldpe": "Low-Density Polyethylene (LDPE)",
    "hdpe": "High-Density Polyethylene (HDPE)",
    "lldpe": "Linear Low-Density Polyethylene (LLDPE)",
    "lldpe-c4": "C4 (Butene-based LLDPE)",
    "lldpe-c6": "C6 (Hexene-based LLDPE)",
    "mlldpe": "Metallocene LLDPE (mLLDPE)",
    "mlldpe-c6": "C6 (Hexene-based mLLDPE)",
    "mlldpe-c8": "C8 (Octene-based mLLDPE)",
    "pp": "Polypropylene (PP)",
    "pp-homo": "Homopolymer PP",
    "pp-impact": "Impact Copolymer PP",
    "pp-random": "Random Copolymer PP",
    "pp-terpoly": "Terpolymer PP",
    "pp-hico": "High-Impact Copolymer PP",
    "pp-modified": "Modified PP",
    "manufactured": "Manufactured Goods",
    "kitchen": "Kitchen & Household",
    "cling-film": "Cling Film",
    "wash-basin": "Wash Basin"
  }
}
```

**`src/messages/zh.json`**: corresponding Chinese translations for all keys above.

### Category Name Lookup

All category names rendered via:
```typescript
const t = useTranslations();
const categoryName = t(`categories.${category.slug}`);
```

Fallback: if translation key missing, use `category.name[locale]` from content file.

## Implementation Checkpoints

### 1. Data Layer Foundation

**Tasks**:
- Update `src/types/product.ts`: add `path`, `parentSlug`, `level`, `isLeaf` to `ProductCategory`
- Rewrite `src/content/categories.ts`: ~20-node tree with bilingual names
- Rewrite `src/content/products.ts`: ~15 placeholder SKUs (1 per leaf)
- Extend `src/lib/categories.ts`: add `getCategoryByPath`, `getChildCategories`, `getCategoryAncestors`, `buildCategoryTree`
- Update `src/lib/products.ts`: ensure `getPublishedProducts` filters out placeholders

**Verification**:
- `pnpm build` completes with no TypeScript errors
- `pnpm check:placeholders` passes (no [PLACEHOLDER] content)
- Console log `categories` array: verify `path`, `level`, `isLeaf` fields populated correctly
- Console log `getChildCategories('pe')`: returns LDPE, HDPE, LLDPE, MLLDPE

### 2. Routing & Static Export

**Tasks**:
- Create `src/app/[locale]/products/[...path]/page.tsx` catch-all route
- Implement path resolution logic (category vs product detail detection)
- Implement `generateStaticParams` to enumerate all category + product paths
- Delete old `src/app/[locale]/products/[slug]/page.tsx`

**Verification**:
- `pnpm build` succeeds
- Check `.next/static` output: verify nested HTML files exist at paths like:
  - `products/raw-materials/index.html`
  - `products/raw-materials/pe/index.html`
  - `products/raw-materials/pe/ldpe/index.html`
  - `products/raw-materials/pe/ldpe/ldpe-sample/index.html` (should NOT exist — placeholder excluded)
- Dev server: navigate to `/products/raw-materials/pe` → page loads without 404

### 3. Breadcrumb & Shared Layout Components

**Tasks**:
- Modify `src/components/product-detail/Breadcrumb.tsx`: accept `path: string[]`, remove 3-segment limit
- Create `src/components/products/CategorySidebar.tsx`: accordion tree, highlight current path
- Create `src/components/products/CategoryCard.tsx`: single category card (image + name + summary + → link)
- Create `src/components/products/CategoryCardGrid.tsx`: 3-column grid of CategoryCards

**Verification**:
- Visit `/products/raw-materials/pe/lldpe/lldpe-c4`
- Breadcrumb shows: `Home / Products / Chemical Raw Materials / PE / LLDPE / C4` (all clickable except last)
- Left sidebar: tree expanded to current node, C4 highlighted with gold bar
- Click breadcrumb "PE" → navigates to `/products/raw-materials/pe`

### 4. Mega Menu

**Tasks**:
- Create `src/components/products/MegaMenu.tsx`: three-column hover layout
- Modify `src/components/layout/Header.tsx`: add ▾ to Products nav, integrate MegaMenu
- Mobile: embed CategorySidebar in hamburger drawer

**Verification**:
- Desktop: hover "产品" → mega menu appears with 3 columns
- Hover "化工原料" → column 2 shows PE/PP
- Hover "PE" → column 3 shows LDPE/HDPE/LLDPE/MLLDPE
- Hover "LLDPE" (has children) → column 4 shows C4/C6
- Click "LDPE" → navigates to `/products/raw-materials/pe/ldpe`
- Mobile (<768px): mega menu hidden, hamburger menu shows accordion tree

### 5. Category List Pages & Product Cards

**Tasks**:
- Build `CategoryListPage` component in `[...path]/page.tsx`:
  - Non-leaf: render CategoryCardGrid with children
  - Leaf: render ProductCardGrid with SKU cards
- Modify `src/components/products/ProductCard.tsx`: add `disabled` prop
  - Visual: semi-transparent overlay, "敬请期待" badge
  - Behavior: onClick no-op when disabled
- Wire up empty state: if leaf has no products, show message + Inquiry CTA

**Verification**:
- Visit `/products/raw-materials/pe` (non-leaf) → shows 4 child category cards (LDPE/HDPE/LLDPE/MLLDPE)
- Visit `/products/raw-materials/pe/ldpe` (leaf) → shows 1 product card (ldpe-sample) with disabled overlay
- Click disabled card → no navigation
- Visit leaf with 0 products → shows "No products available" + Inquiry CTA

### 6. Product Detail Pages

**Tasks**:
- Wire `ProductDetailPage` component in `[...path]/page.tsx`: reuse existing layout (ProductIntro, SpecsPanel, RelatedProductsSection)
- Update breadcrumb: lookup product's category, use category's `path` array to build full breadcrumb
- Ensure left sidebar NOT rendered on detail pages

**Verification**:
- Manually add 1 real product (non-placeholder) to `products.ts` under `ldpe` category
- `pnpm build` → detail page path generated
- Visit detail page → breadcrumb shows full path ending in product name
- No sidebar visible on detail page
- Related products section shows other products from same category

### 7. Internationalization

**Tasks**:
- Add all category name keys to `src/messages/en.json` and `zh.json`
- Add UI string keys (`products.megaMenu.*`, `products.sidebar.*`, `products.emptyState.*`)
- Update components to use `useTranslations()` for category names and UI strings

**Verification**:
- Switch to English → all category names, breadcrumbs, mega menu items show English labels
- Switch to Chinese → all show Chinese labels
- Empty state message, "Coming Soon" badge, sidebar title all translated correctly

### 8. Responsive & Styling

**Tasks**:
- Mega menu: desktop 3-column layout, mobile hidden
- Sidebar: desktop sticky, tablet collapsible drawer, mobile hidden (use hamburger tree)
- Breadcrumb: mobile collapse middle segments to `...` if path > 4 segments
- Category/product card grids: 3 columns desktop, 2 tablet, 1 mobile

**Verification**:
- Chrome DevTools viewport tests:
  - 360px (mobile): hamburger menu shows tree, no sidebar, 1-column grids
  - 768px (tablet): sidebar becomes drawer button, 2-column grids
  - 1440px (desktop): sticky sidebar, 3-column grids, mega menu functional
- Long breadcrumb on mobile: middle segments collapse to `...`

### 9. Accessibility & Performance

**Tasks**:
- Mega menu keyboard nav: Tab/Enter/Esc/Arrow keys
- ARIA attributes: `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-current`
- Sidebar keyboard nav: Enter to expand/collapse, Arrow keys to move
- `useMemo` for category tree building (avoid re-building on every render)
- Image `alt` attributes on all category/product cards

**Verification**:
- Tab to Products nav → press Enter → mega menu opens
- Arrow keys navigate between items, Esc closes menu
- Lighthouse accessibility score ≥95
- Screen reader (NVDA/VoiceOver): announces category names, expanded/collapsed states

## Out of Scope (Future Work)

Not included in this design (deferred to V0.2+):
- Product search (ProductSearchBox component)
- Filter by application/industry
- Brand families as additional navigation dimension
- Pagination/virtual scroll for SKU lists >10 items
- Comparison tool (select multiple SKUs, view specs side-by-side)
- Left sidebar tree on product detail pages (current decision: detail pages focus on product only)

## Migration from Old Structure

**Old data to be removed**:
- 6 placeholder categories: `industrial-chemicals`, `specialty-chemicals`, `solvents`, `water-treatment`, `agricultural-chemicals`, `mining-chemicals`
- 6 placeholder products: Caustic Soda Flakes, Hydrochloric Acid, Sodium Hypochlorite, Industrial Solvent Blend, Citric Acid, Mining Collector Reagent

**Backup strategy**: Before deletion, copy `src/content/categories.ts` and `products.ts` to `src/content/_backup_old_structure/` for reference.

**No data migration script needed**: This is a static site with no database. Old content simply replaced with new tree structure in source files.

**SEO consideration**: Old `/products/caustic-soda-flakes` URLs will 404 after rewrite. Mitigation:
- Add redirects in `vercel.json` (future task, if old URLs were indexed)
- Current state: site not in production yet, no old URLs to preserve

## Testing Strategy

**Manual testing priority paths**:
1. Header mega menu → hover to deepest level → click to navigate
2. Breadcrumb → click each segment → verify navigation
3. Sidebar → expand/collapse → navigate to leaf → highlight correct node
4. Non-leaf list page → click child category card → navigate correctly
5. Leaf list page → placeholder SKU card disabled → click does nothing
6. Language switch → all category names update in mega menu, sidebar, breadcrumbs
7. Mobile → hamburger menu tree accordion functional
8. Desktop → sidebar sticky position scrolls with page

**Build verification**:
- `pnpm build && pnpm check:placeholders` must pass before deployment
- Static export: count HTML files in `.next/static/` matches `categories.length + real_products.length`
- No 404s on any generated path

**Performance targets**:
- Lighthouse Performance score ≥90 (static export typically scores high)
- Mega menu hover delay 200ms (prevents accidental triggers)
- Category tree rendering <50ms (useMemo caching)

## Why This Design Works

**Scalability**: Flat array + path approach supports unlimited tree depth without recursion overhead. Adding a 5th level (e.g., PE → LDPE → Film Grade → Blown Film → BF-220) requires no schema changes, just new nodes with `level: 5`.

**Maintainability**: Single data source (`categories.ts`) drives mega menu, sidebar, breadcrumbs, and list pages. No duplication. Changes propagate automatically.

**SEO**: Nested URL paths (`/products/raw-materials/pe/ldpe`) provide clear hierarchy signals. Breadcrumb schema markup (future enhancement) can be auto-generated from `path` array.

**User experience**: Two entry points (quick mega menu vs deep sidebar browsing) serve different user intents. Mega menu for "I know LDPE, take me there." Sidebar for "Let me explore what PE products you have."

**Static export friendly**: All paths enumerable at build time via `generateStaticParams`. No dynamic route segments requiring server runtime.

**Future-proof**: When real SKU data arrives (hundreds of grades), only `products.ts` changes. Tree structure remains stable. Leaf pages can add filtering/pagination without restructuring navigation.

