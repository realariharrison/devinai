import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ArrowRight, Calendar } from 'lucide-react';

// Static blog posts - links to Substack
const blogPosts = [
  {
    id: '1',
    title: 'Why Most AI Pilots Fail: The Missing Infrastructure Layer',
    excerpt: 'Reasoning is only 10% of the battle. The other 90% is the architectural "bridge" that enables reliable action in regulated domains.',
    date: '2026.02',
    category: 'AI Infrastructure',
    url: 'https://novoquantnexus.substack.com/p/why-most-ai-pilots-fail-the-missing',
    featured: true,
  },
  {
    id: '2',
    title: 'Scaling MCP: Lessons from 100M Records',
    excerpt: 'What changes when you shift from query-time computation to prediction infrastructure. A deep dive into sub-50ms latency for agents.',
    date: '2026.02',
    category: 'Technical',
    url: 'https://novoquantnexus.substack.com/p/scaling-mcp-lessons-from-100m-records',
    featured: false,
  },
  {
    id: '3',
    title: 'From Conversational to Computational AI',
    excerpt: 'How orchestration layers move models beyond chat interfaces and into high-stakes decision pipelines.',
    date: '2026.02',
    category: 'AI Infrastructure',
    url: 'https://novoquantnexus.substack.com/p/from-conversational-to-computational',
    featured: false,
  },
];

function BlogCard({ post, featured = false }: { post: typeof blogPosts[0]; featured?: boolean }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-white rounded-2xl border border-sand overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-1 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`p-6 lg:p-8 ${featured ? 'lg:p-10' : ''}`}>
        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-4">
          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-sans font-medium rounded">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-gray-500 text-sm font-sans">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`font-serif text-gray-900 mb-3 group-hover:text-terracotta transition-colors duration-300 ${
            featured ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
          }`}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className={`text-gray-600 font-sans leading-relaxed mb-6 ${featured ? 'text-base lg:text-lg' : 'text-sm lg:text-base'}`}>
          {post.excerpt}
        </p>

        {/* Read Link */}
        <span className="inline-flex items-center gap-2 text-terracotta font-sans font-medium text-sm group-hover:gap-3 transition-all duration-300">
          Read on Substack
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-sans text-terracotta uppercase tracking-wider mb-4">
              Intelligence Briefings
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-6">
              Strategic insights for software leaders
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 font-sans leading-relaxed">
              Deep dives into AI infrastructure, MCP orchestration, and building intelligence systems that scale.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Featured Post */}
            {featuredPost && <BlogCard post={featuredPost} featured />}

            {/* Other Posts */}
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* View All on Substack */}
          <div className="mt-12 text-center">
            <a
              href="https://substack.com/@ariharrison"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white font-sans font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
              View All on Substack
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
