export enum CEFRLevel {
  A0 = "A0",
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
}

export type AppState = 'LANDING' | 'TRAIL' | 'LESSON_STEP_1' | 'LESSON_STEP_2' | 'LESSON_STEP_3' | 'CELEBRATION';

export interface Module {
  id: number;
  title: string;
  unlocked: boolean;
  completed: boolean;
  vocab: { word: string; phonetics: string; meaning: string; grammar?: string; semantics?: string }[];
  grammarRule: string;
  sentences: { french: string; phonetics: string; english: string }[];
  quiz: { question: string; options: string[]; answer: string; explanation: string }[];
}

export interface UserProfile {
  name: string;
  currentModuleId: number;
  completedModules: number[];
  xp: number;
  streak: number;
}
