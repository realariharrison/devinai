import type {
  Profile,
  BlogCategory,
  BlogPost,
  PortfolioProject,
  SystemAuditLead,
  NewsletterSubscriber,
  ContactSubmission,
  DashboardStats,
} from './types';

// Demo User
export const demoUser = {
  id: 'demo-user-id',
  email: 'admin@devinai.com',
  created_at: new Date().toISOString(),
};

// Demo Profile
export const demoProfile: Profile = {
  id: 'demo-user-id',
  email: 'admin@devinai.com',
  full_name: 'Ari Harrison',
  avatar_url: null,
  role: 'admin',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: new Date().toISOString(),
};

// Demo Blog Categories
export const demoBlogCategories: BlogCategory[] = [
  {
    id: 'cat-1',
    name: 'Outcome Architecture',
    slug: 'outcome-architecture',
    description: 'Strategic frameworks for predictable software growth',
    sort_order: 1,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Technical Deep Dives',
    slug: 'technical',
    description: 'In-depth technical implementation guides',
    sort_order: 2,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-3',
    name: 'Case Studies',
    slug: 'case-studies',
    description: 'Real-world client success stories with metrics',
    sort_order: 3,
    created_at: '2024-01-01T00:00:00Z',
  },
];

// Demo Blog Posts
export const demoBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'the-outcome-architecture-framework',
    title: 'The Outcome Architecture Framework: Building Software That Scales Predictably',
    excerpt: 'Most development projects fail not because of bad code, but because of misaligned outcomes. Learn how Outcome Architecture changes the game.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Why Traditional Development Falls Short' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Traditional software development operates on a fundamental assumption: if you build what was specified, success will follow. This assumption has caused more failed projects than any bug or technical debt combined.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Outcome Architecture inverts this model. Instead of starting with features, we start with measurable business outcomes. Every line of code, every architectural decision, every sprint is measured against its contribution to these outcomes.',
            },
          ],
        },
      ],
    },
    cover_image: '/images/blog/outcome-architecture.jpg',
    author_id: 'demo-user-id',
    category_id: 'cat-1',
    reading_time: 8,
    published: true,
    featured: true,
    published_at: '2024-12-15T10:00:00Z',
    seo_title: 'Outcome Architecture Framework | DevinAI',
    seo_description: 'Learn how Outcome Architecture transforms software development from feature delivery to predictable business growth.',
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z',
    author: demoProfile,
    category: demoBlogCategories[0],
  },
  {
    id: 'post-2',
    slug: 'supabase-vercel-architecture-patterns',
    title: 'Supabase + Vercel: Architecture Patterns That Scale to 100K Users',
    excerpt: 'A technical deep-dive into building production-ready applications with Supabase and Vercel, including Row Level Security patterns and edge deployment strategies.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'The Sovereign Stack Foundation' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'When we architect applications for scale, we choose technologies not for their popularity, but for their predictability. Supabase and Vercel form what we call the "Sovereign Stack" - a foundation that scales without drama.',
            },
          ],
        },
      ],
    },
    cover_image: '/images/blog/supabase-vercel.jpg',
    author_id: 'demo-user-id',
    category_id: 'cat-2',
    reading_time: 12,
    published: true,
    featured: false,
    published_at: '2024-12-10T10:00:00Z',
    seo_title: 'Supabase Vercel Architecture Patterns | DevinAI',
    seo_description: 'Technical guide to building scalable applications with Supabase and Vercel architecture patterns.',
    created_at: '2024-12-10T10:00:00Z',
    updated_at: '2024-12-10T10:00:00Z',
    author: demoProfile,
    category: demoBlogCategories[1],
  },
  {
    id: 'post-3',
    slug: 'saas-platform-case-study-40-percent-cost-reduction',
    title: 'How We Reduced Development Costs by 40% for a 500+ Client SaaS Platform',
    excerpt: 'A detailed case study on modernizing legacy infrastructure while maintaining operations, resulting in dramatic cost savings and improved velocity.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'The Challenge' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Our client, a B2B SaaS platform serving 500+ enterprise clients, was spending 70% of their engineering budget on maintenance. Their legacy PHP monolith had accumulated years of technical debt, and feature development had slowed to a crawl.',
            },
          ],
        },
      ],
    },
    cover_image: '/images/blog/case-study-saas.jpg',
    author_id: 'demo-user-id',
    category_id: 'cat-3',
    reading_time: 10,
    published: true,
    featured: true,
    published_at: '2024-12-05T10:00:00Z',
    seo_title: 'SaaS Modernization Case Study | DevinAI',
    seo_description: 'Case study: 40% cost reduction through strategic legacy modernization for enterprise SaaS platform.',
    created_at: '2024-12-05T10:00:00Z',
    updated_at: '2024-12-05T10:00:00Z',
    author: demoProfile,
    category: demoBlogCategories[2],
  },
  {
    id: 'post-4',
    slug: 'ai-integration-patterns-for-enterprise',
    title: 'AI Integration Patterns: Moving Beyond Demos to Production Value',
    excerpt: 'How to integrate LLM APIs like Claude and GPT-4 into production applications with measurable ROI, not just technical novelty.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'The AI Integration Trap' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Most AI integrations fail not because the technology doesn\'t work, but because they\'re solutions looking for problems. Outcome Architecture demands we start with the business outcome, then evaluate whether AI is the right tool.',
            },
          ],
        },
      ],
    },
    cover_image: '/images/blog/ai-integration.jpg',
    author_id: 'demo-user-id',
    category_id: 'cat-2',
    reading_time: 7,
    published: true,
    featured: false,
    published_at: '2024-11-28T10:00:00Z',
    seo_title: 'Enterprise AI Integration Patterns | DevinAI',
    seo_description: 'Practical patterns for integrating LLM APIs into production enterprise applications with measurable ROI.',
    created_at: '2024-11-28T10:00:00Z',
    updated_at: '2024-11-28T10:00:00Z',
    author: demoProfile,
    category: demoBlogCategories[1],
  },
];

