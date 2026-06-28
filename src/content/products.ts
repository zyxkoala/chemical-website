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
  placeholder('ldpe-sample', { en: 'Sample LDPE Grade', zh: 'LDPE 示例牌号' }, 'ldpe', 1),
  placeholder('hdpe-sample', { en: 'Sample HDPE Grade', zh: 'HDPE 示例牌号' }, 'hdpe', 2),

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
  placeholder(
    'pp-impact-sample',
    { en: 'Sample Impact Copolymer PP Grade', zh: '嵌段共聚 PP 示例牌号' },
    'pp-impact',
    8,
  ),
  placeholder(
    'pp-random-sample',
    { en: 'Sample Random Copolymer PP Grade', zh: '无规共聚 PP 示例牌号' },
    'pp-random',
    9,
  ),
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
