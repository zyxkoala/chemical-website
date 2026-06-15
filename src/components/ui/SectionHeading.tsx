import { GoldRule } from './GoldRule';

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-section text-navy-deep mb-[10px]">{children}</h2>
      <GoldRule className="mx-auto" />
    </div>
  );
}
