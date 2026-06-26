# 法律合规报告 — 隐私政策与免责声明

**审查时间**：2026-06-24  
**审查范围**：隐私法律合规 + Cookie 使用 + 法律文本起草  
**法律顾问**：法律合规 Agent

---

## 一、数据采集情况调研

### 1.1 Cookie 使用情况

**结论：本站不使用任何 Cookie。**

经过全面代码审查，网站未使用 `document.cookie`、`localStorage` 或 `sessionStorage`。所有三个分析服务均采用无Cookie技术：

- Vercel Analytics：cookieless 架构，聚合统计，无用户追踪
- Cloudflare Web Analytics：cookieless beacon，仅采集页面访问量
- Sentry：错误上报，session replay 采样率为 0（已禁用）

### 1.2 个人信息采集清单

**结论：网站不采集任何个人信息。**

联系页面无表单，仅提供点击跳转链接（mailto:、tel:、WhatsApp 外链、地图链接），数据进入用户自己的应用，不经过网站后端。代码库中有 CI 脚本 `check:no-forms` 强制执行无表单规则。

| 数据类型 | 是否采集 | 说明 |
|---------|---------|-----|
| 姓名/邮箱/电话 | 否 | 无表单，仅外链 |
| IP 地址 | 间接/第三方 | Cloudflare/Vercel 基础设施层 |
| 浏览行为 | 聚合/匿名 | Vercel Analytics 自定义事件 |
| 错误日志 | 匿名 | Sentry（无 session replay） |

### 1.3 第三方服务清单

| 服务 | 接入方式 | 数据处理地 | 隐私政策 |
|------|---------|----------|---------|
| Vercel Analytics | npm package | 美国/全球 | vercel.com/legal/privacy-policy |
| Cloudflare Web Analytics | 外部 script beacon | 美国/全球 | cloudflare.com/privacypolicy |
| Sentry | npm package | 美国 | sentry.io/privacy |
| Google Fonts (Inter) | 构建时自托管 | 无运行时请求 | 不适用 |

---

## 二、法律合规要求分析

### 2.1 澳大利亚 Privacy Act 1988 要求

澳大利亚隐私法适用于年营业额超过 300 万澳元的实体，或主动采集个人信息的中小企业。关键要点：

- **APP 1（透明度）**：必须有公开的隐私政策
- **APP 3（采集）**：只能采集合理必要的信息
- **APP 6（使用与披露）**：只能为采集目的使用信息
- **APP 8（跨境披露）**：向海外第三方传输数据须满足等同保护要求
- **APP 11（安全）**：须采取合理措施保护个人信息
- **APP 12-13（访问与更正权）**：用户有权访问和更正其个人信息

**本站合规状态**：由于不采集个人信息，多数 APP 要求不直接适用，但仍建议维持隐私政策以满足透明度要求，并覆盖第三方服务的数据处理情况。

### 2.2 美国 CCPA / 欧盟 GDPR 要求

**CCPA（加州）**：适用于年营业额超过 2500 万美元、或买卖 10 万以上消费者数据的企业。本站目前不符合触发条件，但应提供基础披露。

**GDPR**：若向欧盟居民提供服务或追踪欧盟居民行为则适用。本站面向澳洲/美洲，当前第三方服务为聚合统计，GDPR 风险较低。

**Cookie 指令（EU ePrivacy）**：本站无 Cookie，无需 Cookie 同意弹窗（仅限当前技术栈）。

### 2.3 化学品行业特殊要求

化学品 B2B 网站需特别注意以下免责事项：

- **产品信息准确性**：网站上的规格、成分、用途信息不构成技术建议或合同条款
- **安全数据表（SDS/MSDS）**：网站信息不替代正式安全数据表
- **监管合规**：产品在不同司法管辖区的合规状态由买方负责核实
- **专业使用假设**：B2B 网站可合理假设访客为具备专业知识的商业采购方
- **责任限制**：需明确网站信息仅供参考，不构成要约或要约邀请

---

## 三、隐私政策（完整文本）

以下为可直接使用的英文隐私政策，已参考埃克森美孚、壳牌的结构和措辞，并根据 AOWATT 实际情况定制：

---

**AOWATT GLOBAL MATERIALS — PRIVACY POLICY**

*Last Updated: June 2026*

---

**1. Introduction**

AOWATT Global Materials Pty Ltd ("AOWATT," "we," "us," or "our") operates the website at aowatt.com.au (the "Website"). We are committed to protecting your privacy and handling any information about you in an open and transparent manner.

This Privacy Policy explains how we collect, use, disclose, and protect information in connection with your use of the Website. It applies to all visitors to the Website, regardless of your location.

For Australian residents, this Privacy Policy is drafted in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs) contained in that Act.

---

