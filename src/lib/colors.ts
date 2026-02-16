import { Category } from '@/types/technique';

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; light: string; border: string }> = {
  breathing: { bg: '#6366F1', text: '#FFFFFF', light: '#EEF2FF', border: '#C7D2FE' },
  routine: { bg: '#A855F7', text: '#FFFFFF', light: '#FAF5FF', border: '#E9D5FF' },
  environment: { bg: '#14B8A6', text: '#FFFFFF', light: '#F0FDFA', border: '#99F6E4' },
  diet: { bg: '#10B981', text: '#FFFFFF', light: '#ECFDF5', border: '#A7F3D0' },
  movement: { bg: '#F59E0B', text: '#FFFFFF', light: '#FFFBEB', border: '#FDE68A' },
  mindfulness: { bg: '#F43F5E', text: '#FFFFFF', light: '#FFF1F2', border: '#FECDD3' },
};

export function getCategoryColor(category: Category) {
  return CATEGORY_COLORS[category];
}
