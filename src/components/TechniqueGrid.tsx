'use client';

import { useState } from 'react';
import { SleepTechnique } from '@/types/technique';
import { TechniqueCard } from './TechniqueCard';

interface TechniqueGridProps {
  techniques: SleepTechnique[];
  pageSize?: number;
}

export function TechniqueGrid({ techniques, pageSize = 24 }: TechniqueGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visible = techniques.slice(0, visibleCount);
  const hasMore = visibleCount < techniques.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((t) => (
          <TechniqueCard key={t.id} technique={t} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + pageSize)}
            className="px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Load More ({techniques.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
