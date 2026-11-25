import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Flame } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useGame } from "@/context/GameContext";
import { cn } from "@/utils/cn";
import { NAV_ITEMS } from "./nav";

export function Sidebar() {
  const { t } = useTranslation();
  const { level, streak } = useGame();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-white/[0.06] bg-ink-900/70 p-5 backdrop-blur-xl lg:flex">
      <Link to="/" className="mb-8 px-2" aria-label={t("app.name")}>
        <Logo />
      </Link>
      <nav aria-label={t("nav.main")} className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, key, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition",
                isActive ? "bg-brand-500/15 text-white ring-1 ring-brand-400/30" : "text-slate-400 hover:bg-white/[0.05] hover:text-white",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("size-5 transition", isActive ? "text-brand-300" : "text-slate-500 group-hover:text-slate-300")} aria-hidden />
                {t(`nav.${key}`)}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="surface mt-4 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-extrabold text-white">
            {t("common.level")} {level.level}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-orange-400">
            <Flame className="size-4" aria-hidden />
            {streak}
          </span>
        </div>
        <ProgressBar value={level.pct} className="mt-3" label={t("common.level")} />
        <p className="mt-2 text-xs font-medium text-slate-500">{t("dashboard.xpToNext", { xp: level.remaining, level: level.level + 1 })}</p>
      </div>
    </aside>
  );
}
