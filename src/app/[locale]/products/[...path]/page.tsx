import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/product-detail/Breadcrumb';
import { ProductIntro } from '@/components/product-detail/ProductIntro';
import { SpecsPanel } from '@/components/product-detail/SpecsPanel';
import { ProductApplicationsSection } from '@/components/product-detail/ProductApplicationsSection';
import { InquiryPanel } from '@/components/product-detail/InquiryPanel';
import { RelatedProductsSection } from '@/components/product-detail/RelatedProductsSection';
import { InquiryCTABand } from '@/components/products/InquiryCTABand';
import { CategoryBrowsePage } from '@/components/products/CategoryBrowsePage';
import {
  getProductBySlug,
  getProductsUnderCategory,
  getRelatedProducts,
  getProductPathStaticParams,
} from '@/lib/products';
import {
  getCategoryByPath,
  getCategoryAncestors,
  buildCategoryTree,
  getLeafCategoryPathMap,
} from '@/lib/categories';
import { absoluteUrl, buildMetadata, localizedUrl } from '@/lib/seo';
import { site } from '@/content/site';
import type { Locale } from '@/types/locale';

type RouteParams = { locale: string; path: string[] };

const categoryHeroImages: Record<string, string> = {
  'raw-materials': '/images/products/category-raw-materials.jpg',
  manufactured: '/images/products/category-manufactured.jpg',
  pe: '/images/products/categories/pe.jpg',
  pp: '/images/products/categories/pp.jpg',
  ldpe: '/images/products/categories/ldpe.jpg',
  hdpe: '/images/products/categories/hdpe.jpg',
  lldpe: '/images/products/categories/lldpe.jpg',
  mlldpe: '/images/products/categories/mlldpe.jpg',
  'lldpe-c4': '/images/products/categories/lldpe-c4.jpg',
  'lldpe-c6': '/images/products/categories/lldpe-c6.jpg',
  'mlldpe-c6': '/images/products/categories/mlldpe-c6.jpg',
  'mlldpe-c8': '/images/products/categories/mlldpe-c8.jpg',
  'pp-homo': '/images/products/categories/pp-homo.jpg',
  'pp-impact': '/images/products/categories/pp-impact.jpg',
  'pp-random': '/images/products/categories/pp-random.jpg',
  'pp-terpoly': '/images/products/categories/pp-terpoly.jpg',
  'pp-hico': '/images/products/categories/pp-hico.jpg',
  'pp-modified': '/images/products/categories/pp-modified.jpg',
  kitchen: '/images/products/categories/kitchen.jpg',
  'cling-film': '/images/products/categories/cling-film.jpg',
  'wash-basin': '/images/products/categories/wash-basin.jpg',
};

export function generateStaticParams() {
  return getProductPathStaticParams().map(({ path }) => ({ path }));
}

function buildBreadcrumbs(
  ancestors: { name: string; path: string[] }[],
  current: { label: string; href?: string },
  t: (key: string) => string,
) {
  return [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbProducts'), href: '/products' },
    ...ancestors.map(a => ({
      label: a.name,
      href: `/products/${a.path.join('/')}`,
    })),
    current,
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, path } = await params;
  const loc = locale as Locale;

  const category = getCategoryByPath(path, loc);
  if (category) {
    return buildMetadata({
      title: `${category.name} — AOWATT`,
      description: category.summary,
      path: `/products/${path.join('/')}`,
      locale: loc,
      keywords: ['AOWATT', category.name, 'chemical supplier', 'polymer raw materials'],
    });
  }

  if (path.length === 0) return {};
  const productSlug = path[path.length - 1]!;
  const parentPath = path.slice(0, -1);
  const parent = getCategoryByPath(parentPath, loc);
  if (parent?.isLeaf) {
    const product = getProductBySlug(productSlug, loc);
    if (product && product.category === parent.slug) {
      return buildMetadata({
        title: product.seoTitle ?? `${product.name} — AOWATT`,
        description: product.seoDescription ?? product.summary,
        path: `/products/${path.join('/')}`,
        locale: loc,
        ogImage: product.heroImage,
        keywords: [
          'AOWATT',
          product.name,
          product.slug,
          parent.name,
          product.grade,
          ...product.applications,
        ].filter((keyword): keyword is string => Boolean(keyword)),
      });
    }
  }

  return {};
}

