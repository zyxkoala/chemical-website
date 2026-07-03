import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from './ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import type { Locale } from '@/types/locale';

export function FeaturedProductsSection({ locale, heading }: { locale: Locale; heading: string }) {
  const products = getFeaturedProducts(locale, 12);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{heading}</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <ProductCard key={p.slug} product={p} source="products_featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
