'use client';
import { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';

function UpdateContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [mood, setMood] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    await fetch(`/api/update/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood: mood.trim(), keywords: keywords.split(',').map(k => k.trim()).filter(Boolean) }),
    });
    router.push(`/me/${id}`);
  };

  return (
    <main className="min-h-screen px-6 pt-12 pb-10 max-w-lg mx-auto">
      <button onClick={() => router.back()} className="text-xs mb-6 block" style={{ color: 'var(--ink-dim)' }}>← 돌아가기</button>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--ink)' }}>오늘의 나는?</h1>

      <div className="mb-4">
        <label className="text-sm block mb-2" style={{ color: 'var(--ink-dim)' }}>오늘 기분 한 단어</label>
        <input
          value={mood}
          onChange={e => setMood(e.target.value)}
          placeholder="예: 피곤함, 설렘, 멍함"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: 'var(--card)', border: '1.5px solid var(--line)', color: 'var(--ink)' }}
        />
      </div>

      <div className="mb-6">
        <label className="text-sm block mb-2" style={{ color: 'var(--ink-dim)' }}>오늘의 키워드 (쉼표로 구분)</label>
        <input
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          placeholder="예: 운동, 미팅, 넷플릭스"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: 'var(--card)', border: '1.5px solid var(--line)', color: 'var(--ink)' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !mood.trim()}
        className="w-full py-4 rounded-2xl font-semibold text-white"
        style={{ background: loading || !mood.trim() ? 'var(--line)' : 'var(--pink)', cursor: loading || !mood.trim() ? 'not-allowed' : 'pointer' }}
      >
        {loading ? '로딩화면 업데이트 중...' : '오늘 기록하기'}
      </button>
    </main>
  );
}

export default function UpdatePage() {
  return <Suspense><UpdateContent /></Suspense>;
}
