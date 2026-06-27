import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/product-detail/Breadcrumb';
import { ProductIntro } from '@/components/product-detail/ProductIntro';
import { SpecsPanel } from '@/components/product-detail/SpecsPanel';
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
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

type RouteParams = { locale: string; path: string[] };

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
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aowatt.com.au';
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.summary,
        url: `${base}/${loc}/products/${path.join('/')}`,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'AUD',
          seller: { '@type': 'Organization', name: 'AOWATT Global Materials' },
        },
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
          />
          <Breadcrumb locale={loc} crumbs={crumbs} />
          <ProductIntro product={product} />
          <section className="pb-12 bg-white">
            <div className="max-w-page-max mx-auto px-section-px">
              <SpecsPanel product={product} />
            </div>
          </section>
          <InquiryPanel locale={loc} />
          <RelatedProductsSection locale={loc} related={related} />
        </>
      );
    }
  }

  notFound();
}

