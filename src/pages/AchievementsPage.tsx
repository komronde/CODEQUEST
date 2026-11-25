import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Medal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ACHIEVEMENTS } from "@/data/achievements";
import { LOCALE_TAG } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

type Filter = "all" | "unlocked" | "locked";
const FILTERS: Filter[] = ["all", "unlocked", "locked"];

export default function AchievementsPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const { state } = useGame();
  const [filter, setFilter] = useState<Filter>("all");
  const unlockedCount = ACHIEVEMENTS.filter((a) => state.achievements[a.id]).length;

  const items = useMemo(
    () =>
      ACHIEVEMENTS.filter((a) => {
        const u = Boolean(state.achievements[a.id]);
        return filter === "all" || (filter === "unlocked" ? u : !u);
      }),
    [filter, state.achievements],
  );

  return (
    <div>
      <PageHeader title={t("nav.achievements")} subtitle={t("achievements.subtitle")} />

      <section className="surface mb-6 p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-lg font-extrabold text-white">{t("achievements.unlockedCount", { count: unlockedCount, total: ACHIEVEMENTS.length })}</p>
          <span className="text-sm font-bold text-brand-300">{Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%</span>
        </div>
        <ProgressBar value={(unlockedCount / ACHIEVEMENTS.length) * 100} label={t("nav.achievements")} />
      </section>

      <div className="mb-5 flex gap-2" role="tablist" aria-label={t("nav.achievements")}>
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition",
              filter === f ? "border-brand-400/50 bg-brand-500/20 text-white" : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white",
            )}
          >
            {t(`achievements.filter.${f}`)}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Medal}
          title={t("achievements.emptyTitle")}
          description={t("achievements.emptyDesc")}
          action={<Button to="/paths">{t("achievements.emptyAction")}</Button>}
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => {
            const at = state.achievements[a.id];
            const value = Math.min(a.target, a.value(state));
            const Icon = a.icon;
            return (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.04 }}
                className={cn("surface flex gap-4 p-4", at ? "border-white/15" : "opacity-80")}
              >
                <span
                  className={cn(
                    "relative grid size-16 shrink-0 place-items-center rounded-2xl",
                    at ? cn("bg-gradient-to-br text-white shadow-lg", a.gradient) : "bg-ink-700 text-slate-600",
                  )}
                >
                  {at ? <Icon className="size-8" aria-hidden /> : <Lock className="size-6" aria-hidden />}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-extrabold text-white">{t(`achievements.items.${a.id}.title`)}</h2>
                  <p className="mt-0.5 text-sm leading-snug text-slate-400">{t(`achievements.items.${a.id}.desc`)}</p>
                  {at ? (
                    <p className="mt-2 text-xs font-bold text-mint-400">
                      {t("achievements.unlockedOn", { date: new Date(at).toLocaleDateString(LOCALE_TAG[lang], { day: "numeric", month: "short", year: "numeric" }) })}
                    </p>
                  ) : (
                    <div className="mt-2.5 flex items-center gap-2">
                      <ProgressBar value={(value / a.target) * 100} size="sm" label={t(`achievements.items.${a.id}.title`)} />
                      <span className="shrink-0 text-[11px] font-bold text-slate-500">
                        {value}/{a.target}
                      </span>
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
