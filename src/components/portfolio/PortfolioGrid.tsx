'use client';

import type { PortfolioProject } from '@/lib/types';
import { PortfolioCard } from './PortfolioCard';

interface PortfolioGridProps {
  projects: PortfolioProject[];
  className?: string;
}

export function PortfolioGrid({ projects, className = '' }: PortfolioGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-cloud/60 font-sans text-lg">
          No projects found matching your criteria.
        </p>
      </div>
    );
  }

  // Separate featured and non-featured projects
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <div className={className}>
      {/* Featured Projects Grid */}
      {featuredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featuredProjects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              featured={index === 0}
              className={index === 0 ? 'md:col-span-2' : ''}
            />
          ))}
        </div>
      )}

      {/* Regular Projects Grid */}
      {regularProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
