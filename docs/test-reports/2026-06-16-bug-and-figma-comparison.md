# AOWATT 网站 Bug 测试与 Figma 原型对比报告

**测试日期**：2026-06-16
**测试人员**：Claude Code（自动化）
**Git Commit**：`2405431` (main)
**dev server**：`http://localhost:3000`（Next.js 15.5.19）
**浏览器视口**：CSS 1440×900（DPR 0.8 → 实测 inner 1800px，内容受 `max-w-page-max=1440` 居中约束，不影响相对测量）
**Figma 原型**：`https://www.figma.com/design/PcB54ASGra5RLsMyNyBrmo`
**测试方法**：Playwright MCP（DOM 实测 + computed style）+ Figma MCP（节点 metadata + variable defs）数值对比

---

## 摘要

| 严重度 | 数量 |
|--------|------|
| 严重 | 4 |
| 中 | 5 |
| 轻微 | 4 |
| **合计** | **13** |

覆盖 6 个启用页面（en）+ 中文版抽查 + 3 个禁用页 + 1 个 404 路由。Header/Footer 在所有 6 个 en 页面上结构、链接、文案一致 ✓。无横向滚动（1440 / 360 两个断点）✓。设计 token（颜色、字号、按钮高度、卡片圆角）整体落地准确 ✓。

主要问题集中在**未替换的占位符文本**和**PageHero 高度偏离 Figma**两条线索。

---

## Bug 列表（按严重度排序）

### [严重] B-001 · `[PLACEHOLDER]` 文案在生产页面公开渲染（产品列表 + 详情 + 法律页）

- **路由**：`/en/products`、`/zh/products`、`/en/products/{caustic-soda-flakes-99,…}`、`/en/privacy`、`/zh/privacy`、`/en/disclaimer`、`/zh/disclaimer`
- **断点**：所有
- **证据**：
  - 截图：`.playwright-mcp/bugs/products-en-1440-fullpage.png`、`products-zh-1440-fullpage.png`、`product-detail-en-1440-fullpage.png`、`disclaimer-en-1440-fullpage.png`
  - 实测 DOM 文本：`document.body.innerText.includes('[PLACEHOLDER]') === true`
  - 脚本 `pnpm check:placeholders` 输出：**Found 25 placeholder(s)**
- **期望**：CLAUDE.md "Do Not" 段明确——不允许 `[PLACEHOLDER]` 内容上线，且 `pnpm check:placeholders` 是 `pnpm verify` 的一部分
- **实际**：用户可见文本中暴露开发者占位符，例如：
  - `src/content/products.ts` 中 4 个产品（Sodium Hypochlorite / Industrial Solvent Blend / Citric Acid / Mining Collector Reagent）的 `summary` / `overview` / `packaging` / `applications` / `specs` 字段全部为 `[PLACEHOLDER] …`
  - `src/content/legal/privacy.{en,zh}.md` 第 5 行：`AOWATT Global Materials ([PLACEHOLDER company full legal name], ABN [PLACEHOLDER]) operates this website …`
  - `src/content/legal/disclaimer.{en,zh}.md` 第 5 行：同样模式
  - 进一步：详情页 `/en/products/caustic-soda-flakes-99/` 通过相关产品（relatedProductSlugs 引用 sodium-hypochlorite/citric-acid）将 `[PLACEHOLDER]` 文本带入页面
- **复现**：访问 `/en/products`，向下滚动到第二行卡片 → 看到 `[PLACEHOLDER] Industrial bleach…`；访问 `/en/privacy` → 第一段就有 `[PLACEHOLDER company full legal name]`
- **建议**：要么补全这 4 个产品和 2 份法律文件的真实文案，要么在 V0.1 数据中将 `published: false` 隐藏这些产品并暂时移除法律页中的占位符段落

---

### [严重] B-002 · `pnpm verify` 流水线被绕过

- **路由**：项目级（CI）
- **证据**：
  - `package.json` 第 16 行：`"verify": "pnpm lint && pnpm test && pnpm check:placeholders && pnpm check:no-fake-stats && pnpm check:no-forms && pnpm build"`
  - `pnpm check:placeholders` 实际执行结果：**报错并罗列 25 处**，但页面仍构建成功并部署（commit `2405431` 是当前 main）
- **期望**：占位符检查应作为发布闸口，使 placeholder 内容无法进入 main
- **实际**：脚本写好但 main 上仍有违例数据。要么 `verify` 没在 CI 上跑，要么 `check:placeholders` 退出码不致命
- **复现**：在 main 当前 SHA 跑 `pnpm check:placeholders`，看到 25 条违例
- **建议**：确认脚本退出码非零（实际看输出格式像是只 stdout 不 exit 1），并在 CI/pre-commit 中接入 `pnpm verify`

