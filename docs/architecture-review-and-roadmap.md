# 化工初创官网架构 / 文档 / Planning 审查报告

## 1. Context

**审查对象:**
- `docs/TECH_STACK_DECISION.md` — 技术选型
- `docs/ARCHITECTURE.md` — 架构设计
- `docs/website_mindmap.html` — 站点思维导图
- `planning/chemical_website_content_checklist.xlsx` — 页面内容清单
- `planning/chemical_website_board_checklist_review.xlsx` — 董事会审查清单与产品/决策模板

**审查目的:** 判断当前文档与规划是否能支撑一家化工贸易初创公司的 MVP 官网上线，找出缺失、矛盾、过度设计、阻塞上线的硬卡点。

**用户已确认的约束:**
- MVP 范围: 极速上线优先（最初目标 2-4 周，因接受双语已调整为 5-7 周）
- 语言策略: **路由级双语**（`/en`、`/zh`），SEO 友好
- 联系方式: **不做询盘表单**，只展示邮箱 / 电话 / WhatsApp 链接（用户自己发邮件）
- 分析方案: **Cloudflare Web Analytics + Vercel Web Analytics + Google Search Console**（双源互补）
- 部署: **Vercel**（继续）
- 后端服务: **不需要** — MVP 是纯静态前端 + 第三方分析
- 品牌已就绪 (从设计稿确认):
  - 公司名: AOWATT Global Materials
  - 域名: aowatt.com.au
  - 邮箱: info@aowatt.com.au
  - 电话: +61 451 875 076
  - 地址: 11 Bale Cct, Southbank VIC 3006, Australia
  - Tagline: "Connecting materials worldwide with quality, reliability and integrity"
- 内容现状: **首批产品、文案、图片素材均尚未确定**，需要先用占位内容上线，后续替换
- **页面要可动态显隐**: 通过配置开关启用/禁用页面，不改代码就能调整导航 (新增需求)
- **分阶段交付**: 按 V0.1 / V0.2 / V0.3 三个版本演进 (新增需求)

---

## 2. 总体结论

**架构与技术栈选择合理，可以继续推进，但需要先做以下调整:**
1. 文档之间的不一致先对齐（页面清单、目录结构）
2. MVP 范围必须补 5 项被遗漏的"上线前必须有"的能力
3. i18n 方案从字段级双语改为路由级双语
4. 数据访问层 + 占位内容机制要做得彻底，因为前期所有内容都是占位
5. **新增页面特性开关 (`config/features.ts`)，让页面可一键启用/禁用**
6. **明确 V0.1 / V0.2 / V0.3 三阶段 Roadmap**
7. Planning 里 5 项缺失要补齐才能让代码方动手（其中部分已被设计稿覆盖）

下面列出需要做的修改。

---

## 3. 设计稿内容速览（来自 `design/figma-screenshots/`）

7 张设计稿已交付，覆盖以下页面与具体内容（**这些都是上线就能用的占位**）:

| 页面 | 主要 sections | 关键内容 |
|---|---|---|
| **Home** | Hero / Product Categories / Featured Products 区域 / Why Us 摘要 / Applications 摘要 / Footer | Hero "Reliable Chemical Supply for Global Industries" |
| **Products** | Hero / Product Categories (6 类) / Featured Products (6 个) / "Need a product not listed?" CTA | 6 类: Industrial / Specialty / Solvents / Water Treatment / Agricultural / Mining Chemicals |
| **Product Detail** | Hero / 标题 + Key Specs 表 / Manual price CTA / Related Products | 示例: Caustic Soda Flakes 99% (CAS 1310-73-2) |
| **Why Us** | Hero / Core Advantages (3) / Cooperation Process (5 步) / B2B sourcing CTA | 优势: Quality Documents / Export Packaging / Responsive Support；流程: Inquiry → Requirement Review → Document Confirmation → Packaging & Logistics → After-sales Support |
| **About** | Hero / Company Overview / 数据条 / Values | 20+ Countries / 15+ Years / 100% Customer Focus；Values: Quality / Reliability / Integrity |
| **Applications** | Hero / Industry Applications (6 类) / Match CTA | Mining / Agriculture / Manufacturing / Water Treatment / Coatings & Adhesives / Logistics & Packaging |
| **Contact** | Hero / Inquiry Form / Contact Information | Phone / Email / Location / Response 卡片；**有 Inquiry Form** |

**与之前讨论的冲突点(已在 2026-06 设计审查中决策):**

1. ✅ **Applications 独立页**:V0.1 通过 feature flag 禁用,V0.2 启用。首页 Applications 摘要 section 保留。
2. ✅ **Inquiry Form**:V0.1 砍掉表单,Contact 页只保留 4 张联系卡(Email / Phone / WhatsApp / Address)+ Unlisted Product CTA(跳转邮件)。所有页面 CTA 文案统一为 `Contact Our Team`,移除 `Send Inquiry` 命名。
3. ✅ **20+ Countries / 15+ Years / 100% Customer Focus 等 Stats**:作为初创无法披露,About 页 Stats Band 整体删除,改用"服务品类范围"(6 个 Category 图标)替代。
4. ✅ **Footer 缺法律页入口**:Footer 新增 Bottom Strip,放置 `© AOWATT Global Materials` + `Privacy · Disclaimer`。两份法律页不进主导航。
5. ✅ **主导航裁剪**:全站主导航固定为 Home / Products / Contact 三项,与设计稿一致。Why Us / About / Applications / Resources 启用后只进 Footer 与首页 section,不挤占顶栏。`config/features.ts` 的 navItems 增加 `inMainNav` 字段控制。
6. ✅ **Products 页加搜索框**:Hero 下方放搜索框(占位文 `Search by name, CAS number, or category`),搭配 Fuse.js 客户端搜索。空结果状态文案 `No products match. Try a different keyword or contact our team.`
7. ✅ **文档下载(COA / TDS / SDS)V0.1 不做**:产品卡上的 3 个 chip 全部删除;Product Detail 页只保留 Specs Panel + Inquiry Panel,无下载按钮。`Product.documents` 字段保留,前台不渲染。`public/docs/` 目录推迟到 V0.2。

