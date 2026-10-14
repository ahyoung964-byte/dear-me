import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import type { Profile } from '@/lib/types';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = supabaseServer();
  const { data, error } = await db.from('dm_profiles').select('*').eq('id', id).single();
  if (error || !data) return NextResponse.json({ error: '프로필 없음' }, { status: 404 });
  return NextResponse.json(data as Profile);
}