**2. Information We Collect**

**2.1 Information You Provide Directly**

This Website does not contain any forms requiring you to submit personal information. All contact options on the Website (including email links, telephone links, and messaging service links) connect you to external communication channels operated independently of this Website. Any information you provide through those channels is governed by the privacy practices of those respective services, not this Policy.

**2.2 Information Collected Automatically**

When you visit the Website, certain technical information is automatically collected by our infrastructure and analytics service providers. This information is collected in aggregated, anonymised form and does not identify you personally. It may include:

- Pages viewed and navigation paths
- General geographic region (country or city level, derived from IP address)
- Device type, browser type, and operating system
- Referring website address
- Time and date of visit

This information is used solely to understand aggregate Website usage patterns and to maintain the performance and reliability of the Website.

**2.3 No Cookies**

This Website does not use cookies, tracking pixels, or similar client-side persistent identifiers. No information is stored on your device by this Website.

---

**3. How We Use Information**

We use the automatically collected aggregate and anonymised technical data for the following purposes only:

- To monitor and improve Website performance and availability
- To understand how the Website is used, in aggregate, to inform content and navigation improvements
- To detect and diagnose technical errors

We do not use any information collected through the Website for:

- Direct marketing or advertising
- Profiling individual users
- Sale or transfer to third parties for commercial purposes
- Targeted advertising across other websites or platforms

---

**4. Third-Party Service Providers**

We use the following third-party services in connection with the operation of this Website. Each service operates under its own privacy policy and data processing terms.

**4.1 Vercel Inc. (Website Hosting and Analytics)**

The Website is hosted on Vercel's infrastructure. Vercel Analytics provides cookieless, privacy-preserving visitor analytics. Vercel may process server-side request data (including IP addresses) as part of providing hosting services. Data may be processed in the United States and other jurisdictions where Vercel operates.

Privacy Policy: https://vercel.com/legal/privacy-policy

**4.2 Cloudflare, Inc. (Performance and Analytics)**

We use Cloudflare Web Analytics, a cookieless analytics service that measures aggregate traffic patterns. Cloudflare processes certain request data, including IP addresses, through its global network infrastructure. IP addresses are not stored by the Cloudflare Beacon analytics product.

Privacy Policy: https://www.cloudflare.com/privacypolicy/

**4.3 Sentry (Error Monitoring)**

We use Sentry to collect anonymised diagnostic reports when technical errors occur on the Website. Error reports may include browser and device information, the URL where the error occurred, and a stack trace. Sentry does not record session replays or collect personal information as part of our configuration. Data is processed in the United States.

Privacy Policy: https://sentry.io/privacy/

**4.4 International Data Transfers**

Each of the service providers listed above may process data in countries outside Australia, including the United States. These transfers occur in accordance with the providers' respective data processing agreements, which are designed to provide equivalent protections to those required under Australian law or to rely on appropriate cross-border transfer mechanisms.

---

**5. Children's Privacy**

This Website is intended for use by business professionals and commercial entities. It is not directed at, and we do not knowingly collect information from, individuals under the age of 18. If you believe a person under 18 has provided personal information in connection with this Website, please contact us using the details below.

---

**6. Data Security**

We implement reasonable technical and organisational measures to protect the integrity and availability of the Website. As this Website does not collect or store personal information, the residual data security risk is limited to the operational data processed by our third-party service providers, each of which maintains its own security programme.

---

**7. Your Privacy Rights**

**7.1 Australian Residents**

Under the Privacy Act 1988 (Cth), you have the right to:

- Request access to personal information we hold about you (APP 12)
- Request correction of inaccurate or incomplete personal information (APP 13)
- Make a complaint about a breach of the Australian Privacy Principles

As this Website does not collect or retain personal information identifiable to individual users, we are unlikely to hold records responsive to an access request. However, we will respond to all requests in good faith.

**7.2 California Residents (CCPA)**

California residents may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. As we do not sell personal information and our data collection is limited to anonymised aggregate analytics, these rights are unlikely to yield responsive information, but we will respond to verifiable consumer requests as required.

**7.3 How to Exercise Your Rights**

To make a privacy-related request, please contact us at:

Email: [privacy@aowatt.com.au]  
Address: [AOWATT Global Materials registered address]

We will respond to requests within 30 days.

---

**8. Links to External Websites**

The Website contains links to external websites, including supplier information, mapping services, and communication platforms. This Privacy Policy does not apply to those external sites. We encourage you to review the privacy policies of any third-party website you visit.

---

**9. Changes to This Privacy Policy**

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or applicable law. The "Last Updated" date at the top of this page indicates when the Policy was most recently revised. Continued use of the Website following any update constitutes acceptance of the revised Policy.

---

**10. Contact Us**

