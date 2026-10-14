interface Props { label: string; value: number; color?: string; }

export default function StatBar({ label, value, color = 'var(--lavender)' }: Props) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--ink-dim)' }}>
        <span>{label}</span>
        <span style={{ color: 'var(--ink)' }}>{value}</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: 'var(--line)' }}>
        <div
          className="stat-bar-fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}
