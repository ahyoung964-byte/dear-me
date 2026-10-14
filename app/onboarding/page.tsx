'use client';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import QuestionStep from '@/components/QuestionStep';
import { QUESTIONS } from '@/lib/questions';
import { getUserId } from '@/lib/storage';
import type { QuizAnswers } from '@/lib/types';

function OnboardingContent() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitting, setSubmitting] = useState(false);

  const q = QUESTIONS[current];
  const value = answers[q.id] ?? '';

  const handleNext = async () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      return;
    }
    setSubmitting(true);
    const userId = getUserId();
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, answers }),
    });
    const { id } = await res.json();
    router.push(`/me/${id}`);
  };

  if (submitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-3xl pulse">✨</div>
        <div className="text-sm" style={{ color: 'var(--ink-dim)' }}>AI가 나를 분석하는 중... (15초 소요)</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 pt-12 pb-10 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="text-xs tracking-widest" style={{ color: 'var(--pink)' }}>DEAR ME</div>
      </div>
      <QuestionStep
        question={q}
        value={value}
        onChange={val => setAnswers(prev => ({ ...prev, [q.id]: val }))}
        current={current}
        total={QUESTIONS.length}
        onNext={handleNext}
        onPrev={() => setCurrent(c => c - 1)}
      />
    </main>
  );
}

export default function OnboardingPage() {
  return <Suspense><OnboardingContent /></Suspense>;
}
