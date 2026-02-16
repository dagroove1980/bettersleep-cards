'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import { CATEGORY_ICONS } from '@/lib/icons';

export function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-colors ${
          pathname === '/'
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.value];
        const isActive = pathname === `/category/${cat.value}`;
        return (
          <Link
            key={cat.value}
            href={`/category/${cat.value}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
