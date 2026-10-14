import Anthropic from '@anthropic-ai/sdk';
import type { QuizAnswers, GeneratedProfile, LoadingScreen, LoadingPatch } from './types';
import { QUESTIONS } from './questions';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateProfile(answers: QuizAnswers): Promise<GeneratedProfile> {
  const answerText = QUESTIONS.map(q => `${q.text}\n→ ${answers[q.id] ?? '(무응답)'}`).join('\n\n');

  const system = `당신은 "Dear me" 앱의 AI입니다. 사용자의 답변을 바탕으로 귀엽고 공감 가는 3가지 콘텐츠를 생성합니다. 반드시 JSON만 응답하세요.`;

  const prompt = `사용자 답변:
${answerText}

다음 JSON을 생성하세요:
{
  "manual": {
    "tagline": "이 사람을 한 줄로 (20자 이내, 귀엽게)",
    "cautions": ["주의사항 3개 — 짧고 귀엽게"],
    "howToUse": ["권장 사용법 3개 — 구체적으로"],
    "forbidden": ["금지 행동 3개 — 공감 가게"],
    "warranty": "보증 조건 한 문장 — 재미있게"
  },
  "loading": {
    "inProgress": [
      { "label": "진행 중인 것 (10자 이내)", "pct": 10에서 90 사이 }
    ],
    "completed": ["완료된 것 3개 — 구체적으로"],
    "bugs": ["버그 2~3개 — 공감 가게"],
    "patches": ["최근 패치 2~3개 — 재미있게"]
  },
  "npc": {
    "name": "NPC 별명 (귀엽게, 10자 이내)",
    "stats": { "공감력": 0~100, "고집": 0~100, "창의성": 0~100, "체력": 0~100, "눈치": 0~100, "솔직함": 0~100 },
    "mainQuest": "메인 퀘스트 한 문장",
    "hiddenQuest": "히든 퀘스트 한 문장",
    "weakness": "약점 한 문장",
    "dropItem": "드랍 아이템 (귀엽게, 이모지 포함)"
  }
}

규칙:
- inProgress 항목은 3~5개
- 모든 텍스트는 한국어
- 유머와 공감을 섞어서, 너무 심각하지 않게
- 사용자 답변을 구체적으로 반영할 것`;

  const res = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = res.content[0].type === 'text' ? res.content[0].text : '{}';
  const json = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(json) as GeneratedProfile;
  } catch {
    throw new Error(`Claude returned invalid JSON: ${json.slice(0, 200)}`);
  }
}

export async function updateLoading(
  current: LoadingScreen,
  mood: string,
  keywords: string[]
): Promise<LoadingPatch> {
  const prompt = `사용자 오늘 상태:
기분: ${mood}
키워드: ${keywords.join(', ')}

현재 로딩 화면:
진행 중: ${current.inProgress.map(i => `${i.label} (${i.pct}%)`).join(', ')}
패치: ${current.patches.join(', ')}

오늘 상태를 반영해 업데이트하세요. 새 패치 노트 1~2개와 기존 진행 항목 중 변화가 있을 법한 것의 % 조정을 JSON으로 반환하세요:
{
  "patches": ["새 패치 1~2개 (재미있게)"],
  "inProgressUpdates": [{ "label": "기존 항목 이름 그대로", "pct": 새 숫자 }]
}`;

  const res = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = res.content[0].type === 'text' ? res.content[0].text : '{}';
  const json = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(json) as LoadingPatch;
  } catch {
    throw new Error(`Claude returned invalid JSON: ${json.slice(0, 200)}`);
  }
}
