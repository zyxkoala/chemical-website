import type { LocalizedString, PlaceholderVariant } from '@/types/product';

export type ApplicationCard = {
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  image: PlaceholderVariant;
};

export const applications: ApplicationCard[] = [
  {
    slug: 'agriculture-film',
    name: { en: 'Greenhouse & mulch film', zh: '棚膜与地膜' },
    summary: {
      en: 'Weather-resistant LLDPE films for greenhouses, tunnels and field mulching — long service life, high tear strength, UV-stable.',
      zh: '耐老化 LLDPE 农膜，用于大棚、隧道与地膜覆盖，使用周期长、撕裂强度高、抗紫外。',
    },
    image: 'application-agriculture',
  },
  {
    slug: 'stretch-wrap',
    name: { en: 'Stretch & pallet wrap', zh: '拉伸缠绕膜' },
    summary: {
      en: 'High-strength hexene LLDPE for hand and machine stretch film with uniform shrinkage and excellent puncture resistance.',
      zh: '高强度己烯共聚 LLDPE，用于手用与机用缠绕膜，收缩均匀，抗穿刺性能突出。',
    },
    image: 'application-logistics',
  },
  {
    slug: 'food-packaging',
    name: { en: 'Food & merchandise bags', zh: '食品袋与商品袋' },
    summary: {
      en: 'Butene LLDPE with built-in slip and anti-block additives, drop-in for blown-film bag lines.',
      zh: '丁烯共聚 LLDPE，预添加爽滑与开口剂，可直接用于吹塑袋膜生产。',
    },
    image: 'application-manufacturing',
  },
  {
    slug: 'rigid-injection',
    name: { en: 'Rigid containers & moulded parts', zh: '硬质容器与注塑件' },
    summary: {
      en: 'PP and HDPE grades for blow-moulded bottles, injection-moulded crates and household goods.',
      zh: '聚丙烯与 HDPE 牌号，用于吹塑瓶、注塑周转箱与家居制品。',
    },
    image: 'application-manufacturing',
  },
  {
    slug: 'industrial-coatings',
    name: { en: 'Industrial coatings & extrusion', zh: '工业涂层与挤出' },
    summary: {
      en: 'LDPE for extrusion coating onto paper and aluminium substrates — clean melt, low gel count.',
      zh: 'LDPE 适用于纸张与铝箔的挤出涂层，熔体洁净，凝胶含量低。',
    },
    image: 'application-coatings',
  },
  {
    slug: 'water-pipe',
    name: { en: 'Pipe & water infrastructure', zh: '管材与水利' },
    summary: {
      en: 'HDPE pipe-grade resins for potable water, gas distribution and irrigation systems.',
      zh: 'HDPE 管材专用料，用于饮用水、燃气输配与灌溉系统。',
    },
    image: 'application-water',
  },
];

export const applicationsByCategorySlug: Record<string, string[]> = {
  'raw-materials': ['agriculture-film', 'stretch-wrap', 'food-packaging', 'rigid-injection'],
  pe: ['agriculture-film', 'stretch-wrap', 'food-packaging', 'industrial-coatings'],
  pp: ['food-packaging', 'rigid-injection', 'industrial-coatings'],
  lldpe: ['agriculture-film', 'stretch-wrap', 'food-packaging'],
  mlldpe: ['stretch-wrap', 'food-packaging'],
  manufactured: ['food-packaging', 'rigid-injection'],
  kitchen: ['food-packaging', 'rigid-injection'],
};

export function getApplicationsForCategory(categorySlug: string): ApplicationCard[] {
  const slugs = applicationsByCategorySlug[categorySlug] ?? [];
  return slugs
    .map(s => applications.find(a => a.slug === s))
    .filter((a): a is ApplicationCard => a != null);
}
