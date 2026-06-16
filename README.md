# AOWATT Chemical Website

AOWATT Global Materials 官网项目。V0.1 是纯静态、双语、SEO 友好的 Next.js 官网，部署到 Vercel，不包含询盘表单、后端 API、数据库、后台或 AI 客服。

## 当前规划结论

- V0.1: 静态官网 MVP，启用 Home / Products / Product Detail / Contact / Privacy / Disclaimer。
- V0.1: Why Us / About / Applications 可先实现，但通过 `config/features.ts` 禁用。
- V0.2: 启用 Why Us / About / Applications，新增 Resources，扩展真实产品库。
- V0.3: 需要运营后台时再接入 Supabase。
- V0.3.x: AI 客服最后做，且必须有人工介入规则。

Contact 页只展示邮箱、电话、WhatsApp 和地址，不做 Inquiry Form。

## 目录结构

```txt
chemical-website/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── TECH_STACK_DECISION.md
│   ├── architecture-review-and-roadmap.md
│   ├── architecture-presentation.html
│   └── website_mindmap.html
├── design/
│   ├── logos/
│   ├── figma-screenshots/
│   ├── demo/
│   └── contact-info.png
├── planning/
│   ├── chemical_website_board_checklist_review.xlsx
│   └── archive/
└── (待初始化的 Next.js 项目)
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── robots.ts
    │   │   ├── sitemap.ts
    │   │   └── [locale]/
    │   │       ├── layout.tsx
    │   │       ├── page.tsx
    │   │       ├── products/
    │   │       ├── why-us/
    │   │       ├── about/
    │   │       ├── applications/
    │   │       ├── resources/
    │   │       ├── contact/
    │   │       ├── privacy/
    │   │       └── disclaimer/
    │   ├── components/
    │   ├── config/
    │   │   └── features.ts
    │   ├── content/
    │   │   ├── categories.ts
    │   │   ├── products.ts
    │   │   ├── site.ts
    │   │   └── placeholders/
    │   ├── lib/
    │   │   ├── analytics.ts
    │   │   ├── categories.ts
    │   │   ├── i18n.ts
    │   │   ├── products.ts
    │   │   └── seo.ts
    │   ├── messages/
    │   │   ├── en.json
    │   │   └── zh.json
    │   └── types/
    ├── public/
    │   ├── products/
    │   └── docs/
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.ts
    └── tsconfig.json
```

`planning/chemical_website_board_checklist_review.xlsx` 是唯一有效 planning 主工作簿。原 `chemical_website_content_checklist.xlsx` 的有效内容已迁移或应迁移到主工作簿，后续不再作为规划源维护。

## 关键文档

- [架构实施方案](docs/ARCHITECTURE.md)
- [技术选型确认](docs/TECH_STACK_DECISION.md)
- [站点思维导图](docs/website_mindmap.html)
- [架构审查与 Roadmap](docs/architecture-review-and-roadmap.md)

## 页面开关

页面显隐由 `src/config/features.ts` 统一控制：

- V0.1 默认启用：`home`、`products`、`productDetail`、`contact`、`privacy`、`disclaimer`
- V0.1 默认禁用：`whyUs`、`about`、`applications`、`resources`

禁用页面不得进入导航、footer、sitemap，直接访问返回 404。

## 内容与资产规则

- 产品数据集中维护在 `src/content/products.ts`。
- 分类集中维护在 `src/content/categories.ts`。
- UI 文案放在 `src/messages/en.json`、`src/messages/zh.json`。
- 产品图片放在 `public/products/{slug}/main.jpg`、`public/products/{slug}/hero.jpg`。
- 可公开 PDF 放在 `public/docs/{slug}-tds.pdf`、`public/docs/{slug}-sds.pdf`。
- 占位内容使用 `[PLACEHOLDER]` 前缀，并通过 `pnpm run check:placeholders` 检查。

不真实的商业数字、客户数量、国家覆盖、年限、资质认证不得作为正式内容发布。

## 开发与验证

项目初始化后建议提供：

```bash
pnpm install
pnpm dev
pnpm build
pnpm run check:placeholders
```

V0.1 上线前必须验证：

- `/en` 和 `/zh` 可访问。
- `hreflang`、canonical、metadata 正确。
- sitemap 不包含禁用页面。
- Contact 页无表单。
- Privacy Policy 和 Disclaimer 可访问。
- Cloudflare Web Analytics、Vercel Web Analytics、Google Search Console、Sentry 已配置。
- Lighthouse Performance / SEO / Accessibility 均高于 90。
- 360px 移动端无横向滚动。
