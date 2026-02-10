// DevinAI Type Definitions

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'editor' | null;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: TipTapContent;
  cover_image: string | null;
  author_id: string | null;
  category_id: string | null;
  reading_time: number;
  published: boolean;
  featured: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  category?: BlogCategory;
}

export interface TipTapContent {
  type: string;
  content?: TipTapNode[];
}

export interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  attrs?: Record<string, unknown>;
}

export interface OutcomeMetric {
  metric: string;
  before: number;
  after: number;
  unit: string;
  description?: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  client_name: string;
  project_title: string;
  industry: string | null;
  duration: string | null;
  challenge: ProjectChallenge;
  solution: ProjectSolution;
  outcomes: OutcomeMetric[];
  testimonial: string | null;
  testimonial_author: string | null;
  testimonial_role: string | null;
  tech_stack: string[];
  featured_image: string | null;
  gallery: string[];
  case_study_content: TipTapContent;
  published: boolean;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
  pain_points: string[];
}

export interface ProjectSolution {
  title: string;
  description: string;
  pillars: {
    name: string;
    description: string;
  }[];
}

export interface SystemAuditLead {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  role: string | null;
  current_challenge: string | null;
  team_size: string | null;
  tech_stack: string[];
  desired_outcomes: string[];
  budget_range: string | null;
  timeline: string | null;
  audit_scheduled: boolean;
  audit_completed: boolean;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'closed';
  notes: LeadNote[];
  source: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  content: string;
  author: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  source: string | null;
  active: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
}

// Form types
export interface SystemAuditFormData {
  email: string;
  name: string;
  company: string;
  role: string;
  current_challenge: string;
  team_size: string;
  tech_stack: string[];
  desired_outcomes: string[];
  budget_range: string;
  timeline: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  source?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalLeads: number;
  newLeadsThisWeek: number;
  publishedPosts: number;
  totalSubscribers: number;
  publishedProjects: number;
  conversionRate: number;
}

// AI context types
export type AIContext =
  | 'content_assistance'
  | 'seo_optimization'
  | 'lead_analysis'
  | 'portfolio_summary';
