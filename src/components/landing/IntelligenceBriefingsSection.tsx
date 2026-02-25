import { ArrowRight, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

// Static blog posts - links to Substack
const blogPosts = [
  {
    id: '1',
    title: 'Why Most AI Pilots Fail: The Missing Infrastructure Layer',
    excerpt: 'Reasoning is only 10% of the battle. The other 90% is the architectural "bridge" that enables reliable action in regulated domains.',
    date: '2026.02',
    category: 'AI Infrastructure',
    url: 'https://novoquantnexus.substack.com/p/why-most-ai-pilots-fail-the-missing',
  },
  {
    id: '2',
    title: 'Scaling MCP: Lessons from 100M Records',
    excerpt: 'What changes when you shift from query-time computation to prediction infrastructure. A deep dive into sub-50ms latency for agents.',
    date: '2026.02',
    category: 'Technical',
    url: 'https://novoquantnexus.substack.com/p/scaling-mcp-lessons-from-100m-records',
  },
  {
    id: '3',
    title: 'From Conversational to Computational AI',
    excerpt: 'How orchestration layers move models beyond chat interfaces and into high-stakes decision pipelines.',
    date: '2026.02',
    category: 'AI Infrastructure',
    url: 'https://novoquantnexus.substack.com/p/from-conversational-to-computational',
  },
];

export function IntelligenceBriefingsSection() {
  return (
    <section className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(208, 184, 168, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(208, 184, 168, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-20">
            <div className="max-w-2xl">
              <span className="text-terracotta text-sm font-mono uppercase tracking-wider">
                Insights & Analysis
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Intelligence Briefings
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Deep dives into AI infrastructure, MCP orchestration, and building
                intelligence systems that scale.
              </p>
            </div>
            <a
              href="https://substack.com/@ariharrison"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center text-terracotta hover:text-terracotta-500 transition-colors duration-200 font-medium mt-6 lg:mt-0"
            >
              View All on Substack
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 150} duration={800}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <article className="relative bg-white border border-sand rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-taupe hover:shadow-warm">
                  {/* Cover Image Placeholder */}
                  <div className="relative h-48 bg-sand/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 to-taupe/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-taupe/40 font-serif text-4xl font-bold">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-terracotta text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6 lg:p-8 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-serif font-semibold text-gray-900 mb-3 group-hover:text-terracotta transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-6 pt-4 border-t border-sand flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="text-terracotta font-medium group-hover:underline">
                        Read on Substack →
                      </span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-terracotta group-hover:w-full transition-all duration-500" />
                </article>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile View All Link */}
        <ScrollReveal delay={600}>
          <div className="mt-12 text-center lg:hidden">
            <a
              href="https://substack.com/@ariharrison"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-terracotta hover:text-terracotta-500 transition-colors duration-200 font-medium"
            >
              View All on Substack
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
