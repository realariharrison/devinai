import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isDemoMode } from '@/lib/supabase';
import { markdownToTipTap } from '@/lib/markdown-to-tiptap';

export async function POST(request: NextRequest) {
  try {
    // Demo mode - just return success
    if (isDemoMode()) {
      return NextResponse.json({ success: true, message: 'Demo mode' });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Server not configured. SUPABASE_SECRET_KEY required.' },
        { status: 500 }
      );
    }

    // Parse body once at the start
    const body = await request.json();
    const {
      user_id,
      title,
      slug,
      excerpt,
      content,
      category_id,
      reading_time,
      published,
      featured,
      cover_image,
      seo_title,
      seo_description,
    } = body;

    // Verify user_id was provided
    if (!user_id) {
      return NextResponse.json({ error: 'Unauthorized - no user ID' }, { status: 401 });
    }

    // Verify user exists and is admin using service role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user_id)
      .single();

    if (profileError || !profile) {
      console.error('Profile lookup error:', profileError);
      return NextResponse.json({ error: 'Unauthorized - user not found' }, { status: 401 });
    }

    if (profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - admin access required' }, { status: 403 });
    }

    // Convert markdown to TipTap JSON
    const tipTapContent = markdownToTipTap(content || '');

    const { data, error } = await supabaseAdmin.from('blog_posts').insert({
      title,
      slug,
      excerpt: excerpt || null,
      content: tipTapContent,
      category_id: category_id || null,
      reading_time: reading_time || 5,
      published: published || false,
      featured: featured || false,
      cover_image: cover_image || null,
      seo_title: seo_title || title,
      seo_description: seo_description || excerpt,
      author_id: user_id,
      published_at: published ? new Date().toISOString() : null,
    }).select().single();

    if (error) {
      console.error('Blog insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
