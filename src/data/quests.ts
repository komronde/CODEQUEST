import { BookOpenCheck, CheckCheck, Swords, Terminal, Zap, type LucideIcon } from "lucide-react";
import type { QuestMetric } from "@/types";

export interface QuestDef {
  id: string;
  metric: QuestMetric;
  target: number;
  reward: number;
  icon: LucideIcon;
}

export const QUESTS: QuestDef[] = [
  { id: "lesson", metric: "lessons", target: 1, reward: 20, icon: BookOpenCheck },
  { id: "correct", metric: "correct", target: 10, reward: 25, icon: CheckCheck },
  { id: "challenge", metric: "challenges", target: 1, reward: 25, icon: Swords },
  { id: "run", metric: "runs", target: 2, reward: 15, icon: Terminal },
  { id: "xp", metric: "xp", target: 50, reward: 30, icon: Zap },
];
