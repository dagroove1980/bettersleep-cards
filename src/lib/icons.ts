import {
  Wind, Moon, Lamp, Apple, Activity, Brain,
  Clock, Star, Sparkles, Heart, Sun, CloudMoon,
  Coffee, Leaf, Waves, Eye, Music, Thermometer,
  Bed, BookOpen, Pen, Droplets, Flame,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Wind, Moon, Lamp, Apple, Activity, Brain,
  Clock, Star, Sparkles, Heart, Sun, CloudMoon,
  Coffee, Leaf, Waves, Eye, Music, Thermometer,
  Bed, BookOpen, Pen, Droplets, Flame,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Sparkles;
}

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  breathing: Wind,
  routine: Moon,
  environment: Lamp,
  diet: Apple,
  movement: Activity,
  mindfulness: Brain,
};
