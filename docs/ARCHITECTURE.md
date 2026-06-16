# AOWATT 官网架构实施方案

## 1. 架构结论

V0.1 采用 **Next.js App Router + TypeScript + Tailwind CSS + Vercel** 的纯静态官网方案。目标是在 5-7 周内上线一个双语、SEO 友好、可维护的化工 B2B 官网骨架，先建立线上可信身份，再逐步替换真实产品和品牌内容。

V0.1 明确不做：

- 询盘表单
- `/api/inquiry` API Route
- Resend 或其他邮件发送服务
- Cloudflare Turnstile 或其他反垃圾机制
- Supabase、数据库、管理后台
- AI 客服
- 在线报价、下单、支付、会员系统

V0.1 只展示邮箱、电话、WhatsApp、地址等人工联系方式。用户点击后由自己的邮件、电话或 WhatsApp 客户端继续沟通。

## 2. 总体架构

```mermaid
flowchart TD
  Visitor["Visitor / Buyer"] --> Cloudflare["Cloudflare DNS / CDN"]
  Cloudflare --> Vercel["Vercel Static Deployment"]
  Vercel --> NextPages["Next.js Static Pages"]
  NextPages --> ContentLayer["Content Access Layer"]
  ContentLayer --> LocalContent["Local Structured Content"]
  NextPages --> PublicAssets["public/products + public/docs"]

  NextPages --> ContactLinks["mailto / tel / WhatsApp"]
  NextPages --> CFAnalytics["Cloudflare Web Analytics"]
  NextPages --> VercelAnalytics["Vercel Web Analytics Events"]
  NextPages --> SearchConsole["Google Search Console"]
  NextPages --> Sentry["Sentry Error Monitoring"]

  ContentLayer -. V0.3 .-> Supabase["Supabase Database / Storage"]
  NextPages -. V0.3 .-> Admin["Admin Panel"]
  NextPages -. V0.3.x .-> AIWidget["AI Customer Service"]
```

核心原则：

- 页面只负责展示，不直接写死产品。
- 产品、分类、站点信息通过数据访问层读取。
- V0.1 全部可静态生成，部署在 Vercel。
- 页面显隐通过集中配置控制，禁用页面不进导航、footer、sitemap，直接访问返回 404。
- 二期或三期切换数据源时优先改数据访问层，不重写前台页面。

## 3. 推荐目录结构

```txt
src/
  app/
    layout.tsx
    page.tsx
    [locale]/
      layout.tsx
      page.tsx
      products/
        page.tsx
        [slug]/
          page.tsx
      why-us/
        page.tsx
      about/
        page.tsx
      applications/
        page.tsx
      resources/
        page.tsx
      contact/
        page.tsx
      privacy/
        page.tsx
      disclaimer/
        page.tsx
      not-found.tsx
      error.tsx
    robots.ts
    sitemap.ts
  components/
    layout/
      Header.tsx
      Footer.tsx
      LanguageSwitcher.tsx
    analytics/
      AnalyticsProvider.tsx
      TrackedLink.tsx
    home/
    products/
    contact/
  config/
    features.ts
  content/
    categories.ts
    products.ts
    site.ts
    placeholders/
  lib/
    analytics.ts
    categories.ts
    i18n.ts
    products.ts
    seo.ts
  messages/
    en.json
    zh.json
  types/
    product.ts
public/
  products/
    {slug}/
      main.jpg
      hero.jpg
  docs/
    {slug}-tds.pdf
    {slug}-sds.pdf
```

V0.1 不创建 `api/inquiry`、`api/ai-chat`、`admin`、`supabase.ts`。这些属于后续阶段。

## 4. 页面路由与阶段

所有公开页面使用路由级双语：

| 页面 | 路由 | V0.1 状态 | 说明 |
| --- | --- | --- | --- |
| Root redirect | `/` | 启用 | 默认跳转到 `/en` |
| Home | `/[locale]` | 启用 | Hero、产品分类、Why Us 摘要、Applications 摘要(V0.1 不做 Featured Products,产品 ≥ 6 后再评估) |
| Products | `/[locale]/products` | 启用 | 产品列表、分类入口、Fuse.js 客户端搜索 |
| Product Detail | `/[locale]/products/[slug]` | 启用 | Key specs、人工联系 CTA、相关产品(V0.1 不渲染文档下载,文档信息走人工索取) |
| Contact | `/[locale]/contact` | 启用 | 只展示 email、phone、WhatsApp、address，不做表单 |
| Privacy Policy | `/[locale]/privacy` | 启用 | footer 链接，不进主导航 |
| Disclaimer | `/[locale]/disclaimer` | 启用 | footer 链接，不进主导航 |
| Why Us | `/[locale]/why-us` | V0.1 禁用，V0.2 启用 | 代码可先写好，导航和 sitemap 隐藏 |
| About | `/[locale]/about` | V0.1 禁用，V0.2 启用 | 不展示公司年限/客户数等无法披露的数字，用服务品类范围与能力声明替代 |
| Applications | `/[locale]/applications` | V0.1 禁用，V0.2 启用 | 首页可保留摘要 section |
| Resources | `/[locale]/resources` | V0.2 新增 | PDF 下载中心、FAQ |

