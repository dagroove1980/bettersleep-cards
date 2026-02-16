import { Category } from '@/types/technique';

export const SITE_NAME = 'Better Sleep Cards';
export const SITE_DESCRIPTION = 'Discover 50+ proven sleep techniques, habits, and methods to help you fall asleep faster and enjoy a peaceful, restful night.';
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const ADSENSE_PUBLISHER_ID = 'ca-pub-3452665186406442';

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'breathing', label: 'Breathing' },
  { value: 'routine', label: 'Bedtime Routine' },
  { value: 'environment', label: 'Sleep Environment' },
  { value: 'diet', label: 'Diet & Nutrition' },
  { value: 'movement', label: 'Movement & Body' },
  { value: 'mindfulness', label: 'Mental & Mindfulness' },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  breathing: 'Breathing',
  routine: 'Bedtime Routine',
  environment: 'Sleep Environment',
  diet: 'Diet & Nutrition',
  movement: 'Movement & Body',
  mindfulness: 'Mental & Mindfulness',
};

export const CATEGORY_SEO: Record<Category, { title: string; description: string }> = {
  breathing: {
    title: 'Breathing Techniques for Sleep',
    description: 'Calming breathing exercises and patterns to slow your heart rate and prepare your body for deep, restful sleep.',
  },
  routine: {
    title: 'Bedtime Routine Ideas',
    description: 'Wind-down rituals and habits to signal your body it\'s time to sleep — from journaling to warm baths.',
  },
  environment: {
    title: 'Sleep Environment Tips',
    description: 'Optimize your bedroom for sleep with lighting, temperature, sound, and comfort adjustments.',
  },
  diet: {
    title: 'Diet & Nutrition for Better Sleep',
    description: 'Foods, drinks, and dietary habits that promote relaxation and help you fall asleep naturally.',
  },
  movement: {
    title: 'Movement & Body Techniques',
    description: 'Gentle stretches, yoga poses, and progressive relaxation methods to release tension before bed.',
  },
  mindfulness: {
    title: 'Mental & Mindfulness Practices',
    description: 'Meditation, visualization, and cognitive techniques to quiet a racing mind at bedtime.',
  },
};
