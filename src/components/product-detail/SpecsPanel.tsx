import { useTranslations } from 'next-intl';
import type { LocalizedProduct } from '@/types/product';

export function SpecsPanel({ product }: { product: LocalizedProduct }) {
  const t = useTranslations('productDetail');
  return (
    <div className="bg-white border border-border-light rounded-card p-8">
      <h2 className="text-card-title text-navy-deep mb-6">{t('specsHeading')}</h2>
      <dl className="divide-y divide-border-light">
        {product.specs.map((spec, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 py-3">
            <dt className="text-body text-gray-body">{spec.label}</dt>
            <dd className="text-body text-navy-deep">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
