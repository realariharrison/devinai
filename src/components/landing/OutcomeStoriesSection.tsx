'use client';

import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { demoPortfolioProjects } from '@/lib/demo-data';

export function OutcomeStoriesSection() {
  const featuredProjects = demoPortfolioProjects.slice(0, 3);

  return (
    <section className="relative bg-vault/5 py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-boardroom/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <span className="text-boardroom text-sm font-mono uppercase tracking-wider">
              Proven Results
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              The Outcomes We Deliver
            </h2>
            <p className="mt-6 text-lg text-cloud/60 leading-relaxed">
              Real results from real engagements. Every project measured
              against concrete business outcomes.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => {
            // Find the most impactful outcome metric
            const primaryOutcome = project.outcomes[0];
            const metricHighlight = primaryOutcome
              ? `${Math.abs(
                  Math.round(((primaryOutcome.after - primaryOutcome.before) / primaryOutcome.before) * 100)
                )}% ${primaryOutcome.after > primaryOutcome.before ? 'Increase' : 'Reduction'}`
              : null;

            return (
              <ScrollReveal key={project.id} delay={index * 150} duration={800}>
                <div className="group relative bg-midnight/50 backdrop-blur-sm border border-cloud/10 rounded-sm p-8 lg:p-10 h-full flex flex-col transition-all duration-500 hover:border-boardroom/30 hover:shadow-xl hover:shadow-boardroom/5">
                  {/* Metric Badge */}
                  {metricHighlight && (
                    <div className="absolute -top-4 left-8 bg-boardroom text-white px-4 py-1.5 rounded-sm text-sm font-mono font-medium">
                      {metricHighlight}
                    </div>
                  )}

                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-boardroom/30 mb-6" />

                  {/* Testimonial */}
                  <blockquote className="flex-grow">
                    <p className="text-cloud/80 text-base lg:text-lg leading-relaxed italic">
                      &ldquo;{project.testimonial}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="mt-8 pt-6 border-t border-cloud/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">
                          {project.testimonial_author}
                        </p>
                        <p className="text-cloud/50 text-sm">
                          {project.testimonial_role}
                        </p>
                      </div>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="text-boardroom hover:text-boardroom/80 transition-colors duration-200"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Industry Tag */}
                  <div className="absolute top-8 right-8">
                    <span className="text-cloud/30 text-xs font-mono uppercase tracking-wider">
                      {project.industry}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* View All Link */}
        <ScrollReveal delay={600}>
          <div className="mt-12 lg:mt-16 text-center">
            <Link
              href="/portfolio"
              className="group inline-flex items-center text-boardroom hover:text-boardroom/80 transition-colors duration-200 font-medium"
            >
              View All Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
