import Link from 'next/link';
import type { Locale } from '@/types/locale';

type Crumb = { label: string; href?: string };

export function Breadcrumb({ locale, crumbs }: { locale: Locale; crumbs: Crumb[] }) {
  // On narrow viewports collapse all but first/last 2 segments to a "…" item.
  const collapsedThreshold = 4;
  const showCollapsed = crumbs.length > collapsedThreshold;
  const collapsed: Crumb[] = showCollapsed
    ? [crumbs[0]!, { label: '…' }, ...crumbs.slice(-2)]
    : crumbs;

  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-border-light">
      <div className="max-w-page-max mx-auto px-section-px py-4">
        {/* Desktop / tablet: full breadcrumb */}
        <ol className="hidden sm:flex items-center gap-2 text-body text-gray-body flex-wrap">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={`/${locale}${c.href}`} className="hover:text-gold transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-navy-deep">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>

        {/* Mobile: collapse middle segments to … if path is long */}
        <ol className="flex sm:hidden items-center gap-2 text-body text-gray-body flex-wrap">
          {collapsed.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={`/${locale}${c.href}`} className="hover:text-gold transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className={c.label === '…' ? 'text-gray-body' : 'text-navy-deep'}>
                  {c.label}
                </span>
              )}
              {i < collapsed.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