**设计稿带来的好处（弥补之前的"内容空白"）:**

之前在审查里标"未确定"的内容，设计稿里已有占位:
- ✅ 6 个产品分类已具体化
- ✅ 6 个示例产品名（含 CAS）已具体化
- ✅ Why Us 三大优势已确定 (Quality Documents / Export Packaging / Responsive Support)
- ✅ 5 步合作流程已确定
- ✅ Values 三项已确定
- ✅ 6 个 Industry Applications 已确定
- ✅ 公司名、电话、邮箱、地址、Tagline 已确定
- ⚠️ 仍缺: 品牌色 token 文档 / 字体规范 / SEO 关键词清单 / 隐私政策 + 免责声明文案

---

## 4. 架构与技术栈 — 优点（保留）

- **Next.js App Router + TypeScript + Tailwind + Vercel** — 此场景最佳组合，无需替换
- **三阶段演进 (静态文件 → Supabase → AI 客服)** — 务实，符合初创节奏
- **数据访问层抽象 (`lib/products.ts`)** — 关键设计，二期切数据源不动页面，必须保留
- **slug-based 静态生成** — SEO 与速度都对
- **统一 SEO helper / metadata 生成** — 思路对
- **产品 schema 字段** — 覆盖了化工 B2B 必备字段（CAS、规格、纯度、包装、应用、文档）
- **Board checklist 的"A 必须公开 / B 必须准备 / C 后续增强"分级** — 比一般初创扎实很多，是审查里最强的一份资产

---

## 5. 必须修复的不一致

### 4.1 页面清单不一致（必须先对齐）

| 来源 | Applications 页 | Resources 页 |
|---|---|---|
| `ARCHITECTURE.md` 第 4 节路由表 | ❌ 无 | ❌ 无 |
| `docs/website_mindmap.html` | ✅ 列出 | ✅ 列出 |
| `planning/...content_checklist.xlsx` Sheet1 | ✅ 列出 | ✅ 列出 |
| `README.md` 目录结构 | ❌ 无 | ❌ 无 |

**用户决策: MVP 不做 Applications 和 Resources。**

**操作:**
- 修改 `docs/website_mindmap.html`，把这两个分支标灰或移到"二期"
- 修改 `planning/chemical_website_content_checklist.xlsx` Sheet1，把这两页相关行标记为"后续需要"
- `ARCHITECTURE.md` 和 `README.md` 已经一致，**不动**
- mindmap 的"行业应用入口"和"未列产品咨询/定制寻源"这两类内容仍保留 — 但落地为**首页一个 section** + **Contact 页一个 CTA**，而不是独立页面

### 4.2 法律页面在路由表里漏了

`board_checklist_review.xlsx` 已把"隐私政策"和"化工免责声明"标 A 必须公开，但 `ARCHITECTURE.md` 第 4 节路由表里只列了 6 个业务页，没有这两页。

**操作:** 在 `ARCHITECTURE.md` 路由表追加:
- `/privacy` — 隐私政策（Privacy Policy）
- `/disclaimer` — 化工产品信息免责声明（也可与隐私页合并）

放在 footer 链接，不进主导航。

### 4.3 一期产品图片和 PDF 文件路径未指定

架构把"Storage"丢到二期 Supabase，没说一期怎么放。

**操作:** 在 `ARCHITECTURE.md` 明确一期方案:
- 产品图: `public/products/{slug}/main.jpg`、`hero.jpg`
- 文档 PDF: `public/docs/{slug}-tds.pdf` 等（仅放可公开的）
- 用 Next.js `<Image>` 组件 + `sizes` 属性

---

## 6. MVP 范围内必须补的 5 项

这 5 项现在文档完全没提，但全是上线前必须有的：

1. **基础 SEO 资源** — `app/sitemap.ts`、`app/robots.ts`、`app/not-found.tsx`、`app/error.tsx`
   - Next.js App Router 都有官方范式，工作量小
2. **访问数据分析** — 看多少人访问、哪些页面、产品点击次数
   - 推荐: **Cloudflare Web Analytics**（免费、无 cookie、GDPR 友好、域名挂 Cloudflare 一键开）
   - 配合 **Google Search Console**（免费、必须接，看"采购商用什么词搜到你"）
   - 埋点自定义事件: 产品卡点击、联系按钮点击（mailto/tel/WhatsApp）
3. **错误监控** — `sentry/nextjs`，免费档 5k events/月够初创一年用
4. **站内搜索** — 化工采购最常按 CAS/英文名搜
   - 一期: **Fuse.js 客户端搜索**（产品 < 100 时无压力，零基础设施）
   - 二期接 Supabase 后再升级
5. **联系方式展示** — **不做表单**，只展示邮箱、电话、WhatsApp
   - 邮箱: `<a href="mailto:contact@yourdomain.com">`
   - 电话: `<a href="tel:+xxx">`
   - WhatsApp: `<a href="https://wa.me/xxx">`（点击直接跳 WhatsApp 聊天）
   - 加埋点: 所有联系按钮点击发送自定义事件到 Cloudflare Analytics
   - **不需要**: 表单、API Route (`/api/inquiry`)、邮件服务 (Resend)、反垃圾 (Turnstile)、隐私勾选

每项工作量都不大，但漏掉任何一项上线后都补不便宜。

---

## 7. i18n 方案修正（从字段级 → 路由级）

