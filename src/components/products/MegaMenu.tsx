'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Locale } from '@/types/locale';
import type { CategoryTreeNode } from '@/lib/categories';

type Props = {
  tree: CategoryTreeNode[];
  locale: Locale;
  onClose: () => void;
};

// Variant C: fixed-size 4-column panel. All columns always render so the panel
// dimensions never shift; empty columns remain plain white.
export function MegaMenu({ tree, locale, onClose }: Props) {
  const [activeRoot, setActiveRoot] = useState<string>('');
  const [activeLevel2, setActiveLevel2] = useState<string>('');
  const [activeLevel3, setActiveLevel3] = useState<string>('');
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const rootNode = useMemo(
    () => tree.find(t => t.slug === activeRoot),
    [tree, activeRoot],
  );
  const level2Nodes = useMemo(() => rootNode?.children ?? [], [rootNode]);
  const level2Node = useMemo(
    () => level2Nodes.find(n => n.slug === activeLevel2),
    [level2Nodes, activeLevel2],
  );
  const level3Nodes = useMemo(() => level2Node?.children ?? [], [level2Node]);
  const level3Node = useMemo(
    () => level3Nodes.find(n => n.slug === activeLevel3),
    [level3Nodes, activeLevel3],
  );
  const level4Nodes = useMemo(() => level3Node?.children ?? [], [level3Node]);

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-label="Products"
      className="absolute left-0 right-0 top-full bg-white text-navy-deep border-y border-border-light shadow-[0_8px_24px_rgba(1,9,18,0.08)]"
      onMouseLeave={onClose}
    >
      <div className="max-w-page-max mx-auto px-section-px py-6">
        <div className="grid grid-cols-12 gap-0 min-h-[280px]">
          <Column
            items={tree}
            active={activeRoot}
            onHover={slug => {
              setActiveRoot(slug);
              setActiveLevel2('');
              setActiveLevel3('');
            }}
            onSelect={onClose}
            locale={locale}
            colSpan="col-span-3"
          />
          <Column
            items={level2Nodes}
            active={activeLevel2}
            onHover={slug => {
              setActiveLevel2(slug);
              setActiveLevel3('');
            }}
            onSelect={onClose}
            locale={locale}
            colSpan="col-span-3"
            bordered
          />
          <Column
            items={level3Nodes}
            active={activeLevel3}
            onHover={slug => setActiveLevel3(slug)}
            onSelect={onClose}
            locale={locale}
            colSpan="col-span-3"
            bordered
          />
          <Column
            items={level4Nodes}
            active=""
            onHover={() => undefined}
            onSelect={onClose}
            locale={locale}
            colSpan="col-span-3"
            bordered
          />
        </div>
      </div>
    </div>
  );
}

type ColumnProps = {
  items: CategoryTreeNode[];
  active: string;
  onHover: (slug: string) => void;
  onSelect: () => void;
  locale: Locale;
  colSpan: string;
  bordered?: boolean;
};

function Column({ items, active, onHover, onSelect, locale, colSpan, bordered }: ColumnProps) {
  const handleKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const links = Array.from(
      e.currentTarget.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]'),
    );
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (idx === -1) return;
    e.preventDefault();
    const next =
      e.key === 'ArrowDown'
        ? (idx + 1) % links.length
        : (idx - 1 + links.length) % links.length;
    links[next]?.focus();
  };

  if (items.length === 0) {
    return (
      <div
        className={`${colSpan} ${bordered ? 'border-l border-border-light' : ''} px-6`}
      />
    );
  }

  return (
    <ul
      className={`${colSpan} ${bordered ? 'border-l border-border-light' : ''} px-6`}
      role="none"
      onKeyDown={handleKey}
    >
      {items.map(item => {
        const hasChildren = item.children.length > 0;
        const isActive = item.slug === active;
        return (
          <li key={item.slug} role="none">
            <Link
              role="menuitem"
              href={`/${locale}/products/${item.path.join('/')}`}
              aria-current={isActive ? 'true' : undefined}
              onMouseEnter={() => onHover(item.slug)}
              onFocus={() => onHover(item.slug)}
              onClick={() => onSelect()}
              className={[
                'flex items-center justify-between gap-3 py-3 px-4 text-[15px] font-semibold transition-colors border-l-[3px]',
                isActive
                  ? 'bg-[#F7F9FC] border-gold text-navy-deep'
                  : 'border-transparent text-navy-deep hover:bg-[#F7F9FC] hover:text-gold',
              ].join(' ')}
            >
              <span>{item.name}</span>
              {hasChildren && (
                <span aria-hidden="true" className="text-gray-body text-[12px]">
                  →
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
