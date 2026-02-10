import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { isDemoMode } from '@/lib/supabase';
import { demoAIResponses } from '@/lib/demo-data';
import type { AIContext } from '@/lib/types';

const systemPrompts: Record<AIContext, string> = {
  content_assistance: `You are an expert content writer for DevinAI, a software development consultancy focused on Outcome Architecture. You help create compelling, technical yet accessible content that demonstrates thought leadership in software architecture, development practices, and AI integration.

Your writing style is:
- Clear and authoritative without being pompous
- Technical but accessible to business stakeholders
- Focused on outcomes and measurable results
- Uses the three pillars: Frictionless Velocity Engine, Sovereign Stack Foundation, Continuous Certainty Protocol

Always tie content back to business outcomes and practical application.`,

  seo_optimization: `You are an SEO expert specializing in B2B technology content. You analyze content and provide specific, actionable recommendations to improve search visibility while maintaining quality and readability.

Focus areas:
- Title tag and meta description optimization
- Header structure and keyword placement
- Internal and external linking opportunities
- Content gaps and expansion suggestions
- Featured snippet optimization

Provide specific before/after examples when making suggestions.`,

  lead_analysis: `You are a B2B sales intelligence analyst for DevinAI. You analyze lead information to assess quality, identify opportunities, and recommend engagement strategies.

Evaluation criteria:
- Decision-maker authority level
- Budget alignment with typical project sizes
- Technical sophistication and challenge complexity
- Timeline urgency
- Potential lifetime value

Provide a quality score (0-100), key insights, and specific recommended next steps.`,

  portfolio_summary: `You are a technical writer summarizing case studies for DevinAI's portfolio. You create compelling narratives from project data that highlight the challenge, approach, and measurable outcomes.

Format your summaries to include:
- The Challenge: What pain points brought the client to us
- Our Approach: How Outcome Architecture principles were applied
- Key Results: Specific metrics with before/after comparisons
- Client Quote: If available, a testimonial

Keep summaries concise (200-300 words) but impactful.`,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { context, message } = body as { context: AIContext; message: string };

    if (!context || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: context and message' },
        { status: 400 }
      );
    }

    if (!systemPrompts[context]) {
      return NextResponse.json(
        { error: 'Invalid context. Valid options: content_assistance, seo_optimization, lead_analysis, portfolio_summary' },
        { status: 400 }
      );
    }

    // Demo mode: return sample responses
    if (isDemoMode()) {
      // Simulate a slight delay for realism
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = demoAIResponses[context] || 'Demo response for ' + context;
      return NextResponse.json({ response });
    }

    // Production mode: call Claude API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey,
    });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompts[context],
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Extract text from response
    const textContent = response.content.find((block) => block.type === 'text');
    const responseText = textContent && 'text' in textContent ? textContent.text : '';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
