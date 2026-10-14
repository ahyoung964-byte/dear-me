'use client';
import type { Question } from '@/lib/types';

interface Props {
  question: Question;
  value: string;
  onChange: (val: string) => void;
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function QuestionStep({ question, value, onChange, current, total, onNext, onPrev }: Props) {
  return (
    <div className="fade-up">
      <div className="text-xs mb-4" style={{ color: 'var(--ink-dim)' }}>
        {current + 1} / {total}
      </div>
      <div className="h-1 rounded-full mb-6" style={{ background: 'var(--line)' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${((current + 1) / total) * 100}%`, background: 'var(--pink)', transition: 'width 0.3s ease' }}
        />
      </div>

      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
        {question.text}
      </h2>

      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={3}
        className="w-full rounded-xl p-4 text-sm resize-none outline-none"
        style={{ background: 'var(--card)', border: '1.5px solid var(--line)', color: 'var(--ink)' }}
        onFocus={e => (e.target.style.borderColor = 'var(--pink)')}
        onBlur={e => (e.target.style.borderColor = 'var(--line)')}
      />

      <div className="flex gap-3 mt-4">
        {current > 0 && (
          <button
            onClick={onPrev}
            className="flex-1 py-3 rounded-xl text-sm"
            style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--ink-dim)' }}
          >
            이전
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!value.trim()}
          className="flex-1 py-3 rounded-xl text-sm font-semibold"
          style={{
            background: value.trim() ? 'var(--pink)' : 'var(--line)',
            color: value.trim() ? 'white' : 'var(--ink-dim)',
            cursor: value.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          {current === total - 1 ? '완성하기 ✨' : '다음'}
        </button>
      </div>
    </div>
  );
}
