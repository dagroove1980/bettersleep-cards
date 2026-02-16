# bettersleep.cards — Design Document

## Overview

A curated card-based website featuring 50 sleep techniques, habits, tricks, and methods to help people fall asleep and have a quiet night. Built on the proven SEO card catalog pattern.

## Stack

- Next.js 15+ (App Router, SSG)
- Tailwind CSS v4
- Lucide React icons
- @vercel/og for OG images
- TypeScript

## Data Model

```typescript
interface SleepTechnique {
  id: string;                    // URL slug: "4-7-8-breathing-method"
  name: string;                  // "The 4-7-8 Breathing Method"
  tagline: string;               // Short preview text
  description: string;           // Full paragraph description
  category: Category;            // One of 6 categories
  icon: string;                  // Lucide icon name
  steps: string[];               // Step-by-step instructions
  scienceBehind: string;         // Why it works
  tips: string[];                // Pro tips
  timeNeeded: string;            // "5 minutes", "15-30 minutes"
  bestFor: string[];             // "Falling asleep", "Night waking", "Anxiety"
}

type Category =
  | "breathing"
  | "routine"
  | "environment"
  | "diet"
  | "movement"
  | "mindfulness";
```

## Categories

| Category | Label | Icon | Color |
|----------|-------|------|-------|
| breathing | Breathing | Wind | Indigo |
| routine | Bedtime Routine | Moon | Purple |
| environment | Sleep Environment | Lamp | Teal |
| diet | Diet & Nutrition | Apple | Emerald |
| movement | Movement & Body | Activity | Amber |
| mindfulness | Mental & Mindfulness | Brain | Rose |

## Color Palette

- Background: `#F8F6F3` (warm cream)
- Foreground: `#1C1917` (stone-900)
- Secondary: `#78716C` (stone-500)
- Accent: `#6366F1` (indigo-500)
- Card: `#FFFFFF`
- Border: `#E7E5E4` (stone-200)

## Typography

- Heading: DM Serif Display
- Body: Inter

## Routes

```
/                              — Homepage (hero + category filter + grid)
/technique/[id]                — Detail page
/technique/[id]/opengraph-image.tsx — OG image
/category/[slug]               — Category page
/about                         — About page
/favorites                     — Client-side favorites
/sitemap.ts
/robots.ts
/not-found.tsx
```

## Content

- 50 techniques across 6 categories (~8 per category)
- Generated in 3 batches of ~17 via parallel Sonnet agents

## Schema.org

- HowTo on technique detail pages
- CollectionPage on homepage and category pages
- BreadcrumbList on all inner pages

## SEO

- Dynamic metadata per page
- Google Search Console verification
- AdSense integration (pub ID: ca-pub-3452665186406442)
- ads.txt
- Sitemap + robots.txt
