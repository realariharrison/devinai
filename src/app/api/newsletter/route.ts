import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase, isDemoMode } from '@/lib/supabase';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FRAMEWORK_PDF_URL = 'https://drive.google.com/uc?export=download&id=1Qp5-E6KV9ibtca21DX6cnqbBNTvJiS3d';

async function sendFrameworkEmail(email: string) {
  if (!resend) {
    console.log('Resend not configured, skipping email');
    return;
  }

  try {
    await resend.emails.send({
      from: 'DevinAI <hello@outcome.devinai.com>',
      to: email,
      subject: 'Your Outcome Architecture Framework',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F8EDE3;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8EDE3; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #C5705D;">DevinAI</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                        Your Framework is Ready
                      </h2>
                      <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Thank you for your interest in the Outcome Architecture Framework. This comprehensive guide will help you build software that scales predictably.
                      </p>

                      <!-- Download Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${FRAMEWORK_PDF_URL}"
                               style="display: inline-block; padding: 16px 32px; background-color: #C5705D; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 12px;">
                              Download PDF
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #6a6a6a;">
                        Inside you'll find:
                      </p>
                      <ul style="margin: 12px 0 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #4a4a4a;">
                        <li>The Three Pillars of Outcome Architecture</li>
                        <li>How to align technical decisions with business outcomes</li>
                        <li>Production-proven architecture patterns</li>
                        <li>Real-world case studies with metrics</li>
                      </ul>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #F8EDE3; border-top: 1px solid #DFD3C3;">
                      <p style="margin: 0; font-size: 13px; color: #6a6a6a; text-align: center;">
                        Questions? Reply to this email or visit
                        <a href="https://devinai.com" style="color: #C5705D; text-decoration: none;">devinai.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });
    console.log('Framework email sent to:', email);
  } catch (error) {
    console.error('Failed to send framework email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body as { email: string; source?: string };

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Demo mode: return success (no email sent)
    if (isDemoMode()) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed (demo mode)',
      });
    }

    // Production mode: insert into database (use insert, not upsert - RLS blocks anonymous updates)
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        source: source || 'website',
        active: true,
        subscribed_at: new Date().toISOString(),
      });

    // Handle duplicate email gracefully (error code 23505 = unique violation)
    if (error && error.code !== '23505') {
      console.error('Newsletter subscription error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Send framework email if this is a whitepaper download request
    if (source === 'whitepaper') {
      await sendFrameworkEmail(email.toLowerCase().trim());
    }

    return NextResponse.json({
      success: true,
      message: error?.code === '23505' ? 'You are already subscribed!' : 'Successfully subscribed!',
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