// Demo Portfolio Projects - Actual templates built by DevinAI
export const demoPortfolioProjects: PortfolioProject[] = [
  {
    id: 'project-1',
    slug: 'markey-luxury-marketplace',
    client_name: 'Markey',
    project_title: 'Multi-Vendor Luxury Marketplace Platform',
    industry: 'E-commerce',
    duration: '3 weeks',
    challenge: {
      title: 'Building Premium Commerce at Scale',
      description: 'Create a sophisticated multi-vendor marketplace that handles complex seller onboarding, split payments, and delivers a luxury shopping experience.',
      pain_points: [
        'Complex multi-vendor payment flows with Stripe Connect',
        'Need for sophisticated admin dispute resolution',
        'Three distinct user roles with different permissions',
        'Maintaining luxury aesthetic with responsive design',
      ],
    },
    solution: {
      title: 'The Velvet Silhouette Design System',
      description: 'Dark-first luxury design with Stripe Connect integration, role-based dashboards, and AI product descriptions.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'Seller onboarding flow with Stripe Connect account creation in under 5 minutes',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: 'Next.js 15 + Supabase with 15 RLS-protected tables for buyer/seller/admin roles',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: 'Real-time order status tracking and dispute resolution workflow',
        },
      ],
    },
    outcomes: [
      { metric: 'Dev Time', before: 12, after: 3, unit: 'weeks', description: '4x faster than traditional dev' },
      { metric: 'Development Cost', before: 80000, after: 48000, unit: '$', description: '40% cost reduction' },
      { metric: 'Source Files', before: 0, after: 78, unit: 'files', description: 'Complete marketplace codebase' },
      { metric: 'Feature Velocity', before: 2, after: 8, unit: 'features/month', description: '4x faster delivery' },
    ],
    testimonial: 'The Markey template gave us a production-ready luxury marketplace in weeks, not months. The dark design and Stripe Connect integration work flawlessly.',
    testimonial_author: 'Platform User',
    testimonial_role: 'Marketplace Founder',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Stripe Connect', 'Tailwind CSS', 'Claude AI'],
    featured_image: '/images/portfolio/markey.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: true,
    display_order: 1,
    created_at: '2026-02-05T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
  },
  {
    id: 'project-2',
    slug: 'ai-groceries-delivery',
    client_name: 'AI Groceries',
    project_title: 'AI-Powered Grocery Delivery Platform',
    industry: 'Food & Delivery',
    duration: '2 weeks',
    challenge: {
      title: 'Fresh Commerce with Intelligence',
      description: 'Build a grocery delivery platform with ZIP-based store discovery, provenance storytelling, and AI-driven product recommendations.',
      pain_points: [
        'Complex per-store cart management',
        'ZIP code-based service area filtering',
        'Product provenance and farm story presentation',
        'AI-powered substitution and recommendations',
      ],
    },
    solution: {
      title: 'The Harvest Table Design System',
      description: 'Light-first warm design with Sunbeam yellows and Deep Earth greens, featuring the Provenance Drawer and WeightlessCart components.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'ZIP search instantly filters stores with GIN-indexed serviced_zips arrays',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: '12 Supabase tables with delivery timings, department types, and item provenance',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: '6 AI contexts: recommendations, substitutions, inventory, pricing, descriptions, delivery slots',
        },
      ],
    },
    outcomes: [
      { metric: 'Dev Time', before: 8, after: 2, unit: 'weeks', description: '4x faster than traditional dev' },
      { metric: 'Development Cost', before: 50000, after: 25000, unit: '$', description: '50% cost reduction' },
      { metric: 'Source Files', before: 0, after: 72, unit: 'files', description: 'Complete grocery platform' },
      { metric: 'Feature Velocity', before: 3, after: 12, unit: 'features/month', description: '4x faster delivery' },
    ],
    testimonial: 'The farm-to-table storytelling through the Provenance Drawer creates an emotional connection with customers. AI recommendations increased basket size by 23%.',
    testimonial_author: 'Template User',
    testimonial_role: 'Grocery Startup Founder',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Stripe', 'Tailwind CSS', 'Claude AI'],
    featured_image: '/images/portfolio/ai-groceries.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: true,
    display_order: 2,
    created_at: '2026-02-05T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
  },
  {
    id: 'project-3',
    slug: 'vcphi-venture-capital',
    client_name: 'VC Phi',
    project_title: 'Venture Capital Portfolio Platform',
    industry: 'Finance',
    duration: '2 weeks',
    challenge: {
      title: 'Institutional Presence for VCs',
      description: 'Create a commanding digital presence for venture capital firms with portfolio showcase, investor relations, and team presentation.',
      pain_points: [
        'Need for "weighty" institutional credibility',
        'Complex portfolio and investor management',
        'AI-powered portfolio optimization insights',
        'Professional team and blog presentation',
      ],
    },
    solution: {
      title: 'The Sovereign Standard Design System',
      description: 'Dark-first professional design with Abyss blacks and Growth greens, featuring 800ms+ reveal animations for institutional gravitas.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'Dashboard with portfolio CRUD, blog management, and AI content assistance',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: '10 Supabase tables: portfolios, investors, team members, blog with categories',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: 'AI contexts for portfolio optimization, content assistance, and market insights',
        },
      ],
    },
    outcomes: [
      { metric: 'Dev Time', before: 10, after: 2, unit: 'weeks', description: '5x faster than traditional dev' },
      { metric: 'Development Cost', before: 60000, after: 30000, unit: '$', description: '50% cost reduction' },
      { metric: 'Source Files', before: 0, after: 58, unit: 'files', description: 'Complete VC platform' },
      { metric: 'Feature Velocity', before: 2, after: 10, unit: 'features/month', description: '5x faster delivery' },
    ],
    testimonial: 'VC Phi gave us the institutional credibility we needed to close our fund. The portfolio optimizer AI helped us identify synergies across our investments.',
    testimonial_author: 'Fund Manager',
    testimonial_role: 'Managing Partner',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Tailwind CSS', 'Claude AI', 'Recharts'],
    featured_image: '/images/portfolio/vcphi.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: true,
    display_order: 3,
    created_at: '2026-02-06T00:00:00Z',
    updated_at: '2026-02-06T00:00:00Z',
  },
  {
    id: 'project-4',
    slug: 'biglabs-consulting',
    client_name: 'Biglabs',
    project_title: 'Enterprise Consulting Platform',
    industry: 'Consulting',
    duration: '2 weeks',
    challenge: {
      title: 'The Architect\'s Blueprint',
      description: 'Build a commanding consulting agency platform with case studies, analytics reporting, and lead generation.',
      pain_points: [
        'Need for technical credibility visual language',
        'Complex case study and article management',
        'AI-powered analytics report generation',
        'Career and services CRUD workflows',
      ],
    },
    solution: {
      title: 'Blueprint Grid Design System',
      description: 'Dark-first consulting design with void blacks and horizon blues, featuring blueprint-grid CSS overlays and bento grid layouts.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'Command Center dashboard with AI analytics and content management',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: '10 Supabase tables: articles, case_studies, careers, services, consultations, analytics_reports',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: 'Pure CSS animations (reveal-up, border-trace, glow-pulse) without GSAP dependency',
        },
      ],
    },
    outcomes: [
      { metric: 'Dev Time', before: 8, after: 2, unit: 'weeks', description: '4x faster than traditional dev' },
      { metric: 'Development Cost', before: 45000, after: 22500, unit: '$', description: '50% cost reduction' },
      { metric: 'Source Files', before: 0, after: 50, unit: 'files', description: 'Complete consulting platform' },
      { metric: 'Feature Velocity', before: 2, after: 8, unit: 'features/month', description: '4x faster delivery' },
    ],
    testimonial: 'The blueprint aesthetic instantly communicated our technical expertise. Clients started treating us differently from the first meeting.',
    testimonial_author: 'Agency Director',
    testimonial_role: 'Principal Consultant',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Tailwind CSS', 'Claude AI', 'Recharts'],
    featured_image: '/images/portfolio/biglabs.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: false,
    display_order: 4,
    created_at: '2026-02-05T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
  },
  {
    id: 'project-5',
    slug: 'ai-fee-creator-platform',
    client_name: 'AI Fee',
    project_title: 'Creator Monetization Platform',
    industry: 'Creator Economy',
    duration: '2 weeks',
    challenge: {
      title: 'Grounded Generosity for Creators',
      description: 'Build a platform where creators can receive support through tips and subscriptions with public-facing creator pages.',
      pain_points: [
        'Public creator page with profile visibility',
        'Multiple support tiers and recurring subscriptions',
        'Tab-based dashboard for content and supporter management',
        'Stripe integration for payments and payouts',
      ],
    },
    solution: {
      title: 'Grounded Generosity Design System',
      description: 'Warm, approachable design with paper whites, terracotta accents, and sage greens. Cormorant Garamond + Karla typography.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'Public creator pages with one-click tip buttons and subscription tiers',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: '10 Supabase tables with publicly readable profiles for creator page functionality',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: 'Real-time supporter notifications and earnings dashboard',
        },
      ],
    },
    outcomes: [
      { metric: 'Dev Time', before: 8, after: 2, unit: 'weeks', description: '4x faster than traditional dev' },
      { metric: 'Development Cost', before: 40000, after: 20000, unit: '$', description: '50% cost reduction' },
      { metric: 'Source Files', before: 0, after: 44, unit: 'files', description: 'Complete creator platform' },
      { metric: 'Feature Velocity', before: 2, after: 8, unit: 'features/month', description: '4x faster delivery' },
    ],
    testimonial: 'AI Fee helped me launch my creator monetization in days. The warm design makes supporters feel like they\'re joining a community, not just paying.',
    testimonial_author: 'Content Creator',
    testimonial_role: 'Digital Artist',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Stripe', 'Tailwind CSS', 'Claude AI'],
    featured_image: '/images/portfolio/ai-fee.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: false,
    display_order: 5,
    created_at: '2026-02-05T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
  },
];