禁用页面必须满足：

- Header、Footer 不显示入口。
- `sitemap.ts` 不输出 URL。
- 直接访问时调用 `notFound()`。
- 重新启用后再提交 sitemap 给 Google Search Console。

## 5. 页面特性开关

`src/config/features.ts` 作为页面显隐唯一来源。

```ts
export type PageKey =
  | "home"
  | "products"
  | "productDetail"
  | "contact"
  | "privacy"
  | "disclaimer"
  | "whyUs"
  | "about"
  | "applications"
  | "resources";

export const features: Record<PageKey, boolean> = {
  home: true,
  products: true,
  productDetail: true,
  contact: true,
  privacy: true,
  disclaimer: true,
  whyUs: false,
  about: false,
  applications: false,
  resources: false,
};

export const navItems = [
  { key: "home", href: "/", labelKey: "nav.home", inMainNav: true },
  { key: "products", href: "/products", labelKey: "nav.products", inMainNav: true },
  { key: "whyUs", href: "/why-us", labelKey: "nav.whyUs", inMainNav: false },
  { key: "about", href: "/about", labelKey: "nav.about", inMainNav: false },
  { key: "applications", href: "/applications", labelKey: "nav.applications", inMainNav: false },
  { key: "resources", href: "/resources", labelKey: "nav.resources", inMainNav: false },
  { key: "contact", href: "/contact", labelKey: "nav.contact", inMainNav: true },
] as const;

export function enabledMainNavItems() {
  return navItems.filter((item) => features[item.key] && item.inMainNav);
}

export function enabledFooterNavItems() {
  return navItems.filter((item) => features[item.key]);
}
```

主导航始终精简为 Home / Products / Contact 三项,与设计稿一致。Why Us / About / Applications / Resources 启用后只进 Footer 与首页 section,不进顶栏。Privacy / Disclaimer 不进 navItems,只在 Footer Bottom Strip 渲染(见第 9.1 节)。

切换页面只改集中配置,不改页面逻辑。修改配置后仍需要 build 和部署。

## 6. 国际化方案

V0.1 采用路由级双语，而不是 `nameZh` / `summaryZh` + `localStorage` 的字段级切换。

- 支持 locale：`en`、`zh`。
- `/` 默认 redirect 到 `/en`。
- 使用 `next-intl` 管理 UI 文案和路由上下文。
- 每个页面输出 `canonical` 与 `hreflang`。
- `messages/en.json` 为完整文案，`messages/zh.json` 可逐步补齐。
- 中文缺失时 fallback 英文，并在中文页显示提示：`中文版正在更新，部分内容暂以英文显示。`

## 7. 产品与分类数据模型

```ts
export type Locale = "en" | "zh";

export type LocalizedString = {
  en: string;
  zh?: string;
};

export type ProductDocumentType = "COA" | "TDS" | "SDS";

export type ProductSpec = {
  label: LocalizedString;
  value: LocalizedString;
};

export type Product = {
  slug: string;
  name: LocalizedString;
  category: string;
  casNo?: string;
  summary: LocalizedString;
  overview: LocalizedString;
  grade?: LocalizedString;
  purity?: string;
  packaging: LocalizedString[];
  applications: LocalizedString[];
  documents: ProductDocumentType[];
  specs: ProductSpec[];
  relatedProductSlugs: string[];
  image: string;
  heroImage?: string;
  featured: boolean;
  published: boolean;
  placeholder?: boolean;
  sortOrder: number;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
};

export type ProductCategory = {
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  image: string;
  sortOrder: number;
  enabled: boolean;
};
```

分类集中维护在 `src/content/categories.ts`，页面、组件、搜索和 URL 都从同一份分类数据读取。之后分类增删只改内容文件，不改页面逻辑。

## 8. 数据访问层

页面不得直接 import `products` 后手写过滤。`lib/products.ts` 暴露统一方法：

```ts
getPublishedProducts(locale)
getFeaturedProducts(locale)
getProductBySlug(slug, locale)
getProductsByCategory(categorySlug, locale)
getRelatedProducts(product, locale)
getProductStaticParams()
searchProducts(query, locale)
```

