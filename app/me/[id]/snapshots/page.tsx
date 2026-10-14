'use client';
import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Snapshot } from '@/lib/types';
import { supabaseBrowser } from '@/lib/supabase';

function SnapshotsContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);

  useEffect(() => {
    const db = supabaseBrowser();
    db.from('dm_snapshots').select('*').eq('profile_id', id).order('created_at', { ascending: false })
      .then(({ data }) => setSnapshots((data ?? []) as Snapshot[]));
  }, [id]);

  return (
    <main className="min-h-screen px-5 pt-8 pb-10 max-w-lg mx-auto">
      <button onClick={() => router.push(`/me/${id}`)} className="text-xs mb-6 block" style={{ color: 'var(--ink-dim)' }}>← 내 프로필</button>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--ink)' }}>버전 기록</h1>
      {snapshots.length === 0 ? (
        <div className="text-center py-16 text-sm" style={{ color: 'var(--ink-dim)' }}>
          아직 저장된 버전이 없어요<br />
          <span style={{ color: 'var(--pink)' }}>프로필에서 "버전 저장"을 눌러보세요</span>
        </div>
      ) : (
        <div className="space-y-3">
          {snapshots.map(s => (
            <div key={s.id} className="p-4 rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--line)' }}>
              <div className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{s.label}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>
                {new Date(s.created_at).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SnapshotsPage() {
  return <Suspense><SnapshotsContent /></Suspense>;
}
