import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { TipTapRenderer } from '@/components/blog/TipTapRenderer';
import { BlogCard } from '@/components/blog/BlogCard';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { supabase, isDemoMode } from '@/lib/supabase';
import { demoBlogPosts } from '@/lib/demo-data';
import { formatShortDate } from '@/lib/utils';
import type { BlogPost } from '@/lib/types';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  // Check demo mode
  if (isDemoMode()) {
    return demoBlogPosts.find((p) => p.slug === slug && p.published) || null;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(*),
        category:blog_categories(*)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      // Fall back to demo data
      return demoBlogPosts.find((p) => p.slug === slug && p.published) || null;
    }

    return data as BlogPost;
  } catch {
    return demoBlogPosts.find((p) => p.slug === slug && p.published) || null;
  }
}

async function getRelatedPosts(post: BlogPost): Promise<BlogPost[]> {
  if (isDemoMode()) {
    const related = demoBlogPosts
      .filter((p) => p.published && p.id !== post.id && p.category_id === post.category_id)
      .slice(0, 2);

    if (related.length < 2) {
      const others = demoBlogPosts
        .filter((p) => p.published && p.id !== post.id && !related.find((r) => r.id === p.id))
        .slice(0, 2 - related.length);
      related.push(...others);
    }
    return related;
  }

  try {
    // Get posts from same category
    const { data } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(*),
        category:blog_categories(*)
      `)
      .eq('published', true)
      .neq('id', post.id)
      .limit(2)
      .order('published_at', { ascending: false });

    if (data && data.length > 0) {
      return data as BlogPost[];
    }

    // Fall back to demo
    return demoBlogPosts
      .filter((p) => p.published && p.id !== post.id)
      .slice(0, 2);
  } catch {
    return demoBlogPosts
      .filter((p) => p.published && p.id !== post.id)
      .slice(0, 2);
  }
}

// Dynamic page - no static generation for DB content
export const dynamic = 'force-dynamic';

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | DevinAI',
    };
  }

  return {
    title: post.seo_title || `${post.title} | DevinAI`,
    description: post.seo_description || post.excerpt || '',
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: post.author?.full_name ? [post.author.full_name] : undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-terracotta transition-colors duration-300 font-sans text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Intelligence Briefings
          </Link>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block px-3 py-1 bg-terracotta text-white text-sm font-sans font-medium rounded mb-6 hover:bg-terracotta/90 transition-colors duration-300"
            >
              {post.category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 font-sans text-sm mb-8">
            {/* Date */}
            {post.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatShortDate(post.published_at)}</span>
              </div>
            )}

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-warm">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        )}
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <article className="max-w-3xl prose prose-lg prose-gray">
            <TipTapRenderer content={post.content} />
          </article>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <NewsletterCTA />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-sand">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl lg:text-3xl text-gray-900 mb-8">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
