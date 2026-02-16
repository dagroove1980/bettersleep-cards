import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTechniquesByCategory, getAllCategories } from '@/lib/techniques';
import { CATEGORY_LABELS, CATEGORY_SEO, CATEGORIES } from '@/lib/constants';
import { collectionStructuredData, breadcrumbStructuredData } from '@/lib/seo';
import { TechniqueGrid } from '@/components/TechniqueGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Category } from '@/types/technique';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seo = CATEGORY_SEO[slug as Category];
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/category/${slug}`,
    },
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = slug as Category;
  if (!CATEGORIES.find((c) => c.value === category)) notFound();

  const techniques = getTechniquesByCategory(category);
  const label = CATEGORY_LABELS[category];
  const seo = CATEGORY_SEO[category];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData(label, seo.description, `/category/${slug}`)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: 'Home', url: '/' },
            { name: label, url: `/category/${slug}` },
          ])),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Breadcrumbs items={[{ label }]} />
        </div>

        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{seo.title}</h1>
          <p className="mt-4 text-lg text-[var(--color-secondary)] max-w-2xl mx-auto">{seo.description}</p>
        </section>

        <div className="mb-10">
          <CategoryFilter />
        </div>

        <TechniqueGrid techniques={techniques} />
      </div>
    </>
  );
}
