'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { demoBlogPosts } from '@/lib/demo-data';
import { formatDate } from '@/lib/utils';

export function IntelligenceBriefingsSection() {
  const latestPosts = demoBlogPosts.slice(0, 3);

  return (
    <section className="relative bg-midnight py-24 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(144, 224, 239, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(144, 224, 239, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-20">
            <div className="max-w-2xl">
              <span className="text-boardroom text-sm font-mono uppercase tracking-wider">
                Insights & Analysis
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Intelligence Briefings
              </h2>
              <p className="mt-6 text-lg text-cloud/60 leading-relaxed">
                Strategic insights on software architecture, scaling patterns,
                and outcome-focused development.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden lg:inline-flex items-center text-boardroom hover:text-boardroom/80 transition-colors duration-200 font-medium mt-6 lg:mt-0"
            >
              View All Insights
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {latestPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 150} duration={800}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="relative bg-midnight/50 backdrop-blur-sm border border-cloud/10 rounded-sm overflow-hidden h-full flex flex-col transition-all duration-500 hover:border-boardroom/30 hover:shadow-xl hover:shadow-boardroom/5">
                  {/* Cover Image Placeholder */}
                  <div className="relative h-48 bg-vault/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-boardroom/20 to-vault/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-cloud/20 font-serif text-4xl font-bold">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-midnight/80 backdrop-blur-sm text-boardroom text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-sm">
                        {post.category?.name || 'Insights'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6 lg:p-8 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-serif font-semibold text-white mb-3 group-hover:text-boardroom transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-cloud/60 text-sm leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-6 pt-4 border-t border-cloud/10 flex items-center justify-between text-sm">
                      <span className="text-cloud/40">
                        {post.published_at ? formatDate(post.published_at) : 'Draft'}
                      </span>
                      <div className="flex items-center text-cloud/40">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.reading_time} min read
                      </div>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-boardroom group-hover:w-full transition-all duration-500" />
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile View All Link */}
        <ScrollReveal delay={600}>
          <div className="mt-12 text-center lg:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center text-boardroom hover:text-boardroom/80 transition-colors duration-200 font-medium"
            >
              View All Insights
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
