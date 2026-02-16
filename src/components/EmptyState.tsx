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
