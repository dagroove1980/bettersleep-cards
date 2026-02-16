import { Category } from '@/types/technique';
import { getCategoryColor } from '@/lib/colors';
import { CATEGORY_LABELS } from '@/lib/constants';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const color = getCategoryColor(category);
  const label = CATEGORY_LABELS[category];

  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] font-medium ${
        size === 'sm' ? 'text-[10px] px-2.5 py-0.5' : 'text-xs px-3 py-1'
      }`}
      style={{ backgroundColor: color.light, color: color.bg, borderColor: color.border }}
    >
      {label}
    </span>
  );
}