### 现状问题

`ARCHITECTURE.md` 第 8 节用 `nameZh` / `summaryZh` 字段 + `localStorage` 切换。**这种方案对 Google SEO 不友好**：
- 同一 URL 渲染不同语言 → Googlebot 只索引默认语言
- 中文采购商搜中文产品名找不到中文页

### 调整方案（用户已选）

```
src/app/
  [locale]/
    layout.tsx
    page.tsx
    products/
      page.tsx
      [slug]/
        page.tsx
    why-us/page.tsx
    about/page.tsx
    contact/page.tsx
    privacy/page.tsx
    disclaimer/page.tsx
```

- `locale` 限定为 `en` / `zh`
- 默认 redirect 根路径 `/` → `/en`（目标海外市场）
- 推荐用 **`next-intl`**（Server Components 友好、App Router 原生支持）
- 加 `<link rel="alternate" hreflang>` — 必须，否则双语 SEO 等于白做
- 文案文件: `messages/en.json`、`messages/zh.json`
- 产品 schema 字段重设计（见第 8 节）

### 内容生产策略

由于内容也是占位，**不要等中文翻译做完才上线**：
- 先英文 100%，中文做 fallback：缺失字段自动显示英文
- 在每个中文未译页面顶部加一行 banner: "中文版正在更新，部分内容暂以英文显示"
- 这能让 5-7 周时间窗口缩到 4-5 周

---

## 8. "内容未定 + 占位优先" 的架构调整

这是用户答案带出的新约束。当前架构对此考虑不足。

### 7.1 产品数据 schema 调整为多语言版

现状（单语，字段级双语）:
```ts
type Product = { name: string; nameZh?: string; summary: string; summaryZh?: string; ... }
```

调整为（locale-keyed）:
```ts
type LocalizedString = { en: string; zh?: string };  // zh 缺失时 fallback en
type Product = {
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  overview: LocalizedString;
  category: string;        // 内部 key, 不直接显示
  casNo?: string;
  // ... 其他字段同
  draft?: boolean;         // 新增: 是否占位 (上线时默认 published=true 但 draft 提示后台未来标识)
};
```

数据访问层在 `getX()` 时带 locale 参数，自动 fallback。

### 7.2 占位内容机制

在 `src/content/` 下:
- `placeholders/` — 占位图、占位段落、占位 Why Us 三大优势
- 占位图统一用 1 张 brand-colored 兜底图（避免上线全是破图）
- 占位文案带 `[PLACEHOLDER]` 前缀，方便后期 grep 找出未替换内容
- 加一个 `npm run check:placeholders` 脚本，构建前扫一遍提醒

### 7.3 产品分类不要硬编码

用户说"分类还不确定，先随便写几个"。架构上必须保证：
- 分类 key 在 `src/content/categories.ts` 集中定义
- 页面、组件、URL 路径都从这份单一来源读取
- 之后改 8 个分类 → 1 个分类，只改一个文件
- **现在已有的 `category: string` 字段方向是对的，保持**

### 7.4 推荐用 1 个完整示例产品做参照

虽然产品没定，但建议代码方先做 1-2 个**完整填充**的示例产品（如 Sodium Carbonate 这种常见品），把所有 schema 字段都填一遍当模板。后续替换时按这个填即可。

---

## 9. 可以砍掉/简化的（防止过度建设）

| 项 | 当前文档定位 | 建议 | 理由 |
|---|---|---|---|
| 管理后台 (`/admin`) | Phase 2 | **V0.3 才做** | 产品 < 50 时结构化文件维护比后台快 |
| AI 客服 | Phase 3 | **V0.3 才做** | 化工 AI 答错就是法规风险，最后做 |
| 产品对比模块 (`Typical Supplier vs Our Approach`) | 架构第 5 节、Why Us 都有 | **MVP 直接砍掉**（设计稿里 Why Us 已用 Cooperation Process 替代） | 不需要每个产品独立 comparison 数据 |
| 字段级双语 (`nameZh`) | 架构第 8 节 | **删除，改用路由级双语** | 见第 6 节 |
| Applications 独立页 | 设计稿已设计 | **V0.1 通过 feature flag 禁用，V0.2 启用** | 见第 9 节 Roadmap |
| Resources 独立页 | mindmap/checklist 含 | **V0.2 才做**，V0.1 把 PDF 直接放产品详情页 | 用户已确认 |
| Inquiry Form | 设计稿已设计 | **V0.1 不做**（联系页只展示 Contact Information 卡片）；V0.2 视转化数据再决定 | 见第 9 节 Roadmap |

---

## 10. 产品 Roadmap (V0.1 → V0.2 → V0.3)

### 9.1 V0.1 — MVP 上线版（5-7 周）

**目标:** 骨架先上线，建立公司基础线上身份，开始采集流量数据，让海外采购商能找到你并写邮件来。

**包含的页面（4 个核心 + 2 个法律页）:**
- ✅ Home (`/`) — 含 Hero / Product Categories / Featured Products 摘要 / Why Us 摘要 (作为首页 section) / Applications 摘要 (作为首页 section)
- ✅ Products (`/products`) — 列表 + 6 个分类入口 + 客户端搜索 (Fuse.js)
- ✅ Product Detail (`/products/[slug]`) — 含 Key Specs 表 + manual price CTA + Related Products
- ✅ Contact (`/contact`) — **只保留 Contact Information 卡片**（电话 / 邮箱 / 地址 / 响应方式），**不做 Inquiry Form**
- ✅ Privacy Policy (`/privacy`) — footer 链接，不进主导航
- ✅ Disclaimer (`/disclaimer`) — footer 链接，不进主导航

