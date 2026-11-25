import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, TrendingUp, UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { LeaderboardEntry, LeaderboardPeriod } from "@/types";
import { leaderboardService } from "@/services/leaderboardService";
import { lastDays } from "@/lib/dates";
import { useGame } from "@/context/GameContext";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";

const PERIODS: LeaderboardPeriod[] = ["weekly", "allTime"];

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const { state } = useGame();
  const [period, setPeriod] = useState<LeaderboardPeriod>("weekly");
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);
  const [failed, setFailed] = useState(false);

  const weeklyXp = lastDays(7).reduce((n, d) => n + (state.xpLog[d] ?? 0), 0);
  const myXp = period === "weekly" ? weeklyXp : state.xp;

  useEffect(() => {
    let cancelled = false;
    setEntries(null);
    setFailed(false);
    leaderboardService
      .fetch(period, { name: state.profile.name, avatar: state.profile.avatar, xp: myXp })
      .then((list) => !cancelled && setEntries(list))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [period, state.profile.name, state.profile.avatar, myXp]);

  const rank = entries ? entries.findIndex((e) => e.isYou) + 1 : 0;
  const podium = entries?.slice(0, 3) ?? [];
  const rest = entries?.slice(3) ?? [];
  // visual order: 2nd, 1st, 3rd
  const podiumOrder = [podium[1], podium[0], podium[2]].filter(Boolean) as LeaderboardEntry[];
  const heights = ["h-24", "h-32", "h-20"];
  const medal = ["from-slate-300 to-slate-500", "from-amber-300 to-orange-500", "from-orange-300 to-amber-700"];

  return (
    <div>
      <PageHeader title={t("nav.leaderboard")} subtitle={t("leaderboard.subtitle")} />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white/[0.04] p-1 sm:w-80" role="tablist" aria-label={t("nav.leaderboard")}>
          {PERIODS.map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={period === p}
              onClick={() => setPeriod(p)}
              className={cn("rounded-xl py-2.5 text-sm font-bold transition", period === p ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white")}
            >
              {t(`leaderboard.${p}`)}
            </button>
          ))}
        </div>
        {rank > 0 && (
          <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-brand-400/30 bg-brand-500/10 px-4 py-2.5 text-sm font-bold text-brand-100 sm:self-auto">
            <TrendingUp className="size-4 text-brand-300" aria-hidden />
            {t("leaderboard.yourRank", { rank })} · {myXp} XP
          </div>
        )}
      </div>

      {failed ? (
        <EmptyState icon={UsersRound} title={t("leaderboard.errorTitle")} description={t("leaderboard.errorDesc")} />
      ) : !entries ? (
        <div className="space-y-3" role="status" aria-label={t("common.loading")}>
          <Skeleton className="h-44 w-full" />
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <>
          <section className="surface mb-4 flex items-end justify-center gap-3 px-4 pb-0 pt-8 sm:gap-6" aria-label={t("leaderboard.top3")}>
            {podiumOrder.map((e) => {
              const place = podium.indexOf(e);
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: place === 0 ? 0.15 : place * 0.1 }}
                  className="flex w-24 flex-col items-center sm:w-32"
                >
                  <div className="relative mb-2">
                    {place === 0 && <Crown className="absolute -top-6 left-1/2 size-6 -translate-x-1/2 text-amber-300" aria-hidden />}
                    <Avatar name={e.name} index={e.avatar} size="lg" className={e.isYou ? "ring-brand-300" : undefined} />
                  </div>
                  <p className="w-full truncate text-center text-sm font-extrabold text-white">{e.isYou ? t("leaderboard.you") : e.name}</p>
                  <p className="mb-2 text-xs font-bold text-amber-300">{e.xp} XP</p>
                  <div className={cn("grid w-full place-items-center rounded-t-2xl bg-gradient-to-b text-2xl font-extrabold text-white/90", heights[place], medal[place])}>
                    {place + 1}
                  </div>
                </motion.div>
              );
            })}
          </section>

          <ol className="space-y-2" start={4}>
            {rest.map((e, i) => (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn("surface flex items-center gap-3 px-4 py-3", e.isYou && "border-brand-400/50 bg-brand-500/15")}
              >
                <span className="w-7 text-center text-sm font-extrabold text-slate-500">{i + 4}</span>
                <Avatar name={e.name} index={e.avatar} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-white">
                    {e.isYou ? `${e.name} (${t("leaderboard.you")})` : e.name} <span aria-hidden>{e.country}</span>
                  </p>
                </div>
                <span className="text-sm font-extrabold text-amber-300">{e.xp} XP</span>
              </motion.li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
