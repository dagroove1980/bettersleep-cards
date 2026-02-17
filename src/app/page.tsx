import { getAllTechniques } from '@/lib/techniques';
import { TechniqueGrid } from '@/components/TechniqueGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { collectionStructuredData } from '@/lib/seo';
import { SITE_DESCRIPTION } from '@/lib/constants';

export default function Home() {
  const techniques = getAllTechniques();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData(
            'ChillSleep',
            SITE_DESCRIPTION,
            '/'
          )),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Sleep Better Tonight
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-[var(--color-secondary)] max-w-2xl mx-auto">
            Discover proven techniques, calming habits, and simple tricks to help you fall asleep faster and enjoy a peaceful, restful night.
          </p>
        </section>

        <div className="mb-10">
          <CategoryFilter />
        </div>

        <TechniqueGrid techniques={techniques} />
      </div>
    </>
  );
}
