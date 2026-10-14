import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { generateProfile } from '@/lib/anthropic';
import type { QuizAnswers } from '@/lib/types';

export async function POST(req: NextRequest) {
  const { userId, answers } = await req.json() as { userId: string; answers: QuizAnswers };
  if (!userId || !answers) return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });

  const generated = await generateProfile(answers);
  const db = supabaseServer();

  const { data, error } = await db
    .from('dm_profiles')
    .insert({
      user_id: userId,
      quiz_answers: answers,
      manual: generated.manual,
      loading: generated.loading,
      npc: generated.npc,
    })
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