// Demo System Audit Leads
export const demoSystemAuditLeads: SystemAuditLead[] = [
  {
    id: 'lead-1',
    email: 'jennifer@acmecorp.com',
    name: 'Jennifer Walsh',
    company: 'Acme Corporation',
    role: 'VP of Engineering',
    current_challenge: 'Our monolith is becoming unmaintainable. We need to modernize but can\'t afford downtime.',
    team_size: '20-50',
    tech_stack: ['PHP', 'MySQL', 'jQuery'],
    desired_outcomes: ['Reduce maintenance costs', 'Improve feature velocity', 'Scale for growth'],
    budget_range: '$100K - $250K',
    timeline: '6-12 months',
    audit_scheduled: true,
    audit_completed: false,
    status: 'scheduled',
    notes: [
      {
        id: 'note-1',
        content: 'Initial call scheduled for next Tuesday. They have budget approved for Q1.',
        author: 'Ari Harrison',
        created_at: '2024-12-10T10:00:00Z',
      },
    ],
    source: 'organic',
    created_at: '2024-12-08T14:30:00Z',
    updated_at: '2024-12-10T10:00:00Z',
  },
  {
    id: 'lead-2',
    email: 'mike@startupxyz.io',
    name: 'Mike Thompson',
    company: 'StartupXYZ',
    role: 'CTO',
    current_challenge: 'We\'re hitting scaling issues as we grow. Need to architect for the next growth phase.',
    team_size: '5-10',
    tech_stack: ['React', 'Node.js', 'MongoDB'],
    desired_outcomes: ['Handle 10x traffic', 'Reduce infrastructure costs', 'Improve reliability'],
    budget_range: '$50K - $100K',
    timeline: '3-6 months',
    audit_scheduled: false,
    audit_completed: false,
    status: 'new',
    notes: [],
    source: 'referral',
    created_at: '2024-12-12T09:15:00Z',
    updated_at: '2024-12-12T09:15:00Z',
  },
  {
    id: 'lead-3',
    email: 'sarah@enterprise.com',
    name: 'Sarah Mitchell',
    company: 'Enterprise Solutions Inc',
    role: 'Director of Technology',
    current_challenge: 'We want to integrate AI into our platform but need strategic guidance on where to start.',
    team_size: '50+',
    tech_stack: ['Java', 'Spring', 'PostgreSQL', 'AWS'],
    desired_outcomes: ['Identify AI opportunities', 'Build AI roadmap', 'Proof of concept'],
    budget_range: '$250K+',
    timeline: '12+ months',
    audit_scheduled: false,
    audit_completed: false,
    status: 'contacted',
    notes: [
      {
        id: 'note-2',
        content: 'Sent initial email. They\'re interested in AI Integration Blueprint service.',
        author: 'Ari Harrison',
        created_at: '2024-12-11T16:00:00Z',
      },
    ],
    source: 'linkedin',
    created_at: '2024-12-10T11:45:00Z',
    updated_at: '2024-12-11T16:00:00Z',
  },
];

