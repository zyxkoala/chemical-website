import Image from 'next/image';
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
          {product.heroImage ? (
            <div className="relative w-full max-w-[580px] aspect-[4/3] overflow-hidden rounded-card border border-border-light bg-gray-light/30">
              <Image
                src={product.heroImage}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 580px"
                className="object-cover"
              />
            </div>
          ) : (
            <PlaceholderVisual variant={product.image} className="w-full max-w-[580px] h-auto" />
          )}
        </div>
      </div>
    </section>
  );
}


