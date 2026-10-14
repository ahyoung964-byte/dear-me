'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-sm">
        <div className="text-4xl mb-4">💌</div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--ink)' }}>Dear me</h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--ink-soft)' }}>
          나만의 사용설명서, 로딩화면, NPC 카드를 AI로 만들어보세요.
          친구에게 링크 하나로 공유할 수 있어요.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-8 text-xs">
          {[['📋', '사용설명서'], ['💻', '로딩화면'], ['⚔️', 'NPC 카드']].map(([emoji, label]) => (
            <div key={label} className="p-3 rounded-2xl" style={{ background: 'var(--pink-dim)' }}>
              <div className="text-xl mb-1">{emoji}</div>
              <div style={{ color: 'var(--ink-dim)' }}>{label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push('/onboarding')}
          className="w-full py-4 rounded-2xl font-semibold text-white"
          style={{ background: 'var(--pink)' }}
        >
          나의 Dear me 만들기 ✨
        </button>
      </div>
    </main>
  );
}
