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

// Demo Portfolio Projects
export const demoPortfolioProjects: PortfolioProject[] = [
  {
    id: 'project-1',
    slug: 'enterprise-saas-modernization',
    client_name: 'TechFlow Systems',
    project_title: 'Legacy Modernization for Enterprise SaaS Platform',
    industry: 'SaaS',
    duration: '6 months',
    challenge: {
      title: 'Trapped by Technical Debt',
      description: 'A 10-year-old PHP monolith serving 500+ enterprise clients was consuming 70% of engineering budget on maintenance.',
      pain_points: [
        'Feature development took 3x longer than competitors',
        'System downtime during peak hours',
        'Unable to scale for growing client base',
        'Security vulnerabilities in legacy codebase',
      ],
    },
    solution: {
      title: 'Phased Outcome Architecture Transformation',
      description: 'We implemented our Legacy Modernization Framework with zero-downtime migration strategy.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'Implemented CI/CD pipelines that reduced deployment time from days to hours',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: 'Migrated to Next.js + Supabase with TypeScript for type-safe, scalable architecture',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: 'Built comprehensive monitoring and automated testing with 95% code coverage',
        },
      ],
    },
    outcomes: [
      { metric: 'Development Costs', before: 100, after: 60, unit: '%', description: '40% reduction in engineering spend' },
      { metric: 'Feature Velocity', before: 2, after: 8, unit: 'features/month', description: '4x faster feature delivery' },
      { metric: 'System Uptime', before: 97.5, after: 99.95, unit: '%', description: 'Near-perfect reliability' },
      { metric: 'Page Load Time', before: 4.2, after: 0.8, unit: 'seconds', description: '5x faster user experience' },
    ],
    testimonial: 'DevinAI gave us something priceless: predictability. Our platform now scales without drama, and we finally have a technology foundation we can build on for years.',
    testimonial_author: 'Sarah Chen',
    testimonial_role: 'COO, TechFlow Systems',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'PostgreSQL'],
    featured_image: '/images/portfolio/techflow.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: true,
    display_order: 1,
    created_at: '2024-10-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
  },
  {
    id: 'project-2',
    slug: 'creator-marketplace-scale',
    client_name: 'CreatorHub',
    project_title: 'Scaling Creator Economy Platform to 300% Growth',
    industry: 'E-commerce',
    duration: '4 months',
    challenge: {
      title: 'Hitting the Scaling Wall',
      description: 'A rapidly growing creator marketplace was experiencing performance degradation at scale.',
      pain_points: [
        'Database queries timing out during peak hours',
        'Payment processing failures during high traffic',
        'Mobile experience was unusable',
        'Feature releases causing production incidents',
      ],
    },
    solution: {
      title: 'Growth Scale Architecture Implementation',
      description: 'Re-architected the entire stack for 10x scale with zero disruption to revenue.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'Feature flags and staged rollouts eliminated production incidents',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: 'Edge-first architecture with Vercel + optimized Supabase queries',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: 'Real-time performance monitoring with predictive scaling',
        },
      ],
    },
    outcomes: [
      { metric: 'User Growth', before: 50000, after: 200000, unit: 'users', description: '300% user increase handled' },
      { metric: 'Downtime', before: 12, after: 0, unit: 'hours/month', description: 'Zero unplanned downtime' },
      { metric: 'Feature Releases', before: 2, after: 8, unit: 'per month', description: '4x release velocity' },
      { metric: 'Infrastructure Cost', before: 15000, after: 8000, unit: '$/month', description: '47% cost reduction at 4x scale' },
    ],
    testimonial: 'They didn\'t just build our marketplace; they architected a growth system. We\'ve handled 300% user increase with zero downtime and launched 4 major features ahead of schedule.',
    testimonial_author: 'Marcus Rivera',
    testimonial_role: 'CEO, CreatorHub',
    tech_stack: ['React', 'Next.js', 'Supabase', 'Vercel', 'Tailwind'],
    featured_image: '/images/portfolio/creatorhub.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: true,
    display_order: 2,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-11-15T00:00:00Z',
  },
  {
    id: 'project-3',
    slug: 'fintech-ai-integration',
    client_name: 'Meridian Finance',
    project_title: 'AI-Powered Financial Analysis Platform',
    industry: 'FinTech',
    duration: '5 months',
    challenge: {
      title: 'Manual Analysis Bottleneck',
      description: 'Financial analysts spending 60% of time on data gathering rather than strategic analysis.',
      pain_points: [
        'Manual data aggregation from 20+ sources',
        'Report generation taking 3-4 hours',
        'Inconsistent analysis quality',
        'Unable to scale analyst capacity',
      ],
    },
    solution: {
      title: 'AI Integration Blueprint with Claude',
      description: 'Pragmatic LLM implementation focused on analyst augmentation, not replacement.',
      pillars: [
        {
          name: 'Frictionless Velocity Engine',
          description: 'Automated data pipelines with AI-assisted summarization',
        },
        {
          name: 'Sovereign Stack Foundation',
          description: 'Secure, compliant architecture with Claude API integration',
        },
        {
          name: 'Continuous Certainty Protocol',
          description: 'Human-in-the-loop validation with quality scoring',
        },
      ],
    },
    outcomes: [
      { metric: 'Analysis Time', before: 4, after: 0.5, unit: 'hours', description: '8x faster report generation' },
      { metric: 'Analyst Capacity', before: 10, after: 35, unit: 'reports/week', description: '3.5x productivity increase' },
      { metric: 'Data Coverage', before: 8, after: 24, unit: 'sources', description: '3x more comprehensive analysis' },
      { metric: 'Client Satisfaction', before: 72, after: 94, unit: 'NPS', description: 'Significant satisfaction improvement' },
    ],
    testimonial: 'The AI integration transformed our cost structure. Our analysts now focus on strategic insights rather than data gathering. ROI was visible within the first month.',
    testimonial_author: 'David Park',
    testimonial_role: 'VP Engineering, Meridian Finance',
    tech_stack: ['Next.js', 'Claude AI', 'Supabase', 'PostgreSQL', 'TypeScript'],
    featured_image: '/images/portfolio/meridian.jpg',
    gallery: [],
    case_study_content: { type: 'doc', content: [] },
    published: true,
    featured: false,
    display_order: 3,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-10-01T00:00:00Z',
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
