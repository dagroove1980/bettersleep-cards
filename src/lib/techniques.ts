import { SleepTechnique, Category } from '@/types/technique';
import techniquesData from '../../data/techniques.json';

const techniques: SleepTechnique[] = techniquesData as SleepTechnique[];

export function getAllTechniques(): SleepTechnique[] {
  return techniques;
}

export function getTechniqueById(id: string): SleepTechnique | undefined {
  return techniques.find((t) => t.id === id);
}

export function getTechniquesByCategory(category: Category): SleepTechnique[] {
  return techniques.filter((t) => t.category === category);
}

export function getAllCategories(): Category[] {
  return [...new Set(techniques.map((t) => t.category))];
}

export function getSimilarTechniques(technique: SleepTechnique, count: number = 4): SleepTechnique[] {
  const others = techniques.filter((t) => t.id !== technique.id);
  const scored = others.map((t) => {
    let score = 0;
    if (t.category === technique.category) score += 5;
    for (const bf of t.bestFor) {
      if (technique.bestFor.includes(bf)) score += 2;
    }
    return { technique: t, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.technique);
}

export function getTechniqueCount(): number {
  return techniques.length;
}

export function getCategoryCount(category: Category): number {
  return techniques.filter((t) => t.category === category).length;
}
