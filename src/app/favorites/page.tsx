'use client';

import { useState, useEffect } from 'react';
import { getAllTechniques } from '@/lib/techniques';
import { getFavorites } from '@/lib/favorites';
import { TechniqueGrid } from '@/components/TechniqueGrid';
import { EmptyState } from '@/components/EmptyState';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
    const handler = () => setFavoriteIds(getFavorites());
    window.addEventListener('favorites-changed', handler);
    return () => window.removeEventListener('favorites-changed', handler);
  }, []);

  const allTechniques = getAllTechniques();
  const favorites = allTechniques.filter((t) => favoriteIds.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: 'Favorites' }]} />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-8">Your Saved Techniques</h1>
      {favorites.length > 0 ? (
        <TechniqueGrid techniques={favorites} />
      ) : (
        <EmptyState
          title="No saved techniques yet"
          description="Browse techniques and tap the heart to save your favorites here."
        />
      )}
    </div>
  );
}