export default async function ProductPathPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, path } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations('productDetail');
  const tCat = await getTranslations('products');
  const tree = buildCategoryTree(loc);
  const categoryPathMap = getLeafCategoryPathMap();

  // ─── Branch 1: Category list page ───────────────────────────────────────
  const category = getCategoryByPath(path, loc);
  if (category) {
    const ancestors = getCategoryAncestors(category.slug, loc);
    const crumbs = buildBreadcrumbs(
      ancestors.map(a => ({ name: a.name, path: a.path })),
      { label: category.name },
      t,
    );

    const products = getProductsUnderCategory(category.slug, loc);

    return (
      <>
        <PageHero
          locale={loc}
          eyebrow={ancestors[ancestors.length - 1]?.name}
          title={category.name}
          subtitle={category.summary}
          visualImage={categoryHeroImages[category.slug]}
          visualAlt={category.name}
        />
        <Breadcrumb locale={loc} crumbs={crumbs} />
        <CategoryBrowsePage
          tree={tree}
          activeCategory={category}
          products={products}
          categoryPathMap={categoryPathMap}
          locale={loc}
          searchPlaceholder={tCat('search.placeholder')}
          searchEmpty={tCat('search.empty')}
          searchResultsHeading={tCat('search.resultsHeading')}
          comingSoonLabel={tCat('megaMenu.comingSoon')}
          emptyMessage={tCat('emptyState.noProducts')}
          sidebarTitle={tCat('sidebar.title')}
        />
        <InquiryCTABand locale={loc} />
      </>
    );
  }

  // ─── Branch 2: Product detail page ──────────────────────────────────────
  if (path.length === 0) notFound();
  const productSlug = path[path.length - 1]!;
  const parentPath = path.slice(0, -1);
  const parent = getCategoryByPath(parentPath, loc);
  if (parent?.isLeaf) {
    const product = getProductBySlug(productSlug, loc);
    if (product && product.category === parent.slug) {
      const ancestors = getCategoryAncestors(parent.slug, loc);
      const crumbs = buildBreadcrumbs(
        [
          ...ancestors.map(a => ({ name: a.name, path: a.path })),
          { name: parent.name, path: parent.path },
        ],
        { label: product.name },
        t,
      );
      const related = getRelatedProducts(product, loc, 3);
      const productUrl = localizedUrl(loc, `/products/${path.join('/')}`);
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        brand: {
          '@type': 'Brand',
          name: 'AOWATT',
        },
        manufacturer: {
          '@type': 'Organization',
          name: site.name,
          url: absoluteUrl('/'),
        },
        category: parent.name,
        description: product.summary,
        url: productUrl,
        image: product.heroImage ? [absoluteUrl(product.heroImage)] : undefined,
        sku: product.slug.toUpperCase(),
        additionalProperty: product.specs.map(spec => ({
          '@type': 'PropertyValue',
          name: spec.label,
          value: spec.value,
        })),
      };
      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          />
          <PageHero
            locale={loc}
            eyebrow={parent.name}
            title={product.name}
            subtitle={product.summary}
            visualImage={product.heroImage}
            visualAlt={product.name}
          />
          <Breadcrumb locale={loc} crumbs={crumbs} />
          <ProductIntro product={product} />
          <section className="pb-12 bg-white">
            <div className="max-w-page-max mx-auto px-section-px">
              <SpecsPanel product={product} />
            </div>
          </section>
          <ProductApplicationsSection product={product} />
          <InquiryPanel locale={loc} productName={product.name} productUrl={productUrl} />
          <RelatedProductsSection locale={loc} related={related} />
        </>
      );
    }
  }

  notFound();
}
