/** Local-date helpers. Dates are stored as YYYY-MM-DD keys in the user's local timezone. */
const pad = (n: number) => String(n).padStart(2, "0");

export const dateKey = (d: Date = new Date()): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const addDays = (key: string, days: number): string => {
  const [y, m, d] = key.split("-").map(Number);
  return dateKey(new Date(y, m - 1, d + days));
};

/** Returns the last `n` day keys ending today (oldest first). */
export const lastDays = (n: number): string[] => {
  const today = dateKey();
  return Array.from({ length: n }, (_, i) => addDays(today, i - (n - 1)));
};

export const msUntilMidnight = (): number => {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return next.getTime() - now.getTime();
};
