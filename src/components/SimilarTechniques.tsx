import { SleepTechnique } from '@/types/technique';
import { TechniqueCard } from './TechniqueCard';

interface SimilarTechniquesProps {
  techniques: SleepTechnique[];
}

export function SimilarTechniques({ techniques }: SimilarTechniquesProps) {
  if (techniques.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Techniques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {techniques.map((t) => (
          <TechniqueCard key={t.id} technique={t} />
        ))}
      </div>
    </section>
  );
}
