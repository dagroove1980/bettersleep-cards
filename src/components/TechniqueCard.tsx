import Link from 'next/link';
import { SleepTechnique } from '@/types/technique';
import { getIcon } from '@/lib/icons';
import { getCategoryColor } from '@/lib/colors';
import { CategoryBadge } from './CategoryBadge';
import { Clock } from 'lucide-react';

interface TechniqueCardProps {
  technique: SleepTechnique;
}

export function TechniqueCard({ technique }: TechniqueCardProps) {
  const Icon = getIcon(technique.icon);
  const color = getCategoryColor(technique.category);

  return (
    <article className="rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-lift overflow-hidden group">
      <Link href={`/technique/${technique.id}`} className="block">
        <div
          className="px-6 py-8 flex items-start gap-4"
          style={{ backgroundColor: color.light }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: color.bg }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-snug group-hover:text-[var(--color-accent)] transition-colors">
              {technique.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-secondary)] line-clamp-2">
              {technique.tagline}
            </p>
          </div>
        </div>
      </Link>
      <div className="px-6 py-3 flex items-center justify-between">
        <CategoryBadge category={technique.category} />
        <span className="flex items-center gap-1 text-xs text-[var(--color-secondary)]">
          <Clock className="w-3.5 h-3.5" />
          {technique.timeNeeded}
        </span>
      </div>
    </article>
  );
}
