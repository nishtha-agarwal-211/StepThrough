import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case 'critical': return 'var(--st-accent-rose)';
    case 'high': return 'var(--st-accent-amber)';
    case 'medium': return 'var(--st-accent-cyan)';
    default: return 'var(--st-accent-emerald)';
  }
}

export function getDifficultyLabel(d: string) {
  switch (d) {
    case 'easy': return { text: 'Easy', color: '#34d399' };
    case 'moderate': return { text: 'Moderate', color: '#fbbf24' };
    case 'hard': return { text: 'Challenging', color: '#fb7185' };
    default: return { text: d, color: '#94a3b8' };
  }
}
