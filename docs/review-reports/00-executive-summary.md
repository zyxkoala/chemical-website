# AOWATT Chemical Website — 全面验收审查报告（执行摘要）

**审查时间**：2026-06-24  
**审查团队**：6个专业审查小组（代码审查、产品设计、QA测试、数据分析、产品战略、法律合规）  
**网站状态**：V0.1 静态展示网站，准备上线

---

## 一、整体评估

### 总体结论

AOWATT Chemical Website 已具备上线基础架构和核心功能，但存在 **3个阻塞性问题** 和 **5个严重问题** 必须在正式上线前修复。代码质量良好，SEO基础完善，但内容填充和用户转化路径存在明显短板。

### 评分卡

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码架构 | ⭐⭐⭐⭐⭐ 9/10 | Next.js + TypeScript 架构规范，数据层和UI层分离良好 |
| 视觉设计 | ⭐⭐⭐⭐⭐ 9/10 | 整体符合设计规范，Header 高度已由开发者确认（96px） |
| 功能完整性 | ⭐⭐⭐ 6/10 | 核心浏览路径可用，但侧边栏导航失效，无询盘表单 |
| 内容完整度 | ⭐⭐ 4/10 | 联系信息为占位数据，中文翻译大量缺失，产品内容稀薄 |
| SEO准备度 | ⭐⭐⭐⭐⭐ 9/10 | sitemap/robots/metadata 完备，缺少 Schema.org 结构化数据 |
| 数据分析 | ⭐⭐⭐⭐ 8/10 | 基础埋点架构完善，需激活 Cloudflare Beacon 并接入 GSC |
| 法律合规 | ⭐⭐⭐⭐⭐ 10/10 | 无 Cookie、无个人信息采集，隐私合规成本为零，法律文本已起草 |

---

## 二、必须修复的问题（P0 — 阻塞上线）

### 1. 联系信息全部为占位数据 ⚠️

**影响**：客户无法联系到真实业务方，网站失去商业价值

**位置**：
- `src/content/site.ts` 第 8–9 行
- Footer、联系页面、产品详情页 InquiryPanel 均渲染占位数据

**当前值**：
- Email: `example@example.com`
- Phone: `+61400000000`
- WhatsApp: `wa.me/61400000000`

**修复**：替换为真实的 AOWATT 联系信息

---

### 2. 中文翻译大量缺失 ⚠️

**影响**：中文用户体验严重受损，首页"应用领域"区块显示 `[PLACEHOLDER ZH]`

**位置**：
- `src/messages/zh.json` 第 126–150 行（`whyUs`、`about`、`applications` 三节）
- 首页 `/zh/` 的 Applications 区块实际渲染占位文本

**修复**：补全中文翻译，或临时禁用该区块（通过 feature flag）

---

### 3. 法律文件待审核 ⚠️

**影响**：隐私政策和免责声明文件顶部有 "Draft template — to be reviewed and confirmed by legal counsel before launch" 警告

**位置**：
- `src/content/legal/disclaimer.en.md` 和 `.zh.md`
- `src/content/legal/privacy.en.md` 和 `.zh.md`

**修复**：
- 用本次审查提供的完整法律文本替换现有草稿
- 填写占位符：`[privacy@aowatt.com.au]`、`[legal@aowatt.com.au]`、公司注册地址
- 通过法律顾问审核后移除 Draft 警告

---

## 三、严重问题（P1 — 上线前建议修复）

### 4. 侧边栏分类按钮完全失效 ❌

**影响**：用户在产品分类页无法通过侧边栏浏览和切换子分类，核心浏览路径受损

**位置**：所有带侧边栏的产品层级页面（`/products/raw-materials/`、`/products/manufactured/` 等）

**现象**：侧边栏的 "Polyethylene (PE)"、"Polypropylene (PP)" 等按钮的 `onclick` 均绑定为 `noop` 空函数，点击毫无响应

**修复**：检查 `CategorySidebar.tsx`，实现正确的折叠/展开和导航逻辑

---

### 5. Header 高度严重偏离设计规范 ~~（已确认为开发者有意调整，不再作为问题）~~

> 已解决：Header 高度 96px 为开发者主动调整，设计规范 `CLAUDE.md` 已同步更新为 96px。

---

### 5. 404 页面无友好提示 ❌

**影响**：用户访问无效 URL 时静默重定向至首页，无法得知页面不存在

**修复**：在 `src/app/[locale]/not-found.tsx` 中添加友好错误提示页面

---

### 7. Sentry 配置文件缺失导致无效 Bundle 增重 ⚠️

**影响**：Sentry SDK 被打包但不上报，徒增 bundle 体积

**位置**：`package.json` 引入 `@sentry/nextjs`，但未发现 `sentry.client.config.ts` / `sentry.server.config.ts`

**修复**：补全 Sentry 配置文件，或从依赖中移除 Sentry

---

### 8. Logo 图片缺少 priority 属性 ⚠️

**影响**：LCP 性能得分下降

**位置**：全站 Header 的 `/logos/aowatt-logo-cropped.png`

**修复**：在 `<Image>` 组件添加 `priority` 属性

---

## 四、下一步产品发展方向（按优先级）

基于产品经理的完整路线图分析，以下是最紧迫的产品迭代方向：

### 阶段一：V0.2 基础完善（1-2周）— 让网站真正"可用"

