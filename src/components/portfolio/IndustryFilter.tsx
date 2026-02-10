'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';

interface IndustryFilterProps {
  industries: string[];
  activeIndustry: string | null;
  onFilterChange: (industry: string | null) => void;
  className?: string;
}

export function IndustryFilter({
  industries,
  activeIndustry,
  onFilterChange,
  className = '',
}: IndustryFilterProps) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {/* Filter Icon */}
      <div className="flex items-center gap-2 pr-4 border-r border-cloud/10 mr-2">
        <Filter className="w-4 h-4 text-cloud/60" />
        <span className="text-sm font-sans text-cloud/60">Filter:</span>
      </div>

      {/* All Filter */}
      <button
        onClick={() => onFilterChange(null)}
        className={`
          px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-200
          ${
            activeIndustry === null
              ? 'bg-boardroom text-midnight'
              : 'bg-cloud/5 text-cloud/70 hover:bg-cloud/10 hover:text-cloud border border-cloud/10'
          }
        `}
      >
        All Projects
      </button>

      {/* Industry Filters */}
      {industries.map((industry) => (
        <button
          key={industry}
          onClick={() => onFilterChange(industry)}
          className={`
            px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-200
            ${
              activeIndustry === industry
                ? 'bg-boardroom text-midnight'
                : 'bg-cloud/5 text-cloud/70 hover:bg-cloud/10 hover:text-cloud border border-cloud/10'
            }
          `}
        >
          {industry}
        </button>
      ))}
    </div>
  );
}
