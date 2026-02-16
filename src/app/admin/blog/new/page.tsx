'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase, isDemoMode } from '@/lib/supabase';
import { demoBlogCategories } from '@/lib/demo-data';
import type { BlogCategory } from '@/lib/types';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { markdownToTipTap } from '@/lib/markdown-to-tiptap';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { user, isDemo } = useAuth();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    reading_time: 5,
    published: false,
    featured: false,
    cover_image: '',
    seo_title: '',
    seo_description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    if (isDemoMode()) {
      setCategories(demoBlogCategories);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(demoBlogCategories);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isDemoMode()) {
      // In demo mode, just redirect back
      setTimeout(() => {
        router.push('/admin/blog');
      }, 500);
      return;
    }

    try {
      // Convert markdown to TipTap JSON format
      const tipTapContent = markdownToTipTap(formData.content);

      const { error } = await supabase.from('blog_posts').insert({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: tipTapContent,
        category_id: formData.category_id || null,
        reading_time: formData.reading_time,
        published: formData.published,
        featured: formData.featured,
        cover_image: formData.cover_image || null,
        seo_title: formData.seo_title || formData.title,
        seo_description: formData.seo_description || formData.excerpt,
        author_id: user?.id,
        published_at: formData.published ? new Date().toISOString() : null,
      });

      if (error) throw error;
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/blog"
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1>
          <p className="text-gray-600 mt-1">Create a new article</p>
        </div>
      </div>

      {isDemo && (
        <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-4 mb-6">
          <p className="text-gray-900 text-sm">
            <strong>Demo Mode:</strong> Post will not be saved. Connect Supabase for full functionality.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            required
            className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
            placeholder="Enter post title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
            placeholder="post-url-slug"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900 resize-none"
            placeholder="Brief summary of the post"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content * <span className="font-normal text-gray-500">(Markdown supported)</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            required
            rows={16}
            className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900 resize-y font-mono text-sm"
            placeholder="# Heading

Write your content here using Markdown...

## Subheading

Regular paragraph with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Another item

> Blockquote text

\`inline code\` or code blocks:

\`\`\`javascript
const example = 'code block';
\`\`\`

[Link text](https://example.com)"
          />
          <p className="text-xs text-gray-500 mt-2">
            Supports: # Headings, **bold**, *italic*, `code`, [links](url), lists, blockquotes, code blocks
          </p>
        </div>

        {/* Category & Reading Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, category_id: e.target.value }))}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading Time (min)
            </label>
            <input
              type="number"
              value={formData.reading_time}
              onChange={(e) => setFormData((prev) => ({ ...prev, reading_time: parseInt(e.target.value) || 5 }))}
              min={1}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          <ImageUpload
            value={formData.cover_image}
            onChange={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))}
            bucket="images"
            folder="blog"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 text-terracotta border-sand rounded focus:ring-terracotta"
            />
            <span className="text-sm text-gray-700">Publish immediately</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-terracotta border-sand rounded focus:ring-terracotta"
            />
            <span className="text-sm text-gray-700">Featured post</span>
          </label>
        </div>

        {/* SEO Section */}
        <div className="pt-6 border-t border-sand">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData((prev) => ({ ...prev, seo_title: e.target.value }))}
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
                placeholder="Override title for search engines"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Description
              </label>
              <textarea
                value={formData.seo_description}
                onChange={(e) => setFormData((prev) => ({ ...prev, seo_description: e.target.value }))}
                rows={2}
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900 resize-none"
                placeholder="Meta description for search engines"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-sand">
          <Link
            href="/admin/blog"
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Create Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
