import type { NpcCard as NpcCardType } from '@/lib/types';
import StatBar from './StatBar';

const STAT_COLORS: Record<string, string> = {
  공감력: '#f4a7b9',
  고집: '#f0c060',
  창의성: '#c4b0e8',
  체력: '#a8e0c8',
  눈치: '#88ccee',
  솔직함: '#f4c4a0',
};

export default function NpcCard({ npc }: { npc: NpcCardType }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--card-alt)', border: '2px solid var(--amber)' }}>
      <div className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--amber)' }}>
        NPC 카드
      </div>
      <div className="text-xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
        {npc.name}
      </div>

      <div className="mb-4">
        {Object.entries(npc.stats).map(([key, val]) => (
          <StatBar key={key} label={key} value={val} color={STAT_COLORS[key] ?? 'var(--lavender)'} />
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <div><span style={{ color: 'var(--ink-dim)' }}>메인 퀘스트</span><br /><span style={{ color: 'var(--ink)' }}>{npc.mainQuest}</span></div>
        <div><span style={{ color: 'var(--ink-dim)' }}>히든 퀘스트</span><br /><span style={{ color: 'var(--ink)' }}>{npc.hiddenQuest}</span></div>
        <div><span style={{ color: 'var(--ink-dim)' }}>약점</span><br /><span style={{ color: 'var(--ink)' }}>{npc.weakness}</span></div>
        <div><span style={{ color: 'var(--ink-dim)' }}>드랍 아이템</span><br /><span style={{ color: 'var(--ink)' }}>{npc.dropItem}</span></div>
      </div>
    </div>
  );
}
