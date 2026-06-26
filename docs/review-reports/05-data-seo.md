# 数据分析与SEO战略报告

**分析时间**：2026-06-24  
**分析范围**：数据采集能力评估 + SEO实施方案  
**数据分析师**：数据分析 Agent

---

## 一、当前数据能力评估

### 1.1 Vercel Analytics 能力

**免费版提供：**
- 页面浏览量（PV）、独立访客数（UV）
- 访问来源国家/地区
- 设备类型（桌面/移动）
- Web Vitals（LCP/CLS/FID）
- Top Pages 排名
- **数据只保留 7 天**

**升级至 Pro（$20/月）后增加：**
- 30天数据保留
- 漏斗分析
- 流量来源细分

### 1.2 现有代码中的数据采集

代码实现比预期完善：

`src/lib/analytics.ts` — 已封装6个自定义事件：
- `product_card_click`
- `contact_email_click`
- `contact_phone_click`
- `contact_whatsapp_click`
- `search_query`
- `language_switch`

`src/components/analytics/AnalyticsProvider.tsx` — 已挂载 Vercel Analytics，全局生效

`src/components/analytics/CloudflareBeacon.tsx` — 已集成 Cloudflare Web Analytics（需配置 `NEXT_PUBLIC_CF_BEACON_TOKEN` 环境变量激活，当前可能未激活）

`src/components/analytics/TrackedLink.tsx` — 联系链接（邮件/电话/WhatsApp）已埋点

### 1.3 数据盲区

- 无询价意图漏斗：用户从产品列表 → 产品详情 → 联系行为的完整路径缺失
- 无搜索词分析：Google通过什么关键词找到网站
- 无用户停留时长和滚动深度
- Cloudflare Beacon token 是否已配置未知，双保险未激活

---

## 二、数据采集方案设计

### 2.1 核心指标体系

B2B化工网站核心转化路径：**访问 → 浏览产品 → 查看详情 → 联系询价**

| 层级 | 关键指标 |
|------|---------|
| 获客层 | 有机搜索流量占比、来源关键词排名、页面收录数量 |
| 行为层 | 产品详情页浏览率（PV/UV）、联系按钮点击率（目标>3%）、中英文切换比例 |
| 转化层 | 联系行为总次数（邮件+电话+WhatsApp合计）、每产品页的询价点击数 |

### 2.2 推荐的分析工具栈

| 工具 | 用途 | 费用 | 优先级 |
|------|------|------|--------|
| Vercel Analytics（当前） | Web Vitals + 基础PV | 免费 | 已有 |
| **Google Analytics 4** | 会话分析、漏斗、来源 | 免费 | ⭐ 立即添加 |
| **Google Search Console** | 关键词、收录、点击 | 免费 | ⭐ 立即添加 |
| Cloudflare Web Analytics | 隐私友好的备份统计 | 免费 | 激活已有代码 |

> 不推荐现阶段引入 Hotjar 或 Mixpanel——流量早期阶段数据样本太小，工具成本超过洞察价值。

### 2.3 自定义事件追踪清单

现有事件基础上补充：

```typescript
// 建议补充到 src/lib/analytics.ts
'product_detail_view'     // 产品详情页加载，props: {slug, category}
'inquiry_panel_expand'    // 询价面板展开
'category_view'           // 分类页浏览，props: {category}
'breadcrumb_click'        // 面包屑导航，props: {label, from_page}
'form_start'              // 询盘表单开始填写（未来添加表单后）
'form_submit'             // 询盘表单提交成功
'document_download'       // TDS/SDS文件下载（未来添加文档后）
```

### 2.4 实施优先级

1. **立即**：激活 Cloudflare Beacon（添加环境变量）+ 接入 GA4
2. **本周**：Google Search Console 验证域名并提交 sitemap
3. **本月**：确认 `product_card_click` 在产品列表页实际触发
4. **持续**：通过 GSC 监控关键词排名变化

---

## 三、SEO 完整实施方案

### 3.1 技术SEO检查清单

**已完成（代码已实现）：**
- `robots.ts` — 正确配置，允许所有爬虫，指向 sitemap.xml ✅
- `sitemap.ts` — 完整实现，覆盖首页/产品/分类/法律页，含双语 `alternates`，优先级分级合理 ✅
- `seo.ts` (`buildMetadata`) — canonical URL、hreflang（en/zh/x-default）、OpenGraph 均已实现 ✅
- 静态导出（`force-static`） — 对爬虫极为友好，无 JS 渲染依赖 ✅

**待改进项：**
- `sitemap.ts` 中 `lastMod` 硬编码为 `2026-06-21`，应改为动态日期或部署时间
- `buildMetadata` 未设置 `twitter:card`（对 LinkedIn/Twitter 分享有影响）
- 产品详情页缺少 Schema.org 结构化数据（见3.5节）
- 缺少 `<meta name="robots" content="max-snippet:-1">` 爬取控制指令

### 3.2 On-Page 优化建议

