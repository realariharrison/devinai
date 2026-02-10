# DevinAI

Outcome Architecture platform for software development consulting. Built with Next.js 15, React 19, Tailwind CSS, and Supabase. Designed for agencies, consultants, and development studios.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fdevinai&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,SUPABASE_SECRET_KEY,ANTHROPIC_API_KEY&envDescription=Configure%20your%20Supabase%20and%20Claude%20API%20keys&project-name=devinai&repository-name=devinai)

## Design Philosophy: "The Sovereign Standard"

- **Palette:** Midnight Charter (#03045E), Boardroom Blue (#00B4D8), Cloud Atrium (#90E0EF), Vault Glass (#CAF0F8)
- **Typography:** IBM Plex Serif (headings), IBM Plex Sans (body), IBM Plex Mono (data)
- **Dark-first design** with institutional gravitas and 700-900ms reveal animations
- **Principle:** "Authority Through Clarity" - measured confidence, not flashy effects

## Features

- **Blog System** - Rich content management with TipTap editor, category filtering, SEO optimization
- **Portfolio Showcase** - Case studies with before/after metrics, outcomes visualization, testimonials
- **Lead Generation** - Multi-step System Audit request form with progress tracking
- **Admin Dashboard** - Content management, lead tracking, analytics overview
- **AI Integration** - Claude-powered content assistance, SEO optimization, lead analysis
- **Full Authentication** - Magic link auth for admin, profile management

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + Tailwind CSS
- **Database:** Supabase (PostgreSQL with RLS)
- **AI:** Claude API (Anthropic)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

The app runs in **demo mode** when Supabase is not configured, using built-in sample data.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key |
| `SUPABASE_SECRET_KEY` | Supabase secret (service role) key |
| `ANTHROPIC_API_KEY` | Claude API key for AI features |

## Database Setup

Run the schema in `supabase/schema.sql` against your Supabase project. The schema includes:

- 6 tables with Row Level Security (RLS)
- Automatic profile creation trigger
- Default blog categories

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (claude, newsletter, contact, upload, system-audit)
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog listing and detail
│   ├── portfolio/         # Portfolio and case studies
│   ├── system-audit/      # Lead generation form
│   └── contact/           # Contact page
├── components/
│   ├── admin/             # Admin dashboard components
│   ├── blog/              # Blog components
│   ├── landing/           # Homepage sections
│   ├── lead-gen/          # Lead generation forms
│   ├── portfolio/         # Portfolio components
│   └── shared/            # Header, Footer, ScrollReveal
└── lib/
    ├── auth-context.tsx   # Authentication provider
    ├── demo-data.ts       # Sample data for demo mode
    ├── supabase.ts        # Supabase client
    ├── types.ts           # TypeScript interfaces
    └── utils.ts           # Utility functions
```

## Demo Mode

When Supabase credentials are not configured, the app automatically runs in demo mode with:

- Sample blog posts (4 articles across 3 categories)
- Sample portfolio projects (3 case studies with metrics)
- Sample system audit leads
- Full navigation and UI functionality

## The 3-Pillar System Architecture

This template demonstrates the Outcome Architecture approach:

1. **Frictionless Velocity Engine** - Ship features faster without technical debt
2. **Sovereign Stack Foundation** - Technology that scales predictably
3. **Continuous Certainty Protocol** - Clear visibility and zero-surprise operations

## License

MIT

## Need Help?

For assistance with deployment, configuration, or customization, contact us at **ari@quantnexus.ai**
