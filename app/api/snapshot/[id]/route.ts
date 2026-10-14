import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import type { Profile, Snapshot } from '@/lib/types';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { label } = await req.json() as { label: string };
  const db = supabaseServer();

  const { data: profile } = await db.from('dm_profiles').select('*').eq('id', id).single();
  if (!profile) return NextResponse.json({ error: '프로필 없음' }, { status: 404 });

  const p = profile as Profile;
  const { data } = await db
    .from('dm_snapshots')
    .insert({ profile_id: id, label, manual: p.manual, loading: p.loading, npc: p.npc })
    .select()
    .single();

  return NextResponse.json(data as Snapshot);
}