**通过 feature flag 暂时禁用的页面（代码已写但路由 / 导航不显示）:**
- ⏸️ Why Us (`/why-us`) — 内容已在首页摘要展示
- ⏸️ About (`/about`) — 启用后从开关切回 true 即可
- ⏸️ Applications (`/applications`) — 内容已在首页摘要展示

> **原因:** 设计稿都做了，按"代码先写、开关控制"原则把页面骨架放进代码库，避免 V0.2 时再补开发；V0.1 上线时 feature flag 设为 `false`，导航 / footer 自动隐藏链接。

**核心模块:**
- ✅ next-intl 路由级双语 (`/en` 默认，`/zh` 翻译可逐步补全)
- ✅ 产品 schema (locale-keyed)，1-2 个完整填充的示例产品 (建议 Caustic Soda Flakes / Hydrochloric Acid)
- ✅ 数据访问层 (`lib/products.ts` / `lib/categories.ts` / `lib/i18n.ts` / `lib/seo.ts`)
- ✅ **特性开关 (`config/features.ts`)** — 见第 10 节
- ✅ Fuse.js 客户端搜索
- ✅ Cloudflare Web Analytics + Vercel Web Analytics + Google Search Console
- ✅ 联系按钮埋点 (mailto / tel / WhatsApp 点击发自定义事件)
- ✅ Sentry / sitemap.xml / robots.txt / 404 / error.tsx
- ✅ 占位内容机制 + `npm run check:placeholders` 脚本
- ✅ 隐私政策 + 化工免责声明 (用模板生成器先出，律师过一眼)

**明确不在 V0.1 范围:**
- ❌ Inquiry Form / `/api/inquiry` / Resend / Turnstile
- ❌ Why Us / About / Applications 独立页 (代码写但禁用)
- ❌ Resources / FAQ / 下载中心
- ❌ Supabase / 管理后台
- ❌ AI 客服

**V0.1 验收标准:**
- 4 个核心页 + 2 个法律页双语都能访问
- 至少 1 个完整产品详情页可用作模板
- Cloudflare + Vercel Analytics dashboard 都能看到数据
- Search Console 索引验证通过、sitemap 已提交
- Lighthouse 三项 > 90
- 移动端 360px 宽度无横向滚动

---

### 9.2 V0.2 — 内容扩展版（V0.1 上线后 2-4 周）

**目标:** 启用之前禁用的页面，扩展产品库，根据 V0.1 数据决定要不要加表单。

**新启用 / 新建的页面:**
- ✅ Why Us (`/why-us`) — feature flag 切换为 `true`，填充设计稿内容（3 大优势 + 5 步合作流程）
- ✅ About (`/about`) — feature flag 切换为 `true`，**用真实数据替换设计稿占位**（20+ Countries 等数字必须改成真实可披露的）
- ✅ Applications (`/applications`) — feature flag 切换为 `true`，填充 6 个行业的具体痛点与解决方案文案
- ✅ Resources (`/resources`) — 新建，集中可下载的 SDS / TDS / COA / 公司宣传册 PDF
- ⚠️ FAQ section — 8-12 个高频问题，可作为 Resources 的子区域或独立组件嵌入多页

**产品库扩展:**
- ✅ 从 V0.1 的 1-2 个示例产品扩展到 30-50 个真实产品
- ✅ 中文版逐步翻译完成（V0.1 时 `/zh` 大部分页面 fallback 英文）

**条件性加入（视 V0.1 数据决定）:**
- 🟡 Inquiry Form — 如果 V0.1 期间 mailto 转化偏低（<2% 访客点击）则加；如果转化够则继续不做
  - 加入时需要: `/api/inquiry` API Route + Resend + Turnstile + honeypot + 隐私勾选

**V0.2 仍不做:**
- ❌ Supabase / 管理后台
- ❌ AI 客服

---

### 9.3 V0.3 — 后台与智能化版（V0.2 后 1-3 个月，按需推进）

**目标:** 当产品数 > 50 或运营人员需要自助维护时，引入数据库 + 后台。

**核心模块:**
- ✅ Supabase 接入（Database + Storage + Auth）
- ✅ 产品数据从 `src/content/products.ts` 迁移到 Supabase（页面层不变，数据访问层切换）
- ✅ 管理后台 (`/admin`)
  - 产品 CRUD / 上下架 / 排序 / featured 标记
  - 分类管理
  - SDS / TDS / COA 文件上传
  - 询盘列表 (如果 V0.2 启用了表单)
  - 状态: new / contacted / qualified / closed
- ✅ 邮件营销集成（订阅 newsletter / 发产品上新通知）

**AI 客服（独立小阶段，可选 V0.3.x）:**
- ✅ 产品 FAQ + 知识库切片 (`ai_knowledge_chunks` 表)
- ✅ ChatWidget 右下角浮出
- ✅ OpenAI API + 严格的人工介入规则
- ✅ 价格 / 合规 / 运输 / 安全相关问题强制转人工

---

## 11. 页面特性开关机制 (`config/features.ts`)

**用户需求:** "页面之间可以添加删除吧，比如一期没有 Why Us，我可以直接改个开关不展示"

### 10.1 设计

`src/config/features.ts`:

```ts
export type PageKey = 'home' | 'products' | 'productDetail' | 'whyUs' | 'about' | 'applications' | 'resources' | 'contact' | 'privacy' | 'disclaimer';

export const features: Record<PageKey, boolean> = {
  // V0.1 启用
  home: true,
  products: true,
  productDetail: true,
  contact: true,
  privacy: true,
  disclaimer: true,

  // V0.1 禁用，V0.2 启用
  whyUs: false,
  about: false,
  applications: false,

  // V0.2 启用
  resources: false,
};

export const navItems: Array<{ key: PageKey; href: string; labelKey: string }> = [
  { key: 'home', href: '/', labelKey: 'nav.home' },
  { key: 'products', href: '/products', labelKey: 'nav.products' },
  { key: 'whyUs', href: '/why-us', labelKey: 'nav.whyUs' },
  { key: 'about', href: '/about', labelKey: 'nav.about' },
  { key: 'applications', href: '/applications', labelKey: 'nav.applications' },
  { key: 'resources', href: '/resources', labelKey: 'nav.resources' },
  { key: 'contact', href: '/contact', labelKey: 'nav.contact' },
];

export const enabledNavItems = () => navItems.filter(item => features[item.key]);
```