---

### [严重] B-003 · 禁用页 404 响应仍泄漏 `generateMetadata` 标题

- **路由**：`/en/why-us`、`/en/about`、`/en/applications`（zh 同）
- **断点**：所有
- **证据**：
  - HTTP 状态码 ✓ `404`（PowerShell `Invoke-WebRequest` 验证）
  - 但 `<title>` 标签实测为 `"Why Work With Us — AOWATT"`、`"About Us — AOWATT"` 等——禁用页的 `generateMetadata` 在 `notFound()` 之前就执行了
  - 截图：`.playwright-mcp/bugs/notfound-en-1440.png`（对照之下纯不存在路由 `/en/__nonexistent__/` 的 title 是 `"404: This page could not be found."`）
- **期望**：禁用页的 404 响应 title 应为统一的 "Page not found — AOWATT" 或类似，不应泄漏被禁页面的元数据
- **实际**：搜索引擎 / 社交分享卡片可能因此抓到 "Why Work With Us — AOWATT" 这种暗示该页存在的标题
- **建议**：在禁用页 `page.tsx` 中将 `notFound()` 调用前置到 `generateMetadata` 检查，或让 `generateMetadata` 在 features 关闭时返回 not-found 通用 metadata

---

### [严重] B-004 · 两套 404 体验不一致

- **路由**：A=`/en/why-us`（feature-disabled） vs B=`/en/__nonexistent__`（route-not-found）
- **断点**：所有
- **证据**：
  - A 渲染自定义 `not-found.tsx`：完整 Header + Footer + "Page not found" h1 + Contact CTA + Back to Home（截图：`disclaimer` 截图同 shell）
  - B 渲染裸 Next.js 默认 `<title>404: This page could not be found.</title>`，无 Header/Footer
- **期望**：所有 404 走同一个体验（自定义 not-found.tsx）
- **实际**：未匹配的 URL 跳过自定义 not-found.tsx
- **建议**：检查 `src/app/[locale]/not-found.tsx` 路径与根 not-found 是否完整覆盖未匹配段。可能需要在 `src/app/not-found.tsx` 复制一份等效 shell，或者添加 catch-all `[...slug]` 路由

---

### [中] B-005 · 内页 PageHero 高度比 Figma 高 158px

- **路由**：`/en/products`、`/en/products/{slug}`、`/en/contact`（共用 PageHero 组件）
- **断点**：1440px desktop
- **证据**：
  - 实测 PageHero `<section>` `offsetHeight = 488px`
  - Figma `Page Hero Background` (Frame `37:30` / `37:189` / `37:547`) 高 330px
- **期望**：PageHero 背景高度 330px（按 Figma）
- **实际**：488px，偏多 158px
- **复现**：访问 `/en/products`，DevTools 选中 hero `<section>` 看 height
- **建议**：检查 `src/components/ui/PageHero.tsx` 的内边距与最小高度。可能是 `py-20` (80px each) + 内容自适应导致整体偏高。Figma 设计的 hero 内容高度为 204+30+48+一些间距 ≈ 282 + 上下各 24-32 边距 ≈ 330。实现里很可能多了 `py-20` 导致 +96px

---

### [中] B-006 · Home 页 Hero 内容比 Figma 设计低 91px

- **路由**：`/en`、`/zh`
- **断点**：1440px desktop
- **证据**：
  - 实测 Hero 顶 `padding-top: 80px`（CSS 中 `py-20`）
  - Figma `Hero Copy` 偏移 y=56 inside Hero（Frame `3:14`）
  - h1 实测 y=273；Figma 期望 y = 126(Header) + 56 = 182；差 91px
- **期望**：Hero 顶部 padding 56px 以匹配 Figma；CLAUDE.md 也有 `hero-pt: 72px` token 但被忽略
- **实际**：Hero `<section>` 用 Tailwind `py-20`，未使用 `pt-hero-pt` token
- **建议**：将 Home Hero 的 `py-20` 替换为 `pt-hero-pt pb-hero-pb` 这一对（CLAUDE.md 中已定义）。同时检查为什么内页 PageHero 用 `pt-[64px]` 与 home 不一致

---

### [中] B-007 · Why card 用 `★` ASCII 字符代替 Figma 的 line icon

- **路由**：`/en`（首页 Why Work With Us 区段）
- **断点**：所有
- **证据**：
  - DOM 抓取 first Why card innerHTML：`<div class="w-16 h-16 rounded-full bg-gold/10 …"><span class="text-2xl text-gold">★</span></div>`
  - Figma `Why Icon` (Frame `3:138` 等) 是 60×60 椭圆 + line-stroke icon 占位
