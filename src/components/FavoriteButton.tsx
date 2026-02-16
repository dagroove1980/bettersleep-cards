'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isFavorite, toggleFavorite } from '@/lib/favorites';

interface FavoriteButtonProps {
  techniqueId: string;
}

export function FavoriteButton({ techniqueId }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(techniqueId));
    const handler = () => setFavorited(isFavorite(techniqueId));
    window.addEventListener('favorites-changed', handler);
    return () => window.removeEventListener('favorites-changed', handler);
  }, [techniqueId]);

  return (
    <button
      onClick={() => {
        const nowFavorited = toggleFavorite(techniqueId);
        setFavorited(nowFavorited);
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-card)] transition-colors"
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
      {favorited ? 'Saved' : 'Save'}
    </button>
  );
}
