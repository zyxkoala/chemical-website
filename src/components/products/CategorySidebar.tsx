'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Locale } from '@/types/locale';
import type { CategoryTreeNode } from '@/lib/categories';

type Props = {
  tree: CategoryTreeNode[];
  locale: Locale;
  // The full path of the currently active category (or category-of-product on detail pages).
  activePath: string[];
  title?: string;
};

export function CategorySidebar({ tree, locale, activePath, title }: Props) {
  const activeSet = useMemo(() => new Set(activePath), [activePath]);
  const activeLeaf = activePath[activePath.length - 1] ?? null;

  return (
    <nav
      aria-label={title ?? 'Categories'}
      className="hidden lg:block w-[280px] flex-shrink-0"
    >
      <div className="sticky top-[150px]">
        {title && (
          <h2 className="text-[15px] font-semibold text-navy-deep mb-4 uppercase tracking-wide">
            {title}
          </h2>
        )}
        <ul className="space-y-1">
          {tree.map(node => (
            <TreeNode
              key={node.slug}
              node={node}
              locale={locale}
              activeSet={activeSet}
              activeLeaf={activeLeaf}
              depth={0}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

type NodeProps = {
  node: CategoryTreeNode;
  locale: Locale;
  activeSet: Set<string>;
  activeLeaf: string | null;
  depth: number;
};

function TreeNode({ node, locale, activeSet, activeLeaf, depth }: NodeProps) {
  const isOnActivePath = activeSet.has(node.slug);
  const isActiveLeaf = activeLeaf === node.slug;
  const hasChildren = node.children.length > 0;
  const [open, setOpen] = useState(isOnActivePath);

  const indent = { paddingLeft: `${12 + depth * 16}px` };

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={`/${locale}/products/${node.path.join('/')}`}
          aria-current={isActiveLeaf ? 'page' : undefined}
          className={[
            'block py-2 pr-3 text-[15px] transition-colors border-l-[3px]',
            isActiveLeaf
              ? 'bg-[#F7F9FC] border-gold text-navy-deep font-semibold'
              : 'border-transparent text-gray-body hover:text-gold hover:bg-[#F7F9FC]',
          ].join(' ')}
          style={indent}
        >
          {node.name}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className={[
          'flex items-center justify-between w-full py-2 pr-3 text-[15px] font-semibold transition-colors border-l-[3px]',
          isOnActivePath
            ? 'bg-[#F7F9FC] border-gold text-navy-deep'
            : 'border-transparent text-navy-deep hover:text-gold hover:bg-[#F7F9FC]',
        ].join(' ')}
        style={indent}
      >
        <span>{node.name}</span>
        <span aria-hidden="true" className="text-gray-body text-[12px]">
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && (
        <ul className="space-y-1">
          {node.children.map(child => (
            <TreeNode
              key={child.slug}
              node={child}
              locale={locale}
              activeSet={activeSet}
              activeLeaf={activeLeaf}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
