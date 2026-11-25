import { Link } from "react-router-dom";
import { Flame, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Avatar } from "@/components/ui/Avatar";
import { useGame } from "@/context/GameContext";

export function StatPills() {
  const { t } = useTranslation();
  const { state, streak, level } = useGame();
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span
        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-orange-400/20 bg-orange-400/10 px-2.5 text-sm font-extrabold text-orange-300 sm:px-3"
        title={t("common.streak")}
        aria-label={`${t("common.streak")}: ${streak}`}
      >
        <Flame className="size-4" aria-hidden />
        {streak}
      </span>
      <span
        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-amber-400/20 bg-amber-400/10 px-2.5 text-sm font-extrabold text-amber-300 sm:px-3"
        title={t("common.xp")}
        aria-label={`${t("common.xp")}: ${state.xp}`}
      >
        <Zap className="size-4" aria-hidden />
        {state.xp}
      </span>
      <span
        className="hidden h-10 items-center rounded-xl border border-brand-400/25 bg-brand-500/10 px-3 text-sm font-extrabold text-brand-200 sm:inline-flex"
        aria-label={`${t("common.level")}: ${level.level}`}
      >
        {t("common.lvl")} {level.level}
      </span>
    </div>
  );
}

export function TopBar() {
  const { t } = useTranslation();
  const { state } = useGame();
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-ink-950/75 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 lg:px-8">
        <Link to="/dashboard" className="lg:hidden" aria-label={t("app.name")}>
          <Logo size="sm" showText={false} />
        </Link>
        <div className="hidden lg:block" />
        <div className="flex items-center gap-2">
          <StatPills />
          <LanguageSelector />
          <Link to="/profile" className="hidden rounded-full sm:block" aria-label={t("nav.profile")}>
            <Avatar name={state.profile.name} index={state.profile.avatar} />
          </Link>
        </div>
      </div>
    </header>
  );
}