// Demo Newsletter Subscribers
export const demoNewsletterSubscribers: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'reader1@example.com', subscribed_at: '2024-12-01T00:00:00Z', source: 'blog', active: true },
  { id: 'sub-2', email: 'reader2@example.com', subscribed_at: '2024-12-05T00:00:00Z', source: 'homepage', active: true },
  { id: 'sub-3', email: 'reader3@example.com', subscribed_at: '2024-12-08T00:00:00Z', source: 'whitepaper', active: true },
  { id: 'sub-4', email: 'reader4@example.com', subscribed_at: '2024-12-10T00:00:00Z', source: 'blog', active: true },
  { id: 'sub-5', email: 'reader5@example.com', subscribed_at: '2024-12-12T00:00:00Z', source: 'system-audit', active: true },
];

// Demo Contact Submissions
export const demoContactSubmissions: ContactSubmission[] = [
  {
    id: 'contact-1',
    name: 'Alex Johnson',
    email: 'alex@company.com',
    company: 'Tech Innovations',
    message: 'We\'re interested in discussing a potential project. Can we schedule a call?',
    status: 'new',
    created_at: '2024-12-11T14:00:00Z',
  },
];

// Demo Dashboard Stats
export const demoDashboardStats: DashboardStats = {
  totalLeads: 24,
  newLeadsThisWeek: 5,
  publishedPosts: 4,
  totalSubscribers: 147,
  publishedProjects: 3,
  conversionRate: 8.3,
};

