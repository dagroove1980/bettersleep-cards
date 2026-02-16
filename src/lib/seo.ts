import { SleepTechnique } from '@/types/technique';
import { SITE_NAME, SITE_URL, CATEGORY_LABELS } from './constants';

export function techniqueStructuredData(technique: SleepTechnique) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: technique.name,
    description: technique.description,
    totalTime: `PT${technique.timeNeeded.replace(/[^0-9]/g, '')}M`,
    step: technique.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
  };
}

export function breadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function collectionStructuredData(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function techniqueMetaTitle(technique: SleepTechnique): string {
  return `${technique.name} — ${CATEGORY_LABELS[technique.category]} Technique`;
}

export function techniqueMetaDescription(technique: SleepTechnique): string {
  return `${technique.tagline}. Learn the step-by-step method, the science behind it, and expert tips. ${technique.timeNeeded}.`;
}
