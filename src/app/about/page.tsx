import { Metadata } from 'next';
import { Moon, Heart, Brain, Wind } from 'lucide-react';
import { getTechniqueCount } from '@/lib/techniques';
import { CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'ChillSleep helps you discover proven techniques, calming habits, and simple methods for a restful night.',
};

export default function AboutPage() {
  const count = getTechniqueCount();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-6">About ChillSleep</h1>
      <div className="space-y-4 text-lg leading-relaxed text-[var(--color-secondary)]">
        <p>
          We believe everyone deserves a good night&apos;s sleep. ChillSleep is a curated collection of <strong className="text-[var(--color-foreground)]">{count} proven sleep techniques</strong> organized across {CATEGORIES.length} categories — from breathing exercises to environment optimization.
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
          { icon: Moon, label: 'Sleep Techniques', value: String(count) + '+' },
          { icon: Wind, label: 'Categories', value: String(CATEGORIES.length) },
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