// Demo AI Responses
export const demoAIResponses: Record<string, string> = {
  content_assistance: `Here's a draft for your blog introduction:

**The Hidden Cost of Speed: Why Faster Development Often Means Slower Growth**

In the race to ship features, most development teams make a critical error: they optimize for velocity instead of outcomes. The result? Technical debt compounds, maintenance costs balloon, and ironically, the team ends up moving slower than ever.

This isn't a failure of engineering skill—it's a failure of architecture. When we prioritize "getting it done" over "getting it right," we're not saving time; we're borrowing it at high interest.

*[Continue with your three-pillar framework explanation...]*`,

  seo_optimization: `**SEO Analysis & Recommendations**

**Current Title:** "How to Scale Your Application"
**Suggested Title:** "Application Scaling Guide: From 1K to 100K Users Without Breaking"

**Key Improvements:**
1. Add specific numbers for credibility
2. Include primary keyword "application scaling" early
3. Add emotional hook ("without breaking")

**Meta Description Suggestion:**
"Learn proven application scaling strategies used by enterprise teams. Step-by-step guide to handle 100x growth with Supabase, Vercel, and modern architecture patterns."

**Internal Linking Opportunities:**
- Link to your Supabase architecture post
- Reference your legacy modernization case study
- Add CTA to System Audit page`,

  lead_analysis: `**Lead Quality Analysis: Jennifer Walsh (Acme Corporation)**

**Score: 87/100 - High Priority**

**Positive Signals:**
- VP-level decision maker with budget authority
- Clear pain point (legacy monolith)
- Defined timeline (6-12 months)
- Budget range aligns with typical project scope

**Recommended Approach:**
1. Position Legacy Modernization Framework
2. Share TechFlow case study (similar profile)
3. Propose 2-week discovery phase
4. Emphasize zero-downtime migration capability

**Suggested Next Steps:**
- Send case study before scheduled call
- Prepare ROI projection based on their team size
- Research their current tech stack for personalized recommendations`,

  portfolio_summary: `**Project Summary: TechFlow Systems Modernization**

**The Challenge:**
TechFlow's 10-year PHP monolith was consuming 70% of engineering resources on maintenance, leaving little capacity for innovation.

**Our Approach:**
Implemented the Outcome Architecture Framework with phased migration:
- Phase 1: Established parallel Next.js frontend (4 weeks)
- Phase 2: Migrated to Supabase with RLS (6 weeks)
- Phase 3: Decommissioned legacy systems (8 weeks)

**Key Results:**
- 40% reduction in development costs
- 4x faster feature delivery
- 99.95% uptime (up from 97.5%)
- Zero downtime during migration

**Client Quote:**
"DevinAI gave us something priceless: predictability."`,
};
