import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogCategoryFilter } from '@/components/blog/BlogCategoryFilter';
import { demoBlogPosts, demoBlogCategories } from '@/lib/demo-data';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  return demoBlogCategories.map((category) => ({
    category: category.slug,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = demoBlogCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | DevinAI',
    };
  }

  return {
    title: `${category.name} | Intelligence Briefings | DevinAI`,
    description: category.description || `Browse ${category.name} articles and insights from DevinAI.`,
  };
}

function CategoryBlogContent({ categorySlug }: { categorySlug: string }) {
  const category = demoBlogCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // Filter posts by category
  const posts = demoBlogPosts.filter(
    (post) => post.published && post.category_id === category.id
  );

  return (
    <>
      {/* Category Filter */}
      <div className="mb-12 border-b border-cloud/10 pb-4">
        <BlogCategoryFilter categories={demoBlogCategories} currentCategory={categorySlug} />
      </div>

      {/* Blog Grid */}
      <BlogGrid posts={posts} showFeatured={false} />
    </>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = demoBlogCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

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
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg lg:text-xl text-cloud/60 font-sans leading-relaxed">
                {category.description}
              </p>
            )}
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
            <CategoryBlogContent categorySlug={categorySlug} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}
