'use client';

import { useState, useEffect, Suspense } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogCategoryFilter } from '@/components/blog/BlogCategoryFilter';
import { demoBlogPosts, demoBlogCategories } from '@/lib/demo-data';
import { supabase, isDemoMode } from '@/lib/supabase';
import type { BlogPost, BlogCategory } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Check if in demo mode
      if (isDemoMode()) {
        setIsDemo(true);
        setPosts(demoBlogPosts.filter((post) => post.published));
        setCategories(demoBlogCategories);
        setLoading(false);
        return;
      }

      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('*')
          .order('sort_order', { ascending: true });

        if (categoriesError) throw categoriesError;

        // Fetch published posts with author and category
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            author:profiles(*),
            category:blog_categories(*)
          `)
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (postsError) throw postsError;

        // Use fetched data, or fall back to demo if empty
        const fetchedCategories = categoriesData || [];
        const fetchedPosts = postsData || [];

        if (fetchedPosts.length > 0) {
          setCategories(fetchedCategories.length > 0 ? fetchedCategories : demoBlogCategories);
          setPosts(fetchedPosts);
        } else {
          // No posts in DB, use demo data
          setIsDemo(true);
          setCategories(demoBlogCategories);
          setPosts(demoBlogPosts.filter((post) => post.published));
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
        // Fallback to demo data on error
        setIsDemo(true);
        setPosts(demoBlogPosts.filter((post) => post.published));
        setCategories(demoBlogCategories);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
              Deep dives into Outcome Architecture, technical implementation patterns, and real-world case studies from enterprise transformations.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
            </div>
          ) : (
            <>
              {/* Category Filter */}
              <div className="mb-12 border-b border-sand pb-4">
                <Suspense fallback={<div className="h-10" />}>
                  <BlogCategoryFilter categories={categories} />
                </Suspense>
              </div>

              {/* Blog Grid */}
              {posts.length > 0 ? (
                <BlogGrid posts={posts} showFeatured />
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500">No posts published yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
