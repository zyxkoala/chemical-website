import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import type { LocalizedProduct } from '@/types/product';

export function ProductIntro({ product }: { product: LocalizedProduct }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-page-max mx-auto px-section-px grid lg:grid-cols-2 gap-12 items-start">
        <div className="max-w-[600px]">
          <h1 className="text-page-title text-navy-deep mb-6">{product.name}</h1>
          {product.casNo && (
            <p className="text-body text-gray-body mb-4">CAS {product.casNo}</p>
          )}
          <p className="text-body text-gray-body leading-relaxed">{product.overview}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PlaceholderVisual variant={product.image} className="w-full max-w-[580px] h-auto" />
        </div>
      </div>
    </section>
  );
}
