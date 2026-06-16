import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/product-detail/Breadcrumb';
import { ProductIntro } from '@/components/product-detail/ProductIntro';
import { SpecsPanel } from '@/components/product-detail/SpecsPanel';
import { InquiryPanel } from '@/components/product-detail/InquiryPanel';
import { RelatedProductsSection } from '@/components/product-detail/RelatedProductsSection';
import {
  getProductBySlug,
  getProductStaticParams,
  getRelatedProducts,
} from '@/lib/products';
import { getCategoryBySlug } from '@/lib/categories';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

type RouteParams = { locale: string; slug: string };

export function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug, locale as Locale);
  if (!product) return {};
  return buildMetadata({
    title: product.seoTitle ?? `${product.name} — AOWATT`,
    description: product.seoDescription ?? product.summary,
    path: `/products/${slug}`,
    locale: locale as Locale,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug, locale as Locale);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category, locale as Locale);
  const related = getRelatedProducts(product, locale as Locale, 3);
  const t = await getTranslations('productDetail');

  const crumbs = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbProducts'), href: '/products' },
    ...(category ? [{ label: category.name, href: `/products?category=${category.slug}` }] : []),
    { label: product.name },
  ];

  return (
    <>
      <PageHero
        locale={locale as Locale}
        eyebrow={category?.name}
        title={product.name}
        subtitle={product.summary}
      />
      <Breadcrumb locale={locale as Locale} crumbs={crumbs} />
      <ProductIntro product={product} />
      <section className="pb-20 bg-white">
        <div className="max-w-page-max mx-auto px-section-px grid lg:grid-cols-2 gap-8">
          <SpecsPanel product={product} />
          <InquiryPanel locale={locale as Locale} />
        </div>
      </section>
      <RelatedProductsSection locale={locale as Locale} related={related} />
    </>
  );
}
