import type { Product } from '@/types/product';

const placeholderSummary = {
  en: 'Sample placeholder grade — full specifications to be confirmed.',
  zh: '示例占位牌号，完整规格信息待确认。',
};

const placeholderOverview = {
  en: 'This is a placeholder product entry used to demonstrate the catalog flow. Real grade data, specifications, packaging, and applications will be filled in once supplier-confirmed information is available. Contact AOWATT for current grade availability and quotation.',
  zh: '此条目为示例占位产品，用于演示产品目录流程。供应商确认的牌号数据、规格、包装与应用信息将在确定后补充。如需了解当前可供牌号与报价，请联系 AOWATT。',
};

const placeholderSpec = [
  { label: { en: 'Density', zh: '密度' }, value: { en: 'TBC', zh: '待定' } },
  { label: { en: 'Melt index (MI)', zh: '熔融指数 (MI)' }, value: { en: 'TBC', zh: '待定' } },
  { label: { en: 'Application', zh: '应用方向' }, value: { en: 'TBC', zh: '待定' } },
];

const placeholderPackaging = [
  { en: '25 kg PE bag', zh: '25 公斤 PE 袋' },
  { en: '1 MT bulk bag (jumbo)', zh: '1 吨吨袋' },
];

const placeholderApplications = [{ en: 'Application TBC', zh: '应用待定' }];

function placeholder(
  slug: string,
  name: { en: string; zh: string },
  category: string,
  sortOrder: number,
): Product {
  return {
    slug,
    name,
    category,
    summary: placeholderSummary,
    overview: placeholderOverview,
    grade: { en: 'Industrial', zh: '工业级' },
    packaging: placeholderPackaging,
    applications: placeholderApplications,
    documents: ['COA', 'TDS', 'SDS'],
    specs: placeholderSpec,
    relatedProductSlugs: [],
    image: 'product-default',
    featured: false,
    published: false,
    placeholder: true,
    sortOrder,
  };
}

