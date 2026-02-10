'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SystemCardProps {
  icon: LucideIcon;
  title: string;
  outcome: string;
  description: string;
  delay?: number;
}

export function SystemCard({
  icon: Icon,
  title,
  outcome,
  description,
  delay = 0,
}: SystemCardProps) {
  return (
    <div
      className="group relative bg-midnight/50 backdrop-blur-sm border border-cloud/10 rounded-sm p-8 lg:p-10 transition-all duration-500 hover:border-boardroom/30 hover:shadow-xl hover:shadow-boardroom/5"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-boardroom group-hover:w-full transition-all duration-500" />

      {/* Icon */}
      <div className="w-14 h-14 bg-vault/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-boardroom/10 transition-colors duration-300">
        <Icon className="w-7 h-7 text-boardroom" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-serif font-semibold text-white mb-2">
        {title}
      </h3>

      {/* Outcome */}
      <p className="text-boardroom text-sm font-medium font-mono uppercase tracking-wider mb-4">
        {outcome}
      </p>

      {/* Description */}
      <p className="text-cloud/60 text-base leading-relaxed">
        {description}
      </p>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-boardroom/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none" />
    </div>
  );
}
