import type { QuestMetric, UserState } from "@/types";
import { ACHIEVEMENTS } from "@/data/achievements";
import { addDays, dateKey } from "./dates";
import { XP } from "./levels";

const emptyProgress = (): Record<QuestMetric, number> => ({ lessons: 0, correct: 0, challenges: 0, runs: 0, xp: 0 });

export function createInitialState(): UserState {
  return {
    version: 1,
    profile: { name: "Coder", avatar: 0, joinedAt: Date.now() },
    xp: 0,
    completedLessons: {},
    awardedExercises: {},
    completedTasks: [],
    streak: { current: 0, longest: 0, lastActive: null },
    xpLog: {},
    achievements: {},
    quests: { date: dateKey(), progress: emptyProgress(), claimed: [] },
    stats: { correct: 0, challenges: 0, runs: 0, questsClaimed: 0, perfectLessons: 0 },
    settings: { dailyGoal: 50, reduceMotion: false, notifications: true },
    lastLesson: null,
  };
}

/** Resets stale daily data (quests) and expired streaks. Pure – returns a new state when something changed. */
export function normalizeState(s: UserState): UserState {
  const today = dateKey();
  let next = s;
  if (s.quests.date !== today) {
    next = { ...next, quests: { date: today, progress: emptyProgress(), claimed: [] } };
  }
  const last = s.streak.lastActive;
  if (last && last !== today && last !== addDays(today, -1) && s.streak.current !== 0) {
    next = { ...next, streak: { ...next.streak, current: 0 } };
  }
  return next;
}

/** The streak value to display (0 if it has already expired). */
export const currentStreak = (s: UserState): number => normalizeState(s).streak.current;

export function bumpMetric(s: UserState, metric: QuestMetric, amount = 1): UserState {
  return {
    ...s,
    quests: { ...s.quests, progress: { ...s.quests.progress, [metric]: s.quests.progress[metric] + amount } },
  };
}

export function grantXp(s: UserState, amount: number): UserState {
  if (amount <= 0) return s;
  const today = dateKey();
  const withXp: UserState = {
    ...s,
    xp: s.xp + amount,
    xpLog: { ...s.xpLog, [today]: (s.xpLog[today] ?? 0) + amount },
  };
  return bumpMetric(withXp, "xp", amount);
}

export function touchStreak(s: UserState): UserState {
  const today = dateKey();
  const last = s.streak.lastActive;
  if (last === today) return s;
  const current = last === addDays(today, -1) ? s.streak.current + 1 : 1;
  return { ...s, streak: { current, longest: Math.max(s.streak.longest, current), lastActive: today } };
}

/** Unlocks any achievements whose conditions are now satisfied. */
export function applyAchievements(s: UserState): { state: UserState; unlocked: string[] } {
  const unlocked: string[] = [];
  const achievements = { ...s.achievements };
  for (const a of ACHIEVEMENTS) {
    if (!achievements[a.id] && a.value(s) >= a.target) {
      achievements[a.id] = Date.now();
      unlocked.push(a.id);
    }
  }
  return unlocked.length ? { state: { ...s, achievements }, unlocked } : { state: s, unlocked };
}

export function createDemoState(): UserState {
  const base = createInitialState();
  const today = dateKey();
  const done = [
    "html-1", "html-2", "html-3", "html-4", "html-5",
    "css-1", "css-2",
    "javascript-1", "javascript-2", "javascript-3",
  ];
  const completedLessons: UserState["completedLessons"] = {};
  const awardedExercises: UserState["awardedExercises"] = {};
  let xp = 0;
  let perfectLessons = 0;
  done.forEach((id, i) => {
    const perfect = i % 2 === 0;
    completedLessons[id] = { completedAt: Date.now() - (done.length - i) * 3_600_000 * 7, perfect };
    for (let n = 0; n < 3; n++) {
      awardedExercises[`${id}:${n}`] = true;
      xp += n === 2 ? XP.challenge : XP.exercise;
    }
    xp += XP.lesson + (perfect ? XP.perfectBonus : 0);
    if (perfect) perfectLessons++;
  });
  xp += XP.task;
  const profile = { name: "Demo Coder", avatar: 3, joinedAt: Date.now() - 12 * 86_400_000 };
  const xpLog: Record<string, number> = {};
  [48, 55, 0, 37, 62, 25, 71, 40, 0, 33, 58, 45, 20, 52].forEach((v, i) => {
    if (v) xpLog[addDays(today, -i)] = v;
  });
  xpLog[today] = 40;
  const state: UserState = {
    ...base,
    profile,
    xp,
    completedLessons,
    awardedExercises,
    completedTasks: ["hello-html"],
    streak: { current: 5, longest: 9, lastActive: today },
    xpLog,
    quests: { date: today, progress: { lessons: 1, correct: 4, challenges: 0, runs: 1, xp: 40 }, claimed: [] },
    stats: { correct: 52, challenges: 9, runs: 6, questsClaimed: 2, perfectLessons },
    lastLesson: { courseId: "javascript", lessonId: "javascript-3" },
  };
  return applyAchievements(state).state;
}
