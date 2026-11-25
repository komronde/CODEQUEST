import { Award, LayoutDashboard, Route, ScrollText, Settings, TerminalSquare, Trophy, User, type LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  key: "dashboard" | "paths" | "playground" | "quests" | "leaderboard" | "achievements" | "profile" | "settings";
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { to: "/paths", key: "paths", icon: Route },
  { to: "/playground", key: "playground", icon: TerminalSquare },
  { to: "/quests", key: "quests", icon: ScrollText },
  { to: "/leaderboard", key: "leaderboard", icon: Trophy },
  { to: "/achievements", key: "achievements", icon: Award },
  { to: "/profile", key: "profile", icon: User },
  { to: "/settings", key: "settings", icon: Settings },
];

/** Primary tabs shown in the mobile bottom bar; remaining items live in the "More" sheet. */
export const PRIMARY_KEYS: NavItem["key"][] = ["dashboard", "paths", "playground", "quests"];
