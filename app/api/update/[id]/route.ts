import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { updateLoading } from '@/lib/anthropic';
import type { Profile, LoadingScreen } from '@/lib/types';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { mood, keywords } = await req.json() as { mood: string; keywords: string[] };
  const db = supabaseServer();

  const { data: profile } = await db.from('dm_profiles').select('*').eq('id', id).single();
  if (!profile) return NextResponse.json({ error: '프로필 없음' }, { status: 404 });

  const current = (profile as Profile).loading as LoadingScreen;
  let patch;
  try {
    patch = await updateLoading(current, mood, keywords);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  // 패치 적용
  const updatedLoading: LoadingScreen = {
    ...current,
    patches: [...patch.patches, ...current.patches].slice(0, 5),
    inProgress: current.inProgress.map(item => {
      const update = patch.inProgressUpdates.find(u => u.label === item.label);
      return update ? { ...item, pct: update.pct } : item;
    }),
  };

  await db.from('dm_profiles').update({ loading: updatedLoading, updated_at: new Date().toISOString() }).eq('id', id);
  await db.from('dm_daily_updates').insert({
    profile_id: id,
    mood,
    keywords,
    loading_patch: patch,
  });

  return NextResponse.json({ loading: updatedLoading });
}