V0.1 读取本地结构化文件；V0.3 切到 Supabase 时保持页面调用方式不变。

## 9. 静态资产与公开文件

V0.1 不使用 Supabase Storage。公开资产放在 `public/`：

- 产品主图：`public/products/{slug}/main.jpg`
- 产品 Hero 图：`public/products/{slug}/hero.jpg`

V0.1 不渲染文档下载（COA / TDS / SDS）。`Product.documents` 字段保留，仅作为"产品有哪些类型的文档可索取"的事实数据，前台不展示下载入口。客户需要文档时走 mailto / WhatsApp 人工索取。文档下载（含 `public/docs/` 目录与对应 UI）推迟到 V0.2 视需求评估。

只放允许公开的文件。涉及客户、供应商、价格、合同、非公开认证的信息不得放入 `public/`。

图片使用 Next.js `<Image>`，并提供合理的 `sizes`。缺图时使用统一品牌色占位图。

### 9.1 Footer 结构

Footer 分两层：

- **Footer Main**：3 列 — Brand（Logo + Tagline）、Products（分类链接）、Contact（email / phone / WhatsApp / address）。Why Us / About / Applications / Resources 在对应 feature 开启时,以独立列追加在 Brand 与 Products 之间。
- **Footer Bottom Strip**：横贯页面底部的细带,左侧 `© {year} AOWATT Global Materials`,右侧 `Privacy · Disclaimer` 链接(只在对应 feature 开启时渲染)。

法律页(Privacy / Disclaimer)只在 Footer Bottom Strip 出现,不进主导航,也不在 Footer Main 列出。

## 10. 占位内容机制

由于首批真实产品、文案、图片素材尚未完全确定，V0.1 允许占位上线，但要可追踪、可替换、不可误导。

- 占位内容集中在 `src/content/placeholders/`。
- 占位文案使用 `[PLACEHOLDER]` 前缀。
- 产品可使用 `placeholder: true` 标记。
- `pnpm run check:placeholders` 扫描占位内容并输出清单。
- 不真实的商业数字、资质、国家覆盖、年限、客户案例不得作为正式内容发布。

V0.1 明确不展示无法披露的事实型数字。设计稿中的 `20+ Countries` / `15+ Years` / `100% Customer Focus` 等 Stats 模块整体删除，About 页改用"服务品类范围"或"能力声明"等可诚实陈述的内容替代。`pnpm run check:placeholders` 同时扫描 `Stats` / `Years` / `Countries` 等关键词，防止该模式回潮。

## 11. 联系方式与转化

V0.1 Contact 页只展示：

- `mailto:info@aowatt.com.au`
- `tel:+61451875076`
- `https://wa.me/61451875076`
- `11 Bale Cct, Southbank VIC 3006, Australia`

不做表单，不收集用户输入，不保存线索。所有联系点击通过 Vercel Web Analytics 记录自定义事件：

| 事件名 | 触发位置 | 属性 |
| --- | --- | --- |
| `contact_email_click` | 邮箱链接 | `page`, `product_slug` |
| `contact_phone_click` | 电话链接 | `page`, `product_slug` |
| `contact_whatsapp_click` | WhatsApp 链接 | `page`, `product_slug` |

如果 V0.2 数据显示 mailto 转化不足，再评估轻量表单。届时才引入 API Route、邮件服务、Turnstile、隐私勾选和 honeypot。

## 12. 搜索、SEO 与监控

V0.1 必须包含：

- `app/sitemap.ts`
- `app/robots.ts`
- `not-found.tsx`
- `error.tsx`
- 统一 `lib/seo.ts`
- Open Graph metadata
- canonical URL
- `hreflang`
- Fuse.js 客户端产品搜索
- Sentry 错误监控

Analytics 分工：

| 平台 | 角色 | 内容 |
| --- | --- | --- |
| Cloudflare Web Analytics | 被动访问统计 | PV、UV、Top Pages、国家、Referrer、Core Web Vitals |
| Vercel Web Analytics | 自定义事件 | 产品点击、联系点击、搜索词、语言切换、PDF 下载 |
| Google Search Console | 搜索表现 | 查询词、CTR、排名、索引状态、sitemap |

关键自定义事件：

- `product_card_click`
- `contact_email_click`
- `contact_phone_click`
- `contact_whatsapp_click`
- `search_query`
- `language_switch`
- `pdf_download`

## 13. 部署架构

V0.1：

```txt
Git repository
  -> Vercel build
  -> Static deployment
  -> aowatt.com.au
  -> Cloudflare DNS / CDN / Web Analytics
  -> Google Search Console
  -> Sentry
```