export const products: Product[] = [
  // ─── PE leaf categories ───────────────────────────────────────────────────
  {
    slug: 'ldpe-951-00',
    name: { en: 'LDPE 951-000', zh: 'LDPE 951-000' },
    category: 'ldpe',
    summary: {
      en: 'Technical parameters for LDPE 951-000.',
      zh: 'LDPE 951-000 技术参数。',
    },
    overview: {
      en: 'LDPE 951-000 technical parameters are listed below as provided.',
      zh: 'LDPE 951-000 技术参数如下，按提供资料列出。',
    },
    packaging: [],
    applications: [],
    documents: ['TDS'],
    specs: [
      {
        label: { en: 'Product standard', zh: '产品标准' },
        value: { en: 'Q/SH3175 3000-2018', zh: 'Q/SH3175 3000-2018' },
      },
      {
        label: { en: 'Pellet appearance — color pellets', zh: '颗粒外观 — 色粒' },
        value: { en: '<=10 个/kg', zh: '<=10 个/kg' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Tensile yield strength', zh: '拉伸屈服强度' },
        value: { en: '>=8.0 MPa', zh: '>=8.0 MPa' },
        methodStandard: { en: 'ASTM D638-2022', zh: 'ASTM D638-2022' },
      },
      {
        label: { en: 'Density (23℃)', zh: '密度（23℃）' },
        value: { en: '918.5-921.5 kg/m³', zh: '918.5-921.5 kg/m³' },
        methodStandard: { en: 'GB/T 1033.2-2010', zh: 'GB/T 1033.2-2010' },
      },
      {
        label: { en: 'Haze (23℃)', zh: '雾度（23℃）' },
        value: { en: '<=9.0 percent', zh: '<=9.0 percent' },
        methodStandard: { en: 'GB/T 2410-2008', zh: 'GB/T 2410-2008' },
      },
      {
        label: { en: 'Melt mass-flow rate', zh: '熔体质量流动速率' },
        value: { en: '1.84-2.50 g/10min', zh: '1.84-2.50 g/10min' },
        methodStandard: { en: 'GB/T 3682.1-2018', zh: 'GB/T 3682.1-2018' },
      },
      {
        label: { en: 'Elongation at break', zh: '断裂伸长率' },
        value: { en: '>=400 percent', zh: '>=400 percent' },
        methodStandard: { en: 'ASTM D638-2022', zh: 'ASTM D638-2022' },
      },
    ],
    relatedProductSlugs: [],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/ldpe-951-00-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 1,
    seoTitle: {
      en: 'LDPE 951-000 — Technical Parameters | AOWATT',
      zh: 'LDPE 951-000 — 技术参数 | AOWATT',
    },
    seoDescription: {
      en: 'LDPE 951-000 technical parameters.',
      zh: 'LDPE 951-000 技术参数。',
    },
  },
  {
    slug: 'ldpe-2426h',
    name: { en: 'LDPE 2426H', zh: 'LDPE 2426H' },
    category: 'ldpe',
    summary: {
      en: 'Technical parameters for LDPE 2426H.',
      zh: 'LDPE 2426H 技术参数。',
    },
    overview: {
      en: 'LDPE 2426H technical parameters are listed below as provided.',
      zh: 'LDPE 2426H 技术参数如下，按提供资料列出。',
    },
    packaging: [],
    applications: [],
    documents: ['TDS'],
    specs: [
      {
        label: { en: 'Product standard', zh: '产品标准' },
        value: { en: 'Q/SH3175 3000-2018', zh: 'Q/SH3175 3000-2018' },
      },
      {
        label: { en: 'Film appearance — streaks (>=1cm)', zh: '薄膜外观 — 条纹(≥1cm)' },
        value: { en: '<=20 cm/20m²', zh: '<=20 cm/20m²' },
        methodStandard: { en: 'GB/T 11115-2009', zh: 'GB/T 11115-2009' },
      },
      {
        label: { en: 'Tensile yield strength', zh: '拉伸屈服强度' },
        value: { en: '>=10 MPa', zh: '>=10 MPa' },
        methodStandard: { en: 'ASTM D638-2022', zh: 'ASTM D638-2022' },
      },
      {
        label: { en: 'Melt mass-flow rate', zh: '熔体质量流动速率' },
        value: { en: '1.60-2.20 g/10min', zh: '1.60-2.20 g/10min' },
        methodStandard: { en: 'GB/T 3682.1-2018', zh: 'GB/T 3682.1-2018' },
      },
      {
        label: { en: 'Pellet appearance — color pellets', zh: '颗粒外观 — 色粒' },
        value: { en: '<=10 个/kg', zh: '<=10 个/kg' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Film appearance — fisheyes (0.3~2mm)', zh: '薄膜外观 — 鱼眼(0.3~2mm)' },
        value: { en: '<=15 个/1200cm²', zh: '<=15 个/1200cm²' },
        methodStandard: { en: 'GB/T 11115-2009', zh: 'GB/T 11115-2009' },
      },
      {
        label: { en: 'Density (23℃)', zh: '密度(23℃)' },
        value: { en: '922.0-926.0 kg/m³', zh: '922.0-926.0 kg/m³' },
        methodStandard: { en: 'GB/T 1033.2-2010', zh: 'GB/T 1033.2-2010' },
      },
    ],
    relatedProductSlugs: ['ldpe-951-00', 'ldpe-2426k', 'ldpe-2520d'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/ldpe-2426h-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 2,
    seoTitle: {
      en: 'LDPE 2426H — Technical Parameters | AOWATT',
      zh: 'LDPE 2426H — 技术参数 | AOWATT',
    },
    seoDescription: {
      en: 'LDPE 2426H technical parameters.',
      zh: 'LDPE 2426H 技术参数。',
    },
  },
  {
    slug: 'ldpe-2426k',
    name: { en: 'LDPE 2426K', zh: 'LDPE 2426K' },
    category: 'ldpe',
    summary: {
      en: 'Technical parameters for LDPE 2426K.',
      zh: 'LDPE 2426K 技术参数。',
    },
    overview: {
      en: 'LDPE 2426K technical parameters are listed below as provided.',
      zh: 'LDPE 2426K 技术参数如下，按提供资料列出。',
    },
    packaging: [],
    applications: [],
    documents: ['TDS'],
    specs: [
      {
        label: { en: 'Product standard', zh: '产品标准' },
        value: { en: 'Q/SH3175 3000-2018', zh: 'Q/SH3175 3000-2018' },
      },
      {
        label: { en: 'Tensile yield strength', zh: '拉伸屈服强度' },
        value: { en: '>=10 MPa', zh: '>=10 MPa' },
        methodStandard: { en: 'ASTM D638-2022', zh: 'ASTM D638-2022' },
      },
      {
        label: { en: 'Density (23℃)', zh: '密度(23℃)' },
        value: { en: '922.0-926.0 kg/m³', zh: '922.0-926.0 kg/m³' },
        methodStandard: { en: 'GB/T 1033.2-2010', zh: 'GB/T 1033.2-2010' },
      },
      {
        label: { en: 'Film appearance — streaks (>=1cm)', zh: '薄膜外观 — 条纹(≥1cm)' },
        value: { en: '<=20 cm/20m²', zh: '<=20 cm/20m²' },
        methodStandard: { en: 'GB/T 11115-2009', zh: 'GB/T 11115-2009' },
      },
      {
        label: { en: 'Melt mass-flow rate', zh: '熔体质量流动速率' },
        value: { en: '3.60-4.40 g/10min', zh: '3.60-4.40 g/10min' },
        methodStandard: { en: 'GB/T 3682.1-2018', zh: 'GB/T 3682.1-2018' },
      },
      {
        label: { en: 'Elongation at break', zh: '断裂伸长率' },
        value: { en: '>=400 percent', zh: '>=400 percent' },
        methodStandard: { en: 'ASTM D638-2022', zh: 'ASTM D638-2022' },
      },
      {
        label: { en: 'Haze', zh: '雾度' },
        value: { en: '<=8.0 percent', zh: '<=8.0 percent' },
        methodStandard: { en: 'GB/T 2410-2008', zh: 'GB/T 2410-2008' },
      },
    ],
    relatedProductSlugs: ['ldpe-951-00', 'ldpe-2426h', 'ldpe-2520d'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/ldpe-2426k-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 3,
    seoTitle: {
      en: 'LDPE 2426K — Technical Parameters | AOWATT',
      zh: 'LDPE 2426K — 技术参数 | AOWATT',
    },
    seoDescription: {
      en: 'LDPE 2426K technical parameters.',
      zh: 'LDPE 2426K 技术参数。',
    },
  },
  {
    slug: 'ldpe-2520d',
    name: { en: 'LDPE 2520D', zh: 'LDPE 2520D' },
    category: 'ldpe',
    summary: {
      en: 'Technical parameters for LDPE 2520D.',
      zh: 'LDPE 2520D 技术参数。',
    },
    overview: {
      en: 'LDPE 2520D technical parameters are listed below as provided.',
      zh: 'LDPE 2520D 技术参数如下，按提供资料列出。',
    },
    packaging: [],
    applications: [],
    documents: ['TDS'],
    specs: [
      {
        label: { en: 'Product standard', zh: '产品标准' },
        value: { en: 'Q/SH3175 3000-2018', zh: 'Q/SH3175 3000-2018' },
      },
      {
        label: { en: 'Pellet appearance — color pellets', zh: '颗粒外观 — 色粒' },
        value: { en: '<=10 个/kg', zh: '<=10 个/kg' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Melt mass-flow rate', zh: '熔体质量流动速率' },
        value: { en: '0.20-0.40 g/10min', zh: '0.20-0.40 g/10min' },
        methodStandard: { en: 'GB/T 3682.1-2018', zh: 'GB/T 3682.1-2018' },
      },
      {
        label: { en: 'Elongation at break', zh: '断裂伸长率' },
        value: { en: '>=550 percent', zh: '>=550 percent' },
        methodStandard: { en: 'ASTM D638-2022', zh: 'ASTM D638-2022' },
      },
      {
        label: { en: 'Film appearance — fisheyes (0.3~2mm)', zh: '薄膜外观 — 鱼眼(0.3~2mm)' },
        value: { en: '<=15 个/1200cm²', zh: '<=15 个/1200cm²' },
        methodStandard: { en: 'GB/T 11115-2009', zh: 'GB/T 11115-2009' },
      },
      {
        label: { en: 'Film appearance — streaks (>=1cm)', zh: '薄膜外观 — 条纹(≥1cm)' },
        value: { en: '<=20 cm/20m²', zh: '<=20 cm/20m²' },
        methodStandard: { en: 'GB/T 11115-2009', zh: 'GB/T 11115-2009' },
      },
      {
        label: { en: 'Haze', zh: '雾度' },
        value: { en: '<=13.0 percent', zh: '<=13.0 percent' },
        methodStandard: { en: 'GB/T 2410-2008', zh: 'GB/T 2410-2008' },
      },
    ],
    relatedProductSlugs: ['ldpe-951-00', 'ldpe-2426h', 'ldpe-2426k'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/ldpe-2520d-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 4,
    seoTitle: {
      en: 'LDPE 2520D — Technical Parameters | AOWATT',
      zh: 'LDPE 2520D — 技术参数 | AOWATT',
    },
    seoDescription: {
      en: 'LDPE 2520D technical parameters.',
      zh: 'LDPE 2520D 技术参数。',
    },
  },
  {
    slug: 'hdpe-j50-10n5000',
    name: { en: 'HDPE J50-10N5000', zh: 'HDPE J50-10N5000' },
    category: 'hdpe',
    summary: {
      en: 'High-density polyethylene for ultrathin film applications.',
      zh: '适用于超薄薄膜应用的高密度聚乙烯。',
    },
    overview: {
      en: 'J50-10N5000 is a high-density polyethylene copolymer produced with INEOS process and catalyst technology, with a bimodal molecular-weight distribution.',
      zh: 'J50-10N5000 是一款采用 INEOS 工艺和催化剂生产的高密度聚乙烯共聚物，分子量分布呈双峰形式。',
    },
    packaging: [],
    applications: [{ en: 'Thin film applications', zh: '薄膜应用' }],
    documents: ['TDS'],
    specs: [
      {
        label: { en: 'Melt index (190℃/21.6 kg)', zh: '熔融指数（190℃/21.6 kg）' },
        value: { en: 'Typical value: 9.5 g/10min', zh: '典型值：9.5 g/10min' },
        methodStandard: { en: 'GB/T 3682.1', zh: 'GB/T 3682.1' },
      },
      {
        label: { en: 'Density', zh: '密度' },
        value: { en: 'Typical value: 0.95 g/cm³', zh: '典型值：0.95 g/cm³' },
        methodStandard: { en: 'GB/T 1033.1', zh: 'GB/T 1033.1' },
      },
      {
        label: { en: 'Tensile yield strength (MD)', zh: '拉伸屈服强度（纵向）' },
        value: { en: 'Typical value: 31 MPa', zh: '典型值：31 MPa' },
        methodStandard: { en: 'GB/T 1040.3', zh: 'GB/T 1040.3' },
      },
      {
        label: { en: 'Tensile yield strength (TD)', zh: '拉伸屈服强度（横向）' },
        value: { en: 'Typical value: 27 MPa', zh: '典型值：27 MPa' },
        methodStandard: { en: 'GB/T 1040.3', zh: 'GB/T 1040.3' },
      },
      {
        label: { en: 'Tensile break strength (MD)', zh: '拉伸断裂强度（纵向）' },
        value: { en: 'Typical value: >60 MPa', zh: '典型值：>60 MPa' },
        methodStandard: { en: 'GB/T 1040.3', zh: 'GB/T 1040.3' },
      },
      {
        label: { en: 'Tensile break strength (TD)', zh: '拉伸断裂强度（横向）' },
        value: { en: 'Typical value: >50 MPa', zh: '典型值：>50 MPa' },
        methodStandard: { en: 'GB/T 1040.3', zh: 'GB/T 1040.3' },
      },
      {
        label: { en: 'Elongation at break (MD/TD)', zh: '断裂伸长率（纵向/横向）' },
        value: { en: 'Typical value: >250/>350 %', zh: '典型值：>250/>350 %' },
        methodStandard: { en: 'GB/T 1040.3', zh: 'GB/T 1040.3' },
      },
      {
        label: { en: 'Dart impact test', zh: '落镖冲击测试' },
        value: { en: 'Typical value: >250 g', zh: '典型值：>250 g' },
        methodStandard: { en: 'GB/T 9639.1', zh: 'GB/T 9639.1' },
      },
    ],
    relatedProductSlugs: ['ldpe-2426h', 'ldpe-2426k', 'ldpe-2520d'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/hdpe-j50-10n5000-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 1,
    seoTitle: {
      en: 'HDPE J50-10N5000 — Ultrathin Film Grade | AOWATT',
      zh: 'HDPE J50-10N5000 — 超薄薄膜用料 | AOWATT',
    },
    seoDescription: {
      en: 'HDPE J50-10N5000 high-density polyethylene technical data for film applications.',
      zh: 'HDPE J50-10N5000 高密度聚乙烯薄膜应用技术数据。',
    },
  },

  // ─── LLDPE C4 (butene-1 comonomer) — published grades ─────────────────────
  {
    slug: 'egf-34',
    name: { en: 'LLDPE EGF-34', zh: 'LLDPE EGF-34' },
    category: 'lldpe-c4',
    summary: {
      en: 'Butene-1 LLDPE for weather-resistant agricultural greenhouse film — high tensile and tear strength, excellent puncture and ESCR.',
      zh: '丁烯共聚 LLDPE，专用于农用耐老化棚膜，拉伸与撕裂强度高，耐穿刺与耐环境应力开裂性能优异。',
    },
    overview: {
      en: 'LLDPE EGF-34 is a butene-1 comonomer linear polyethylene grade engineered for greenhouse film. It combines high tensile and tear strength with strong puncture resistance and environmental stress crack resistance, helping films stay intact through full crop cycles. The grade is supplied additive-free — no anti-block, no slip — making it suitable for downstream formulators that prefer to dose their own additive packages.',
      zh: '线性低密度聚乙烯 EGF-34 是以丁烯-1 为共聚单体的薄膜专用料，具有较高的拉伸强度、撕裂强度、耐穿刺和耐环境应力开裂性能，是优良的大棚膜专用料，可在整个种植周期内保持薄膜完整。该牌号不含开口剂与爽滑剂，适合下游需要自行配方添加助剂的客户。',
    },
    grade: { en: 'Film grade', zh: '薄膜级' },
    packaging: [
      { en: '25 kg PE bag', zh: '25 公斤 PE 袋' },
      { en: '1 MT bulk bag (jumbo)', zh: '1 吨吨袋' },
    ],
    applications: [
      { en: 'Weather-resistant agricultural greenhouse film', zh: '农用耐老化棚膜' },
    ],
    documents: ['COA', 'TDS'],
    specs: [
      {
        label: { en: 'Comonomer', zh: '共聚单体' },
        value: { en: 'Butene-1', zh: '丁烯-1' },
      },
      {
        label: { en: 'Melt Flow Rate (190 °C / 2.16 kg)', zh: '熔体流动速率 (190 °C / 2.16 kg)' },
        value: { en: '0.75 g/10 min', zh: '0.75 g/10 min' },
      },
      {
        label: { en: 'Density', zh: '密度' },
        value: { en: '0.920 g/cm³', zh: '0.920 g/cm³' },
      },
      {
        label: { en: 'Tensile Yield Strength', zh: '拉伸屈服强度' },
        value: { en: '8.3 MPa', zh: '8.3 MPa' },
      },
      {
        label: { en: 'Tensile Strength at Break', zh: '拉伸断裂强度' },
        value: { en: '17 MPa', zh: '17 MPa' },
      },
      {
        label: { en: 'Dart Drop Impact', zh: '落锤冲击' },
        value: { en: '80 g', zh: '80 g' },
      },
      {
        label: { en: 'Haze', zh: '雾度' },
        value: { en: '13 %', zh: '13 %' },
      },
      {
        label: { en: 'Anti-block agent', zh: '开口剂' },
        value: { en: 'None', zh: '无' },
      },
      {
        label: { en: 'Slip agent', zh: '爽滑剂' },
        value: { en: 'None', zh: '无' },
      },
      {
        label: { en: 'Test standards', zh: '测试方法' },
        value: {
          en: 'GB/T 3682.1, GB/T 1033.2, GB/T 1040.2, GB/T 9639.1, GB/T 2410',
          zh: 'GB/T 3682.1, GB/T 1033.2, GB/T 1040.2, GB/T 9639.1, GB/T 2410',
        },
      },
    ],
    relatedProductSlugs: ['egf-35b', 'f231s'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/egf-34-hero.jpg',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 1,
    seoTitle: {
      en: 'LLDPE EGF-34 — Butene-1 Greenhouse Film Grade | AOWATT',
      zh: 'LLDPE EGF-34 — 丁烯共聚棚膜专用料 | AOWATT',
    },
    seoDescription: {
      en: 'Butene-1 LLDPE engineered for weather-resistant agricultural greenhouse film. High tensile and tear strength, additive-free.',
      zh: '丁烯共聚 LLDPE 棚膜专用料，拉伸与撕裂强度突出，不含开口剂与爽滑剂。',
    },
  },
  {
    slug: 'egf-35b',
    name: { en: 'LLDPE EGF-35B', zh: 'LLDPE EGF-35B' },
    category: 'lldpe-c4',
    summary: {
      en: 'Butene-1 LLDPE for merchandise bags, food bags and mulch film — excellent puncture resistance, thermal stability and built-in additive package.',
      zh: '丁烯共聚 LLDPE，专用于商品袋、食品袋与地膜，加工性能优异，预添加开口剂与爽滑剂。',
    },
    overview: {
      en: 'LLDPE EGF-35B is a butene-1 comonomer LLDPE resin tuned for processability with excellent puncture resistance, thermal stability, and high tensile strength. It ships with a balanced anti-block (3000 ppm) and slip (1000 ppm) additive package out of the reactor, so converters running merchandise bag, food bag and mulch film lines can drop the resin into existing recipes without adjusting their masterbatch.',
      zh: '线性低密度聚乙烯 EGF-35B 是以丁烯-1 为共聚单体的 LLDPE 专用树脂，加工性能良好，抗穿刺性、热稳定性和拉伸强度优异。出厂即配 3000 ppm 开口剂 + 1000 ppm 爽滑剂，下游商品袋、食品袋与地膜生产线可直接投用，无需额外调整母料配方。',
    },
    grade: { en: 'Film grade', zh: '薄膜级' },
    packaging: [
      { en: '25 kg PE bag', zh: '25 公斤 PE 袋' },
      { en: '1 MT bulk bag (jumbo)', zh: '1 吨吨袋' },
    ],
    applications: [
      { en: 'Merchandise bags', zh: '商品袋' },
      { en: 'Food bags', zh: '食品袋' },
      { en: 'Agricultural mulch film', zh: '地膜' },
    ],
    documents: ['COA', 'TDS'],
    specs: [
      {
        label: { en: 'Comonomer', zh: '共聚单体' },
        value: { en: 'Butene-1', zh: '丁烯-1' },
      },
      {
        label: { en: 'Melt Flow Rate (190 °C / 2.16 kg)', zh: '熔体流动速率 (190 °C / 2.16 kg)' },
        value: { en: '1.9 g/10 min', zh: '1.9 g/10 min' },
      },
      {
        label: { en: 'Density', zh: '密度' },
        value: { en: '0.922 g/cm³', zh: '0.922 g/cm³' },
      },
      {
        label: { en: 'Tensile Yield Strength', zh: '拉伸屈服强度' },
        value: { en: '8.3 MPa', zh: '8.3 MPa' },
      },
      {
        label: { en: 'Tensile Strength at Break', zh: '拉伸断裂强度' },
        value: { en: '12 MPa', zh: '12 MPa' },
      },
      {
        label: { en: 'Dart Drop Impact', zh: '落锤冲击' },
        value: { en: '60 g', zh: '60 g' },
      },
      {
        label: { en: 'Haze', zh: '雾度' },
        value: { en: '17 %', zh: '17 %' },
      },
      {
        label: { en: 'Anti-block agent', zh: '开口剂' },
        value: { en: '3000 ppm', zh: '3000 ppm' },
      },
      {
        label: { en: 'Slip agent', zh: '爽滑剂' },
        value: { en: '1000 ppm', zh: '1000 ppm' },
      },
      {
        label: { en: 'Test standards', zh: '测试方法' },
        value: {
          en: 'GB/T 3682.1, GB/T 1033.2, GB/T 1040.2, GB/T 9639.1, GB/T 2410',
          zh: 'GB/T 3682.1, GB/T 1033.2, GB/T 1040.2, GB/T 9639.1, GB/T 2410',
        },
      },
    ],
    relatedProductSlugs: ['egf-34', 'f231s'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/egf-35b-hero.jpg',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 2,
    seoTitle: {
      en: 'LLDPE EGF-35B — Butene-1 Bag and Mulch Film Grade | AOWATT',
      zh: 'LLDPE EGF-35B — 丁烯共聚商品袋与地膜专用料 | AOWATT',
    },
    seoDescription: {
      en: 'Butene-1 LLDPE for merchandise bags, food bags and mulch film with built-in 3000 ppm anti-block and 1000 ppm slip additive package.',
      zh: '丁烯共聚 LLDPE，商品袋、食品袋与地膜专用，预添加 3000 ppm 开口剂与 1000 ppm 爽滑剂。',
    },
  },

  // ─── LLDPE C6 (hexene-1 comonomer) — published grades ─────────────────────
  {
    slug: 'f231s',
    name: { en: 'LLDPE F231S', zh: 'LLDPE F231S' },
    category: 'lldpe-c6',
    summary: {
      en: 'Hexene-1 LLDPE for high-strength stretch and packaging film — excellent heat seal, high uniform shrinkage, good clarity.',
      zh: '己烯共聚 LLDPE，专用于高强度拉伸与包装膜，热封性能优异，收缩率高且均匀，透明度良好。',
    },
    overview: {
      en: 'LLDPE F231S is a hexene-1 comonomer LLDPE delivering high tensile strength, high and uniform shrinkage, excellent heat-seal performance, and good film transparency. It is designed for stretch wrap, pallet wrap and high-strength packaging film. The grade is supplied without anti-block; slip content is held below 500 ppm, leaving headroom for converters to fine-tune surface properties.',
      zh: '线性低密度聚乙烯 F231S 是以己烯-1 为共聚单体的 LLDPE，强度高、收缩率高且均匀、热封性能优异、透明度良好，适用于 PE 膜、缠绕膜与高强度包装膜。该牌号不含开口剂，爽滑剂含量低于 500 ppm，便于下游对表面性能进行精细调整。',
    },
    grade: { en: 'Film grade', zh: '薄膜级' },
    packaging: [
      { en: '25 kg PE bag', zh: '25 公斤 PE 袋' },
      { en: '1 MT bulk bag (jumbo)', zh: '1 吨吨袋' },
    ],
    applications: [
      { en: 'PE film', zh: 'PE 膜' },
      { en: 'Stretch and pallet wrap film', zh: '缠绕膜' },
      { en: 'High-strength packaging film', zh: '高强度包装膜' },
    ],
    documents: ['COA', 'TDS'],
    specs: [
      {
        label: { en: 'Comonomer', zh: '共聚单体' },
        value: { en: 'Hexene-1', zh: '己烯-1' },
      },
      {
        label: { en: 'Melt Flow Rate (190 °C / 2.16 kg)', zh: '熔体流动速率 (190 °C / 2.16 kg)' },
        value: { en: '0.95 g/10 min', zh: '0.95 g/10 min' },
      },
      {
        label: { en: 'Density', zh: '密度' },
        value: { en: '0.921 g/cm³', zh: '0.921 g/cm³' },
      },
      {
        label: { en: 'Tensile Yield Strength', zh: '拉伸屈服强度' },
        value: { en: '10 MPa', zh: '10 MPa' },
      },
      {
        label: { en: 'Tensile Strength at Break', zh: '拉伸断裂强度' },
        value: { en: '26 MPa', zh: '26 MPa' },
      },
      {
        label: { en: 'Elongation at Break', zh: '拉伸断裂伸长率' },
        value: { en: '500 %', zh: '500 %' },
      },
      {
        label: { en: 'Dart Drop Impact', zh: '落锤冲击' },
        value: { en: '100 g', zh: '100 g' },
      },
      {
        label: { en: 'Haze', zh: '雾度' },
        value: { en: '16 %', zh: '16 %' },
      },
      {
        label: { en: 'Anti-block agent', zh: '开口剂' },
        value: { en: 'None', zh: '无' },
      },
      {
        label: { en: 'Slip agent', zh: '爽滑剂' },
        value: { en: '< 500 ppm', zh: '< 500 ppm' },
      },
      {
        label: { en: 'Test standards', zh: '测试方法' },
        value: {
          en: 'GB/T 3682.1, GB/T 1033.2, GB/T 1040.2, GB/T 9639.1, GB/T 2410',
          zh: 'GB/T 3682.1, GB/T 1033.2, GB/T 1040.2, GB/T 9639.1, GB/T 2410',
        },
      },
    ],
    relatedProductSlugs: ['egf-34', 'egf-35b'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/f231s-hero.jpg',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 1,
    seoTitle: {
      en: 'LLDPE F231S — Hexene-1 Stretch and Packaging Film Grade | AOWATT',
      zh: 'LLDPE F231S — 己烯共聚拉伸与包装膜专用料 | AOWATT',
    },
    seoDescription: {
      en: 'Hexene-1 LLDPE for high-strength stretch wrap and packaging film. Excellent heat seal, high uniform shrinkage, good clarity.',
      zh: '己烯共聚 LLDPE，高强度拉伸膜与包装膜专用，热封性能优异，收缩均匀，透明度良好。',
    },
  },

  placeholder(
    'mlldpe-c6-sample',
    { en: 'Sample mLLDPE C6 Grade', zh: 'MLLDPE C6 示例牌号' },
    'mlldpe-c6',
    5,
  ),
  placeholder(
    'mlldpe-c8-sample',
    { en: 'Sample mLLDPE C8 Grade', zh: 'MLLDPE C8 示例牌号' },
    'mlldpe-c8',
    6,
  ),

  // ─── PP leaf categories ───────────────────────────────────────────────────
  placeholder(
    'pp-homo-sample',
    { en: 'Sample Homopolymer PP Grade', zh: '均聚 PP 示例牌号' },
    'pp-homo',
    7,
  ),
  {
    slug: 'pp-ep5076x',
    name: { en: 'PP EP5076X', zh: 'PP EP5076X' },
    category: 'pp-impact',
    summary: {
      en: 'Quality certificate data for PP EP5076X impact copolymer.',
      zh: 'PP EP5076X 抗冲击聚丙烯质量合格证数据。',
    },
    overview: {
      en: 'PP EP5076X quality certificate properties are listed below as provided.',
      zh: 'PP EP5076X 质量合格证性能数据如下，按提供资料列出。',
    },
    packaging: [],
    applications: [],
    documents: ['COA'],
    specs: [
      {
        label: { en: 'Specification', zh: '执行标准' },
        value: { en: 'Q/SSTPC C121-2019', zh: 'Q/SSTPC C121-2019' },
      },
      {
        label: { en: 'Batch number', zh: '批号' },
        value: { en: 'SIPP2528E4', zh: 'SIPP2528E4' },
      },
      {
        label: { en: 'Sampling point', zh: '采样地点' },
        value: { en: 'SP90E', zh: 'SP90E' },
      },
      {
        label: { en: 'Sampling date', zh: '采样时间' },
        value: { en: '2022-05-28 15:00', zh: '2022-05-28 15:00' },
      },
      {
        label: { en: 'Issuing date', zh: '签发日期' },
        value: { en: '2022-05-30', zh: '2022-05-30' },
      },
      {
        label: { en: 'Black pellets, 个/kg', zh: '黑粒 个/kg' },
        value: { en: 'Limit: 0; Result: 0', zh: '指标：0；结果：0' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Color and black spot granule, 个/kg', zh: '色粒和黑斑粒 个/kg' },
        value: { en: 'Limit: 报告; Result: 0', zh: '指标：报告；结果：0' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Big and small pellets, g/kg', zh: '大粒和小粒 g/kg' },
        value: { en: 'Limit: ≤100; Result: 0.0', zh: '指标：≤100；结果：0.0' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Melt mass-flow rate (2.16kg, 230℃), g/10min', zh: '熔体质量流动速率（2.16kg, 230℃）g/10min' },
        value: { en: 'Limit: 100±15; Result: 94.3', zh: '指标：100±15；结果：94.3' },
        methodStandard: { en: 'GB/T 3682.1-2018', zh: 'GB/T 3682.1-2018' },
      },
      {
        label: { en: 'Tensile stress at yield, MPa', zh: '拉伸屈服应力 MPa' },
        value: { en: 'Limit: ≥26.0; Result: 29.6', zh: '指标：≥26.0；结果：29.6' },
        methodStandard: { en: 'GB/T 1040.2-2006', zh: 'GB/T 1040.2-2006' },
      },
      {
        label: { en: 'Flexural modulus, MPa', zh: '弯曲模量 MPa' },
        value: { en: 'Limit: 报告; Result: 1647', zh: '指标：报告；结果：1647' },
        methodStandard: { en: 'GB/T 9341-2008', zh: 'GB/T 9341-2008' },
      },
      {
        label: { en: 'Charpy impact strength 23℃, KJ/m²', zh: '简支梁缺口冲击强度 23℃ KJ/m²' },
        value: { en: 'Limit: 报告; Result: 4.7', zh: '指标：报告；结果：4.7' },
        methodStandard: { en: 'GB/T 1043.1-2008', zh: 'GB/T 1043.1-2008' },
      },
      {
        label: { en: 'Charpy impact strength -20℃, KJ/m²', zh: '简支梁缺口冲击强度 -20℃ KJ/m²' },
        value: { en: 'Limit: 报告; Result: 2.2', zh: '指标：报告；结果：2.2' },
        methodStandard: { en: 'GB/T 1043.1-2008', zh: 'GB/T 1043.1-2008' },
      },
      {
        label: { en: 'Temperature of deflection under load (Tf0.45), ℃', zh: '负荷变形温度(Tf0.45) ℃' },
        value: { en: 'Limit: ≥105; Result: 118', zh: '指标：≥105；结果：118' },
        methodStandard: { en: 'GB/T 1634.2-2019', zh: 'GB/T 1634.2-2019' },
      },
      {
        label: { en: 'Rockwell hardness (R ruler)', zh: '洛氏硬度（R标尺）' },
        value: { en: 'Limit: ≥85; Result: 104', zh: '指标：≥85；结果：104' },
        methodStandard: { en: 'GB/T 3398.2-2008', zh: 'GB/T 3398.2-2008' },
      },
      {
        label: { en: 'Moulding shrinkage (parallel), %', zh: '总收缩率（STp平行）%' },
        value: { en: 'Limit: 报告; Result: 1.5', zh: '指标：报告；结果：1.5' },
        methodStandard: { en: 'GB/T 17037.4-2003', zh: 'GB/T 17037.4-2003' },
      },
      {
        label: { en: 'Moulding shrinkage (Vertical), %', zh: '总收缩率（STn垂直）%' },
        value: { en: 'Limit: 报告; Result: 2.0', zh: '指标：报告；结果：2.0' },
        methodStandard: { en: 'GB/T 17037.4-2003', zh: 'GB/T 17037.4-2003' },
      },
      {
        label: { en: 'Mass fraction of ash, %', zh: '灰分（质量分数）%' },
        value: { en: 'Limit: 报告; Result: 0.046', zh: '指标：报告；结果：0.046' },
        methodStandard: { en: 'GB/T 9345.1-2008', zh: 'GB/T 9345.1-2008' },
      },
      {
        label: { en: 'Conclusion', zh: '结论' },
        value: { en: '合格品 ON-SPEC PRODUCT', zh: '合格品 ON-SPEC PRODUCT' },
      },
    ],
    relatedProductSlugs: ['pp-ep548g', 'ppr-mt26'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/pp-ep5076x-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 1,
    seoTitle: {
      en: 'PP EP5076X — Quality Certificate Data | AOWATT',
      zh: 'PP EP5076X — 质量合格证数据 | AOWATT',
    },
    seoDescription: {
      en: 'PP EP5076X impact copolymer quality certificate data.',
      zh: 'PP EP5076X 抗冲击聚丙烯质量合格证数据。',
    },
  },
  {
    slug: 'pp-ep548g',
    name: { en: 'PP EP548G', zh: 'PP EP548G' },
    category: 'pp-impact',
    summary: {
      en: 'Quality certificate data for PP EP548G impact copolymer.',
      zh: 'PP EP548G 抗冲击聚丙烯质量合格证数据。',
    },
    overview: {
      en: 'PP EP548G quality certificate properties are listed below as provided.',
      zh: 'PP EP548G 质量合格证性能数据如下，按提供资料列出。',
    },
    packaging: [],
    applications: [],
    documents: ['COA'],
    specs: [
      {
        label: { en: 'Specification', zh: '执行标准' },
        value: { en: 'Q/SSTPC C120-2019', zh: 'Q/SSTPC C120-2019' },
      },
      {
        label: { en: 'Batch number', zh: '产品批号' },
        value: { en: 'SIPP1730E1', zh: 'SIPP1730E1' },
      },
      {
        label: { en: 'Sampling point', zh: '采样地点' },
        value: { en: 'SP90E', zh: 'SP90E' },
      },
      {
        label: { en: 'Sampling date', zh: '采样时间' },
        value: { en: '2021-07-30 07:00', zh: '2021-07-30 07:00' },
      },
      {
        label: { en: 'Signing date', zh: '签发日期' },
        value: { en: '2021-07-31', zh: '2021-07-31' },
      },
      {
        label: { en: 'Black pellets, 个/kg', zh: '黑粒 个/kg' },
        value: { en: 'Limit: 0; Result: 0', zh: '指标：0；结果：0' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Color and black spot granule, 个/kg', zh: '色粒和黑斑粒 个/kg' },
        value: { en: 'Limit: 报告; Result: 0', zh: '指标：报告；结果：0' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Big and small pellets, g/kg', zh: '大粒和小粒 g/kg' },
        value: { en: 'Limit: ≤100; Result: 0.8', zh: '指标：≤100；结果：0.8' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Melt mass-flow rate (2.16kg, 230℃), g/10min', zh: '熔体质量流动速率（2.16kg, 230℃）g/10min' },
        value: { en: 'Limit: 28±4; Result: 27.9', zh: '指标：28±4；结果：27.9' },
        methodStandard: { en: 'GB/T 3682.1-2018', zh: 'GB/T 3682.1-2018' },
      },
      {
        label: { en: 'Tensile stress at yield, MPa', zh: '拉伸屈服应力 MPa' },
        value: { en: 'Limit: 报告; Result: 25.4', zh: '指标：报告；结果：25.4' },
        methodStandard: { en: 'GB/T 1040.2-2006', zh: 'GB/T 1040.2-2006' },
      },
      {
        label: { en: 'Flexural modulus, MPa', zh: '弯曲模量 MPa' },
        value: { en: 'Limit: 报告; Result: 1182', zh: '指标：报告；结果：1182' },
        methodStandard: { en: 'GB/T 9341-2008', zh: 'GB/T 9341-2008' },
      },
      {
        label: { en: 'Charpy impact strength 23℃, KJ/m²', zh: '简支梁缺口冲击强度 23℃ KJ/m²' },
        value: { en: 'Limit: 报告; Result: 9.8', zh: '指标：报告；结果：9.8' },
        methodStandard: { en: 'GB/T 1043.1-2008', zh: 'GB/T 1043.1-2008' },
      },
      {
        label: { en: 'Charpy impact strength -20℃, KJ/m²', zh: '简支梁缺口冲击强度 -20℃ KJ/m²' },
        value: { en: 'Limit: 报告; Result: 3.8', zh: '指标：报告；结果：3.8' },
        methodStandard: { en: 'GB/T 1043.1-2008', zh: 'GB/T 1043.1-2008' },
      },
      {
        label: { en: 'Temperature of deflection under load (Tf0.45), ℃', zh: '负荷变形温度(Tf0.45) ℃' },
        value: { en: 'Limit: 报告; Result: 105', zh: '指标：报告；结果：105' },
        methodStandard: { en: 'GB/T 1634.2-2019', zh: 'GB/T 1634.2-2019' },
      },
      {
        label: { en: 'Rockwell hardness (R ruler)', zh: '洛氏硬度（R标尺）' },
        value: { en: 'Limit: 报告; Result: 95', zh: '指标：报告；结果：95' },
        methodStandard: { en: 'GB/T 3398.2-2008', zh: 'GB/T 3398.2-2008' },
      },
      {
        label: { en: 'Moulding shrinkage (parallel), %', zh: '总收缩率（STp平行）%' },
        value: { en: 'Limit: 报告; Result: 1.4', zh: '指标：报告；结果：1.4' },
        methodStandard: { en: 'GB/T 17037.4-2003', zh: 'GB/T 17037.4-2003' },
      },
      {
        label: { en: 'Moulding shrinkage (Vertical), %', zh: '总收缩率（STn垂直）%' },
        value: { en: 'Limit: 报告; Result: 1.7', zh: '指标：报告；结果：1.7' },
        methodStandard: { en: 'GB/T 17037.4-2003', zh: 'GB/T 17037.4-2003' },
      },
      {
        label: { en: 'Mass fraction of ash, %', zh: '灰分（质量分数）%' },
        value: { en: 'Limit: 报告; Result: 0.023', zh: '指标：报告；结果：0.023' },
        methodStandard: { en: 'GB/T 9345.1-2008', zh: 'GB/T 9345.1-2008' },
      },
      {
        label: { en: 'Conclusion', zh: '结论' },
        value: { en: '合格品 ON-SPEC PRODUCT', zh: '合格品 ON-SPEC PRODUCT' },
      },
    ],
    relatedProductSlugs: ['pp-ep5076x', 'ppr-mt26'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/pp-ep548g-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 2,
    seoTitle: {
      en: 'PP EP548G — Quality Certificate Data | AOWATT',
      zh: 'PP EP548G — 质量合格证数据 | AOWATT',
    },
    seoDescription: {
      en: 'PP EP548G impact copolymer quality certificate data.',
      zh: 'PP EP548G 抗冲击聚丙烯质量合格证数据。',
    },
  },
  {
    slug: 'ppr-mt26',
    name: { en: 'PPR-MT26', zh: 'PPR-MT26' },
    category: 'pp-random',
    summary: {
      en: 'Quality certificate data for polypropylene resin PPR-MT26.',
      zh: '聚丙烯树脂 PPR-MT26 产品质量合格证数据。',
    },
    overview: {
      en: 'PPR-MT26 quality certificate properties are listed below as provided.',
      zh: 'PPR-MT26 产品质量合格证性能数据如下，按提供资料列出。',
    },
    packaging: [],
    applications: [],
    documents: ['COA'],
    specs: [
      {
        label: { en: 'Specification', zh: '执行标准' },
        value: { en: '暂行标准', zh: '暂行标准' },
      },
      {
        label: { en: 'Batch number', zh: '产品批号' },
        value: { en: 'TL336506F2', zh: 'TL336506F2' },
      },
      {
        label: { en: 'Sampling point', zh: '采样地点' },
        value: { en: '2#D-901F粒料', zh: '2#D-901F粒料' },
      },
      {
        label: { en: 'Sampling date', zh: '采样时间' },
        value: { en: '2026-05-08 08', zh: '2026-05-08 08' },
      },
      {
        label: { en: 'Issuing date', zh: '签发日期' },
        value: { en: '2026-05-10 14', zh: '2026-05-10 14' },
      },
      {
        label: { en: 'Record number', zh: '记录编号' },
        value: { en: 'TJSH-03', zh: 'TJSH-03' },
      },
      {
        label: { en: 'Pellet appearance: black pellets 个/kg', zh: '颗粒外观：黑粒 个/kg' },
        value: { en: 'Limit: 0; Result: 0', zh: '指标：0；结果：0' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Pellet appearance: color and black spot granules 个/kg', zh: '颗粒外观：色粒和黑斑粒 个/kg' },
        value: { en: 'Limit: ≤5; Result: 0', zh: '指标：≤5；结果：0' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Pellet appearance: big and small pellets g/kg', zh: '颗粒外观：大粒和小粒 g/kg' },
        value: { en: 'Limit: ≤100; Result: 20', zh: '指标：≤100；结果：20' },
        methodStandard: { en: 'SH/T 1541.1-2019', zh: 'SH/T 1541.1-2019' },
      },
      {
        label: { en: 'Melt mass-flow rate g/10min', zh: '熔体质量流动速率 g/10min' },
        value: { en: 'Limit: 25.0±3.0; Result: 25.4', zh: '指标：25.0±3.0；结果：25.4' },
        methodStandard: { en: 'GB/T 3682.1-2018', zh: 'GB/T 3682.1-2018' },
      },
      {
        label: { en: 'Tensile stress at yield MPa', zh: '拉伸屈服应力 MPa' },
        value: { en: 'Limit: ≥22.0; Result: 26.1', zh: '指标：≥22.0；结果：26.1' },
        methodStandard: { en: 'GB/T 1040.2-2022', zh: 'GB/T 1040.2-2022' },
      },
      {
        label: { en: 'Tensile stress at break MPa', zh: '拉伸断裂应力 MPa' },
        value: { en: 'Limit: 报告; Result: 22.8', zh: '指标：报告；结果：22.8' },
        methodStandard: { en: 'GB/T 1040.2-2022', zh: 'GB/T 1040.2-2022' },
      },
      {
        label: { en: 'Nominal tensile strain at break %', zh: '拉伸断裂标称应变 %' },
        value: { en: 'Limit: 报告; Result: 531', zh: '指标：报告；结果：531' },
        methodStandard: { en: 'GB/T 1040.2-2022', zh: 'GB/T 1040.2-2022' },
      },
      {
        label: { en: 'Flexural modulus MPa', zh: '弯曲模量 MPa' },
        value: { en: 'Limit: ≥800; Result: 1047', zh: '指标：≥800；结果：1047' },
        methodStandard: { en: 'GB/T 9341-2008', zh: 'GB/T 9341-2008' },
      },
      {
        label: { en: 'Temperature of deflection under load (Tf0.45)℃', zh: '负荷变形温度(Tf0.45)℃' },
        value: { en: 'Limit: ≥60; Result: 76', zh: '指标：≥60；结果：76' },
        methodStandard: { en: 'GB/T 1634.2-2019', zh: 'GB/T 1634.2-2019' },
      },
      {
        label: { en: 'Charpy notched impact strength (23℃) kJ/m²', zh: '简支梁缺口冲击强度(23℃) kJ/m²' },
        value: { en: 'Limit: ≥3.0; Result: 5.3', zh: '指标：≥3.0；结果：5.3' },
        methodStandard: { en: 'GB/T 1043.1-2008', zh: 'GB/T 1043.1-2008' },
      },
      {
        label: { en: 'Judgement result', zh: '判定结果' },
        value: { en: '优等品', zh: '优等品' },
      },
    ],
    relatedProductSlugs: ['pp-ep5076x', 'pp-ep548g'],
    image: 'product-lldpe-bag',
    heroImage: '/images/products/ppr-mt26-hero.png',
    featured: true,
    published: true,
    placeholder: false,
    sortOrder: 1,
    seoTitle: {
      en: 'PPR-MT26 — Quality Certificate Data | AOWATT',
      zh: 'PPR-MT26 — 产品质量合格证数据 | AOWATT',
    },
    seoDescription: {
      en: 'PPR-MT26 polypropylene resin quality certificate data.',
      zh: '聚丙烯树脂 PPR-MT26 产品质量合格证数据。',
    },
  },
  placeholder(
    'pp-terpoly-sample',
    { en: 'Sample Terpolymer PP Grade', zh: '三元共聚 PP 示例牌号' },
    'pp-terpoly',
    10,
  ),
  placeholder(
    'pp-hico-sample',
    { en: 'Sample High-Impact Copolymer PP Grade', zh: '高抗冲共聚 PP 示例牌号' },
    'pp-hico',
    11,
  ),
  placeholder(
    'pp-modified-sample',
    { en: 'Sample Modified PP Grade', zh: '改性专用 PP 示例牌号' },
    'pp-modified',
    12,
  ),

  // ─── Manufactured goods leaf categories ───────────────────────────────────
  placeholder(
    'cling-film-sample',
    { en: 'Sample Cling Film Product', zh: '保鲜膜示例产品' },
    'cling-film',
    13,
  ),
  placeholder(
    'wash-basin-sample',
    { en: 'Sample Wash Basin Product', zh: '脸盆示例产品' },
    'wash-basin',
    14,
  ),
];