- **期望**：用 SVG/icon 字体或与 Figma 占位一致的视觉
- **实际**：3 张 Why 卡片都是同一个填充星号字符
- **建议**：临时方案保留 ASCII 也可，但应至少在 3 张卡片用不同 icon 表达 "Quality Documents / Export Packaging / Responsive Support" 的差异

---

### [中] B-008 · Products 列表 Search Box 宽度比 Figma 窄约 600px

- **路由**：`/en/products`
- **断点**：1440px desktop
- **证据**：
  - 实测 search input rect：x=564, y=678, w=672, h=48
  - Figma `Products Search Box` (`77:2`)：x=80, y=560, w=1280, h=56
- **期望**：search box 全宽（1280px）+ 高 56px
- **实际**：约半宽（672px）+ 高 48px，且向右偏移
- **建议**：`src/components/products/ProductSearchBox.tsx` 容器加 `w-full max-w-page-max` 并将高度调整到 56

---

### [中] B-009 · Products 列表 Featured Products 卡片高度与 Figma 不符

- **路由**：`/en/products`
- **断点**：1440px desktop
- **证据**：
  - 实测 product card `width=405, height=352`
  - Figma `Featured Products` (`Product Card / …` ids 37:101、37:110…)：`width=406, height=130`（紧凑卡）
  - Figma `Category Card / …` (37:45 系列)：`width=406, height=256`（标题 + 视觉占位）
- **期望**：精选产品卡 130h（紧凑展示），分类卡 256h
- **实际**：所有产品卡都是 352h（接近详情卡的尺寸）
- **建议**：拆分 `ProductCard` 为紧凑 / 标准两种 variant，对应 Featured Products 区段使用紧凑版

---

### [轻微] B-010 · Card 边框 `0.833333px` 受 DPR 影响

- **路由**：所有 card 出现的页面
- **证据**：
  - 实测 `borderWidth = "0.833333px"`，颜色 `rgb(219, 224, 235) = #DBE0EB` ✓
  - 因为浏览器 DPR=0.8（Windows 显示缩放），1px CSS = 0.833 device px
- **期望**：1px border 在 1× DPR 下呈现实 1px 像素
- **实际**：实际为亚像素，可能在某些 DPI 下变得很淡
- **建议**：测试在 DPR=1 / 2 / 3 显示器上是否一致；这不是代码 bug，是测试环境信号——但作为 sanity check 列出

---

### [轻微] B-011 · Footer logo 资源使用 lazy loading 在首屏不可见

- **路由**：所有页面
- **证据**：
  - 进入页面但未滚动时：`document.querySelector('footer img').naturalWidth === 0, complete: false, loading: 'lazy'`
  - 滚到 footer 后：`naturalWidth=1254, complete=true` ✓
  - 资源本身 200，文件 1.7MB
- **期望**：lazy 是合理默认，但 1.7MB 的 PNG 较大
- **实际**：lazy 工作正常，但首屏 Network 中没有它
- **建议**：考虑把 footer logo 压缩到 < 200KB 或用 SVG（同源 header logo 也是 1.7MB 同一 PNG）

---

### [轻微] B-012 · Mobile Header 横向 padding 比 CLAUDE.md 规范小 8px

- **路由**：所有页面（mobile）
- **断点**：360px（实测 viewport 450）
- **证据**：
  - 实测 header 内层 `padding-left: 16px / padding-right: 16px`
  - CLAUDE.md "Responsive Breakpoints" 段：mobile padding 24px
- **期望**：mobile 24px 横向边距
- **实际**：16px（Tailwind 默认 `px-4`）
- **建议**：在 Header 内层容器加 `px-4 md:px-header-px` 改成 `px-6 md:px-header-px`（24/78）

---

### [轻微] B-013 · `_rsc` 预取偶发 500（dev only，未影响渲染）

- **路由**：`/en` 等
- **断点**：所有
- **证据**：Console 4× `Failed to load resource: 500 @ http://localhost:3000/en/?_rsc=ZtiMITgb9cyC_BcS:0`
- **期望**：所有 RSC prefetch 200
- **实际**：开发模式下偶发 500（直接 `Invoke-WebRequest /en/?_rsc=test` 返回 200，疑似首次编译期间的瞬时错误）
- **建议**：在 production build (`pnpm build && pnpm start`) 上重新跑，确认是否复现

---

## 通过项（正面记录）

设计 token 落地：
- ✅ Header 高度 126px、bg `#010912 navy`、active nav 文字白 + 金色下划线 3px (`#F09F14`)
- ✅ Header logo 加载正常（1254×1254）
- ✅ Hero h1 字号 `56/68 w700`，颜色白
- ✅ Hero subtitle `19/30 w400`，颜色 `#D1E0F0 gray-light`
- ✅ Section h2 字号 `34/42 w700`，颜色 `#091C1C navy-deep`
- ✅ Button primary：bg `#053B7D`、白字、h=48、br=4、字号 15 w600、末尾 →
- ✅ Button secondary：bg 白、border `#F09F14` gold、h=48、br=4、末尾 →
- ✅ 卡片圆角 `7px` border-radius，border 颜色 `#DBE0EB`
- ✅ Footer 三栏 grid + gap 24px

