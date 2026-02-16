# bettersleep.cards Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a curated card-based SEO website with 50 sleep techniques across 6 categories, deployed on Vercel.

**Architecture:** Next.js 15 App Router with static generation (SSG). All data lives in a single JSON file. Category-only filtering via URL params. HowTo structured data for each technique. Follows the proven card catalog pattern from datenight-cards/smoothiebar-cards.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Lucide React, @vercel/og

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.gitignore`
- Create: `.env.local.example`

**Step 1: Create Next.js app**

```bash
cd /Users/david.scebat/Documents/seo-projects/bettersleep-cards
npx create-next-app@latest . --typescript --tailwind --app --use-npm --yes
```

**Step 2: Install additional dependencies**

```bash
npm install lucide-react @vercel/og
```

**Step 3: Create `.env.local.example`**

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-3452665186406442
```

**Step 4: Verify project runs**

```bash
npm run dev
```

Expected: Dev server starts at localhost:3000

**Step 5: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold Next.js 15 project"
```

---

## Task 2: Design System — globals.css + Fonts + Root Layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Replace `src/app/globals.css` with sleep-themed design tokens**

```css
@import "tailwindcss";

@theme inline {
  --color-background: #F8F6F3;
  --color-foreground: #1C1917;
  --color-secondary: #78716C;
  --color-accent: #6366F1;
  --color-card: #FFFFFF;
  --color-border: #E7E5E4;

  --color-breathing: #6366F1;
  --color-routine: #A855F7;
  --color-environment: #14B8A6;
  --color-diet: #10B981;
  --color-movement: #F59E0B;
  --color-mindfulness: #F43F5E;

  --font-heading: var(--font-dm-serif-display);
  --font-body: var(--font-inter);

  --radius-card: 16px;
  --radius-pill: 9999px;

  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04);
  --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.08);
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-body), system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), Georgia, serif;
  letter-spacing: -0.02em;
}

