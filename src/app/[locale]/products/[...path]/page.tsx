import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/product-detail/Breadcrumb';
import { ProductIntro } from '@/components/product-detail/ProductIntro';
import { SpecsPanel } from '@/components/product-detail/SpecsPanel';
import { InquiryPanel } from '@/components/product-detail/InquiryPanel';
import { RelatedProductsSection } from '@/components/product-detail/RelatedProductsSection';
import { InquiryCTABand } from '@/components/products/InquiryCTABand';
import { CategorySidebar } from '@/components/products/CategorySidebar';
import { IntermediateCategoryView } from '@/components/products/IntermediateCategoryView';
import {
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
  getProductPathStaticParams,
} from '@/lib/products';
import {
  getCategoryByPath,
  getCategoryAncestors,
  getChildCategories,
  getSiblingCategories,
  buildCategoryTree,
} from '@/lib/categories';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';
import type { LocalizedCategory, LocalizedProduct } from '@/types/product';

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

  // ─── Branch 1: Category list page ───────────────────────────────────────
  const category = getCategoryByPath(path, loc);
  if (category) {
    const ancestors = getCategoryAncestors(category.slug, loc);
    const crumbs = buildBreadcrumbs(
      ancestors.map(a => ({ name: a.name, path: a.path })),
      { label: category.name },
      t,
    );

    const sidebarTitle = tCat('sidebar.title');

    return (
      <>
        <PageHero
          locale={loc}
          eyebrow={ancestors[ancestors.length - 1]?.name}
          title={category.name}
          subtitle={category.summary}
        />
        <Breadcrumb locale={loc} crumbs={crumbs} />
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-page-max mx-auto px-section-px flex gap-12">
            <CategorySidebar
              tree={tree}
              locale={loc}
              activePath={category.path}
              title={sidebarTitle}
            />
            <div className="flex-1 min-w-0">
              {category.isLeaf ? (
                <LeafCategoryContent
                  parent={category}
                  products={getProductsByCategory(category.slug, loc)}
                  locale={loc}
                  emptyMessage={tCat('emptyState.noProducts')}
                  comingSoonLabel={tCat('megaMenu.comingSoon')}
                />
              ) : (
                <IntermediateCategoryView
                  category={category}
                  childCategories={getChildCategories(category.slug, loc)}
                  siblings={getSiblingCategories(category.slug, loc)}
                  locale={loc}
                />
              )}
            </div>
          </div>
        </section>
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

function LeafCategoryContent({
  parent,
  products,
  locale,
  emptyMessage,
  comingSoonLabel,
}: {
  parent: LocalizedCategory;
  products: LocalizedProduct[];
  locale: Locale;
  emptyMessage: string;
  comingSoonLabel: string;
}) {
  if (products.length === 0) {
    return (
      <p className="text-body text-gray-body text-center py-12">{emptyMessage}</p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(p => (
        <ProductCardWithDisabled
          key={p.slug}
          parent={parent}
          product={p}
          locale={locale}
          comingSoonLabel={comingSoonLabel}
        />
      ))}
    </div>
  );
}

function ProductCardWithDisabled({
  parent,
  product,
  locale,
  comingSoonLabel,
}: {
  parent: LocalizedCategory;
  product: LocalizedProduct;
  locale: Locale;
  comingSoonLabel: string;
}) {
  // Placeholder products show as disabled cards (not yet linkable).
  if (product.placeholder) {
    return (
      <div
        aria-disabled="true"
        className="relative border border-border-light rounded-card overflow-hidden opacity-60 cursor-not-allowed"
      >
        <div className="p-6">
          <h3 className="text-card-title text-navy-deep mb-2">{product.name}</h3>
          <p className="text-body text-gray-body line-clamp-2 mb-4">{product.summary}</p>
          <span className="inline-block text-[13px] font-semibold text-gold bg-[#FDF6E7] px-3 py-1 rounded">
            {comingSoonLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/products/${parent.path.join('/')}/${product.slug}`}
      className="group block border border-border-light rounded-card overflow-hidden hover:border-gold transition-colors"
    >
      <div className="p-6">
        <h3 className="text-card-title text-navy-deep mb-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-body text-gray-body line-clamp-2">{product.summary}</p>
      </div>
    </Link>
  );
}

// (Removed: safeTitle fallback — all i18n keys now exist in en.json/zh.json.)
