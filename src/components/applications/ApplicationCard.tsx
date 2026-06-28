import Image from 'next/image';
import { getApplicationImage } from '@/lib/application-images';
import type { PlaceholderVariant } from '@/types/product';

type Props = {
  variant: PlaceholderVariant;
  title: string;
  copy: string;
};

export function ApplicationCard({ variant, title, copy }: Props) {
  return (
    <div className="border border-border-light rounded-card overflow-hidden">
      <div className="relative w-full h-40 overflow-hidden bg-gray-light/30">
        <Image
          src={getApplicationImage(variant)}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-card-title text-navy-deep mb-2">{title}</h3>
        <p className="text-body text-gray-body">{copy}</p>
      </div>
    </div>
  );
}
