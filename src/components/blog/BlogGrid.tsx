import { BlogCard } from './BlogCard';
import type { BlogPost } from '@/lib/types';
import { FileText } from 'lucide-react';

interface BlogGridProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export function BlogGrid({ posts, showFeatured = true }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-midnight-400 rounded-lg flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-cloud/40" />
        </div>
        <h3 className="font-serif text-xl text-cloud mb-2">No posts found</h3>
        <p className="text-cloud/60 font-sans max-w-md">
          There are no posts in this category yet. Check back soon for new intelligence briefings.
        </p>
      </div>
    );
  }

  // Separate featured posts from regular posts
  const featuredPosts = showFeatured ? posts.filter((post) => post.featured) : [];
  const regularPosts = showFeatured ? posts.filter((post) => !post.featured) : posts;

  // If showing featured and we have featured posts, put the first featured post at the start
  const displayPosts = showFeatured && featuredPosts.length > 0
    ? [featuredPosts[0], ...regularPosts, ...featuredPosts.slice(1)]
    : posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {displayPosts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          featured={showFeatured && index === 0 && post.featured}
        />
      ))}
    </div>
  );
}
