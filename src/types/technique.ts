export type Category =
  | 'breathing'
  | 'routine'
  | 'environment'
  | 'diet'
  | 'movement'
  | 'mindfulness';

export interface SleepTechnique {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  icon: string;
  steps: string[];
  scienceBehind: string;
  tips: string[];
  timeNeeded: string;
  bestFor: string[];
}
