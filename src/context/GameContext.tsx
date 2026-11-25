import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { UserState } from "@/types";
import { progressService } from "@/services/progressService";
import { QUESTS } from "@/data/quests";
import {
  applyAchievements,
  bumpMetric,
  currentStreak,
  grantXp,
  normalizeState,
  touchStreak,
} from "@/lib/game";
import { XP, levelFromXp, levelInfo, type LevelInfo } from "@/lib/levels";
import { useToast } from "./ToastContext";

interface LessonResult {
  xp: number;
  firstTime: boolean;
}

export interface GameApi {
  state: UserState;
  level: LevelInfo;
  streak: number;
  /** Records a correct exercise. Returns XP granted (0 when already awarded before). */
  recordCorrect: (lessonId: string, exerciseIndex: number, isChallenge: boolean) => number;
  completeLesson: (courseId: string, lessonId: string, mistakes: number) => LessonResult;
  recordRun: () => void;
  completeTask: (taskId: string) => number;
  claimQuest: (questId: string) => number;
  updateProfile: (patch: Partial<UserState["profile"]>) => void;
  updateSettings: (patch: Partial<UserState["settings"]>) => void;
  resetProgress: () => void;
  loadDemo: () => void;
  exportData: () => string;
}

const GameContext = createContext<GameApi | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [state, setState] = useState<UserState>(() => progressService.load());
  const ref = useRef<UserState>(state);
  const tRef = useRef(t);

  useEffect(() => {
    tRef.current = t;
  }, [t]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", state.settings.reduceMotion);
  }, [state.settings.reduceMotion]);

  /** Single write path: achievements → persistence → celebratory notifications. */
  const commit = useCallback(
    (next: UserState) => {
      const prev = ref.current;
      const { state: finalState, unlocked } = applyAchievements(next);
      ref.current = finalState;
      setState(finalState);
      progressService.save(finalState);

      if (!finalState.settings.notifications) return;
      const tt = tRef.current;
      const newLevel = levelFromXp(finalState.xp);
      if (newLevel > levelFromXp(prev.xp)) {
        toast.show("xp", tt("toast.levelUp", { level: newLevel }), tt("toast.levelUpDesc"));
      }
      const streakNow = currentStreak(finalState);
      if (streakNow > 1 && streakNow > currentStreak(prev)) {
        toast.show("streak", tt("toast.streak", { count: streakNow }), tt("toast.streakDesc"));
      }
      unlocked.forEach((id) =>
        toast.show(
          "achievement",
          tt("toast.achievement"),
          tt(`achievements.items.${id}.title`),
        ),
      );
    },
    [toast],
  );

  const cur = () => normalizeState(ref.current);

  const recordCorrect = useCallback<GameApi["recordCorrect"]>(
    (lessonId, exerciseIndex, isChallenge) => {
      let s = touchStreak(cur());
      const key = `${lessonId}:${exerciseIndex}`;
      const first = !s.awardedExercises[key];
      const xp = first ? (isChallenge ? XP.challenge : XP.exercise) : 0;
      s = bumpMetric(s, "correct");
      s = { ...s, stats: { ...s.stats, correct: s.stats.correct + 1 } };
      if (isChallenge) {
        s = bumpMetric(s, "challenges");
        s = { ...s, stats: { ...s.stats, challenges: s.stats.challenges + 1 } };
      }
      if (first) s = { ...s, awardedExercises: { ...s.awardedExercises, [key]: true } };
      commit(grantXp(s, xp));
      return xp;
    },
    [commit],
  );

  const completeLesson = useCallback<GameApi["completeLesson"]>(
    (courseId, lessonId, mistakes) => {
      let s = touchStreak(cur());
      const firstTime = !s.completedLessons[lessonId];
      const perfect = mistakes === 0;
      let xp = 0;
      s = bumpMetric(s, "lessons");
      s = { ...s, lastLesson: { courseId, lessonId } };
      if (firstTime) {
        xp = XP.lesson + (perfect ? XP.perfectBonus : 0);
        s = {
          ...s,
          completedLessons: { ...s.completedLessons, [lessonId]: { completedAt: Date.now(), perfect } },
          stats: { ...s.stats, perfectLessons: s.stats.perfectLessons + (perfect ? 1 : 0) },
        };
        s = grantXp(s, xp);
      }
      commit(s);
      return { xp, firstTime };
    },
    [commit],
  );

  const recordRun = useCallback(() => {
    let s = touchStreak(cur());
    s = bumpMetric(s, "runs");
    commit({ ...s, stats: { ...s.stats, runs: s.stats.runs + 1 } });
  }, [commit]);

  const completeTask = useCallback<GameApi["completeTask"]>(
    (taskId) => {
      const s = cur();
      if (s.completedTasks.includes(taskId)) return 0;
      commit(grantXp(touchStreak({ ...s, completedTasks: [...s.completedTasks, taskId] }), XP.task));
      return XP.task;
    },
    [commit],
  );

  const claimQuest = useCallback<GameApi["claimQuest"]>(
    (questId) => {
      const s = cur();
      const quest = QUESTS.find((q) => q.id === questId);
      if (!quest || s.quests.claimed.includes(questId) || s.quests.progress[quest.metric] < quest.target) return 0;
      const next: UserState = {
        ...s,
        quests: { ...s.quests, claimed: [...s.quests.claimed, questId] },
        stats: { ...s.stats, questsClaimed: s.stats.questsClaimed + 1 },
      };
      commit(grantXp(next, quest.reward));
      return quest.reward;
    },
    [commit],
  );

  const updateProfile = useCallback<GameApi["updateProfile"]>(
    (patch) => commit({ ...cur(), profile: { ...cur().profile, ...patch } }),
    [commit],
  );

  const updateSettings = useCallback<GameApi["updateSettings"]>(
    (patch) => commit({ ...cur(), settings: { ...cur().settings, ...patch } }),
    [commit],
  );

  const replace = useCallback((next: UserState) => {
    ref.current = next;
    setState(next);
  }, []);

  const resetProgress = useCallback(() => replace(progressService.reset()), [replace]);
  const loadDemo = useCallback(() => replace(progressService.loadDemo()), [replace]);
  const exportData = useCallback(() => progressService.exportJson(ref.current), []);

  const value = useMemo<GameApi>(
    () => ({
      state,
      level: levelInfo(state.xp),
      streak: currentStreak(state),
      recordCorrect,
      completeLesson,
      recordRun,
      completeTask,
      claimQuest,
      updateProfile,
      updateSettings,
      resetProgress,
      loadDemo,
      exportData,
    }),
    [state, recordCorrect, completeLesson, recordRun, completeTask, claimQuest, updateProfile, updateSettings, resetProgress, loadDemo, exportData],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameApi {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