### 10.2 在三处生效

**(a) 导航 (Header):**
```tsx
// components/layout/Header.tsx
import { enabledNavItems } from '@/config/features';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations();
  const items = enabledNavItems();
  return (
    <nav>
      {items.map(item => (
        <Link key={item.key} href={item.href}>{t(item.labelKey)}</Link>
      ))}
    </nav>
  );
}
```

**(b) Footer:**
```tsx
// Footer 的"Why Us"和"About"列也按 features 渲染
const showWhyUs = features.whyUs;
const showAbout = features.about;
{showWhyUs && <FooterColumn title="Why Us" links={...} />}
{showAbout && <FooterColumn title="About" links={...} />}
```

**(c) 路由层（防止有人直接访问 URL）:**
```tsx
// app/[locale]/why-us/page.tsx
import { features } from '@/config/features';
import { notFound } from 'next/navigation';

export default function WhyUsPage() {
  if (!features.whyUs) notFound();
  return <WhyUsContent />;
}
```

### 10.3 切换页面只需 3 步

1. 修改 `src/config/features.ts` 把对应 key 改为 `true`
2. 如果新启用的页面有内容文件，确保 `messages/en.json` / `messages/zh.json` / `src/content/...` 已填充
3. `pnpm build` → `git push` → Vercel 自动部署

**完全不需要改代码。**

### 10.4 SEO 注意事项

- 关闭页面时: 该路由返回 404，sitemap.xml 自动剔除（sitemap 也按 features 过滤）
- 重新启用时: 提交 sitemap 让 Google 重新索引
- 不要禁用 → 启用 → 再禁用一个页面，否则 Google 会判定为不稳定站点

---

## 12. Planning 文件审查

### 9.1 Content Checklist (`chemical_website_content_checklist.xlsx`)

- ✅ Sheet1 (页面内容清单) — 覆盖完整、字段合理
- ⚠️ **Applications/Resources 行需标记为"后续需要"**（用户决策）
- ⚠️ Sheet2 (产品清单) **完全空白** — 这是阻塞硬卡点之一，但用户已说先占位后补
- ✅ Sheet3 (公司基础) — 字段合理，未填，需要董事会决策

### 9.2 Board Checklist (`chemical_website_board_checklist_review.xlsx`)

整体质量很高。Sheet1（A/B/C 分级清单）、Sheet3（董事会决策项）都做得到位。

### 9.3 Planning 缺失的 5 项（影响代码动手或上线）

1. **SEO 关键词清单** — 中英文各 20-30 个核心采购关键词
   - 用 Ahrefs/Semrush 免费版或 Google Keyword Planner 出
   - 关键到首页/产品页 metadata 怎么写
2. **品牌视觉规范** — 主色、辅色、字体（中英各一套）、间距、圆角
   - 已有 logo 定稿，但前端没基准颜色无法配色
   - 建议给一份 1 页 brand-guideline，或至少在 design 目录下放 `brand-tokens.json`
3. **首批 5-10 个示例产品** — **即使是占位**，至少给代码方一份具体名单
   - 否则 schema 验证不了、分类导航不知道几条、首页 featured 区不知道排几个
   - 用户答复"代码时随便写"，但建议至少给个**期望品类范围**（如"工业酸碱 + 水处理"两类即可）
4. **公司核心 3 大优势的具体素材** — Why Us 模块需要
   - 不能是空泛 "high quality / fast delivery"
   - 至少给：质量控制有几道工序、平均交期、出口过哪些区域
5. **法律合规两份文案模板** — 隐私政策 + 化工免责声明
   - 不需要律师起草，先用通用模板（CookieYes / Iubenda 免费生成）改名字即可
   - 上线前最好让律师过一眼

---

## 13. 推荐的最终调整清单（按优先级）

### 立即修文档（在动代码前完成）

1. `ARCHITECTURE.md` 第 4 节: 删除路由表中的 Applications，追加 `/privacy`、`/disclaimer`；在每个路由旁标注 V0.1 / V0.2 / V0.3 启用版本
2. `ARCHITECTURE.md` 第 8 节: 重写 i18n 方案为路由级 + next-intl
3. `ARCHITECTURE.md` 第 9 节: **删除询盘表单章节**，改为"联系方式展示策略" — 只展示 mailto/tel/WhatsApp 链接 + 埋点
4. `ARCHITECTURE.md` 第 14 节: 重写"开发阶段拆分"为 V0.1 / V0.2 / V0.3 三阶段，对齐第 10 节 Roadmap
5. `ARCHITECTURE.md` 新增章节 "16. 访问数据分析策略" — Cloudflare Web Analytics + Vercel Web Analytics + Search Console + 自定义事件埋点
6. `ARCHITECTURE.md` 新增章节 "17. MVP 必备但被遗漏的 5 项"
7. `ARCHITECTURE.md` 新增章节 "18. 占位内容策略"
8. `ARCHITECTURE.md` 新增章节 "19. 页面特性开关机制" — 对齐第 11 节
9. `TECH_STACK_DECISION.md` 第 5 节: 把"中英文内容切换"具体化为"路由级双语 + next-intl"
10. `TECH_STACK_DECISION.md` 表格新增行: 分析 (Cloudflare + Vercel Web Analytics + Search Console)、错误监控 (Sentry)、搜索 (Fuse.js)
11. `TECH_STACK_DECISION.md` 第 9 节: **删除"一期联系表单"部分**
12. `TECH_STACK_DECISION.md` 第 5 / 6 节: 重命名为"V0.1 MVP 功能拆分"和"V0.2 / V0.3 功能拆分"
13. `README.md` 目录结构: 加 `[locale]/`、`messages/`、`config/features.ts`、`public/products/`、`public/docs/`；**删除 `api/inquiry/` 引用**
14. `docs/website_mindmap.html`: 给每个分支标 V0.1 / V0.2 / V0.3 标记
15. `planning/...content_checklist.xlsx` Sheet1: 标记 Applications/Resources 行为"V0.2 启用"；删除"询盘表单字段"相关行；产品基础信息行用设计稿数据预填

