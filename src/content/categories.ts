import type { ProductCategory } from '@/types/product';

export const categories: ProductCategory[] = [
  {
    slug: 'industrial-chemicals',
    name: { en: 'Industrial Chemicals', zh: '工业化学品' },
    summary: {
      en: 'Bulk acids, alkalis, and core process chemicals for manufacturing.',
      zh: '面向制造业的散装酸碱与核心工艺化学品。',
    },
    image: 'category-industrial',
    sortOrder: 1,
    enabled: true,
  },
  {
    slug: 'specialty-chemicals',
    name: { en: 'Specialty Chemicals', zh: '特种化学品' },
    summary: {
      en: 'Performance additives and intermediates for specialised industries.',
      zh: '面向特殊行业的高性能添加剂与中间体。',
    },
    image: 'category-specialty',
    sortOrder: 2,
    enabled: true,
  },
  {
    slug: 'solvents',
    name: { en: 'Solvents', zh: '溶剂' },
    summary: {
      en: 'Industrial solvents for cleaning, formulation, and extraction.',
      zh: '面向清洗、配方与提取的工业溶剂。',
    },
    image: 'category-solvents',
    sortOrder: 3,
    enabled: true,
  },
  {
    slug: 'water-treatment',
    name: { en: 'Water Treatment', zh: '水处理' },
    summary: {
      en: 'Disinfectants, coagulants, and pH adjusters for water systems.',
      zh: '面向水系统的消毒剂、絮凝剂与 pH 调节剂。',
    },
    image: 'category-water',
    sortOrder: 4,
    enabled: true,
  },
  {
    slug: 'agricultural-chemicals',
    name: { en: 'Agricultural Chemicals', zh: '农业化学品' },
    summary: {
      en: 'Inputs for crop nutrition, soil treatment, and post-harvest handling.',
      zh: '面向作物营养、土壤处理与采后处理的农业投入品。',
    },
    image: 'category-agricultural',
    sortOrder: 5,
    enabled: true,
  },
  {
    slug: 'mining-chemicals',
    name: { en: 'Mining Chemicals', zh: '矿业化学品' },
    summary: {
      en: 'Reagents and process chemicals for mineral extraction and beneficiation.',
      zh: '面向矿物提取与选矿的试剂与工艺化学品。',
    },
    image: 'category-mining',
    sortOrder: 6,
    enabled: true,
  },
];
