export interface Manual {
  tagline: string;
  cautions: string[];
  howToUse: string[];
  forbidden: string[];
  warranty: string;
}

export interface LoadingItem {
  label: string;
  pct: number;
}

export interface LoadingScreen {
  inProgress: LoadingItem[];
  completed: string[];
  bugs: string[];
  patches: string[];
}

export interface NpcStats {
  공감력: number;
  고집: number;
  창의성: number;
  체력: number;
  눈치: number;
  솔직함: number;
}

export interface NpcCard {
  name: string;
  stats: NpcStats;
  mainQuest: string;
  hiddenQuest: string;
  weakness: string;
  dropItem: string;
}

export interface Profile {
  id: string;
  user_id: string;
  quiz_answers: Record<string, string>;
  manual: Manual;
  loading: LoadingScreen;
  npc: NpcCard;
  created_at: string;
  updated_at: string;
}

export interface DailyUpdate {
  id: string;
  profile_id: string;
  mood: string;
  keywords: string[];
  loading_patch: LoadingPatch;
  created_at: string;
}

export interface Snapshot {
  id: string;
  profile_id: string;
  label: string;
  manual: Manual;
  loading: LoadingScreen;
  npc: NpcCard;
  created_at: string;
}

export type QuizAnswers = Record<string, string>;

export interface GeneratedProfile {
  manual: Manual;
  loading: LoadingScreen;
  npc: NpcCard;
}

export interface LoadingPatch {
  patches: string[];
  inProgressUpdates: { label: string; pct: number }[];
}

export interface Question {
  id: string;
  text: string;
  placeholder: string;
}