### 立即新建的交付物

16. **`docs/architecture-presentation.html`** — 18 张幻灯片的架构汇报 PPT，对应第 16 节规格
17. **`src/config/features.ts`（代码动手时）** — 页面特性开关，对应第 11 节设计

### 立即补 Planning（在动代码前与董事会对）

1. SEO 关键词清单（中英各 20-30）
2. 品牌色 token / 字体规范（设计稿可读出主色: 深蓝 + 金色，需要正式 brand-tokens.json 落地）
3. ⚠️ **"20+ Countries / 15+ Years"等设计占位数据必须替换为真实可披露数字** — 否则有合规与诚信风险
4. 隐私政策 + 免责声明文案（用模板生成器先出，律师过一眼）
5. 决策: V0.1 启用页面集（默认: Home / Products / Product Detail / Contact / Privacy / Disclaimer）+ V0.2 启用页面集（Why Us / About / Applications / Resources）

### 代码动手时（V0.1 范围）

**前端纯静态，无后端服务。**

页面（启用）: Home / Products / Product Detail / Contact / Privacy / Disclaimer (6 页 × 2 语言)
页面（写好但禁用）: Why Us / About / Applications (3 页 × 2 语言)

模块:
- next-intl 国际化路由 (`app/[locale]/...`)
- 数据访问层 (`lib/products.ts`、`lib/categories.ts`、`lib/i18n.ts`、`lib/seo.ts`)
- 产品 schema (locale-keyed: `{ en: string, zh?: string }`)
- 特性开关 (`config/features.ts`)
- Fuse.js 客户端搜索
- 联系方式展示 + 埋点 (mailto/tel/WhatsApp + Vercel Analytics custom events)
- Cloudflare Web Analytics + Vercel Web Analytics 集成
- Google Search Console 验证 + sitemap 提交
- Sentry / sitemap / robots / 404 / error
- 占位内容机制 + 占位检查脚本 (`pnpm run check:placeholders`)
- 1-2 个完整填充的示例产品作为模板（推荐 Caustic Soda Flakes / Hydrochloric Acid）

**删除 / V0.1 不做:**
- `/api/inquiry` API Route
- Resend 邮件服务
- Cloudflare Turnstile 反垃圾
- 表单字段、隐私勾选、表单 routing
- cookie consent banner（双源 Analytics 都无 cookie，不需要）

---

### 不在 Phase 1 范围（明确推后）

- Supabase / 管理后台 → Phase 2
- AI 客服 → Phase 3
- 独立的 Applications 页、Resources 页
- 产品级"竞品对比"独立模块（合并到 Why Us 简化版）
- 客户案例 / testimonials（初创没素材）
- 资质证书展示（无 ISO 时不硬写）

---

## 14. 额外的架构简化收益

砍掉表单后，MVP 变成**真正的纯静态前端 + 第三方分析服务**，带来以下收益:

1. **零后端基础设施** — 不需要 API Routes、数据库、邮件服务、环境变量管理
2. **零 serverless 函数** — Vercel 部署时全走静态 HTML，不触发任何 Edge / Serverless Functions
3. **极低成本** — Vercel 免费档完全足够（Hobby: 无限 bandwidth），Cloudflare Analytics 免费，Search Console 免费，Sentry 免费档 5k/月
4. **极快首次加载** — 无 JS API 调用，联系按钮直接跳 mailto / tel / WhatsApp
5. **零合规风险** — 无 cookie (Cloudflare Analytics 无 cookie)，Privacy Policy 只需声明"无用户数据收集"
6. **易维护** — 产品更新只需改 `src/content/products.ts` 重新 build，不涉及数据库迁移

**未来二期加 Supabase 时的路径也更清晰:**
- Phase 1: 纯静态 (现在)
- Phase 1.5: 如果需要表单，加一个 `/api/inquiry` Route + Resend，仍不动产品数据源
- Phase 2: 产品数据切到 Supabase，前台页面逻辑不动 (数据访问层切换)
- Phase 2.5: 加管理后台
- Phase 3: AI 客服

## 15. 分析平台接入详细方案

### 14.1 数据采集分工（双源互补）

| 平台 | 角色 | 采集内容 | 接入成本 | 费用 |
|---|---|---|---|---|
| **Cloudflare Web Analytics** | 网络层 | PV / UV、Top Pages、来源国家、Referrer、Core Web Vitals、设备 | 1 个 `<script>` 标签 | 免费 |
| **Vercel Web Analytics** | 应用层 | 自定义事件（按钮点击、产品点击、搜索词等） | `npm i @vercel/analytics` + `<Analytics />` | 免费 50k events/月 |
| **Google Search Console** | 搜索层 | 哪些关键词搜到你、点击率、排名、索引状态 | DNS TXT 验证 + sitemap 提交 | 免费 |

