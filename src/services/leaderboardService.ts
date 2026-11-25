import type { LeaderboardEntry, LeaderboardPeriod } from "@/types";

interface DemoUser {
  id: string;
  name: string;
  avatar: number;
  country: string;
  weekly: number;
  total: number;
}

const DEMO_USERS: DemoUser[] = [
  { id: "u1", name: "Aziza K.", avatar: 3, country: "🇺🇿", weekly: 1180, total: 9420 },
  { id: "u2", name: "Maksim Orlov", avatar: 1, country: "🇷🇺", weekly: 1040, total: 8110 },
  { id: "u3", name: "Sophie Laurent", avatar: 5, country: "🇫🇷", weekly: 905, total: 7650 },
  { id: "u4", name: "Jasur Rahimov", avatar: 0, country: "🇺🇿", weekly: 820, total: 6980 },
  { id: "u5", name: "Aiko Tanaka", avatar: 6, country: "🇯🇵", weekly: 715, total: 6220 },
  { id: "u6", name: "Daniel Brooks", avatar: 2, country: "🇺🇸", weekly: 640, total: 5400 },
  { id: "u7", name: "Nodira S.", avatar: 4, country: "🇺🇿", weekly: 555, total: 4710 },
  { id: "u8", name: "Elena Petrova", avatar: 7, country: "🇧🇾", weekly: 470, total: 3990 },
  { id: "u9", name: "Carlos Mendez", avatar: 1, country: "🇪🇸", weekly: 380, total: 3150 },
  { id: "u10", name: "Timur Aliev", avatar: 3, country: "🇰🇿", weekly: 290, total: 2340 },
  { id: "u11", name: "Priya Nair", avatar: 5, country: "🇮🇳", weekly: 210, total: 1480 },
  { id: "u12", name: "Oliver Smith", avatar: 2, country: "🇬🇧", weekly: 120, total: 760 },
];

export interface LeaderboardService {
  fetch(period: LeaderboardPeriod, you: { name: string; avatar: number; xp: number }): Promise<LeaderboardEntry[]>;
}

/** Demo implementation – simulates network latency; swap for a real API later. */
export const leaderboardService: LeaderboardService = {
  fetch(period, you) {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const entries: LeaderboardEntry[] = DEMO_USERS.map((u) => ({
          id: u.id,
          name: u.name,
          avatar: u.avatar,
          country: u.country,
          xp: period === "weekly" ? u.weekly : u.total,
        }));
        entries.push({ id: "you", name: you.name, avatar: you.avatar, country: "⭐", xp: you.xp, isYou: true });
        entries.sort((a, b) => b.xp - a.xp || (a.isYou ? 1 : -1));
        resolve(entries);
      }, 450);
    });
  },
};
