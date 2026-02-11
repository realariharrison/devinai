'use client';

import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { demoPortfolioProjects } from '@/lib/demo-data';

export function OutcomeStoriesSection() {
  const featuredProjects = demoPortfolioProjects.slice(0, 3);

  return (
    <section className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-terracotta text-sm font-mono uppercase tracking-wider">
            Proven Results
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
            The Outcomes We Deliver
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Real results from real engagements. Every project measured
            against concrete business outcomes.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project) => {
            // Find the most impactful outcome metric (skip if before is 0)
            const primaryOutcome = project.outcomes.find(o => o.before !== 0) || project.outcomes[0];
            let metricHighlight: string | null = null;

            if (primaryOutcome && primaryOutcome.before !== 0) {
              const percentChange = Math.abs(
                Math.round(((primaryOutcome.after - primaryOutcome.before) / primaryOutcome.before) * 100)
              );
              if (isFinite(percentChange)) {
                metricHighlight = `${percentChange}% ${primaryOutcome.after > primaryOutcome.before ? 'Increase' : 'Reduction'}`;
              }
            } else if (primaryOutcome) {
              // For metrics starting from 0, show the absolute value
              metricHighlight = `${primaryOutcome.after} ${primaryOutcome.unit}`;
            }

            return (
              <div
                key={project.id}
                className="group relative bg-white border border-sand rounded-2xl p-8 lg:p-10 h-full flex flex-col transition-all duration-300 hover:border-taupe hover:shadow-warm"
              >
                {/* Metric Badge */}
                {metricHighlight && (
                  <div className="absolute -top-4 left-8 bg-terracotta text-white px-4 py-1.5 rounded-full text-sm font-mono font-medium">
                    {metricHighlight}
                  </div>
                )}

                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-sand mb-6" />

                {/* Testimonial */}
                <blockquote className="flex-grow">
                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed italic">
                    &ldquo;{project.testimonial}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="mt-8 pt-6 border-t border-sand">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-semibold">
                        {project.testimonial_author}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {project.testimonial_role}
                      </p>
                    </div>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="text-terracotta hover:text-terracotta-500 transition-colors duration-200"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Industry Tag */}
                <div className="absolute top-8 right-8">
                  <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">
                    {project.industry}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-12 lg:mt-16 text-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center text-terracotta hover:text-terracotta-500 transition-colors duration-200 font-medium"
          >
            View All Case Studies
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