**为什么不只用 Cloudflare:** Cloudflare Web Analytics 的核心是被动页面统计，自定义事件 API 在 2026 年仍较弱，无法稳定捕获"产品 X 被点击多少次"这类细粒度行为。Vercel Web Analytics 的 `track()` API 是当前 Vercel 部署场景下最干净的自定义事件方案。两者并存零冲突。

### 14.2 Cloudflare Web Analytics 接入

**步骤:**
1. 域名 DNS 切到 Cloudflare（如还没）— 在 Cloudflare 注册账号 → Add a Site → 按提示改 NS 记录
2. Cloudflare Dashboard → Analytics & Logs → Web Analytics → Add a site
3. 拿到 beacon token（32 位字符串），保存到 `.env.local`:
   ```
   NEXT_PUBLIC_CF_BEACON_TOKEN=xxxxxxxxxxxxxxxxxx
   ```
4. 在 `app/[locale]/layout.tsx` 注入 beacon:
   ```tsx
   import Script from 'next/script';

   export default function Layout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Script
             strategy="afterInteractive"
             src="https://static.cloudflareinsights.com/beacon.min.js"
             data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_BEACON_TOKEN}"}`}
           />
         </body>
       </html>
     );
   }
   ```
5. 部署后 24h 内 Dashboard 出数据

**Dashboard 能看到:**
- PV / Visitors / Sessions
- Top Pages（哪个产品页被访问最多）
- 国家分布（采购商来自哪里）
- Referrer（采购商从哪个网站点过来）
- Core Web Vitals（页面性能 LCP/FID/CLS）
- 设备类型（PC/手机比例）

### 14.3 Vercel Web Analytics 接入（自定义事件主力）

**步骤:**
1. 安装:
   ```bash
   pnpm add @vercel/analytics
   ```
2. 在 `app/[locale]/layout.tsx` 注入:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';

   export default function Layout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```
3. Vercel Dashboard 上启用 Analytics（Project Settings → Analytics → Enable）
4. 部署即开始统计

**自定义事件埋点 (核心):**
```tsx
'use client';
import { track } from '@vercel/analytics';

// 联系按钮点击
<a
  href="mailto:contact@yourdomain.com"
  onClick={() => track('contact_email_click', {
    page: pathname,
    product: productSlug ?? 'none',
  })}
>
  Email us
</a>

// 产品卡点击
<Link
  href={`/products/${slug}`}
  onClick={() => track('product_card_click', {
    slug,
    source: 'home_featured',
  })}
>
  ...
</Link>
```

### 14.4 关键自定义事件清单（埋点表）

代码方按此表实现埋点：

| 事件名 | 触发位置 | 属性 | 用途 |
|---|---|---|---|
| `product_card_click` | 产品列表/首页卡片点击 | slug, source（home_featured / category_listing） | 看采购商从哪里进入产品 |
| `contact_email_click` | mailto 按钮 | page, product_slug | 看哪个产品页最容易引出邮件 |
| `contact_phone_click` | tel 按钮 | page | 看电话点击 |
| `contact_whatsapp_click` | WhatsApp 链接 | page, product_slug | 看 WhatsApp 转化 |
| `search_query` | 站内搜索提交 | query, results_count | 看采购商搜什么词、有没有结果 |
| `language_switch` | 语言切换 | from, to, page | 看中英文偏好 |
| `pdf_download` | TDS/SDS 下载（如果一期开放下载） | doc_type, product_slug | 看资料热度 |

### 14.5 Google Search Console 接入

**步骤:**
1. 访问 https://search.google.com/search-console
2. Add property → 选 **Domain** 类型（不是 URL prefix），输入根域名
3. 验证: 按提示在域名 DNS 加一条 TXT 记录（值类似 `google-site-verification=xxxxx`），等 5-15 分钟生效
4. 验证通过后，左侧菜单 → Sitemaps → 提交 `https://yourdomain.com/sitemap.xml`
5. 等 3-7 天开始有数据（短期内可能"覆盖率"会先出来，"效果"数据慢些）

**Dashboard 能看到:**
- Performance → 哪些查询词搜到你、CTR、平均排名
- Coverage → 哪些页面被索引、有什么错误
- Pages → 每个产品页的具体搜索表现
- Mobile Usability → 移动端可用性问题

### 14.6 上线后的数据 review 节奏

- **第 1 天**: 验证三个平台都开始有数据流
- **第 7 天**: 看 Cloudflare PV/UV、Vercel 自定义事件、Search Console 索引状态
- **第 14 天**: Search Console 关键词数据开始可读，调整 SEO metadata
- **第 30 天**: 对比"产品 PV 排名"vs"contact_email_click 转化"，决定首页 featured 产品调整

### 14.7 隐私合规

- Cloudflare Web Analytics、Vercel Web Analytics 都**不使用 cookie**，不需要 cookie consent banner
- 隐私政策需声明的内容很简单：
  > "We use Cloudflare and Vercel privacy-friendly analytics. No cookies are set; no personal data is tracked. Aggregate visit data (page views, country, browser) is collected to improve site quality."

---

## 16. 架构 PPT 交付物

用户要求交付一份 HTML 格式的架构汇报演示文稿，向甲方汇报用。

**输出文件:** `docs/architecture-presentation.html`

**内容结构（约 18 张幻灯片）:**