V0.1 只需要少量公开或第三方配置：

```txt
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CF_BEACON_TOKEN=
NEXT_PUBLIC_SENTRY_DSN=
```

不配置 Supabase、OpenAI、邮件服务、后台账号等变量。

## 14. Roadmap

### V0.1: 静态 MVP（5-7 周）

- Next.js + TypeScript + Tailwind 项目骨架。
- `/en`、`/zh` 路由级双语。
- Home、Products、Product Detail、Contact、Privacy、Disclaimer。
- Why Us、About、Applications 代码可先写好但默认禁用。
- 本地产品和分类内容文件。
- 1-2 个完整示例产品。
- 页面开关、占位检查、Fuse.js 搜索。
- Cloudflare Web Analytics、Vercel Web Analytics、Search Console、Sentry。
- sitemap、robots、404、error、SEO metadata。

### V0.2: 内容扩展

- 启用 Why Us、About、Applications。
- 新增 Resources。
- 产品扩展到 30-50 个真实产品。
- 中文内容逐步补齐。
- 根据 V0.1 数据决定是否引入询盘表单。
- 增加 FAQ、PDF 下载中心。

### V0.3: 后台与数据源升级

- Supabase Database、Storage、Auth。
- 产品数据迁移到 Supabase。
- 管理后台：产品、分类、文件、排序、上下架、featured。
- 如果 V0.2 引入表单，则增加询盘管理。

### V0.3.x: AI 客服

- 产品 FAQ 和知识库切片。
- OpenAI API 接入。
- 右下角 ChatWidget。
- 价格、合规、运输、安全类问题强制转人工。

## 15. 审批矩阵

| 审批域 | 负责人 | 必须确认 |
| --- | --- | --- |
| 业务范围 | Founder / Business Owner | V0.1 页面范围、5-7 周上线目标、不做表单 |
| 品牌与内容 | Marketing / Brand Owner | Logo、品牌色、字体、首页文案、产品占位策略 |
| 产品信息 | Product / Operations Owner | 示例产品、CAS、规格、包装、公开文件 |
| 法务合规 | Legal Reviewer | Privacy Policy、Disclaimer、产品声明、不真实数字删除 |
| 技术架构 | Tech Lead | 技术栈、静态部署、i18n、数据模型、页面开关 |
| 上线运维 | Site Owner | 域名、Vercel、Cloudflare、Search Console、Sentry、Analytics |

## 16. 风险接受表

| 风险 | 等级 | 处理方式 | Owner | V0.1 门禁 |
| --- | --- | --- | --- | --- |
| 设计稿中不真实商业数字上线 | High | 替换为真实数据或删除 | Business Owner | 必须关闭 |
| 产品 CAS / 规格 / 用途错误 | High | 由业务确认示例产品数据 | Product Owner | 必须确认 |
| 缺 Privacy / Disclaimer | High | 用模板生成并法务审阅 | Legal Reviewer | 必须完成 |
| 中文内容不完整 | Medium | fallback 英文并展示提示 | Marketing Owner | 可接受 |
| 产品列表频繁变化影响 SEO | Medium | 产品 URL 稳定前可 noindex 产品详情 | Tech Lead | 需决策 |
| Analytics 或 Sentry 未出数据 | Medium | 上线后第 1 天验证 | Site Owner | 必须验证 |

## 17. Go / No-Go 上线门禁

上线前必须全部满足：

- V0.1 页面范围与本文档一致。
- Privacy、Disclaimer 可访问且 footer 有链接。
- Contact 页无表单，只展示 email、phone、WhatsApp、address。
- 上线版本不出现公司年限、国家数、客户数、认证资质等无法披露的数字（含 About 页 Stats Band），相关模块整体删除。
- `/en`、`/zh` 可访问，`hreflang` 正确。
- sitemap 不包含禁用页面。
- 禁用页面直接访问返回 404。
- `pnpm build` 成功。
- Lighthouse Performance / SEO / Accessibility 均高于 90。
- 360px 移动端无横向滚动。
- Cloudflare Web Analytics、Vercel Web Analytics、Search Console、Sentry 已配置并有验证计划。

## 18. 关键架构决策

- V0.1 是纯静态官网，不做后端服务。
- 路由级双语从第一天开始实施，避免后续 SEO 返工。
- 产品和分类必须结构化，不能散落在页面组件里。
- 页面显隐统一由 `config/features.ts` 控制。
- 占位内容可用于加速上线，但不允许误导或制造合规风险。
- 自定义事件使用 Vercel Web Analytics，Cloudflare Web Analytics 只做被动访问统计。
- Supabase、后台、AI 客服均推迟到 V0.3 或之后。
