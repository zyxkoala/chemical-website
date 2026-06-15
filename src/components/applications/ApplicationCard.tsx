import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import type { PlaceholderVariant } from '@/types/product';

type Props = {
  variant: PlaceholderVariant;
  title: string;
  copy: string;
};

export function ApplicationCard({ variant, title, copy }: Props) {
  return (
    <div className="border border-border-light rounded-card overflow-hidden">
      <PlaceholderVisual variant={variant} className="w-full h-40" />
      <div className="p-6">
        <h3 className="text-card-title text-navy-deep mb-2">{title}</h3>
        <p className="text-body text-gray-body">{copy}</p>
      </div>
    </div>
  );
}