.transition-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.transition-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}
```

**Step 2: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif-display',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Better Sleep Cards — Techniques for a Quiet Night',
    template: '%s | Better Sleep Cards',
  },
  description: 'Discover 50+ proven sleep techniques, habits, and methods to help you fall asleep faster and enjoy a peaceful, restful night.',
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    siteName: 'Better Sleep Cards',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3452665186406442"
          crossOrigin="anonymous"
          suppressHydrationWarning
        />
      </head>
      <body className={`${dmSerifDisplay.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Delete default page content**

Replace `src/app/page.tsx` with a minimal placeholder:

```tsx
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold">Better Sleep Cards</h1>
      <p className="mt-4 text-lg text-[var(--color-secondary)]">Coming soon...</p>
    </div>
  );
}
```

**Step 4: Verify dev server renders correctly**

```bash
npm run dev
```

Expected: Page renders with DM Serif Display heading, warm cream background, correct fonts.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add sleep-themed design system and root layout"
```

---

## Task 3: Types, Constants, Colors, and Icons

**Files:**
- Create: `src/types/technique.ts`
- Create: `src/lib/constants.ts`
- Create: `src/lib/colors.ts`
- Create: `src/lib/icons.ts`

**Step 1: Create `src/types/technique.ts`**

```typescript
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
```

**Step 2: Create `src/lib/constants.ts`**

```typescript
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
```

**Step 3: Create `src/lib/colors.ts`**

```typescript
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
```

**Step 4: Create `src/lib/icons.ts`**

```typescript
import {
  Wind, Moon, Lamp, Apple, Activity, Brain,
  Clock, Star, Sparkles, Heart, Sun, CloudMoon,
  Coffee, Leaf, Waves, Eye, Music, Thermometer,
  Bed, Pillow, BookOpen, Pen, Droplets, Flame,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Wind, Moon, Lamp, Apple, Activity, Brain,
  Clock, Star, Sparkles, Heart, Sun, CloudMoon,
  Coffee, Leaf, Waves, Eye, Music, Thermometer,
  Bed, Pillow, BookOpen, Pen, Droplets, Flame,
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
```

**Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors (some may come from the placeholder page, that's fine)

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add types, constants, colors, and icon map"
```

---

## Task 4: Data Access Layer + SEO Helpers

**Files:**
- Create: `data/techniques.json` (placeholder with 2 items)
- Create: `src/lib/techniques.ts`
- Create: `src/lib/seo.ts`
- Create: `src/lib/favorites.ts`

**Step 1: Create `data/techniques.json` with 2 placeholder items**

```json
[
  {
    "id": "4-7-8-breathing-method",
    "name": "The 4-7-8 Breathing Method",
    "tagline": "A calming breath pattern that signals your nervous system to relax",
    "description": "The 4-7-8 breathing technique was developed by Dr. Andrew Weil based on pranayama yoga breathing. It involves breathing in for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds. This pattern acts as a natural tranquilizer for the nervous system.",
    "category": "breathing",
    "icon": "Wind",
    "steps": [
      "Sit or lie down in a comfortable position and close your eyes.",
      "Exhale completely through your mouth, making a whooshing sound.",
      "Close your mouth and inhale quietly through your nose for 4 seconds.",
      "Hold your breath for 7 seconds.",
      "Exhale completely through your mouth for 8 seconds with a whoosh.",
      "Repeat the cycle 3-4 times."
    ],
    "scienceBehind": "The extended exhale activates your parasympathetic nervous system, lowering heart rate and blood pressure. The breath-hold increases CO2 in the blood, which has a mild sedative effect.",
    "tips": [
      "Practice twice daily for best results — it gets more effective over time.",
      "If holding for 7 seconds is hard at first, maintain the 4:7:8 ratio at a shorter count.",
      "Place the tip of your tongue against the ridge behind your upper front teeth throughout."
    ],
    "timeNeeded": "2-3 minutes",
    "bestFor": ["Falling asleep", "Anxiety relief", "Calming racing thoughts"]
  },
  {
    "id": "warm-bath-90-minutes-before-bed",
    "name": "Warm Bath 90 Minutes Before Bed",
    "tagline": "Use your body's natural cooling response to trigger sleepiness",
    "description": "Taking a warm bath or shower about 90 minutes before bedtime raises your core body temperature. As your body cools down afterward, it mimics the natural temperature drop that occurs as you fall asleep, signaling to your brain that it's time for rest.",
    "category": "routine",
    "icon": "Droplets",
    "steps": [
      "Run a warm bath (104-109°F / 40-43°C) about 90 minutes before your target bedtime.",
      "Soak for 10-20 minutes — no need to stay longer.",
      "Optionally add Epsom salts or lavender essential oil for extra relaxation.",
      "After the bath, dry off and let your body naturally cool down.",
      "Put on lightweight, breathable sleepwear.",
      "Get into bed as you start feeling drowsy from the cooling effect."
    ],
    "scienceBehind": "Research published in Sleep Medicine Reviews found that a warm bath 1-2 hours before bed can improve sleep onset latency by an average of 10 minutes. The rapid core body temperature drop after the bath mimics melatonin's thermoregulatory effect.",
    "tips": [
      "A warm shower works too if you don't have a bathtub.",
      "Avoid very hot water — it should be comfortably warm, not scalding.",
      "Dim the bathroom lights to avoid bright light exposure."
    ],
    "timeNeeded": "15-30 minutes",
    "bestFor": ["Falling asleep faster", "Muscle relaxation", "Evening wind-down"]
  }
]
```

**Step 2: Create `src/lib/techniques.ts`**

```typescript
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
```

**Step 3: Create `src/lib/seo.ts`**

```typescript
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
```

**Step 4: Create `src/lib/favorites.ts`**

```typescript
const STORAGE_KEY = 'bettersleep-favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new CustomEvent('favorites-changed'));
  return index === -1;
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}
```

**Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add data layer, SEO helpers, and favorites"
```

---

## Task 5: Generate Seed Data — 50 Sleep Techniques

**Files:**
- Modify: `data/techniques.json` (replace placeholder with full 50-item dataset)

**Strategy:** Launch 3 parallel Sonnet agents, each generating ~17 techniques. Merge results.

**Step 1: Launch 3 parallel agents**

Agent 1 — Batch 1 (17 techniques): Categories breathing (8) + routine (9)
Agent 2 — Batch 2 (17 techniques): Categories environment (8) + diet (9)
Agent 3 — Batch 3 (16 techniques): Categories movement (8) + mindfulness (8)

Each agent prompt must include:
- The exact `SleepTechnique` interface
- The 2 example items from the placeholder as reference for tone and depth
- Category assignment
- Write output to `data/batch_N.json`
- All IDs must be unique URL-safe slugs
- All Lucide icon names must come from this list: Wind, Moon, Lamp, Apple, Activity, Brain, Clock, Star, Sparkles, Heart, Sun, CloudMoon, Coffee, Leaf, Waves, Eye, Music, Thermometer, Bed, Pillow, BookOpen, Pen, Droplets, Flame
- Each technique must have 4-6 steps, 2-4 tips, 2-3 bestFor items
- timeNeeded must be realistic (e.g. "5 minutes", "15-30 minutes")
- scienceBehind should cite real research or mechanisms when possible

**Step 2: Merge batches**

Concatenate all 3 batch files into `data/techniques.json`. Check for duplicate IDs.

**Step 3: Verify JSON is valid and count is 50**

```bash
node -e "const d = require('./data/techniques.json'); console.log('Count:', d.length); const ids = d.map(t => t.id); const dupes = ids.filter((id, i) => ids.indexOf(id) !== i); console.log('Duplicates:', dupes.length ? dupes : 'none');"
```

Expected: Count: 50, Duplicates: none

**Step 4: Commit**

```bash
git add data/techniques.json && git commit -m "feat: add 50 sleep techniques seed data"
```

Clean up batch files:
```bash
rm -f data/batch_*.json
```

---

## Task 6: Components — Header, Footer, CategoryBadge, TechniqueCard

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/CategoryBadge.tsx`
- Create: `src/components/TechniqueCard.tsx`

**Step 1: Create `src/components/Header.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { Moon, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Moon className="w-6 h-6 text-[var(--color-accent)]" />
          <span className="font-bold text-lg">Better Sleep Cards</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/category/breathing" className="text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors">Breathing</Link>
          <Link href="/category/routine" className="text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors">Routines</Link>
          <Link href="/category/environment" className="text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors">Environment</Link>
          <Link href="/category/mindfulness" className="text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors">Mindfulness</Link>
          <Link href="/favorites" className="text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors">
            <Heart className="w-5 h-5" />
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 space-y-3">
          <Link href="/category/breathing" className="block text-sm" onClick={() => setMenuOpen(false)}>Breathing</Link>
          <Link href="/category/routine" className="block text-sm" onClick={() => setMenuOpen(false)}>Routines</Link>
          <Link href="/category/environment" className="block text-sm" onClick={() => setMenuOpen(false)}>Environment</Link>
          <Link href="/category/diet" className="block text-sm" onClick={() => setMenuOpen(false)}>Diet & Nutrition</Link>
          <Link href="/category/movement" className="block text-sm" onClick={() => setMenuOpen(false)}>Movement & Body</Link>
          <Link href="/category/mindfulness" className="block text-sm" onClick={() => setMenuOpen(false)}>Mindfulness</Link>
          <Link href="/favorites" className="block text-sm" onClick={() => setMenuOpen(false)}>Favorites</Link>
          <Link href="/about" className="block text-sm" onClick={() => setMenuOpen(false)}>About</Link>
        </nav>
      )}
    </header>
  );
}
```

**Step 2: Create `src/components/Footer.tsx`**

```tsx
import Link from 'next/link';
import { Moon } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-5 h-5 text-[var(--color-accent)]" />
              <span className="font-bold">Better Sleep Cards</span>
            </div>
            <p className="text-sm text-[var(--color-secondary)]">
              Proven techniques to help you fall asleep and enjoy a quiet, restful night.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <Link href={`/category/${cat.value}`} className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)]">About</Link></li>
              <li><Link href="/favorites" className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-foreground)]">Favorites</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-secondary)]">
          &copy; {new Date().getFullYear()} Better Sleep Cards. Sleep well tonight.
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Create `src/components/CategoryBadge.tsx`**

```tsx
import { Category } from '@/types/technique';
import { getCategoryColor } from '@/lib/colors';
import { CATEGORY_LABELS } from '@/lib/constants';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const color = getCategoryColor(category);
  const label = CATEGORY_LABELS[category];

  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] font-medium ${
        size === 'sm' ? 'text-[10px] px-2.5 py-0.5' : 'text-xs px-3 py-1'
      }`}
      style={{ backgroundColor: color.light, color: color.bg, borderColor: color.border }}
    >
      {label}
    </span>
  );
}
```

**Step 4: Create `src/components/TechniqueCard.tsx`**

```tsx
import Link from 'next/link';
import { SleepTechnique } from '@/types/technique';
import { getIcon } from '@/lib/icons';
import { getCategoryColor } from '@/lib/colors';
import { CategoryBadge } from './CategoryBadge';
import { Clock } from 'lucide-react';

interface TechniqueCardProps {
  technique: SleepTechnique;
}

export function TechniqueCard({ technique }: TechniqueCardProps) {
  const Icon = getIcon(technique.icon);
  const color = getCategoryColor(technique.category);

  return (
    <article className="rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-lift overflow-hidden group">
      <Link href={`/technique/${technique.id}`} className="block">
        <div
          className="px-6 py-8 flex items-start gap-4"
          style={{ backgroundColor: color.light }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: color.bg }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-snug group-hover:text-[var(--color-accent)] transition-colors">
              {technique.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-secondary)] line-clamp-2">
              {technique.tagline}
            </p>
          </div>
        </div>
      </Link>
      <div className="px-6 py-3 flex items-center justify-between">
        <CategoryBadge category={technique.category} />
        <span className="flex items-center gap-1 text-xs text-[var(--color-secondary)]">
          <Clock className="w-3.5 h-3.5" />
          {technique.timeNeeded}
        </span>
      </div>
    </article>
  );
}
```

**Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds (components aren't used on pages yet, but should compile)

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add Header, Footer, CategoryBadge, and TechniqueCard components"
```

---

## Task 7: Components — TechniqueGrid, CategoryFilter, Breadcrumbs, SimilarTechniques, EmptyState, FavoriteButton

**Files:**
- Create: `src/components/TechniqueGrid.tsx`
- Create: `src/components/CategoryFilter.tsx`
- Create: `src/components/Breadcrumbs.tsx`
- Create: `src/components/SimilarTechniques.tsx`
- Create: `src/components/EmptyState.tsx`
- Create: `src/components/FavoriteButton.tsx`

**Step 1: Create `src/components/TechniqueGrid.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { SleepTechnique } from '@/types/technique';
import { TechniqueCard } from './TechniqueCard';

interface TechniqueGridProps {
  techniques: SleepTechnique[];
  pageSize?: number;
}

export function TechniqueGrid({ techniques, pageSize = 24 }: TechniqueGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visible = techniques.slice(0, visibleCount);
  const hasMore = visibleCount < techniques.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((t) => (
          <TechniqueCard key={t.id} technique={t} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + pageSize)}
            className="px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Load More ({techniques.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Create `src/components/CategoryFilter.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import { CATEGORY_ICONS } from '@/lib/icons';

export function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-colors ${
          pathname === '/'
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.value];
        const isActive = pathname === `/category/${cat.value}`;
        return (
          <Link
            key={cat.value}
            href={`/category/${cat.value}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-card)] text-[var(--color-secondary)] hover:text-[var(--color-foreground)] border border-[var(--color-border)]'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
```

**Step 3: Create `src/components/Breadcrumbs.tsx`**

```tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[var(--color-secondary)]">
      <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--color-foreground)] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[var(--color-foreground)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

**Step 4: Create `src/components/SimilarTechniques.tsx`**

```tsx
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
```

**Step 5: Create `src/components/EmptyState.tsx`**

```tsx
import { Moon } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <Moon className="w-12 h-12 mx-auto text-[var(--color-secondary)] mb-4" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-[var(--color-secondary)] mb-6">{description}</p>
      <Link
        href="/"
        className="inline-flex px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
      >
        Browse All Techniques
      </Link>
    </div>
  );
}
```

**Step 6: Create `src/components/FavoriteButton.tsx`**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isFavorite, toggleFavorite } from '@/lib/favorites';

interface FavoriteButtonProps {
  techniqueId: string;
}

export function FavoriteButton({ techniqueId }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(techniqueId));
    const handler = () => setFavorited(isFavorite(techniqueId));
    window.addEventListener('favorites-changed', handler);
    return () => window.removeEventListener('favorites-changed', handler);
  }, [techniqueId]);

  return (
    <button
      onClick={() => {
        const nowFavorited = toggleFavorite(techniqueId);
        setFavorited(nowFavorited);
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-card)] transition-colors"
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
      {favorited ? 'Saved' : 'Save'}
    </button>
  );
}
```

**Step 7: Verify build**

```bash
npm run build
```

Expected: Build succeeds

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: add Grid, CategoryFilter, Breadcrumbs, SimilarTechniques, EmptyState, FavoriteButton"
```

---

## Task 8: Pages — Homepage + Category Page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/category/[slug]/page.tsx`
- Modify: `src/app/layout.tsx` (wrap children with Header/Footer)

**Step 1: Update `src/app/layout.tsx` to include Header/Footer**

Add imports and wrap children:

```tsx
// Add to imports:
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Replace <body> contents:
<body className={`${dmSerifDisplay.variable} ${inter.variable} antialiased`}>
  <Header />
  <main className="min-h-screen">
    {children}
  </main>
  <Footer />
</body>
```

**Step 2: Replace `src/app/page.tsx` with full homepage**

```tsx
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
            'Better Sleep Cards',
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
```

**Step 3: Create `src/app/category/[slug]/page.tsx`**

```tsx
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
```

**Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds with static pages generated for `/` and `/category/[slug]`

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add homepage and category pages with filtering"
```

---

## Task 9: Pages — Technique Detail Page + OG Image

**Files:**
- Create: `src/app/technique/[id]/page.tsx`
- Create: `src/app/technique/[id]/opengraph-image.tsx`

**Step 1: Create `src/app/technique/[id]/page.tsx`**

```tsx
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
```

**Step 2: Create `src/app/technique/[id]/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og';
import { getAllTechniques, getTechniqueById } from '@/lib/techniques';
import { CATEGORY_LABELS } from '@/lib/constants';
import { CATEGORY_COLORS } from '@/lib/colors';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllTechniques().map((t) => ({ id: t.id }));
}

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const technique = getTechniqueById(id);

  if (!technique) {
    return new ImageResponse(
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: '#F8F6F3', fontSize: 48, fontWeight: 700 }}>
        Better Sleep Cards
      </div>,
      size
    );
  }

  const color = CATEGORY_COLORS[technique.category];
  const label = CATEGORY_LABELS[technique.category];

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', backgroundColor: '#F8F6F3', padding: 60 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ backgroundColor: color.bg, color: '#fff', padding: '8px 20px', borderRadius: 9999, fontSize: 20, fontWeight: 600 }}>
            {label}
          </div>
          <div style={{ fontSize: 20, color: '#78716C' }}>
            {technique.timeNeeded}
          </div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#1C1917', lineHeight: 1.2, maxWidth: 900 }}>
          {technique.name}
        </div>
        <div style={{ fontSize: 28, color: '#78716C', marginTop: 16, maxWidth: 800, lineHeight: 1.4 }}>
          {technique.tagline}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#6366F1' }} />
        <div style={{ fontSize: 24, fontWeight: 600, color: '#1C1917' }}>bettersleep.cards</div>
      </div>
    </div>,
    size
  );
}
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds with all technique detail pages and OG images generated.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add technique detail page with structured data and OG images"
```

---

## Task 10: Pages — About, Favorites, Not Found

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/favorites/page.tsx`
- Create: `src/app/not-found.tsx`

