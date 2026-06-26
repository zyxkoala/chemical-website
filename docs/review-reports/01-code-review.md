# 代码审查报告

**审查时间**：2026-06-24  
**审查范围**：AOWATT Chemical Website — src/ 全量代码  
**审查员**：代码审查 Agent

---

## 一、安全性审查

### 1.1 潜在漏洞

**`dangerouslySetInnerHTML` 无消毒处理**
- 文件：`src/components/legal/LegalPage.tsx` 第 41 行
- 流程：`fs.readFileSync` 读取本地 Markdown → `marked.parse()` 转 HTML → 直接注入 DOM
- 当前风险：低（内容来自本地静态文件，无用户输入）
- 隐患：若 Markdown 文件将来通过 CMS 编辑或外部写入，无 DOMPurify 等消毒层将成为 XSS 向量

### 1.2 数据安全

**假联系信息已进入代码，将上线展示**
- 文件：`src/content/site.ts` 第 8–9 行
- 内容：`email: 'example@example.com'`、`phone: '+61400000000'`、占位 WhatsApp URL
- 这些值被 Footer、ContactCard、法律页面、Hero CTA 直接渲染，上线后客户无法联系到真实业务方

---

## 二、性能与体验

### 2.1 性能瓶颈

**图片未优化（静态导出限制）**
- 文件：`next.config.ts`：`images: { unoptimized: true }`
- 静态导出必须关闭 Next.js 图片优化，所有 `<Image>` 实际输出原始尺寸图片，无 WebP 转换或响应式裁剪

**Sentry 已安装但配置文件未找到**
- `package.json` 中引入 `@sentry/nextjs`，`next.config.ts` 用 `withSentryConfig` 包裹
- 未在 `src/` 或项目根目录发现 `sentry.client.config.ts` / `sentry.server.config.ts`
- 若配置文件缺失，Sentry SDK 仍会被打包进 bundle 但不上报，徒增 bundle 体积

### 2.2 用户体验问题

**禁用功能页面仍存在于代码库**
- `src/config/features.ts` 中 `whyUs`、`about`、`applications`、`resources` 均为 `false`
- 但对应页面文件（`src/app/[locale]/why-us/page.tsx` 等）和组件目录仍存在
- 若有人直接访问 `/en/why-us`，页面将渲染，与 CLAUDE.md 规范冲突

---

## 三、代码质量

### 3.1 架构问题

**缺少 `middleware.ts`**
- next-intl 的官方推荐方案需要 middleware 处理 locale 重定向
- 目前仅靠 `src/i18n/routing.ts` + `localePrefix: 'always'` 配置，根路由 `/` 的处理行为需验证

### 3.2 类型安全

**`as any` 强转绕过类型检查**
- 文件：`src/components/layout/Header.tsx` 第 103 行
- `t(item.labelKey as any)` — 绕过 next-intl 的严格键名类型验证
- 若 `labelKey` 写错，编译期无法发现，运行时才会显示 missing key

### 3.3 死代码/未使用代码

- `src/components/why-us/`、`src/components/about/`、`src/components/applications/` 下组件对应 feature flag 均为 `false`，实际不渲染，构成死代码

---

## 四、国际化完整性

### 4.1 硬编码文本

**页面 Metadata 使用 locale 分支而非 i18n**
- 文件：`src/app/[locale]/page.tsx` 第 13–14 行
- 代码：`locale === 'en' ? '...' : '...'` 硬编码双语 meta title，不走 `messages/*.json`

### 4.2 翻译覆盖

**中文翻译大量缺失**
- 文件：`src/messages/zh.json` 第 126–150 行
- `whyUs`、`about`、`applications` 三节全部为 `[PLACEHOLDER ZH]` 占位字符串
- 法律文件：`src/content/legal/disclaimer.en.md` 和 `.zh.md` 第 37 行均有 `[PLACEHOLDER jurisdiction]`
- 两份法律文件顶部均有 `> Draft template — to be reviewed and confirmed by legal counsel before launch.`

---

## 五、隐私相关技术发现

### 5.1 Cookie 使用情况

**无 Cookie 设置** — 代码库中无任何 `document.cookie`、`localStorage`、`sessionStorage` 使用。隐私政策声明"本站不设置个性化或广告 Cookie"与代码实现一致。

### 5.2 数据采集清单

| 服务 | 采集内容 | 实现文件 |
|------|---------|---------|
| Vercel Analytics | 页面浏览量、访问路径（无 PII） | `src/components/analytics/AnalyticsProvider.tsx` |
| Vercel Analytics 事件 | mailto/tel/WhatsApp 链接点击 | `src/components/analytics/TrackedLink.tsx` |
| Cloudflare Web Analytics | 聚合流量数据（无 PII） | `src/components/analytics/CloudflareBeacon.tsx` |
| Sentry | JavaScript 运行时错误、堆栈跟踪 | `next.config.ts`（withSentryConfig） |

### 5.3 第三方服务

- Vercel Analytics（`@vercel/analytics`）— 数据存储在 Vercel
- Cloudflare Web Analytics — Token 通过 `NEXT_PUBLIC_CF_BEACON_TOKEN` 注入
- Sentry（`@sentry/nextjs`）— 隐私政策中已披露
- **无** Google Analytics、Facebook Pixel 或其他广告追踪

---

## 六、改进建议优先级

### P0（紧急 — 上线前必须修复）

1. 替换 `src/content/site.ts` 中的假联系信息（email、phone、whatsApp URL）为真实业务数据
2. 填充 `src/messages/zh.json` 中 `whyUs`/`about`/`applications` 三节的真实中文翻译
3. 填写 `disclaimer.en.md` 和 `disclaimer.zh.md` 第 37 行的司法管辖区，并通过法律顾问审核

### P1（重要 — 上线前建议修复）

4. 确认或补全 Sentry 配置文件（`sentry.client.config.ts`），或从 `package.json` 和 `next.config.ts` 中移除 Sentry
5. 在 `src/components/legal/LegalPage.tsx` 第 41 行增加 marked sanitize 选项或引入 DOMPurify
6. 验证 `/why-us`、`/about`、`/applications` 路由在 feature flag 为 `false` 时是否正确返回 404

### P2（建议 — 后续优化）

7. 将 `src/app/[locale]/page.tsx` 第 13–14 行硬编码 meta title 迁移到 `messages/*.json`
8. `src/components/layout/Header.tsx` 第 103 行的 `as any` 改为正确的 next-intl 类型声明
9. 清理 `src/components/why-us/`、`about/`、`applications/` 下已确认不会启用的组件
