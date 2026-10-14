import type { LoadingScreen } from '@/lib/types';

export default function LoadingCard({ loading }: { loading: LoadingScreen }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--game-bg)', border: '1px solid #1a3a2a' }}>
      <div className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--game-green)' }}>
        LOADING SCREEN v2.0
      </div>

      <div className="mb-4">
        {loading.inProgress.map((item, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between text-xs mb-1" style={{ color: '#88cc99' }}>
              <span>{item.label}</span>
              <span style={{ color: 'var(--game-green)' }}>{item.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'var(--game-dim)' }}>
              <div className="loading-bar-fill" style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="text-xs mb-1" style={{ color: '#88cc99' }}>✓ 완료됨</div>
        {loading.completed.map((item, i) => (
          <div key={i} className="text-xs mb-0.5" style={{ color: '#4a8a5a' }}>{item}</div>
        ))}
      </div>

      <div className="mb-3">
        <div className="text-xs mb-1" style={{ color: '#cc8888' }}>🐛 버그</div>
        {loading.bugs.map((bug, i) => (
          <div key={i} className="text-xs mb-0.5" style={{ color: '#885555' }}>{bug}</div>
        ))}
      </div>

      <div>
        <div className="text-xs mb-1" style={{ color: '#88aacc' }}>📦 패치 노트</div>
        {loading.patches.map((patch, i) => (
          <div key={i} className="text-xs mb-0.5" style={{ color: '#445566' }}>{patch}</div>
        ))}
      </div>
    </div>
  );
}
