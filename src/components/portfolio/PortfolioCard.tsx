'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { PortfolioProject } from '@/lib/types';
import { TechStackBadges } from './TechStackBadges';

interface PortfolioCardProps {
  project: PortfolioProject;
  featured?: boolean;
  className?: string;
}

export function PortfolioCard({
  project,
  featured = false,
  className = '',
}: PortfolioCardProps) {
  // Get the primary outcome metric for display
  const primaryOutcome = project.outcomes[0];
  const outcomeChange =
    primaryOutcome &&
    Math.round(
      Math.abs(
        ((primaryOutcome.after - primaryOutcome.before) / primaryOutcome.before) * 100
      )
    );

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`
        group block rounded-xl overflow-hidden border border-cloud/10
        hover:border-boardroom/50 transition-all duration-300
        bg-midnight-600 hover:bg-midnight-500
        ${featured ? 'md:col-span-2 lg:row-span-2' : ''}
        ${className}
      `}
    >
      {/* Featured Image Placeholder */}
      <div
        className={`
          relative overflow-hidden
          ${featured ? 'aspect-[16/9] lg:aspect-[16/10]' : 'aspect-[16/9]'}
        `}
      >
        {/* Gradient Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-boardroom/20 to-cloud/10" />

        {/* Industry Badge */}
        {project.industry && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-boardroom text-midnight text-xs font-sans font-semibold rounded uppercase tracking-wide">
              {project.industry}
            </span>
          </div>
        )}

        {/* Duration Badge */}
        {project.duration && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-midnight/80 backdrop-blur-sm px-3 py-1 rounded">
            <Clock className="w-3.5 h-3.5 text-cloud/60" />
            <span className="text-xs font-sans text-cloud/80">{project.duration}</span>
          </div>
        )}

        {/* Hover Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-boardroom flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-midnight" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        {/* Client Name */}
        <span className="block text-xs font-sans font-semibold text-cloud/50 uppercase tracking-widest mb-2">
          {project.client_name}
        </span>

        {/* Project Title */}
        <h3
          className={`
            font-serif text-cloud group-hover:text-boardroom transition-colors duration-300 mb-4
            ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}
          `}
        >
          {project.project_title}
        </h3>

        {/* Key Outcome Metric */}
        {primaryOutcome && (
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-mono text-3xl font-bold text-vault">
              {outcomeChange}%
            </span>
            <span className="text-sm text-cloud/60 font-sans">
              {primaryOutcome.metric.toLowerCase()} improvement
            </span>
          </div>
        )}

        {/* Tech Stack Badges */}
        <TechStackBadges
          technologies={project.tech_stack.slice(0, featured ? 5 : 3)}
          size="sm"
        />
      </div>
    </Link>
  );
}