每个产品详情页的 `generateMetadata` 建议：
- title 格式：`{产品名} | Buy {类别} | AOWATT Global Materials`
- description 长度控制在 150-160 字符，包含产品特性和 CTA
- 补充 `ogImage` 传入产品图片（当前该参数未被产品页使用）

### 3.3 Google 搜索引擎收录步骤

1. 在 [Google Search Console](https://search.google.com/search-console) 添加属性，选择"域名"类型（覆盖 https/http/www/non-www）
2. 通过 DNS TXT 记录验证（在域名注册商添加）
3. 提交 sitemap：`https://aowatt.com.au/sitemap.xml`
4. 使用 URL 检查工具手动请求收录首页和核心产品页
5. 7-14天后查看覆盖率报告，处理任何 404 或重定向问题

### 3.4 关键词策略

B2B化工行业澳洲目标市场：

| 关键词类型 | 示例 | 搜索意图 |
|---------|------|---------|
| 产品词（高意图） | `LLDPE supplier Australia`、`buy HDPE bulk` | 采购决策 |
| 类别词（中意图） | `industrial chemicals Australia`、`specialty chemicals supplier Melbourne` | 供应商筛选 |
| CAS号词 | `9002-88-4 distributor` | 精确采购 |
| 品牌词（保护） | `AOWATT`、`AOWATT Global Materials` | 品牌认知 |

> 建议将每个产品页的 `<h1>` 和 meta description 包含产品英文全名 + CAS 号，CAS 号是化工采购的精确搜索词。

### 3.5 结构化数据（Schema.org）

产品详情页添加 `Product` schema（在 `src/app/[locale]/products/[...path]/page.tsx` 中）：

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "brand": { "@type": "Brand", "name": "AOWATT Global Materials" },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "AUD",
        "seller": { "@type": "Organization", "name": "AOWATT Global Materials" }
      }
    })
  }}
/>
```

根 layout 添加 `Organization` schema（含 logo、联系方式、地区）。

---

## 四、数据隐私与合规

### 4.1 Cookie 使用情况

- **Vercel Analytics**：不设置 cookie，server-side tracking，隐私友好 ✅
- **Cloudflare Web Analytics**：无 cookie，无跨站追踪，符合 GDPR ✅
- **GA4（如接入）**：设置 `_ga`、`_ga_xxx` cookie，需要 Cookie consent ⚠️

### 4.2 合规要求清单

| 要求 | 适用性 | 状态 |
|------|--------|------|
| 澳洲隐私法（Privacy Act 1988）| 适用 | 已有 /privacy 页面 |
| GDPR（如有欧盟访客）| 适用 | 需 Cookie banner（如引入GA4） |
| Google Analytics Cookie 同意 | 仅引入GA4后需要 | 待实施 |

### 4.3 最小化方案（推荐）

仅使用 Vercel Analytics + Cloudflare Web Analytics，两者均无 cookie、无需 consent banner，隐私合规成本为零。

如引入 GA4：添加简单的 Cookie consent banner，在用户同意前延迟 GA4 script 加载。

---

## 五、实施路线图

### 第一周：基础设施

- [ ] 设置 `NEXT_PUBLIC_CF_BEACON_TOKEN` 环境变量，激活 Cloudflare Analytics
- [ ] 创建 GA4 属性，添加 GA4 script（consent-gated）
- [ ] Google Search Console 验证域名，提交 sitemap
- [ ] 修复 `sitemap.ts` 中硬编码 lastMod

### 第一个月：数据采集

- [ ] 产品详情页添加 `Product` schema JSON-LD
- [ ] 根 layout 添加 `Organization` schema
- [ ] 确认 `product_card_click` 在产品列表页已触发
- [ ] 添加 `product_detail_view` 事件（在详情页组件 mount 时触发）
- [ ] 在 GSC 中验证所有产品页已收录

### 持续优化

- 每月审查 GSC 关键词报告，识别意外排名关键词并优化对应页面
- 外链建设：向澳洲化工行业目录（Kompass AU、GlobalSpec）提交公司信息
- 每季度更新 sitemap 的 lastModified 日期

---

## 六、预期效果与KPI

### 3个月目标

- Google 收录所有产品页（目标覆盖率 >90%）
- 品牌词 "AOWATT" 搜索结果首页排名
- 有机搜索会话数达到总流量 30% 以上
- 联系按钮点击率基准数据建立

### 6个月目标

- 3-5个核心产品关键词进入 Google 第2页（澳洲区）
- 月均有机访客 200+（B2B化工冷启动现实目标）
- 联系渠道点击总量每月 20+ 次
- Core Web Vitals 全绿（LCP < 2.5s，CLS < 0.1）

---

**最重要的两个行动项**：
1. 立即在产品详情页添加 `Product` schema JSON-LD（直接提升 Google 富结果展示概率）
2. 配置 `NEXT_PUBLIC_CF_BEACON_TOKEN` 环境变量激活 Cloudflare Analytics——代码已就绪，只差这一步
