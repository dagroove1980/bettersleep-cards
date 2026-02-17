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
              <span className="font-bold">ChillSleep</span>
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
          &copy; {new Date().getFullYear()} ChillSleep. Sleep well tonight.
        </div>
      </div>
    </footer>
  );
}