If you have any questions about this Privacy Policy, or wish to exercise any privacy right, please contact:

AOWATT Global Materials Pty Ltd  
Email: [legal@aowatt.com.au]  
Website: aowatt.com.au

If you are an Australian resident and are dissatisfied with our response to a privacy complaint, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au.

---

## 四、免责声明（完整文本）

以下为可直接使用的英文免责声明，已根据化学品行业特殊要求定制：

---

**AOWATT GLOBAL MATERIALS — DISCLAIMER**

*Last Updated: June 2026*

---

**1. General**

This Disclaimer governs your use of the website located at aowatt.com.au (the "Website"), operated by AOWATT Global Materials Pty Ltd ("AOWATT," "we," "us," or "our"). By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer.

---

**2. Nature of Website Information**

**2.1 Informational Purpose Only**

All content published on this Website, including product descriptions, technical specifications, application information, industry data, and regulatory summaries, is provided for general informational and commercial introductory purposes only. The information does not constitute technical advice, professional consultation, or a binding statement of product characteristics.

**2.2 Not an Offer or Contract**

Nothing on this Website constitutes an offer to sell, a solicitation of an offer to buy, or a binding contract for the supply of any product. All product orders are subject to separate, written supply agreements that govern pricing, specifications, terms of delivery, and applicable warranties. In the event of any inconsistency between information on this Website and a written supply agreement, the written supply agreement prevails.

**2.3 Products and Technical Specifications**

Product information displayed on this Website, including but not limited to chemical names, grades, purity levels, physical properties, packaging specifications, and application guidance, is provided as a general overview and is subject to change without notice. Such information:

(a) does not constitute a certificate of analysis or technical data sheet;  
(b) may not reflect the most current formulation, grade, or regulatory status of a product;  
(c) may vary by manufacturing lot, country of origin, or supply chain configuration; and  
(d) is not a substitute for reviewing the current, product-specific Safety Data Sheet (SDS), Technical Data Sheet (TDS), and Certificate of Analysis (COA) provided at the time of order or shipment.

**The buyer and end user are solely responsible for independently verifying all product specifications before use.**

---

**3. Chemical Products — Safety and Regulatory Disclaimer**

**3.1 Safety Data Sheets**

The Website does not provide Safety Data Sheets (SDS). Current SDS documents for all products are available upon request from AOWATT's sales team. Users must obtain and review the applicable SDS before handling, storing, transporting, or using any chemical product. Compliance with all applicable occupational health and safety legislation, chemical handling standards, and workplace safe work procedures is the sole responsibility of the buyer and end user.

**3.2 Regulatory Compliance**

Chemical products are subject to varied and evolving regulatory requirements across jurisdictions, including but not limited to import/export controls, hazardous substance classifications, environmental regulations, and end-use restrictions. AOWATT makes no representation that any product described on this Website is approved for use, registered, or compliant with regulatory requirements in any particular jurisdiction. The buyer is solely responsible for determining the regulatory status of any product in the buyer's jurisdiction and for obtaining all necessary licences, permits, and approvals prior to purchase, importation, and use.

**3.3 No Technical Advice**

Information about product applications and end-uses is provided for indicative purposes only and does not constitute professional chemical, engineering, or safety advice. Users should engage qualified technical and safety professionals to evaluate the suitability of any product for a specific application. AOWATT accepts no liability arising from reliance on application information published on this Website.

---

**4. Accuracy of Information**

While we endeavour to ensure that information on the Website is accurate and up to date, we make no representation, warranty, or guarantee, express or implied, as to:

(a) the accuracy, completeness, currency, or reliability of any content on the Website;  
(b) the fitness of any product for a particular purpose based on Website descriptions;  
(c) the continued availability of any product;  
(d) the accuracy of pricing indications, where displayed.

We reserve the right to correct errors, update content, or discontinue products at any time without prior notice.

---

**5. Limitation of Liability**

**5.1 Exclusion of Warranties**

To the maximum extent permitted by applicable law, including the Australian Consumer Law (Schedule 2 to the Competition and Consumer Act 2010 (Cth)), AOWATT excludes all warranties, representations, and guarantees not expressly stated in a written supply agreement, including any implied warranty of merchantability, fitness for a particular purpose, or non-infringement.

**5.2 Limitation of Damages**

To the maximum extent permitted by applicable law, AOWATT's total liability to any person arising out of or in connection with the use of, or reliance on, information contained on this Website shall not exceed AUD $100. In no event shall AOWATT be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, loss of business opportunity, or any other economic loss, even if advised of the possibility of such damages.

**5.3 Australian Consumer Law**

