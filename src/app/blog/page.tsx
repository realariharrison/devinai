import { Suspense } from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogCategoryFilter } from '@/components/blog/BlogCategoryFilter';
import { demoBlogPosts, demoBlogCategories } from '@/lib/demo-data';

export const metadata: Metadata = {
  title: 'Intelligence Briefings | DevinAI',
  description: 'Strategic insights on Outcome Architecture, technical deep dives, and real-world case studies from enterprise software projects.',
};

function BlogContent() {
  // In production, these would come from Supabase
  const posts = demoBlogPosts.filter((post) => post.published);
  const categories = demoBlogCategories;

  return (
    <>
      {/* Category Filter */}
      <div className="mb-12 border-b border-cloud/10 pb-4">
        <BlogCategoryFilter categories={categories} />
      </div>

      {/* Blog Grid */}
      <BlogGrid posts={posts} showFeatured />
    </>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-midnight">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-sans text-boardroom uppercase tracking-wider mb-4">
              Intelligence Briefings
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cloud mb-6">
              Strategic insights for software leaders
            </h1>
            <p className="text-lg lg:text-xl text-cloud/60 font-sans leading-relaxed">
              Deep dives into Outcome Architecture, technical implementation patterns, and real-world case studies from enterprise transformations.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-boardroom/30 border-t-boardroom rounded-full animate-spin" />
              </div>
            }
          >
            <BlogContent />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}