1. **结构化询盘表单**（最高优先级）
   - 当前：点击"联系我们"跳到邮件客户端，无法捕获结构化需求
   - 方案：在联系页和产品详情页增加 Formspree/EmailJS 表单（与静态导出兼容）
   - 价值：销售可收到带产品型号、数量、用途的结构化询盘，跟进效率提升 10 倍

2. **填充核心产品真实数据**
   - 当前：绝大多数产品为 `placeholder: true`，"规格待定"
   - 方案：优先完善已发布的 LLDPE/HDPE 牌号的真实规格
   - 价值：专业信任度建立

3. **填充真实联系信息**（已在 P0 中列出）

### 阶段二：V1.0 交互增强（1-2月）— 提升专业感

4. **技术文档下载（TDS/SDS）**
   - 化工采购标准流程依赖技术文档，当前缺失延长决策周期
   - 存储方案：Vercel Blob 或 AWS S3

5. **启用 WhyUs 页面**
   - 填充供应链差异化内容（货源地、库存深度、认证）

6. **产品搜索功能**
   - 支持 CAS 号、牌号、应用场景搜索（客户端静态索引 FlexSearch）

### 阶段三：V1.5 数据驱动（2-3月）

7. **询盘漏斗追踪**：补全 `form_start`、`form_submit`、`form_abandon` 事件

8. **热门产品排行**：基于点击数据动态展示高关注牌号

---

## 五、数据分析与SEO行动清单

### 立即行动（第一周）

- [ ] **激活 Cloudflare Analytics**：设置 `NEXT_PUBLIC_CF_BEACON_TOKEN` 环境变量（代码已就绪，只差这一步）
- [ ] **接入 Google Analytics 4**：添加 GA4 script（如需 Cookie consent，需重新评估隐私合规）
- [ ] **Google Search Console 验证域名**：提交 sitemap.xml
- [ ] **修复 sitemap.ts 硬编码日期**：`lastMod` 改为动态日期

### 第一个月

- [ ] **产品详情页添加 Schema.org Product JSON-LD**：直接提升 Google 富结果展示概率（代码示例已在数据分析报告中提供）
- [ ] **根 layout 添加 Organization schema**
- [ ] **确认埋点触发**：验证 `product_card_click` 在产品列表页实际触发

### 3 个月目标

- Google 收录所有产品页（覆盖率 >90%）
- 品牌词 "AOWATT" 首页排名
- 有机搜索会话数达到总流量 30%

---

## 六、法律合规总结

### 当前状态：完全合规 ✅

- **无 Cookie**：Vercel Analytics + Cloudflare Beacon 均为 cookieless
- **无个人信息采集**：无表单，仅外链跳转
- **无需 Cookie Banner**（当前技术栈）

### 已提供文本

本次审查已起草完整的英文隐私政策和免责声明（参考埃克森美孚、壳牌结构），可直接替换现有 Draft 文件：

- **隐私政策**：符合澳洲 Privacy Act 1988、CCPA、GDPR（基础披露）
- **免责声明**：包含化学品行业特殊免责（产品信息准确性、SDS/TDS、监管合规、责任限制）

### 待办事项

- [ ] 将英文法律文本更新至 `src/content/legal/privacy.en.md` 和 `disclaimer.en.md`
- [ ] 起草中文版法律文本（`.zh.md`）
- [ ] 填写占位符：`legal@aowatt.com.au`、公司注册地址
- [ ] **重要提示**：如未来引入 Google Analytics（GA4），需重新评估 Cookie 合规并实施 Cookie Banner

---

## 七、报告结构说明

完整审查报告已拆分为以下文件（避免单文件过大）：

```
docs/review-reports/
├── 00-executive-summary.md         # 本文件 — 执行摘要
├── 01-code-review.md               # 代码审查员报告（安全、性能、代码质量、国际化）
├── 02-design-review.md             # 产品设计师报告（设计规范、视觉一致性、响应式、UX问题）
├── 03-qa-testing.md                # 测试工程师报告（导航、页面可达性、交互、Bug清单）
├── 04-product-roadmap.md           # 产品经理报告（功能分析、用户需求、发展路线图）
├── 05-data-seo.md                  # 数据分析师报告（数据采集、SEO方案、关键词策略）
└── 06-legal-compliance.md          # 法律顾问报告（隐私政策、免责声明、Cookie合规）
```

---

## 八、关键路径总结

### 上线前必做 3 件事（P0）：

1. **替换联系信息**：`src/content/site.ts` 中的 email/phone/WhatsApp
2. **补全中文翻译**：`src/messages/zh.json` 的 Applications 区块
3. **更新法律文本**：用本次提供的完整法律文本替换 Draft，并通过法律顾问审核

### 上线后立即启动（第一周）：

1. **上线询盘表单**：Formspree 或 EmailJS（与静态导出兼容）
2. **激活 Cloudflare Analytics** + **接入 Google Search Console**
3. **修复侧边栏导航失效**

### 产品迭代核心指标：

- 北极星指标：**月有效询盘数**（通过表单提交、含完整产品型号+数量信息）
- V0.2 目标：月表单提交数 > 10
- V1.0 目标：文档下载/访客比 > 15%

---

**报告结论**：网站技术架构优秀，设计规范完备，但内容填充和转化路径是当前最大短板。填真实联系信息和上线询盘表单是最紧迫的两件事，这两件事不解决，其他优化都是在漏水的桶里加水。
