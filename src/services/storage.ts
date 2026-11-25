/**
 * Thin, safe wrapper around localStorage.
 * All persistence in the app flows through this module so that it can be swapped
 * for a remote API later without touching UI code.
 */
export const STORAGE_KEYS = {
  state: "codequest:v1:state",
  lang: "codequest:v1:lang",
  playground: (taskId: string) => `codequest:v1:playground:${taskId}`,
} as const;

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  },
  getString(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown): void {
    try {
      window.localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    } catch {
      /* storage may be unavailable (private mode / quota) – fail silently */
    }
  },
  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  },
};
