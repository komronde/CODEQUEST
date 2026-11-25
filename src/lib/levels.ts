/** XP values used across the app. */
export const XP = {
  exercise: 3,
  challenge: 5,
  lesson: 20,
  perfectBonus: 10,
  task: 30,
} as const;

/** Total XP required to reach `level` (level 1 = 0 XP, level 2 = 100, level 3 = 300 …). */
export const xpForLevel = (level: number): number => 50 * level * (level - 1);

export const levelFromXp = (xp: number): number => {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
};

export interface LevelInfo {
  level: number;
  current: number;
  needed: number;
  pct: number;
  remaining: number;
}

export const levelInfo = (xp: number): LevelInfo => {
  const level = levelFromXp(xp);
  const base = xpForLevel(level);
  const needed = xpForLevel(level + 1) - base;
  const current = xp - base;
  return { level, current, needed, pct: Math.min(100, Math.round((current / needed) * 100)), remaining: needed - current };
};
