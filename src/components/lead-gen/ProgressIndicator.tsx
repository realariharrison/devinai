'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  label: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li
            key={step.id}
            className={cn(
              'relative flex-1',
              stepIdx !== steps.length - 1 && 'pr-8 sm:pr-20'
            )}
          >
            {step.id < currentStep ? (
              // Completed step
              <div className="group flex items-center">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                  <span className="h-10 w-10 rounded-full bg-boardroom flex items-center justify-center shadow-glow">
                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </span>
                <span className="ml-3 hidden sm:block text-sm font-medium text-boardroom">
                  {step.label}
                </span>
              </div>
            ) : step.id === currentStep ? (
              // Current step
              <div className="group flex items-center" aria-current="step">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                  <span className="absolute h-14 w-14 rounded-full bg-boardroom/20 animate-pulse-subtle" />
                  <span className="relative h-10 w-10 rounded-full bg-boardroom flex items-center justify-center shadow-glow-lg">
                    <span className="text-white font-semibold">{step.id}</span>
                  </span>
                </span>
                <span className="ml-3 hidden sm:block text-sm font-medium text-white">
                  {step.label}
                </span>
              </div>
            ) : (
              // Upcoming step
              <div className="group flex items-center">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                  <span className="h-10 w-10 rounded-full border-2 border-cloud/30 bg-midnight flex items-center justify-center">
                    <span className="text-cloud/50 font-medium">{step.id}</span>
                  </span>
                </span>
                <span className="ml-3 hidden sm:block text-sm font-medium text-cloud/50">
                  {step.label}
                </span>
              </div>
            )}

            {/* Connector line */}
            {stepIdx !== steps.length - 1 && (
              <div
                className={cn(
                  'absolute top-5 right-0 -ml-px h-0.5 w-full sm:w-[calc(100%-5rem)]',
                  step.id < currentStep ? 'bg-boardroom' : 'bg-cloud/20'
                )}
                style={{ left: '3.5rem' }}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