**Step 1: Create `src/app/about/page.tsx`**

```tsx
import { Metadata } from 'next';
import { Moon, Heart, Brain, Wind } from 'lucide-react';
import { getTechniqueCount } from '@/lib/techniques';
import { CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Better Sleep Cards helps you discover proven techniques, calming habits, and simple methods for a restful night.',
};

export default function AboutPage() {
  const count = getTechniqueCount();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-6">About Better Sleep Cards</h1>
      <div className="space-y-4 text-lg leading-relaxed text-[var(--color-secondary)]">
        <p>
          We believe everyone deserves a good night&apos;s sleep. Better Sleep Cards is a curated collection of <strong className="text-[var(--color-foreground)]">{count} proven sleep techniques</strong> organized across {CATEGORIES.length} categories — from breathing exercises to environment optimization.
        </p>
        <p>
          Each technique includes step-by-step instructions, the science behind why it works, and practical tips to get the most out of it. Whether you struggle with falling asleep, staying asleep, or just want to improve your sleep quality, there&apos;s a technique here for you.
        </p>
        <p>
          Save your favorites, explore by category, and build your own personalized bedtime toolkit.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Moon, label: 'Sleep Techniques', value: `${count}+` },
          { icon: Wind, label: 'Categories', value: `${CATEGORIES.length}` },
          { icon: Brain, label: 'Science-Backed', value: '100%' },
          { icon: Heart, label: 'Free Forever', value: 'Always' },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-4 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)]">
            <stat.icon className="w-6 h-6 mx-auto mb-2 text-[var(--color-accent)]" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-[var(--color-secondary)]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Create `src/app/favorites/page.tsx`**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { getAllTechniques } from '@/lib/techniques';
import { getFavorites } from '@/lib/favorites';
import { TechniqueGrid } from '@/components/TechniqueGrid';
import { EmptyState } from '@/components/EmptyState';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
    const handler = () => setFavoriteIds(getFavorites());
    window.addEventListener('favorites-changed', handler);
    return () => window.removeEventListener('favorites-changed', handler);
  }, []);

  const allTechniques = getAllTechniques();
  const favorites = allTechniques.filter((t) => favoriteIds.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: 'Favorites' }]} />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-8">Your Saved Techniques</h1>
      {favorites.length > 0 ? (
        <TechniqueGrid techniques={favorites} />
      ) : (
        <EmptyState
          title="No saved techniques yet"
          description="Browse techniques and tap the heart to save your favorites here."
        />
      )}
    </div>
  );
}
```

