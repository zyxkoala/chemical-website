# AOWATT 官网技术选型确认

## 1. 技术栈结论

V0.1 是纯静态、双语、SEO 友好的官网 MVP，不包含表单后端、数据库、后台或 AI 客服。

| 模块 | 选择 | 阶段 | 说明 |
| --- | --- | --- | --- |
| 前端框架 | Next.js App Router | V0.1 | 支持静态生成、metadata、sitemap、未来渐进扩展 |
| 开发语言 | TypeScript | V0.1 | 降低产品数据、路由参数和内容模型维护风险 |
| 样式方案 | Tailwind CSS + 少量自定义 CSS | V0.1 | 快速还原设计稿，保持组件化和一致性 |
| 国际化 | next-intl + `/[locale]` 路由 | V0.1 | `/en`、`/zh` 独立 URL，支持 hreflang 和 SEO |
| 内容管理 | 本地结构化文件 | V0.1 | `src/content/products.ts`、`categories.ts`、`site.ts` |
| 页面开关 | `src/config/features.ts` | V0.1 | 控制页面是否进导航、footer、sitemap、路由访问 |
| 站内搜索 | Fuse.js | V0.1 | 客户端搜索产品名、CAS、分类和摘要 |
| 部署 | Vercel | V0.1 | 适合 Next.js 静态部署和海外访问 |
| DNS / CDN | Cloudflare | V0.1 | 域名解析、CDN、Web Analytics |
| 被动分析 | Cloudflare Web Analytics | V0.1 | PV、UV、Top Pages、国家、Referrer、Core Web Vitals |
| 事件分析 | Vercel Web Analytics | V0.1 | 产品点击、联系点击、搜索词、语言切换、PDF 下载 |
| 搜索表现 | Google Search Console | V0.1 | 查询词、索引、CTR、sitemap 提交 |
| 错误监控 | Sentry for Next.js | V0.1 | 捕获前端运行错误 |
| 数据库 | Supabase | V0.3 | 产品数和运营复杂度上来后再接入 |
| 后台 | Next.js Admin | V0.3 | 产品、分类、文件、上下架、排序维护 |
| AI 客服 | OpenAI API + Supabase | V0.3.x | 化工问题风险高，最后接入并强制人工介入边界 |

V0.1 明确不选择：

- Resend 或其他邮件服务
- `/api/inquiry`
- Cloudflare Turnstile
- Supabase
- OpenAI API
- 管理后台

## 2. 为什么选择 Next.js

当前阶段需要的是低成本、可静态部署、SEO 友好的 B2B 官网。Next.js 比纯 HTML 更适合承载结构化产品内容：

- 产品数据可以集中维护，避免散落在多个页面。
- 产品详情页可以按 slug 静态生成，利于 SEO。
- metadata、sitemap、robots、404、error 都有成熟模式。
- 后续切到 Supabase 时，可以保留页面和组件，只替换数据访问层。
- App Router 能自然支持 `/en`、`/zh` 双语路由。

不选 WordPress 的原因：

- 本项目更偏产品展示和结构化数据，而不是传统博客 CMS。
- 化工产品字段、CAS、SDS/TDS/COA、应用、包装更适合类型化数据。
- 设计稿还原、性能和未来 AI/后台扩展更可控。

## 3. V0.1 产品数据方案

产品不写死在页面中，也不运行时查数据库。V0.1 使用本地结构化内容文件：

- `src/content/products.ts`
- `src/content/categories.ts`
- `src/content/site.ts`
- `src/content/placeholders/`

产品字段使用 locale-keyed 结构：

```ts
type LocalizedString = {
  en: string;
  zh?: string;
};

type Product = {
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
  documents: Array<"COA" | "TDS" | "SDS">;
  image: string;
  heroImage?: string;
  featured: boolean;
  published: boolean;
  placeholder?: boolean;
  sortOrder: number;
};
```

中文内容缺失时 fallback 英文，并在中文页提示部分内容暂以英文显示。

## 4. V0.1 MVP 功能拆分

### 启用页面

- Home
- Products
- Product Detail
- Contact
- Privacy Policy
- Disclaimer

### 写好但禁用

- Why Us
- About
- Applications

这些页面由 `config/features.ts` 控制，V0.1 默认不进入导航、footer、sitemap，直接访问返回 404。V0.2 内容准备好后再打开。

### 核心模块

- 路由级双语 `/en`、`/zh`
- 首页推荐产品
- 产品分类与详情
- Fuse.js 客户端搜索
- 人工联系方式展示
- Vercel 自定义事件埋点
- Cloudflare Web Analytics
- Google Search Console
- Sentry
- sitemap、robots、404、error
- 占位内容检查脚本

### 明确不包含

- 询盘表单
- API Route
- 邮件发送服务
- 反垃圾验证
- 在线报价
- 在线下单
- 在线支付
- 会员系统
- 管理后台
- AI 客服

## 5. V0.2 内容扩展

V0.2 在 V0.1 上线后 2-4 周推进：

- 启用 Why Us。
- 启用 About，并替换设计稿中的不真实占位数字。
- 启用 Applications。
- 新增 Resources 页面。
- 产品库扩展到 30-50 个真实产品。
- 中文内容逐步补齐。
- 增加 FAQ 和 PDF 下载中心。
- 根据 V0.1 mailto / WhatsApp 转化数据决定是否需要表单。

如果 V0.2 决定做表单，才引入：

- `/api/inquiry`
- Resend 或其他邮件服务
- Turnstile
- honeypot
- 隐私勾选

## 6. V0.3 后台与数据源升级

当产品数量超过 50 个，或运营人员需要自助维护时，再接入 Supabase：

- `products`
- `categories`
- `product_documents`
- `inquiries`（仅当 V0.2 引入表单）
- `admin_users`

后台能力：

- 产品 CRUD
- 分类管理
- 图片和 PDF 上传
- 上下架
- 排序
- featured 标记

AI 客服放到 V0.3.x。化工领域回答错误可能带来合规风险，因此必须建立知识库、免责声明和人工介入规则后再上线。

## 7. SEO 与部署建议

V0.1 必须实现：

- `/en`、`/zh` 独立 URL。
- `hreflang`。
- canonical URL。
- sitemap 只输出启用页面。
- robots。
- Open Graph metadata。
- 产品详情长期稳定 slug。
- Google Search Console Domain property 验证。

部署：

- Vercel 部署 Next.js。
- aowatt.com.au 解析到 Vercel。
- Cloudflare 用于 DNS、CDN、Web Analytics。
- 不按中国大陆备案部署设计。

V0.1 环境变量只保留实际使用项：

```txt
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CF_BEACON_TOKEN=
NEXT_PUBLIC_SENTRY_DSN=
```

## 8. 上线验收

- `pnpm build` 成功。
- `/en` 和 `/zh` 都能访问。
- 禁用页面不出现在 sitemap，直接访问返回 404。
- Contact 页没有表单。
- Lighthouse Performance / SEO / Accessibility 均高于 90。
- 360px 移动端无横向滚动。
- Cloudflare Web Analytics、Vercel Web Analytics、Search Console、Sentry 有验证计划。
- Privacy Policy 和 Disclaimer 已由业务/法务确认。
- 不真实占位数字已替换或删除。

## 9. Assumptions

- 网站主要面向海外访问。
- V0.1 优先快速上线和低维护成本。
- 产品、图片、中文文案可以逐步补齐。
- V0.1 允许占位内容，但不允许发布不真实商业数字或资质声明。
- planning 只保留一个有效主工作簿：`planning/chemical_website_board_checklist_review.xlsx`。
