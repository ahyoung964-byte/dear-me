'use client';
import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ManualCard from '@/components/ManualCard';
import LoadingCard from '@/components/LoadingCard';
import NpcCard from '@/components/NpcCard';
import type { Profile } from '@/lib/types';

function ProfileContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/profile/${id}`).then(r => r.json()).then(setProfile);
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSnapshot = async () => {
    const label = new Date().toLocaleDateString('ko-KR');
    await fetch(`/api/snapshot/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label }),
    });
    router.push(`/me/${id}/snapshots`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm pulse" style={{ color: 'var(--ink-dim)' }}>불러오는 중...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-5 pt-8 pb-24 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-xs tracking-widest" style={{ color: 'var(--pink)' }}>DEAR ME</div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>나의 프로필</h1>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-xl font-semibold"
          style={{ background: copied ? 'var(--mint)' : 'var(--pink)', color: 'white' }}
        >
          {copied ? '복사됨 ✓' : '링크 공유'}
        </button>
      </div>

      <div className="space-y-4 fade-up">
        <ManualCard manual={profile.manual} />
        <LoadingCard loading={profile.loading} />
        <NpcCard npc={profile.npc} />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 flex justify-around py-4 px-5 max-w-lg mx-auto"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
        <button onClick={() => router.push(`/me/${id}/update`)} className="text-xs" style={{ color: 'var(--ink-dim)' }}>오늘 업데이트</button>
        <button onClick={handleSnapshot} className="text-xs" style={{ color: 'var(--ink-dim)' }}>버전 저장</button>
        <button onClick={() => router.push(`/me/${id}/snapshots`)} className="text-xs" style={{ color: 'var(--ink-dim)' }}>스냅샷</button>
      </nav>
    </main>
  );
}

export default function ProfilePage() {
  return <Suspense><ProfileContent /></Suspense>;
}