**Step 3: Create `src/app/not-found.tsx`**

```tsx
import Link from 'next/link';
import { Moon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center">
      <Moon className="w-16 h-16 mx-auto text-[var(--color-accent)] mb-6" />
      <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
      <p className="text-lg text-[var(--color-secondary)] mb-8">
        Looks like this page drifted off to sleep. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="inline-flex px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        Back to All Techniques
      </Link>
    </div>
  );
}
```

**Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add about, favorites, and 404 pages"
```

---

## Task 11: SEO Files + Google Setup

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/icon.tsx`
- Create: `public/ads.txt`
- Create: `public/google27900233ff0bc69b.html`

**Step 1: Create `src/app/sitemap.ts`**

```typescript
import { MetadataRoute } from 'next';
import { getAllTechniques, getAllCategories } from '@/lib/techniques';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const techniques = getAllTechniques();
  const categories = getAllCategories();

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...categories.map((cat) => ({
      url: `${SITE_URL}/category/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...techniques.map((t) => ({
      url: `${SITE_URL}/technique/${t.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
```

**Step 2: Create `src/app/robots.ts`**

```typescript
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

**Step 3: Create `src/app/icon.tsx`**

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, backgroundColor: '#6366F1', borderRadius: 8 }}>
      <div style={{ color: '#fff', fontSize: 18 }}>&#9790;</div>
    </div>,
    size
  );
}
```

**Step 4: Create `public/ads.txt`**

```
google.com, pub-3452665186406442, DIRECT, f08c47fec0942fa0
```

**Step 5: Create `public/google27900233ff0bc69b.html`**

```
google-site-verification: google27900233ff0bc69b.html
```

**Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds with sitemap and all pages generated.

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: add sitemap, robots, favicon, ads.txt, and search console verification"
```

---

## Task 12: Final Build Verification + Deploy Setup

**Files:**
- No new files. Verification only.

**Step 1: Full build**

```bash
npm run build
```

Expected: All pages generated successfully. No TypeScript errors. No warnings.

**Step 2: Local test**

```bash
npm run start
```

Visit and verify:
- `/` — Homepage with all techniques in grid, category filter works
- `/technique/4-7-8-breathing-method` — Detail page renders with steps, science, tips
- `/category/breathing` — Category page filters correctly
- `/about` — About page renders
- `/favorites` — Empty state shows, saving works
- `/sitemap.xml` — Valid sitemap
- `/robots.txt` — Valid robots

**Step 3: Create GitHub repo and push**

```bash
cd /Users/david.scebat/Documents/seo-projects/bettersleep-cards
git add -A && git commit -m "chore: ready for deployment"
gh repo create dagroove1980/bettersleep-cards --public --source=. --push
```

**Step 4: Connect to Vercel**

Import from Vercel dashboard or CLI:
```bash
npx vercel --yes
```

**Step 5: Verify deployment**

Check the Vercel preview URL renders correctly.

---

## Summary

| Task | Description | Estimated Steps |
|------|-------------|----------------|
| 1 | Scaffold Next.js project | 5 |
| 2 | Design system + root layout | 5 |
| 3 | Types, constants, colors, icons | 6 |
| 4 | Data layer + SEO + favorites | 6 |
| 5 | Generate 50 techniques (parallel agents) | 4 |
| 6 | Core components (Card, Header, Footer, Badge) | 6 |
| 7 | More components (Grid, Filter, Breadcrumbs, etc.) | 8 |
| 8 | Homepage + Category pages | 5 |
| 9 | Detail page + OG images | 4 |
| 10 | About + Favorites + 404 | 5 |
| 11 | SEO files + Google setup | 7 |
| 12 | Build verification + deploy | 5 |

**Total: 12 tasks, ~66 steps**