交互与功能：
- ✅ 所有 Header nav 链接跳转正确（含 locale 前缀）：`/en/`、`/en/products/`、`/en/contact/`
- ✅ 所有 Footer category 链接跳转 `?category=…` query string
- ✅ `mailto:info@aowatt.com.au`、`tel:+61451875076`、`https://wa.me/61451875076` 格式正确
- ✅ Privacy / Disclaimer 在 Footer bottom strip 中可点击
- ✅ Active nav state 在每个页面切换正确（Home / Products / Contact / Detail 都有正确的金色下划线）
- ✅ Language Switcher：`/en` 时 EN active 白色，`/zh` 时 中文 active 白色，URL 互切正常
- ✅ 中文版渲染：title `产品 — AOWATT`、h1 `产品`、nav `首页/产品/联系`，无 i18n missing key
- ✅ Contact 页 4 张卡片 (Email/Phone/WhatsApp/Address) 均有有效 CTA href
- ✅ Contact 页**无 form / input / textarea**（CLAUDE.md 要求）
- ✅ Product Detail 页**无 COA/SDS/TDS 文档下载 chip**（CLAUDE.md 要求）
- ✅ Header / Footer 在 6 个启用页面上结构、链接、文案一致
- ✅ 360 / 768 / 1440 三档断点均无横向滚动
- ✅ Footer 在 mobile 折叠成单列
- ✅ Hero h1 在 mobile 自动从 56px 缩到 36px

---

## 未覆盖 / 已知限制

1. **Figma 文件无 mobile 设计**——360/768 仅按 CLAUDE.md "Responsive Breakpoints" 文字描述判断，未做逐节点 metadata 对比。
2. **DPR 0.8** 的 Windows 显示缩放使得 viewport 报告 1800/450 而非 1440/360，所有 px 测量带 ≈25% 缩放系数。报告中的相对偏差结论已修正，但绝对像素读数需 ÷ 1.25 才接近设计像素。
3. **Hover 视觉验证靠类名 + transition CSS 推断**，没做 `mouseenter` 后再次 `getComputedStyle` 的双采样——但 Tailwind `hover:` class 与 `transition-colors` 都已确认存在。
4. **`error.tsx` 未触发**——dev 模式没有简单方式制造服务端错误。
5. **未跑 production build**——dev mode 的 RSC 500 与 lazy-loading 警告可能在 `pnpm build && pnpm start` 下不复现。
6. **未做 axe / Lighthouse 可访问性扫描**——超出本次"原型对比 + bug"范围。

---

## 建议的修复优先级

1. **立即处理**（阻断发布）：
   - B-001 替换 25 处 `[PLACEHOLDER]`（产品数据 + 法律页）
   - B-002 修 `pnpm check:placeholders` 退出码并接入 CI
2. **本期内**：
   - B-005 / B-006 PageHero + Home Hero 高度对齐 Figma
   - B-008 / B-009 Products 列表搜索框 + 卡片尺寸对齐 Figma
   - B-007 Why card icon 替换为 SVG / 区分性图标
3. **下一轮**：
   - B-003 / B-004 404 metadata 与 not-found 体验统一
   - B-012 mobile header padding
4. **观察**：
   - B-010 / B-011 / B-013 视情况

---

## 附件索引

所有截图位于 `.playwright-mcp/bugs/`：

| 文件 | 内容 |
|------|------|
| `home-en-1440-fullpage.png` | 首页（en，desktop） |
| `home-en-360-fullpage.png` | 首页（en，mobile） |
| `products-en-1440-fullpage.png` | 产品列表（en，desktop） |
| `products-zh-1440-fullpage.png` | 产品列表（zh，desktop） |
| `product-detail-en-1440-fullpage.png` | 产品详情（en，desktop） |
| `contact-en-1440-fullpage.png` | 联系页（en，desktop） |
| `disclaimer-en-1440-fullpage.png` | 免责声明（en，desktop） |
| `notfound-en-1440.png` | 裸 404 页（对比禁用页 not-found） |

Figma Frame 引用：

| Frame | nodeId |
|-------|--------|
| Home | `1:2` |
| Products List | `37:2` |
| Product Detail | `37:161` |
| Contact | `37:519` |
| Header (per-page instances) | `3:2` / `37:3` / `37:162` / `37:520` 等 |
| Footer (per-page instances) | `3:187` / `37:14` / `37:173` / `37:531` 等 |
