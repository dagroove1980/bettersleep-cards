import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllTechniques, getTechniqueById, getSimilarTechniques } from '@/lib/techniques';
import { techniqueMetaTitle, techniqueMetaDescription, techniqueStructuredData, breadcrumbStructuredData } from '@/lib/seo';
import { CATEGORY_LABELS } from '@/lib/constants';
import { getIcon } from '@/lib/icons';
import { getCategoryColor } from '@/lib/colors';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryBadge } from '@/components/CategoryBadge';
import { FavoriteButton } from '@/components/FavoriteButton';
import { SimilarTechniques } from '@/components/SimilarTechniques';
import { Clock, Lightbulb, FlaskConical, CheckCircle } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllTechniques().map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const technique = getTechniqueById(id);
  if (!technique) return {};

  return {
    title: techniqueMetaTitle(technique),
    description: techniqueMetaDescription(technique),
    openGraph: {
      title: techniqueMetaTitle(technique),
      description: techniqueMetaDescription(technique),
      url: `/technique/${technique.id}`,
      type: 'article',
    },
    alternates: { canonical: `/technique/${technique.id}` },
  };
}

export default async function TechniquePage({ params }: Props) {
  const { id } = await params;
  const technique = getTechniqueById(id);
  if (!technique) notFound();

  const Icon = getIcon(technique.icon);
  const color = getCategoryColor(technique.category);
  const similar = getSimilarTechniques(technique, 3);
  const categoryLabel = CATEGORY_LABELS[technique.category];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techniqueStructuredData(technique)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: 'Home', url: '/' },
            { name: categoryLabel, url: `/category/${technique.category}` },
            { name: technique.name, url: `/technique/${technique.id}` },
          ])),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Breadcrumbs items={[
            { label: categoryLabel, href: `/category/${technique.category}` },
            { label: technique.name },
          ]} />
        </div>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ backgroundColor: color.light }}>
          <div className="px-8 py-12 sm:px-12 sm:py-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color.bg }}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <CategoryBadge category={technique.category} size="md" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{technique.name}</h1>
            <p className="text-lg text-[var(--color-secondary)] max-w-2xl">{technique.tagline}</p>
            <div className="flex items-center gap-4 mt-6">
              <span className="flex items-center gap-1.5 text-sm text-[var(--color-secondary)]">
                <Clock className="w-4 h-4" /> {technique.timeNeeded}
              </span>
              <FavoriteButton techniqueId={technique.id} />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-12">{technique.description}</p>

        {/* Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[var(--color-accent)]" />
            How To Do It
          </h2>
          <ol className="space-y-4">
            {technique.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: color.bg }}
                >
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Science */}
        <section className="mb-12 rounded-xl p-6 bg-[var(--color-card)] border border-[var(--color-border)]">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[var(--color-accent)]" />
            The Science Behind It
          </h2>
          <p className="leading-relaxed text-[var(--color-secondary)]">{technique.scienceBehind}</p>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[var(--color-accent)]" />
            Tips
          </h2>
          <ul className="space-y-3">
            {technique.tips.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                <p className="leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Best For */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-3">Best For</h2>
          <div className="flex flex-wrap gap-2">
            {technique.bestFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-[var(--radius-pill)] bg-[var(--color-card)] border border-[var(--color-border)] text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Similar */}
        <SimilarTechniques techniques={similar} />
      </div>
    </>
  );
}