Nothing in this Disclaimer is intended to exclude, restrict, or modify any right or remedy, or any guarantee, warranty, or other term or condition, implied or imposed by the Australian Consumer Law that cannot lawfully be excluded or limited. Where the Australian Consumer Law applies, AOWATT's liability for breach of a non-excludable guarantee is limited, at AOWATT's election, to either: (a) resupply of the relevant goods or services; or (b) payment of the cost of having those goods or services resupplied.

---

**6. Intellectual Property**

All content on this Website, including text, product descriptions, images, logos, graphics, and the compilation thereof, is the property of AOWATT Global Materials Pty Ltd or its licensors and is protected by Australian and international copyright, trade mark, and other intellectual property laws. No content from this Website may be reproduced, distributed, republished, transmitted, displayed, or modified in any form or by any means without AOWATT's prior written consent, except as permitted under the Copyright Act 1968 (Cth).

The AOWATT name, logo, and associated marks are trade marks of AOWATT Global Materials Pty Ltd. Nothing on this Website grants any licence to use any trade mark.

---

**7. Third-Party Links**

The Website may contain links to external websites operated by third parties. These links are provided for convenience only and do not constitute an endorsement of, or responsibility for, the content, practices, or policies of those third-party websites. AOWATT accepts no liability for any loss or damage arising from your use of any linked website.

---

**8. Jurisdiction and Governing Law**

This Website is operated from Australia. This Disclaimer is governed by the laws of New South Wales, Australia, without regard to conflict of law principles. Any dispute arising in connection with this Disclaimer shall be subject to the exclusive jurisdiction of the courts of New South Wales, Australia.

Users who access the Website from outside Australia do so at their own initiative and are responsible for compliance with applicable local laws.

---

**9. Updates to This Disclaimer**

We may update this Disclaimer from time to time. The revised Disclaimer will be posted on this page with an updated "Last Updated" date. Your continued use of the Website following any update constitutes acceptance of the revised Disclaimer.

---

**10. Contact**

AOWATT Global Materials Pty Ltd  
Email: [legal@aowatt.com.au]  
Website: aowatt.com.au

---

## 五、Cookie Banner 需求

### 5.1 是否需要 Cookie consent banner？

**结论：当前技术栈下，不需要 Cookie Consent Banner。**

理由：
- 澳大利亚 Privacy Act 对 Cookie 无专门同意要求（不同于 EU ePrivacy 指令）
- CCPA 对 Cookie 的要求主要针对"出售"个人信息，本站不满足触发条件
- 本站无 Cookie，无需征求同意
- Vercel Analytics 和 Cloudflare Beacon 均为 cookieless

**注意**：若未来引入 Google Analytics（含 GA4）、Facebook Pixel、再营销脚本或任何基于 Cookie 的追踪工具，则需要重新评估并实施 Cookie Banner。

### 5.2 需要披露的 Cookie 类型（当前为零）

当前无 Cookie。未来如引入 GA4，需披露：

| Cookie 类型 | 示例 |
|------------|------|
| 必要性 Cookie | 会话管理 |
| 分析/性能 Cookie | GA `_ga`、`_ga_xxx` |
| 营销/追踪 Cookie | 如有需要 |

### 5.3 实施建议

当前无需任何 Cookie 技术实现。建议在隐私政策中明确声明"本站不使用Cookie"（已在上文隐私政策第2.3条中包含）。

---

## 六、实施检查清单

- [x] 隐私政策页面已存在（`src/app/[locale]/privacy/page.tsx`）
- [x] 免责声明页面已存在（`src/app/[locale]/disclaimer/page.tsx`）
- [x] Footer 底部条已有 Privacy 和 Disclaimer 链接
- [ ] **将上文隐私政策文本更新至** `src/content/legal/privacy.en.md`
- [ ] **将上文免责声明文本更新至** `src/content/legal/disclaimer.en.md`
- [ ] 起草中文版隐私政策和免责声明（`privacy.zh.md`、`disclaimer.zh.md`）
- [ ] **添加法律联系邮箱**（`legal@aowatt.com.au` 或 `privacy@aowatt.com.au`），文中 `[placeholder]` 需替换为真实地址
- [ ] 确认澳大利亚公司注册地址并填入隐私政策第10条和免责声明
- [ ] Cookie Banner：**当前无需实施**；如引入 GA 则需重新评估
- [ ] 与 Vercel、Cloudflare、Sentry 签署数据处理协议（DPA）—— 检查各服务商是否需要单独签署
- [ ] 用户权利请求处理流程：设置 `legal@aowatt.com.au` 邮箱，制定内部 30 天响应 SOP

---

**关键路径摘要**：本站当前数据足迹极小（无表单、无Cookie、无个人信息采集），合规工作量相应较低。主要工作是将上述英文法律文本写入现有页面文件，并补全联系邮箱和注册地址两个占位符。如未来引入 Google Analytics，需重新启动 Cookie 合规评估流程。
