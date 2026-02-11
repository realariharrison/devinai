'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase, isDemoMode } from '@/lib/supabase';
import { demoPortfolioProjects } from '@/lib/demo-data';
import { DataTable, Column } from '@/components/admin/DataTable';
import type { PortfolioProject } from '@/lib/types';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  GripVertical,
  Star,
  Loader2,
} from 'lucide-react';

export default function AdminPortfolioPage() {
  const { isDemo } = useAuth();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (isDemoMode()) {
      setProjects(demoPortfolioProjects);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to demo data
      setProjects(demoPortfolioProjects);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.project_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (projectId: string) => {
    if (isDemoMode()) {
      setProjects(projects.filter((p) => p.id !== projectId));
      setDeleteConfirmId(null);
      return;
    }

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  const columns: Column<PortfolioProject>[] = [
    {
      key: 'display_order',
      label: '#',
      width: 'w-12',
      render: (project) => (
        <div className="flex items-center gap-1 text-gray-400">
          <GripVertical className="w-4 h-4" />
          <span>{project.display_order}</span>
        </div>
      ),
    },
    {
      key: 'client_name',
      label: 'Client',
      sortable: true,
      render: (project) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{project.client_name}</span>
          {project.featured && (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          )}
        </div>
      ),
    },
    {
      key: 'project_title',
      label: 'Project',
      render: (project) => (
        <div className="max-w-sm">
          <p className="text-gray-600 truncate">{project.project_title}</p>
          <p className="text-xs text-gray-400">/{project.slug}</p>
        </div>
      ),
    },
    {
      key: 'industry',
      label: 'Industry',
      render: (project) => (
        <span className="inline-block px-2.5 py-1 bg-sand text-gray-700 text-xs rounded-full">
          {project.industry || '-'}
        </span>
      ),
    },
    {
      key: 'published',
      label: 'Status',
      render: (project) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
            project.published
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {project.published ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (project) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/portfolio/${project.slug}`}
            target="_blank"
            className="p-2 text-gray-400 hover:text-terracotta transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/portfolio/${project.id}/edit`}
            className="p-2 text-gray-400 hover:text-terracotta transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirmId(project.id);
            }}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage your case studies and project showcases
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">New Project</span>
        </Link>
      </div>

      {isDemo && (
        <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-4">
          <p className="text-gray-900 text-sm">
            <strong>Demo Mode:</strong> Changes will not persist. Connect Supabase
            for full functionality.
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
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border border-sand rounded-lg
              focus:outline-none focus:ring-2 focus:ring-terracotta text-sm text-gray-900"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-gray-600">
          <strong className="text-gray-900">{projects.length}</strong> total
          projects
        </span>
        <span className="text-gray-600">
          <strong className="text-green-600">
            {projects.filter((p) => p.published).length}
          </strong>{' '}
          published
        </span>
        <span className="text-gray-600">
          <strong className="text-yellow-600">
            {projects.filter((p) => p.featured).length}
          </strong>{' '}
          featured
        </span>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredProjects}
        keyExtractor={(project) => project.id}
        emptyMessage="No projects found"
      />

      {/* Tip */}
      <div className="bg-sand/50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <strong className="text-gray-900">Tip:</strong> Featured projects appear first on the portfolio page.
        </p>
      </div>

      {/* External link to portfolio */}
      <div className="pt-4 border-t border-sand">
        <Link
          href="/portfolio"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-terracotta/80 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View public portfolio
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Project?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              This action cannot be undone. The project and all associated case
              study content will be permanently removed.
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
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
