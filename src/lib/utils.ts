import { TipTapContent, TipTapNode } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function calculateReadingTime(content: TipTapContent): number {
  const text = extractTextFromTipTap(content);
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function extractTextFromTipTap(content: TipTapContent): string {
  if (!content || !content.content) return '';

  const extractFromNode = (node: TipTapNode): string => {
    if (node.text) return node.text;
    if (node.content) {
      return node.content.map(extractFromNode).join(' ');
    }
    return '';
  };

  return content.content.map(extractFromNode).join(' ').trim();
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value}%`;
}

export function calculatePercentageChange(before: number, after: number): number {
  if (before === 0) return after > 0 ? 100 : 0;
  return Math.round(((after - before) / before) * 100);
}

export function getInitials(name: string | null): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatShortDate(dateString);
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Tech stack color mapping for badges
export function getTechStackColor(tech: string): string {
  const colors: Record<string, string> = {
    'React': 'bg-boardroom/20 text-boardroom border-boardroom/30',
    'Next.js': 'bg-cloud/20 text-cloud border-cloud/30',
    'TypeScript': 'bg-boardroom/20 text-boardroom border-boardroom/30',
    'Supabase': 'bg-vault/20 text-vault-900 border-vault/30',
    'Vercel': 'bg-cloud/20 text-cloud border-cloud/30',
    'PostgreSQL': 'bg-boardroom/20 text-boardroom border-boardroom/30',
    'Claude AI': 'bg-vault/20 text-vault-900 border-vault/30',
    'Tailwind': 'bg-boardroom/20 text-boardroom border-boardroom/30',
  };

  return colors[tech] || 'bg-midnight/50 text-cloud border-cloud/20';
}

// Industry color mapping
export function getIndustryColor(industry: string): string {
  const colors: Record<string, string> = {
    'SaaS': 'text-boardroom',
    'FinTech': 'text-vault-700',
    'E-commerce': 'text-cloud',
    'Healthcare': 'text-vault-600',
    'Enterprise': 'text-boardroom-400',
  };

  return colors[industry] || 'text-cloud';
}