1. **封面** — AOWATT Global Materials 官网架构方案 / 日期 / V0.1
2. **项目背景** — 化工 B2B 出海贸易官网的定位与商业目标
3. **MVP 核心理念** — 骨架先上线，内容逐步替换；纯静态前端，零后端服务
4. **整体架构图** — Mermaid 流程图 (Visitor → Vercel Static → Cloudflare DNS/CDN → Analytics 三方)
5. **技术栈选型表** — Next.js / TypeScript / Tailwind / next-intl / Vercel + 选择理由
6. **页面清单与设计稿** — 7 个页面（缩略截图）+ 双语标记
7. **双语策略** — 路由级 i18n / hreflang / 中文增量翻译
8. **联系方式策略** — 砍掉表单的理由 + mailto/tel/WhatsApp + 埋点
9. **数据分析三源方案** — Cloudflare（被动）+ Vercel（主动事件）+ Search Console（搜索词）
10. **关键事件埋点清单** — 7 个核心自定义事件表
11. **页面特性开关机制** — features.ts 演示，强调"动态显隐不需要改代码"
12. **占位内容策略** — 工程支撑：locale-keyed schema + 占位扫描脚本
13. **Roadmap V0.1** — 5-7 周交付（4 核心页 + 2 法律页 + 3 页禁用待启用）
14. **Roadmap V0.2** — 启用 Why Us / About / Applications / Resources，扩展产品库
15. **Roadmap V0.3** — Supabase + 管理后台 + AI 客服
16. **三阶段架构演进图** — Mermaid 时间轴
17. **成本预算** — 月 $0-10（Vercel Hobby + Cloudflare 免费 + Sentry 免费 + 域名年费摊销）
18. **风险与依赖** — 内容素材进度是关键路径 + 建议立即决策事项
19. **下一步** — 启动节点 + 责任分工

**技术规格:**
- 单文件 HTML（含内联 CSS + 必要的内联 JS）
- 仅外部依赖：Google Fonts（Noto Sans SC + Inter）和 Mermaid CDN（用于架构图与 Roadmap 时间轴）
- 全屏 + 键盘翻页（空格 / 方向键 / Esc 退出全屏）
- 16:9 比例，适配 1920×1080
- 中文为主，关键技术术语保留英文
- 设计风格：与 AOWATT 设计稿一致 — 深蓝主色 (#0F1B3C 类) + 金色点缀 (#D4A24E 类) + 白底深色文字
- 顶部右侧固定显示当前页码 / 总页数
- 底部右侧固定显示 AOWATT logo（用文字代替即可）
- 打印 / 导出 PDF 可用（使用 `@media print`，每页一张幻灯片）
- 进度条横在顶部细线显示

**交付一并产出:**
- `docs/architecture-presentation.html` — 主文件
- 不依赖外部图片（如需配图用 SVG 内联或 Unicode 图标）

---

## 17. Verification

文档与规划修订完成后，验证清单:

- [ ] `docs/ARCHITECTURE.md` 路由表与 `docs/website_mindmap.html`、`planning/...content_checklist.xlsx` Sheet1 三处页面清单完全一致（且都不包含 Applications / Resources）
- [ ] `docs/ARCHITECTURE.md` 所有"二期"和"三期"标记的功能在 Phase 1 章节中没有出现；所有"询盘表单"相关章节已删除
- [ ] `docs/ARCHITECTURE.md` 新增章节 16 (分析策略)、17 (必备 5 项)、18 (占位策略) 存在且完整
- [ ] `TECH_STACK_DECISION.md` 第 1 节技术栈表覆盖了第 5 节的所有 5 项必备能力（不包含 Resend / Turnstile）
- [ ] `TECH_STACK_DECISION.md` 第 9 节已改为"联系方式展示"，不包含表单/API/邮件服务描述
- [ ] `README.md` 目录结构不包含 `api/inquiry/`，包含 `[locale]/`、`messages/`、`public/products/`、`public/docs/`
- [ ] `planning/...content_checklist.xlsx` 三个 sheet 至少有"首批产品期望品类范围"和"Why Us 三大优势"被填写
- [ ] `design/brand-tokens.json`（或一页 brand 文档）存在，至少包含主色、字体名
- [ ] 隐私政策与免责声明文案草稿已在 `planning/` 或 `docs/legal/` 下落地

代码阶段验证（这部分等代码开始后再做）:
- `pnpm build` 成功且产物全是静态文件，sitemap.xml/robots.txt 存在
- `/en` 和 `/zh` 两语言都能访问，hreflang 标签正确
- mailto / tel / WhatsApp 点击触发 Cloudflare Analytics 自定义事件
- Cloudflare Web Analytics dashboard 能看到访问数据
- Google Search Console 验证通过
- Sentry 能捕获一次故意错误
- Lighthouse 分数（Performance / SEO / Accessibility）三项 > 90
- 移动端 360px 宽度无横向滚动

---

## 18. 用户答复留下的决策点记录

1. **上线时间: V0.1 5-7 周** — 用户选了"保留双语，接受时间拉长"
2. **砍掉表单** — V0.1 大幅简化技术栈，纯静态前端无后端
3. **分析方案:** Cloudflare + Vercel Web Analytics + Google Search Console（双源主动+被动）
4. **部署:** Vercel (继续)
5. **产品与内容现状:** 设计稿已提供大量占位内容（公司信息、产品分类、6 个示例产品、3 大优势、5 步流程等），仍需替换"20+ Countries / 15+ Years"等不实数据
6. **页面特性开关:** V0.1 写好 Why Us / About / Applications 代码但禁用，V0.2 切开关启用，零代码修改
7. **三阶段 Roadmap:** V0.1 / V0.2 / V0.3 明确产出，对齐之前 Phase 1/2/3 但更细
8. **产品分类不确定 + 双语 SEO** — 双语 SEO 需要稳定 URL；建议初期发布时设置 `noindex` for `/products/*` 直到产品列表 30 天内不再变动

**最终方向明确:** V0.1 是一个"骨架先上线、内容逐步填充、未来一切扩展靠开关切换"的双语纯静态官网。架构层面强调三件事:
- **数据访问层抽象** — 让数据源切换不影响前台页面
- **特性开关** — 让页面启停不影响代码部署
- **占位内容机制** — 让真实素材替换不阻塞上线
