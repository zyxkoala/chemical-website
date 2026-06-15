import { TrackedLink } from '@/components/analytics/TrackedLink';

type Props = {
  icon: string;
  label: string;
  value: string;
  help: string;
  href: string;
  buttonLabel: string;
  page: string;
};

export function ContactCard({ icon, label, value, help, href, buttonLabel, page }: Props) {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  return (
    <div className="bg-white border border-border-light rounded-card p-6 flex flex-col gap-3 min-h-[200px]">
      <div className="flex items-start gap-3">
        <span className="text-2xl text-gold mt-1" aria-hidden="true">{icon}</span>
        <div className="flex-1">
          <h3 className="text-why-title text-navy-deep mb-1">{label}</h3>
          <p className="text-body text-navy-deep break-words">{value}</p>
          <p className="text-body text-gray-body mt-1">{help}</p>
        </div>
      </div>
      <div className="mt-auto">
        <TrackedLink
          href={href}
          page={page}
          className="inline-flex items-center justify-center gap-2 rounded-button h-button px-[26px] text-[15px] font-semibold bg-white text-navy-deep border border-gold hover:bg-gold/5 transition-colors"
        >
          {buttonLabel}
          <span aria-hidden="true">→</span>
        </TrackedLink>
      </div>
    </div>
  );
}
