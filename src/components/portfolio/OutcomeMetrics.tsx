'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import type { OutcomeMetric } from '@/lib/types';

interface OutcomeMetricsProps {
  metrics: OutcomeMetric[];
  className?: string;
  animated?: boolean;
}

export function OutcomeMetrics({
  metrics,
  className = '',
  animated = true,
}: OutcomeMetricsProps) {
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const formatValue = (value: number, unit: string): string => {
    if (unit === '%') return `${value}%`;
    if (unit === 'hours' || unit === 'hours/month') return `${value}h`;
    if (unit === 'seconds') return `${value}s`;
    if (unit === '$/month') return `$${value.toLocaleString()}`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const getChangeDirection = (before: number, after: number, metric: string): 'up' | 'down' => {
    // For some metrics, lower is better
    const lowerIsBetter = ['Downtime', 'Development Costs', 'Analysis Time', 'Infrastructure Cost', 'Page Load Time'];
    if (lowerIsBetter.some((m) => metric.includes(m))) {
      return after < before ? 'up' : 'down';
    }
    return after > before ? 'up' : 'down';
  };

  const calculateProgress = (before: number, after: number, metric: string): number => {
    const direction = getChangeDirection(before, after, metric);
    const change = Math.abs(after - before);
    const max = Math.max(before, after);
    const progress = (change / max) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {metrics.map((metric, index) => {
        const direction = getChangeDirection(metric.before, metric.after, metric.metric);
        const progress = calculateProgress(metric.before, metric.after, metric.metric);
        const isPositive = direction === 'up';

        return (
          <div
            key={metric.metric}
            className="bg-midnight-600 rounded-lg p-6 border border-cloud/10 hover:border-boardroom/30 transition-all duration-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease ${index * 100}ms`,
            }}
          >
            {/* Metric Name */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-sans font-medium text-cloud/80 text-sm uppercase tracking-wider">
                {metric.metric}
              </h4>
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-green-400" />
              )}
            </div>

            {/* Before/After Values */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <span className="block font-mono text-2xl text-cloud/50 line-through decoration-cloud/30">
                  {formatValue(metric.before, metric.unit)}
                </span>
                <span className="text-xs text-cloud/40 font-sans">Before</span>
              </div>
              <ArrowRight className="w-5 h-5 text-boardroom flex-shrink-0" />
              <div className="flex-1">
                <span className="block font-mono text-2xl text-vault font-semibold">
                  {formatValue(metric.after, metric.unit)}
                </span>
                <span className="text-xs text-cloud/40 font-sans">After</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-midnight rounded-full overflow-hidden mb-3">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-boardroom to-cloud rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: isVisible ? `${progress}%` : '0%',
                  transitionDelay: `${index * 100 + 300}ms`,
                }}
              />
            </div>

            {/* Description */}
            {metric.description && (
              <p className="text-sm text-cloud/60 font-sans">{metric.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
