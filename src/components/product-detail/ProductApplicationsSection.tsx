import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { LocalizedProduct } from '@/types/product';

type ApplicationKind =
  | 'peFilm'
  | 'stretchWrap'
  | 'highStrengthPackaging'
  | 'greenhouseFilm'
  | 'merchandiseBags'
  | 'foodBags'
  | 'mulchFilm'
  | 'fallback';

const APPLICATION_IMAGES: Record<ApplicationKind, string> = {
  peFilm: '/images/products/applications/pe-film.jpg',
  stretchWrap: '/images/products/applications/stretch-wrap.jpg',
  highStrengthPackaging: '/images/products/applications/high-strength-packaging.jpg',
  greenhouseFilm: '/images/products/applications/greenhouse-film.jpg',
  merchandiseBags: '/images/products/applications/merchandise-bags.jpg',
  foodBags: '/images/products/applications/food-bags.jpg',
  mulchFilm: '/images/products/applications/mulch-film.jpg',
  fallback: '/images/products/applications/pe-film.jpg',
};

export function ProductApplicationsSection({ product }: { product: LocalizedProduct }) {
  const t = useTranslations('productDetail.applications');

  if (product.applications.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <div className="max-w-3xl mb-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gold mb-3">
            {t('eyebrow')}
          </p>
          <h2 className="text-section text-navy-deep mb-3">{t('heading')}</h2>
          <p className="text-body text-gray-body">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.applications.map((application, index) => {
            const kind = getApplicationKind(application);

            return (
              <article
                key={`${application}-${index}`}
                className="border border-border-light rounded-card overflow-hidden bg-white"
              >
                <div className="relative h-44 w-full overflow-hidden bg-gray-light/30">
                  <Image
                    src={APPLICATION_IMAGES[kind]}
                    alt={application}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold mb-3">
                    {t(`labels.${kind}`)}
                  </p>
                  <h3 className="text-card-title text-navy-deep mb-2">{application}</h3>
                  <p className="text-body text-gray-body line-clamp-2">
                    {t(`copies.${kind}`, {
                      application,
                      product: product.name,
                    })}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getApplicationKind(application: string): ApplicationKind {
  const normalized = application.toLowerCase();

  if (normalized.includes('stretch') || normalized.includes('pallet') || normalized.includes('缠绕')) {
    return 'stretchWrap';
  }
  if (normalized.includes('high-strength') || normalized.includes('高强度')) {
    return 'highStrengthPackaging';
  }
  if (normalized.includes('pe film') || normalized.includes('pe 膜')) {
    return 'peFilm';
  }
  if (normalized.includes('greenhouse') || normalized.includes('棚膜')) {
    return 'greenhouseFilm';
  }
  if (normalized.includes('merchandise') || normalized.includes('商品袋')) {
    return 'merchandiseBags';
  }
  if (normalized.includes('food') || normalized.includes('食品袋')) {
    return 'foodBags';
  }
  if (normalized.includes('mulch') || normalized.includes('地膜')) {
    return 'mulchFilm';
  }

  return 'fallback';
}
