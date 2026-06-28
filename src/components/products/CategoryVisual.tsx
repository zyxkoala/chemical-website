import Image from 'next/image';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import type { PlaceholderVariant } from '@/types/product';

type Props = {
  variant: PlaceholderVariant;
  categorySlug?: string;
  className?: string;
  sizes?: string;
};

const imagesByVariant: Partial<Record<PlaceholderVariant, string>> = {
  'category-raw-materials': '/images/products/category-raw-materials.jpg',
  'category-manufactured': '/images/products/category-manufactured.jpg',
};

const imagesBySlug: Record<string, string> = {
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

export function CategoryVisual({
  variant,
  categorySlug,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
}: Props) {
  const image = (categorySlug && imagesBySlug[categorySlug]) || imagesByVariant[variant];

  if (!image) {
    return <PlaceholderVisual variant={variant} className={className} />;
  }

  return (
    <div className={`${className} relative overflow-hidden bg-navy`}>
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
