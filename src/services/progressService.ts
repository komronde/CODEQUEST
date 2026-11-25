import type { UserState } from "@/types";
import { createInitialState, createDemoState, normalizeState } from "@/lib/game";
import { STORAGE_KEYS, storage } from "./storage";

/**
 * Repository contract for user progress.
 * The LocalStorage implementation below can be replaced by an HTTP-backed one
 * (same interface) when a backend is introduced.
 */
export interface ProgressService {
  load(): UserState;
  save(state: UserState): void;
  reset(): UserState;
  loadDemo(): UserState;
  exportJson(state: UserState): string;
}

function mergeWithDefaults(raw: Partial<UserState> | null): UserState {
  const base = createInitialState();
  if (!raw || raw.version !== 1) return base;
  return {
    ...base,
    ...raw,
    profile: { ...base.profile, ...raw.profile },
    streak: { ...base.streak, ...raw.streak },
    quests: {
      ...base.quests,
      ...raw.quests,
      progress: { ...base.quests.progress, ...(raw.quests?.progress ?? {}) },
    },
    stats: { ...base.stats, ...raw.stats },
    settings: { ...base.settings, ...raw.settings },
  };
}

export const progressService: ProgressService = {
  load() {
    const raw = storage.get<Partial<UserState> | null>(STORAGE_KEYS.state, null);
    return normalizeState(mergeWithDefaults(raw));
  },
  save(state) {
    storage.set(STORAGE_KEYS.state, state);
  },
  reset() {
    const fresh = createInitialState();
    storage.set(STORAGE_KEYS.state, fresh);
    return fresh;
  },
  loadDemo() {
    const demo = createDemoState();
    storage.set(STORAGE_KEYS.state, demo);
    return demo;
  },
  exportJson(state) {
    return JSON.stringify(state, null, 2);
  },
};
