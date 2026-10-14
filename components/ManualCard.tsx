import type { Manual } from '@/lib/types';

export default function ManualCard({ manual }: { manual: Manual }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '2px dashed var(--pink)' }}>
      <div className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--pink)' }}>
        사용 설명서
      </div>
      <div className="text-lg font-bold mb-4" style={{ color: 'var(--ink)' }}>
        {manual.tagline}
      </div>

      <Section title="⚠️ 주의사항" items={manual.cautions} color="var(--pink)" />
      <Section title="✅ 권장 사용법" items={manual.howToUse} color="var(--mint)" />
      <Section title="🚫 금지 행동" items={manual.forbidden} color="var(--lavender)" />

      <div className="mt-3 text-xs p-2 rounded-lg" style={{ background: 'var(--lavender-dim)', color: 'var(--ink-dim)' }}>
        보증: {manual.warranty}
      </div>
    </div>
  );
}

function Section({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="mb-3">
      <div className="text-xs font-semibold mb-1" style={{ color }}>{title}</div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--ink-soft)' }}>
            <span>•</span><span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
