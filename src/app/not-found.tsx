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
