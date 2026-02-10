import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import type { BlogPost } from '@/lib/types';
import { formatDate, getInitials } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-midnight-600 rounded-lg overflow-hidden border border-transparent hover:border-boardroom transition-all duration-300 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Cover Image */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-[2/1]' : 'aspect-[16/9]'}`}>
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-boardroom/30 to-midnight-400" />
        )}

        {/* Category Badge */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-boardroom text-midnight text-xs font-sans font-medium rounded">
              {post.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className={`font-serif text-cloud group-hover:text-boardroom transition-colors duration-300 mb-3 ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className={`text-cloud/60 font-sans leading-relaxed mb-4 ${
            featured ? 'text-base' : 'text-sm'
          }`}>
            {featured ? post.excerpt : post.excerpt.slice(0, 120) + (post.excerpt.length > 120 ? '...' : '')}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-cloud/50 font-sans">
          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.avatar_url ? (
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.full_name || 'Author'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-boardroom/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-boardroom">
                    {getInitials(post.author.full_name)}
                  </span>
                </div>
              )}
              <span>{post.author.full_name || 'Anonymous'}</span>
            </div>
          )}

          {/* Date */}
          {post.published_at && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.published_at)}</span>
            </div>
          )}

          {/* Reading Time */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.reading_time} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
