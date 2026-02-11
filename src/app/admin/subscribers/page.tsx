'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase, isDemoMode } from '@/lib/supabase';
import { demoNewsletterSubscribers } from '@/lib/demo-data';
import { DataTable, Column } from '@/components/admin/DataTable';
import type { NewsletterSubscriber } from '@/lib/types';
import {
  Search,
  Trash2,
  Loader2,
  Mail,
  Download,
} from 'lucide-react';

export default function AdminSubscribersPage() {
  const { isDemo } = useAuth();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    if (isDemoMode()) {
      setSubscribers(demoNewsletterSubscribers);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setSubscribers(demoNewsletterSubscribers);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (subscriberId: string) => {
    if (isDemoMode()) {
      setSubscribers(subscribers.filter((s) => s.id !== subscriberId));
      setDeleteConfirmId(null);
      return;
    }

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', subscriberId);

      if (error) throw error;
      setSubscribers(subscribers.filter((s) => s.id !== subscriberId));
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    } finally {
      setDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Email', 'Source', 'Subscribed At', 'Active'],
      ...subscribers.map((s) => [
        s.email,
        s.source || '',
        s.subscribed_at,
        s.active ? 'Yes' : 'No',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<NewsletterSubscriber>[] = [
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (sub) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">{sub.email}</span>
        </div>
      ),
    },
    {
      key: 'source',
      label: 'Source',
      render: (sub) => (
        <span className="inline-block px-2.5 py-1 bg-sand text-gray-700 text-xs rounded-full capitalize">
          {sub.source || 'Unknown'}
        </span>
      ),
    },
    {
      key: 'subscribed_at',
      label: 'Subscribed',
      sortable: true,
      render: (sub) => (
        <span className="text-sm text-gray-600">
          {new Date(sub.subscribed_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'active',
      label: 'Status',
      render: (sub) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
            sub.active
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {sub.active ? 'Active' : 'Unsubscribed'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (sub) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDeleteConfirmId(sub.id);
          }}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="text-gray-600 mt-1">
            Manage your email newsletter list
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="font-medium">Export CSV</span>
        </button>
      </div>

      {isDemo && (
        <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-4">
          <p className="text-gray-900 text-sm">
            <strong>Demo Mode:</strong> Displaying sample data. Connect Supabase
            for real subscriber management.
          </p>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by email..."
            className="w-full pl-10 pr-4 py-2 border border-sand rounded-lg
              focus:outline-none focus:ring-2 focus:ring-terracotta text-sm text-gray-900"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-gray-600">
          <strong className="text-gray-900">{subscribers.length}</strong> total subscribers
        </span>
        <span className="text-gray-600">
          <strong className="text-green-600">
            {subscribers.filter((s) => s.active).length}
          </strong>{' '}
          active
        </span>
        <span className="text-gray-600">
          <strong className="text-gray-500">
            {subscribers.filter((s) => !s.active).length}
          </strong>{' '}
          unsubscribed
        </span>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredSubscribers}
        keyExtractor={(sub) => sub.id}
        emptyMessage="No subscribers yet"
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Remove Subscriber?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              This will permanently remove this email from your subscriber list.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
