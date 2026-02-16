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
