'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { demoBlogPosts } from '@/lib/demo-data';
import { DataTable, Column } from '@/components/admin/DataTable';
import type { BlogPost } from '@/lib/types';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
} from 'lucide-react';

export default function AdminBlogPage() {
  const { isDemo } = useAuth();
  const [posts, setPosts] = useState(demoBlogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'published' && post.published) ||
      (filterStatus === 'draft' && !post.published);
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
    setDeleteConfirmId(null);
  };

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (post) => (
        <div className="max-w-md">
          <p className="font-medium text-[#03045E] truncate">{post.title}</p>
          <p className="text-xs text-[#03045E]/50 mt-0.5">/{post.slug}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (post) => (
        <span className="text-sm text-[#03045E]/70">
          {post.category?.name || '-'}
        </span>
      ),
    },
    {
      key: 'published',
      label: 'Status',
      render: (post) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
            post.published
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {post.published ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'reading_time',
      label: 'Read Time',
      render: (post) => (
        <span className="text-sm text-[#03045E]/70">{post.reading_time} min</span>
      ),
    },
    {
      key: 'published_at',
      label: 'Date',
      sortable: true,
      render: (post) => (
        <span className="text-sm text-[#03045E]/70">
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (post) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="p-2 text-[#03045E]/50 hover:text-[#00B4D8] transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/blog/${post.id}/edit`}
            className="p-2 text-[#03045E]/50 hover:text-[#00B4D8] transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirmId(post.id);
            }}
            className="p-2 text-[#03045E]/50 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#03045E]">Blog Posts</h1>
          <p className="text-[#03045E]/60 mt-1">
            Manage your blog content and articles
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#03045E] text-white rounded-lg hover:bg-[#03045E]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">New Post</span>
        </Link>
      </div>

      {isDemo && (
        <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/30 rounded-lg p-4">
          <p className="text-[#03045E] text-sm">
            <strong>Demo Mode:</strong> Changes will not persist. Connect Supabase
            for full functionality.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#03045E]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 border border-[#90E0EF] rounded-lg
              focus:outline-none focus:ring-2 focus:ring-[#00B4D8] text-sm text-[#03045E]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#03045E]/40" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
            className="px-3 py-2 border border-[#90E0EF] rounded-lg text-sm text-[#03045E]
              focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-[#03045E]/60">
          <strong className="text-[#03045E]">{posts.length}</strong> total posts
        </span>
        <span className="text-[#03045E]/60">
          <strong className="text-green-600">
            {posts.filter((p) => p.published).length}
          </strong>{' '}
          published
        </span>
        <span className="text-[#03045E]/60">
          <strong className="text-yellow-600">
            {posts.filter((p) => !p.published).length}
          </strong>{' '}
          drafts
        </span>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredPosts}
        keyExtractor={(post) => post.id}
        emptyMessage="No posts found"
      />

      {/* External link to blog */}
      <div className="pt-4 border-t border-[#CAF0F8]">
        <Link
          href="/blog"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-[#00B4D8] hover:text-[#03045E] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View public blog
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[#03045E]/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-[#03045E] mb-2">
              Delete Post?
            </h3>
            <p className="text-[#03045E]/60 text-sm mb-6">
              This action cannot be undone. The post will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm text-[#03045E]/70 hover:text-[#03045E]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
