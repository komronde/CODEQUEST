import {
  BookOpen,
  CalendarCheck,
  Crown,
  Flame,
  Globe2,
  GraduationCap,
  Medal,
  Puzzle,
  Rocket,
  Play,
  Star,
  Target,
  Trophy,
  Zap,
  Crosshair,
  type LucideIcon,
} from "lucide-react";
import type { UserState } from "@/types";
import { levelFromXp } from "@/lib/levels";
import { COURSES } from "./courses";

export interface AchievementDef {
  id: string;
  icon: LucideIcon;
  /** tailwind gradient classes */
  gradient: string;
  target: number;
  value: (s: UserState) => number;
}

const lessonsDone = (s: UserState) => Object.keys(s.completedLessons).length;
const coursesDone = (s: UserState) =>
  COURSES.filter((c) => c.lessons.every((l) => s.completedLessons[l.id])).length;
const coursesStarted = (s: UserState) =>
  COURSES.filter((c) => c.lessons.some((l) => s.completedLessons[l.id])).length;

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-steps", icon: Rocket, gradient: "from-brand-400 to-brand-600", target: 1, value: lessonsDone },
  { id: "learner-5", icon: BookOpen, gradient: "from-cyan-400 to-blue-500", target: 5, value: lessonsDone },
  { id: "scholar-15", icon: GraduationCap, gradient: "from-mint-400 to-cyan-400", target: 15, value: lessonsDone },
  { id: "finisher", icon: Trophy, gradient: "from-amber-400 to-orange-500", target: 1, value: coursesDone },
  { id: "polyglot", icon: Globe2, gradient: "from-pink-400 to-brand-500", target: 3, value: coursesStarted },
  { id: "xp-100", icon: Zap, gradient: "from-amber-400 to-yellow-300", target: 100, value: (s) => s.xp },
  { id: "xp-500", icon: Star, gradient: "from-brand-300 to-brand-500", target: 500, value: (s) => s.xp },
  { id: "xp-1500", icon: Crown, gradient: "from-amber-300 to-rose-400", target: 1500, value: (s) => s.xp },
  { id: "streak-3", icon: Flame, gradient: "from-orange-400 to-rose-500", target: 3, value: (s) => s.streak.longest },
  { id: "streak-7", icon: CalendarCheck, gradient: "from-rose-400 to-brand-500", target: 7, value: (s) => s.streak.longest },
  { id: "perfectionist", icon: Target, gradient: "from-mint-400 to-mint-500", target: 1, value: (s) => s.stats.perfectLessons },
  { id: "sharpshooter", icon: Crosshair, gradient: "from-cyan-400 to-brand-500", target: 50, value: (s) => s.stats.correct },
  { id: "first-run", icon: Play, gradient: "from-mint-400 to-cyan-500", target: 1, value: (s) => s.stats.runs },
  { id: "task-master", icon: Puzzle, gradient: "from-brand-400 to-pink-500", target: 3, value: (s) => s.completedTasks.length },
  { id: "quest-master", icon: Medal, gradient: "from-amber-400 to-brand-500", target: 4, value: (s) => s.stats.questsClaimed },
  { id: "level-5", icon: Star, gradient: "from-yellow-300 to-amber-500", target: 5, value: (s) => levelFromXp(s.xp) },
];
