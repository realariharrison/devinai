import { NextRequest, NextResponse } from 'next/server';
import { supabase, isDemoMode } from '@/lib/supabase';

interface SystemAuditPayload {
  name: string;
  email: string;
  company: string;
  role: string;
  current_challenge: string;
  team_size: string;
  tech_stack: string[];
  desired_outcomes: string[];
  budget_range: string;
  timeline: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      role,
      current_challenge,
      team_size,
      tech_stack,
      desired_outcomes,
      budget_range,
      timeline,
    } = body as SystemAuditPayload;

    // Validation
    if (!name || !email || !company || !role || !current_challenge) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate arrays
    if (!Array.isArray(tech_stack) || tech_stack.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one technology' },
        { status: 400 }
      );
    }

    if (!Array.isArray(desired_outcomes) || desired_outcomes.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one desired outcome' },
        { status: 400 }
      );
    }

    // Demo mode: return success
    if (isDemoMode()) {
      return NextResponse.json({
        success: true,
        message: 'System audit request received (demo mode)',
        lead_id: 'demo-lead-' + Date.now(),
      });
    }

    // Production mode: insert into database
    const { data, error } = await supabase
      .from('system_audit_leads')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        company: company.trim(),
        role: role.trim(),
        current_challenge: current_challenge.trim(),
        team_size,
        tech_stack,
        desired_outcomes,
        budget_range,
        timeline,
        status: 'new',
        audit_scheduled: false,
        audit_completed: false,
        notes: [],
        source: 'website',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('System audit submission error:', error);

      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'We already have your request on file. Our team will be in touch soon!',
        });
      }

      return NextResponse.json(
        { error: 'Failed to submit request. Please try again.' },
        { status: 500 }
      );
    }

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to lead
    // This could be implemented with a service like Resend, SendGrid, etc.

    return NextResponse.json({
      success: true,
      message: 'System audit request received! We will contact you within 2 business days.',
      lead_id: data.id,
    });
  } catch (error) {
    console.error('System audit API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
