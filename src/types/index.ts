/** Supported interface / content languages. */
export type Lang = "en" | "uz" | "ru";

/** Localized text tuple: [English, Uzbek, Russian]. */
export type L = readonly [string, string, string];

/** An answer option: language-neutral string (code/terms) or localized tuple. */
export type Opt = string | L;

export type Exercise =
  | { type: "mcq"; q: L; code?: string; options: Opt[]; answer: number; why: L }
  | { type: "tf"; q: L; code?: string; answer: boolean; why: L }
  | { type: "fill"; q: L; code: string; answers: string[]; why: L }
  | { type: "arrange"; q: L; blocks: string[]; why: L }
  | { type: "bug"; q: L; lines: string[]; answer: number; why: L }
  | { type: "write"; q: L; starter: string; patterns: string[]; solution: string; why: L; hint?: L };

export type ExerciseType = Exercise["type"];

export interface Lesson {
  id: string;
  courseId: string;
  index: number;
  title: L;
  intro: L;
  code: string;
  exercises: Exercise[];
}

export interface Course {
  id: string;
  /** hex colors for gradients */
  from: string;
  to: string;
  title: L;
  desc: L;
  lessons: Lesson[];
}

export type QuestMetric = "lessons" | "correct" | "challenges" | "runs" | "xp";

export interface LessonRecord {
  completedAt: number;
  perfect: boolean;
}

export interface UserState {
  version: 1;
  profile: { name: string; avatar: number; joinedAt: number };
  xp: number;
  completedLessons: Record<string, LessonRecord>;
  awardedExercises: Record<string, true>;
  completedTasks: string[];
  streak: { current: number; longest: number; lastActive: string | null };
  xpLog: Record<string, number>;
  achievements: Record<string, number>;
  quests: { date: string; progress: Record<QuestMetric, number>; claimed: string[] };
  stats: { correct: number; challenges: number; runs: number; questsClaimed: number; perfectLessons: number };
  settings: { dailyGoal: number; reduceMotion: boolean; notifications: boolean };
  lastLesson: { courseId: string; lessonId: string } | null;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: number;
  country: string;
  xp: number;
  isYou?: boolean;
}

export type LeaderboardPeriod = "weekly" | "allTime";
