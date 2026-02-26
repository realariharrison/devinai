'use client';

import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

// Static portfolio projects with GitHub links
const featuredProjects = [
  {
    id: '1',
    client_name: 'Markey',
    project_title: 'Multi-Vendor Luxury Marketplace',
    industry: 'E-commerce',
    testimonial: 'The Markey template gave us a production-ready luxury marketplace in weeks, not months. The dark design and Stripe Connect integration work flawlessly.',
    testimonial_author: 'Platform User',
    testimonial_role: 'Marketplace Founder',
    outcome_metric: '75%',
    outcome_label: 'Dev Time Reduction',
    github_url: 'https://github.com/realariharrison/markey',
  },
  {
    id: '2',
    client_name: 'AI Groceries',
    project_title: 'AI-Powered Grocery Delivery',
    industry: 'Food & Delivery',
    testimonial: 'The farm-to-table storytelling through the Provenance Drawer creates an emotional connection with customers. AI recommendations increased basket size by 23%.',
    testimonial_author: 'Template User',
    testimonial_role: 'Grocery Startup Founder',
    outcome_metric: '50%',
    outcome_label: 'Cost Reduction',
    github_url: 'https://github.com/realariharrison/ai-groceries',
  },
  {
    id: '3',
    client_name: 'VC Phi',
    project_title: 'Venture Capital Platform',
    industry: 'Finance',
    testimonial: 'VC Phi gave us the institutional credibility we needed to close our fund. The portfolio optimizer AI helped us identify synergies across our investments.',
    testimonial_author: 'Fund Manager',
    testimonial_role: 'Managing Partner',
    outcome_metric: '80%',
    outcome_label: 'Dev Time Reduction',
    github_url: 'https://github.com/realariharrison/vcphi',
  },
];

export function OutcomeStoriesSection() {
  return (
    <section className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-terracotta text-sm font-mono uppercase tracking-wider">
            Open Source Templates
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Production-Ready Solutions
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Full-stack Next.js templates with Supabase, Stripe, and AI integrations.
            Clone from GitHub and deploy in minutes.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white border border-sand rounded-2xl p-8 lg:p-10 h-full flex flex-col transition-all duration-300 hover:border-taupe hover:shadow-warm"
            >
              {/* Metric Badge */}
              <div className="absolute -top-4 left-8 bg-terracotta text-white px-4 py-1.5 rounded-full text-sm font-mono font-medium">
                {project.outcome_metric} {project.outcome_label}
              </div>

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
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:text-terracotta-500 transition-colors duration-200"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Industry Tag */}
              <div className="absolute top-8 right-8">
                <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">
                  {project.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 lg:mt-16 text-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center text-terracotta hover:text-terracotta-500 transition-colors duration-200 font-medium"
          >
            View All Templates
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
